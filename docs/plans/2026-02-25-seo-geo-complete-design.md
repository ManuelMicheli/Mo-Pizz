# SEO & Local SEO Completa — Mo Pizz

**Data:** 2026-02-25
**URL produzione:** https://mo-pizz.vercel.app/
**Stato:** Approvato

## 1. Prerendering a Build Time

- Installare `vite-plugin-prerender` per generare HTML statico della route `/`
- I crawler vedranno il contenuto completo invece di `<div id="root"></div>`

## 2. Meta Tags Completi (`index.html`)

- Canonical URL
- Open Graph completo (og:url, og:site_name, og:image con pizzeria-hero.webp)
- Twitter Card (summary_large_image)
- GEO tags (geo.region=IT-MI, geo.placename=Legnano, geo.position=45.5980;8.9060)
- theme-color (#1A1A1A)
- apple-touch-icon e favicon
- hreflang it-IT

## 3. JSON-LD Structured Data

- @type Restaurant con: nome, indirizzo, coordinate, telefono, orari, cucina, prezzo, social
- @type Menu annidato con tutte le categorie e piatti
- BreadcrumbList

## 4. robots.txt

Allow all, punta a sitemap.

## 5. sitemap.xml

Route principale, lastmod, priority 1.0.

## 6. manifest.json

Brand colors, icone, nome app.

## 7. Semantic HTML

- `<main>` wrapper
- Gerarchia heading corretta
- alt text e aria-label

## 8. CSP & Vercel Headers

- CSP aggiornata per OG crawlers
- Cache headers per asset statici
