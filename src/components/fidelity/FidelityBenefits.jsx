import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

const FidelityBenefits = () => {
    const { fidelity } = siteContent;
    return (
        <section className="w-full bg-flour">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {fidelity.benefits.map((benefit, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.08 }}
                        className={cn(
                            'relative border border-charcoal/20 bg-gold p-5 sm:p-6',
                            'flex flex-col justify-between group transition-all duration-500',
                            'hover:bg-gold/90'
                        )}
                    >
                        <span className="font-mono text-charcoal/50 text-[10px] tracking-[0.15em] uppercase">
                            0{i + 1}
                        </span>
                        <div>
                            <h3 className="font-sans font-bold text-charcoal text-base sm:text-lg lg:text-xl tracking-tight mb-2">
                                {benefit.title}
                            </h3>
                            <p className="font-sans text-charcoal/70 text-xs sm:text-sm leading-relaxed">
                                {benefit.desc}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default FidelityBenefits;
