'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const LenisProvider = ({ children }) => {
    useEffect(() => {
        const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

        const lenis = new Lenis({
            duration: isMobile ? 0.8 : 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: isMobile ? 2.0 : 1.2,
            wheelMultiplier: 1,
        });

        // Expose globally so components can stop/start for scroll-hijack sections
        window.__lenis = lenis;

        // Sync Lenis with GSAP ScrollTrigger
        lenis.on('scroll', ScrollTrigger.update);

        const tickerCb = (time) => { lenis.raf(time * 1000); };
        gsap.ticker.add(tickerCb);
        gsap.ticker.lagSmoothing(0);

        return () => {
            gsap.ticker.remove(tickerCb);
            lenis.destroy();
            delete window.__lenis;
        };
    }, []);

    return children;
};

export default LenisProvider;
