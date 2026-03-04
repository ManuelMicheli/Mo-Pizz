import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
    {
        question: 'Come posso acquistare una gift card?',
        answer:
            'Scegli la gift card che preferisci e clicca su "Regala Ora". Verrai reindirizzato su WhatsApp dove potrai completare l\'acquisto direttamente con il nostro team. Accettiamo pagamenti tramite bonifico o in contanti al locale.',
    },
    {
        question: 'Le gift card hanno una scadenza?',
        answer:
            'Le nostre gift card sono valide per 12 mesi dalla data di acquisto. Troverai la data di scadenza indicata sulla card stessa.',
    },
    {
        question: 'Posso personalizzare la gift card con un messaggio?',
        answer:
            'Assolutamente! Quando ci contatti su WhatsApp, comunicaci il messaggio che desideri includere. Prepareremo la gift card con la tua dedica personale.',
    },
    {
        question: 'La gift card è utilizzabile in più visite?',
        answer:
            'Sì, il credito della gift card "Esperienza Libera" può essere utilizzato in più visite fino all\'esaurimento del saldo. Le gift card "Esperienza Napoletana per Due" e "Pizza per Due" sono invece utilizzabili in un\'unica visita.',
    },
    {
        question: 'Posso regalare la gift card in formato digitale?',
        answer:
            'Certamente! Riceverai la gift card in formato digitale via WhatsApp, pronta per essere inoltrata al destinatario. Se preferisci il formato fisico, puoi ritirarla direttamente al locale.',
    },
];

const GiftCardsFaq = () => {
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
                        Hai domande?
                    </span>
                    <h2 className="font-playfair font-black text-cream text-[clamp(1.8rem,4vw,3.5rem)] leading-tight mt-3">
                        Domande Frequenti
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
