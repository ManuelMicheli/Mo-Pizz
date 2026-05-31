'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Music,
    Music2,
    CalendarHeart,
    Clock,
    MapPin,
    Wallet,
    Phone,
    ArrowRight,
    UtensilsCrossed,
    Check,
    ChevronDown,
    Ticket,
} from 'lucide-react';
import { siteContent } from '@/data/copy';

const detailIcons = [CalendarHeart, Clock, MapPin, Wallet];

const grain = {
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
    backgroundSize: '256px 256px',
};

const EventiPage = () => {
    const { eventi } = siteContent;
    const ev = eventi.cenaCantata;
    const rootRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ctx;
        let cancelled = false;

        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
            ([{ default: gsap }, { ScrollTrigger }]) => {
                if (cancelled) return;
                gsap.registerPlugin(ScrollTrigger);
                ctx = gsap.context(() => {
                    gsap.from('.ev-hero-elem', {
                        y: 50, opacity: 0, duration: 1.2, stagger: 0.12,
                        ease: 'power3.out', delay: 0.2,
                    });
                    gsap.from('.ev-poster', {
                        opacity: 0, y: 40, duration: 1.1, ease: 'power3.out',
                        scrollTrigger: { trigger: '.ev-feature', start: 'top 80%', once: true },
                    });
                    gsap.from('.ev-detail', {
                        y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out',
                        scrollTrigger: { trigger: '.ev-feature', start: 'top 75%', once: true },
                    });
                    gsap.from('.ev-menu-elem', {
                        y: 24, opacity: 0, duration: 0.7, stagger: 0.07, ease: 'power3.out',
                        scrollTrigger: { trigger: '.ev-menu', start: 'top 85%', once: true },
                    });
                }, rootRef);
            }
        );

        return () => {
            cancelled = true;
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <main ref={rootRef} className="relative bg-charcoal text-cream overflow-hidden">
            {/* ─── HERO ─────────────────────────────── */}
            <section className="relative w-full min-h-[70vh] flex items-center pt-28 sm:pt-32 pb-16 px-5 sm:px-10 md:px-20 lg:px-32 xl:px-40">
                {/* Background image — cover image della card "Eventi Speciali" */}
                <Image
                    src="/images/services/eventi-speciali.webp"
                    alt=""
                    fill
                    priority
                    sizes="100vw"
                    className="object-cover object-center z-0"
                />
                {/* Overlay scuro per leggibilità + sfumatura verso charcoal in basso */}
                <div className="absolute inset-0 z-[1] bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/40" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal via-transparent to-charcoal/30" />
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 z-[2] pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(232,93,38,0.16) 0%, transparent 60%)' }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[3]" style={grain} />

                <div className="relative z-10 flex flex-col items-start text-left w-full max-w-4xl">
                    <span className="ev-hero-elem font-mono text-flame text-sm tracking-[0.25em] uppercase mb-5">
                        {eventi.hero.eyebrow}
                    </span>
                    <h1 className="ev-hero-elem font-playfair text-cream leading-[0.92] tracking-tight">
                        <span className="block text-[clamp(2.4rem,7vw,5.5rem)]">{eventi.hero.headline}</span>
                        <span className="block italic text-[clamp(2.6rem,8vw,6.5rem)]">{eventi.hero.headlineEm}</span>
                    </h1>
                    <p className="ev-hero-elem font-sans text-cream/80 text-[clamp(1rem,1.5vw,1.25rem)] max-w-[520px] mt-6 leading-relaxed">
                        {eventi.hero.body}
                    </p>
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                    <span className="font-mono text-cream/30 text-[10px] tracking-[0.25em] uppercase">Scopri</span>
                    <ChevronDown size={20} className="text-cream/30 animate-bounce-slow" />
                </div>
            </section>

            {/* ─── CENA CANTATA — feature (palcoscenico) ─── */}
            <section className="ev-feature relative w-full overflow-hidden">
                {/* Atmosfera: foto gente che balla (luci/fumo) + faro dall'alto + bagliore caldo a terra + vignette */}
                <div className="absolute inset-0 z-0 bg-charcoal" />
                <Image
                    src="/images/eventi/bg-cena-cantata.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center z-0 opacity-[0.38]"
                />
                <div className="absolute inset-0 z-0 bg-charcoal/55" />
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(120% 75% at 50% -8%, rgba(212,168,83,0.20) 0%, rgba(232,93,38,0.10) 26%, transparent 56%)' }}
                />
                <div
                    className="absolute inset-x-0 bottom-0 h-2/3 z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(85% 100% at 50% 125%, rgba(107,66,38,0.40) 0%, transparent 62%)' }}
                />
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.45) 0%, transparent 18%, transparent 82%, rgba(0,0,0,0.45) 100%)' }}
                />
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" style={grain} />

                {/* Note musicali decorative (richiamo locandina) */}
                <Music2 className="absolute top-[12%] left-[7%] w-8 h-8 text-gold/15 -rotate-12 hidden lg:block" />
                <Music className="absolute bottom-[16%] right-[8%] w-10 h-10 text-flame/15 rotate-12 hidden lg:block" />

                <div className="relative z-10 w-full max-w-[1600px] mx-auto px-5 sm:px-10 md:px-16 lg:px-24 xl:px-32 py-20 sm:py-28">
                    {/* Eyebrow ornamentale */}
                    <div className="ev-detail flex items-center justify-center gap-4 mb-14 sm:mb-20">
                        <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-gold/50" />
                        <span className="font-mono text-gold text-[0.7rem] sm:text-xs tracking-[0.3em] uppercase flex items-center gap-2">
                            <Music size={14} /> L&apos;appuntamento del venerdì
                        </span>
                        <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-gold/50" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,620px)_1fr] gap-14 lg:gap-20 items-center">

                        {/* Poster — locandina incorniciata appesa */}
                        <div className="ev-poster relative mx-auto w-full max-w-[620px]">
                            <div className="group relative rounded-[1.5rem] overflow-hidden ring-1 ring-gold/30 shadow-[0_45px_100px_-30px_rgba(0,0,0,0.9)] rotate-[-1.8deg] transition-transform duration-700 ease-out hover:rotate-0 hover:scale-[1.015]">
                                <Image
                                    src={ev.poster}
                                    alt={ev.posterAlt}
                                    width={1080}
                                    height={1528}
                                    sizes="(max-width: 1024px) 92vw, 620px"
                                    className="w-full h-auto object-cover"
                                    priority
                                />
                                <div className="absolute inset-0 rounded-[1.5rem] ring-1 ring-inset ring-white/10 pointer-events-none" />
                                {/* Riflesso che attraversa al hover */}
                                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                                    style={{ background: 'linear-gradient(115deg, transparent 35%, rgba(255,248,240,0.10) 50%, transparent 65%)' }}
                                />
                            </div>
                            <div
                                className="absolute -inset-8 -z-10 blur-3xl opacity-45"
                                style={{ background: 'radial-gradient(ellipse, rgba(232,93,38,0.5) 0%, transparent 70%)' }}
                            />
                        </div>

                        {/* Info */}
                        <div className="flex flex-col">
                            <div className="ev-detail flex flex-wrap items-center gap-3 mb-5">
                                <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider px-3 py-1.5 rounded-full bg-flame text-cream shadow-[0_8px_24px_-8px_rgba(232,93,38,0.8)]">
                                    {ev.badge}
                                </span>
                                <span className="flex items-center gap-1.5 font-sans text-gold/90 text-sm">
                                    <Music size={15} /> {ev.by}
                                </span>
                            </div>

                            <h2 className="ev-detail font-playfair text-cream text-[clamp(2.6rem,6vw,4.5rem)] leading-[0.92]">
                                {ev.title}
                            </h2>
                            <p className="ev-detail font-caveat text-gold text-3xl sm:text-4xl mt-1">
                                {ev.subtitle}
                            </p>

                            {/* Griglia dettagli — chip premium con icona in cerchio dorato */}
                            <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-9">
                                {ev.details.map((d, i) => {
                                    const Icon = detailIcons[i];
                                    return (
                                        <div
                                            key={d.label}
                                            className="ev-detail group flex items-center gap-3.5 bg-gradient-to-br from-white/[0.07] to-white/[0.02] border border-white/10 rounded-2xl px-4 py-4 transition-colors duration-300 hover:border-gold/30"
                                        >
                                            <span className="shrink-0 grid place-items-center w-10 h-10 rounded-full bg-flame/10 ring-1 ring-gold/25">
                                                <Icon className="w-[18px] h-[18px] text-gold stroke-[1.5]" />
                                            </span>
                                            <div className="flex flex-col min-w-0">
                                                <span className="font-mono text-[0.6rem] uppercase tracking-[0.15em] text-smoke">{d.label}</span>
                                                <span className="font-sans text-cream font-medium text-sm sm:text-[0.95rem] leading-snug truncate">{d.value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            {/* CTAs */}
                            <div className="ev-detail flex flex-col sm:flex-row gap-3 mt-9">
                                <Link
                                    href="/#prenota"
                                    className="magnetic-btn w-full sm:w-auto bg-gradient-to-r from-flame to-ember text-cream font-sans font-bold py-4 px-9 rounded-full text-base flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_40px_rgba(232,93,38,0.3)]"
                                >
                                    {ev.ctaPrimary}
                                    <ArrowRight size={18} />
                                </Link>
                                <a
                                    href={`tel:+39${ev.phone.replace(/\s/g, '')}`}
                                    className="magnetic-btn w-full sm:w-auto border border-white/15 text-cream hover:bg-white/[0.06] font-sans font-medium py-4 px-9 rounded-full text-base flex items-center justify-center gap-2.5 transition-all duration-300"
                                >
                                    <Phone size={18} />
                                    {ev.ctaSecondary}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── MENU — All You Can Napoli (biglietto serata) ─── */}
            <section className="ev-menu relative w-full overflow-hidden py-20 sm:py-28 px-5 sm:px-10">
                {/* Banda ambiente — foto festa al ristorante sotto un velo caldo, stacco netto dal palcoscenico */}
                <div className="absolute inset-0 z-0 bg-charcoal" />
                <Image
                    src="/images/eventi/bg-ristorante-festa.webp"
                    alt=""
                    fill
                    sizes="100vw"
                    className="object-cover object-center z-0 opacity-[0.45]"
                />
                <div
                    className="absolute inset-0 z-0"
                    style={{ background: 'linear-gradient(180deg, rgba(26,26,26,0.88) 0%, rgba(43,26,18,0.72) 45%, rgba(36,20,16,0.78) 70%, rgba(26,26,26,0.90) 100%)' }}
                />
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(60% 50% at 50% 42%, rgba(232,93,38,0.16) 0%, transparent 65%)' }}
                />
                <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.05]" style={grain} />

                {/* Biglietto crema — forte contrasto, leggibile, premium */}
                <div className="ev-menu-elem relative z-10 max-w-[560px] mx-auto">
                    <div className="relative bg-flour text-charcoal rounded-[2rem] shadow-[0_50px_110px_-30px_rgba(0,0,0,0.85)] overflow-hidden">
                        {/* Bordo dorato interno */}
                        <div className="absolute inset-[10px] rounded-[1.4rem] border border-wood/20 pointer-events-none" />
                        {/* Texture carta */}
                        <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={grain} />

                        <div className="relative px-7 pt-9 pb-9 sm:px-12 sm:pt-12 sm:pb-12 text-center">
                            {/* Intestazione */}
                            <span className="inline-flex items-center gap-2 font-mono text-flameDark text-[0.7rem] tracking-[0.25em] uppercase">
                                <Ticket size={15} /> Menù della serata
                            </span>
                            <h3
                                className="font-playfair text-[clamp(2.1rem,6vw,3.4rem)] leading-[0.95] mt-3 italic"
                                style={{
                                    background: 'linear-gradient(135deg, #C94A1A 0%, #D4A853 55%, #6B4226 100%)',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    backgroundClip: 'text',
                                }}
                            >
                                {ev.menuTitle}
                            </h3>
                            <p className="font-sans text-wood/70 text-sm sm:text-base mt-3">{ev.menuIntro}</p>

                            {/* Linea perforata (strappo biglietto) */}
                            <div className="relative my-7 flex items-center justify-center">
                                <span className="absolute -left-7 sm:-left-12 w-7 h-7 rounded-full bg-[#241410]" />
                                <span className="w-full border-t-2 border-dashed border-wood/25" />
                                <span className="absolute -right-7 sm:-right-12 w-7 h-7 rounded-full bg-[#241410]" />
                            </div>

                            {/* Portate */}
                            <ul className="flex flex-col gap-0 text-left max-w-sm mx-auto">
                                {ev.menu.map((item, i) => (
                                    <li
                                        key={item}
                                        className={`flex items-center gap-3 py-3 ${i !== 0 ? 'border-t border-dashed border-wood/15' : ''}`}
                                    >
                                        <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-flame/10">
                                            <Check className="w-3.5 h-3.5 text-flameDark" />
                                        </span>
                                        <span className="font-sans text-charcoal text-sm sm:text-base">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Linea perforata */}
                            <div className="relative my-7 flex items-center justify-center">
                                <span className="absolute -left-7 sm:-left-12 w-7 h-7 rounded-full bg-[#241410]" />
                                <span className="w-full border-t-2 border-dashed border-wood/25" />
                                <span className="absolute -right-7 sm:-right-12 w-7 h-7 rounded-full bg-[#241410]" />
                            </div>

                            {/* Prezzo — timbro */}
                            <div className="flex flex-col items-center gap-3">
                                <div className="flex items-baseline gap-2">
                                    <span className="font-playfair text-flameDark text-5xl sm:text-6xl leading-none">25€</span>
                                    <span className="font-mono text-wood/70 text-xs uppercase tracking-widest">a persona</span>
                                </div>
                                <p className="font-sans text-wood/70 text-xs sm:text-sm max-w-xs leading-relaxed">{ev.menuNote}</p>
                            </div>
                        </div>
                    </div>

                    {/* CTA sotto al biglietto */}
                    <div className="ev-menu-elem flex flex-col sm:flex-row items-center justify-center gap-3 mt-9">
                        <Link
                            href="/#prenota"
                            className="magnetic-btn w-full sm:w-auto bg-gradient-to-r from-gold to-[#c4943d] text-charcoal font-sans font-bold py-4 px-9 rounded-full text-base flex items-center justify-center gap-2.5 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.3)]"
                        >
                            {ev.ctaPrimary}
                            <ArrowRight size={18} />
                        </Link>
                        <a
                            href={`tel:+39${ev.phone.replace(/\s/g, '')}`}
                            className="magnetic-btn w-full sm:w-auto border border-cream/20 text-cream hover:bg-white/[0.06] font-sans font-medium py-4 px-9 rounded-full text-base flex items-center justify-center gap-2.5 transition-all duration-300"
                        >
                            <Phone size={18} />
                            {ev.phone}
                        </a>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventiPage;
