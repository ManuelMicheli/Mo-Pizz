import React from 'react';
import { ParallaxText } from './ui/scroll-based-velocity';
import { siteContent } from '@/data/copy';

const Statement = () => {
    return (
        <section className="w-full relative py-4 sm:py-5 lg:py-6 overflow-hidden bg-flour">
            <ParallaxText
                baseVelocity={2}
                className="font-playfair font-bold text-charcoal text-[clamp(2rem,5vw,4.5rem)] leading-[1.1] tracking-tight"
            >
                {siteContent.statement.marquee}
            </ParallaxText>
        </section>
    );
};

export default Statement;
