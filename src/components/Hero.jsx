'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import Link from 'next/link';
import { siteContent } from '@/data/copy';

const { hero } = siteContent;

const Hero = () => {
    const containerRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.from('.hero-elem', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.2
            });
        }, containerRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} id="home" className="relative w-full h-screen min-h-[100dvh] overflow-hidden flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
            {/* Background Image — next/image with preload for LCP */}
            <Image
                src="/images/hero-home.webp"
                alt={hero.ariaBackground}
                fill
                sizes="100vw"
                quality={85}
                preload
                loading="eager"
                fetchPriority="high"
                className="object-cover z-0"
            />

            {/* Logo + Title — centered top, below navbar */}
            <div className="absolute top-6 sm:top-8 md:top-10 left-0 right-0 z-20 flex flex-col items-center text-center pointer-events-none">
                <Image
                    src="/images/logo_mopizz.webp"
                    alt="Logo MO PIZZ — Pizzeria Napoletana a Legnano"
                    width={400}
                    height={389}
                    quality={85}
                    preload
                    loading="eager"
                    fetchPriority="high"
                    className="hero-elem h-20 sm:h-28 lg:h-36 w-auto mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                />
                <div className="hero-elem font-caveat text-gold text-xl sm:text-2xl mb-1">
                    {hero.eyebrow}
                </div>
                <h1 className="hero-elem font-playfair font-black text-cream text-[clamp(2rem,6vw,5rem)] leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]">
                    <span className="sr-only">{hero.h1Sr}</span>
                    <span aria-hidden="true">{hero.headline} <span className="italic">{hero.headlineEm}</span></span>
                </h1>
            </div>

            {/* CTAs — centered bottom */}
            <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6">
                <a href="#menu" className="hero-elem magnetic-btn text-center bg-charcoal border border-charcoal text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300">
                    {hero.ctaMenu}
                </a>
                <Link href="/#prenota" className="hero-elem magnetic-btn text-center bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300">
                    {hero.ctaPrenota}
                </Link>
            </div>

        </section>
    );
};

export default Hero;
