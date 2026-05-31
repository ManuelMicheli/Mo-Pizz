'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Coffee, Check, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/copy';
import { menuFissoFormule } from '@/data/menuFissoData';

const { menuFisso } = siteContent;

const MenuFissoCard = ({ formula }) => {
  const { nome, prezzo, piatti, badge, featured, bgImage } = formula;

  return (
    <div
      className={`group relative flex flex-col rounded-[1.2rem] p-6 sm:p-8 transition-all duration-500 bg-[#111111] ${
        featured
          ? 'border-2 border-gold/50 shadow-[0_0_30px_rgba(212,168,83,0.12)] md:scale-105 z-10'
          : 'border-2 border-gold/15 hover:border-gold/30'
      }`}
    >
      {bgImage && (
        <div
          aria-hidden="true"
          className="absolute inset-0 rounded-[1.2rem] overflow-hidden pointer-events-none"
        >
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="(max-width: 767px) 100vw, 33vw"
            className="object-cover object-center opacity-30 group-hover:opacity-45 transition-opacity duration-700 ease-out"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(17,17,17,0.55) 0%, rgba(17,17,17,0.78) 55%, rgba(17,17,17,0.95) 100%)',
            }}
          />
        </div>
      )}

      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 inline-block bg-gold text-charcoal font-sans font-bold text-[10px] tracking-wide uppercase px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}

      <div className="relative z-[1] flex flex-col flex-1">
        <h3 className={`font-playfair text-xl sm:text-2xl leading-tight mt-1 ${featured ? 'text-cream' : 'text-cream/90'}`}>
          {nome}
        </h3>

        <div className="flex items-baseline gap-0.5 mt-4 mb-5">
          <span className="font-playfair text-lg text-gold">€</span>
          <span className="font-playfair text-5xl leading-none text-cream">
            {prezzo}
          </span>
          <span className="font-sans text-xs ml-0.5 text-gold/40">,00</span>
        </div>

        <div className={`w-full h-px mb-5 ${featured ? 'bg-gold/25' : 'bg-gold/10'}`} />

        <ul className="flex flex-col gap-3 flex-1">
          {piatti.map((piatto, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-4 h-4 flex-shrink-0 text-gold" strokeWidth={2.5} />
              <span className="font-sans text-sm sm:text-base leading-snug text-cream/85 [text-shadow:0_1px_2px_rgba(0,0,0,0.55)]">
                {piatto}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1.5 mt-5 text-gold/40">
          <Coffee className="w-3.5 h-3.5 flex-shrink-0" />
          <span className="font-sans text-[11px]">{menuFisso.notaIncluso}</span>
        </div>
        <p className="font-sans text-[10px] mt-1 text-gold/30">
          {menuFisso.notaEscluso}
        </p>

        <a
          href="/#prenota"
          aria-label={`Prenota per ${nome}`}
          className={`magnetic-btn mt-5 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-sans font-bold text-sm transition-all duration-300 ${
            featured
              ? 'bg-gold hover:bg-[#c4943d] text-charcoal'
              : 'bg-gold/15 hover:bg-gold/25 text-gold border border-gold/30 hover:border-gold/50 backdrop-blur-sm'
          }`}
        >
          Vieni a pranzo
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

const MenuFisso = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx;
    let cancelled = false;

    // Load GSAP lazily (not in the initial hydration bundle) — this is a
    // below-the-fold scroll-triggered fade, so it can wait. Keeps GSAP off the
    // main thread during first load to protect Total Blocking Time.
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        if (cancelled) return;
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from('.mf-anim', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            ease: 'power3.out',
            stagger: 0.08,
            force3D: true,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          });
        }, sectionRef);
      }
    );

    return () => {
      cancelled = true;
      if (ctx) ctx.revert();
    };
  }, []);

  const mobileOrder = menuFissoFormule.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section
      ref={sectionRef}
      className="relative z-10 py-12 sm:py-16 lg:py-20 overflow-hidden"
    >
      {/* Section background — kitchen atmosphere */}
      <Image
        src="/images/menu-fisso-bg.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center -z-10"
      />

      {/* Dark overlay so the kitchen photo reads as atmosphere, not subject */}
      <div className="absolute inset-0 bg-charcoal/65 pointer-events-none" />

      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 bg-lines-pattern bg-[length:40px_40px] opacity-[0.04] pointer-events-none" />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(212,168,83,0.06) 0%, transparent 70%)',
        }}
      />

      {/* Film grain */}
      <div className="absolute inset-0 grain-texture opacity-[0.04] pointer-events-none" />

      {/* Sfumatura di giunzione in alto — la sezione emerge dal charcoal (hero su desktop / servizi su mobile) */}
      <div className="absolute inset-x-0 top-0 h-28 sm:h-36 z-0 pointer-events-none bg-gradient-to-b from-charcoal to-transparent" />

      {/* Header */}
      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mf-anim text-center mb-8 sm:mb-8">
          <span className="inline-block bg-gold/15 text-gold font-mono font-bold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-gold/20">
            {menuFisso.badgePrezzo}
          </span>
          <h2 className="font-playfair text-cream text-[clamp(1.6rem,4vw,2.8rem)] leading-[0.95] mb-2">
            {menuFisso.headline}{' '}
            <span className="italic text-gold">{menuFisso.headlineEm}</span>
          </h2>
          <p className="font-sans text-smoke text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            {menuFisso.subtitle}
          </p>
        </div>
      </div>

      {/* Cards — mobile */}
      <div className="relative mf-anim flex flex-col gap-5 md:hidden px-4 sm:px-8 max-w-[1000px] mx-auto">
        {mobileOrder.map((f) => (
          <MenuFissoCard key={f.id} formula={f} />
        ))}
      </div>

      {/* Cards — desktop */}
      <div className="relative mf-anim hidden md:grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch px-6 lg:px-12 xl:px-20">
        {menuFissoFormule.map((f) => (
          <MenuFissoCard key={f.id} formula={f} />
        ))}
      </div>

      {/* Info Strip & CTA */}
      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mf-anim flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mt-7 sm:mt-8">
          <div className="flex items-center gap-1.5 text-smoke">
            <Calendar className="w-3.5 h-3.5 text-gold/70" />
            <span className="font-sans text-xs">{menuFisso.infoQuando}</span>
          </div>
          <div className="flex items-center gap-1.5 text-smoke">
            <MapPin className="w-3.5 h-3.5 text-gold/70" />
            <a
              href="https://maps.google.com/?q=Mo+Pizz+Via+Cadore+4+Legnano"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs hover:text-flame transition-colors underline underline-offset-2"
            >
              {menuFisso.infoDove}
            </a>
          </div>
          <div className="flex items-center gap-1.5 text-smoke">
            <Coffee className="w-3.5 h-3.5 text-gold/70" />
            <span className="font-sans text-xs">{menuFisso.infoIncluso}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mf-anim flex flex-col items-center mt-6">
          <a
            href="/#prenota"
            className="magnetic-btn inline-flex items-center gap-2 bg-flameDark hover:bg-ember text-cream font-sans font-bold text-sm py-3 px-8 rounded-full transition-colors duration-300 shadow-lg shadow-flame/20"
          >
            {menuFisso.ctaPrenota}
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="font-sans text-white text-xs mt-3 text-center max-w-xs">
            {menuFisso.ctaWalkin}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuFisso;
