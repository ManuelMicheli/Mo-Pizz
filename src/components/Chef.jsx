import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChefHat } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Chef = () => {
    const cRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.chef-text', {
                scrollTrigger: {
                    trigger: cRef.current,
                    start: 'top 60%',
                },
                y: 40,
                opacity: 0,
                stagger: 0.15,
                duration: 1,
                ease: 'power3.out'
            });

            gsap.to('.chef-photo', {
                scrollTrigger: {
                    trigger: cRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -50,
                ease: 'none'
            });
        }, cRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="chef" ref={cRef} className="w-full relative flex flex-col md:flex-row min-h-[80vh] overflow-hidden bg-flour md:bg-transparent">
            {/* Desktop Background Split - Hidden on Mobile */}
            <div className="absolute inset-0 hidden md:flex pointer-events-none -z-10">
                <div className="w-[45%] h-full bg-flour"></div>
                <div className="w-[55%] h-full bg-charcoal mix-blend-multiply opacity-5 noise-overlay"></div>
                <div className="absolute top-0 right-0 w-[55%] h-full bg-charcoal -z-20"></div>
            </div>

            {/* Left side: Photo (Mobile bg-flour, Desktop bg-flour visually via absolute) */}
            <div className="w-full md:w-[45%] bg-flour flex items-center justify-center py-10 px-6 sm:p-12 lg:p-24 relative overflow-hidden">
                <div className="chef-photo w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-gold shadow-2xl relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-ember to-flame opacity-90 mix-blend-multiply"></div>
                    <img
                        src="/images/chef-cristian.jpg"
                        alt="Cristian Moschiano"
                        className="absolute inset-0 w-full h-full object-cover filter grayscale sepia-[0.3]"
                    />
                    <ChefHat size={48} className="text-cream relative z-10 opacity-70" />
                </div>
            </div>

            {/* Right side: Manifesto */}
            <div className="w-full md:w-[55%] bg-charcoal flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-32 py-12 sm:py-20 relative">
                <div className="chef-text font-caveat text-gold text-2xl sm:text-3xl mb-4">
                    Il Pizzaiolo
                </div>

                <h2 className="chef-text font-playfair font-black text-cream text-[clamp(2.5rem,5vw,5rem)] leading-none mb-4 -ml-1">
                    Cristian Moschiano
                </h2>

                <h3 className="chef-text font-caveat text-gold text-2xl sm:text-3xl mb-10">
                    "Classe 1994 — La tradizione nelle mani di una nuova generazione"
                </h3>

                <div className="chef-text space-y-6">
                    <p className="font-sans text-cream/90 text-lg sm:text-xl leading-relaxed max-w-xl">
                        Cristian ha dedicato la sua vita alla pizza napoletana. Dopo l'esperienza al Made in Sud di Gorla Minore, ha fondato Mo Pizz con un obiettivo chiaro: creare un brand interamente incentrato sulla verace napoletana, senza compromessi.
                    </p>
                    <p className="font-sans text-cream/90 text-lg sm:text-xl leading-relaxed max-w-xl">
                        Ogni giorno seleziona personalmente le materie prime, cura l'impasto e la cottura, fondendo tradizione e innovazione in ogni pizza che esce dal suo forno a legna.
                    </p>
                </div>

                {/* Quote Block */}
                <div className="chef-text relative mt-10 sm:mt-16 pl-6 sm:pl-10 md:pl-16">
                    <span className="font-serif text-gold text-8xl absolute -top-8 left-0 leading-none opacity-40">"</span>
                    <p className="font-caveat text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream italic leading-snug">
                        La pizza è rispetto per la materia prima e amore per il fuoco.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Chef;
