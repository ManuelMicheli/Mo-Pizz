import React, { useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Phone } from 'lucide-react';

import OrdHero from '../components/ordina/OrdHero';
import OrdComeFunziona from '../components/ordina/OrdComeFunziona';
import OrdIframe from '../components/ordina/OrdIframe';
import OrdInfoPratiche from '../components/ordina/OrdInfoPratiche';
import OrdCtaFinale from '../components/ordina/OrdCtaFinale';
import { PLATEFORM_ORDER_URL } from '../lib/constants';

gsap.registerPlugin(ScrollTrigger);

const Ordina = () => {
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

    return (
        <>
            <OrdHero />
            <OrdComeFunziona />
            <OrdIframe />
            <OrdInfoPratiche />
            <OrdCtaFinale />

            {/* Sticky bottom bar — mobile only */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-40 md:hidden transition-transform duration-300 ${
                    showStickyBar ? 'translate-y-0' : 'translate-y-full'
                }`}
            >
                <div className="bg-charcoal/95 backdrop-blur-xl border-t border-white/10 px-4 py-3 flex items-center gap-3">
                    <a
                        href={PLATEFORM_ORDER_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-flame hover:bg-ember text-cream font-sans font-bold py-3 rounded-full text-center flex items-center justify-center gap-2 transition-colors duration-300"
                    >
                        Ordina Ora
                        <ExternalLink size={18} />
                    </a>
                    <a
                        href="tel:+390331024363"
                        className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-cream hover:bg-white/10 transition-colors duration-300 shrink-0"
                        aria-label="Chiama per ordinare"
                    >
                        <Phone size={20} />
                    </a>
                </div>
            </div>
        </>
    );
};

export default Ordina;
