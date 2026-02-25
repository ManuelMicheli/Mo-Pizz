import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const sectionRef = useRef(null);
    const cardsRef = useRef(null);
    const trackRef = useRef(null);
    const progressRef = useRef(null);

    const [isMobile, setIsMobile] = useState(false);

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
                        scrollTrigger: { trigger: cardsRef.current, start: 'top 75%' },
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
                y: 40, opacity: 0, scale: 0.98, duration: 1, ease: 'power3.out',
                scrollTrigger: { trigger: '.features-video', start: 'top 80%' },
            });

            // ── Mobile: animate header + image ──
            mm.add('(max-width: 767px)', () => {
                gsap.from('.features-header', {
                    y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
                });
                gsap.from('.features-mobile-img', {
                    y: 40, opacity: 0, scale: 0.97, duration: 1, ease: 'power3.out',
                    scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' },
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const positions = ['0%', '25%', '50%', '75%', '100%'];

    return (
        <section id="features" ref={sectionRef} className="bg-charcoal relative z-10">
            {/* Header + Video */}
            <div className="pt-24 sm:pt-32 w-full flex flex-col">
                {/* Header */}
                <div className="features-header flex flex-col items-center text-center mb-16 px-6 sm:px-12">
                    <div className="font-caveat text-gold text-2xl sm:text-3xl mb-4">
                        Chi Siamo
                    </div>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl text-balance">
                        Passione e Tradizione
                    </h2>
                    <p className="font-sans text-smoke text-lg mt-6 max-w-2xl">
                        Un unico, ininterrotto processo di creazione.
                    </p>
                </div>

                {/* Video section */}
                <div className="features-video relative w-full h-[50dvh] overflow-hidden">
                    <div className="relative w-full h-full overflow-hidden">
                        <video
                            autoPlay
                            muted
                            loop
                            playsInline
                            preload="metadata"
                            poster="/images/wmremove-transformed-gallery.png"
                            className="absolute inset-0 w-full h-full object-cover scale-[1.02]"
                            style={{ filter: 'contrast(1.08) brightness(0.95) saturate(0.85)' }}
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
                        <div
                            className="absolute inset-0 pointer-events-none opacity-[0.045]"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                                backgroundSize: '256px 256px',
                            }}
                        />
                        {/* Content — bottom-right */}
                        <div className="absolute bottom-8 left-0 right-0 px-6 sm:left-auto sm:right-12 sm:px-0 md:right-20 lg:right-32 z-10 flex flex-col items-center text-center sm:items-end sm:text-right sm:max-w-[440px]">
                            <span className="font-caveat text-gold text-lg sm:text-xl md:text-2xl mb-3">
                                Dal 2016, Legnano
                            </span>
                            <h2 className="font-playfair font-black text-cream text-[clamp(1.6rem,4vw,3.5rem)] leading-[0.95] mb-1">
                                Ogni pizza è un racconto
                            </h2>
                            <h2 className="font-playfair font-black italic text-flame text-[clamp(1.8rem,5vw,4.5rem)] leading-[0.95] mb-4">
                                scritto col fuoco.
                            </h2>
                            <p className="font-sans text-smoke text-[clamp(0.75rem,1.1vw,1rem)] max-w-sm leading-relaxed">
                                48 ore di doppia lievitazione. Farine selezionate.<br />
                                Ingredienti DOP, IGP, Slow Food.<br />
                                Il menu di Cristian Moschiano, classe '94.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Mobile: Single color image */}
                {isMobile && (
                    <div className="w-full px-4 mt-16">
                        <div className="features-mobile-img rounded-2xl overflow-hidden">
                            <img
                                src="/images/wmremove-transformed (43).png"
                                alt="Chi Siamo — Mo Pizz"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop: Pinned Accordion Cards — outside flex, direct child of section */}
            {!isMobile && (
                <div ref={cardsRef} className="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto py-24 bg-charcoal">
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

            {/* Background position styles */}
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
        </section>
    );
};

export default Features;
