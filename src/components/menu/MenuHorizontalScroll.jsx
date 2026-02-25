import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { menuCategories } from '../../data/menuData';
import CustomCursor from './CustomCursor';
import MobileMenuTabBar from './MobileMenuTabBar';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const badgeKeywords = ['DOP', 'DOCG', 'IGP', 'DOC', 'IGT', 'Slow Food'];

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

const MenuHorizontalScroll = () => {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cursorActive, setCursorActive] = useState(false);
  const [hoverImage, setHoverImage] = useState(null);
  const hoverImgRef = useRef(null);
  const imgXTo = useRef(null);
  const imgYTo = useRef(null);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const scrollTriggerRef = useRef(null);
  const [mobileActiveCategory, setMobileActiveCategory] = useState(0);
  const [tabBarVisible, setTabBarVisible] = useState(false);
  const categoryRefs = useRef([]);
  const [pizzeriaActiveSection, setPizzeriaActiveSection] = useState(0);
  const pizzeriaSectionRefs = useRef([]);

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
  }, []);

  // Detect mobile
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // Cursor-following image reveal setup
  useEffect(() => {
    const imgEl = hoverImgRef.current;
    if (!imgEl) return;

    imgXTo.current = gsap.quickTo(imgEl, 'x', { duration: 0.4, ease: 'power3' });
    imgYTo.current = gsap.quickTo(imgEl, 'y', { duration: 0.4, ease: 'power3' });

    const onMove = (e) => {
      if (imgXTo.current) imgXTo.current(e.clientX);
      if (imgYTo.current) imgYTo.current(e.clientY);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

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
        scrollTrigger: {
          trigger: container,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          pin: true,
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          refreshPriority: 1,
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
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: 'none',
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

      // Stagger item entrance per panel
      panels.forEach((panel) => {
        const items = panel.querySelectorAll('.menu-item');
        gsap.from(items, {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: scrollTween,
            start: 'left 80%',
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
            { yPercent: -5, scale: 1.08 },
            {
              yPercent: 5, scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: cat,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
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
          });
        }
      });
    }, section);

    return () => ctx.revert();
  }, [isMobile]);

  // IntersectionObserver for pizzeria sub-section tracking
  useEffect(() => {
    if (!isMobile) return;
    const refs = pizzeriaSectionRefs.current;
    if (!refs.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = refs.indexOf(entry.target);
            if (idx !== -1) setPizzeriaActiveSection(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    refs.forEach((ref) => { if (ref) observer.observe(ref); });
    return () => observer.disconnect();
  }, [isMobile]);

  // IntersectionObserver for mobile tab bar visibility + active category tracking
  useEffect(() => {
    if (!isMobile) return;

    // Tab bar visibility - observe the mobile section
    const section = mobileSectionRef.current;
    if (!section) return;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => setTabBarVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    sectionObserver.observe(section);

    // Active category tracking — use negative bottom margin so only the
    // category whose TOP portion is in view counts as active
    const catObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.dataset.catIndex);
            if (!isNaN(idx)) setMobileActiveCategory(idx);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -60% 0px' }
    );

    categoryRefs.current.forEach((ref) => {
      if (ref) catObserver.observe(ref);
    });

    return () => {
      sectionObserver.disconnect();
      catObserver.disconnect();
    };
  }, [isMobile]);

  // ─── Mobile Layout ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <>
        <section ref={mobileSectionRef} className="bg-charcoal">
          {menuCategories.map((category, catIdx) => (
            <div
              key={category.id}
              ref={(el) => (categoryRefs.current[catIdx] = el)}
              data-cat-index={catIdx}
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
                  <div className="mobile-hero-parallax absolute inset-0 will-change-transform">
                    <img
                      src={category.heroImage}
                      alt={category.title}
                      loading={catIdx === 0 ? 'eager' : 'lazy'}
                      className="w-full h-[120%] object-cover"
                    />
                  </div>
                  {/* Category title overlay */}
                  <div className="absolute bottom-12 left-5 right-5 z-10">
                    <h3 className="font-playfair font-black text-cream text-3xl leading-none drop-shadow-lg">
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

                {/* Mini sub-tabs — only for Pizzeria (first category) */}
                {catIdx === 0 && (
                  <div className="flex gap-2 mb-8 overflow-x-auto scrollbar-hide -mx-1 px-1">
                    {category.sections.map((sec, sIdx) => (
                      <button
                        key={sIdx}
                        onClick={() => {
                          setPizzeriaActiveSection(sIdx);
                          const el = pizzeriaSectionRefs.current[sIdx];
                          if (el) {
                            const y = el.getBoundingClientRect().top + window.scrollY - 20;
                            window.scrollTo({ top: y, behavior: 'smooth' });
                          }
                        }}
                        className={`flex-shrink-0 font-sans text-xs tracking-wide py-2 px-4 rounded-full border transition-all duration-300 ${
                          pizzeriaActiveSection === sIdx
                            ? 'bg-flame/15 border-flame/40 text-flame font-bold'
                            : 'bg-white/5 border-white/10 text-smoke'
                        }`}
                      >
                        {sec.heading}
                      </button>
                    ))}
                  </div>
                )}

                {category.sections.map((section, sIdx) => (
                  <div
                    key={sIdx}
                    ref={catIdx === 0 ? (el) => (pizzeriaSectionRefs.current[sIdx] = el) : undefined}
                    className="mb-8"
                  >
                    <h4 className="font-caveat text-gold text-2xl mb-4">{section.heading}</h4>
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="flex items-baseline justify-between py-3 border-b border-white/5"
                        >
                          <div className="flex-1 mr-4">
                            <span className="font-playfair font-bold text-cream text-base">
                              {item.name}
                            </span>
                            <span className="block font-sans text-smoke text-xs italic mt-0.5 leading-relaxed">
                              <HighlightBadges text={item.desc} />
                            </span>
                          </div>
                          <span className="font-mono text-gold text-base flex-shrink-0 tabular-nums">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </section>

        <MobileMenuTabBar
          activeIndex={mobileActiveCategory}
          onTabPress={(i) => {
            const el = categoryRefs.current[i];
            if (el) {
              const y = el.getBoundingClientRect().top + window.scrollY - 10;
              window.scrollTo({ top: y, behavior: 'smooth' });
            }
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
        style={{ willChange: 'transform' }}
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

      <section ref={containerRef} className="relative bg-charcoal overflow-hidden z-20">
        {/* Progress bar */}
        <div className="absolute top-0 left-0 right-0 z-30 h-[3px] bg-white/5">
          <div
            className="h-full bg-flame transition-all duration-300 ease-out"
            style={{ width: `${((activeIndex + 1) / menuCategories.length) * 100}%` }}
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
          style={{ width: `${menuCategories.length * 100}vw`, willChange: 'transform' }}
        >
          {menuCategories.map((category) => (
            <div
              key={category.id}
              className="menu-panel flex w-screen h-screen flex-shrink-0"
            >
              {/* Left: Hero Image (40%) */}
              <div className="w-[40%] h-full relative overflow-hidden flex items-end">
                <div
                  className={`panel-hero-img absolute ${category.heroFit === 'contain' ? 'inset-0' : 'inset-[-20%]'}`}
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
                  <h3 className="font-playfair font-black text-cream text-[clamp(2rem,4vw,5rem)] leading-none drop-shadow-lg">
                    {category.title}
                  </h3>
                  <p className="font-sans text-cream/60 text-sm sm:text-base mt-3 max-w-xs leading-relaxed">
                    {category.subtitle}
                  </p>
                </div>
              </div>

              {/* Right: Menu Grid (60%) */}
              <div className="w-[60%] h-full overflow-y-auto px-10 md:px-16 pt-20 pb-12 flex flex-col">
                {category.sections.map((section, sIdx) => (
                  <div key={sIdx} className="mb-10">
                    <h4 className="font-caveat text-gold text-2xl sm:text-3xl mb-6">
                      {section.heading}
                    </h4>
                    <div className="space-y-1">
                      {section.items.map((item, iIdx) => (
                        <div
                          key={iIdx}
                          className="menu-item group flex items-baseline justify-between py-3 border-b border-white/5 hover:border-flame/30 transition-colors duration-300 cursor-default"
                          onMouseEnter={() => handleDishHover(item.hoverImage)}
                          onMouseLeave={() => handleDishHover(null)}
                        >
                          <div className="flex-1 mr-4">
                            <span className="font-playfair font-bold text-cream text-lg sm:text-xl group-hover:text-flame transition-colors duration-300">
                              {item.name}
                            </span>
                            <span className="block font-sans text-smoke text-sm italic mt-0.5 leading-relaxed">
                              <HighlightBadges text={item.desc} />
                            </span>
                          </div>
                          <span className="font-mono text-gold text-base sm:text-lg flex-shrink-0 tabular-nums">
                            {item.price}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default MenuHorizontalScroll;
