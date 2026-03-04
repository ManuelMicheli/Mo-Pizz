import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Clock, Timer, MapPin, CreditCard } from 'lucide-react';
import { LinesPatternCard, LinesPatternCardBody } from '@/components/ui/LinesPatternCard';

gsap.registerPlugin(ScrollTrigger);

const infoCards = [
    {
        icon: Clock,
        title: 'Orari Asporto',
        lines: [
            'Lunedì: Chiuso',
            'Mar – Gio: 18:00 – 22:30',
            'Ven – Sab: 12:00 – 14:30 / 18:00 – 22:30',
            'Domenica: 18:00 – 22:30',
        ],
    },
    {
        icon: Timer,
        title: 'Tempo di Preparazione',
        lines: ['Circa 20–30 minuti', 'dalla conferma dell\'ordine.'],
    },
    {
        icon: MapPin,
        title: 'Dove Ritirare',
        lines: ['Via Cadore 4, Legnano (MI)'],
        link: {
            href: 'https://maps.google.com/?q=Mo+Pizz+Via+Cadore+4+Legnano',
            label: 'Apri in Google Maps →',
        },
    },
    {
        icon: CreditCard,
        title: 'Pagamento',
        lines: ['Online con carta di credito/debito', 'oppure in pizzeria al ritiro.'],
    },
];

const OrdInfoPratiche = () => {
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
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="py-24 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-flour">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16 sm:mb-20 info-heading">
                    <span className="font-caveat text-flame text-2xl sm:text-3xl">Info utili</span>
                    <h2 className="font-playfair font-bold text-charcoal text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        Informazioni Pratiche
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    {infoCards.map((card, i) => (
                        <LinesPatternCard
                            key={card.title}
                            className="bg-white border-smoke/10 shadow-xl shadow-charcoal/5"
                            patternClassName="bg-lines-pattern-light"
                            gradientClassName="from-white/80 via-white/40 to-transparent"
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                        >
                            <LinesPatternCardBody className="flex flex-col gap-5">
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-flame/10 flex items-center justify-center">
                                    <card.icon className="text-flame" size={28} />
                                </div>
                                <h3 className="font-sans font-bold text-charcoal text-lg sm:text-xl uppercase tracking-wide">
                                    {card.title}
                                </h3>
                                <div className="flex flex-col gap-1.5 font-sans text-smoke text-base sm:text-lg leading-relaxed">
                                    {card.lines.map((line, j) => (
                                        <span key={j}>{line}</span>
                                    ))}
                                    {card.link && (
                                        <a
                                            href={card.link.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-flame hover:text-ember font-medium mt-2 transition-colors"
                                        >
                                            {card.link.label}
                                        </a>
                                    )}
                                </div>
                            </LinesPatternCardBody>
                        </LinesPatternCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrdInfoPratiche;
