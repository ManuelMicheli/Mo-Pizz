'use client';
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Plus, Check } from 'lucide-react';
import CustomCursor from './CustomCursor';
import MobileMenuTabBar from './MobileMenuTabBar';
import { useCart } from '@/hooks/useCart';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const badgeKeywords = ['DOP', 'DOCG', 'IGP', 'DOC', 'IGT', 'Slow Food'];

// px from the top where a category/sub-section counts as "active" and where
// tapped sections land — sits just under the floating sub-nav pill.
const ACTIVE_LINE = 88;

const CartButton = ({ category, section, item, size = 'md' }) => {
  const { add, decrement, quantityFor } = useCart();
  const payload = {
    categoryId: category.id,
    categoryTitle: category.title,
    sectionHeading: section.heading,
    name: item.name,
    price: item.price,
  };
  const qty = quantityFor(payload);
  const inCart = qty > 0;
  const dims = size === 'sm' ? 'w-8 h-8' : 'w-9 h-9';
  const icon = size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4';

  if (!inCart) {
    return (
      <button
        type="button"
        onClick={(e) => { e.stopPropagation(); add(payload); }}
        aria-label={`Aggiungi ${item.name} alla tua selezione`}
        className={`${dims} flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-charcoal transition-colors flex-shrink-0`}
      >
        <Plus className={icon} strokeWidth={2.5} />
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={(e) => { e.stopPropagation(); decrement(payload); }}
      aria-label={`Rimuovi una unità di ${item.name}`}
      className={`${dims} flex items-center justify-center rounded-full bg-flame text-cream hover:bg-ember transition-colors flex-shrink-0 relative font-mono text-xs font-bold tabular-nums`}
    >
      {qty > 1 ? qty : <Check className={icon} strokeWidth={2.5} />}
    </button>
  );
};

const HighlightBadges = ({ text }) => {
  const regex = new RegExp(`(${badgeKeywords.join('|')})`, 'g');
  const parts = text.split(regex);
  return (
    <span>
      {parts.map((part, i) =>
        badgeKeywords.includes(part) ? (
          <span key={i} className="inline-block text-gold font-caveat text-base ml-1 px-1.5 py-0 border border-gold/30 rounded bg-gold/5 badge-glow">{part}</span>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </span>
  );
};

/* ── Desktop Panel Right-Side: stacking-sticky sub-nav between sections ───── */
const PanelContent = ({ category, handleDishHover }) => {
  const scrollRef = useRef(null);
  const sectionRefs = useRef([]);
  const navBarRefs = useRef([]);
  const hasSubNav = category.sections.length > 1;

  const scrollToSection = useCallback((idx) => {
    const container = scrollRef.current;
    const navBar = navBarRefs.current[idx];
    const el = sectionRefs.current[idx];
    if (!container || !el) return;

    if (idx === 0) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Calculate the nav bar's normal-flow position (right before the section)
    const containerRect = container.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    const navH = navBar ? navBar.offsetHeight : 0;
    const navScrollPos = container.scrollTop + (elRect.top - containerRect.top) - navH;

    // Scroll so the nav sits ~60px from the top — the previous section's
    // last item stays visible above the nav, heading appears below
    container.scrollTo({
      top: navScrollPos - 60,
      behavior: 'smooth',
    });
  }, []);

  const renderNavPills = (currentSIdx) => (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide">
      {category.sections.map((sec, navIdx) => (
        <button
          key={navIdx}
          onClick={() => scrollToSection(navIdx)}
          className={`flex-shrink-0 font-sans text-[11px] tracking-wide py-1.5 px-3.5 rounded-full border transition-all duration-300 cursor-pointer whitespace-nowrap ${
            currentSIdx === navIdx
              ? 'bg-flame/15 border-flame/40 text-flame font-bold'
              : 'bg-white/5 border-white/10 text-smoke hover:text-cream hover:border-white/20'
          }`}
        >
          {sec.heading}
        </button>
      ))}
    </div>
  );

  return (
    <div ref={scrollRef} className="w-[60%] h-full overflow-y-auto px-10 md:px-16 pt-20 pb-12 flex flex-col">
      {category.sections.map((section, sIdx) => (
        <React.Fragment key={sIdx}>
          {/* Stacking-sticky nav — one before each section, each pushes the previous off */}
          {hasSubNav && (
            <div
              ref={(el) => (navBarRefs.current[sIdx] = el)}
              className="sticky top-0 z-20 -mx-10 md:-mx-16 px-10 md:px-16 pt-3 pb-3 bg-charcoal/90 backdrop-blur-md border-b border-white/5"
            >
              {renderNavPills(sIdx)}
            </div>
          )}
          <div
            ref={(el) => (sectionRefs.current[sIdx] = el)}
            data-section-idx={sIdx}
            className={hasSubNav ? 'mb-4' : 'mb-10'}
          >
            <h4 className="font-caveat text-gold text-2xl sm:text-3xl mb-6 mt-4">
              {section.heading}
            </h4>
            <div className="space-y-1">
              {section.items.map((item, iIdx) => (
                <div
                  key={iIdx}
                  className="menu-item group flex items-baseline justify-between gap-4 py-3 border-b border-white/5 hover:border-flame/30 transition-colors duration-300 cursor-default"
                  onMouseEnter={() => handleDishHover(item.hoverImage)}
                  onMouseLeave={() => handleDishHover(null)}
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-playfair text-cream text-lg sm:text-xl group-hover:text-flame transition-colors duration-300">
                      {item.name}
                    </span>
                    <span className="block font-sans text-smoke text-sm italic mt-0.5 leading-relaxed">
                      <HighlightBadges text={item.desc} />
                    </span>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className="font-mono text-gold text-base sm:text-lg tabular-nums">
                      {item.price}
                    </span>
                    <CartButton category={category} section={section} item={item} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </React.Fragment>
      ))}
      {/* Spacer so the last sections can scroll fully into position */}
      {hasSubNav && <div className="flex-shrink-0 min-h-[60vh]" />}
    </div>
  );
};

/* ── Floating mobile sub-section nav ──────────────────────────────────────────
   One slim pill row near the top. The strip auto-centers the active pill as you
   scroll the page, so the tab "follows" the section you're looking at.
   Keyed by category outside, so refs/scroll reset cleanly on category change. */
const MobileSubNav = ({ category, currentSub, visible, onSelect }) => {
  const scrollerRef = useRef(null);
  const pillRefs = useRef([]);
  const hasSubs = category.sections.length > 1;

  useEffect(() => {
    if (!hasSubs) return;
    const scroller = scrollerRef.current;
    const pill = pillRefs.current[currentSub];
    if (!scroller || !pill) return;
    const target = pill.offsetLeft - (scroller.clientWidth - pill.clientWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, target), behavior: 'smooth' });
  }, [currentSub, hasSubs]);

  return (
    <div
      className={`fixed top-3 left-0 right-0 z-40 px-3 transition-all duration-300 ${
        visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-md mx-auto flex items-center gap-2 rounded-full bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-lg shadow-black/40 pl-3 pr-2 py-1.5">
        <span className="flex-shrink-0 font-mono text-[10px] uppercase tracking-wider text-flame truncate max-w-[26vw]">
          {category.title}
        </span>
        {hasSubs && (
          <>
            <span aria-hidden className="flex-shrink-0 w-px h-4 bg-white/15" />
            <div ref={scrollerRef} className="flex gap-1.5 overflow-x-auto scrollbar-hide scroll-smooth">
              {category.sections.map((sec, sIdx) => (
                <button
                  key={sIdx}
                  ref={(el) => (pillRefs.current[sIdx] = el)}
                  type="button"
                  onClick={() => onSelect(sIdx)}
                  className={`flex-shrink-0 font-sans text-[11px] tracking-wide py-1 px-3 rounded-full whitespace-nowrap transition-colors duration-300 ${
                    currentSub === sIdx ? 'bg-flame text-cream font-bold' : 'text-smoke'
                  }`}
                  aria-current={currentSub === sIdx ? 'true' : undefined}
                >
                  {sec.heading}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const MenuHorizontalScroll = ({ menuCategories }) => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const hoverImgRef = useRef(null);
  const imgXTo = useRef(null);
  const imgYTo = useRef(null);
  // Sync init prevents desktop→mobile JSX swap after mount, which used to
  // leave GSAP pin-spacers orphaned in the DOM and crash React with
  // NotFoundError on removeChild during the subtree teardown.
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
  );
  const scrollTriggerRef = useRef(null);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(0);
  const [tabBarVisible, setTabBarVisible] = useState(false);
  const categoryRefs = useRef([]);
  const [activeSections, setActiveSections] = useState({});
  const mobileSectionRefsMap = useRef({});

  // Navigate to a specific category panel
  const goToCategory = useCallback((index) => {
    const st = scrollTriggerRef.current;
    if (!st) return;
    const progress = index / (menuCategories.length - 1);
    gsap.to(window, {
      scrollTo: st.start + (st.end - st.start) * progress,
      duration: 1,
      ease: 'power2.inOut',
    });
  }, [menuCategories.length]);

  // Detect mobile — debounced resize so we don't fire 60×/sec during drag
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    check();
    let t;
    const onResize = () => {
      clearTimeout(t);
      t = setTimeout(check, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(t);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Cursor-following image reveal setup — init quickTo once
  useEffect(() => {
    const imgEl = hoverImgRef.current;
    if (!imgEl) return;
    imgXTo.current = gsap.quickTo(imgEl, 'x', { duration: 0.4, ease: 'power3' });
    imgYTo.current = gsap.quickTo(imgEl, 'y', { duration: 0.4, ease: 'power3' });
    return () => { gsap.killTweensOf(imgEl); };
  }, []);

  // Attach mousemove only when menu section is active (cursorActive flag)
  useEffect(() => {
    if (!cursorActive) return;
    const onMove = (e) => {
      if (imgXTo.current) imgXTo.current(e.clientX);
      if (imgYTo.current) imgYTo.current(e.clientY);
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [cursorActive]);

  // Show/hide hover image
  useEffect(() => {
    const imgEl = hoverImgRef.current;
    if (!imgEl) return;
    gsap.to(imgEl, {
      scale: hoverImage ? 1 : 0,
      opacity: hoverImage ? 1 : 0,
      duration: 0.3,
      ease: 'power2.out',
    });
  }, [hoverImage]);

  // GSAP horizontal scroll (desktop only)
  // useLayoutEffect so ctx.revert() runs BEFORE React removes DOM nodes on unmount
  useLayoutEffect(() => {
    if (isMobile) return;

    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return;

    let ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.menu-panel');
      const totalWidth = track.scrollWidth - window.innerWidth;

      const scrollTween = gsap.to(track, {
        x: -totalWidth,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const idx = Math.round(self.progress * (panels.length - 1));
            setActiveIndex(idx);
          },
          onEnter: () => setCursorActive(true),
          onLeave: () => setCursorActive(false),
          onEnterBack: () => setCursorActive(true),
          onLeaveBack: () => setCursorActive(false),
          onRefresh: (self) => { scrollTriggerRef.current = self; },
        },
      });

      scrollTriggerRef.current = scrollTween.scrollTrigger;

      // Refresh all triggers so downstream pins account for this spacer
      requestAnimationFrame(() => ScrollTrigger.refresh());

      // Parallax on hero images
      panels.forEach((panel) => {
        const img = panel.querySelector('.panel-hero-img');
        if (!img) return;
        gsap.fromTo(
          img,
          { xPercent: -10 },
          {
            xPercent: 10,
            ease: 'none',
            force3D: true,
            scrollTrigger: {
              trigger: panel,
              containerAnimation: scrollTween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          }
        );
      });

      // Stagger item entrance per panel — SKIP panel 0. Its left edge starts
      // at viewport 0% and only moves left as the track scrolls, so any
      // 'left X%' trigger never crosses. Panel 0 items must rely on the
      // natural CSS state (visible). Animating them at all risks leaving
      // them at opacity 0 forever if the trigger never fires.
      panels.forEach((panel, idx) => {
        if (idx === 0) return;
        const items = panel.querySelectorAll('.menu-item');
        gsap.from(items, {
          y: 20,
          opacity: 0,
          stagger: 0.03,
          duration: 0.6,
          ease: 'power3.out',
          force3D: true,
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 90%',
            toggleActions: 'play none none none',
          },
        });
      });
    }, container);

    return () => ctx.revert();
  }, [isMobile]);

  const handleDishHover = useCallback((img) => {
    setHoverImage(img || null);
  }, []);

  // ScrollTrigger parallax + fade-in for mobile categories
  const mobileSectionRef = useRef(null);
  useEffect(() => {
    if (!isMobile) return;
    const section = mobileSectionRef.current;
    if (!section) return;

    let ctx = gsap.context(() => {
      const categories = section.querySelectorAll('.mobile-category');

      categories.forEach((cat, i) => {
        // Parallax on hero image
        const heroImg = cat.querySelector('.mobile-hero-parallax');
        if (heroImg) {
          gsap.fromTo(heroImg,
            { yPercent: -3, scale: 1.05 },
            {
              yPercent: 3, scale: 1,
              ease: 'none',
              force3D: true,
              scrollTrigger: {
                trigger: cat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.5,
                fastScrollEnd: true,
              },
            }
          );
        }

        // Pin each category (except last) so the next one scrolls over it
        if (i < categories.length - 1) {
          ScrollTrigger.create({
            trigger: cat,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            fastScrollEnd: true,
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // Live scroll-driven tracking: active category, active sub-section, and bar
  // visibility — all from getBoundingClientRect each frame (rAF-throttled).
  // Reading live rects stays accurate even while GSAP pins categories
  // (pinned = position: fixed), so there are no cached baselines to drift out
  // of sync the way the old offsetTop/probe approach did.
  useEffect(() => {
    if (!isMobile) return;
    const section = mobileSectionRef.current;
    if (!section) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const secRect = section.getBoundingClientRect();
      // Visible once the menu has scrolled up under the line, hidden again
      // once its bottom rises past it — "appears as you scroll the menu".
      setTabBarVisible(secRect.top <= ACTIVE_LINE && secRect.bottom > ACTIVE_LINE);

      // Active category = deepest one whose top has crossed the line.
      let catIdx = 0;
      for (let i = 0; i < categoryRefs.current.length; i++) {
        const el = categoryRefs.current[i];
        if (el && el.getBoundingClientRect().top <= ACTIVE_LINE) catIdx = i;
      }
      setMobileActiveCategory((prev) => (prev === catIdx ? prev : catIdx));

      // Active sub-section within that category, same live-rect rule.
      const cat = menuCategories[catIdx];
      if (cat && cat.sections.length > 1) {
        let sIdx = 0;
        for (let s = 0; s < cat.sections.length; s++) {
          const el = mobileSectionRefsMap.current[`${catIdx}-${s}`];
          if (el && el.getBoundingClientRect().top <= ACTIVE_LINE + 16) sIdx = s;
        }
        setActiveSections((prev) => (prev[catIdx] === sIdx ? prev : { ...prev, [catIdx]: sIdx }));
      }
    };

    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [isMobile, menuCategories]);

  const smoothScrollTo = useCallback((targetY) => {
    const y = Math.max(0, targetY);
    const lenis = typeof window !== 'undefined' ? window.__lenis : null;
    if (lenis && typeof lenis.scrollTo === 'function') {
      // Lenis owns scroll on this site; bypass it and gsap ScrollToPlugin
      // would otherwise be reset by Lenis's next raf tick.
      lenis.scrollTo(y, { duration: 0.9, immediate: false });
      return;
    }
    gsap.to(window, {
      scrollTo: { y, autoKill: true },
      duration: 0.7,
      ease: 'power2.inOut',
    });
  }, []);

  // Jump targets read live: getBoundingClientRect + scrollY gives the element's
  // current absolute Y regardless of pin state, so taps land precisely.
  const scrollToCategory = useCallback((i) => {
    const el = categoryRefs.current[i];
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    smoothScrollTo(y);
  }, [smoothScrollTo]);

  const scrollToSub = useCallback((catIdx, sIdx) => {
    const el = mobileSectionRefsMap.current[`${catIdx}-${sIdx}`];
    if (!el) return scrollToCategory(catIdx);
    const y = el.getBoundingClientRect().top + window.scrollY - ACTIVE_LINE;
    smoothScrollTo(y);
  }, [smoothScrollTo, scrollToCategory]);

  // ─── Mobile Layout ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <section ref={mobileSectionRef} className="bg-charcoal">
          {menuCategories.map((category, catIdx) => (
            <div
              key={category.id}
              ref={(el) => (categoryRefs.current[catIdx] = el)}
              className={`mobile-category relative bg-charcoal ${
                catIdx > 0 ? 'rounded-t-[2rem] -mt-12 shadow-[0_-20px_60px_rgba(0,0,0,0.8)]' : ''
              }`}
              style={{ zIndex: (catIdx + 1) * 10 }}
            >
              {/* Hero Image with parallax */}
              {category.heroImage && (
                <div className={`relative w-full h-[55vh] max-h-[400px] overflow-hidden ${
                  catIdx > 0 ? 'rounded-t-[2rem]' : ''
                }`}>
                  <div className="mobile-hero-parallax absolute inset-0">
                    <img
                      src={category.heroImage}
                      alt={category.title}
                      loading={catIdx === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                      className="w-full h-[120%] object-cover"
                    />
                  </div>
                  {/* Category title overlay */}
                  <div className="absolute bottom-12 left-5 right-5 z-10">
                    <h3 className="font-playfair text-cream text-3xl leading-none drop-shadow-lg">
                      {category.title}
                    </h3>
                  </div>
                  {/* Bottom gradient fade into card */}
                  <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-charcoal via-charcoal/60 to-transparent" />
                </div>
              )}

              {/* Menu Items Card */}
              <div className="relative bg-charcoal -mt-8 pt-8 px-5 pb-24">
                {/* Category subtitle */}
                <div className="mb-8">
                  <p className="font-sans text-smoke text-sm">{category.subtitle}</p>
                </div>

                {category.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    ref={category.sections.length > 1 ? (el) => {
                      mobileSectionRefsMap.current[`${catIdx}-${sIdx}`] = el;
                    } : undefined}
                    className="mb-8 scroll-mt-24"
                  >
                    <h4 className="font-caveat text-gold text-2xl mb-4">{section.heading}</h4>
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-baseline justify-between gap-3 py-3 border-b border-white/5"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="font-playfair text-cream text-base">
                              {item.name}
                            </span>
                            <span className="block font-sans text-smoke text-xs italic mt-0.5 leading-relaxed">
                              <HighlightBadges text={item.desc} />
                            </span>
                          </div>
                          <div className="flex items-center gap-2 flex-shrink-0">
                            <span className="font-mono text-gold text-base tabular-nums">
                              {item.price}
                            </span>
                            <CartButton category={category} section={section} item={item} size="sm" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Floating sub-section nav — slim pill row, sits high (navbar hides
            inside #menu), appears on scroll. Keyed by category so the strip's
            scroll position + pill refs reset cleanly when the category changes.
            Active pill is driven by live-rect tracking and auto-centers. */}
        {menuCategories[mobileActiveCategory] && (
          <MobileSubNav
            key={mobileActiveCategory}
            category={menuCategories[mobileActiveCategory]}
            currentSub={activeSections[mobileActiveCategory] || 0}
            visible={tabBarVisible}
            onSelect={(sIdx) => {
              setActiveSections((prev) => ({ ...prev, [mobileActiveCategory]: sIdx }));
              scrollToSub(mobileActiveCategory, sIdx);
            }}
          />
        )}

        <MobileMenuTabBar
          menuCategories={menuCategories}
          activeIndex={mobileActiveCategory}
          onTabPress={(i) => {
            // Update immediately so breadcrumb + sub-nav switch before scroll lands
            setMobileActiveCategory(i);
            scrollToCategory(i);
          }}
          visible={tabBarVisible}
        />
      </>
    );
  }

  // ─── Desktop Layout (Horizontal Scroll) ──────────────────────────────────────
  return (
    <>
      <CustomCursor isActive={cursorActive} />

      {/* Cursor-following dish image */}
      <div
        ref={hoverImgRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      >
        {hoverImage && (
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gold/40 shadow-2xl">
            <img
              src={hoverImage}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        )}
      </div>

      <section ref={containerRef} id="menu-horizontal" className="relative bg-charcoal overflow-hidden z-20">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5 overflow-hidden">
          <div
            className="h-full w-full bg-flame origin-left"
            style={{
              transform: `scaleX(${(activeIndex + 1) / menuCategories.length})`,
              transition: 'transform 0.3s ease-out',
              willChange: 'transform',
            }}
          />
        </div>

        {/* Category indicators (clickable, left-aligned) */}
        <div className="absolute top-6 left-6 sm:left-12 z-30 flex flex-col gap-3">
          {menuCategories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => goToCategory(i)}
              className={`flex items-center gap-2 transition-all duration-500 cursor-pointer hover:opacity-100 ${
                i === activeIndex ? 'opacity-100' : 'opacity-30'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full transition-colors duration-500 flex-shrink-0 ${
                  i === activeIndex ? 'bg-flame' : 'bg-smoke'
                }`}
              />
              <span
                className={`font-sans text-xs sm:text-sm uppercase tracking-widest transition-colors duration-500 ${
                  i === activeIndex ? 'text-cream' : 'text-smoke'
                }`}
              >
                {cat.title}
              </span>
            </button>
          ))}
        </div>

        {/* Horizontal track */}
        <div
          ref={trackRef}
          className="flex h-screen"
          style={{ width: `${menuCategories.length * 100}vw` }}
        >
          {menuCategories.map((category) => (
            <div
              key={category.id}
              className="menu-panel flex w-screen h-screen flex-shrink-0"
            >
              {/* Left: Hero Image (40%) */}
              <div className="w-[40%] h-full relative overflow-hidden flex items-end">
                <div
                  className={`panel-hero-img absolute ${category.heroFit === 'contain' ? 'inset-0' : 'inset-[-10%]'}`}
                  style={{
                    backgroundImage: `url('${category.heroImage}')`,
                    backgroundSize: category.heroFit || 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                {/* Dark edge gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/80" />

                {/* Category title overlay */}
                <div className="relative z-10 p-12 pb-24">
                  <h3 className="font-playfair text-cream text-[clamp(2rem,4vw,5rem)] leading-none drop-shadow-lg">
                    {category.title}
                  </h3>
                  <p className="font-sans text-cream/60 text-sm sm:text-base mt-3 max-w-xs leading-relaxed">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: Menu Grid (60%) with sub-nav */}
              <PanelContent category={category} handleDishHover={handleDishHover} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MenuHorizontalScroll;
