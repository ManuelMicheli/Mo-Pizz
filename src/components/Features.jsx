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

            // ── Desktop: pinned scroll with sequential card flip + pauses ──
            mm.add('(min-width: 768px)', () => {
                const flips = gsap.utils.toArray('.flip-inner');
                const track = trackRef.current;

                // Entrance fade
                gsap.fromTo('.feature-card',
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', refreshPriority: -1 },
                    }
                );

                // Pinned timeline — 2500px scroll for smooth sequential flips
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=1800',
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                        refreshPriority: -1,
                        onUpdate: (self) => {
                            if (progressRef.current) {
                                progressRef.current.style.transform = `scaleX(${self.progress})`;
                            }
                        },
                    },
                });

                // Subtle horizontal slide spanning entire timeline
                tl.fromTo(track,
                    { xPercent: 1 },
                    { xPercent: -1, duration: 1, ease: 'none' },
                    0
                );

                // Flip cards one by one with ~0.5s perceived pause between each
                const flipDur = 0.07;   // fast clean flip
                const stride  = 0.17;   // spacing: flip + pause
                const startAt = 0.08;   // initial hold showing all B&W

                flips.forEach((flip, i) => {
                    tl.to(flip, {
                        rotateY: 180,
                        duration: flipDur,
                        ease: 'power2.inOut',
                    }, startAt + i * stride);
                });
            });

            // ── Mobile: scroll-triggered entrance + sequential flip ──
            mm.add('(max-width: 767px)', () => {
                gsap.fromTo('.feature-card',
                    { y: 40, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                    }
                );

                gsap.utils.toArray('.flip-inner').forEach((inner, i) => {
                    gsap.to(inner, {
                        rotateY: 180,
                        ease: 'power2.inOut',
                        duration: 0.6,
                        scrollTrigger: {
                            trigger: inner.closest('.feature-card'),
                            start: 'top 60%',
                            end: 'top 30%',
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
        <section id="features" ref={sectionRef} className="py-24 sm:py-32 bg-charcoal relative overflow-hidden z-10">
            <div className="w-full flex flex-col">
                {/* Header */}
                <div className="flex flex-col items-center text-center mb-16 px-6 sm:px-12">
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
                <div className="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto">
                    <div
                        ref={trackRef}
                        className="flex flex-col md:flex-row md:h-[600px] w-full gap-1 sm:gap-1.5 md:gap-4"
                        style={{ willChange: 'transform' }}
                    >
                        {positions.map((pos, i) => (
                            <div
                                key={i}
                                className="feature-card relative overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] h-44 sm:h-52 md:h-auto"
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
                    <div className="hidden md:flex justify-center mt-10">
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
                            .accordion-front[data-pos="0%"],   .accordion-back[data-pos="0%"]   { background-size: 500% 100%; background-position: 0% center; }
                            .accordion-front[data-pos="25%"],  .accordion-back[data-pos="25%"]  { background-size: 500% 100%; background-position: 25% center; }
                            .accordion-front[data-pos="50%"],  .accordion-back[data-pos="50%"]  { background-size: 500% 100%; background-position: 50% center; }
                            .accordion-front[data-pos="75%"],  .accordion-back[data-pos="75%"]  { background-size: 500% 100%; background-position: 75% center; }
                            .accordion-front[data-pos="100%"], .accordion-back[data-pos="100%"] { background-size: 500% 100%; background-position: 100% center; }
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
