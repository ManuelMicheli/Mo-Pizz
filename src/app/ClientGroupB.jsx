'use client';

import dynamic from 'next/dynamic';

const Chef = dynamic(() => import('@/components/Chef'));
const Features = dynamic(() => import('@/components/Features'), { ssr: false });

export default function ClientGroupB() {
    return (
        <>
            <Chef />
            <section className="md:hidden w-full bg-charcoal">
                <div className="relative w-full aspect-[4/3] overflow-hidden">
                    <img
                        src="/images/christian-moschiano.jpg?v=2"
                        alt="Christian Moschiano, chef di Mo Pizz"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            </section>
            <Features />
        </>
    );
}
