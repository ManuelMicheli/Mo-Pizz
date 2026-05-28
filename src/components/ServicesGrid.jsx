'use client';

import React, { useLayoutEffect, useRef, memo } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, ShoppingBag, CalendarHeart, Star, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/copy';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const { services } = siteContent;

// Row 1: large (2/3) + small (1/3)   |   Row 2: small (1/3) + large (2/3)
const cards = [
    {
        title: services.cards[0].title,
        subtitle: services.cards[0].subtitle,
        description: services.cards[0].description,
        icon: Gift,
        to: '/gift-cards',
        badge: 'Novità',
        badgeColor: 'bg-gold text-charcoal',
        image: '/images/services/gift-dining.webp',
    },
    {
        title: services.cards[1].title,
        subtitle: services.cards[1].subtitle,
        description: services.cards[1].description,
        icon: ShoppingBag,
        to: '/ordina',
        badge: 'Ordina Online',
        badgeColor: 'bg-flame text-cream',
        image: '/images/services/ordina-pizza-box.webp',
    },
    {
        title: services.cards[2].title,
        subtitle: services.cards[2].subtitle,
        description: services.cards[2].description,
        icon: CalendarHeart,
        to: null,
        badge: 'Coming Soon',
        badgeColor: 'bg-smoke/30 text-cream/70',
        image: '/images/services/eventi-speciali.webp',
    },
    {
        title: services.cards[3].title,
        subtitle: services.cards[3].subtitle,
        description: services.cards[3].description,
        icon: Star,
        to: '/fidelity',
        badge: 'Novità',
        badgeColor: 'bg-gold text-charcoal',
        image: '/images/services/fidelity-wine-toast.webp',
    },
];

const CardItem = memo(({ card }) => {
    const Icon = card.icon;
    const isPlaceholder = !card.to;
    const hasBg = card.image || card.images;

    const inner = (
        <div
            className={`service-card group relative overflow-hidden rounded-[2rem] h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] p-5 sm:p-8 flex flex-col justify-between ${
                isPlaceholder
                    ? 'bg-charcoal cursor-default'
                    : 'bg-charcoal hover:scale-[1.01] cursor-pointer'
            }`}
        >

            {/* Background image(s) */}
            {card.images ? (
                <>
                    <div className="absolute inset-0 z-0 flex">
                        {card.images.map((src, idx) => (
                            <img key={idx} src={src} alt="" loading="lazy" decoding="async" className="h-full flex-1 min-w-0 object-cover" />
                        ))}
                    </div>
                    {card.hoverImages && (
                        <div className="absolute inset-0 z-0 flex opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            {card.hoverImages.map((src, idx) => (
                                <img key={idx} src={src} alt="" loading="lazy" decoding="async" className="h-full flex-1 min-w-0 object-cover" />
                            ))}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal/65 z-[1]" />
                </>
            ) : card.image ? (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                        style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    {card.hoverImage && (
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{ backgroundImage: `url('${card.hoverImage}')` }}
                        />
                    )}
                    <div className="absolute inset-0 z-[1] bg-gradient-to-t from-charcoal via-charcoal/55 to-charcoal/25" />
                </>
            ) : null}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top: Icon */}
                <div>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5] ${isPlaceholder && !hasBg ? 'text-cream/20' : hasBg ? 'text-cream/70 group-hover:text-cream transition-colors duration-300' : 'text-cream/40 group-hover:text-gold transition-colors duration-300'}`} />
                </div>

                {/* Bottom: Text */}
                <div className="flex flex-col gap-2 mt-auto">
                    <h3 className={`font-playfair text-xl sm:text-2xl leading-tight ${isPlaceholder && !hasBg ? 'text-cream/30' : 'text-cream'}`}>
                        {card.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed max-w-xs ${isPlaceholder && !hasBg ? 'text-smoke/30' : hasBg ? 'text-cream/80' : 'text-smoke'}`}>
                        {card.description}
                    </p>
                    {!isPlaceholder && (
                        <div className="flex items-center gap-2 mt-2 font-sans font-semibold text-sm text-flame group-hover:text-gold transition-colors duration-300">
                            Scopri di più
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return card.to ? (
        <Link href={card.to} className="block h-full">
            {inner}
        </Link>
    ) : (
        inner
    );
});

