'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users } from 'lucide-react';
import { siteContent } from '@/data/copy';

const { staff } = siteContent;

const splitIntoWords = (text) => {
    const parts = text.split(/(\*\*.+?\*\*)/);
    let key = 0;
    return parts.flatMap((part) => {
        const isHighlight = part.startsWith('**') && part.endsWith('**');
        const clean = isHighlight ? part.slice(2, -2) : part;
        return clean.split(' ').filter(Boolean).map((word) => (
            <span key={key++} className={`staff-word inline-block mr-[0.3em] ${isHighlight ? 'text-flame font-semibold' : ''}`}>
                {word}
            </span>
        ));
    });
};

const Staff = () => {
    const sRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const words = gsap.utils.toArray('.staff-word');

            // Set initial state
            gsap.set(words, { opacity: 0.08, y: 12 });

            // Animate each word appearing on scroll
            gsap.to(words, {
                scrollTrigger: {
                    trigger: sRef.current,
                    start: 'top 80%',
                    end: 'bottom 40%',
                    scrub: 0.6,
                },
                opacity: 1,
                y: 0,
                stagger: 0.03,
                ease: 'none',
            });

            // Image parallax
            gsap.to('.staff-photo', {
                scrollTrigger: {
                    trigger: '.staff-photo',
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true,
                },
                y: -40,
                ease: 'none',
            });
        }, sRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sRef}
            className="w-full bg-charcoal relative py-24 sm:py-32 lg:py-40 overflow-hidden"
        >
            {/* Noise overlay */}
            <div className="absolute inset-0 opacity-5 mix-blend-multiply noise-overlay pointer-events-none" />

            {/* Staff image — full width, taller on mobile */}
            <div className="staff-photo relative w-full aspect-[4/3] sm:aspect-[16/6] md:aspect-[16/4] lg:aspect-[16/3.5] overflow-hidden mb-16 sm:mb-20 bg-charcoal border-y border-cream/10">
                {/* Placeholder gradient + icon */}
                <div className="absolute inset-0 bg-gradient-to-br from-ember/30 via-charcoal to-flame/20" />
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <Users size={64} className="text-cream/20" />
                    <span className="font-mono text-cream/20 text-sm tracking-widest uppercase">
                        Foto Staff
                    </span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

                {/* Section label */}
                <div className="font-caveat text-gold text-2xl sm:text-3xl mb-12">
                    {splitIntoWords(staff.eyebrow)}
                </div>

                {/* Main text blocks */}
                <div className="space-y-10">
                    {staff.paragraphs.map((paragraph, i) => (
                        <p key={i} className="font-sans text-cream/90 text-lg sm:text-xl lg:text-2xl leading-relaxed">
                            {splitIntoWords(paragraph)}
                        </p>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Staff;
