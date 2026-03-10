'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';
import { siteContent } from '@/data/copy';

const GiftCardsHero = () => {
    const { giftCards } = siteContent;
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.gc-hero-elem', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2,
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[75vh] min-h-[500px] overflow-hidden flex items-center pt-20 sm:pt-24 px-6 sm:px-12 md:px-20 lg:px-32"
        >
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/gift-card-hero.webp')` }}
            />

            {/* Mobile-only dark overlay */}
            <div className="absolute inset-0 bg-black/50 z-[1] md:hidden" />

            {/* Film grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.045] z-[2]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px 256px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 flex flex-col items-start text-left gap-2 max-w-3xl">
                <div className="gc-hero-elem font-caveat text-gold text-2xl sm:text-3xl mb-2">
                    {giftCards.hero.eyebrow}
                </div>
                <h1 className="gc-hero-elem font-playfair font-black text-cream leading-[0.95]">
                    <span className="block text-[clamp(2.2rem,7vw,5.5rem)]">{giftCards.hero.headline}</span>
                    <span className="block text-[clamp(2.5rem,8vw,6.5rem)]">{giftCards.hero.headlineEm}</span>
                </h1>
                <p className="gc-hero-elem font-sans text-cream/70 text-[clamp(1rem,1.5vw,1.25rem)] max-w-[550px] mt-2 leading-relaxed">
                    {giftCards.hero.body}
                </p>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 text-cream/50 flex flex-col items-center gap-2">
                <ChevronDown size={24} className="animate-bounce-slow" />
            </div>
        </section>
    );
};

export default GiftCardsHero;
