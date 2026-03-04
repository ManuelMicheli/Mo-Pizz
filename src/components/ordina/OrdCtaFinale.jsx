import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Phone } from 'lucide-react';
import { PLATEFORM_ORDER_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const OrdCtaFinale = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.cta-finale-elem', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative py-24 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-flame overflow-hidden">
            {/* Diagonal lines overlay */}
            <div className="absolute inset-0 bg-repeat bg-[length:40px_40px] bg-lines-pattern opacity-[0.08]" />

            <div className="relative max-w-[1400px] mx-auto text-center flex flex-col items-center gap-8 sm:gap-10">
                <h2 className="cta-finale-elem font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
                    Pronto per ordinare?
                </h2>
                <p className="cta-finale-elem font-sans text-cream/80 text-lg sm:text-xl md:text-2xl max-w-2xl leading-relaxed">
                    La tua pizza napoletana preferita ti aspetta. Ordina online o chiamaci direttamente.
                </p>
                <div className="cta-finale-elem flex flex-col sm:flex-row gap-4 sm:gap-6 w-full sm:w-auto">
                    <a
                        href={PLATEFORM_ORDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn w-full sm:w-auto bg-cream text-charcoal hover:bg-white font-sans font-bold py-4 px-10 sm:py-5 sm:px-14 rounded-full text-lg sm:text-xl flex items-center justify-center gap-3 transition-colors duration-300"
                    >
                        Ordina Ora
                        <ExternalLink size={22} />
                    </a>
                    <a
                        href="tel:+390331024363"
                        className="magnetic-btn w-full sm:w-auto border-2 border-cream text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-4 px-10 sm:py-5 sm:px-14 rounded-full text-lg sm:text-xl flex items-center justify-center gap-3 transition-colors duration-300"
                    >
                        <Phone size={22} />
                        Chiama per Ordinare
                    </a>
                </div>
            </div>
        </section>
    );
};

export default OrdCtaFinale;
