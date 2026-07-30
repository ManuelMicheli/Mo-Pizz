'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Shield } from 'lucide-react';
import { siteContent } from '@/data/copy';
import EmbedIframe from '@/components/ui/EmbedIframe';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const FidelityEmbed = () => {
    const { rewardsUrl } = siteContent.fidelity;
    const sectionRef = useRef(null);

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
                        Iscriviti e controlla i tuoi punti
                    </span>
                    <h2 className="font-playfair text-cream text-[clamp(2rem,5vw,4.5rem)] mt-4 leading-tight">
                        I Tuoi Premi
                    </h2>
                    <p className="font-sans text-smoke/80 text-base sm:text-lg mt-5 max-w-lg mx-auto leading-relaxed">
                        Accedi al tuo profilo Fidelity per iscriverti, vedere il saldo punti e riscattare i premi.
                    </p>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-flame to-transparent mx-auto mt-6" />
                </div>

                <div className="fid-embed-card relative w-full max-w-4xl mx-auto rounded-[1.5rem] sm:rounded-[2.5rem] border border-white/10 bg-white overflow-hidden shadow-2xl shadow-black/30">
                    <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />

                    <EmbedIframe
                        src={rewardsUrl}
                        title="Programma Fidelity MO PIZZ — I tuoi premi"
                        allow="clipboard-write"
                        theme="light"
                        showBottomBar={false}
                        sizeClassName="h-[82svh] min-h-[560px] sm:h-[680px] md:h-[780px]"
                    />

                    <div className="p-4 text-center border-t border-charcoal/10 bg-cream/60">
                        <a
                            href={rewardsUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-sans text-smoke text-sm hover:text-flame transition-colors inline-flex items-center gap-2"
                        >
                            Apri il profilo in una nuova finestra <ExternalLink size={13} />
                        </a>
                    </div>
                </div>

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
