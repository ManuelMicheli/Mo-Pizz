# CLAUDE.md — Mo Pizz

## Project Overview

Mo Pizz is a premium, cinematic landing site for an authentic Neapolitan pizzeria in Legnano, Italy. The site is entirely in **Italian**. It is a frontend-only Next.js application with no backend, database, or API — deployed as a static site on Vercel.

## Tech Stack

- **Framework:** Next.js 16 (App Router) with React 19
- **Styling:** Tailwind CSS 3.4 + PostCSS + custom CSS in `src/app/globals.css`
- **Animation:** GSAP 3 (with ScrollTrigger + ScrollToPlugin) + Framer Motion 12
- **Smooth scroll:** Lenis (synced with GSAP ticker via `LenisProvider.jsx`)
- **Routing:** Next.js App Router (file-system routing) + hash anchors for sections
- **Icons:** Lucide React
- **Deployment:** Vercel (headers/redirects in `next.config.js`)

## Commands

```bash
npm run dev       # Start Next.js dev server (Turbopack)
npm run build     # Production build (next build)
npm run start     # Start production server
npm run lint      # Next.js ESLint
```

There are **no tests configured** — no test runner, no test files.

## Project Structure

```
src/
├── app/
│   ├── layout.jsx              # Root layout: metadata, fonts, LenisProvider, Navbar, Footer
│   ├── globals.css             # Tailwind directives, @font-face, custom utilities
│   ├── page.jsx                # Homepage: composes all sections with dynamic imports
│   ├── not-found.jsx           # Custom 404 page
│   ├── robots.js               # Dynamic robots.txt generation
│   ├── sitemap.js              # Dynamic sitemap generation
│   ├── ordina/
│   │   ├── page.jsx            # Ordina page (metadata + server component)
│   │   └── OrdinaPage.jsx      # Ordina client component
│   ├── gift-cards/
│   │   ├── page.jsx            # Gift Cards page (metadata + server component)
│   │   └── GiftCardsPage.jsx   # Gift Cards client component
│   ├── fidelity/
│   │   ├── page.jsx            # Fidelity page (metadata + server component)
│   │   └── FidelityPage.jsx    # Fidelity client component
│   └── privacy/
│       ├── page.jsx            # Privacy page (metadata + server component)
│       └── PrivacyPage.jsx     # Privacy client component
├── components/
│   ├── LenisProvider.jsx       # Client: Lenis smooth scroll + GSAP sync
│   ├── NoiseOverlay.jsx        # Server: SVG noise texture overlay
│   ├── Navbar.jsx              # Client: morphing fixed navbar
│   ├── Hero.jsx                # Client: full-viewport hero with GSAP
│   ├── Features.jsx            # Client: "Chi Siamo" accordion cards
│   ├── Statement.jsx           # Server: mission/marquee section
│   ├── Gallery.jsx             # Server: photo gallery
│   ├── Chef.jsx                # Client: chef bio with GSAP ScrollTrigger
│   ├── Staff.jsx               # Client: staff section
│   ├── Reviews.jsx             # Client: review marquee carousel
│   ├── ReviewCta.jsx           # Server: review CTA
│   ├── Contacts.jsx            # Server: contact info + Google Maps iframe
│   ├── Footer.jsx              # Client: footer with links
│   ├── CookieBanner.jsx        # Client: GDPR cookie banner
│   ├── ServicesGrid.jsx        # Client: services grid
│   ├── MenuFisso.jsx           # Client: fixed menu section
│   ├── PrenotaSection.jsx      # Client: reservation iframe
│   ├── SeoContent.jsx          # Server: SEO content block
│   ├── menu/                   # Menu subsystem
│   │   ├── MenuSection.jsx     # Client: orchestrator
│   │   ├── MenuIntro.jsx       # Client: menu intro with GSAP
│   │   ├── MenuHorizontalScroll.jsx  # Client: scroll-hijack panels
│   │   ├── MenuHighlight.jsx   # Client: signature dish spotlight
│   │   ├── MobileMenuTabBar.jsx # Client: mobile tab bar
│   │   └── CustomCursor.jsx    # Client: custom cursor
│   ├── ordina/                 # Ordina sub-components
│   ├── fidelity/               # Fidelity sub-components
│   ├── gift-cards/             # Gift Cards sub-components
│   └── ui/
│       ├── scroll-based-velocity.jsx  # Client: scroll velocity animation
│       └── LinesPatternCard.jsx       # Client: pattern card with Framer Motion
├── data/
│   ├── copy.js                 # All editorial copy (zero inline strings)
│   ├── menuData.js             # Menu items (categories + signature dishes)
│   ├── menuFissoData.js        # Fixed menu data
│   └── instagramData.js        # Instagram posts data
├── hooks/
│   └── useMenu.js              # Menu data hook (static data)
└── lib/
    ├── constants.js            # SEO schemas, URLs, external links
    └── utils.js                # cn() — className merge utility
```

```
public/
├── fonts/         # Custom fonts: CSCaliope, TestTheFuture, TestTheFutureMono, Caveat
├── images/        # Hero, menu, gallery, and section images (WebP)
├── videos/        # Video assets
└── brand-assets/  # Brand materials
```

## Section Rendering Order (Home page.jsx)

Hero → ServicesGrid → MenuFisso → MenuSection → Statement → Gallery → Chef → Staff → Features → ReviewCta → Reviews → PrenotaSection → SeoContent → Contacts

Each section uses `id` attributes for hash navigation: `#home`, `#menu`, `#chi-siamo`, `#contatti`, `#prenota`.

