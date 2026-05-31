import React from 'react';
import Image from 'next/image';
import { siteContent } from '@/data/copy';

const { hero } = siteContent;

const Hero = () => {
    return (
        <section id="home" className="relative w-full h-screen min-h-[100dvh] overflow-hidden flex items-center px-6 sm:px-12 md:px-20 lg:px-32">
            {/* Background Image — next/image with preload for LCP */}
            <Image
                src="/images/hero-home-v2.webp"
                alt={hero.ariaBackground}
                fill
                sizes="100vw"
                quality={85}
                priority
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
                    priority
                    fetchPriority="high"
                    className="hero-elem h-20 sm:h-28 lg:h-36 w-auto mb-3 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
                    style={{ animationDelay: '0.15s' }}
                />
                <div className="hero-elem font-caveat text-gold text-xl sm:text-2xl mb-1" style={{ animationDelay: '0.27s' }}>
                    {hero.eyebrow}
                </div>
                <h1 className="hero-elem font-playfair text-cream text-[clamp(2rem,6vw,5rem)] leading-[0.95] drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)]" style={{ animationDelay: '0.39s' }}>
                    <span className="sr-only">{hero.h1Sr}</span>
                    <span aria-hidden="true">{hero.headline} <span className="italic">{hero.headlineEm}</span></span>
                </h1>
            </div>

            {/* Sfumatura di giunzione con la sezione sotto — verso l'arancione dei servizi (mobile) / charcoal del menù fisso (desktop) */}
            <div className="absolute inset-x-0 bottom-0 h-40 sm:h-52 z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#9d4305] md:hidden" />
            <div className="absolute inset-x-0 bottom-0 h-40 sm:h-52 z-10 pointer-events-none bg-gradient-to-b from-transparent to-charcoal hidden md:block" />

            {/* CTAs — centered bottom */}
            <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-6">
                <a href="#menu" className="hero-elem magnetic-btn text-center bg-charcoal border border-charcoal text-cream hover:bg-cream hover:text-charcoal font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300" style={{ animationDelay: '0.51s' }}>
                    {hero.ctaMenu}
                </a>
                <a href="#prenota" className="hero-elem magnetic-btn text-center bg-flameDark hover:bg-ember text-cream font-sans font-bold py-3 px-6 sm:py-4 sm:px-8 text-sm sm:text-base rounded-full transition-colors duration-300" style={{ animationDelay: '0.63s' }}>
                    {hero.ctaPrenota}
                </a>
            </div>

        </section>
    );
};

export default Hero;
