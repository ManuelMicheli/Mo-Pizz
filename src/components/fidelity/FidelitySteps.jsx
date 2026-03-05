import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Coins, Gift, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/copy';

const iconMap = {
    UserPlus,
    Coins,
    Gift,
};

const FidelitySteps = () => {
    const { fidelity } = siteContent;
    return (
        <section className="w-full py-28 sm:py-40 bg-charcoal relative overflow-hidden">
            {/* Subtle top gradient */}
            <div
                className="absolute top-0 left-0 w-full h-px"
                style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(212,168,83,0.2) 50%, transparent 100%)',
                }}
            />

            {/* Full-width container */}
            <div className="w-full max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-20 sm:mb-28"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                >
                    <span className="font-mono text-gold/60 text-xs sm:text-sm tracking-[0.3em] uppercase">
                        {fidelity.stepsHeader.eyebrow}
                    </span>
                    <h2 className="font-playfair font-bold text-cream text-[clamp(2rem,5vw,4rem)] mt-4 leading-tight">
                        {fidelity.stepsHeader.headline}
                    </h2>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-gold/40 to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Steps — horizontal full-width on desktop */}
                <div className="relative">
                    {/* Connecting line — desktop only */}
                    <div className="hidden lg:block absolute top-[3.5rem] left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-gradient-to-r from-gold/0 via-gold/20 to-gold/0 z-0" />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-0">
                        {fidelity.steps.map((step, i) => {
                            const Icon = iconMap[step.icon];
                            const isLast = i === fidelity.steps.length - 1;

                            return (
                                <motion.div
                                    key={step.num}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.8, ease: 'easeOut', delay: i * 0.2 }}
                                    className="relative flex flex-col items-center text-center px-4 lg:px-10"
                                >
                                    {/* Step number + icon circle */}
                                    <div className="relative z-10 mb-8">
                                        <div className="w-[7rem] h-[7rem] rounded-full border border-gold/20 bg-charcoal flex items-center justify-center relative group">
                                            {/* Glow on hover */}
                                            <div className="absolute inset-0 rounded-full bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            <Icon size={32} className="text-gold/70 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                                        </div>
                                        {/* Step number badge */}
                                        <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
                                            <span className="font-mono text-gold text-xs font-bold">{step.num}</span>
                                        </div>
                                    </div>

                                    {/* Arrow between steps — desktop only */}
                                    {!isLast && (
                                        <div className="hidden lg:flex absolute top-[3.25rem] right-0 translate-x-1/2 z-10 w-8 h-8 rounded-full bg-charcoal border border-gold/20 items-center justify-center">
                                            <ArrowRight size={14} className="text-gold/50" />
                                        </div>
                                    )}

                                    {/* Text content */}
                                    <h3 className="font-sans font-bold text-cream text-lg sm:text-xl tracking-wide uppercase mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="font-sans text-smoke/70 text-[0.95rem] leading-relaxed max-w-[20rem]">
                                        {step.desc}
                                    </p>

                                    {/* Mobile arrow between steps */}
                                    {!isLast && (
                                        <div className="lg:hidden flex items-center justify-center mt-8">
                                            <div className="w-10 h-10 rounded-full border border-gold/15 flex items-center justify-center rotate-90">
                                                <ArrowRight size={16} className="text-gold/40" />
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Stat bar */}
                <motion.div
                    className="mt-20 sm:mt-28 w-full"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-white/[0.04] rounded-[2rem] overflow-hidden border border-white/[0.06]">
                        {[
                            { value: '10€', label: 'spesi = 1 punto' },
                            { value: '10', label: 'punti = 10% sconto' },
                            { value: '0€', label: 'costo iscrizione' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-center gap-4 py-8 sm:py-10 px-6 bg-charcoal hover:bg-white/[0.02] transition-colors duration-300"
                            >
                                <span className="font-playfair font-bold text-gold text-3xl sm:text-4xl">{stat.value}</span>
                                <span className="font-sans text-smoke/70 text-sm sm:text-base">{stat.label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FidelitySteps;
