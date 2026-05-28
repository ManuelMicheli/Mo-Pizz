'use client';

import dynamic from 'next/dynamic';
import DeferMount from '@/components/DeferMount';

const PrenotaSection = dynamic(() => import('@/components/PrenotaSection'));

export default function ClientGroupC() {
    return (
        <DeferMount anchorId="prenota" rootMargin="1200px 0px">
            <PrenotaSection />
        </DeferMount>
    );
}