const ServicesGrid = ({ hideHeader = false }) => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        if (hideHeader) return; // Drawer controls its own card entrance via CSS
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const ctx = gsap.context(() => {
            gsap.from('.services-header', {
                y: 20, opacity: 0, duration: 0.8, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
            });

            // Directional reveal — opacity + y + xPercent only (no scale → no repaint of bg images)
            gsap.from('.svc-row1-left', {
                xPercent: -6, y: 24, opacity: 0,
                duration: 1, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: '.services-grid', start: 'top 85%', once: true },
            });
            gsap.from('.svc-row1-right', {
                xPercent: 6, y: 24, opacity: 0,
                duration: 1, delay: 0.12, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: '.services-grid', start: 'top 85%', once: true },
            });
            gsap.from('.svc-row2-left', {
                xPercent: -6, y: 24, opacity: 0,
                duration: 1, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: '.svc-row2-left', start: 'top 90%', once: true },
            });
            gsap.from('.svc-row2-right', {
                xPercent: 6, y: 24, opacity: 0,
                duration: 1, delay: 0.12, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: '.svc-row2-right', start: 'top 90%', once: true },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [hideHeader]);

    return (
        <section
            ref={sectionRef}
            className={`relative z-10 ${hideHeader ? 'h-full flex flex-col' : ''}`}
            style={!hideHeader ? {
                backgroundImage: 'url(/images/services-grid-bg.webp)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            } : undefined}
        >
            {/* Header — stesso sfondo arancione del grid sotto */}
            {!hideHeader && (
                <div className="py-6 sm:py-10 lg:pt-14 lg:pb-6 px-4 sm:px-8 md:px-12">
                    <div className="services-header flex flex-col gap-4 items-center text-center">
                        <span className="font-mono text-cream/80 text-sm tracking-widest uppercase">
                            {services.eyebrow}
                        </span>
                        <h2 className="font-playfair text-cream text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.95] max-w-xl">
                            {services.headline}<br />
                            <span className="italic">{services.headlineEm}</span> {services.headlineSuffix}
                        </h2>
                        <p className="font-sans text-cream/80 text-base max-w-lg leading-relaxed">
                            {services.subtext}
                        </p>
                    </div>
                </div>
            )}

            {/* Bento Grid — sfondo ereditato dal section (parent drawer provides atmosphere in hideHeader mode) */}
            <div
                className={`services-grid relative flex flex-col gap-3 sm:gap-4 px-3 sm:px-4 overflow-hidden ${
                    hideHeader ? 'flex-1 pt-6 sm:pt-8 pb-6 sm:pb-8' : 'pb-28 lg:pb-40 pt-8 lg:pt-12'
                }`}
            >
                {/* Sfumatura in basso: → charcoal — solo home */}
                {!hideHeader && (
                    <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-48 bg-gradient-to-b from-transparent to-charcoal pointer-events-none z-[1]" />
                )}
                {/* Row 1: large (2/3) + small (1/3) */}
                <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[1fr]">
                    <div className="lg:col-span-2 svc-row1-left">
                        <CardItem card={cards[0]} />
                    </div>
                    <div className="lg:col-span-1 svc-row1-right">
                        <CardItem card={cards[1]} />
                    </div>
                </div>
                {/* Row 2: small (1/3) + large (2/3) */}
                <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[1fr]">
                    <div className="lg:col-span-1 svc-row2-left">
                        <CardItem card={cards[2]} />
                    </div>
                    <div className="lg:col-span-2 svc-row2-right">
                        <CardItem card={cards[3]} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
