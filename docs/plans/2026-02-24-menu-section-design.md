# Menu Section Design - Immersive Cinematic Experience

**Date:** 2026-02-24
**Status:** Approved

## Overview

Complete redesign of the Menu section as an immersive, Awwwards-level cinematic experience. Replaces the existing Menu.jsx with a new component placed directly after the Hero in Home.jsx. Features horizontal scroll navigation, video background, cursor-following image reveals, and scroll-triggered animations.

## Architecture: 3 Sub-Sections

### 1. Intro Cinematografica — "Il Rituale del Fuoco"

- **Layout:** 100vh, video background slow-motion (user-provided), dark overlay with radial ember glow gradient, SVG noise grain
- **Copy (progressive scroll reveal):**
  - Micro-label: "Dal 2016, Legnano" (Caveat, Gold)
  - Headline: "Ogni pizza e un racconto / scritto col fuoco." (CSCaliope, Cream)
  - Body: "48 ore di doppia lievitazione..." (TestTheFuture, Smoke)
- **Interactions:**
  - Text line-by-line reveal via GSAP ScrollTrigger
  - Video playbackRate slows to 0.3 in viewport
  - Parallax offset on text vs video
  - Animated scroll indicator at bottom

### 2. Navigazione Categorie — "Lo Scorrimento del Fuoco"

- **Layout:** Horizontal scroll hijack (vertical scroll triggers horizontal movement) via GSAP ScrollTrigger pin
- **4 full-width category panels:**
  1. La Pizzeria — Classiche + Chef specials
  2. La Cucina — Antipasti, Primi, Secondi
  3. Dolci — Desserts
  4. Birre & Vini — Craft beers + wines
- **Each panel:**
  - Left 40%: AI-generated hero image with horizontal parallax
  - Right 60%: Destructured grid of dishes (CSCaliope names, Mono prices, sans ingredients)
- **Custom cursor:** Circle with "Scorri" text, elastic follow (GSAP)
- **Dish hover:** Cursor-following circular image reveal (AI-generated dish photos)
- **DOP/IGP badges:** Gold glow animation
- **Progress bar:** Thin flame bar at top showing scroll position
- **Category indicators:** Dots/names at top, active = flame color

### 3. Highlight / CTA — "La Firma dello Chef"

- **Layout:** Centered, charcoal background, 3 signature dishes in asymmetric destructured grid
- **Each card:**
  - Large circular AI image with gold border
  - CSCaliope name, poetic description, Mono price
  - Hover: scale(1.03), image rotate 2-3deg, flame glow
- **CTA:** "Scarica il Menu Completo" button linking to PDF

## Menu Data (from PDF)

### Pizze Classiche
| Pizza | Price |
|---|---|
| Margherita | 7.00 |
| Margherita Sbagliata | 7.50 |
| Marinara | 6.00 |
| Margherita DOP | 8.50 |
| Margherita Reale | 8.50 |
| Cosacca | 6.50 |
| Diavola | 8.00 |
| Quattro Stagioni | 9.00 |
| Capricciosa | 9.50 |
| Cotto e Funghi | 8.50 |
| Rustica | 9.00 |
| Stamm Lontan | 8.00 |
| Fantasia dell'Orto | 8.00 |
| Quattro Formaggi | 8.50 |
| Ricca | 8.50 |
| Tirolese | 10.00 |
| Ardita | 10.00 |
| Napoli | 8.00 |
| Romana | 8.50 |
| Cotto | 8.00 |
| Salsiccia e Patatine | 9.50 |
| Cotto e Patatine | 8.50 |
| Wurstel e Patatine | 8.50 |
| Parmigiana | 9.00 |
| Provola e Pepe | 8.00 |

### Pizze dello Chef (by Moschiano)
| Pizza | Price |
|---|---|
| Bronte 2.0 | 14.00 |
| Superlativa | 14.00 |
| Friarielli e Co. | 11.00 |
| Mugnano del Cardinale | 13.00 |
| Vesuviana | 14.00 |
| Nduja e Co. | 14.00 |
| Primavera | 17.00 |
| Ariccia | 14.00 |
| Campana | 12.00 |
| Mimosa | 8.00 |
| Pig | 12.00 |
| Castelli Romani | 14.00 |
| Sole Mio | 11.00 |
| Nerano | 12.00 |
| Fi.Ca | 15.00 |
| Autunno | 13.00 |
| Poker | 20.00 |

### Fritti e Ripieni
| Item | Price |
|---|---|
| Fritta Classica | 11.00 |
| Fritta | 10.00 |
| Fritta Semplice | 10.00 |
| Ripieno Classico | 8.00 |
| Tronchetto Napoletano | 16.00 |
| Ionica | 14.00 |
| Crocche | 12.00 |

### Primi
| Item | Price |
|---|---|
| Spaghetto & Bisque | 14.00 |
| Mezzemaniche e Purptiell | 14.00 |
| La Nerano | 13.00 |

### Secondi
| Item | Price |
|---|---|
| Fritto Misto | 18.00 |
| Porchettato disossato | 14.00 |

### Dolci
- ~6.00 / 7.00 range

### Birre Artigianali
- cl. 50: 8.00 (5 varieties)
- cl. 33: 6.00 (5 varieties)

### Vini
- Grillo Maleca DOC: 22.00
- Ribolla Gialla DOC: 24.00
- Barbera d'Alba: 21.00
- Etta Focu Rosso IGT: 22.00
- Calice: 4.00

## Tech Stack

- GSAP ScrollTrigger (horizontal scroll pin, text reveals, parallax)
- GSAP (custom cursor, hover image reveals, stagger animations)
- Lenis (already integrated for smooth scrolling)
- CSS noise overlay (already in project)
- AI-generated images for dishes
- No new dependencies required

## Design Tokens

Uses existing project tokens:
- Colors: charcoal, flame, cream, ember, gold, smoke, flour, wood
- Fonts: playfair (CSCaliope), sans (TestTheFuture), caveat, mono (TestTheFutureMono)
- Border radius: rounded-[2rem], rounded-[3rem]
- Padding system: px-6 sm:px-12 md:px-20 lg:px-32
