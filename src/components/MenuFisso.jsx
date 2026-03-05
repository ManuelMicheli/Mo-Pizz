import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Coffee, Check, ArrowRight } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '@/data/copy';
import { menuFissoFormule } from '@/data/menuFissoData';

gsap.registerPlugin(ScrollTrigger);

const { menuFisso } = siteContent;

const MenuFissoCard = ({ formula }) => {
  const { nome, prezzo, piatti, badge, featured } = formula;

  return (
    <div
      className={`group relative flex flex-col rounded-[2rem] p-6 sm:p-8 transition-all duration-500 ${
        featured
          ? 'bg-gradient-to-b from-flame/20 to-charcoal border border-gold/30 shadow-[0_8px_40px_rgba(212,168,83,0.15)] md:scale-105 z-10'
          : 'bg-cream/[0.06] border border-cream/10 backdrop-blur-sm hover:border-cream/20 hover:bg-cream/10'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-block bg-gold text-charcoal font-sans font-bold text-[10px] tracking-wide uppercase px-3 py-1 rounded-full shadow-md">
          {badge}
        </span>
      )}

      <h3 className={`font-playfair font-black text-xl sm:text-2xl leading-tight mt-1 ${featured ? 'text-cream' : 'text-cream/90'}`}>
        {nome}
      </h3>

      <div className="flex items-baseline gap-0.5 mt-4 mb-5">
        <span className={`font-playfair text-lg ${featured ? 'text-gold' : 'text-flame'}`}>€</span>
        <span className={`font-playfair font-black text-5xl leading-none ${featured ? 'text-cream' : 'text-cream'}`}>
          {prezzo}
        </span>
        <span className="font-sans text-xs ml-0.5 text-cream/40">,00</span>
      </div>

      <div className={`w-full h-px mb-5 ${featured ? 'bg-gold/20' : 'bg-cream/10'}`} />

      <ul className="flex flex-col gap-3 flex-1">
        {piatti.map((piatto, i) => (
          <li key={i} className="flex items-center gap-2">
            <Check className={`w-4 h-4 flex-shrink-0 ${featured ? 'text-gold' : 'text-flame'}`} strokeWidth={2.5} />
            <span className="font-sans text-sm sm:text-base leading-snug text-cream/80">
              {piatto}
            </span>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-1.5 mt-5 text-cream/40">
        <Coffee className="w-3.5 h-3.5 flex-shrink-0" />
        <span className="font-sans text-[11px]">{menuFisso.notaIncluso}</span>
      </div>
      <p className="font-sans text-[10px] mt-1 text-cream/20">
        {menuFisso.notaEscluso}
      </p>

      <HashLink
        smooth
        to="/#prenota"
        aria-label={`Prenota per ${nome}`}
        className={`magnetic-btn mt-5 flex items-center justify-center gap-2 py-3 px-6 rounded-full font-sans font-bold text-sm transition-colors duration-300 ${
          featured
            ? 'bg-flame hover:bg-ember text-cream'
            : 'bg-cream/10 hover:bg-cream/20 text-cream border border-cream/10'
        }`}
      >
        Vieni a pranzo
        <ArrowRight className="w-3.5 h-3.5" />
      </HashLink>
    </div>
  );
};

const MenuFisso = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const els = gsap.utils.toArray('.mf-anim');
      els.forEach((el) => {
        gsap.fromTo(el,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 92%' },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const mobileOrder = menuFissoFormule.slice().sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));

  return (
    <section ref={sectionRef} className="relative z-10 bg-charcoal py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Diagonal lines pattern */}
      <div className="absolute inset-0 bg-lines-pattern bg-[length:40px_40px] opacity-[0.03] pointer-events-none" />

      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(232,93,38,0.06) 0%, transparent 70%)',
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

      {/* Header */}
      <div className="relative max-w-[1000px] mx-auto px-4 sm:px-8">
        <div className="mf-anim text-center mb-8 sm:mb-8">
          <span className="inline-block bg-flame/15 text-flame font-mono font-bold text-xs tracking-wider uppercase px-4 py-1.5 rounded-full mb-4 border border-flame/20">
            {menuFisso.badgePrezzo}
          </span>
          <h2 className="font-playfair font-black text-cream text-[clamp(1.6rem,4vw,2.8rem)] leading-[0.95] mb-2">
            {menuFisso.headline}{' '}
            <span className="italic text-flame">{menuFisso.headlineEm}</span>
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
            <Calendar className="w-3.5 h-3.5 text-flame/70" />
            <span className="font-sans text-xs">{menuFisso.infoQuando}</span>
          </div>
          <div className="flex items-center gap-1.5 text-smoke">
            <MapPin className="w-3.5 h-3.5 text-flame/70" />
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
            <Coffee className="w-3.5 h-3.5 text-flame/70" />
            <span className="font-sans text-xs">{menuFisso.infoIncluso}</span>
          </div>
        </div>

        {/* CTA */}
        <div className="mf-anim flex flex-col items-center mt-6">
          <HashLink
            smooth
            to="/#prenota"
            className="magnetic-btn inline-flex items-center gap-2 bg-flame hover:bg-ember text-cream font-sans font-bold text-sm py-3 px-8 rounded-full transition-colors duration-300 shadow-lg shadow-flame/20"
          >
            {menuFisso.ctaPrenota}
            <ArrowRight className="w-4 h-4" />
          </HashLink>
          <p className="font-sans text-smoke/50 text-xs mt-3 text-center max-w-xs">
            {menuFisso.ctaWalkin}
          </p>
        </div>
      </div>
    </section>
  );
};

export default MenuFisso;
