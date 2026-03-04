# Design: Pagina /fidelity — MO PIZZ

## Overview

New `/fidelity` page presenting the MO PIZZ loyalty program powered by Plateform. Follows the established subpage pattern (Hero → Steps → Benefits → Embed → Regulations → FAQ → CTA).

## Page Sections

### 1. FidelityHero
- Full-viewport dark hero with film grain overlay
- Gold `font-caveat` label: "Programma Fedeltà"
- Large `font-playfair` headline: "La tua fedeltà merita un premio"
- Descriptive `font-sans` smoke text
- CTA "Iscriviti Ora" → smooth scroll to `#fidelity-form`
- Animated counter teaser: 10€ → 1 punto → 10 punti → 10% sconto

### 2. FidelitySteps — "Come Funziona" (3 steps)
- Step 1: Iscriviti (UserPlus icon)
- Step 2: Accumula Punti (Coins icon)
- Step 3: Riscatta il Premio (Gift icon)
- 3-column grid, GSAP stagger animation, dotted connectors on desktop

### 3. FidelityBenefits — 4 USP cards
- "È gratis", "Punti automatici", "Sconti esclusivi", "Sempre aggiornato"
- LinesPatternCard with icons, scroll-triggered stagger
- Featured card (flame border) for the 10% discount

### 4. FidelityEmbed (id=fidelity-form)
- Iframe embed with loading spinner + fallback link (same pattern as OrdIframe)
- Config via PLATEFORM_FIDELITY_URL + FIDELITY_MODE in constants.js

### 5. FidelityRegolamento — Accordion (closed by default)
- 12 regulation points from Plateform
- Framer Motion AnimatePresence, muted styling

### 6. FidelityFaq — 6 FAQ items
- Same accordion pattern as GiftCardsFaq

### 7. FidelityCta — Final CTA banner
- "Ogni pizza ti avvicina al premio. Iscriviti ora!"
- Primary CTA → form, secondary → /ordina

## Files

### Create
- `src/pages/Fidelity.jsx`
- `src/components/fidelity/FidelityHero.jsx`
- `src/components/fidelity/FidelitySteps.jsx`
- `src/components/fidelity/FidelityBenefits.jsx`
- `src/components/fidelity/FidelityEmbed.jsx`
- `src/components/fidelity/FidelityRegolamento.jsx`
- `src/components/fidelity/FidelityFaq.jsx`
- `src/components/fidelity/FidelityCta.jsx`
- `src/data/fidelityData.js`

### Modify
- `src/App.jsx` — add /fidelity route
- `src/lib/constants.js` — add PLATEFORM_FIDELITY_URL + FIDELITY_MODE
- `src/components/Navbar.jsx` — add "Fidelity" nav link
- `src/components/Footer.jsx` — add "Fidelity" footer link

## Design Accent
Gold (#D4A853) as accent for badges, step numbers, featured elements. Flame for CTAs.
