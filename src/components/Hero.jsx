import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-elem', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="home" className="relative w-full h-[100dvh] overflow-hidden flex items-center px-5 sm:px-10 md:px-16 lg:px-32">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/wmremove-transformedhero.png')` }}
            />

            {/* "Mo Pizz" — top left, big & black */}
            <div className="hero-elem absolute top-8 sm:top-12 left-6 sm:left-12 md:left-20 lg:left-32 z-20">
                <h2 className="font-playfair font-black text-black text-[clamp(2rem,5vw,4.5rem)] leading-none tracking-tight">
                    Mo Pizz
                </h2>
            </div>

            {/* Content */}
            <div className="relative z-20 w-full flex flex-col items-start gap-4">

                {/* Micro-label */}
                <div className="hero-elem font-caveat text-gold text-2xl sm:text-3xl mb-2">
                    Pizzeria Napoletana Verace • Legnano
                </div>

                {/* Massive Typography */}
                <div className="hero-elem flex flex-col">
                    <h1 className="font-playfair font-black text-cream text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] -ml-1">
                        La Vera
                    </h1>
                    <h1 className="font-playfair font-black italic text-flame text-[clamp(2.5rem,9vw,9rem)] leading-[1] -ml-1">
                        Pizza Napoletana.
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="hero-elem font-sans text-smoke text-[clamp(1rem,1.5vw,1.25rem)] max-w-[85vw] sm:max-w-[550px] mt-2 mb-6 text-balance leading-relaxed">
                    Impasto lievitato 48 ore. Forno a legna a 450°C. Ingredienti DOP dal cuore della Campania.
                </p>

                {/* Two CTAs */}
                <div className="hero-elem flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                    <a href="#contatti" className="magnetic-btn w-full sm:w-auto text-center bg-flame hover:bg-ember text-cream font-sans font-bold py-4 px-8 rounded-full transition-colors duration-300">
                        Prenota un Tavolo
                    </a>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-cream/50 flex flex-col items-center gap-2">
                <ChevronDown size={32} className="animate-bounce-slow" />
            </div>
        </section>
    );
};

export default Hero;
