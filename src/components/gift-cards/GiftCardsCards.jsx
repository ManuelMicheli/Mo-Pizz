import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

gsap.registerPlugin(ScrollTrigger);

const GiftCardsCards = () => {
    const { giftCards } = siteContent;
    const sectionRef = useRef(null);

    const cards = [
        {
            ...giftCards.cards.items[0],
            imageSrc: '/images/esperienza libera.webp',
            imageAlt: 'Gift Card Esperienza Libera — Mo Pizz',
            waMessage: 'Ciao! Vorrei acquistare una Gift Card "Esperienza Libera" di Mo Pizz. Potete darmi maggiori informazioni?',
            featured: false,
        },
        {
            ...giftCards.cards.items[1],
            imageSrc: '/images/esperienza napoletana per 2.webp',
            imageAlt: 'Gift Card Esperienza Napoletana per Due — Mo Pizz',
            waMessage: 'Ciao! Vorrei acquistare una Gift Card "Esperienza Napoletana per Due" (€90) di Mo Pizz. Potete darmi maggiori informazioni?',
            featured: true,
        },
        {
            ...giftCards.cards.items[2],
            imageSrc: '/images/pizza per due.webp',
            imageAlt: 'Gift Card Pizza per Due — Mo Pizz',
            waMessage: 'Ciao! Vorrei acquistare una Gift Card "Pizza per Due" (€40) di Mo Pizz. Potete darmi maggiori informazioni?',
            featured: false,
        },
    ];

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.gc-card',
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 75%',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative overflow-hidden">
            {/* Top half — cream */}
            <div className="absolute inset-0 bg-cream" />

            {/* Bottom half — flame, with diagonal cut */}
            <div
                className="absolute inset-0 bg-flame"
                style={{
                    clipPath: 'polygon(0 calc(25% + 6vw), 100% 25%, 100% 100%, 0 100%)',
                }}
            />

            {/* Film grain over the whole section */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03] z-[1]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px 256px',
                }}
            />

            {/* Content */}
            <div className="relative z-10 py-20 sm:py-28 px-4 sm:px-8 md:px-12">
                <div className="max-w-7xl mx-auto">
                    {/* Section header */}
                    <div className="gc-card flex flex-col items-center gap-4 text-center mb-14 sm:mb-20">
                        <span className="inline-flex items-center rounded-full border border-charcoal/15 px-3 py-1 font-mono text-xs uppercase tracking-wider text-charcoal/60">
                            {giftCards.cards.headerBadge}
                        </span>
                        <h2 className="max-w-2xl font-playfair font-black text-charcoal text-[clamp(1.8rem,4vw,3.5rem)] leading-tight">
                            {giftCards.cards.headerTitle}
                        </h2>
                        <p className="font-sans text-smoke text-base sm:text-lg">
                            {giftCards.cards.headerSubtitle}
                        </p>
                    </div>

                    {/* Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
                        {cards.map((card) => (
                            <div
                                key={card.id}
                                className={cn(
                                    'gc-card flex flex-col rounded-[2rem] sm:rounded-[3rem] bg-[#222] border overflow-hidden transition-all duration-500',
                                    card.featured
                                        ? 'border-flame/30 shadow-[0_0_40px_rgba(232,93,38,0.15)]'
                                        : 'border-smoke/10'
                                )}
                            >
                                {/* Image */}
                                <img
                                    src={card.imageSrc}
                                    alt={card.imageAlt}
                                    className="w-full h-52 sm:h-60 object-cover"
                                />

                                {/* Text */}
                                <div className="flex flex-col gap-4 p-6 sm:p-8 flex-1">
                                    <span className={cn(
                                        'inline-block self-start font-mono text-xs uppercase tracking-wider px-4 py-1.5 rounded-full border',
                                        card.featured
                                            ? 'bg-flame/10 border-flame/20 text-flame'
                                            : 'bg-smoke/5 border-smoke/15 text-smoke'
                                    )}>
                                        {card.badge}
                                    </span>
                                    <h3 className="font-playfair font-black text-cream text-2xl sm:text-3xl leading-tight">
                                        {card.title}
                                    </h3>
                                    <div className={cn(
                                        'font-sans font-bold text-3xl sm:text-4xl',
                                        card.featured ? 'text-flame' : 'text-cream'
                                    )}>
                                        {card.price}
                                    </div>
                                    <p className="font-sans text-smoke text-sm leading-relaxed">
                                        {card.description}
                                    </p>
                                    <div className="flex-1" />
                                    <a
                                        href={`https://wa.me/390331024363?text=${encodeURIComponent(card.waMessage)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="magnetic-btn mt-2 w-fit inline-flex items-center gap-2 bg-flame hover:bg-ember text-cream font-sans font-semibold py-3.5 px-8 rounded-full transition-colors duration-300"
                                    >
                                        {giftCards.cards.ctaLabel}
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiftCardsCards;
