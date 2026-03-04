import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ScrollText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { fidelityRegolamento } from '@/data/fidelityData';

const FidelityRegolamento = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <section className="w-full bg-charcoal py-12 sm:py-16 px-6 sm:px-12 md:px-16 lg:px-24">
            <div className="w-full max-w-[1200px] mx-auto">
                <div
                    className={cn(
                        'rounded-[2.5rem] border transition-all duration-500 overflow-hidden',
                        isOpen
                            ? 'bg-white/[0.04] border-gold/20 shadow-xl shadow-gold/5'
                            : 'bg-white/[0.02] border-white/[0.06] hover:border-white/10'
                    )}
                >
                    <button
                        onClick={() => setIsOpen((prev) => !prev)}
                        className="w-full flex items-center justify-between px-7 sm:px-9 py-6 sm:py-7 text-left group"
                    >
                        <div className="flex items-center gap-4">
                            <ScrollText size={18} className={cn(
                                'transition-colors duration-300',
                                isOpen ? 'text-gold' : 'text-smoke/50'
                            )} />
                            <span className="font-sans font-medium text-cream text-base sm:text-lg">
                                Regolamento del Programma Fidelity
                            </span>
                        </div>
                        <ChevronDown
                            size={18}
                            className={cn(
                                'flex-shrink-0 text-smoke/50 transition-all duration-300',
                                isOpen && 'rotate-180 text-gold'
                            )}
                        />
                    </button>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="overflow-hidden"
                            >
                                <div className="px-7 sm:px-9 pb-7 sm:pb-9">
                                    <div className="w-full h-px bg-white/[0.06] mb-6" />
                                    <ol className="space-y-4">
                                        {fidelityRegolamento.map((item, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 font-sans text-smoke/60 text-sm leading-relaxed"
                                            >
                                                <span className="font-mono text-gold/40 text-xs mt-0.5 flex-shrink-0">
                                                    {String(i + 1).padStart(2, '0')}
                                                </span>
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ol>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </section>
    );
};

export default FidelityRegolamento;
