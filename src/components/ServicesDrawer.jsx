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
        </>
    );
};

export default ServicesDrawer;
