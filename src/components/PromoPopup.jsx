'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import { siteContent } from '@/data/copy';
import { promoForToday, romeDateKey } from '@/lib/promo';

const { settimana } = siteContent.eventi;
const SEEN_KEY = 'mopizz-promo-seen';
const OPEN_DELAY = 2200;
const EASE = [0.22, 1, 0.36, 1];

const readStorage = (key) => {
    try { return localStorage.getItem(key); } catch { return null; }
};
const writeStorage = (key, value) => {
    try { localStorage.setItem(key, value); } catch { /* storage bloccato: il popup riapparirà */ }
};

/**
 * Popup della promo del giorno: MarteBirra il martedì, MercolePizza il mercoledì,
 * GioveDolce il giovedì. Una volta al giorno per visitatore, dopo la scelta sui cookie.
 * Anteprima in qualsiasi giorno con ?promo=<slug> (es. ?promo=giovedolce).
 */
const PromoPopup = () => {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const [promo, setPromo] = useState(null);
    const [open, setOpen] = useState(false);
    const closeRef = useRef(null);
    const dialogRef = useRef(null);
    const lastFocus = useRef(null);

    useEffect(() => {
        if (pathname?.startsWith('/privacy')) return;

        const forced = new URLSearchParams(window.location.search).get('promo');
        const candidate = forced
            ? settimana.items.find((p) => p.slug === forced)
            : promoForToday(settimana.items);
        if (!candidate) return;

        const seenValue = `${romeDateKey()}:${candidate.slug}`;
        if (!forced && readStorage(SEEN_KEY) === seenValue) return;

        let timer;
        const schedule = () => {
            timer = setTimeout(() => {
                lastFocus.current = document.activeElement;
                setPromo(candidate);
                setOpen(true);
                if (!forced) writeStorage(SEEN_KEY, seenValue);
            }, OPEN_DELAY);
        };

        // Non sovrapporsi al banner cookie: si attende la scelta del visitatore.
        if (readStorage('mopizz-consent')) {
            schedule();
        } else {
            window.addEventListener('consent-changed', schedule, { once: true });
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('consent-changed', schedule);
        };
        // Solo al primo caricamento: la navigazione interna non deve riaprirlo.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const close = useCallback(() => setOpen(false), []);

    // Blocco scroll (Lenis su desktop, overflow su mobile), Esc e focus trap
    useEffect(() => {
        if (!open) return;

        const html = document.documentElement;
        const prevOverflow = html.style.overflow;
        html.style.overflow = 'hidden';
        window.__lenis?.stop();
        const focusTimer = setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 50);

        const onKey = (e) => {
            if (e.key === 'Escape') {
                close();
                return;
            }
            if (e.key !== 'Tab' || !dialogRef.current) return;
            const focusables = dialogRef.current.querySelectorAll('a[href], button:not([disabled])');
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };
        window.addEventListener('keydown', onKey);

        return () => {
            clearTimeout(focusTimer);
            window.removeEventListener('keydown', onKey);
            html.style.overflow = prevOverflow;
            window.__lenis?.start();
            if (lastFocus.current instanceof HTMLElement) lastFocus.current.focus({ preventScroll: true });
        };
    }, [open, close]);

    if (!promo) return null;

    const dateLabel = new Intl.DateTimeFormat('it-IT', {
        timeZone: 'Europe/Rome',
        weekday: 'long',
        day: 'numeric',
        month: 'long',
    }).format(new Date());

    const lift = (delay) =>
        reduceMotion
            ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2 } }
            : {
                initial: { opacity: 0, y: 28 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.8, ease: EASE, delay },
            };

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center p-3 sm:p-6">
                    <motion.div
                        aria-hidden
                        className="absolute inset-0 bg-[#0c0907]/75 backdrop-blur-[6px]"
                        onClick={close}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0.15 : 0.5, ease: EASE }}
                    />

                    <motion.div
                        ref={dialogRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="promo-popup-title"
                        aria-describedby="promo-popup-desc"
                        className="relative w-full max-w-[460px] md:max-w-[920px] max-h-[94svh] overflow-y-auto overscroll-contain rounded-[2rem] md:rounded-[2.5rem] bg-charcoal text-cream shadow-[0_60px_140px_-40px_rgba(0,0,0,0.95)] ring-1 ring-white/10 grid grid-cols-1 md:grid-cols-[1.05fr_1fr]"
                        data-lenis-prevent
                        initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 60, scale: 0.97 }}
                        animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
                        transition={{ duration: reduceMotion ? 0.2 : 0.7, ease: EASE }}
                    >
                        {/* Foto + wordmark */}
                        <motion.div
                            className="relative h-[30svh] min-h-[210px] md:h-auto md:min-h-[580px] overflow-hidden"
                            initial={reduceMotion ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
                            animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
                            transition={{ duration: 1, ease: EASE, delay: 0.15 }}
                        >
                            <motion.div
                                className="absolute inset-0"
                                initial={reduceMotion ? false : { scale: 1.25 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 1.6, ease: EASE, delay: 0.15 }}
                            >
                                <Image
                                    src={promo.image}
                                    alt={promo.imageAlt}
                                    fill
                                    sizes="(max-width: 768px) 460px, 480px"
                                    className="object-cover"
                                    style={{ objectPosition: promo.imagePosition }}
                                />
                            </motion.div>
                            <div
                                aria-hidden
                                className="absolute inset-0"
                                style={{
                                    background: `linear-gradient(180deg, rgba(${promo.tint},0.45) 0%, transparent 38%, rgba(12,9,7,0.88) 100%)`,
                                }}
                            />
                            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8" aria-hidden>
                                <span className="block font-playfair leading-[0.8] tracking-[-0.02em] text-[clamp(3.4rem,15vw,6.2rem)]">
                                    <motion.span
                                        className="block"
                                        style={{ color: 'transparent', WebkitTextStroke: '1.5px rgba(255,248,240,0.92)' }}
                                        {...lift(0.45)}
                                    >
                                        {promo.titleParts[0]}
                                    </motion.span>
                                    <motion.span className="block" style={{ color: promo.accent }} {...lift(0.55)}>
                                        {promo.titleParts[1]}
                                    </motion.span>
                                </span>
                            </div>
                        </motion.div>

                        {/* Contenuto */}
                        <div className="relative flex flex-col p-6 sm:p-9 md:p-11">
                            <motion.p className="font-caveat text-3xl leading-none" style={{ color: promo.accent }} {...lift(0.35)}>
                                {settimana.popup.kicker}
                            </motion.p>
                            <motion.p className="font-sans text-cream/55 text-sm mt-2 first-letter:uppercase" {...lift(0.4)}>
                                {dateLabel}
                            </motion.p>

                            <motion.h2
                                id="promo-popup-title"
                                className="font-playfair text-cream text-[clamp(1.9rem,4vw,2.75rem)] leading-[1.02] mt-4 md:mt-auto"
                                {...lift(0.5)}
                            >
                                <span className="sr-only">{promo.title}: </span>
                                {promo.popupLead}
                            </motion.h2>

                            <motion.div {...lift(0.6)} className="mt-5">
                                <p id="promo-popup-desc" className="font-sans text-cream/80 text-base leading-relaxed">
                                    {promo.desc}
                                </p>
                                {promo.note && (
                                    <p className="font-sans text-cream/55 text-sm mt-2">{promo.note}</p>
                                )}
                            </motion.div>

                            <motion.div
                                className="flex items-baseline gap-3 border-t border-white/10 pt-4 md:pt-5 mt-5 md:mt-6"
                                {...lift(0.68)}
                            >
                                <span className="font-playfair text-5xl leading-none" style={{ color: promo.accent }}>
                                    {promo.price}
                                </span>
                                <span className="font-sans text-cream/65 text-sm">{promo.priceLabel}</span>
                            </motion.div>

                            <motion.div className="flex flex-row gap-2.5 sm:gap-3 mt-6 md:mt-7" {...lift(0.76)}>
                                <Link
                                    href="/#prenota"
                                    onClick={close}
                                    className="magnetic-btn flex-1 inline-flex items-center justify-center rounded-full text-charcoal font-sans font-bold text-[0.95rem] sm:text-base py-4 px-4 sm:px-6 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                                    style={{ background: promo.accent }}
                                >
                                    {settimana.ctaPrenota}
                                </Link>
                                <Link
                                    href={`/eventi#${promo.slug}`}
                                    onClick={close}
                                    className="magnetic-btn inline-flex items-center justify-center rounded-full border border-white/15 hover:bg-white/[0.06] text-cream font-sans font-medium text-[0.95rem] sm:text-base py-4 px-5 sm:px-6 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
                                >
                                    {settimana.popup.ctaEvento}
                                </Link>
                            </motion.div>
                        </div>

                        <button
                            ref={closeRef}
                            type="button"
                            onClick={close}
                            aria-label={settimana.popup.close}
                            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 grid place-items-center w-11 h-11 rounded-full bg-[#0c0907]/55 backdrop-blur-md text-cream ring-1 ring-white/15 hover:bg-[#0c0907]/80 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream"
                        >
                            <X size={20} strokeWidth={2} />
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PromoPopup;
