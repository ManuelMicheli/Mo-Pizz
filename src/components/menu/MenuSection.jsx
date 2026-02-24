import React, { useState, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import MenuIntro from './MenuIntro';
import MenuVideoIntro from './MenuVideoIntro';
import MenuHorizontalScroll from './MenuHorizontalScroll';
import MenuHighlight from './MenuHighlight';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MenuSection = () => {
  const [menuUnlocked, setMenuUnlocked] = useState(false);
  const scrollAnchorRef = useRef(null);
  const heroRef = useRef(null);

  const handleCtaClick = useCallback(() => {
    if (menuUnlocked) {
      // Close: kill all ScrollTriggers first to release pins, then unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
      gsap.killTweensOf(window);
      window.scrollTo({ top: heroRef.current?.offsetTop ?? 0, behavior: 'instant' });
      setMenuUnlocked(false);
      requestAnimationFrame(() => {
        setTimeout(() => ScrollTrigger.refresh(), 50);
      });
    } else {
      // Open: mount menu, then scroll into it
      setMenuUnlocked(true);
      requestAnimationFrame(() => {
        setTimeout(() => {
          ScrollTrigger.refresh();
          if (scrollAnchorRef.current) {
            gsap.to(window, {
              scrollTo: { y: scrollAnchorRef.current, offsetY: 0 },
              duration: 1.2,
              ease: 'power2.inOut',
            });
          }
        }, 100);
      });
    }
  }, [menuUnlocked]);

  return (
    <div id="menu">
      <div ref={heroRef}>
        <MenuIntro onCtaClick={handleCtaClick} menuOpen={menuUnlocked} />
      </div>

      {/* Scroll anchor + menu: right after the hero images */}
      <div ref={scrollAnchorRef} />

      {menuUnlocked && (
        <>
          <MenuHorizontalScroll />
          <MenuHighlight />
        </>
      )}

      {/* Full-width image 46 — same height as MenuIntro, half-hero vertical padding */}
      <div className="w-full bg-charcoal py-[25dvh]">
        <img
          src="/images/wmremove-transformed (46).png"
          alt=""
          className="w-full h-[50dvh] object-cover"
        />
      </div>

      <MenuVideoIntro />
    </div>
  );
};

export default MenuSection;
