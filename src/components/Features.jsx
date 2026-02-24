import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    useEffect(() => {
        let ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // ── Desktop: horizontal scroll with pinning + sequential card flip ──
            mm.add('(min-width: 768px)', () => {
                const track = trackRef.current;
                const cards = gsap.utils.toArray('.feature-card');
                const flips = gsap.utils.toArray('.flip-inner');

                if (!track || cards.length === 0) return;

                // Calculate total scroll width
                const totalScrollWidth = track.scrollWidth - window.innerWidth;

                // Horizontal scroll tween — pin section and translateX the track
                const scrollTween = gsap.to(track, {
                    x: -totalScrollWidth,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: () => `+=${totalScrollWidth}`,
                        pin: true,
                        scrub: 0.8,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                        refreshPriority: -1,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`;
                            }
                        },
                    },
                });

                // Flip each card when it enters the viewport via containerAnimation
                flips.forEach((flip) => {
                    const card = flip.closest('.feature-card');
                    gsap.to(flip, {
                        rotateY: 180,
                        duration: 0.5,
                        ease: 'power2.inOut',
                        scrollTrigger: {
                            trigger: card,
                            containerAnimation: scrollTween,
                            start: 'left 60%',
                            end: 'left 30%',
                            scrub: 0.8,
                        },
                    });
                });
            });

            // ── Mobile: individual entrance + individual flip ──
            mm.add('(max-width: 767px)', () => {
                const cards = gsap.utils.toArray('.feature-card');

                // Individual entrance animation per card
                cards.forEach((card) => {
                    gsap.fromTo(card,
                        { y: 60, opacity: 0, scale: 0.92 },
                        {
                            y: 0, opacity: 1, scale: 1,
                            duration: 0.8, ease: 'power3.out',
                            scrollTrigger: {
                                trigger: card,
                                start: 'top 85%',
                            },
                        }
                    );
                });

                // Individual flip per card with scrub
                gsap.utils.toArray('.flip-inner').forEach((inner) => {
                    gsap.to(inner, {
                        rotateY: 180,
                        ease: 'power2.inOut',
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: inner.closest('.feature-card'),
                            start: 'top 55%',
                            end: 'top 25%',
                            scrub: 0.4,
                        },
                    });
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const positions = ['0%', '25%', '50%', '75%', '100%'];

    return (
        <section id="features" ref={sectionRef} className="py-24 sm:py-32 md:py-0 bg-charcoal relative overflow-hidden z-10">
            <div className="w-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 md:pt-24 px-6 sm:px-12">
                    <div className="font-caveat text-gold text-2xl sm:text-3xl mb-4">
                        Chi Siamo
                    </div>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl text-balance">
                        Passione, Tradizione e Fuoco
                    </h2>
                    <p className="font-sans text-smoke text-lg mt-6 max-w-2xl">
                        Un unico, ininterrotto processo di creazione.
                    </p>
                </div>

                {/* 5-Card Flip */}
                <div className="w-full px-4 sm:px-8 md:px-0 max-w-[1400px] md:max-w-none mx-auto">
                    <div
                        ref={trackRef}
                        className="flex flex-col md:flex-row md:h-[70vh] w-full md:w-max gap-1 sm:gap-1.5 md:gap-6 md:px-[10vw]"
                        style={{ willChange: 'transform' }}
                    >
                        {positions.map((pos, i) => (
                            <div
                                key={i}
                                className="feature-card relative overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] h-44 sm:h-52 md:h-auto md:w-[70vw] md:max-w-[500px] md:flex-shrink-0"
                                style={{ perspective: '1200px' }}
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
                                            style={{ backgroundImage: `url('/images/wmremove-transformed.png')` }}
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
                                            style={{ backgroundImage: `url('/images/wmremove-transformed (43).png')` }}
                                            data-pos={pos}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Progress bar — desktop only */}
                    <div className="hidden md:flex justify-center mt-10 md:pb-24">
                        <div className="w-24 h-[2px] bg-cream/10 rounded-full overflow-hidden">
                            <div
                                ref={progressRef}
                                className="h-full bg-flame rounded-full origin-left"
                                style={{ transform: 'scaleX(0)' }}
                            />
                        </div>
                    </div>

                    <style>{`
                        @media (min-width: 768px) {
                            .accordion-front, .accordion-back {
                                background-size: cover;
                                background-position: center;
                            }
                        }
                        @media (max-width: 767px) {
                            .accordion-front[data-pos="0%"],   .accordion-back[data-pos="0%"]   { background-size: 100% 500%; background-position: center 0%; }
                            .accordion-front[data-pos="25%"],  .accordion-back[data-pos="25%"]  { background-size: 100% 500%; background-position: center 25%; }
                            .accordion-front[data-pos="50%"],  .accordion-back[data-pos="50%"]  { background-size: 100% 500%; background-position: center 50%; }
                            .accordion-front[data-pos="75%"],  .accordion-back[data-pos="75%"]  { background-size: 100% 500%; background-position: center 75%; }
                            .accordion-front[data-pos="100%"], .accordion-back[data-pos="100%"] { background-size: 100% 500%; background-position: center 100%; }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default Features;
