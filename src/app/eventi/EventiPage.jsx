'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    Music,
    CalendarHeart,
    Clock,
    MapPin,
    Wallet,
    Phone,
    ArrowRight,
    UtensilsCrossed,
    Check,
    ChevronDown,
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
            <section className="relative w-full min-h-[70vh] flex items-center pt-28 sm:pt-32 pb-16 px-6 sm:px-12 md:px-20 lg:px-32">
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 70% 30%, rgba(232,93,38,0.16) 0%, transparent 60%)' }}
                />
                <div className="absolute inset-0 pointer-events-none opacity-[0.04] z-[1]" style={grain} />

                <div className="relative z-10 flex flex-col items-start text-left w-full max-w-3xl">
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

            {/* ─── CENA CANTATA — feature ───────────── */}
            <section className="ev-feature relative w-full py-16 sm:py-24 px-6 sm:px-12 md:px-16 lg:px-24">
                <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* Poster */}
                    <div className="ev-poster relative mx-auto w-full max-w-[440px] lg:max-w-none">
                        <div className="relative rounded-[2rem] overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/10">
                            <Image
                                src={ev.poster}
                                alt={ev.posterAlt}
                                width={1080}
                                height={1528}
                                sizes="(max-width: 1024px) 90vw, 440px"
                                className="w-full h-auto object-cover"
                                priority
                            />
                        </div>
                        {/* Glow behind poster */}
                        <div
                            className="absolute -inset-6 -z-10 rounded-[3rem] blur-2xl opacity-50"
                            style={{ background: 'radial-gradient(ellipse, rgba(232,93,38,0.35) 0%, transparent 70%)' }}
                        />
                    </div>

                    {/* Info */}
                    <div className="flex flex-col">
                        <div className="ev-detail flex items-center gap-3 mb-4">
                            <span className="font-mono text-[0.7rem] font-semibold uppercase tracking-wider px-3 py-1 rounded-full bg-flame text-cream">
                                {ev.badge}
                            </span>
                            <span className="flex items-center gap-1.5 font-sans text-gold/90 text-sm">
                                <Music size={15} /> {ev.by}
                            </span>
                        </div>

                        <h2 className="ev-detail font-playfair text-cream text-[clamp(2.2rem,5vw,3.8rem)] leading-[0.95]">
                            {ev.title}
                        </h2>
                        <p className="ev-detail font-caveat text-gold text-2xl sm:text-3xl mt-2">
                            {ev.subtitle}
                        </p>

                        {/* Detail grid */}
                        <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8">
                            {ev.details.map((d, i) => {
                                const Icon = detailIcons[i];
                                return (
                                    <div
                                        key={d.label}
                                        className="ev-detail flex items-start gap-3 bg-white/[0.04] border border-white/10 rounded-2xl px-4 py-4"
                                    >
                                        <Icon className="w-5 h-5 text-flame shrink-0 mt-0.5 stroke-[1.5]" />
                                        <div className="flex flex-col">
                                            <span className="font-mono text-[0.65rem] uppercase tracking-wider text-smoke">{d.label}</span>
                                            <span className="font-sans text-cream font-medium text-sm sm:text-base leading-snug">{d.value}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* CTAs */}
                        <div className="ev-detail flex flex-col sm:flex-row gap-3 mt-8">
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
            </section>

            {/* ─── MENU — All You Can Napoli ────────── */}
            <section className="ev-menu relative w-full pb-24 sm:pb-32 px-6 sm:px-12 md:px-16 lg:px-24">
                <div className="relative max-w-[820px] mx-auto bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-[2.5rem] px-7 py-10 sm:px-14 sm:py-14 text-center">
                    <div className="absolute inset-0 pointer-events-none opacity-[0.04] rounded-[2.5rem] overflow-hidden" style={grain} />

                    <div className="relative">
                        <span className="ev-menu-elem inline-flex items-center gap-2 font-mono text-flame text-xs tracking-[0.2em] uppercase">
                            <UtensilsCrossed size={15} /> Menù della serata
                        </span>
                        <h3
                            className="ev-menu-elem font-playfair text-[clamp(2rem,5vw,3.2rem)] leading-tight mt-3 italic"
                            style={{
                                background: 'linear-gradient(135deg, #D4A853 0%, #E85D26 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                            }}
                        >
                            {ev.menuTitle}
                        </h3>
                        <p className="ev-menu-elem font-sans text-cream/70 text-base mt-3">{ev.menuIntro}</p>

                        <ul className="ev-menu-elem flex flex-col items-stretch gap-2.5 mt-8 max-w-md mx-auto text-left">
                            {ev.menu.map((item) => (
                                <li
                                    key={item}
                                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3"
                                >
                                    <Check className="w-4 h-4 text-gold shrink-0" />
                                    <span className="font-sans text-cream text-sm sm:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="ev-menu-elem flex flex-col items-center gap-2 mt-9">
                            <div className="flex items-baseline gap-2">
                                <span className="font-playfair text-flame text-4xl sm:text-5xl">25€</span>
                                <span className="font-sans text-smoke text-sm">a persona</span>
                            </div>
                            <p className="font-sans text-cream/60 text-sm max-w-sm">{ev.menuNote}</p>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default EventiPage;
