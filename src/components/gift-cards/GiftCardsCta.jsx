import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GiftCardsCta = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.gc-cta-elem',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="bg-flour py-20 sm:py-28 px-4 sm:px-8 md:px-12">
            <div className="max-w-3xl mx-auto text-center">
                <span className="gc-cta-elem font-caveat text-flame text-xl sm:text-2xl">
                    Non aspettare
                </span>
                <h2 className="gc-cta-elem font-playfair font-black text-charcoal text-[clamp(1.8rem,5vw,4rem)] leading-tight mt-3 mb-4">
                    Regala il sapore di Napoli
                </h2>
                <p className="gc-cta-elem font-sans text-smoke text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-10">
                    Un regalo che scalda il cuore e delizia il palato. Sorprendi chi ami con un&apos;esperienza autentica da Mo Pizz.
                </p>

                <div className="gc-cta-elem flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://wa.me/390331024363?text=Ciao!%20Vorrei%20acquistare%20una%20Gift%20Card%20di%20Mo%20Pizz.%20Potete%20darmi%20maggiori%20informazioni%3F"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn w-full sm:w-auto text-center bg-flame hover:bg-ember text-cream font-sans font-semibold py-4 px-10 rounded-full transition-colors duration-300"
                    >
                        Acquista su WhatsApp
                    </a>
                    <Link
                        to="/"
                        className="magnetic-btn w-full sm:w-auto text-center border border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-cream font-sans font-semibold py-4 px-10 rounded-full transition-colors duration-300"
                    >
                        Torna alla Home
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default GiftCardsCta;
