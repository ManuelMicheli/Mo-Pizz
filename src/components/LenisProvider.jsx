'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    // Prevent ScrollTrigger refresh storms when iOS Safari collapses address bar
    ScrollTrigger.config({ ignoreMobileResize: true });
}

const LenisProvider = ({ children }) => {
    useEffect(() => {
        // Mobile (phones) use native scroll: smoothTouch was already off, so Lenis
        // changed nothing there while still running a per-frame raf + a scroll listener
        // that forces layout (ScrollTrigger.update) every scroll. Desktop keeps Lenis.
        if (window.matchMedia('(max-width: 767px)').matches) return;

        const lenis = new Lenis({
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false,
            touchMultiplier: 1.2,
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
