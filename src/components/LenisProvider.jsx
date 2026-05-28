'use client';

import { useEffect } from 'react';

const LenisProvider = ({ children }) => {
    useEffect(() => {
        // Mobile (phones) use native scroll, so Lenis does nothing there. Bail
        // before importing anything — keeps Lenis + GSAP out of the mobile bundle
        // entirely (they're code-split behind this dynamic import). Desktop only.
        if (window.matchMedia('(max-width: 767px)').matches) return;

        let lenis;
        let tickerCb;
        let removeTicker;
        let cancelled = false;

        (async () => {
            const [{ default: Lenis }, { default: gsap }, { ScrollTrigger }] = await Promise.all([
                import('lenis'),
                import('gsap'),
                import('gsap/ScrollTrigger'),
            ]);
            if (cancelled) return;

            gsap.registerPlugin(ScrollTrigger);
            // Prevent ScrollTrigger refresh storms when iOS Safari collapses address bar
            ScrollTrigger.config({ ignoreMobileResize: true });

            lenis = new Lenis({
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

            tickerCb = (time) => { lenis.raf(time * 1000); };
            gsap.ticker.add(tickerCb);
            gsap.ticker.lagSmoothing(0);
            removeTicker = () => gsap.ticker.remove(tickerCb);
        })();

        return () => {
            cancelled = true;
            if (removeTicker) removeTicker();
            if (lenis) {
                lenis.destroy();
                delete window.__lenis;
            }
        };
    }, []);

    return children;
};

export default LenisProvider;
