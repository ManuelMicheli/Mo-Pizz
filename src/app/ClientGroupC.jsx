'use client';

import dynamic from 'next/dynamic';

const Reviews = dynamic(() => import('@/components/Reviews'));
const PrenotaSection = dynamic(() => import('@/components/PrenotaSection'));

export default function ClientGroupC() {
    return (
        <>
            <Reviews />
            <PrenotaSection />
        </>
    );
}
