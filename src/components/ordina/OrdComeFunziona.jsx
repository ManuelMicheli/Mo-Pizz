'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

const OrdComeFunziona = () => {
    const { ordina } = siteContent;
    const steps = ordina.comeFunziona.steps;

    return (
        <section className="w-full bg-flour">
            <div className="grid grid-cols-1 sm:grid-cols-3">
                {steps.map((step, i) => (
                    <motion.div
                        key={step.num}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                        className={cn(
                            'relative border border-white/10 bg-charcoal p-5 sm:p-6',
                            'flex flex-col justify-between group transition-all duration-500',
                            'hover:bg-charcoal/80'
                        )}
                    >
                        <span className="font-mono text-cream/50 text-[10px] tracking-[0.15em] uppercase">
                            {step.num}
                        </span>
                        <div>
                            <h3 className="font-sans font-bold text-cream text-base sm:text-lg lg:text-xl tracking-tight mb-2">
                                {step.title}
                            </h3>
                            <p className="font-sans text-cream/70 text-xs sm:text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default OrdComeFunziona;
