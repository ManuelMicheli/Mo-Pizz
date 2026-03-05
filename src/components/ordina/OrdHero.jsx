import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '@/data/copy';

const OrdHero = () => {
    const { ordina } = siteContent;
    const containerRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.ord-hero-elem', {
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
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/ordina-hero.webp')` }}
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
            <div className="relative z-20 flex flex-col items-start gap-4 max-w-3xl">
                <div className="ord-hero-elem font-caveat text-gold text-2xl sm:text-3xl mb-2">
                    {ordina.hero.eyebrow}
                </div>

                <div className="ord-hero-elem flex flex-col">
                    <h1 className="font-playfair font-black text-cream text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] -ml-1">
                        {ordina.hero.headline}
                    </h1>
                    <h1 className="font-playfair font-black italic text-flame text-[clamp(2.5rem,9vw,8rem)] leading-[1] -ml-1">
                        {ordina.hero.headlineEm}
                    </h1>
                </div>

                <p className="ord-hero-elem font-sans text-smoke text-[clamp(1rem,1.5vw,1.25rem)] max-w-[600px] mt-2 mb-6 text-balance leading-relaxed">
                    {ordina.hero.body}
                </p>

                <div className="ord-hero-elem flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                        href="#ord-iframe"
                        className="magnetic-btn w-full sm:w-auto text-center bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-6 sm:py-4 sm:px-10 text-sm sm:text-lg rounded-full transition-colors duration-300"
                    >
                        {ordina.hero.ctaPrimary}
                    </a>
                    <HashLink
                        smooth
                        to="/#menu"
                        className="magnetic-btn w-full sm:w-auto text-center border box-border border-cream text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-3 px-6 sm:py-4 sm:px-10 text-sm sm:text-lg rounded-full transition-colors duration-300"
                    >
                        {ordina.hero.ctaSecondary}
                    </HashLink>
                </div>
            </div>
        </section>
    );
};

export default OrdHero;
