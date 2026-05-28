'use client';

import dynamic from 'next/dynamic';
import DeferMount from '@/components/DeferMount';

const Chef = dynamic(() => import('@/components/Chef'), { ssr: false });
const Staff = dynamic(() => import('@/components/Staff'), { ssr: false });
const Features = dynamic(() => import('@/components/Features'), { ssr: false });

export default function ClientGroupB() {
    return (
        <>
            {/* Chef, Staff and Features are client-only GSAP/framer-motion islands far
                below the fold. Defer their mount so their hydration + animation setup
                stays out of the initial load and off the main thread (lower TBT). */}
            <DeferMount>
                <Chef />
            </DeferMount>
            <DeferMount>
                <Staff />
            </DeferMount>
            <DeferMount>
                <Features />
            </DeferMount>
        </>
    );
}
