'use client';

/**
 * MobileMenuTabBar — fixed bottom tab bar for mobile menu navigation.
 *
 * The category set is small and fixed (4), so tabs are distributed evenly and
 * centered (flex-1, capped to max-w-md) rather than living in a wider-than-
 * viewport scroll strip — which used to start off-centre on the right.
 *
 * Props:
 *   menuCategories (array)  — menu category objects (from useMenu hook)
 *   activeIndex    (number) — which category is active (0-3)
 *   onTabPress  (function)  — called with index when user taps a category
 *   visible     (boolean)   — whether the tab bar should be shown
 */
export default function MobileMenuTabBar({ menuCategories, activeIndex, onTabPress, visible }) {
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
      <div className="flex items-stretch max-w-md mx-auto">
        {menuCategories.map((cat, i) => {
          const isActive = i === activeIndex;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onTabPress(i)}
              className={`
                relative flex-1 min-w-0 py-3 px-1
                font-sans text-[11px] tracking-wide text-center
                whitespace-nowrap truncate
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
      </div>
    </nav>
  );
}
