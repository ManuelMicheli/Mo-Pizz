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
            <picture className="absolute inset-0 z-0">
                <source srcSet="/images/wmremove-transformedhero.webp" type="image/webp" />
                <img
                    src="/images/wmremove-transformedhero.png"
                    alt=""
                    className="w-full h-full object-cover object-center"
                    loading="eager"
                />
            </picture>

            {/* Content — left aligned */}
            <div className="relative z-20 flex flex-col items-start gap-4">
                <h2 className="hero-elem font-playfair font-black text-black text-[clamp(4rem,12vw,12rem)] leading-none tracking-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                    Mo Pizz
                </h2>

                {/* Micro-label */}
                <div className="hero-elem font-caveat text-gold text-lg sm:text-xl">
                    Pizzeria Napoletana Verace • Legnano
                </div>

                {/* Typography */}
                <div className="hero-elem flex flex-col">
                    <h1 className="font-playfair font-black text-cream text-[clamp(1.5rem,3.5vw,3.5rem)] leading-[0.9] -ml-1">
                        La Vera
                    </h1>
                    <h1 className="font-playfair font-black italic text-flame text-[clamp(1.5rem,4vw,4rem)] leading-[1] -ml-1">
                        Pizza Napoletana.
                    </h1>
                </div>

                {/* Subtitle */}
                <p className="hero-elem font-sans text-smoke text-[clamp(0.85rem,1.2vw,1.05rem)] max-w-[85vw] sm:max-w-[450px] mt-1 mb-4 text-balance leading-relaxed">
                    Impasto lievitato 48 ore. Forno a legna a 450°C. Ingredienti DOP dal cuore della Campania.
                </p>

                {/* CTA */}
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
