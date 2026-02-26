# Mobile Premium Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign the entire mobile experience (< 768px) of Mo Pizz to premium quality while keeping desktop untouched.

**Architecture:** Mobile-specific branches inside existing components using `isMobile` state or Tailwind responsive classes. One new component (`MobileMenuTabBar`). CSS scroll-snap for carousels. IntersectionObserver for flip triggers. GSAP matchMedia for animation branching.

**Tech Stack:** React 18, Tailwind CSS 3, GSAP + ScrollTrigger, CSS scroll-snap, IntersectionObserver API

---

### Task 1: Create MobileMenuTabBar Component

**Files:**
- Create: `src/components/menu/MobileMenuTabBar.jsx`
- Modify: `src/components/menu/MenuHorizontalScroll.jsx` (integrate tab bar)
- Modify: `src/index.css` (add tab bar animation styles)

**Step 1: Create `MobileMenuTabBar.jsx`**

```jsx
// src/components/menu/MobileMenuTabBar.jsx
import React from 'react';
import { menuCategories } from '../../data/menuData';

const MobileMenuTabBar = ({ activeIndex, onTabPress, visible }) => {
  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-500 safe-bottom ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="bg-charcoal/80 backdrop-blur-xl border-t border-white/10">
        <div className="flex items-center justify-around px-2 py-3">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => onTabPress(i)}
              className="relative flex flex-col items-center gap-1 px-3 py-1 cursor-pointer"
            >
              <span
                className={`font-sans text-xs tracking-wide transition-colors duration-300 ${
                  i === activeIndex ? 'text-cream font-bold' : 'text-smoke'
                }`}
              >
                {cat.title}
              </span>
              {/* Underline indicator */}
              <div
                className={`h-[2px] rounded-full transition-all duration-300 ${
                  i === activeIndex ? 'w-full bg-flame' : 'w-0 bg-transparent'
                }`}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileMenuTabBar;
```

**Step 2: Add safe-bottom CSS if not already applied to tab bar**

In `src/index.css`, the `.safe-bottom` class already exists. No changes needed.

**Step 3: Verify** — Run `npm run dev`, open mobile viewport, confirm tab bar renders but is initially hidden (visible=false).

**Step 4: Commit**

```
feat: add MobileMenuTabBar component with glass-morphism design
```

---

### Task 2: Rewrite Menu Mobile Layout — Apple Cards with Vertical Images

**Files:**
- Modify: `src/components/menu/MenuHorizontalScroll.jsx` (rewrite mobile branch entirely)

**Step 1: Replace the entire mobile return block in `MenuHorizontalScroll.jsx`**

The mobile section (lines 204-257) currently renders a flat list. Replace it with Apple Cards style:

- Each category is a full-width card with `sticky` hero image
- Hero images are vertical, nearly full-screen (~55vh)
- The card body with menu items overlaps the image as you scroll
- Tab bar appears/disappears based on section visibility via IntersectionObserver
- Active tab updates as user scrolls between categories

Key implementation details:
- Add `const [mobileActiveCategory, setMobileActiveCategory] = useState(0)`
- Add `const [tabBarVisible, setTabBarVisible] = useState(false)`
- Add `const mobileSectionRef` (already exists) + per-category refs
- Use IntersectionObserver on each category container to set `mobileActiveCategory`
- Use IntersectionObserver on `mobileSectionRef` to toggle `tabBarVisible`
- Tab press scrolls to the target category using `element.scrollIntoView({ behavior: 'smooth' })`
- Each category hero image: `h-[55vh] sticky top-0` with `object-cover` and vertical orientation preserved
- Menu items container: `relative z-10 bg-charcoal rounded-t-3xl -mt-8 pt-8 px-5 pb-10`
- This creates the "card overlapping image" effect as you scroll

**Step 2: Integrate MobileMenuTabBar**

Import and render `<MobileMenuTabBar>` at the bottom of the mobile return, passing:
- `activeIndex={mobileActiveCategory}`
- `onTabPress={(i) => categoryRefs.current[i]?.scrollIntoView({ behavior: 'smooth' })}`
- `visible={tabBarVisible}`

**Step 3: Verify** — Mobile viewport: see sticky vertical hero images, cards overlapping, tab bar appearing in menu section, tab switching working.

**Step 4: Commit**

```
feat: premium mobile menu with Apple Cards layout and sticky vertical images
```

---

### Task 3: Rewrite Chi Siamo Mobile — Horizontal Carousel with Flip

**Files:**
- Modify: `src/components/Features.jsx` (rewrite mobile branch)
- Modify: `src/index.css` (add carousel flip styles)

**Step 1: Add horizontal carousel CSS to `index.css`**

```css
/* Chi Siamo mobile carousel */
.chi-siamo-carousel {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.chi-siamo-carousel::-webkit-scrollbar {
  display: none;
}
.chi-siamo-card {
  scroll-snap-align: center;
  flex-shrink: 0;
}
.chi-siamo-flip-inner {
  transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  transform-style: preserve-3d;
}
.chi-siamo-flip-inner.flipped {
  transform: rotateY(180deg);
}
```

**Step 2: Rewrite the mobile branch in Features.jsx**

Replace the `mm.add('(max-width: 767px)')` GSAP block and the mobile JSX rendering:

- Remove GSAP mobile animations (entrance + individual flip scrub)
- Add a horizontal carousel with CSS scroll-snap
- Each card is `w-[85vw]` with the spezzettata image (1/5 of full image per card)
- Front face: B&W image (`wmremove-transformed.png`)
- Back face: Color image (`wmremove-transformed (43).png`)
- Use IntersectionObserver (threshold 0.6) on each card to toggle `.flipped` class when card is centered
- Add dot indicator below carousel showing current position
- Card has `perspective: 1200px`, inner container does the flip via CSS class toggle
- The image splitting uses `background-size: 100% 500%` and `background-position: center N%` (same as current mobile CSS)

