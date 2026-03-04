import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { PLATEFORM_RESERVE_URL } from '@/lib/constants';

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
        <section ref={containerRef} id="home" className="relative w-full h-screen min-h-[100dvh] overflow-hidden flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
            {/* Background Image — CSS background to prevent downloading */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: `url('/images/3d4kt58x19rmr0cwq6gvp4w3p0_upscayl_4x_upscayl-standard-4x.webp')` }}
                role="img"
                aria-label="Mo Pizz - Pizza Napoletana"
            />

            {/* Logo + Title — centered top, below navbar */}
            <div className="absolute top-24 sm:top-28 md:top-32 left-0 right-0 z-20 flex flex-col items-center text-center pointer-events-none">
                <img
                    src="/images/logo_mopizz.webp"
                    alt="Mo Pizz"
                    className="hero-elem h-20 sm:h-28 lg:h-36 w-auto mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                />
                <div className="hero-elem font-caveat text-gold text-xl sm:text-2xl mb-1">
                    Pizzeria Napoletana Verace • Legnano
                </div>
                <h1 className="hero-elem font-playfair font-black text-cream text-[clamp(2rem,6vw,5rem)] leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                    La Vera <span className="italic">Pizza Napoletana.</span>
                </h1>
            </div>

            {/* CTAs — centered bottom */}
            <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6">
                <a href="#menu" className="hero-elem magnetic-btn text-center bg-charcoal border border-charcoal text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300">
                    Scopri il Menu
                </a>
                <a href={PLATEFORM_RESERVE_URL} target="_blank" rel="noopener noreferrer" className="hero-elem magnetic-btn text-center bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300">
                    Prenota un Tavolo
                </a>
            </div>

        </section>
    );
};

export default Hero;
