'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { siteContent } from '@/data/copy';
import { romeWeekday } from '@/lib/promo';
import { cn } from '@/lib/utils';

const { eventi, menu } = siteContent;
const settimana = eventi.settimana;

// Settimana da lunedì a domenica, con l'appuntamento di ogni sera.
const WEEK = [
    { weekday: 1, short: 'Lun', label: 'Chiuso' },
    ...settimana.items.map((p) => ({ weekday: p.weekday, short: p.dayShort, label: p.title, href: `#${p.slug}`, accent: p.accent })),
    { weekday: 6, short: 'Sab', label: '' },
    { weekday: 0, short: 'Dom', label: '' },
];

const Wordmark = ({ parts, accent, className }) => (
    <span className={cn('block font-playfair leading-[0.8] tracking-[-0.02em]', className)}>
        <span
            className="block"
            style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,248,240,0.92)' }}
        >
            {parts[0]}
        </span>
        <span className="block" style={{ color: accent }}>
            {parts[1]}
        </span>
    </span>
);

const PromoCard = ({ promo, index, isToday }) => (
    <div
        id={promo.slug}
        className="promo-wrap sticky scroll-mt-28"
        // Sotto la navbar flottante (~6.5rem), con un gradino per ogni card impilata
        style={{ top: `calc(7.25rem + ${index * 1.1}rem)` }}
    >
        <article
            aria-labelledby={`${promo.slug}-title`}
            className="promo-card relative h-[calc(100svh-9.5rem)] min-h-[560px] max-h-[920px] rounded-[2rem] sm:rounded-[3rem] overflow-hidden bg-charcoal shadow-[0_-30px_80px_-40px_rgba(0,0,0,0.9)] will-change-transform"
        >
            <Image
                src={promo.image}
                alt={promo.imageAlt}
                fill
                sizes="(max-width: 1600px) 100vw, 1600px"
                quality={80}
                className="promo-img object-cover"
                style={{ objectPosition: promo.imagePosition }}
            />

            {/* Velo nel tono della foto: legge il testo senza spegnere l'immagine */}
            <div
                aria-hidden
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(180deg, rgba(${promo.tint},0.55) 0%, rgba(${promo.tint},0.08) 32%, rgba(12,9,7,0.45) 50%, rgba(12,9,7,0.94) 100%)`,
                }}
            />
            <div
                aria-hidden
                className="absolute inset-0 hidden lg:block"
                style={{ background: 'linear-gradient(90deg, rgba(12,9,7,0.55) 0%, transparent 45%, transparent 60%, rgba(12,9,7,0.6) 100%)' }}
            />
            {/* Oscurato mentre la card successiva le scorre sopra */}
            <div aria-hidden className="promo-dim absolute inset-0 bg-black opacity-0 pointer-events-none" />

            <div className="relative h-full flex flex-col justify-between p-6 sm:p-10 lg:p-14">
                <div className="flex items-start justify-between gap-4">
                    <p className="font-sans text-cream text-lg sm:text-xl font-medium">
                        Ogni {promo.day.toLowerCase()}
                    </p>
                    {isToday && (
                        <span className="inline-flex items-center gap-2 rounded-full bg-cream text-charcoal font-sans font-bold text-sm py-2 pl-3 pr-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping motion-reduce:animate-none" style={{ background: promo.accent }} />
                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full" style={{ background: promo.accent }} />
                            </span>
                            {settimana.todayLabel}
                        </span>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(320px,400px)] items-end gap-7 lg:gap-14">
                    <h3 id={`${promo.slug}-title`} aria-label={promo.title}>
                        <Wordmark
                            parts={promo.titleParts}
                            accent={promo.accent}
                            className="text-[clamp(4.4rem,22vw,12.5rem)]"
                        />
                    </h3>

                    <div className="flex flex-col gap-5 lg:pb-3">
                        <div className="flex items-baseline gap-3 border-b border-cream/20 pb-5">
                            <span className="font-playfair text-5xl sm:text-6xl leading-none" style={{ color: promo.accent }}>
                                {promo.price}
                            </span>
                            <span className="font-sans text-cream/75 text-base">{promo.priceLabel}</span>
                        </div>
                        <p className="font-sans text-cream text-base sm:text-lg leading-relaxed max-w-[42ch]">
                            {promo.desc}
                        </p>
                        {promo.note && (
                            <p className="font-sans text-cream/65 text-sm -mt-2">{promo.note}</p>
                        )}
                        {promo.formula && (
                            <div className="-mt-1">
                                <p className="font-caveat text-2xl sm:text-3xl leading-none" style={{ color: promo.accent }}>
                                    {promo.formula.title}
                                </p>
                                <ul className="grid grid-cols-2 gap-x-5 gap-y-1.5 mt-3">
                                    {promo.formula.items.map((item) => (
                                        <li key={item} className="flex items-baseline gap-2 font-sans text-cream/90 text-sm sm:text-[0.95rem] leading-snug">
                                            <span aria-hidden className="shrink-0 h-1 w-1 rounded-full translate-y-[-0.2em]" style={{ background: promo.accent }} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                                <p className="font-sans text-cream/60 text-sm mt-3">{promo.formula.note}</p>
                            </div>
                        )}
                        <Link
                            href="/#prenota"
                            className="magnetic-btn self-start inline-flex items-center justify-center rounded-full text-charcoal font-sans font-bold text-base py-3.5 px-7 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                            style={{ background: promo.accent }}
                        >
                            {settimana.ctaPrenota}
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    </div>
);

const SettimanaPromo = () => {
    const rootRef = useRef(null);
    // Calcolato dopo il mount: il giorno dipende da quando si visita la pagina, non dalla build.
    const [today, setToday] = useState(null);

    useEffect(() => {
        setToday(romeWeekday());
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
                    const wraps = gsap.utils.toArray('.promo-wrap');

                    wraps.forEach((wrap, i) => {
                        // La foto si assesta mentre la card entra
                        gsap.fromTo(
                            wrap.querySelector('.promo-img'),
                            { scale: 1.14 },
                            {
                                scale: 1,
                                ease: 'none',
                                scrollTrigger: { trigger: wrap, start: 'top bottom', end: 'top top', scrub: true },
                            }
                        );

                        const next = wraps[i + 1];
                        if (!next) return;
                        // La card sotto arretra quando la successiva la copre
                        gsap.to(wrap.querySelector('.promo-card'), {
                            scale: 0.93,
                            ease: 'none',
                            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=120', scrub: true },
                        });
                        gsap.to(wrap.querySelector('.promo-dim'), {
                            opacity: 0.55,
                            ease: 'none',
                            scrollTrigger: { trigger: next, start: 'top bottom', end: 'top top+=120', scrub: true },
                        });
                    });
                }, rootRef);
                ScrollTrigger.refresh();
            }
        );

        return () => {
            cancelled = true;
            if (ctx) ctx.revert();
        };
    }, []);

    return (
        <section
            id="settimana"
            ref={rootRef}
            className="relative w-full px-3 sm:px-6 lg:px-10 pt-16 sm:pt-24 pb-10 scroll-mt-20"
        >
            <div className="max-w-[1600px] mx-auto">
                {/* Intestazione + calendario della settimana */}
                <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,640px)] gap-10 lg:gap-16 items-end px-2 sm:px-4 lg:px-6 mb-10 sm:mb-14">
                    <div>
                        <p className="font-caveat text-gold text-3xl sm:text-4xl mb-3">{settimana.kicker}</p>
                        <h2 className="font-playfair text-cream text-[clamp(2.6rem,6.5vw,5.5rem)] leading-[0.95] max-w-[14ch]">
                            {settimana.headline}
                        </h2>
                        <p className="font-sans text-cream/75 text-base sm:text-lg leading-relaxed max-w-[52ch] mt-5">
                            {settimana.body}
                        </p>
                    </div>

                    <nav aria-label="Appuntamenti della settimana">
                        <ol className="grid grid-cols-7 gap-1.5 sm:gap-2">
                            {WEEK.map((d) => {
                                const isToday = today === d.weekday;
                                const inner = (
                                    <>
                                        <span className={cn('font-sans text-xs sm:text-sm', isToday ? 'text-charcoal font-bold' : 'text-cream/60')}>
                                            {d.short}
                                        </span>
                                        <span
                                            aria-hidden
                                            className="block h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full mx-auto my-2 sm:my-3"
                                            style={{ background: d.href ? d.accent : 'rgba(255,248,240,0.15)' }}
                                        />
                                        <span
                                            className={cn(
                                                'hidden sm:block font-sans text-[0.7rem] leading-tight min-h-[2em]',
                                                isToday ? 'text-charcoal' : 'text-cream/80'
                                            )}
                                        >
                                            {d.label}
                                        </span>
                                    </>
                                );
                                const base = cn(
                                    'flex flex-col items-center text-center rounded-2xl py-3 sm:py-4 px-1 transition-colors duration-300',
                                    isToday ? 'bg-cream' : 'bg-white/[0.04]',
                                    d.href && !isToday && 'hover:bg-white/[0.09]'
                                );
                                return (
                                    <li key={d.short}>
                                        {d.href ? (
                                            <a
                                                href={d.href}
                                                className={cn(base, 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold')}
                                                aria-label={`${d.short}: ${d.label}`}
                                                aria-current={isToday ? 'date' : undefined}
                                            >
                                                {inner}
                                            </a>
                                        ) : (
                                            <div className={base} aria-current={isToday ? 'date' : undefined}>{inner}</div>
                                        )}
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
                </div>

                {/* Card impilate: ogni sera scorre sopra la precedente */}
                <div className="relative flex flex-col gap-[10vh] pb-[6vh]">
                    {settimana.items.map((promo, i) => (
                        <PromoCard key={promo.slug} promo={promo} index={i} isToday={today === promo.weekday} />
                    ))}
                </div>

                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2 sm:px-4 lg:px-6 pt-6 border-t border-white/[0.08]">
                    <p className="font-sans text-cream/55 text-sm leading-relaxed max-w-[60ch]">
                        {settimana.disclaimer} {menu.copertoNote}.
                    </p>
                    <p className="font-sans text-cream/80 text-sm sm:text-base leading-relaxed max-w-[60ch]">
                        {settimana.clubLead}{' '}
                        <Link href={settimana.clubHref} className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors">
                            {settimana.clubCta}
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default SettimanaPromo;
