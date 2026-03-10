'use client';
import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink } from 'lucide-react';
import { PLATEFORM_ORDER_URL, ORDER_MODE } from '@/lib/constants';
import { LinesPatternCard, LinesPatternCardBody } from '@/components/ui/LinesPatternCard';

gsap.registerPlugin(ScrollTrigger);

const OrdIframe = () => {
    const sectionRef = useRef(null);
    const [iframeLoaded, setIframeLoaded] = useState(false);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.ord-iframe-heading', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="ord-iframe" className="py-24 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-charcoal">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-12 sm:mb-16 ord-iframe-heading">
                    <span className="font-caveat text-gold text-2xl sm:text-3xl">Il nostro menu</span>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        Ordina Online
                    </h2>
                </div>

                {ORDER_MODE === 'iframe' ? (
                    <LinesPatternCard
                        className="bg-white border-white/10 shadow-2xl"
                        patternClassName="bg-lines-pattern"
                        gradientClassName="from-white/90 via-white/70 to-white/50"
                    >
                        <div className="relative w-full min-h-[500px] sm:min-h-[600px] md:min-h-[700px]">
                            {!iframeLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center bg-flour rounded-[2rem]">
                                    <div className="flex flex-col items-center gap-4">
                                        <div className="w-12 h-12 border-4 border-flame border-t-transparent rounded-full animate-spin" />
                                        <span className="font-sans text-smoke">Caricamento menu...</span>
                                    </div>
                                </div>
                            )}
                            <iframe
                                src={PLATEFORM_ORDER_URL}
                                className="w-full border-0 h-[500px] sm:h-[600px] md:h-[700px]"
                                onLoad={() => setIframeLoaded(true)}
                                title="Menu Mo Pizz — Ordina Online"
                            />
                            <div className="p-4 text-center bg-flour">
                                <a
                                    href={PLATEFORM_ORDER_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="font-sans text-smoke text-sm hover:text-flame transition-colors inline-flex items-center gap-1"
                                >
                                    Problemi? Apri il menu in una nuova finestra <ExternalLink size={14} />
                                </a>
                            </div>
                        </div>
                    </LinesPatternCard>
                ) : (
                    <LinesPatternCard
                        className="bg-white/5 border-white/10 max-w-4xl mx-auto"
                        patternClassName="bg-lines-pattern"
                        gradientClassName="from-charcoal/80 via-charcoal/40 to-transparent"
                    >
                        <LinesPatternCardBody className="flex flex-col items-center text-center gap-8 py-14 sm:py-20">
                            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-flame/20 flex items-center justify-center">
                                <ExternalLink className="text-flame" size={40} />
                            </div>
                            <p className="font-sans text-cream/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                                Sfoglia il nostro menu completo su Plateform, scegli i tuoi piatti preferiti e completa l'ordine in pochi click.
                            </p>
                            <a
                                href={PLATEFORM_ORDER_URL}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-bold py-4 px-10 sm:py-5 sm:px-14 rounded-full text-lg sm:text-xl flex items-center gap-3 transition-colors duration-300"
                            >
                                Ordina su Plateform
                                <ExternalLink size={22} />
                            </a>
                        </LinesPatternCardBody>
                    </LinesPatternCard>
                )}
            </div>
        </section>
    );
};

export default OrdIframe;
