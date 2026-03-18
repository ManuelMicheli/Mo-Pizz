/**
 * sync-menu.mjs — Scrape menu data from Plateform and update menuData.js
 *
 * Fetches all menu categories from mopizz.plateform.app, parses the HTML,
 * and writes the updated menuData.js file.
 *
 * Usage:
 *   node scripts/sync-menu.mjs          # sync and update menuData.js
 *   node scripts/sync-menu.mjs --dry    # preview changes without writing
 *
 * The script exits 0 even on fetch failures so it never blocks a build.
 */

import { load } from 'cheerio';
import { writeFileSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MENU_DATA_PATH = join(__dirname, '..', 'src', 'data', 'menuData.js');
const DRY_RUN = process.argv.includes('--dry');

const BASE_URL = 'https://mopizz.plateform.app/takeaway';
const FETCH_HEADERS = {
  'Cookie': 'frontpageLanguage=it',
  'Accept-Language': 'it-IT,it;q=0.9',
  'User-Agent': 'MoPizz-MenuSync/1.0',
};

// ─── Plateform category IDs → site structure mapping ───────────────────────
// Each entry maps a Plateform category ID to:
//   - siteCategory: which main category it belongs to in menuData.js
//   - heading: the section heading displayed on the site
const CATEGORY_MAP = [
  // La Pizzeria
  { catId: '46263768', siteCategory: 'pizzeria', heading: 'Le Classiche' },
  { catId: '46263769', siteCategory: 'pizzeria', heading: 'Le Mo Pizz dello Chef' },
  { catId: '46289265', siteCategory: 'pizzeria', heading: 'Fritti' },
  { catId: '46289264', siteCategory: 'pizzeria', heading: 'Ripieni al Forno' },
  // La Cucina
  { catId: '46263507', siteCategory: 'cucina', heading: 'Antipasti di Mare' },
  { catId: '48485609', siteCategory: 'cucina', heading: 'Antipasti, Sfizi e Fritti' },
  { catId: '46263734', siteCategory: 'cucina', heading: 'Primi di Mare' },
  { catId: '48486023', siteCategory: 'cucina', heading: 'Primi della Tradizione' },
  { catId: '46263735', siteCategory: 'cucina', heading: 'Secondi di Pesce' },
  { catId: '48486385', siteCategory: 'cucina', heading: 'Secondi di Carne' },
  { catId: '46263736', siteCategory: 'cucina', heading: 'Contorni' },
  { catId: '46263774', siteCategory: 'cucina', heading: 'Per i Bambini' },
  // I Dolci
  { catId: '46263770', siteCategory: 'dolci', heading: 'Dolci della Tradizione' },
  // Birre & Vini
  { catId: '46263771', siteCategory: 'bevande', heading: 'Birre Artigianali' },
  { catId: '46290917', siteCategory: 'bevande', heading: 'La Cantinetta' },
  { catId: '46263772', siteCategory: 'bevande', heading: 'Bevande' },
  { catId: '46263773', siteCategory: 'bevande', heading: 'Caffè e Amari' },
];

// ─── Site main categories (top-level structure) ────────────────────────────
const SITE_CATEGORIES = [
  {
    id: 'pizzeria',
    title: 'La Pizzeria',
    subtitle: "Fiordilatte del Matese IGP, San Marzano dell'Agro Sarnese IGP, 48 ore di doppia lievitazione",
    heroImage: '/images/menu/pizzeria-hero.webp',
  },
  {
    id: 'cucina',
    title: 'La Cucina',
    subtitle: 'Antipasti, primi e secondi della tradizione napoletana',
    heroImage: '/images/menu/cucina-hero.webp',
    heroFit: 'contain',
  },
  {
    id: 'dolci',
    title: 'I Dolci',
    subtitle: "Il finale perfetto — pasticceria campana d'autore",
    heroImage: '/images/menu/dolci-hero.webp',
    heroFit: 'contain',
  },
  {
    id: 'bevande',
    title: 'Birre & Vini',
    subtitle: 'Artigianali, selezionate, italiane',
    heroImage: '/images/menu/bevande-hero.webp',
    heroFit: 'contain',
  },
];

// ─── Hover images: manually curated, keyed by normalized item name ─────────
const HOVER_IMAGES = {
  'bronte 2.0': '/images/menu/bronte.jpg',
  'superlativa': '/images/menu/superlativa.jpg',
  'primavera': '/images/menu/primavera.jpg',
  'poker': '/images/menu/poker.jpg',
  'la nerano': '/images/menu/nerano.jpg',
  'nerano': '/images/menu/nerano.jpg',
  'delizia al limone': '/images/menu/delizia.jpg',
  "baba' napoletano": '/images/menu/baba.jpg',
  'babà napoletano': '/images/menu/baba.jpg',
};

// ─── Quality badges detected from description text ─────────────────────────
const QUALITY_BADGE_PATTERNS = [
  { pattern: /\bD\.?O\.?C\.?G\.?\b/i, badge: 'DOCG' },
  { pattern: /\bD\.?O\.?P\.?\b/i, badge: 'DOP' },
  { pattern: /\bD\.?O\.?C\.?\b/i, badge: 'DOC' },
  { pattern: /\bI\.?G\.?P\.?\b/i, badge: 'IGP' },
  { pattern: /\bI\.?G\.?T\.?\b/i, badge: 'IGT' },
];

// ─── Text utilities ────────────────────────────────────────────────────────

/**
 * Convert "ALL CAPS NAME" or "all caps name" to "Title Case Name".
 * Preserves words that are already mixed case (e.g., "2.0", "CBT", "DOP").
 * Keeps short prepositions/articles lowercase when not first word.
 */
const LOWERCASE_WORDS = new Set(['e', 'di', 'del', 'dei', 'della', 'delle', 'degli', 'al', 'alla', 'alle', 'con', 'in', 'per', 'a', 'da', 'o']);
function toTitleCase(str) {
  if (!str) return str;
  // If the string is NOT all-caps, leave it as-is (already properly cased)
  if (str !== str.toUpperCase()) return str;
  return str
    .toLowerCase()
    .split(/(\s+|')/)
    .map((word, i) => {
      if (/^\s+$/.test(word) || word === "'") return word;
      if (i > 0 && LOWERCASE_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
}

/**
 * Clean up description text: collapse newlines/whitespace, trim.
 */
function cleanDesc(desc) {
  if (!desc) return '';
  return desc
    .replace(/\r\n/g, ' ')
    .replace(/\n/g, ' ')
    .replace(/\s{2,}/g, ' ')
    .trim();
}

// ─── Scraping logic ────────────────────────────────────────────────────────

async function fetchCategory(catId) {
  const url = `${BASE_URL}?takeaway=&cat=${catId}`;
  const res = await fetch(url, { headers: FETCH_HEADERS });
  if (!res.ok) throw new Error(`HTTP ${res.status} for cat ${catId}`);
  return res.text();
}

function parseItems(html) {
  const $ = load(html);
  const items = [];

  $('.div-dettaglio-piatto').each((_i, el) => {
    // Name: first .fs-6.fw-semibold inside the flex container, minus child elements (icons)
    const nameEl = $(el).find('.fs-6.fw-semibold').first();
    const rawName = nameEl.clone().children().remove().end().text().trim();
    if (!rawName) return;
    const name = toTitleCase(rawName);

    // Price: the badge element with price text
    const priceRaw = $(el).find('.badge.text-dark').text().trim();
    // Convert "7,00€" → "7.00"
    const price = priceRaw.replace('€', '').replace(',', '.').trim() || null;

    // Description — clean up whitespace
    const desc = cleanDesc($(el).find('.text-muted.text-start').text());

    // Tags from Plateform (Più venduto, Specialità, Novità, Vegetariano, Piccante)
    const tags = [];
    $(el).find('label.badge.rounded-pill').each((_j, t) => {
      tags.push($(t).text().trim());
    });

    // Skip items with no price (not available for ordering / display)
    if (!price || price === '0.00') return;

    items.push({ name, price, desc, tags });
  });

  return items;
}

function detectBadges(desc, name) {
  const badges = [];
  const text = `${name} ${desc}`;
  for (const { pattern, badge } of QUALITY_BADGE_PATTERNS) {
    if (pattern.test(text) && !badges.includes(badge)) {
      badges.push(badge);
    }
  }
  return badges;
}

function getHoverImage(name) {
  const key = name.toLowerCase().trim();
  return HOVER_IMAGES[key] || null;
}

// ─── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('[sync-menu] Fetching menu from Plateform...');

  // Fetch all categories in parallel
  const results = await Promise.allSettled(
    CATEGORY_MAP.map(async (cat) => {
      const html = await fetchCategory(cat.catId);
      const items = parseItems(html);
      return { ...cat, items };
    })
  );

  // Check for failures
  const succeeded = [];
  const failed = [];
  for (const [i, result] of results.entries()) {
    if (result.status === 'fulfilled') {
      succeeded.push(result.value);
    } else {
      failed.push({ cat: CATEGORY_MAP[i], error: result.reason.message });
    }
  }

  if (failed.length > 0) {
    console.warn(`[sync-menu] WARNING: ${failed.length} categories failed to fetch:`);
    for (const f of failed) {
      console.warn(`  - ${f.cat.heading} (${f.cat.catId}): ${f.error}`);
    }
  }

  if (succeeded.length === 0) {
    console.error('[sync-menu] All fetches failed. Keeping existing menuData.js.');
    return;
  }

  // Group sections by site category
  const sectionsByCategory = {};
  for (const { siteCategory, heading, items } of succeeded) {
    if (!sectionsByCategory[siteCategory]) sectionsByCategory[siteCategory] = [];
    if (items.length > 0) {
      sectionsByCategory[siteCategory].push({ heading, items });
    }
  }

  // Build the menuCategories array
  const menuCategories = SITE_CATEGORIES.map((cat) => {
    const sections = (sectionsByCategory[cat.id] || []).map((section) => ({
      heading: section.heading,
      items: section.items.map((item) => {
        const entry = { name: item.name, desc: item.desc, price: item.price };
        const badges = detectBadges(item.desc, item.name);
        if (badges.length > 0) entry.badges = badges;
        const hoverImg = getHoverImage(item.name);
        if (hoverImg) entry.hoverImage = hoverImg;
        return entry;
      }),
    }));
    const result = { id: cat.id, title: cat.title, subtitle: cat.subtitle, heroImage: cat.heroImage, sections };
    if (cat.heroFit) result.heroFit = cat.heroFit;
    return result;
  });

  // Build signatureDishes (curated — update prices from scraped data)
  const allItems = succeeded.flatMap((s) => s.items);
  const signatureDishes = buildSignatureDishes(allItems);

  // Count items
  const totalItems = menuCategories.reduce(
    (sum, cat) => sum + cat.sections.reduce((s2, sec) => s2 + sec.items.length, 0),
    0
  );
  console.log(`[sync-menu] Fetched ${totalItems} items across ${menuCategories.length} categories.`);

  // Generate JS file content
  const jsContent = generateMenuDataJS(menuCategories, signatureDishes);

  if (DRY_RUN) {
    console.log('[sync-menu] DRY RUN — would write to:', MENU_DATA_PATH);
    console.log(jsContent.slice(0, 2000) + '\n...');
    return;
  }

  writeFileSync(MENU_DATA_PATH, jsContent, 'utf-8');
  console.log(`[sync-menu] Updated ${MENU_DATA_PATH}`);
  console.log(`[sync-menu] Done. ${totalItems} items synced from Plateform.`);
}

// ─── Signature dishes (curated) ────────────────────────────────────────────

const SIGNATURE_DISH_CONFIG = [
  {
    name: 'Bronte 2.0',
    matchName: 'bronte 2.0',
    poeticDesc: 'Burrata che si scioglie, mortadella che sussurra, pistacchio di Bronte che incorona.',
    image: '/images/menu/signature-bronte.webp',
  },
  {
    name: 'La Nerano',
    matchName: 'la nerano',
    poeticDesc: "Spaghetti avvolti nella crema di zucchine, un profumo di menta, il Monaco che benedice.",
    image: '/images/menu/signature-nerano.webp',
  },
  {
    name: 'Delizia al Limone',
    matchName: 'delizia al limone',
    poeticDesc: "Il sole della Costiera racchiuso in un cucchiaio. Limone d'Amalfi, dolcezza infinita.",
    image: '/images/menu/signature-delizia.webp',
  },
];

function buildSignatureDishes(allItems) {
  return SIGNATURE_DISH_CONFIG.map((sig) => {
    const found = allItems.find((item) => item.name.toLowerCase().trim() === sig.matchName);
    return {
      name: sig.name,
      poeticDesc: sig.poeticDesc,
      price: found ? found.price : '0.00',
      image: sig.image,
    };
  });
}

// ─── JS file generation ────────────────────────────────────────────────────

function escapeStr(s) {
  if (!s) return '';
  return s
    .replace(/\\/g, '\\\\')
    .replace(/'/g, "\\'")
    .replace(/\u2019/g, "\\'")  // right single quote '
    .replace(/\u2018/g, "\\'")  // left single quote '
    .replace(/\u201C/g, '"')    // left double quote "
    .replace(/\u201D/g, '"')    // right double quote "
    .replace(/\u2014/g, '\\u2014') // em dash —
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

function generateMenuDataJS(menuCategories, signatureDishes) {
  const timestamp = new Date().toISOString();
  let out = `/**
 * Menu data for Mo Pizz restaurant.
 *
 * AUTO-GENERATED by scripts/sync-menu.mjs from Plateform data.
 * Last synced: ${timestamp}
 *
 * DO NOT EDIT MANUALLY — changes will be overwritten on next sync.
 * To update hover images or signature dishes, edit scripts/sync-menu.mjs instead.
 *
 * Exports:
 *   menuCategories  - array of category objects
 *   signatureDishes - array of signature dish objects for the highlight section
 */

export const menuCategories = [\n`;

  for (let ci = 0; ci < menuCategories.length; ci++) {
    const cat = menuCategories[ci];
    out += `  {\n`;
    out += `    id: '${cat.id}',\n`;
    out += `    title: '${escapeStr(cat.title)}',\n`;
    out += `    subtitle: '${escapeStr(cat.subtitle)}',\n`;
    out += `    heroImage: '${cat.heroImage}',\n`;
    if (cat.heroFit) out += `    heroFit: '${cat.heroFit}',\n`;
    out += `    sections: [\n`;

    for (let si = 0; si < cat.sections.length; si++) {
      const sec = cat.sections[si];
      out += `      {\n`;
      out += `        heading: '${escapeStr(sec.heading)}',\n`;
      out += `        items: [\n`;

      for (let ii = 0; ii < sec.items.length; ii++) {
        const item = sec.items[ii];
        out += `          { name: '${escapeStr(item.name)}', desc: '${escapeStr(item.desc)}', price: '${item.price || '0.00'}'`;
        if (item.badges && item.badges.length > 0) {
          out += `, badges: [${item.badges.map((b) => `'${b}'`).join(', ')}]`;
        }
        if (item.hoverImage) {
          out += `, hoverImage: '${item.hoverImage}'`;
        }
        out += ` },\n`;
      }

      out += `        ],\n`;
      out += `      },\n`;
    }

    out += `    ],\n`;
    out += `  },\n`;
  }

  out += `];\n\n`;

  // Signature dishes
  out += `export const signatureDishes = [\n`;
  for (const sig of signatureDishes) {
    out += `  {\n`;
    out += `    name: '${escapeStr(sig.name)}',\n`;
    out += `    poeticDesc: '${escapeStr(sig.poeticDesc)}',\n`;
    out += `    price: '${sig.price}',\n`;
    out += `    image: '${sig.image}',\n`;
    out += `  },\n`;
  }
  out += `];\n`;

  return out;
}

// ─── Run ───────────────────────────────────────────────────────────────────

main().catch((err) => {
  console.error('[sync-menu] Fatal error:', err.message);
  console.error('[sync-menu] Keeping existing menuData.js. Build will continue.');
  // Exit 0 so we don't block the build
});
