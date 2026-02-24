import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Features = () => {
    const containerRef = useRef(null);

    // Entrance Animation
    useEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo('.feature-card',
                { y: 60, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 75%",
                    },
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }, containerRef);
        return () => ctx.revert();
    }, []);

    const cards = [
        { id: 1, title: 'Lievito Madre', position: '0%' },
        { id: 2, title: 'Impasto Artigianale', position: '25%' },
        { id: 3, title: 'Ingredienti DOP', position: '50%' },
        { id: 4, title: 'Forno a Legna', position: '75%' },
        { id: 5, title: 'Vera Napoletana', position: '100%' },
    ];

    return (
        <section id="features" ref={containerRef} className="py-24 sm:py-32 bg-charcoal relative overflow-hidden">
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

                {/* 5-Card Continuous Flex Container */}
                <div className="w-full px-4 sm:px-8 md:px-12 max-w-[1400px] mx-auto">
                    <div className="flex flex-col md:flex-row md:h-[600px] w-full gap-1.5 sm:gap-2 md:gap-4 group-container hover:gap-2">
                        {cards.map((card, index) => (
                            <div
                                key={card.id}
                                className="feature-card split-accordion-card relative overflow-hidden rounded-2xl sm:rounded-[2rem] md:rounded-[3rem] bg-charcoal/50 h-28 sm:h-32 md:h-auto"
                            >
                                {/* Background split layer */}
                                <div
                                    className="absolute inset-0 bg-no-repeat accordion-bg"
                                    style={{
                                        backgroundImage: `url('/images/wmremove-transformed.png')`
                                    }}
                                />

                                {/* Removed text and overlay to show clean image */}
                            </div>
                        ))}
                    </div>

                    <style>{`
                        .split-accordion-card {
                            flex: 1;
                        }

                        /* Background position logic */
                        @media (min-width: 768px) {
                            .split-accordion-card:nth-child(1) .accordion-bg { background-size: 500% 100%; background-position: 0% center; }
                            .split-accordion-card:nth-child(2) .accordion-bg { background-size: 500% 100%; background-position: 25% center; }
                            .split-accordion-card:nth-child(3) .accordion-bg { background-size: 500% 100%; background-position: 50% center; }
                            .split-accordion-card:nth-child(4) .accordion-bg { background-size: 500% 100%; background-position: 75% center; }
                            .split-accordion-card:nth-child(5) .accordion-bg { background-size: 500% 100%; background-position: 100% center; }
                        }
                        @media (max-width: 767px) {
                            .split-accordion-card:nth-child(1) .accordion-bg { background-size: 100% 500%; background-position: center 0%; }
                            .split-accordion-card:nth-child(2) .accordion-bg { background-size: 100% 500%; background-position: center 25%; }
                            .split-accordion-card:nth-child(3) .accordion-bg { background-size: 100% 500%; background-position: center 50%; }
                            .split-accordion-card:nth-child(4) .accordion-bg { background-size: 100% 500%; background-position: center 75%; }
                            .split-accordion-card:nth-child(5) .accordion-bg { background-size: 100% 500%; background-position: center 100%; }
                        }
                    `}</style>
                </div>
            </div>
        </section>
    );
};

export default Features;