## Architecture Patterns

### Server vs Client Components

- **Server Components** (default): Static content without hooks/handlers (Statement, Gallery, Contacts, ReviewCta, SeoContent, NoiseOverlay)
- **Client Components** (`'use client'`): Components with hooks, event handlers, GSAP, Framer Motion, or browser APIs
- **Page pattern**: Each route has a `page.jsx` (server component with metadata) that renders a `*Page.jsx` (client component with interactivity)

### Metadata & SEO

- **Root metadata** in `src/app/layout.jsx` — shared title template, description, OpenGraph, Twitter cards
- **Per-page metadata** via `export const metadata` in each `page.jsx`
- **JSON-LD schemas** via `<script type="application/ld+json">` in layout and pages
- **Dynamic sitemap/robots** via `src/app/sitemap.js` and `src/app/robots.js`

### Scroll & Animation

- **Lenis** handles smooth scrolling, synced with GSAP's ticker via `LenisProvider.jsx` (wraps app in layout).
- **GSAP ScrollTrigger** drives scroll-pinned animations (horizontal menu scroll, Features card flips).
- Always use `gsap.context()` inside `useEffect` / `useLayoutEffect` and return `ctx.revert()` for cleanup.
- Guard `gsap.registerPlugin()` with `typeof window !== 'undefined'` in module scope to prevent SSR errors.
- Default easing: `power3.out` (entrances), `power2.inOut` (morphs). Stagger: `0.08` text, `0.15` cards.

### Routing

- Next.js App Router with file-system routing
- Hash anchors (`/#menu`, `/#contatti`) for same-page section navigation
- Redirects in `next.config.js`: `/menu` → `/#menu`, `/prenota` → `/#prenota`
- Use `<Link href="...">` from `next/link` for route links
- Use `<a href="/#section">` for hash links on same page

### Path Alias

`@` is aliased to `src/` in `jsconfig.json`. Use `@/components/...`, `@/data/...`, etc.

## Design System

### Color Palette (defined in `tailwind.config.js`)

| Token     | Hex       | Usage                           |
|-----------|-----------|---------------------------------|
| charcoal  | `#1A1A1A` | Primary dark backgrounds        |
| flame     | `#E85D26` | Primary accent (fire, CTAs)     |
| cream     | `#FFF8F0` | Light text on dark backgrounds  |
| ember     | `#C94A1A` | Secondary accent (hover states) |
| gold      | `#D4A853` | Badges, highlights, stars       |
| smoke     | `#8A8278` | Muted text, captions            |
| flour     | `#F5F0E8` | Alternate light backgrounds     |
| wood      | `#6B4226` | Warm brown details              |

### Typography (Tailwind `fontFamily` keys)

| Key        | Font             | Use                     |
|------------|------------------|-------------------------|
| `playfair` | CSCaliope        | Headings (serif)        |
| `sans`     | TestTheFuture    | Body/UI (sans-serif)    |
| `caveat`   | Caveat           | Handwritten accents     |
| `mono`     | TestTheFutureMono| Badges, monospace labels|

Custom fonts are loaded via `@font-face` in `src/app/globals.css` from `/public/fonts/`.

### Visual Conventions

- **Noise overlay:** Global SVG `feTurbulence` filter at 0.05 opacity for filmic texture (via `NoiseOverlay.jsx`).
- **Border radius:** Use `rounded-[2rem]` to `rounded-[4rem]` — no sharp corners.
- **Magnetic buttons:** `.magnetic-btn` class — `scale(1.03)` on hover with custom cubic-bezier.
- **Scroll indicator:** `.animate-bounce-slow` for hero arrow.
- **Marquee:** `.animate-marquee` for review carousel with responsive speed and hover-pause.

## Conventions for AI Assistants

### Code Style

- Components are `.jsx` files using PascalCase names (e.g., `MenuSection.jsx`).
- Functional components with hooks. No class components.
- Use Tailwind utility classes inline — avoid creating separate CSS files per component.
- Custom CSS goes in `src/app/globals.css` under `@layer utilities` or as plain CSS below.
- Use `cn()` from `@/lib/utils` to conditionally merge class names.

### Important Gotchas

- **SSR + GSAP:** Components using GSAP ScrollTrigger should use `ssr: false` in `dynamic()` imports or guard `gsap.registerPlugin()` with `typeof window !== 'undefined'`.
- **ScrollTrigger conflicts:** Multiple pinned ScrollTrigger sections (Menu horizontal scroll, Features) can conflict. Always `ScrollTrigger.refresh()` after layout changes and clean up triggers on unmount.
- **Mobile scroll:** `Lenis smoothTouch` is disabled. Mobile uses shorter duration (0.8s vs 1.4s). The `body.menu-open` class locks scroll when the mobile menu overlay is open.
- **useLayoutEffect for ScrollTrigger:** Prefer `useLayoutEffect` over `useEffect` for pinned ScrollTrigger setups to avoid flash/layout bugs.
- **No test suite:** There are no tests. Validate changes with `npm run build` and visual review.

### When Making Changes

1. Run `npm run build` to verify no build errors.
2. Respect the existing design system — use the defined color tokens, font families, and border radius values.
3. Keep all user-facing text in Italian.
4. Reference `GEMINI-MOPIZZ.md` for the full brand guide and original component specifications.
5. Design plans live in `docs/plans/` — check there for context on recent feature work.
6. The homepage composition is in `src/app/page.jsx` — all sections compose there.
