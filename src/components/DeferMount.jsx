'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Renders children only once the placeholder nears the viewport. Keeps heavy
 * client islands (GSAP/ScrollTrigger sections) out of the initial hydration pass
 * so they don't block the main thread on first load. The new content grows below
 * the fold, so mounting it causes no layout shift.
 *
 * Use only for client-only (ssr:false) sections — there is no SSR HTML to lose.
 */
export default function DeferMount({ children, rootMargin = '800px 0px', minHeight = 0, anchorId }) {
    const ref = useRef(null);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (show) return;
        const el = ref.current;
        if (!el) return;
        const io = new IntersectionObserver(
            (entries) => {
                if (entries.some((e) => e.isIntersecting)) {
                    setShow(true);
                    io.disconnect();
                }
            },
            { rootMargin }
        );
        io.observe(el);
        return () => io.disconnect();
    }, [show, rootMargin]);

    if (show) return children;
    // anchorId keeps a hash target (e.g. #prenota) in the DOM before mount so
    // in-page anchor links still resolve and scroll to roughly the right place.
    return <div ref={ref} id={anchorId} style={minHeight ? { minHeight } : undefined} aria-hidden="true" />;
}
