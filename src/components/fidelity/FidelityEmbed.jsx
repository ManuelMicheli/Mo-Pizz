import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ArrowRight, Shield } from 'lucide-react';
import { PLATEFORM_FIDELITY_URL, FIDELITY_MODE } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const FidelityEmbed = () => {
    const sectionRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.fid-embed-heading', {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            gsap.from('.fid-embed-card', {
                y: 60,
                opacity: 0,
                scale: 0.97,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.fid-embed-card',
                    start: 'top 85%',
                },
            });

            gsap.from('.fid-embed-trust', {
                y: 20,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.fid-embed-trust-bar',
                    start: 'top 90%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="fidelity-form" className="w-full py-28 sm:py-40 bg-charcoal relative overflow-hidden">
            {/* Full-width ambient glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] rounded-full pointer-events-none"
                style={{
                    background: 'radial-gradient(circle, rgba(232,93,38,0.06) 0%, transparent 60%)',
                }}
            />

            <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 relative z-10">
                {/* Section Header */}
                <div className="text-center mb-14 sm:mb-20 fid-embed-heading">
                    <span className="font-mono text-flame/60 text-xs sm:text-sm tracking-[0.2em] uppercase">
                        Ci vuole meno di un minuto
                    </span>
                    <h2 className="font-playfair font-bold text-cream text-[clamp(2rem,5vw,4.5rem)] mt-4 leading-tight">
                        Iscriviti Ora
                    </h2>
                    <p className="font-sans text-smoke/80 text-base sm:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
                        Compila il form e inizia ad accumulare punti alla tua prossima visita.
                    </p>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-flame to-transparent mx-auto mt-6" />
                </div>

                {FIDELITY_MODE === 'iframe' ? (
                    <div className="fid-embed-card relative w-full max-w-4xl mx-auto rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/30">
                        {/* Top accent line */}
                        <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />

                        <div className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
                            {!iframeLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-10 h-10 border-2 border-gold border-t-transparent rounded-full animate-spin" />
                                        <span className="font-sans text-smoke/60 text-sm">Caricamento form...</span>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={PLATEFORM_FIDELITY_URL}
                                className="w-full border-0 h-[500px] sm:h-[600px] md:h-[700px]"
                                onLoad={() => setIframeLoaded(true)}
                                title="Iscrizione Fidelity MO PIZZ"
                            />
                        </div>

                        {/* Bottom bar */}
                        <div className="p-4 text-center border-t border-white/5">
                            <a
                                href={PLATEFORM_FIDELITY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-sans text-smoke/50 text-sm hover:text-cream transition-colors inline-flex items-center gap-2"
                            >
                                Problemi? Apri il form in una nuova finestra <ExternalLink size={13} />
                            </a>
                        </div>
                    </div>
                ) : (
                    <div className="fid-embed-card w-full max-w-3xl mx-auto rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                        {/* Top accent line */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />

                        <div className="flex flex-col items-center text-center gap-8 py-16 sm:py-24 px-8">
                            {/* Icon */}
                            <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                                <ExternalLink className="text-gold" size={36} />
                            </div>

                            <p className="font-sans text-cream/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                                Iscriviti al programma Fidelity MO PIZZ su Plateform. È gratuito e ci vuole meno di un minuto!
                            </p>

                            <a
                                href={PLATEFORM_FIDELITY_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="magnetic-btn bg-gradient-to-r from-gold to-[#c4943d] text-charcoal font-sans font-bold py-4 px-12 rounded-full text-lg flex items-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.25)]"
                            >
                                Iscriviti su Plateform
                                <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                )}

                {/* Trust bar */}
                <div className="fid-embed-trust-bar mt-12 sm:mt-16 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                    <div className="fid-embed-trust flex items-center gap-2.5 text-smoke/40">
                        <Shield size={16} />
                        <span className="font-sans text-xs sm:text-sm">Dati protetti</span>
                    </div>
                    <div className="fid-embed-trust flex items-center gap-2.5 text-smoke/40">
                        <span className="font-mono text-xs sm:text-sm">100% Gratuito</span>
                    </div>
                    <div className="fid-embed-trust flex items-center gap-2.5 text-smoke/40">
                        <span className="font-mono text-xs sm:text-sm">Cancellazione in qualsiasi momento</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FidelityEmbed;