Key implementation:
- `const [activeCard, setActiveCard] = useState(0)` for dot indicator
- `const carouselRef = useRef(null)` for the scroll container
- `useEffect` with IntersectionObserver watching each `.chi-siamo-card` at threshold 0.6
- When a card intersects: add `.flipped` class, update `activeCard`
- When a card leaves: remove `.flipped` class (so it flips back to B&W when scrolled away)
- Wrap in `{isMobile ? <MobileCarousel /> : <DesktopAccordion />}` pattern using matchMedia detection

**Step 3: Verify** — Mobile viewport: swipe horizontally through 5 cards, each flips from B&W to color when centered, dots update, images are correctly split.

**Step 4: Commit**

```
feat: Chi Siamo horizontal carousel with B&W-to-color flip on mobile
```

---

### Task 4: Optimize Remaining Sections for Mobile

**Files:**
- Modify: `src/components/Hero.jsx` (minor mobile padding tweaks)
- Modify: `src/components/Gallery.jsx` (mobile height optimization)
- Modify: `src/components/Chef.jsx` (mobile layout improvements)
- Modify: `src/components/Statement.jsx` (mobile text sizing)
- Modify: `src/components/Reviews.jsx` (mobile card sizing)
- Modify: `src/components/Contacts.jsx` (mobile stack layout)
- Modify: `src/components/menu/MenuIntro.jsx` (mobile optimization)
- Modify: `src/components/menu/MenuHighlight.jsx` (mobile card layout)
- Modify: `src/components/menu/MenuVideoIntro.jsx` (mobile text positioning)

**Step 1: Hero.jsx — mobile optimizations**

- Reduce bottom padding for CTA buttons on small screens
- Ensure text doesn't overflow on very small screens (320px)
- Add `pb-safe` class equivalent for safe area

**Step 2: Gallery.jsx — better mobile height**

- Change `max-h-[40vh]` to `max-h-[50vh]` on mobile for more visual impact
- Add `rounded-none` on mobile (edge-to-edge) vs rounded on desktop

**Step 3: Chef.jsx — tighter mobile layout**

- Reduce photo size on very small screens
- Tighten vertical spacing (`py-8` instead of `py-10`)
- Reduce quote text size on mobile
- Ensure text doesn't cause horizontal overflow

**Step 4: Statement.jsx — mobile text adjustment**

- Already uses `clamp()` — verify it works at 320px
- Reduce vertical padding slightly on mobile

**Step 5: Reviews.jsx — mobile card tweaks**

- Ensure cards have `scroll-snap-type: x mandatory` on the container for better touch behavior
- Add `scroll-padding` so cards snap centered

**Step 6: Contacts.jsx — mobile stack improvements**

- Ensure map has better mobile height: `h-[40vh]` minimum
- Reduce excessive padding on mobile
- Make CTA buttons full-width on mobile

**Step 7: MenuIntro.jsx — mobile sizing**

- Adjust hero height for mobile: `h-[40dvh] md:h-[50dvh]` to give more space to content below
- Ensure CTA button is reachable above safe area

**Step 8: MenuHighlight.jsx — mobile signature cards**

- Cards should be horizontal on mobile (image left, text right) or stacked but with reduced image size
- Reduce vertical spacing between cards

**Step 9: MenuVideoIntro.jsx — mobile text positioning**

- Position text centered on mobile instead of bottom-right
- Ensure text is readable over video on small screens

**Step 10: Verify all sections** — Scroll through entire site on mobile viewport (375px and 390px), check every section renders cleanly.

**Step 11: Commit**

```
feat: polish all sections for premium mobile layout
```

---

### Task 5: Mobile Menu Section Flow — Auto-open on Mobile

**Files:**
- Modify: `src/components/menu/MenuSection.jsx` (auto-show menu on mobile)

**Step 1: On mobile, always show the menu content**

Currently the menu requires clicking "Esplora il Menu" to unlock. On mobile, auto-unlock the menu content so users immediately see the premium Apple Cards experience without an extra tap.

- Add `isMobile` detection
- On mobile: set `menuUnlocked` to `true` by default
- Hide the "Esplora/Chiudi il Menu" CTA on mobile since menu is always visible
- Keep MenuIntro as a visual hero but remove the toggle behavior on mobile

**Step 2: Verify** — On mobile the menu cards appear directly after MenuIntro without needing to tap anything.

**Step 3: Commit**

```
feat: auto-show menu content on mobile for seamless experience
```

---

### Task 6: Final Mobile Polish & Testing

**Files:**
- Modify: `src/components/Navbar.jsx` (ensure hamburger menu works with new tab bar)
- Modify: `src/index.css` (any remaining animation/transition fixes)

**Step 1: Z-index harmony**

Ensure z-index layers don't conflict:
- Navbar: `z-50`
- Mobile menu overlay: `z-40`
- Tab bar: `z-50` (same as navbar, both fixed)
- Ensure tab bar hides when mobile nav overlay is open

**Step 2: Performance pass**

- Add `will-change: transform` only where needed
- Ensure `loading="lazy"` on all images below the fold
- Verify scroll-snap performance is smooth
- Test on throttled 3G in DevTools

**Step 3: Edge case testing**

- Test 320px viewport (iPhone SE)
- Test 390px viewport (iPhone 14)
- Test 430px viewport (iPhone 14 Pro Max)
- Test landscape mode
- Test with iOS Safari notch (safe-area insets)

**Step 4: Commit**

```
feat: mobile premium redesign complete — z-index, performance, edge cases
```
