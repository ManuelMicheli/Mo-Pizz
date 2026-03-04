import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        number: '01',
        title: 'Scegli',
        description: 'Seleziona la gift card perfetta tra le nostre tre esperienze curate.',
    },
    {
        number: '02',
        title: 'Personalizza',
        description: 'Contattaci su WhatsApp e aggiungi il tuo messaggio di auguri personale.',
    },
    {
        number: '03',
        title: 'Regala',
        description: 'Ricevi la gift card digitale, pronta da inviare o stampare per l\'occasione.',
    },
    {
        number: '04',
        title: 'Vivi l\'Esperienza',
        description: 'Il destinatario si presenta da noi e vive la magia della vera pizza napoletana.',
    },
];

const GiftCardsHowItWorks = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.fromTo(
                '.gc-step-header',
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 80%',
                    },
                }
            );

            gsap.fromTo(
                '.gc-step',
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    stagger: 0.15,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: '.gc-step-grid',
                        start: 'top 80%',
                    },
                }
            );

        }, sectionRef);
        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative bg-charcoal pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-8 md:px-12 overflow-hidden -mt-px">
            {/* Diagonal transition from flame — uses vw height to stay parallel to the cream→flame diagonal */}
            <div
                className="absolute top-0 left-0 right-0 bg-flame"
                style={{
                    height: '6vw',
                    clipPath: 'polygon(0 0, 100% 0, 100% 1%, 0 100%)',
                }}
            />

            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="text-center mb-20 sm:mb-28">
                    <span className="gc-step-header font-mono text-xs uppercase tracking-[0.3em] text-flame">
                        Come Funziona
                    </span>
                    <h2 className="gc-step-header font-playfair font-black text-cream text-[clamp(2rem,5vw,4rem)] leading-tight mt-4">
                        Quattro semplici passi
                    </h2>
                    <div className="gc-step-header w-16 h-[2px] bg-flame mx-auto mt-6" />
                </div>

                {/* Steps — Desktop */}
                <div className="gc-step-grid relative hidden md:grid grid-cols-4 gap-0">

                    {steps.map((step, i) => (
                        <div key={i} className="gc-step relative z-10 flex flex-col items-center text-center px-4">
                            {/* Large number */}
                            <div className="mb-8">
                                <span className="font-playfair font-black text-[5rem] leading-none text-flame select-none">
                                    {step.number}
                                </span>
                            </div>

                            {/* Title */}
                            <h3 className="font-playfair font-bold text-cream text-xl sm:text-2xl mb-3">
                                {step.title}
                            </h3>

                            {/* Description */}
                            <p className="font-sans text-smoke text-sm leading-relaxed max-w-[220px]">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Steps — Mobile */}
                <div className="gc-step-grid relative md:hidden">

                    <div className="flex flex-col gap-12">
                        {steps.map((step, i) => (
                            <div key={i} className="gc-step relative z-10 flex items-start gap-6">
                                {/* Number + dot */}
                                <div className="flex flex-col items-center flex-shrink-0 w-[3.3rem]">
                                    <span className="font-playfair font-black text-4xl leading-none text-flame select-none">
                                        {step.number}
                                    </span>
                                </div>

                                {/* Content */}
                                <div className="pt-0.5">
                                    <h3 className="font-playfair font-bold text-cream text-xl mb-2">
                                        {step.title}
                                    </h3>
                                    <p className="font-sans text-smoke text-sm leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default GiftCardsHowItWorks;
