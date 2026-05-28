'use client';

import React, { useEffect } from 'react';
import { ShoppingBag, X, Minus, Plus, Trash2, Phone } from 'lucide-react';
import { useCart } from '@/hooks/useCart';

const eur = (n) => n.toLocaleString('it-IT', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function CartFab({ visible = true }) {
    const { items, totalCount, totalPrice, add, decrement, remove, clear, open, setOpen } = useCart();

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === 'Escape' && setOpen(false);
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [open, setOpen]);

    return (
        <>
            {/* Floating action button — bottom right, above mobile tab bar */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={`Apri lista ordine (${totalCount} elementi)`}
                className={`fixed z-50 right-3 bottom-3 md:right-4 md:bottom-4 flex items-center gap-2 bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-4 rounded-full shadow-2xl shadow-flame/30 transition-all duration-300 ${
                    visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'
                }`}
            >
                <ShoppingBag className="w-5 h-5" strokeWidth={2} />
                {totalCount > 0 && (
                    <span className="font-mono text-sm tabular-nums min-w-[1.25rem] text-center">{totalCount}</span>
                )}
            </button>

            {/* Drawer overlay */}
            <div
                className={`fixed inset-0 z-[60] transition-opacity duration-300 ${
                    open ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden={!open}
            >
                {/* Backdrop */}
                <button
                    type="button"
                    aria-label="Chiudi"
                    onClick={() => setOpen(false)}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Panel */}
                <div
                    role="dialog"
                    aria-label="La tua selezione"
                    className={`absolute right-0 top-0 h-full w-full max-w-md bg-charcoal border-l border-white/10 shadow-2xl flex flex-col transition-transform duration-400 ease-out ${
                        open ? 'translate-x-0' : 'translate-x-full'
                    }`}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-5 border-b border-white/10">
                        <div>
                            <h3 className="font-playfair text-cream text-2xl leading-none">La tua selezione</h3>
                            <p className="font-sans text-smoke text-xs mt-1">
                                {totalCount === 0 ? 'Niente ancora salvato' : `${totalCount} ${totalCount === 1 ? 'piatto' : 'piatti'}`}
                            </p>
                        </div>
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Chiudi"
                            className="p-2 rounded-full hover:bg-white/5 text-cream/70 hover:text-cream transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* List */}
                    <div className="flex-1 overflow-y-auto px-5 py-4">
                        {items.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center px-6">
                                <ShoppingBag className="w-12 h-12 text-smoke/40 mb-4" strokeWidth={1.2} />
                                <p className="font-playfair text-cream/70 text-lg mb-2">Nessun piatto salvato</p>
                                <p className="font-sans text-smoke text-sm leading-relaxed">
                                    Tocca il <span className="text-flame font-bold">+</span> accanto a un piatto per metterlo da parte e ritrovarlo qui.
                                </p>
                            </div>
                        ) : (
                            <ul className="flex flex-col gap-3">
                                {items.map((it) => (
                                    <li
                                        key={`${it.categoryId}-${it.sectionHeading}-${it.name}`}
                                        className="bg-white/[0.03] border border-white/5 rounded-2xl p-3"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex-1 min-w-0">
                                                <p className="font-playfair text-cream text-base leading-tight">{it.name}</p>
                                                <p className="font-sans text-smoke text-xs mt-0.5 truncate">
                                                    {it.categoryTitle} · {it.sectionHeading}
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => remove(it)}
                                                aria-label={`Rimuovi ${it.name}`}
                                                className="p-1.5 -m-1.5 text-smoke/70 hover:text-flame transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="flex items-center justify-between mt-3">
                                            <div className="inline-flex items-center bg-charcoal border border-white/10 rounded-full">
                                                <button
                                                    type="button"
                                                    onClick={() => decrement(it)}
                                                    aria-label={`Diminuisci ${it.name}`}
                                                    className="p-2 text-cream/80 hover:text-flame transition-colors"
                                                >
                                                    <Minus className="w-3.5 h-3.5" />
                                                </button>
                                                <span className="font-mono text-cream text-sm w-6 text-center tabular-nums">{it.qty}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => add(it)}
                                                    aria-label={`Aumenta ${it.name}`}
                                                    className="p-2 text-cream/80 hover:text-flame transition-colors"
                                                >
                                                    <Plus className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                            <span className="font-mono text-gold text-sm tabular-nums">€ {eur(it.qty * (parseFloat(String(it.price).replace(',', '.').replace(/[^\d.]/g, '')) || 0))}</span>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Footer */}
                    {items.length > 0 && (
                        <div className="border-t border-white/10 p-5 space-y-3 bg-charcoal/95">
                            <div className="flex items-center justify-between">
                                <span className="font-sans text-smoke text-sm">Totale stimato</span>
                                <span className="font-mono text-gold text-2xl tabular-nums">€ {eur(totalPrice)}</span>
                            </div>
                            <p className="font-sans text-smoke text-[11px] leading-relaxed">
                                Lista di riferimento. Conferma con il personale al tavolo o chiama per prenotare.
                            </p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={clear}
                                    className="flex-1 font-sans text-sm text-smoke border border-white/10 hover:border-flame/40 hover:text-flame transition-colors py-3 rounded-full"
                                >
                                    Svuota
                                </button>
                                <a
                                    href="/#prenota"
                                    onClick={() => setOpen(false)}
                                    className="flex-[2] inline-flex items-center justify-center gap-2 bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-4 rounded-full transition-colors"
                                >
                                    <Phone className="w-4 h-4" />
                                    Prenota tavolo
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
