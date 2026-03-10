'use client';

import dynamic from 'next/dynamic';

const Chef = dynamic(() => import('@/components/Chef'));
const Staff = dynamic(() => import('@/components/Staff'));
const Features = dynamic(() => import('@/components/Features'));

export default function ClientGroupB() {
    return (
        <>
            <Chef />
            <Staff />
            <Features />
        </>
    );
}
