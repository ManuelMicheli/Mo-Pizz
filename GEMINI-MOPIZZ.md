# Cinematic Landing Page Builder — MO PIZZ

## Role

Act as a World-Class Senior Creative Technologist and Lead Frontend Engineer. You build high-fidelity, cinematic "1:1 Pixel Perfect" landing pages. Every site you produce should feel like a digital instrument — every scroll intentional, every animation weighted and professional. Eradicate all generic AI patterns.

## Pre-Filled Answers (Skip AskUserQuestion — Build Immediately)

The discovery phase is complete. Build the full site directly from these answers:

1. **Brand name and one-line purpose:** "Mo Pizz — La vera pizza napoletana verace a Legnano. Impasto 48h, forno a legna a 450°C, ingredienti DOP dal cuore della Campania."
2. **Aesthetic direction:** Custom Preset — **"Fuoco Napoletano"** (defined below)
3. **3 key value propositions:**
   - **Impasto Artigianale** — Lievitazione naturale 48–60 ore, idratazione >60%. Ogni pizza è morbida, digeribile e dal sapore inconfondibile.
   - **Ingredienti DOP & Slow Food** — Solo materie prime D.O.P., I.G.P. e Presidio Slow Food selezionate da piccoli agricoltori campani. San Marzano, Bufala DOCG, Provola di Agerola.
   - **Forno a Legna 450°C+** — Cottura tradizionale napoletana in forno a legna rigorosamente oltre i 450 gradi per una croccantezza perfetta e il sapore autentico del fuoco.
4. **Primary CTA:** "Prenota un Tavolo" (secondary: "Scopri il Menu")

---

## Custom Aesthetic Preset — "Fuoco Napoletano" (Artisan Fire)

- **Identity:** A Neapolitan pizzeria that feels like stepping into a premium food editorial — the warmth of a wood-fired oven meets the elegance of a contemporary Italian design studio. Rustic authenticity elevated to cinematic level. Think: the cover of Bon Appétit shot inside a Naples alley at golden hour.
- **Palette:**
  - Charcoal `#1A1A1A` (Primary / Dark backgrounds)
  - Flame `#E85D26` (Accent — the fire, the heat, the passion)
  - Cream `#FFF8F0` (Background / Light text on dark)
  - Ember `#C94A1A` (Secondary accent — brick red, depth)
  - Gold `#D4A853` (Tertiary — premium badges, highlights, stars)
  - Smoke `#8A8278` (Muted text, captions)
  - Flour `#F5F0E8` (Alternate light background)
  - Wood `#6B4226` (Tertiary — warm brown details)
- **Typography:**
  - Headings: `"Playfair Display"` weight 700, 900 (editorial, warm serif)
  - Body/UI: `"DM Sans"` weight 400, 500, 700 (clean, modern, readable)
  - Drama/Accents: `"Caveat"` weight 400, 700 (handwritten, authentic, personal — for chef quotes, labels, annotations)
  - Data/Monospace: `"DM Mono"` (for badges, small labels)
- **Image Mood:** wood-fired oven flames, Neapolitan pizza close-up dough texture, rustic Italian brick walls, flour dust in warm light, San Marzano tomatoes on vine, fresh mozzarella di bufala, Naples street food atmosphere, artisan hands kneading dough, warm amber firelight.
- **Hero line pattern:** "La Vera" (Bold Sans, Cream) / "Pizza Napoletana." (Massive Serif Italic, Flame accent on "Napoletana")

---

## Fixed Design System (NEVER CHANGE)

These rules apply to ALL presets. They are what make the output premium.

### Visual Texture
- Implement a global CSS noise overlay using an inline SVG `<feTurbulence>` filter at **0.05 opacity** to eliminate flat digital gradients. This gives the site a warm, grainy, filmic quality that matches the artisan fire aesthetic.
- Use a `rounded-[2rem]` to `rounded-[3rem]` radius system for all containers. No sharp corners anywhere.

