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

      {/* Scroll anchor + menu */}
      <div ref={scrollAnchorRef} />

      {menuUnlocked && (
        <>
          <MenuHorizontalScroll />
          <MenuHighlight />
        </>
      )}

      {/* Full-width image 46 — flush with MenuIntro above and video below */}
      <div className="relative w-full h-[50dvh] overflow-hidden">
        <img
          src="/images/wmremove-transformed (46).png"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'contrast(1.05) brightness(0.92) saturate(0.9)' }}
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 pointer-events-none" />
        {/* Radial vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.6) 100%)',
          }}
        />
        {/* Top/bottom fade into charcoal */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(28,28,28,0.5) 0%, transparent 25%, transparent 75%, rgba(28,28,28,0.7) 100%)',
          }}
        />
        {/* Film grain */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: '256px 256px',
          }}
        />
      </div>

      <MenuVideoIntro />
    </div>
  );
};

export default MenuSection;
