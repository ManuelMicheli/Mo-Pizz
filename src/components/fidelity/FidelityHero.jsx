import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const FidelityHero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.fid-hero-elem', {
                y: 60,
                opacity: 0,
                duration: 1.4,
                stagger: 0.12,
                ease: 'power3.out',
                delay: 0.3,
            });

        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={containerRef}
            className="relative w-full h-[75vh] min-h-[500px] overflow-hidden flex items-center pt-20 sm:pt-24 px-6 sm:px-12 md:px-20 lg:px-32"
        >
            {/* Background Image — full bleed, no overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/n2nty4t6f5rmw0cwq8cbbc93w8_upscayl_4x_upscayl-standard-4x.webp')` }}
            />

            {/* Film grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04] z-[3]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px 256px',
                }}
            />

            {/* Content — left aligned */}
            <div className="relative z-10 flex flex-col items-start text-left w-full max-w-2xl">
                {/* Headline */}
                <h1 className="fid-hero-elem font-playfair font-black text-cream text-[clamp(2.5rem,8vw,6.5rem)] leading-[0.9] tracking-tight">
                    La tua fedeltà
                </h1>
                <h1 className="fid-hero-elem font-playfair font-black italic text-cream text-[clamp(2.8rem,9vw,7.5rem)] leading-[0.9] tracking-tight">
                    merita un premio.
                </h1>
                <p className="fid-hero-elem font-sans text-cream/80 text-[clamp(1rem,1.5vw,1.25rem)] max-w-[480px] mt-4 leading-relaxed">
                    Accumula punti ad ogni visita e ottieni sconti esclusivi riservati solo a te.
                    <span className="text-gold/80 font-medium"> È gratis, ci vuole un minuto.</span>
                </p>

                {/* Counter sequence */}
                <div className="fid-hero-elem flex flex-wrap items-center gap-2.5 sm:gap-3 mt-6">
                    <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full">
                        <span className="font-playfair font-bold text-gold text-lg sm:text-xl">10€</span>
                        <span className="font-sans text-smoke text-xs sm:text-sm">spesi</span>
                    </div>
                    <span className="text-gold/60 font-sans text-sm">=</span>
                    <div className="flex items-center gap-2.5 bg-black/30 border border-white/10 backdrop-blur-md px-5 py-2.5 rounded-full">
                        <span className="font-playfair font-bold text-gold text-lg sm:text-xl">1</span>
                        <span className="font-sans text-smoke text-xs sm:text-sm">punto</span>
                    </div>
                    <span className="text-gold/60 font-sans text-sm hidden sm:inline">&rarr;</span>
                    <div className="flex items-center gap-2.5 bg-black/30 border border-flame/20 backdrop-blur-md px-5 py-2.5 rounded-full">
                        <span className="font-playfair font-bold text-flame text-lg sm:text-xl">10 punti</span>
                        <span className="font-sans text-cream/70 text-xs sm:text-sm">= 10% sconto</span>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
                <span className="font-mono text-cream/30 text-[10px] tracking-[0.25em] uppercase">Scopri</span>
                <ChevronDown size={20} className="text-cream/30 animate-bounce-slow" />
            </div>
        </section>
    );
};

export default FidelityHero;