### Micro-Interactions
- All buttons must have a **"magnetic" feel**: subtle `scale(1.03)` on hover with `cubic-bezier(0.25, 0.46, 0.45, 0.94)`.
- Buttons use `overflow-hidden` with a sliding background `<span>` layer for color transitions on hover.
- Links and interactive elements get a `translateY(-1px)` lift on hover.

### Animation Lifecycle
- Use `gsap.context()` within `useEffect` for ALL animations. Return `ctx.revert()` in the cleanup function.
- Default easing: `power3.out` for entrances, `power2.inOut` for morphs.
- Stagger value: `0.08` for text, `0.15` for cards/containers.

---

## Component Architecture — MO PIZZ SPECIFIC

### A. NAVBAR — "The Floating Island"
A `fixed` pill-shaped container, horizontally centered.
- **Morphing Logic:** Transparent with cream text at hero top. Transitions to `bg-cream/60 backdrop-blur-xl` with charcoal text and a subtle warm border when scrolled past the hero. Use `IntersectionObserver` or ScrollTrigger.
- Contains:
  - **Logo:** "Mo Pizz" as styled text — "Mo" in DM Sans 700 uppercase, "Pizz" in Playfair Display 900 italic. Both in cream (hero) → charcoal (scrolled).
  - **Nav links:** Home, Chi Siamo, Menu, Lo Chef, Contatti — DM Sans 500
  - **CTA button:** "Prenota Ora" — Flame background, cream text, with phone icon (Lucide `Phone`)
- **Mobile:** Collapse to hamburger menu. Logo left, hamburger right. Full-screen overlay menu on open with staggered link reveal animation. Dark charcoal background, cream links, Flame accent on active.

### B. HERO SECTION — "The Opening Shot"
- `100dvh` height. Full-bleed Unsplash background image (search: **"wood fired pizza oven flames dark restaurant"** or **"neapolitan pizza close-up artisan"**) with a heavy **charcoal-to-black gradient overlay** from bottom (`bg-gradient-to-t from-[#1A1A1A] via-[#1A1A1A]/80 to-transparent`).
- **Additional layer:** A soft radial gradient glow in Flame/Ember color emanating from the bottom center, simulating the warmth of the oven.
- **Layout:** Content pushed to the **bottom-left third** using flex + generous padding.
- **Typography Stack (top to bottom):**
  1. Micro-label: `"PIZZERIA NAPOLETANA VERACE • LEGNANO"` — DM Mono, Gold color, letter-spacing 4px, uppercase, small
  2. Line 1: `"La Vera"` — Playfair Display 900, Cream, massive (clamp 3rem–8rem)
  3. Line 2: `"Pizza Napoletana."` — Playfair Display 900 Italic, Flame color, even larger (clamp 4rem–10rem)
  4. Subtitle: `"Impasto lievitato 48 ore. Forno a legna a 450°C. Ingredienti DOP dal cuore della Campania."` — DM Sans 400, Smoke color, max-width 550px
  5. **Two CTA buttons side by side:**
     - "Scopri il Menu" — outlined, cream border, cream text → hover fills with cream, text becomes charcoal
     - "Prenota un Tavolo" — filled Flame background, cream text → hover darkens to Ember
- **Animation:** GSAP staggered `fade-up` (y: 40 → 0, opacity: 0 → 1) for each element: label → line1 → line2 → subtitle → buttons. Total ~1.5s.
- **Scroll indicator:** Bouncing down-arrow (Lucide `ChevronDown`) at bottom center, infinite CSS `@keyframes bounce`.

### C. FEATURES — "Interactive Functional Artifacts" (La Nostra Filosofia)

Section heading at top: micro-label `"CHI SIAMO"` (Gold, monospace, tracking) + Title `"Passione, Tradizione e Fuoco"` (Playfair Display 700, Charcoal on Flour background).

Three cards derived from Mo Pizz's core value propositions. These must feel like **functional micro-UIs**, not static cards. Flour background for the section.

