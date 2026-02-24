import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MenuIntro = () => {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;

    let ctx = gsap.context(() => {
      // Parallax on text container (moves slower than scroll)
      gsap.to('.menu-intro-content', {
        yPercent: -10,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Line-by-line text reveal
      gsap.from('.menu-intro-line', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
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
      className="relative w-full h-[50dvh] overflow-hidden flex items-center justify-center"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        src="/videos/Pizzeria_Menu_Background_Video_Generation (1).mp4"
      />

      {/* Dark overlay + radial ember glow */}
      <div className="absolute inset-0 bg-charcoal/70" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 50% 90%, rgba(232,93,38,0.25) 0%, transparent 60%)',
        }}
      />

      {/* Noise texture via CSS (GPU-friendly, no SVG filter) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content */}
      <div className="menu-intro-content relative z-10 flex flex-col items-center text-center px-6 sm:px-12 max-w-4xl">
        <span className="menu-intro-line font-caveat text-gold text-lg sm:text-xl md:text-2xl mb-3">
          Dal 2016, Legnano
        </span>

        <h2 className="menu-intro-line font-playfair font-black text-cream text-[clamp(2rem,5vw,5rem)] leading-[0.95] mb-1">
          Ogni pizza è un racconto
        </h2>
        <h2 className="menu-intro-line font-playfair font-black italic text-flame text-[clamp(2rem,6vw,6rem)] leading-[0.95] mb-4">
          scritto col fuoco.
        </h2>

        <p className="menu-intro-line font-sans text-smoke text-[clamp(0.875rem,1.2vw,1.125rem)] max-w-2xl leading-relaxed">
          48 ore di doppia lievitazione. Farine selezionate.
          Ingredienti DOP, IGP, Slow Food.
          Il menu di Cristian Moschiano, classe '94.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1">
        <span className="font-caveat text-cream/40 text-xs tracking-widest uppercase">Esplora il Menu</span>
        <ChevronDown size={22} className="text-cream/40 animate-bounce-slow" />
      </div>
    </section>
  );
};

export default MenuIntro;
