import React, { useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendarCheck, Phone } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

import PrenotaHero from '../components/prenota/PrenotaHero';
import PrenotaComeFunziona from '../components/prenota/PrenotaComeFunziona';
import PrenotaEmbed from '../components/prenota/PrenotaEmbed';
import PrenotaInfoPratiche from '../components/prenota/PrenotaInfoPratiche';
import PrenotaCtaFinale from '../components/prenota/PrenotaCtaFinale';
import { siteContent } from '@/data/copy';

gsap.registerPlugin(ScrollTrigger);

const Prenota = () => {
    const [showStickyBar, setShowStickyBar] = useState(false);

    useLayoutEffect(() => {
        window.scrollTo(0, 0);

        const timer = setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);

        return () => {
            clearTimeout(timer);
            ScrollTrigger.getAll().forEach((t) => t.kill());
        };
    }, []);

    // Sticky bar: show after scrolling past hero (100vh)
    useEffect(() => {
        const handleScroll = () => {
            setShowStickyBar(window.scrollY > window.innerHeight * 0.8);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToForm = () => {
        const el = document.getElementById('prenota-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            <Helmet>
                <title>{siteContent.meta.prenotaTitle}</title>
                <meta
                    name="description"
                    content={siteContent.meta.prenotaDescription}
                />
                <link rel="canonical" href="https://www.mopizz.it/prenota" />
            </Helmet>

            <PrenotaHero />
            <PrenotaComeFunziona />
            <PrenotaEmbed />
            <PrenotaInfoPratiche />
            <PrenotaCtaFinale />

            {/* Sticky bottom bar — mobile only */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
                    showStickyBar ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div className="bg-charcoal/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3">
                    <button
                        onClick={scrollToForm}
                        className="flex-1 bg-flame hover:bg-ember text-cream font-sans font-bold py-3 rounded-full text-center flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                        Prenota Ora
                        <CalendarCheck size={18} />
                    </button>
                    <a
                        href="tel:+390331024363"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-300 shrink-0"
                        aria-label="Chiama per prenotare"
                    >
                        <Phone size={20} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Prenota;