**Card 1 — "Impasto Artigianale" — Diagnostic Shuffler:**
3 overlapping cards that cycle vertically using `array.unshift(array.pop())` logic every 3 seconds with a spring-bounce transition. The 3 sub-cards show:
- "48–60h Lievitazione Naturale"
- "Idratazione >60%"
- "Morbidezza & Digeribilità"
Each sub-card has a small icon/emoji and DM Mono label. Card heading: "Impasto Artigianale". Descriptor: "Un processo di maturazione che trasforma acqua e farina in qualcosa di straordinario."

**Card 2 — "Ingredienti DOP" — Telemetry Typewriter:**
A monospace live-text feed that types out ingredient origins character-by-character with a blinking Flame-colored cursor. Messages cycling:
- `"> Pomodoro San Marzano DOP — Campania"`
- `"> Bufala Campana DOCG — Caserta"`
- `"> Provola di Agerola — Monti Lattari"`
- `"> Alici di Cetara — Costa d'Amalfi"`
- `"> Pistacchio di Bronte — Sicilia"`
Include a "Tracciabilità Live" label with a pulsing Gold dot. Card heading: "Ingredienti DOP & Slow Food". Descriptor: "Ogni ingrediente ha un nome, un'origine e una storia. Solo eccellenze certificate."

**Card 3 — "Forno a Legna" — Temperature Protocol:**
Instead of the cursor scheduler, create a **live temperature gauge** — an animated SVG semicircular gauge that sweeps from 0 to 450°C+ with a glowing Flame needle. Below it, a pulsing `"450°C+"` readout in DM Mono bold with a subtle ember glow animation. A small label: "Temperatura Forno — Operativo". Card heading: "Forno a Legna Tradizionale". Descriptor: "Cottura fulminea ad altissima temperatura. Il segreto della croccantezza perfetta e del cornicione leopardato."

All cards: Cream/white surface, subtle warm border, `rounded-[2rem]`, soft drop shadow. GSAP scroll-triggered entrance with stagger 0.15.

### D. MENU SECTION — "The Archive" ⭐ (MOST IMPORTANT SECTION)

This is the heart of the site. Full-width section, Charcoal background with noise overlay.

**Section header:** Micro-label `"IL MENÙ"` + Title `"Le Nostre Pizze"` (Playfair Display 700, Cream) + Subtitle in Caveat: `"Tradizione napoletana, ingredienti d'eccellenza"` (Gold)

**Tab Navigation (horizontal, scrollable on mobile):**
Tabs: `Le Classiche Rivisitate` | `Le Mo Pizz dello Chef` | `Fritti & Antipasti` | `Dolci` | `Business Lunch`
- Active tab: Flame underline (thick, animated slide between tabs), DM Sans 700
- Inactive: Smoke color, DM Sans 400
- On mobile: horizontal scroll with `overflow-x: auto`, `scroll-snap-type: x mandatory`

**Pizza Cards Grid:**
- Desktop: 3 columns
- Tablet: 2 columns
- Mobile: 1 column full-width

**Each pizza card:**
- Top area: decorative gradient placeholder (warm amber-to-ember radial gradient simulating a pizza photo, with a subtle 🍕 or flame icon centered)
- Pizza name: Playfair Display 700, Cream
- Ingredients list: DM Sans 400 italic, Smoke color, with DOP/IGP/Slow Food inline badges in Gold
- Hover: `translateY(-4px)`, deeper shadow, left border appears in Flame
- `rounded-[2rem]`, surface slightly lighter than Charcoal (`#242424`)

**PIZZE DA INCLUDERE:**

**Tab "Le Classiche Rivisitate":**
1. **Margherita Verace** — San Marzano DOP, fiordilatte del Matese, basilico fresco, olio EVO
2. **Bufala Campana** — San Marzano DOP, Bufala Campana DOCG, basilico, olio EVO
3. **Capricciosa DOP** — San Marzano DOP, fiordilatte del Matese, prosciutto cotto DOP, champignon freschi, taggiasche, carciofino alla romana, basilico, olio EVO
4. **Salsiccia & Friarielli** — Fiordilatte del Matese, salsiccia del nero casertano, friarielli napoletani, provola di Agerola affumicata con paglia, basilico, olio EVO
5. **Salsiccia Peperoni** — San Marzano DOP, fiordilatte del Matese, salsiccia del nero casertano, taggiasche, peperoni arrostiti, basilico, olio EVO

