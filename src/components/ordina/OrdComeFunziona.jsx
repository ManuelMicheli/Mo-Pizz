import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, CreditCard, MapPin } from 'lucide-react';
import { LinesPatternCard, LinesPatternCardBody } from '@/components/ui/LinesPatternCard';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        icon: ShoppingBag,
        title: 'Scegli',
        desc: 'Sfoglia il menu e componi il tuo ordine con pochi tap.',
    },
    {
        num: '02',
        icon: CreditCard,
        title: 'Ordina',
        desc: 'Conferma e paga online in modo sicuro su Plateform.',
    },
    {
        num: '03',
        icon: MapPin,
        title: 'Ritira',
        desc: 'Passa in pizzeria all\'orario indicato e ritira il tuo ordine caldo.',
    },
];

const OrdComeFunziona = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.step-heading', {
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
                <div className="text-center mb-16 sm:mb-20 step-heading">
                    <span className="font-caveat text-flame text-2xl sm:text-3xl">Semplice e veloce</span>
                    <h2 className="font-playfair font-bold text-charcoal text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        Come Funziona
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                    {steps.map((step, i) => (
                        <LinesPatternCard
                            key={step.num}
                            className="bg-white border-smoke/10 shadow-xl shadow-charcoal/5"
                            patternClassName="bg-lines-pattern-light"
                            gradientClassName="from-white/80 via-white/40 to-transparent"
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.12 }}
                        >
                            <LinesPatternCardBody className="flex flex-col items-center text-center gap-5 py-10 md:py-14">
                                <span className="font-mono text-7xl sm:text-8xl font-black text-flame/10 leading-none">
                                    {step.num}
                                </span>
                                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-flame/10 flex items-center justify-center">
                                    <step.icon className="text-flame" size={32} />
                                </div>
                                <h3 className="font-sans font-bold text-charcoal text-xl sm:text-2xl uppercase tracking-wide">
                                    {step.title}
                                </h3>
                                <p className="font-sans text-smoke text-base sm:text-lg leading-relaxed max-w-xs">
                                    {step.desc}
                                </p>
                            </LinesPatternCardBody>
                        </LinesPatternCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrdComeFunziona;
