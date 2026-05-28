'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import MenuIntro from './MenuIntro';

import MenuHorizontalScroll from './MenuHorizontalScroll';
import MenuHighlight from './MenuHighlight';
import CartFab from './CartFab';

import { useMenu } from '../../hooks/useMenu';
import { CartProvider } from '@/hooks/useCart';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const MenuSection = () => {
  const { menuCategories } = useMenu();
  const [menuUnlocked, setMenuUnlocked] = useState(true);
  // The 120-item menu + GSAP pins are the heaviest thing on the page. Don't
  // mount them at initial hydration — wait until the intro nears the viewport.
  // Cuts initial main-thread (hydration) work; content grows below the fold so
  // there's no layout shift, and the menu is client-only (ssr:false) regardless.
  const [nearView, setNearView] = useState(false);
  const scrollAnchorRef = useRef(null);
  const heroRef = useRef(null);

  useEffect(() => {
    if (nearView) return;
    const el = heroRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNearView(true);
          io.disconnect();
        }
      },
      { rootMargin: '800px 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [nearView]);

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
    <CartProvider>
      <div id="menu">
        <div ref={heroRef}>
          <MenuIntro
            onCtaClick={handleCtaClick}
            menuOpen={menuUnlocked}
          />
        </div>

        {/* Scroll anchor + menu */}
        <div ref={scrollAnchorRef} />

        {menuUnlocked && nearView && (
          <>
            <MenuHorizontalScroll menuCategories={menuCategories} />
            <MenuHighlight />
            <CartFab visible={menuUnlocked} />
          </>
        )}

      </div>
    </CartProvider>
  );
};

export default MenuSection;
