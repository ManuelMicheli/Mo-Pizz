import React, { useState, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import MenuIntro from './MenuIntro';

import MenuHorizontalScroll from './MenuHorizontalScroll';
import MenuHighlight from './MenuHighlight';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MenuSection = () => {
  const [menuUnlocked, setMenuUnlocked] = useState(false);
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768);
  const scrollAnchorRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleCtaClick = useCallback(() => {
    if (menuUnlocked) {
      // Close: cancel any scroll tween, unmount menu, then refresh triggers
      gsap.killTweensOf(window);
      setMenuUnlocked(false);
      requestAnimationFrame(() => {
        setTimeout(() => {
          window.scrollTo({ top: heroRef.current?.offsetTop ?? 0, behavior: 'instant' });
          ScrollTrigger.refresh();
        }, 80);
      });
    } else {
      // Open: mount menu, wait for pin to settle, then scroll into view
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
        }, 200);
      });
    }
  }, [menuUnlocked]);

  return (
    <div id="menu">
      <div ref={heroRef}>
        <MenuIntro
          onCtaClick={isMobile ? undefined : handleCtaClick}
          menuOpen={isMobile ? true : menuUnlocked}
        />
      </div>

      {/* Scroll anchor + menu */}
      <div ref={scrollAnchorRef} />

      {(isMobile || menuUnlocked) && (
        <>
          <MenuHorizontalScroll />
          <MenuHighlight />
        </>
      )}

    </div>
  );
};

export default MenuSection;
