import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flame, Leaf, Thermometer, ShieldCheck } from 'lucide-react';
import { LinesPatternCard, LinesPatternCardBody } from '@/components/ui/LinesPatternCard';
import { siteContent } from '@/data/copy';

gsap.registerPlugin(ScrollTrigger);

const icons = [Flame, Leaf, Thermometer, ShieldCheck];

const OrdPerche = () => {
    const { ordina } = siteContent;
    const usps = ordina.perche.usps.map((u, i) => ({ ...u, icon: icons[i] }));
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.usp-heading', {
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
        <section ref={sectionRef} className="py-24 sm:py-36 px-4 sm:px-8 md:px-12 lg:px-20 bg-charcoal">
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-16 sm:mb-20 usp-heading">
                    <span className="font-caveat text-gold text-2xl sm:text-3xl">{ordina.perche.eyebrow}</span>
                    <h2 className="font-playfair font-bold text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        {ordina.perche.headline}
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                    {usps.map((usp, i) => (
                        <LinesPatternCard
                            key={usp.num}
                            className="bg-white/5 border-white/10"
                            patternClassName="bg-lines-pattern"
                            gradientClassName="from-charcoal/80 via-charcoal/40 to-transparent"
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                        >
                            <LinesPatternCardBody className="flex flex-col gap-5 relative">
                                <span className="absolute top-0 right-0 font-mono text-7xl sm:text-8xl font-black text-flame/8 leading-none select-none pointer-events-none">
                                    {usp.num}
                                </span>
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-flame/15 flex items-center justify-center relative z-10">
                                    <usp.icon className="text-flame" size={28} />
                                </div>
                                <h3 className="font-sans font-bold text-cream text-lg sm:text-xl uppercase tracking-wide relative z-10">
                                    {usp.title}
                                </h3>
                                <p className="font-sans text-smoke text-base sm:text-lg leading-relaxed relative z-10">
                                    {usp.desc}
                                </p>
                            </LinesPatternCardBody>
                        </LinesPatternCard>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OrdPerche;
