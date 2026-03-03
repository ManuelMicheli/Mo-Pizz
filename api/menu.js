import * as cheerio from 'cheerio';

const PLATEFORM_BASE = 'https://mopizz.plateform.app/menu/momenu';

/**
 * Maps Plateform category IDs → site category structure.
 * Static props (heroImage, subtitle, heroFit) are site-specific.
 * The items inside each section come dynamically from Plateform.
 */
const CATEGORIES_CONFIG = [
  {
    id: 'pizzeria',
    title: 'La Pizzeria',
    subtitle:
      "Fiordilatte del Matese IGP, San Marzano dell'Agro Sarnese IGP, 48 ore di doppia lievitazione",
    heroImage: '/images/menu/pizzeria-hero.webp',
    sections: [
      { catId: '46263768', heading: 'Le Classiche' },
      { catId: '46263769', heading: 'Le Mo Pizz dello Chef' },
      { catId: '46289265', heading: 'Fritti' },
      { catId: '46289264', heading: 'Ripieni' },
    ],
  },
  {
    id: 'cucina',
    title: 'La Cucina',
    subtitle: 'Antipasti, primi e secondi della tradizione napoletana',
    heroImage: '/images/menu/cucina-hero.webp',
    heroFit: 'contain',
    sections: [
      { catId: '46263507', heading: 'Antipasti di Mare' },
      { catId: '48485609', heading: 'Antipasti, Sfizi e Fritti' },
      { catId: '46263734', heading: 'Primi di Mare' },
      { catId: '48486023', heading: 'Primi della Tradizione' },
      { catId: '46263735', heading: 'Secondi di Mare' },
      { catId: '48486385', heading: 'Secondi di Carne' },
      { catId: '46263736', heading: 'Contorni' },
      { catId: '46263774', heading: 'Per i Bambini' },
    ],
  },
  {
    id: 'dolci',
    title: 'I Dolci',
    subtitle: "Il finale perfetto — pasticceria campana d'autore",
    heroImage: '/images/menu/dolci-hero.webp',
    heroFit: 'contain',
    sections: [{ catId: '46263770', heading: 'Dolci della Tradizione' }],
  },
  {
    id: 'bevande',
    title: 'Birre & Vini',
    subtitle: 'Artigianali, selezionate, italiane',
    heroImage: '/images/menu/bevande-hero.webp',
    heroFit: 'contain',
    sections: [
      { catId: '46263771', heading: 'Birre Artigianali' },
      { catId: '46290917', heading: 'Vini' },
      { catId: '46263772', heading: 'Bevande' },
      { catId: '46263773', heading: 'Caffè & Digestivi' },
    ],
  },
];

/**
 * Parse menu items from a Plateform category page HTML.
 *
 * Each item lives in a `div.div-dettaglio-piatto` with:
 *   - Name: first `.fs-6.fw-semibold` (not `.badge`), text only (strip icons)
 *   - Price: `.fs-6.fw-semibold.badge` → "7,00€" → "7.00"
 *   - Description: `.text-muted` (optional)
 */
function parseItems(html) {
  const $ = cheerio.load(html);
  const items = [];

  $('.div-dettaglio-piatto').each((_, el) => {
    const $el = $(el);

    // Name: .fs-6.fw-semibold that is NOT a .badge
    const nameEl = $el.find('.fs-6.fw-semibold').not('.badge').first();
    // Clone, remove child elements (icons like snowflake), get text only
    const name = nameEl.clone().children().remove().end().text().trim();

    // Price: .fs-6.fw-semibold.badge → "7,00€" → "7.00"
    const priceRaw = $el.find('.fs-6.fw-semibold.badge').text().trim();
    const price = priceRaw.replace('€', '').replace(',', '.').trim();

    // Description: .text-muted (optional)
    const desc = $el.find('.text-muted').text().trim();

    if (name && price) {
      items.push({ name, desc: desc || '', price });
    }
  });

  return items;
}

export default async function handler(req, res) {
  // Only allow GET
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // CDN cache: 1 hour, serve stale while revalidating for 10 min
  res.setHeader(
    'Cache-Control',
    's-maxage=3600, stale-while-revalidate=600'
  );

  try {
    // Collect all unique Plateform category IDs
    const allCatIds = CATEGORIES_CONFIG.flatMap((cat) =>
      cat.sections.map((s) => s.catId)
    );

    // Fetch all category pages in parallel with Italian language cookie
    const results = await Promise.allSettled(
      allCatIds.map((catId) =>
        fetch(`${PLATEFORM_BASE}?cat=${catId}`, {
          headers: {
            Cookie: 'frontpageLanguage=it',
            'Accept-Language': 'it',
          },
        }).then((r) => r.text())
      )
    );

    // Build a map: catId → parsed items
    const itemsMap = {};
    allCatIds.forEach((catId, i) => {
      if (results[i].status === 'fulfilled') {
        itemsMap[catId] = parseItems(results[i].value);
      } else {
        itemsMap[catId] = [];
      }
    });

    // Assemble the menu categories in the site's format
    const menuCategories = CATEGORIES_CONFIG.map((cat) => ({
      id: cat.id,
      title: cat.title,
      subtitle: cat.subtitle,
      heroImage: cat.heroImage,
      ...(cat.heroFit && { heroFit: cat.heroFit }),
      sections: cat.sections
        .map((section) => ({
          heading: section.heading,
          items: itemsMap[section.catId] || [],
        }))
        .filter((s) => s.items.length > 0),
    }));

    return res.status(200).json({
      menuCategories,
      lastUpdated: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Menu API error:', err);
    return res.status(500).json({ error: 'Failed to fetch menu data' });
  }
}
