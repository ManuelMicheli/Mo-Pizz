import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MenuIntro = ({ onCtaClick, menuOpen }) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    let ctx = gsap.context(() => {
      // Parallax on images
      gsap.to('.menu-hero-img', {
        yPercent: -8,
        ease: 'none',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
        },
      });

      // Fade-in images
      gsap.from('.menu-hero-img', {
        scale: 1.05,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        },
      });

      // CTA entrance
      gsap.from('.menu-hero-cta', {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: 'power3.out',
        force3D: true,
        scrollTrigger: {
          trigger: section,
          start: 'top 60%',
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-[45dvh] md:h-[50dvh] overflow-hidden bg-charcoal flex items-center justify-center"
    >
      {/* Two-image hero grid */}
      <div className="relative z-10 w-full h-full flex">
        {/* Image 39 — left half */}
        <div className="menu-hero-img w-1/2 h-full relative overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <img
            src="/images/wmremove-transformed (39).webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Inner edge fade */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-charcoal/60" />
        </div>

        {/* Image 40 — right half */}
        <div className="menu-hero-img w-1/2 h-full relative overflow-hidden will-change-transform" style={{ transform: 'translateZ(0)' }}>
          <img
            src="/images/wmremove-transformed (40).webp"
            alt=""
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
          {/* Inner edge fade */}
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-charcoal/60" />
        </div>
      </div>

      {/* Dark overlay stack */}
      <div className="absolute inset-0 z-20 bg-black/30 pointer-events-none" />
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.25) 60%, rgba(0,0,0,0.6) 100%)',
        }}
      />
      {/* Top/bottom fade into charcoal */}
      <div
        className="absolute inset-0 z-20 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(28,28,28,0.5) 0%, transparent 25%, transparent 75%, rgba(28,28,28,0.7) 100%)',
        }}
      />

      {/* Film grain — uses global noise overlay from index.css */}

      {/* CTA — bottom center */}
      <div className="menu-hero-cta absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3">
        <button
          onClick={onCtaClick}
          className={`magnetic-btn border font-sans font-bold py-3.5 px-10 rounded-full transition-colors duration-300 text-base tracking-wide cursor-pointer ${
            menuOpen
              ? 'border-flame/60 text-flame hover:bg-flame hover:text-cream'
              : 'border-cream/60 text-cream hover:bg-cream hover:text-charcoal'
          }`}
        >
          {menuOpen ? 'Chiudi il Menu' : 'Esplora il Menu'}
        </button>
        {!menuOpen && <ChevronDown size={20} className="text-cream/40 animate-bounce-slow" />}
      </div>
    </section>
  );
};

export default MenuIntro;
