'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, ShoppingBag, Lock } from 'lucide-react';
import { siteContent } from '@/data/copy';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const AspIframe = () => {
    const { orderUrl, iframe } = siteContent.servizi.asporto;
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.asp-iframe-heading', {
                y: 30,
                opacity: 0,
                duration: 0.9,
                ease: 'power3.out',
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            });
            gsap.from('.asp-iframe-card', {
                y: 50,
                opacity: 0,
                scale: 0.98,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.asp-iframe-card', start: 'top 85%' },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="asp-iframe"
            className="relative z-10 -mt-[8vw] pt-[calc(6rem+8vw)] sm:pt-[calc(9rem+8vw)] pb-24 sm:pb-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-flour overflow-hidden"
            style={{ clipPath: 'polygon(0 8vw, 100% 0, 100% 100%, 0 100%)' }}
        >
            {/* Oblique flame band dividing the charcoal section from this white one */}
            <div
                className="absolute top-0 inset-x-0 h-[calc(8vw+16px)] bg-flame pointer-events-none"
                style={{ clipPath: 'polygon(0 8vw, 100% 0, 100% 14px, 0 calc(8vw + 14px))' }}
            />

            <div className="relative max-w-[1500px] mx-auto">
                <div className="text-center mb-12 sm:mb-16 asp-iframe-heading">
                    <span className="font-mono text-flame text-xs sm:text-sm tracking-[0.25em] uppercase">
                        {iframe.eyebrow}
                    </span>
                    <h2 className="font-playfair text-charcoal text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-4 leading-tight">
                        {iframe.headline} <span className="italic text-flame">{iframe.headlineEm}</span>
                    </h2>
                    <p className="font-sans text-smoke text-base sm:text-lg mt-5 max-w-xl mx-auto leading-relaxed">
                        {iframe.body}
                    </p>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-flame to-transparent mx-auto mt-6" />
                </div>

                {/* CTA card — apre il menu ordinazioni xMenu in una nuova scheda */}
                <div className="asp-iframe-card relative w-full max-w-3xl mx-auto rounded-[2rem] sm:rounded-[2.5rem] border border-charcoal/10 bg-white overflow-hidden shadow-2xl shadow-charcoal/20">
                    <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />
                    <div className="flex flex-col items-center text-center gap-7 py-14 sm:py-20 px-8">
                        <div className="w-20 h-20 rounded-2xl bg-flame/10 border border-flame/20 flex items-center justify-center">
                            <ShoppingBag className="text-flame" size={36} />
                        </div>
                        <p className="font-sans text-charcoal/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                            Apri il menu, componi il tuo ordine e scegli l&apos;orario di ritiro. Ti prepariamo tutto al momento in Via Cadore 4.
                        </p>
                        <a
                            href={orderUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-bold py-4 px-12 rounded-full text-lg flex items-center gap-3 transition-colors duration-300"
                        >
                            <ShoppingBag size={20} />
                            Ordina Asporto
                            <ExternalLink size={18} />
                        </a>
                        <div className="flex items-center gap-2 text-smoke text-xs sm:text-sm font-sans">
                            <Lock size={14} />
                            <span>{iframe.secureNote}</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AspIframe;
