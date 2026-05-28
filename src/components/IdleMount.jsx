'use client';

import { useEffect, useState } from 'react';

/**
 * Mounts children once the browser is idle (or after a short timeout / first
 * user interaction). Use for global client islands that are not needed for the
 * first paint — overlays, drawers, banners — so their hydration stays off the
 * initial main-thread work that drives Total Blocking Time.
 */
export default function IdleMount({ children, timeout = 2500 }) {
    const [show, setShow] = useState(false);

    useEffect(() => {
        let idle;
        let timer;
        const go = () => setShow(true);

        if (typeof requestIdleCallback === 'function') {
            idle = requestIdleCallback(go, { timeout });
        } else {
            timer = setTimeout(go, 200);
        }

        // Don't make the user wait for idle if they interact first.
        const onInteract = () => go();
        window.addEventListener('pointerdown', onInteract, { once: true, passive: true });
        window.addEventListener('keydown', onInteract, { once: true });

        return () => {
            if (idle && typeof cancelIdleCallback === 'function') cancelIdleCallback(idle);
            if (timer) clearTimeout(timer);
            window.removeEventListener('pointerdown', onInteract);
            window.removeEventListener('keydown', onInteract);
        };
    }, [timeout]);

    return show ? children : null;
}
