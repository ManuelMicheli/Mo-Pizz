import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

const FidelityFaq = () => {
    const { fidelity } = siteContent;
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="w-full bg-gold py-28 sm:py-40 px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="w-full max-w-[1200px] mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-16 sm:mb-24"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    <span className="font-mono text-charcoal/50 text-xs sm:text-sm tracking-[0.2em] uppercase">
                        {fidelity.faqHeader.eyebrow}
                    </span>
                    <h2 className="font-playfair font-bold text-charcoal text-[clamp(2rem,5vw,4rem)] leading-tight mt-4">
                        {fidelity.faqHeader.headline}
                    </h2>
                    <div className="w-16 h-[2px] bg-gradient-to-r from-transparent via-charcoal/30 to-transparent mx-auto mt-6" />
                </motion.div>

                {/* Accordion */}
                <div className="flex flex-col gap-3">
                    {fidelity.faqs.map((faq, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-30px' }}
                            transition={{ duration: 0.5, ease: 'easeOut', delay: i * 0.06 }}
                            className={cn(
                                'rounded-[1.5rem] border transition-all duration-400 overflow-hidden',
                                openIndex === i
                                    ? 'bg-charcoal border-charcoal shadow-lg shadow-charcoal/20'
                                    : 'bg-charcoal border-charcoal/80 hover:border-charcoal'
                            )}
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-7 sm:px-8 py-5 sm:py-6 text-left group"
                            >
                                <span className={cn(
                                    'font-sans font-medium text-base sm:text-lg pr-6 transition-colors duration-300',
                                    openIndex === i ? 'text-gold' : 'text-gold/80'
                                )}>
                                    {faq.question}
                                </span>
                                <div className={cn(
                                    'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300',
                                    openIndex === i
                                        ? 'bg-gold text-charcoal'
                                        : 'bg-gold/20 text-gold/60'
                                )}>
                                    {openIndex === i ? (
                                        <Minus size={15} />
                                    ) : (
                                        <Plus size={15} />
                                    )}
                                </div>
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-7 sm:px-8 pb-6 sm:pb-7">
                                            <div className="w-full h-px bg-gold/15 mb-5" />
                                            <p className="font-sans text-gold/60 text-sm sm:text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FidelityFaq;
