import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { siteContent } from '@/data/copy';

const GiftCardsFaq = () => {
    const { giftCards } = siteContent;
    const faqs = giftCards.faq.items;
    const [openIndex, setOpenIndex] = useState(null);

    const toggle = (i) => {
        setOpenIndex((prev) => (prev === i ? null : i));
    };

    return (
        <section className="bg-charcoal py-20 sm:py-28 px-4 sm:px-8 md:px-12">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-14 sm:mb-20">
                    <span className="font-caveat text-gold text-xl sm:text-2xl">
                        {giftCards.faq.eyebrow}
                    </span>
                    <h2 className="font-playfair font-black text-cream text-[clamp(1.8rem,4vw,3.5rem)] leading-tight mt-3">
                        {giftCards.faq.headline}
                    </h2>
                </div>

                {/* Accordion */}
                <div className="flex flex-col gap-3">
                    {faqs.map((faq, i) => (
                        <div
                            key={i}
                            className={cn(
                                'rounded-[2rem] border transition-colors duration-300 overflow-hidden',
                                openIndex === i
                                    ? 'bg-[#222] border-flame/20'
                                    : 'bg-[#1a1a1a] border-smoke/10 hover:border-smoke/20'
                            )}
                        >
                            <button
                                onClick={() => toggle(i)}
                                className="w-full flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6 text-left"
                            >
                                <span className="font-sans font-medium text-cream text-base sm:text-lg pr-4">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={20}
                                    className={cn(
                                        'flex-shrink-0 text-smoke transition-transform duration-300',
                                        openIndex === i && 'rotate-180 text-flame'
                                    )}
                                />
                            </button>
                            <AnimatePresence>
                                {openIndex === i && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                                        className="overflow-hidden"
                                    >
                                        <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                                            <p className="font-sans text-smoke text-sm sm:text-base leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GiftCardsFaq;
