import React from 'react';
import Link from 'next/link';
import { Beer, Pizza, CakeSlice, Ticket, ArrowRight } from 'lucide-react';
import { siteContent } from '@/data/copy';

const { offerte, menu } = siteContent;

// Un'icona per offerta, nello stesso ordine di copy.js (martedì, mercoledì, giovedì).
const icons = [Beer, Pizza, CakeSlice];

const Offerte = () => (
    <section id="offerte" className="bg-charcoal border-t border-white/[0.04] relative overflow-hidden">
        {/* Soft flame glow backdrop — stessa firma visiva di ReviewCta */}
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
                background: 'radial-gradient(ellipse at 50% 0%, #E85D26 0%, transparent 55%)',
            }}
        />

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-12 md:px-16 lg:px-20 py-14 sm:py-20">
            {/* Header */}
            <div className="text-center mb-10 sm:mb-14">
                <span className="font-caveat text-gold text-2xl sm:text-3xl block mb-3">
                    {offerte.eyebrow}
                </span>
                <h2 className="font-playfair text-cream text-4xl sm:text-5xl md:text-6xl leading-tight">
                    {offerte.headline}{' '}
                    <em className="not-italic text-flame">{offerte.headlineEm}</em>
                </h2>
                <p className="font-sans text-cream/70 text-base sm:text-lg max-w-2xl mx-auto mt-5">
                    {offerte.body}
                </p>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
                {offerte.items.map((promo, i) => {
                    const Icon = icons[i] ?? Ticket;
                    return (
                        <article
                            key={promo.title}
                            className="group relative flex flex-col bg-white/[0.03] border border-white/10 hover:border-flame/40 rounded-[2rem] p-7 sm:p-8 transition-colors duration-500"
                        >
                            {/* Giorno + icona */}
                            <div className="flex items-center justify-between gap-3 mb-6">
                                <span className="font-mono text-[11px] uppercase tracking-widest text-flame">
                                    {promo.day}
                                </span>
                                <Icon
                                    className="w-6 h-6 text-gold/70 group-hover:text-gold transition-colors duration-500 flex-shrink-0"
                                    strokeWidth={1.5}
                                />
                            </div>

                            {/* Nome offerta */}
                            <h3 className="font-playfair text-cream text-3xl sm:text-4xl leading-none mb-4 group-hover:text-flame transition-colors duration-300">
                                {promo.title}
                            </h3>

                            {/* Prezzo / formula */}
                            <span className="self-start font-mono text-gold text-sm tabular-nums border border-gold/30 bg-gold/5 rounded-full py-1.5 px-4 mb-5">
                                {promo.price}
                            </span>

                            {/* Cosa comprende */}
                            <p className="font-sans text-smoke text-sm sm:text-base leading-relaxed">
                                {promo.desc}
                            </p>

                            {promo.note && (
                                <p className="font-sans text-smoke/70 text-xs italic leading-relaxed mt-3">
                                    {promo.note}
                                </p>
                            )}
                        </article>
                    );
                })}
            </div>

            {/* Disclaimer + coperto */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mt-8 font-sans text-xs sm:text-sm text-cream/50 text-center">
                <span>{offerte.disclaimer}</span>
                <span aria-hidden className="hidden sm:inline-block w-1 h-1 rounded-full bg-cream/30" />
                <span>{menu.copertoNote}</span>
            </div>

            {/* Club Mo Pizz */}
            <div className="mt-12 sm:mt-16 rounded-[2rem] border border-gold/20 bg-gradient-to-br from-gold/[0.07] to-transparent p-7 sm:p-10 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
                <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                        <Ticket className="w-5 h-5 text-gold flex-shrink-0" strokeWidth={1.8} />
                        <h3 className="font-playfair text-cream text-2xl sm:text-3xl leading-none">
                            {offerte.club.title}
                        </h3>
                    </div>
                    <p className="font-sans text-smoke text-sm sm:text-base leading-relaxed max-w-2xl">
                        {offerte.club.body}
                    </p>
                </div>
                <Link
                    href={offerte.club.href}
                    className="magnetic-btn flex-shrink-0 inline-flex items-center justify-center gap-2 bg-flameDark hover:bg-ember text-cream font-sans font-bold py-4 px-7 rounded-full text-base transition-colors duration-300 shadow-[0_8px_28px_rgba(232,93,38,0.35)]"
                >
                    {offerte.club.cta}
                    <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
                </Link>
            </div>
        </div>
    </section>
);

export default Offerte;
