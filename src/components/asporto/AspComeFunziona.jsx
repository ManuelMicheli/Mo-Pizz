'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

const AspComeFunziona = () => {
    const { asporto } = siteContent;
    const { steps, eyebrow, headline } = asporto.comeFunziona;

    return (
        <section className="relative w-full bg-charcoal pt-36 sm:pt-44 pb-24 sm:pb-32 px-4 sm:px-8 md:px-12 lg:px-20 overflow-hidden -mt-px">
            {/* Diagonal transition from flame — identical to gift-cards HowItWorks */}
            <div
                className="absolute top-0 left-0 right-0 bg-flame"
                style={{
                    height: '6vw',
                    clipPath: 'polygon(0 0, 100% 0, 100% 1%, 0 100%)',
                }}
            />
            <div className="max-w-[1400px] mx-auto">
                <div className="text-center mb-14 sm:mb-20">
                    <span className="font-caveat text-flame text-2xl sm:text-3xl">{eyebrow}</span>
                    <h2 className="font-playfair text-cream text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-3">
                        {headline}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                    {steps.map((step, i) => (
                        <motion.div
                            key={step.num}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.1 }}
                            className={cn(
                                'relative rounded-[2rem] border border-smoke/10 bg-[#222] p-7 sm:p-9',
                                'flex flex-col gap-5 group transition-all duration-500',
                                'hover:border-flame/40 hover:-translate-y-1 hover:shadow-xl'
                            )}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-mono text-flame text-xs tracking-[0.2em] uppercase">
                                    Step {step.num}
                                </span>
                                <span className="font-playfair italic text-cream/10 text-5xl sm:text-6xl leading-none">
                                    {step.num}
                                </span>
                            </div>
                            <div className="h-px w-12 bg-flame/60" />
                            <h3 className="font-playfair text-cream text-2xl sm:text-3xl tracking-tight">
                                {step.title}
                            </h3>
                            <p className="font-sans text-smoke text-sm sm:text-base leading-relaxed">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default AspComeFunziona;
