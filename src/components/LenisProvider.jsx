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
        let idleHandle;

        const init = async () => {
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
                // lerp (frame-rate adaptive) instead of duration: snappier, no long
                // glide tail, smoother on high-refresh monitors. 0.1 ≈ premium fluid.
                lerp: 0.1,
                smoothWheel: true,
                syncTouch: false,
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
        };

        // Defer init past the initial hydration/paint window so loading Lenis +
        // GSAP + ScrollTrigger (and ScrollTrigger's layout measurement) doesn't
        // add to Total Blocking Time. Smooth scroll only matters once the user
        // can actually scroll.
        if (typeof requestIdleCallback === 'function') {
            idleHandle = requestIdleCallback(() => init(), { timeout: 2000 });
        } else {
            idleHandle = setTimeout(init, 200);
        }

        return () => {
            cancelled = true;
            if (idleHandle) {
                if (typeof cancelIdleCallback === 'function') cancelIdleCallback(idleHandle);
                clearTimeout(idleHandle);
            }
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
