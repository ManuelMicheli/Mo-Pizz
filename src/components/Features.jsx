'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteContent } from '@/data/copy';

const { chiSiamoVideo } = siteContent;

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    const [isMobile, setIsMobile] = useState(() =>
        typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window)
    );

    // Mobile detection — debounced resize
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
        check();
        let t;
        const onResize = () => {
            clearTimeout(t);
            t = setTimeout(check, 150);
        };
        window.addEventListener('resize', onResize, { passive: true });
        return () => {
            clearTimeout(t);
            window.removeEventListener('resize', onResize);
        };
    }, []);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // ── Desktop: pinned horizontal scroll + flip ──
            mm.add('(min-width: 768px)', () => {
                const flips = gsap.utils.toArray('.flip-inner');
                const track = trackRef.current;

                // Entrance fade
                gsap.fromTo('.feature-card',
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 1.3, stagger: 0.06, ease: 'expo.out',
                        force3D: true,
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 80%' },
                    }
                );

                // Pinned timeline
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: cardsRef.current,
                        start: 'center center',
                        end: '+=900',
                        pin: true,
                        scrub: 0.5,
                        anticipatePin: 1,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`;
                            }
                        },
                    },
                });

                // Subtle horizontal slide of the card group
                tl.fromTo(track,
                    { xPercent: 1.5 },
                    { xPercent: -1.5, duration: 1, ease: 'none' },
                    0
                );

                // Flip each card one by one across the timeline
                flips.forEach((flip, i) => {
                    tl.to(flip, {
                        rotateY: 180,
                        duration: 0.2,
                        ease: 'power2.inOut',
                    }, 0.05 + i * 0.16);
                });
            });

            // ── Video entrance animation ──
            gsap.from('.features-video', {
                y: 30, opacity: 0, scale: 0.98, duration: 1.3, ease: 'expo.out',
                force3D: true,
                scrollTrigger: { trigger: '.features-video', start: 'top 85%' },
            });

            // ── Mobile: animate header + image ──
            mm.add('(max-width: 767px)', () => {
                gsap.from('.features-header', {
                    y: 24, opacity: 0, duration: 1.1, ease: 'expo.out',
                    force3D: true,
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const positions = ['0%', '25%', '50%', '75%', '100%'];

    return (
        <section id="features" ref={sectionRef} className="bg-charcoal relative z-10">
            {/* Desktop: Pinned Accordion Cards */}
            {!isMobile && (
                <div ref={cardsRef} className="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto py-24 bg-charcoal">
                    <div
                        ref={trackRef}
                        className="flex flex-row md:h-[600px] w-full gap-4"
                    >
                        {positions.map((pos, i) => (
                            <div
                                key={i}
                                className="feature-card relative overflow-hidden rounded-[3rem] h-auto"
                                style={{ flex: 1, perspective: '1200px' }}
                            >
                                <div
                                    className="flip-inner absolute inset-0"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Front — B&W spezzettata */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <div
                                            className="absolute inset-0 bg-no-repeat accordion-front"
                                            style={{ backgroundImage: `url('/images/chi-siamo-bw.webp')` }}
                                            data-pos={pos}
                                        />
                                    </div>
                                    {/* Back — Color spezzettata */}
                                    <div
                                        className="absolute inset-0"
                                        style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                                    >
                                        <div
                                            className="absolute inset-0 bg-no-repeat accordion-back"
                                            style={{ backgroundImage: `url('/images/features-chi-siamo.webp')` }}
                                            data-pos={pos}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar — desktop only */}
                    <div className="flex justify-center mt-10">
                        <div className="w-24 h-[2px] bg-cream/10 rounded-full overflow-hidden">
                            <div
                                ref={progressRef}
                                className="h-full bg-flame rounded-full origin-left"
                                style={{ transform: 'scaleX(0)' }}
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Video section */}
            <div className="w-full flex flex-col">
                <div className="features-video relative w-full h-[50dvh] overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="auto"
                            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
                            src="/videos/Pizzeria_Menu_Background_Video_Generation (1).mp4"
                        />
                        {/* Cinematic dark overlay stack */}
                        <div className="absolute inset-0 bg-black/40" />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0.7) 100%)',
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: 'linear-gradient(to bottom, rgba(10,12,18,0.35) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)',
                            }}
                        />
                        {/* Film grain */}
                        <div className="absolute inset-0 grain-texture opacity-[0.045]" />
                        {/* Content — bottom-right */}
                        <div className="absolute bottom-8 left-0 right-0 px-6 sm:left-auto sm:right-12 sm:px-0 md:right-20 lg:right-32 z-10 flex flex-col items-center text-center sm:items-end sm:text-right sm:max-w-[440px]">
                            <span className="font-caveat text-gold text-lg sm:text-xl md:text-2xl mb-3">
                                {chiSiamoVideo.eyebrow}
                            </span>
                            <h2 className="font-playfair text-cream text-[clamp(1.6rem,4vw,3.5rem)] leading-[0.95] mb-1">
                                {chiSiamoVideo.headline}
                            </h2>
                            <h2 className="font-playfair italic text-flame text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.95] mb-4">
                                {chiSiamoVideo.headlineEm}
                            </h2>
                            <p className="font-sans text-smoke text-[clamp(0.75rem,1.1vw,1rem)] max-w-sm leading-relaxed">
                                {chiSiamoVideo.body.split('\n').map((line, i) => (
                                    <React.Fragment key={i}>{line}{i < chiSiamoVideo.body.split('\n').length - 1 && <br />}</React.Fragment>
                                ))}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </section>
    );
};

export default Features;
