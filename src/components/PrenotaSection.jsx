'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, CalendarCheck, Phone } from 'lucide-react';
import { PLATEFORM_RESERVE_URL, RESERVE_MODE } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const PrenotaSection = () => {
    const sectionRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    // Fallback: hide spinner after 4s even if onLoad doesn't fire
    useEffect(() => {
        const timer = setTimeout(() => setIframeLoaded(true), 4000);
        return () => clearTimeout(timer);
    }, []);

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
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl mt-3 leading-tight">
                        Prenota il Tuo Tavolo
                    </h2>
                    <p className="font-sans text-smoke/80 text-base sm:text-lg mt-4 max-w-lg mx-auto leading-relaxed">
                        Scegli data, orario e numero di coperti. Ricevi la conferma in pochi istanti.
                    </p>
                </div>

                {RESERVE_MODE === 'iframe' ? (
                    <div className="prenota-card relative w-full max-w-7xl mx-auto rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
                        {/* Top accent */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />

                        <div className="relative w-full overflow-hidden min-h-[400px] sm:min-h-[480px] md:min-h-[560px]">
                            {!iframeLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-10 h-10 border-2 border-flame border-t-transparent rounded-full animate-spin" />
                                        <span className="font-sans text-smoke/60 text-sm">Caricamento prenotazione...</span>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={PLATEFORM_RESERVE_URL}
                                className="w-full border-0 h-[480px] sm:h-[560px] md:h-[640px]"
                                style={{ marginTop: '-80px' }}
                                allow="clipboard-write; payment; web-share"
                                referrerPolicy="no-referrer-when-downgrade"
                                onLoad={() => setIframeLoaded(true)}
                                title="Prenota un tavolo — Mo Pizz"
                            />
                        </div>

                        {/* Bottom bar */}
                        <div className="p-4 text-center border-t border-white/5">
                            <a
                                href={PLATEFORM_RESERVE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-smoke/50 text-sm hover:text-cream transition-colors inline-flex items-center gap-2"
                            >
                                Problemi? Apri in una nuova finestra <ExternalLink size={13} />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="prenota-card w-full max-w-3xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />
                        <div className="flex flex-col items-center text-center gap-6 py-14 sm:py-20 px-8">
                            <div className="w-16 h-16 rounded-2xl bg-flame/10 border border-flame/20 flex items-center justify-center">
                                <CalendarCheck className="text-flame" size={32} />
                            </div>
                            <p className="font-sans text-cream/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                                Prenota il tuo tavolo da Mo Pizz su Plateform.
                            </p>
                            <a
                                href={PLATEFORM_RESERVE_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-bold py-4 px-12 rounded-full text-lg flex items-center gap-3 transition-colors duration-300"
                            >
                                Prenota su Plateform
                                <ExternalLink size={20} />
                            </a>
                        </div>
                    </div>
                )}

                {/* Fallback CTA under iframe */}
                <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
                    <span className="font-sans text-smoke/50 text-sm">Preferisci chiamare?</span>
                    <a
                        href="tel:+390331024363"
                        className="font-sans text-cream/70 hover:text-flame text-sm font-medium flex items-center gap-1.5 transition-colors"
                    >
                        <Phone size={14} />
                        0331 024363
                    </a>
                </div>
            </div>
        </section>
    );
};

export default PrenotaSection;
