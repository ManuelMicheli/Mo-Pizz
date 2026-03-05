import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Timer, MapPin, CreditCard } from 'lucide-react';
import { siteContent } from '@/data/copy';

gsap.registerPlugin(ScrollTrigger);

const icons = [Clock, Timer, MapPin, CreditCard];

const OrdInfoPratiche = () => {
    const { ordina } = siteContent;
    const infoCards = ordina.infoPratiche.cards.map((c, i) => ({ ...c, icon: icons[i] }));
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.info-heading', {
                y: 30,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });
            gsap.from('.info-card', {
                y: 40,
                opacity: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.info-cards-grid',
                    start: 'top 85%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-charcoal">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16 sm:mb-20 info-heading">
                    <span className="font-caveat text-gold text-2xl sm:text-3xl">{ordina.infoPratiche.eyebrow}</span>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        {ordina.infoPratiche.headline}
                    </h2>
                </div>

                <div className="info-cards-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
                    {infoCards.map((card) => (
                        <div
                            key={card.title}
                            className="info-card bg-white rounded-[2rem] p-6 sm:p-8 flex flex-col gap-5"
                        >
                            <div className="w-12 h-12 rounded-full bg-flame/15 flex items-center justify-center">
                                <card.icon className="text-flame" size={24} />
                            </div>
                            <h3 className="font-sans font-bold text-charcoal text-base sm:text-lg tracking-tight">
                                {card.title}
                            </h3>
                            <div className="flex flex-col gap-1 font-sans text-smoke/80 text-sm leading-relaxed">
                                {card.lines.map((line, j) => (
                                    <span key={j}>{line}</span>
                                ))}
                                {card.link && (
                                    <a
                                        href={card.link.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-flame hover:text-gold font-medium mt-2 transition-colors"
                                    >
                                        {card.link.label}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrdInfoPratiche;
