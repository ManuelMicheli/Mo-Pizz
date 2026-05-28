'use client';

import dynamic from 'next/dynamic';
import DeferMount from '@/components/DeferMount';

// Chef + Staff stay SSR'd (server-rendered HTML) — their "Chi Siamo" bio and
// manifesto text matter for SEO, so they must be in the initial markup.
const Chef = dynamic(() => import('@/components/Chef'));
const Staff = dynamic(() => import('@/components/Staff'));
const Features = dynamic(() => import('@/components/Features'), { ssr: false });

export default function ClientGroupB() {
    return (
        <>
            <Chef />
            <Staff />
            {/* Features is client-only (ssr:false) and far down the page — defer its
                mount so its GSAP/flip/marquee setup stays off the initial main thread. */}
            <DeferMount>
                <Features />
            </DeferMount>
        </>
    );
}
