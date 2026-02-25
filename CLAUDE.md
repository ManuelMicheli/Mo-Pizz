# CLAUDE.md — Mo Pizz

## Project Overview

Mo Pizz is a premium, cinematic single-page landing site for an authentic Neapolitan pizzeria in Legnano, Italy. The site is entirely in **Italian**. It is a frontend-only React application with no backend, database, or API — deployed as a static site on Vercel.

## Tech Stack

- **Framework:** React 18 with Vite 7
- **Styling:** Tailwind CSS 3.4 + PostCSS + custom CSS in `src/index.css`
- **Animation:** GSAP 3 (with ScrollTrigger plugin) + Framer Motion 12
- **Smooth scroll:** Lenis (synced with GSAP ticker in `App.jsx`)
- **Routing:** React Router DOM 7 with `react-router-hash-link` for section navigation
- **Icons:** Lucide React
- **Deployment:** Vercel (config in `vercel.json` with strict security headers)

## Commands

```bash
npm run dev       # Start Vite dev server
npm run build     # Production build (vite build)
npm run lint      # ESLint with zero-warnings policy
npm run preview   # Preview production build locally
```

There are **no tests configured** — no test runner, no test files.

## Project Structure

```
src/
├── App.jsx                   # Root: Lenis init, GSAP ScrollTrigger sync, routes
├── main.jsx                  # React entry point
├── index.css                 # Tailwind directives, @font-face, custom utilities
├── components/
│   ├── Layout.jsx            # Persistent wrapper: Navbar + <Outlet /> + Footer
│   ├── Navbar.jsx            # Morphing fixed navbar (transparent → pill on scroll)
│   ├── Hero.jsx              # Full-viewport hero with CTA buttons
│   ├── Features.jsx          # "Chi Siamo" section with 3 interactive cards
│   ├── Statement.jsx         # Mission / statement section
│   ├── Gallery.jsx           # Photo gallery
│   ├── Chef.jsx              # Chef bio section
│   ├── Reviews.jsx           # Customer review marquee carousel
│   ├── Contacts.jsx          # Contact info + Google Maps embed
│   ├── Footer.jsx            # Footer with links and socials
│   ├── Menu.jsx              # Legacy simpler menu component (unused)
│   ├── menu/                 # Menu subsystem (horizontal scroll experience)
│   │   ├── MenuSection.jsx   # Orchestrator: MenuIntro → HorizontalScroll → Highlight
│   │   ├── MenuIntro.jsx     # Menu intro with video
│   │   ├── MenuHorizontalScroll.jsx  # Scroll-hijack horizontal category panels
│   │   ├── MenuHighlight.jsx # Signature dish spotlight
│   │   ├── MenuVideoIntro.jsx# Video intro for menu
│   │   └── CustomCursor.jsx  # Custom cursor for menu interactions
│   └── ui/
│       └── scroll-based-velocity.jsx  # Scroll velocity animation utility
├── pages/
│   ├── Home.jsx              # Composes all sections in order
│   └── MenuPage.jsx          # Redirects to /#menu
├── data/
│   └── menuData.js           # All menu items (4 categories + 3 signature dishes)
└── lib/
    └── utils.js              # cn() — className merge utility
```

```
public/
├── fonts/         # Custom fonts: CSCaliope, TestTheFuture, TestTheFutureMono
├── images/        # Hero, menu, gallery, and section images
├── videos/        # Video assets
└── brand-assets/  # Brand materials
```

## Section Rendering Order (Home.jsx)

Hero → MenuSection → Statement → Gallery → Chef → Features → MenuVideoIntro → Reviews → Contacts

Each section uses `id` attributes for hash navigation: `#home`, `#menu`, `#features`, `#chef`, `#contatti`.

## Architecture Patterns

### Scroll & Animation

- **Lenis** handles smooth scrolling, synced with GSAP's ticker in `App.jsx`.
- **GSAP ScrollTrigger** drives scroll-pinned animations (horizontal menu scroll, Features card flips).
- Always use `gsap.context()` inside `useEffect` / `useLayoutEffect` and return `ctx.revert()` for cleanup.
- Default easing: `power3.out` (entrances), `power2.inOut` (morphs). Stagger: `0.08` text, `0.15` cards.
- The Home page kills all ScrollTrigger instances on unmount (in `useLayoutEffect` cleanup).

### Routing

- Single-page app with hash-based navigation. `/menu` redirects to `/#menu`.
- Layout component persists Navbar and Footer across routes via `<Outlet />`.

### Path Alias

`@` is aliased to `src/` in `vite.config.js`. Use `@/components/...`, `@/data/...`, etc.

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

Custom fonts are loaded via `@font-face` in `src/index.css` from `/public/fonts/`.

### Visual Conventions

- **Noise overlay:** Global SVG `feTurbulence` filter at 0.05 opacity for filmic texture.
- **Border radius:** Use `rounded-[2rem]` to `rounded-[4rem]` — no sharp corners.
- **Magnetic buttons:** `.magnetic-btn` class — `scale(1.03)` on hover with custom cubic-bezier.
- **Scroll indicator:** `.animate-bounce-slow` for hero arrow.
- **Marquee:** `.animate-marquee` for review carousel with responsive speed and hover-pause.

## Conventions for AI Assistants

### Code Style

- Components are `.jsx` files using PascalCase names (e.g., `MenuSection.jsx`).
- Functional components with hooks. No class components.
- Use Tailwind utility classes inline — avoid creating separate CSS files per component.
- Custom CSS goes in `src/index.css` under `@layer utilities` or as plain CSS below.
- Use `cn()` from `@/lib/utils` to conditionally merge class names.

### Important Gotchas

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
6. Keep the single-page architecture — all sections compose in `Home.jsx`.
