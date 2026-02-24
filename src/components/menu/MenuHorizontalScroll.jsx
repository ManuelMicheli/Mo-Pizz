import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { menuCategories } from '../../data/menuData';
import CustomCursor from './CustomCursor';

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
  const [isMobile, setIsMobile] = useState(false);
  const scrollTriggerRef = useRef(null);

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
  useEffect(() => {
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

  // ─── Mobile Layout ───────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <section className="bg-charcoal py-16 px-6">
        {menuCategories.map((category, catIdx) => (
          <div key={category.id} className={catIdx > 0 ? 'mt-16' : ''}>
            {/* Category header */}
            <div className="mb-8">
              <h3 className="font-playfair font-black text-cream text-3xl leading-none">
                {category.title}
              </h3>
              <p className="font-sans text-smoke text-sm mt-2">{category.subtitle}</p>
            </div>

            {category.sections.map((section, sIdx) => (
              <div key={sIdx} className="mb-8">
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
                        <span className="block font-sans text-smoke text-xs italic mt-0.5">
                          <HighlightBadges text={item.desc} />
                        </span>
                      </div>
                      <span className="font-mono text-gold text-sm flex-shrink-0 tabular-nums">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </section>
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

      <section ref={containerRef} className="relative bg-charcoal overflow-hidden">
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
