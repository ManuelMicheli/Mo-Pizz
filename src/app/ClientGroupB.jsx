'use client';

import dynamic from 'next/dynamic';

const Chef = dynamic(() => import('@/components/Chef'));
const Staff = dynamic(() => import('@/components/Staff'));
const Features = dynamic(() => import('@/components/Features'), { ssr: false });

export default function ClientGroupB() {
    return (
        <>
            <Chef />
            <section className="md:hidden w-full bg-charcoal px-4 pt-10 pb-2">
                <div className="mx-auto w-full max-w-[420px] aspect-[4/5] rounded-2xl overflow-hidden">
                    <img
                        src="/images/christian-moschiano.jpg?v=2"
                        alt="Christian Moschiano, chef di Mo Pizz"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                    />
                </div>
            </section>
            <Staff />
            <Features />
        </>
    );
}
