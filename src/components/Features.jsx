import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);
    const carouselRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);
    const [activeCard, setActiveCard] = useState(0);

    // Mobile detection
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
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
                    { y: 50, opacity: 0 },
                    {
                        y: 0, opacity: 1, duration: 0.8, stagger: 0.06, ease: 'power3.out',
                        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
                    }
                );

                // Pinned timeline
                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
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

            // ── Mobile: only animate header ──
            mm.add('(max-width: 767px)', () => {
                gsap.from('.features-header', {
                    y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // IntersectionObserver for mobile flip effect
    useEffect(() => {
        if (!isMobile) return;
        const carousel = carouselRef.current;
        if (!carousel) return;

        const cards = carousel.querySelectorAll('.chi-siamo-card');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const flipInner = entry.target.querySelector('.flip-inner');
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
                        flipInner?.classList.add('flipped');
                        const idx = Number(entry.target.dataset.cardIndex);
                        if (!isNaN(idx)) setActiveCard(idx);
                    } else {
                        flipInner?.classList.remove('flipped');
                    }
                });
            },
            { root: carousel, threshold: 0.6 }
        );

        cards.forEach((card) => observer.observe(card));
        return () => observer.disconnect();
    }, [isMobile]);

    const positions = ['0%', '25%', '50%', '75%', '100%'];

    return (
        <section id="features" ref={sectionRef} className="py-24 sm:py-32 bg-charcoal relative overflow-hidden z-10">
            <div className="w-full flex flex-col">
                {/* Header */}
                <div className="features-header flex flex-col items-center text-center mb-16 px-6 sm:px-12">
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

                {/* Mobile: Horizontal Carousel */}
                {isMobile ? (
                    <div className="w-full">
                        <div ref={carouselRef} className="chi-siamo-carousel">
                            {positions.map((pos, i) => (
                                <div
                                    key={i}
                                    className="chi-siamo-card rounded-2xl overflow-hidden"
                                    data-card-index={i}
                                    style={{ perspective: '1200px' }}
                                >
                                    <div className="chi-siamo-flip-inner flip-inner relative w-full h-[50vh]" style={{ willChange: 'transform' }}>
                                        {/* Front — B&W */}
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
                                        {/* Back — Color */}
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

                        {/* Dot indicator */}
                        <div className="flex justify-center gap-2 mt-6">
                            {positions.map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        i === activeCard ? 'bg-flame w-6' : 'bg-cream/20'
                                    }`}
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    /* Desktop: Original Accordion */
                    <div className="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto">
                        <div
                            ref={trackRef}
                            className="flex flex-row md:h-[600px] w-full gap-4"
                            style={{ willChange: 'transform' }}
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

                {/* Background position styles — keep both media queries */}
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
        </section>
    );
};

export default Features;
