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

import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const MENU_DATA_PATH = join(__dirname, '..', 'src', 'data', 'menuData.js');
const DRY_RUN = process.argv.includes('--dry');

// ─── Plateform JSON API ────────────────────────────────────────────────────
// The Plateform takeaway page is a Vue SPA — the initial HTML no longer
// contains any menu markup. The SPA boots and POSTs to a backend JSON API
// using a static Bearer token extracted from its bundle. We call the same
// endpoint directly; no headless browser needed.
const API_URL = 'https://mopizz.plateform.app/backend/api/frontpage/menu/detail';
const API_BEARER = 'Bearer Kwgu@7!XW8kQ@yP6';
const ID_MENU = 'momenu';
const MENU_CONTEXT = 'takeaway';

// ─── Plateform category IDs → site structure mapping ───────────────────────
// CATEGORY_ORDER drives both the order of sections inside each site
// category and which API categories are included. Section headings are
// taken straight from the API's `nome` field; only the site bucket and
// ordering are hardcoded here. IDs not listed below are skipped (e.g.
// 46541946 "Menù fisso pranzo" is surfaced via menuFissoData.js, not the
// main horizontal-scroll menu).
const CATEGORY_ORDER = [
  // La Pizzeria
  { catId: 46263768, siteCategory: 'pizzeria' }, // Pizze classiche
  { catId: 46263769, siteCategory: 'pizzeria' }, // Pizze di chef Moschiano
  { catId: 46289265, siteCategory: 'pizzeria' }, // Ripieni fritti
  { catId: 46289264, siteCategory: 'pizzeria' }, // Ripieni al forno
  // La Cucina
  { catId: 48485609, siteCategory: 'cucina' },   // Antipasti
  { catId: 46263507, siteCategory: 'cucina' },   // Friggitoria
  { catId: 48486023, siteCategory: 'cucina' },   // Primi della tradizione
  { catId: 48486385, siteCategory: 'cucina' },   // Secondi piatti
  { catId: 46263736, siteCategory: 'cucina' },   // Contorni
  { catId: 46263774, siteCategory: 'cucina' },   // Bambini
  // I Dolci
  { catId: 46263770, siteCategory: 'dolci' },    // Dolci
  // Birre & Vini
  { catId: 46263771, siteCategory: 'bevande' },  // Birre artigianali
  { catId: 46290917, siteCategory: 'bevande' },  // La cantinetta
  { catId: 46263772, siteCategory: 'bevande' },  // Bevande
  { catId: 46263773, siteCategory: 'bevande' },  // Caffè e amari
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
  return forceTitleCase(str);
}

// Always Title Case every significant word (used for category headings,
// which come from the API in arbitrary casing like "Pizze classiche").
function forceTitleCase(str) {
  if (!str) return str;
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

// ─── API client ────────────────────────────────────────────────────────────

async function fetchMenuDetail() {
  const body = new URLSearchParams({
    idMenu: ID_MENU,
    language: 'it',
    menuContext: MENU_CONTEXT,
  }).toString();
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': API_BEARER,
      'Accept-Language': 'it-IT,it;q=0.9',
      'User-Agent': 'MoPizz-MenuSync/1.0',
    },
    body,
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} from menu/detail`);
  const json = await res.json();
  if (!json.status) throw new Error(`API error: ${json.message}`);
  if (!json.data || !Array.isArray(json.data.categories)) {
    throw new Error('Unexpected response shape (missing data.categories)');
  }
  return json.data.categories;
}

// Convert one API piatto to our internal item shape. Returns null for
// items that shouldn't be displayed (no/zero price, unavailable).
function piattoToItem(piatto) {
  const rawPrice = piatto.prezzoString || (piatto.prezzo != null ? String(piatto.prezzo) : '');
  // "13,00" → "13.00"
  let price = rawPrice.replace(',', '.').trim();
  if (price && !price.includes('.')) price = `${price}.00`;
  if (!price || price === '0.00' || piatto.disponibilita === 0) return null;

  const name = toTitleCase((piatto.nome || '').trim());
  if (!name) return null;
  const desc = cleanDesc(piatto.descrizione || '');
  return { name, price, desc, tags: [] };
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
  console.log('[sync-menu] Fetching menu from Plateform API...');

  let apiCategories;
  try {
    apiCategories = await fetchMenuDetail();
  } catch (err) {
    console.error(`[sync-menu] Fetch failed: ${err.message}`);
    console.error('[sync-menu] Keeping existing menuData.js.');
    return;
  }

  // Index API categories by id for lookup
  const apiById = new Map();
  for (const cat of apiCategories) apiById.set(cat.id, cat);

  // Group sections by site category, preserving CATEGORY_ORDER order
  const sectionsByCategory = {};
  const missing = [];
  for (const { catId, siteCategory } of CATEGORY_ORDER) {
    const apiCat = apiById.get(catId);
    if (!apiCat) {
      missing.push(catId);
      continue;
    }
    const items = (apiCat.piatti || [])
      .map(piattoToItem)
      .filter(Boolean);
    if (items.length === 0) continue;
    if (!sectionsByCategory[siteCategory]) sectionsByCategory[siteCategory] = [];
    sectionsByCategory[siteCategory].push({
      heading: forceTitleCase(apiCat.nome.trim()),
      items,
    });
  }

  if (missing.length > 0) {
    console.warn(`[sync-menu] WARNING: ${missing.length} expected categories not returned by API: ${missing.join(', ')}`);
  }

  // Synthesise the succeeded[] shape that buildSignatureDishes still expects
  const succeeded = Object.values(sectionsByCategory).flat();

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

  // Sanity guard: refuse to write if the API returned suspiciously few
  // items. A silent wipe (sections: [] across the board) once shipped to
  // prod and left the site rendering blank gray panels — never again.
  const MIN_ITEMS_THRESHOLD = 20;
  if (totalItems < MIN_ITEMS_THRESHOLD) {
    console.error(`[sync-menu] ABORT: only ${totalItems} items parsed (threshold ${MIN_ITEMS_THRESHOLD}). API contract or category IDs likely changed. Keeping existing menuData.js intact.`);
    // Exit 0 so the build proceeds with the previous menuData.js. The loud
    // stderr above is the signal to investigate.
    return;
  }

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
