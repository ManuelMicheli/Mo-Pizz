'use client';
import { useEffect, useRef } from 'react';

/**
 * MobileMenuTabBar — fixed bottom tab bar for mobile menu navigation.
 *
 * Tabs are wider than the viewport (each ~36vw), so the strip is
 * horizontally scrollable. On activeIndex change the active tab is
 * smoothly centered in view, so the strip "follows" the user as they
 * progress through the menu sections.
 *
 * Props:
 *   menuCategories (array)  — menu category objects (from useMenu hook)
 *   activeIndex    (number) — which category is active (0-3)
 *   onTabPress  (function)  — called with index when user taps a category
 *   visible     (boolean)   — whether the tab bar should be shown
 */
export default function MobileMenuTabBar({ menuCategories, activeIndex, onTabPress, visible }) {
  const scrollerRef = useRef(null);
  const tabRefs = useRef([]);

  // Smooth-scroll active tab into center as activeIndex changes
  useEffect(() => {
    const scroller = scrollerRef.current;
    const tab = tabRefs.current[activeIndex];
    if (!scroller || !tab) return;
    const target = tab.offsetLeft - (scroller.clientWidth - tab.clientWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [activeIndex]);

  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-40
        bg-charcoal/80 backdrop-blur-xl border-t border-white/10
        safe-bottom
        transition-all duration-500 ease-out
        ${visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
        }
      `}
      aria-label="Menu categories"
    >
      <div
        ref={scrollerRef}
        className="flex items-stretch overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
      >
        {/* spacer so the first tab can center */}
        <div aria-hidden className="flex-shrink-0 w-[32vw]" />

        {menuCategories.map((cat, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={cat.id}
              ref={(el) => (tabRefs.current[i] = el)}
              type="button"
              onClick={() => onTabPress(i)}
              className={`
                relative flex-shrink-0 w-[36vw] py-3
                font-sans text-xs tracking-wide
                whitespace-nowrap truncate
                snap-center
                transition-colors duration-300
                ${isActive ? 'text-cream font-bold' : 'text-smoke'}
              `}
              aria-current={isActive ? 'true' : undefined}
            >
              {cat.title}

              {/* Flame underline indicator */}
              <span
                className={`
                  absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-flame
                  transition-all duration-500 ease-out
                  ${isActive ? 'w-1/2 opacity-100' : 'w-0 opacity-0'}
                `}
              />
            </button>
          );
        })}

        {/* trailing spacer so the last tab can center */}
        <div aria-hidden className="flex-shrink-0 w-[32vw]" />
      </div>
    </nav>
  );
}
