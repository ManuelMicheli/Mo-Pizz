import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { HashLink } from 'react-router-hash-link';

const OrdHero = () => {
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
            className="relative w-full h-screen min-h-[100dvh] overflow-hidden flex items-center pt-20 sm:pt-24 px-6 sm:px-12 md:px-20 lg:px-32"
        >
            {/* Background */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/wmremove-transformedhero.webp')` }}
            />
            <div className="absolute inset-0 bg-charcoal/60 z-[1]" />

            {/* Diagonal lines overlay on hero */}
            <div className="absolute inset-0 bg-repeat bg-[length:50px_50px] bg-lines-pattern opacity-[0.04] z-[2]" />

            {/* Content */}
            <div className="relative z-20 w-full max-w-[1400px] mx-auto flex flex-col items-start gap-4">
                <div className="ord-hero-elem font-caveat text-gold text-2xl sm:text-3xl mb-2">
                    Asporto • Ordina Online
                </div>

                <div className="ord-hero-elem flex flex-col">
                    <h1 className="font-playfair font-black text-cream text-[clamp(2.5rem,8vw,7rem)] leading-[0.9] -ml-1">
                        La Napoli che ami,
                    </h1>
                    <h1 className="font-playfair font-black italic text-flame text-[clamp(2.5rem,9vw,8rem)] leading-[1] -ml-1">
                        a casa tua.
                    </h1>
                </div>

                <p className="ord-hero-elem font-sans text-smoke text-[clamp(1rem,1.5vw,1.25rem)] max-w-[600px] mt-2 mb-6 text-balance leading-relaxed">
                    La stessa pizza del nostro forno a legna, pronta da ritirare in pochi minuti. Ordina online e vieni a prenderla calda.
                </p>

                <div className="ord-hero-elem flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                    <a
                        href="#ord-iframe"
                        className="magnetic-btn w-full sm:w-auto text-center bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-6 sm:py-4 sm:px-10 text-sm sm:text-lg rounded-full transition-colors duration-300"
                    >
                        Ordina Ora
                    </a>
                    <HashLink
                        smooth
                        to="/#menu"
                        className="magnetic-btn w-full sm:w-auto text-center border box-border border-cream text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-3 px-6 sm:py-4 sm:px-10 text-sm sm:text-lg rounded-full transition-colors duration-300"
                    >
                        Vedi il Menu
                    </HashLink>
                </div>
            </div>
        </section>
    );
};

export default OrdHero;