**Tab "Le Mo Pizz dello Chef":**
6. **La Cetarese** — Pelato San Marzano DOP, mousse di ricotta di bufala, alici di Cetara, origano di Sicilia, basilico, olio EVO
7. **La Porchetta** — Fiordilatte del Matese, porchetta di Ariccia, rossa di Tropea stufata, rughetta croccante, catterino del Vesuvio
8. **La Burrata** — Fiordilatte del Matese, basilico, olio EVO, burratina di Murgia DOP, mortadella, granella di pistacchio di Bronte
9. **Pera & Taleggio** — Fiordilatte del Matese, pere confit, Taleggio DOP, speck del Trentino, noci di Sorrento, miele
10. **La Bresaolina** — Bordo ripieno di ricotta e menta, San Marzano DOP, fiordilatte del Matese, bresaola di bufala, rughetta croccante, scaglie di Parmigiano Reggiano 24 mesi

**Tab "Fritti & Antipasti":**
- Fritturine napoletane miste
- Patatine fritte artigianali
- Crudo di Parma 24 mesi con Bufala Campana DOCG
- Tagliere di salumi campani d'eccellenza

**Tab "Dolci":** (nota: "Pasticceria Sal De Riso — Amalfi")
- Delizia al limone (crema al limone, Costa d'Amalfi IGP)
- Babà napoletano
- Pastiera napoletana
- Cannolo
- Tiramisù

**Tab "Business Lunch":** (Solo Venerdì e Sabato, 12:00–14:30)
Una card speciale su sfondo Flour con 3 formule:
- 🍕 **Pizza Lunch** — Una pizza da "Le Classiche" + bibita/acqua/birra + caffè
- 🥗 **Soft Lunch** — Insalatona mista + bibita/acqua/birra + caffè
- 🧀 **Crudo & Bufala** — Crudo di Parma 24 mesi + Bufala Campana DOCG + bibita/acqua/birra + caffè
Label: "Tutti i Business Lunch includono una bevanda e un Caffè Izzo — premiato Espresso dell'Anno"

### E. LO CHEF — "The Manifesto"
- Full-width section with **split background**: left half Flour, right half Charcoal (desktop). On mobile: stacked, Flour background throughout.
- **Left side (Flour):** Large circular placeholder for chef photo — circle with Ember→Flame gradient fill, 4px Gold border, subtle shadow. Center a chef hat icon (Lucide `ChefHat`) or a flame icon.
- **Right side (Charcoal):**
  - Micro-label: `"IL PIZZAIOLO"` — Gold, DM Mono, tracking
  - Name: `"Cristian Moschiano"` — Playfair Display 900, Cream, massive
  - Subtitle in Caveat 700: `"Classe 1994 — La tradizione nelle mani di una nuova generazione"` — Gold
  - Bio paragraph (DM Sans 400, Smoke/Cream):
    > "Cristian ha dedicato la sua vita alla pizza napoletana. Dopo l'esperienza al Made in Sud di Gorla Minore, ha fondato Mo Pizz con un obiettivo chiaro: creare un brand interamente incentrato sulla verace napoletana, senza compromessi. Ogni giorno seleziona personalmente le materie prime, cura l'impasto e la cottura, fondendo tradizione e innovazione in ogni pizza che esce dal suo forno a legna."
  - **Quote block** — Caveat 700 italic, large (clamp 1.5rem–2.5rem), Cream, with decorative oversized Gold `"` quotation marks:
    > *"La pizza è rispetto per la materia prima e amore per il fuoco."*
- **Animation:** GSAP parallax on the photo circle. Text fade-up stagger on scroll.

### F. RECENSIONI — "Social Proof Carousel"
- Charcoal background with noise overlay.
- **Header:** Micro-label `"DICONO DI NOI"` + Title `"Cosa Dicono i Nostri Clienti"` (Playfair Display 700, Cream)
- **Badge row below title:** `"⭐ 4.2/5 su Google — 620+ recensioni"` + `"🏆 Travellers' Choice Tripadvisor"` — Gold badges with subtle border, rounded-full, DM Sans 500
- **Carousel:** Horizontal scroll-snap slider. Auto-play every 5 seconds, pause on hover/touch.
  - Desktop: 3 cards visible
  - Tablet: 2 cards visible
  - Mobile: 1 card visible, swipeable
- **Review cards** (4 reviews):
  1. ⭐⭐⭐⭐⭐ — *"Pizza eccezionale! Senza dubbio una delle più buone di Legnano. Sono anni che mi servo da loro, la consiglio fortemente!"*
  2. ⭐⭐⭐⭐⭐ — *"La nostra pizzeria preferita! Pizza buonissima, leggera e con ingredienti di qualità. Lo staff gentilissimo e molto simpatico!"*
  3. ⭐⭐⭐⭐⭐ — *"Ottima pizza gustosissima, personale cordiale e simpatico, sala molto accogliente. Più che consigliato!"*
  4. ⭐⭐⭐⭐⭐ — *"Impasto eccezionale, materie prime ottime. I frittini come antipasto preparati alla perfezione. Consigliatissimo."*
- Each card: semi-transparent Charcoal surface (`#242424`), Gold border subtle, oversized Gold `"` quote mark top-left, stars in Gold, review text in Cream DM Sans 400 italic, reviewer tag "— Cliente Google" in Smoke.
- **Navigation:** Dot indicators bottom center (Gold active, Smoke inactive) + subtle arrow buttons on desktop.

### G. CONTATTI & MAPPA — "Find the Fire"
- Flour background.
- **Section header:** Micro-label `"CONTATTI"` + Title `"Vieni a Trovarci"` (Playfair Display 700, Charcoal)
- **Desktop layout:** Two columns 50/50.
- **Left column — Info:**
  - **Address** (with Lucide `MapPin` icon, Flame): Via Cadore 4, 20025 Legnano (MI)
  - **Phone** (with Lucide `Phone` icon, Flame): 0331 024363 — cliccabile `<a href="tel:+390331024363">`
  - **Instagram** (with Lucide `Instagram` icon, Flame): @mo_pizz — link a `https://instagram.com/mo_pizz`
  - **Orari di Apertura** — elegante tabella/grid:
    | Giorno | Orario |
    |---|---|
    | Lunedì | Chiuso |
    | Martedì — Giovedì | 18:00 – 22:30 |
    | Venerdì — Sabato | 12:00 – 14:30 / 18:00 – 22:30 |
    | Domenica | 18:00 – 22:30 |
    Stile: DM Sans, righe alternate con sfondo leggermente diverso, "Chiuso" in Ember, orari in Charcoal
  - **Two CTA buttons:**
    - "Chiama Ora" — Flame filled, `href="tel:+390331024363"`, Lucide `Phone` icon
    - "Indicazioni Stradali" — outlined Charcoal border, `href` to Google Maps link for Via Cadore 4 Legnano
- **Right column — Map:**
  - Embed Google Maps iframe: `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2786.1!2d8.9137!3d45.5967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDXCsDM1JzQ4LjEiTiA4wrA1NCc0OS4zIkU!5e0!3m2!1sit!2sit!4v1" loading="lazy">` (or search for the real embed URL for "Mo Pizz Via Cadore 4 Legnano")
  - Styled with `rounded-[2rem]`, warm shadow, overflow-hidden
  - If iframe doesn't work, create a CSS-only map placeholder with a pin icon and coordinates text
- **Mobile:** Stacked — info on top, map below full-width.

### H. FOOTER — "The Warm Sign-Off"
- Deep Charcoal background (`#111111`), `rounded-t-[4rem]`.
- Horizontal divider at top: thin line in Ember.
- **Desktop: 3-column grid.**
  - **Col 1 — Brand:**
    - Logo: "Mo Pizz" styled text (same as navbar)
    - Tagline: "La Vera Pizza Napoletana — Legnano" — DM Sans 400, Smoke
    - Brief: "Passione, tradizione e fuoco dal 2019." — Caveat 400, Gold
  - **Col 2 — Navigazione:**
    - Links: Home, Menu, Lo Chef, Contatti, Prenota — DM Sans 400, Smoke, hover → Cream with translateY(-1px)
  - **Col 3 — Social & Legal:**
    - Social icons: Instagram, Facebook (Lucide icons) — Smoke, hover → Flame
    - Legal: "© 2025 Mo Pizz Legnano SRL" — DM Mono, Smoke, small
    - "P.IVA 10529490960" — DM Mono, Smoke, very small
- **Bottom center:** `"Forno Operativo"` status with pulsing Flame dot and DM Mono label — a playful nod to the system-status pattern adapted for a pizzeria.
- **Mobile:** Stack all 3 columns centered.

---

## Technical Requirements (NEVER CHANGE)

- **Stack:** React 19, Tailwind CSS v3.4.17, GSAP 3 (with ScrollTrigger plugin), Lucide React for icons.
- **Fonts:** Load via Google Fonts `<link>` tags in `index.html`:
  - `Playfair+Display:ital,wght@0,700;0,900;1,700;1,900`
  - `DM+Sans:wght@400;500;700`
  - `Caveat:wght@400;700`
  - `DM+Mono:wght@400;500`
- **Images:** Use real Unsplash URLs matching the image mood defined in the preset. Search terms: `wood fired pizza oven`, `neapolitan pizza dough`, `italian restaurant brick`, `flour artisan hands`, `san marzano tomatoes`. Never use placeholder URLs.
- **Language:** The entire site content is in **Italian** (IT). All labels, all UI text, all descriptions.
- **SEO Meta Tags (include in index.html):**
  ```html
  <html lang="it">
  <title>Mo Pizz — La Vera Pizza Napoletana | Legnano</title>
  <meta name="description" content="Mo Pizz: la vera pizza napoletana verace a Legnano. Impasto 48h, forno a legna, ingredienti DOP e Slow Food. Pizzeria di Cristian Moschiano. Prenota ora!">
  <meta property="og:title" content="Mo Pizz — La Vera Pizza Napoletana | Legnano">
  <meta property="og:description" content="Impasto lievitato 48 ore, forno a legna a 450°C, ingredienti DOP dal cuore della Campania. Scopri Mo Pizz a Legnano.">
  <meta property="og:type" content="restaurant">
  <meta property="og:locale" content="it_IT">
  <link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍕</text></svg>">
  ```
- **File structure:** Single `App.jsx` with components defined in the same file (or split into `components/` if >600 lines). Single `index.css` for Tailwind directives + noise overlay + custom utilities.
- **No placeholders.** Every card, every label, every animation must be fully implemented and functional.
- **Responsive:** Mobile-first. Stack cards vertically on mobile. Reduce hero font sizes. Collapse navbar into hamburger with full-screen overlay. All touch targets minimum 48×48px.

---

## Build Sequence

Answers are pre-filled. Build immediately:

1. ✅ Preset mapped: "Fuoco Napoletano" — full design tokens above.
2. ✅ Hero copy: "La Vera / Pizza Napoletana." with subtitle and dual CTAs.
3. ✅ 3 value props mapped to Feature cards: Shuffler (Impasto), Typewriter (Ingredienti), Gauge (Forno).
4. ✅ Menu section with 5 tabs, 10+ real pizzas, dolci, business lunch — all content provided.
5. ✅ Chef section: Cristian Moschiano bio, quote, split layout.
6. ✅ Reviews carousel: 4 real Google reviews.
7. ✅ Contacts: full address, phone, hours, Instagram, Google Maps embed.
8. Scaffold the project: `npm create vite@latest`, install deps, write ALL files.
9. Ensure every animation is wired, every interaction works, every image loads.

**Execution Directive:** "Do not build a website; build a digital instrument for a Neapolitan pizzeria. Every scroll should feel like the warmth of a wood-fired oven pulling you in. Every animation should feel weighted — like dough being stretched by expert hands. Eradicate all generic AI patterns. This site should make people hungry."
