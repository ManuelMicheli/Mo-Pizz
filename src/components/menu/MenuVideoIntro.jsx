import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MenuVideoIntro = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    let ctx = gsap.context(() => {
      // Parallax on text container
      gsap.to('.menu-video-content', {
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
      gsap.from('.menu-video-line', {
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
      className="relative w-full h-[50dvh] overflow-hidden"
    >
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/wmremove-transformed-gallery.png"
        className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
        style={{ filter: 'contrast(1.08) brightness(0.95) saturate(0.85)' }}
        src="/videos/Pizzeria_Menu_Background_Video_Generation (1).mp4"
      />

      {/* Cinematic dark overlay stack */}
      <div className="absolute inset-0 bg-black/40" />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(10,12,18,0.35) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Film grain */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '256px 256px',
        }}
      />

      {/* Content — bottom-right */}
      <div className="menu-video-content absolute bottom-8 left-0 right-0 px-6 sm:left-auto sm:right-12 sm:px-0 md:right-20 lg:right-32 z-10 flex flex-col items-center text-center sm:items-end sm:text-right sm:max-w-[440px]">
        <span className="menu-video-line font-caveat text-gold text-lg sm:text-xl md:text-2xl mb-3">
          Dal 2016, Legnano
        </span>

        <h2 className="menu-video-line font-playfair font-black text-cream text-[clamp(1.6rem,4vw,3.5rem)] leading-[0.95] mb-1">
          Ogni pizza è un racconto
        </h2>
        <h2 className="menu-video-line font-playfair font-black italic text-flame text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.95] mb-4">
          scritto col fuoco.
        </h2>

        <p className="menu-video-line font-sans text-smoke text-[clamp(0.75rem,1.1vw,1rem)] max-w-sm leading-relaxed">
          48 ore di doppia lievitazione. Farine selezionate.<br />
          Ingredienti DOP, IGP, Slow Food.<br />
          Il menu di Cristian Moschiano, classe '94.
        </p>
      </div>
    </section>
  );
};

export default MenuVideoIntro;
