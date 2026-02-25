import { menuCategories } from '../../data/menuData';

/**
 * MobileMenuTabBar — fixed bottom tab bar for mobile menu navigation.
 *
 * Props:
 *   activeIndex (number)   — which category is active (0-3)
 *   onTabPress  (function) — called with index when user taps a category
 *   visible     (boolean)  — whether the tab bar should be shown
 */
export default function MobileMenuTabBar({ activeIndex, onTabPress, visible }) {
  return (
    <nav
      className={`
        fixed bottom-0 left-0 right-0 z-40
        bg-charcoal/80 backdrop-blur-xl border-t border-white/10
        safe-bottom
        flex items-center justify-around
        transition-all duration-500 ease-out
        ${visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-full opacity-0 pointer-events-none'
        }
      `}
      aria-label="Menu categories"
    >
      {menuCategories.map((cat, i) => {
        const isActive = i === activeIndex;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => onTabPress(i)}
            className={`
              relative flex-1 py-3 font-sans text-xs tracking-wide
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
    </nav>
  );
}
