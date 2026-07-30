'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Clock } from 'lucide-react';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const PrenotaSection = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.prenota-heading', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.prenota-card', {
                y: 60,
                opacity: 0,
                scale: 0.97,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.prenota-card',
                    start: 'top 85%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="prenota" className="py-20 sm:py-28 bg-charcoal relative overflow-hidden">
            {/* Ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(232,93,38,0.05) 0%, transparent 60%)',
                }}
            />

            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
                {/* Header */}
                <div className="text-center mb-10 sm:mb-14 prenota-heading">
                    <span className="font-caveat text-gold text-2xl sm:text-3xl">
                        Prenotazione Tavolo
                    </span>
                    <h2 className="font-playfair text-cream text-4xl sm:text-5xl md:text-6xl mt-3 leading-tight">
                        Prenota il Tuo Tavolo
                    </h2>
                    <p className="font-sans text-smoke/80 text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
                        Scegli data, orario e numero di coperti: prenota online in pochi secondi con TheFork.
                    </p>
                </div>

                {/* TheFork reservation widget */}
                <div className="prenota-card w-full max-w-3xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />
                    <div className="p-4 sm:p-6">
                        <iframe
                            src="https://widget.thefork.com/it/a047ef49-75f5-45c6-be7e-4b1e82b44648?step=date"
                            title="Prenota un tavolo da Mo Pizz con TheFork"
                            className="w-full rounded-[1.5rem] bg-white"
                            style={{ height: 'min(720px, 90vh)', border: '0' }}
                            loading="lazy"
                            allow="payment"
                        />
                    </div>
                </div>

                {/* Phone fallback */}
                <div className="mt-8 flex flex-col items-center text-center gap-4">
                    <p className="font-sans text-smoke/70 text-base">
                        Preferisci il telefono? Chiamaci, ti confermiamo subito la disponibilità.
                    </p>
                    <a
                        href="tel:+390331024363"
                        className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-bold py-3.5 px-10 rounded-full text-lg flex items-center gap-3 transition-colors duration-300"
                    >
                        <Phone size={20} />
                        0331 024363
                    </a>
                    <div className="flex items-center gap-2 text-smoke/60 mt-1">
                        <Clock size={15} />
                        <span className="font-sans text-sm">Mar–Gio e Dom 19:00–22:30 · Ven–Sab 19:00–23:00 · Lun chiuso</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PrenotaSection;
