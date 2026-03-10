'use client';

import React, { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ChefHat } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '@/data/copy';

const { chiSiamo } = siteContent;

const renderHighlighted = (text) =>
    text.split(/(\*\*.+?\*\*)/).map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <span key={i} className="text-flame font-semibold">{part.slice(2, -2)}</span>;
        }
        return part;
    });

const Chef = () => {
    const cRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.chef-text', {
                scrollTrigger: {
                    trigger: cRef.current,
                    start: 'top 70%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.12,
                duration: 1.3,
                ease: 'expo.out',
                force3D: true,
            });

            gsap.to('.chef-photo', {
                scrollTrigger: {
                    trigger: cRef.current,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                },
                y: -50,
                ease: 'none'
            });
        }, cRef);
        return () => ctx.revert();
    }, []);

    return (
        <section id="chi-siamo" ref={cRef} className="w-full relative flex flex-col md:flex-row min-h-[80vh] overflow-hidden bg-flour md:bg-transparent">
            {/* Desktop Background Split - Hidden on Mobile */}
            <div className="absolute inset-0 hidden md:flex pointer-events-none -z-10">
                <div className="w-[45%] h-full bg-flour"></div>
                <div className="w-[55%] h-full bg-charcoal mix-blend-multiply opacity-5 noise-overlay"></div>
                <div className="absolute top-0 right-0 w-[55%] h-full bg-charcoal -z-20"></div>
            </div>

            {/* Left side: Photo (Mobile bg-flour, Desktop bg-flour visually via absolute) */}
            <div className="w-full md:w-[45%] bg-flour flex items-center justify-center py-8 px-6 sm:p-12 lg:p-24 relative overflow-hidden">
                <div className="chef-photo w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-gold shadow-2xl relative flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-ember to-flame opacity-90 mix-blend-multiply"></div>
                    <img
                        src="/images/chef-cristian.webp"
                        alt={chiSiamo.photoAlt}
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 w-full h-full object-cover filter grayscale sepia-[0.3]"
                    />
                    <ChefHat size={48} className="text-cream relative z-10 opacity-70" />
                </div>
            </div>

            {/* Right side: Manifesto */}
            <div className="w-full md:w-[55%] bg-charcoal flex flex-col justify-center px-5 sm:px-10 md:px-16 lg:px-32 py-12 sm:py-20 relative overflow-hidden">
                <div className="chef-text font-caveat text-gold text-2xl sm:text-3xl mb-4">
                    {chiSiamo.eyebrow}
                </div>

                <h2 className="chef-text font-playfair font-black text-cream text-[clamp(2.5rem,5vw,5rem)] leading-none mb-1 -ml-1">
                    {chiSiamo.headline}
                </h2>
                <h2 className="chef-text font-playfair font-black italic text-flame text-[clamp(2.5rem,5vw,5rem)] leading-none mb-4 -ml-1">
                    {chiSiamo.headlineEm}
                </h2>

                <h3 className="chef-text font-caveat text-gold text-2xl sm:text-3xl mb-10">
                    {chiSiamo.subheadline}
                </h3>

                <div className="chef-text space-y-6">
                    {chiSiamo.paragraphs.map((p, i) => (
                        <p key={i} className="font-sans text-cream/90 text-lg sm:text-xl leading-relaxed max-w-xl">
                            {renderHighlighted(p)}
                        </p>
                    ))}
                </div>

                {/* Quote Block */}
                <div className="chef-text relative mt-10 sm:mt-16 pl-6 sm:pl-10 md:pl-16">
                    <span className="font-serif text-gold text-8xl absolute -top-8 left-0 leading-none opacity-40">&ldquo;</span>
                    <p className="font-caveat text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-cream italic leading-snug">
                        {chiSiamo.quote}&rdquo;
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Chef;
