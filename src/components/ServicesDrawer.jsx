'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { siteContent } from '@/data/copy';
import ServicesGrid from '@/components/ServicesGrid';

const { services } = siteContent;
const tabLabel = `${services.headline} ${services.headlineEm} ${services.headlineSuffix}`;

const ServicesDrawer = () => {
    const [open, setOpen] = useState(false);
    const [rendered, setRendered] = useState(false);
    const [animOpen, setAnimOpen] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (typeof document === 'undefined') return;
        let exitTimer;
        let rafId;
        if (open) {
            document.body.style.overflow = 'hidden';
            setRendered(true);
            // Double rAF ensures initial state paints before transitioning to open
            rafId = requestAnimationFrame(() => {
                rafId = requestAnimationFrame(() => setAnimOpen(true));
            });
            if (scrollRef.current) scrollRef.current.scrollTop = 0;
        } else {
            document.body.style.overflow = '';
            setAnimOpen(false);
            // Keep mounted during exit animation, then unmount
            exitTimer = setTimeout(() => setRendered(false), 2700);
        }
        return () => {
            document.body.style.overflow = '';
            if (exitTimer) clearTimeout(exitTimer);
            if (rafId) cancelAnimationFrame(rafId);
        };
    }, [open]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') setOpen(false);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <>
            {/* Linguetta laterale */}
            <button
                type="button"
                onClick={() => setOpen(true)}
                aria-label={tabLabel}
                aria-expanded={open}
                className={`fixed top-1/2 -translate-y-1/2 left-0 z-[60] bg-flame text-cream font-sans font-bold text-[0.7rem] sm:text-xs uppercase tracking-[0.25em] py-5 px-2.5 sm:py-6 sm:px-3 rounded-r-2xl shadow-2xl border-r border-y border-cream/20 hover:bg-ember focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 ${
                    open ? 'opacity-0 pointer-events-none -translate-x-8' : 'opacity-100 hover:translate-x-1'
                }`}
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
            >
                {tabLabel}
            </button>

            {/* Backdrop */}
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 bg-black/80 backdrop-blur-md z-[70] transition-opacity duration-[700ms] ease-out ${
                    open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
                aria-hidden="true"
            />

            {/* Modal panel full-width, short height, centrato vertical */}
            {rendered && (
                <div className="fixed inset-0 z-[80] flex items-center justify-center pointer-events-none">
                    <aside
                        ref={scrollRef}
                        role="dialog"
                        aria-modal="true"
                        aria-label={tabLabel}
                        aria-hidden={!open}
                        className={`services-drawer ${
                            animOpen ? 'is-open' : 'is-closing'
                        } relative pointer-events-auto w-full h-[78vh] sm:h-[72vh] md:h-[68vh] overflow-y-auto overflow-x-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)]`}
                    >
                        {/* Sweep line accent */}
                        <span className="services-drawer-sweep pointer-events-none" aria-hidden="true" />

                        {/* Vignette overlay — fades during reveal */}
                        <span className="services-drawer-vignette pointer-events-none" aria-hidden="true" />

                        {/* Close button — floating */}
                        <button
                            type="button"
                            onClick={() => setOpen(false)}
                            aria-label="Chiudi"
                            className="services-drawer-close group absolute top-4 sm:top-5 right-4 sm:right-5 z-30 flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-charcoal/90 hover:bg-flame text-cream backdrop-blur-md focus:outline-none focus:ring-2 focus:ring-gold transition-all duration-300 shadow-lg"
                        >
                            <X className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" />
                        </button>

                        <ServicesGrid hideHeader />
                    </aside>
                </div>
            )}

            <style jsx global>{`
                /* Scrollbar */
                .services-drawer::-webkit-scrollbar { width: 6px; }
                .services-drawer::-webkit-scrollbar-track { background: transparent; }
                .services-drawer::-webkit-scrollbar-thumb {
                    background: rgba(212, 168, 83, 0.5);
                    border-radius: 999px;
                }
                .services-drawer::-webkit-scrollbar-thumb:hover { background: rgba(212, 168, 83, 0.75); }
                .services-drawer {
                    scrollbar-width: thin;
                    scrollbar-color: rgba(212, 168, 83, 0.5) transparent;
                    -webkit-overflow-scrolling: touch;
                    transform-origin: left center;
                    will-change: clip-path, transform;
                }

                /* ─── PANEL CLIP REVEAL ─────────────────────── */
                /* Default (mounted, closing or initial): collapsed left */
                .services-drawer {
                    clip-path: inset(0 100% 0 0);
                    transform: scale(1.06);
                    transition:
                        clip-path 850ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: 0ms, 0ms;
                }
                /* OPEN: panel reveals immediately, FAST */
                .services-drawer.is-open {
                    clip-path: inset(0 0% 0 0);
                    transform: scale(1);
                    transition-delay: 0ms, 0ms;
                }
                /* CLOSING: panel waits for cards to exit, then collapses (mirrors open) */
                .services-drawer.is-closing {
                    clip-path: inset(0 100% 0 0);
                    transform: scale(1.06);
                    transition:
                        clip-path 850ms cubic-bezier(0.16, 1, 0.3, 1),
                        transform 1000ms cubic-bezier(0.16, 1, 0.3, 1);
                    transition-delay: 1500ms, 1500ms;
                }

                /* ─── CARD STAGGER ──────────────────────────── */
                /* Initial state (when mounted) — bigger motion for premium feel */
                .services-drawer .svc-row1-left,
                .services-drawer .svc-row1-right,
                .services-drawer .svc-row2-left,
                .services-drawer .svc-row2-right {
                    opacity: 0;
                    transition:
                        opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 1400ms cubic-bezier(0.16, 1, 0.3, 1),
                        filter 1000ms ease-out;
                    will-change: opacity, transform, filter;
                    filter: blur(14px);
                }
                .services-drawer .svc-row1-left { transform: translate(-80px, 90px) scale(0.86) rotate(-1.5deg); }
                .services-drawer .svc-row1-right { transform: translate(80px, 90px) scale(0.86) rotate(1.5deg); }
                .services-drawer .svc-row2-left { transform: translate(-80px, 110px) scale(0.86) rotate(-1.5deg); }
                .services-drawer .svc-row2-right { transform: translate(80px, 110px) scale(0.86) rotate(1.5deg); }

                /* OPEN: stagger in AFTER panel reveal complete (~900ms) */
                .services-drawer.is-open .svc-row1-left,
                .services-drawer.is-open .svc-row1-right,
                .services-drawer.is-open .svc-row2-left,
                .services-drawer.is-open .svc-row2-right {
                    opacity: 1;
                    transform: translate(0, 0) scale(1) rotate(0);
                    filter: blur(0);
                }
                .services-drawer.is-open .svc-row1-left { transition-delay: 900ms; }
                .services-drawer.is-open .svc-row1-right { transition-delay: 1080ms; }
                .services-drawer.is-open .svc-row2-left { transition-delay: 1260ms; }
                .services-drawer.is-open .svc-row2-right { transition-delay: 1440ms; }

                /* CLOSING: reverse stagger (last in, first out), same motion as open */
                .services-drawer.is-closing .svc-row1-left,
                .services-drawer.is-closing .svc-row1-right,
                .services-drawer.is-closing .svc-row2-left,
                .services-drawer.is-closing .svc-row2-right {
                    transition:
                        opacity 1100ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 1400ms cubic-bezier(0.16, 1, 0.3, 1),
                        filter 1000ms ease-out;
                }
                .services-drawer.is-closing .svc-row2-right { transition-delay: 0ms; }
                .services-drawer.is-closing .svc-row2-left { transition-delay: 180ms; }
                .services-drawer.is-closing .svc-row1-right { transition-delay: 360ms; }
                .services-drawer.is-closing .svc-row1-left { transition-delay: 540ms; }

                /* ─── SWEEP LINE ────────────────────────────── */
                .services-drawer-sweep {
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    width: 3px;
                    background: linear-gradient(
                        180deg,
                        transparent 0%,
                        rgba(232, 93, 38, 0.95) 30%,
                        rgba(212, 168, 83, 1) 50%,
                        rgba(232, 93, 38, 0.95) 70%,
                        transparent 100%
                    );
                    box-shadow:
                        0 0 40px 10px rgba(232, 93, 38, 0.55),
                        0 0 100px 30px rgba(212, 168, 83, 0.25);
                    opacity: 0;
                    transform: translateX(0);
                    z-index: 25;
                }
                .services-drawer.is-open .services-drawer-sweep {
                    animation: drawer-sweep-in 850ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
                }
                .services-drawer.is-closing .services-drawer-sweep {
                    animation: drawer-sweep-out 850ms cubic-bezier(0.16, 1, 0.3, 1) 1500ms forwards;
                }
                @keyframes drawer-sweep-in {
                    0% { opacity: 0; transform: translateX(0); }
                    12% { opacity: 1; }
                    88% { opacity: 1; }
                    100% { opacity: 0; transform: translateX(100vw); }
                }
                @keyframes drawer-sweep-out {
                    0% { opacity: 0; transform: translateX(100vw); }
                    15% { opacity: 0.9; }
                    100% { opacity: 0; transform: translateX(0); }
                }

                /* ─── VIGNETTE OVERLAY ──────────────────────── */
                /* Dark veil over content that lifts as cards arrive */
                .services-drawer-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(
                        ellipse 100% 100% at 50% 50%,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 0.55) 100%
                    );
                    z-index: 20;
                    opacity: 0;
                    transition: opacity 900ms ease-out;
                    will-change: opacity;
                }
                .services-drawer.is-open .services-drawer-vignette {
                    opacity: 0;
                    transition-delay: 0ms;
                }
                /* Vignette stays off during card reverse-stagger (mirror of open) */
                .services-drawer.is-closing .services-drawer-vignette {
                    opacity: 0;
                    transition: opacity 500ms ease-in;
                    transition-delay: 0ms;
                }

                /* ─── CLOSE BUTTON STAGGER ──────────────────── */
                .services-drawer-close {
                    opacity: 0;
                    transform: scale(0.7);
                    transition:
                        opacity 500ms cubic-bezier(0.22, 1, 0.36, 1),
                        transform 700ms cubic-bezier(0.34, 1.56, 0.64, 1);
                }
                .services-drawer.is-open .services-drawer-close {
                    opacity: 1;
                    transform: scale(1);
                    transition-delay: 1600ms;
                }
                .services-drawer.is-closing .services-drawer-close {
                    opacity: 0;
                    transform: scale(0.7);
                    transition-delay: 0ms;
                    transition:
                        opacity 400ms cubic-bezier(0.65, 0, 0.35, 1),
                        transform 500ms cubic-bezier(0.65, 0, 0.35, 1);
                }

                @media (prefers-reduced-motion: reduce) {
                    .services-drawer,
                    .services-drawer.is-open,
                    .services-drawer.is-closing {
                        transition: opacity 200ms ease;
                        clip-path: none;
                        transform: none;
                    }
                    .services-drawer .svc-row1-left,
                    .services-drawer .svc-row1-right,
                    .services-drawer .svc-row2-left,
                    .services-drawer .svc-row2-right {
                        opacity: 1;
                        transform: none;
                        filter: none;
                        transition: none;
                    }
                    .services-drawer-sweep,
                    .services-drawer-vignette { display: none; }
                    .services-drawer-close { opacity: 1; transform: none; }
                }
            `}</style>
        </>
    );
};

export default ServicesDrawer;
