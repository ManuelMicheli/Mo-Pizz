'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Instagram, Heart } from 'lucide-react';
import { instagramPosts } from '@/data/instagramData';
import { siteContent } from '@/data/copy';

const { instagram } = siteContent;

if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

const InstagramGallery = () => {
    const instagramRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            if (!instagramRef.current) return;
            gsap.from('.ig-header', {
                y: 24, opacity: 0, duration: 1.1, ease: 'expo.out',
                force3D: true,
                scrollTrigger: { trigger: instagramRef.current, start: 'top 88%' },
            });
            gsap.from('.ig-card', {
                y: 30, opacity: 0, duration: 1.1, stagger: 0.06, ease: 'expo.out',
                force3D: true,
                scrollTrigger: { trigger: instagramRef.current, start: 'top 80%' },
            });
        }, instagramRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={instagramRef} className="w-full py-16 sm:py-20 md:py-24 bg-charcoal relative z-10">
            {/* Header */}
            <div className="ig-header max-w-3xl mx-auto px-6 text-center mb-12 sm:mb-16">
                <span className="inline-flex items-center gap-2 font-caveat text-gold text-xl sm:text-2xl mb-3">
                    <Instagram className="w-5 h-5" />
                    {instagram.handle}
                </span>
                <h3 className="font-playfair text-cream text-[clamp(2rem,4.4vw,3.5rem)] leading-[1.05]">
                    {(() => {
                        const [head, ...rest] = instagram.eyebrow.split(',');
                        return (
                            <>
                                {head}
                                {rest.length > 0 && (
                                    <span className="italic text-flame">,{rest.join(',')}</span>
                                )}
                            </>
                        );
                    })()}
                </h3>
                <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 mt-6">
                    {instagram.highlights.map((item, i) => (
                        <li key={item} className="flex items-center gap-x-3">
                            {i > 0 && <span className="w-1 h-1 rounded-full bg-flame/70" aria-hidden="true" />}
                            <span className="font-sans text-smoke text-sm sm:text-base tracking-wide">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
                <a
                    href="https://www.instagram.com/mo_pizz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="magnetic-btn mt-8 inline-flex items-center gap-2 px-7 py-3 rounded-full text-white font-sans text-sm font-semibold shadow-lg shadow-black/30 hover:brightness-110 transition-all"
                    style={{ background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
                >
                    <Instagram className="w-4 h-4" />
                    {instagram.cta}
                </a>
            </div>

            {/* Infinite marquee carousel (right to left = reverse of reviews) */}
            <div className="relative overflow-hidden">
                {/* Edge fades */}
                <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 z-10 pointer-events-none"
                     style={{ background: 'linear-gradient(to right, #1A1A1A, transparent)' }} />
                <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-20 md:w-28 z-10 pointer-events-none"
                     style={{ background: 'linear-gradient(to left, #1A1A1A, transparent)' }} />

                {/* Marquee track — tripled for seamless loop */}
                <div className="flex gap-4 w-max animate-marquee-reverse hover:[animation-play-state:paused]">
                    {[0, 1, 2].map((set) =>
                        instagramPosts.map((post) => (
                            <a
                                key={`${set}-${post.id}`}
                                href={post.postUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="ig-card flex-shrink-0 relative rounded-[2rem] overflow-hidden group w-[55vw] sm:w-[35vw] md:w-[25vw] lg:w-[18vw] xl:w-[15vw] aspect-square"
                            >
                                <img
                                    src={post.image}
                                    alt={post.alt}
                                    loading="lazy"
                                    decoding="async"
                                    draggable={false}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                                />
                                {/* Hover overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                    <Heart className="w-7 h-7 text-white" />
                                </div>
                            </a>
                        ))
                    )}
                </div>
            </div>
        </section>
    );
};

export default InstagramGallery;
