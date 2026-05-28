'use client';

import React, { useEffect, useState, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { X, ChevronRight } from 'lucide-react';
import { siteContent } from '@/data/copy';

const ServicesGrid = dynamic(() => import('@/components/ServicesGrid'));

const { services } = siteContent;

export default function ServicesDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverMenu, setIsOverMenu] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const drawerRef = useRef(null);

    // Hide the handle while #menu is on screen (home only)
    useEffect(() => {
        if (!isHomePage) {
            setIsOverMenu(false);
            return;
        }
        let menuEl = null;
        let ticking = false;
        const handleScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                if (!menuEl) menuEl = document.getElementById('menu');
                if (menuEl) {
                    const r = menuEl.getBoundingClientRect();
                    setIsOverMenu(r.top < 80 && r.bottom > 0);
                } else {
                    setIsOverMenu(false);
                }
                ticking = false;
            });
        };
        handleScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Close drawer on route change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Scroll lock while drawer open. We DON'T stop Lenis — instead we mark the
    // inner scrollable div with data-lenis-prevent so the wheel events inside
    // the modal go through native scroll while the page underneath stays still.
    useEffect(() => {
        if (!isOpen) return;
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
        };
    }, [isOpen]);

    // Esc to close
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [isOpen]);

    // Entrance stagger of cards every time drawer opens. GSAP is loaded lazily
    // here (only when the drawer opens) so it stays out of the initial bundle.
    useEffect(() => {
        if (!isOpen || !drawerRef.current) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ctx;
        let cancelled = false;
        import('gsap').then(({ default: gsap }) => {
            if (cancelled || !drawerRef.current) return;
            ctx = gsap.context(() => {
                gsap.from('.drawer-reveal', {
                    y: 24,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: 'power3.out',
                    delay: 0.25,
                    force3D: true,
                    clearProps: 'transform,opacity',
                });
                gsap.from('.service-card', {
                    y: 32,
                    opacity: 0,
                    duration: 0.9,
                    stagger: 0.09,
                    ease: 'power3.out',
                    delay: 0.45,
                    force3D: true,
                    clearProps: 'transform,opacity',
                });
            }, drawerRef);
        });
        return () => {
            cancelled = true;
            if (ctx) ctx.revert();
        };
    }, [isOpen]);

    const open = useCallback(() => setIsOpen(true), []);
    const close = useCallback(() => setIsOpen(false), []);

    return (
        <div className="hidden md:block">
            {/* Side tab handle */}
            <button
                type="button"
                onClick={open}
                aria-label={`Apri ${services.eyebrow}`}
                aria-expanded={isOpen}
                aria-controls="services-drawer"
                className={`group fixed left-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${
                    isOpen || isOverMenu
                        ? '-translate-x-full opacity-0 pointer-events-none'
                        : 'translate-x-0 opacity-100'
                }`}
            >
                <span className="relative flex flex-col items-center gap-3 bg-gradient-to-r from-flame via-flame to-ember text-cream font-mono font-bold text-[11px] tracking-[0.3em] uppercase pr-3.5 pl-3 py-7 rounded-r-2xl shadow-[0_8px_40px_-4px_rgba(232,93,38,0.55)] border border-l-0 border-cream/15 transition-all duration-300 group-hover:pr-5 group-hover:shadow-[0_12px_50px_-4px_rgba(232,93,38,0.75)]">
                    <ChevronRight
                        size={16}
                        strokeWidth={2.5}
                        className="transition-transform duration-300 group-hover:translate-x-1 animate-[pulse_2.4s_ease-in-out_infinite]"
                    />
                    <span className="text-[12px] tracking-[0.1em] normal-case" style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}>
                        {services.drawerTab}
                    </span>
                    {/* Inner highlight line */}
                    <span className="pointer-events-none absolute inset-y-2 right-1 w-px bg-gradient-to-b from-transparent via-cream/30 to-transparent" />
                </span>
            </button>

            {/* Backdrop */}
            <button
                type="button"
                onClick={close}
                aria-label="Chiudi"
                tabIndex={isOpen ? 0 : -1}
                className={`fixed inset-0 z-40 transition-opacity duration-500 cursor-default ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
                style={{
                    background:
                        'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.85) 60%, rgba(0,0,0,0.96) 100%)',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                }}
            />

            {/* Centered popup wrapper */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 pointer-events-none transition-opacity duration-500 ${
                    isOpen ? 'opacity-100' : 'opacity-0'
                }`}
            >
                {/* Panel */}
                <aside
                    ref={drawerRef}
                    id="services-drawer"
                    role="dialog"
                    aria-modal={isOpen}
                    aria-hidden={!isOpen}
                    aria-label="Servizi Mo Pizz"
                    className={`relative w-[min(1480px,97vw)] max-h-[90vh] flex flex-col overflow-hidden rounded-[2rem] bg-charcoal border border-cream/10 shadow-[0_40px_120px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(232,93,38,0.18)] transition-all duration-[650ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
                        isOpen ? 'pointer-events-auto scale-100 translate-y-0 opacity-100' : 'pointer-events-none scale-95 translate-y-4 opacity-0'
                    }`}
                >
                {/* Atmospheric backdrop layers */}
                <div className="pointer-events-none absolute inset-0 z-0">
                    <div
                        className="absolute inset-0"
                        style={{
                            background:
                                'radial-gradient(ellipse 90% 60% at 100% 0%, rgba(232,93,38,0.22) 0%, transparent 55%), radial-gradient(ellipse 70% 50% at 0% 100%, rgba(212,168,83,0.10) 0%, transparent 60%)',
                        }}
                    />
                    <div className="absolute inset-0 grain-texture opacity-[0.045]" />
                    {/* Left edge gold accent */}
                    <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-flame/60 to-transparent" />
                </div>

                {/* Close button (fixed top-right of drawer) */}
                <button
                    type="button"
                    onClick={close}
                    aria-label="Chiudi"
                    className="absolute top-5 right-5 z-30 w-11 h-11 rounded-full bg-cream/5 hover:bg-cream/15 border border-cream/15 hover:border-cream/30 text-cream/80 hover:text-cream backdrop-blur-sm flex items-center justify-center transition-all duration-300 hover:rotate-90"
                >
                    <X size={20} strokeWidth={2} />
                </button>

                {/* Header */}
                <header className="relative z-10 px-8 lg:px-12 pt-10 pb-7">
                    <div className="flex flex-col gap-3 max-w-lg pr-16">
                        <div className="drawer-reveal flex items-center gap-3">
                            <span className="h-px w-8 bg-flame" />
                            <span className="font-mono text-flame text-[11px] tracking-[0.3em] uppercase">
                                {services.eyebrow}
                            </span>
                        </div>
                        <h2 className="drawer-reveal font-playfair text-cream text-[clamp(2rem,3.2vw,3rem)] leading-[0.95]">
                            {services.headline}{' '}
                            <span className="italic text-flame">{services.headlineEm}</span>{' '}
                            {services.headlineSuffix}
                        </h2>
                        <p className="drawer-reveal font-sans text-cream/70 text-sm lg:text-base leading-relaxed mt-1">
                            {services.subtext}
                        </p>
                    </div>
                </header>

                {/* Gradient divider */}
                <div className="relative z-10 h-px mx-8 lg:mx-12 bg-gradient-to-r from-transparent via-cream/20 to-transparent" />

                {/* Body — grid (scrollable, bypasses Lenis) */}
                <div
                    data-lenis-prevent
                    className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain"
                >
                    <div className="drawer-reveal">
                        <ServicesGrid hideHeader={true} />
                    </div>
                </div>

                {/* Footer hint */}
                <footer className="relative z-10 flex items-center justify-between px-8 lg:px-12 py-4 border-t border-cream/10 bg-charcoal/70 backdrop-blur-sm">
                    <span className="font-mono text-cream/40 text-[10px] tracking-[0.25em] uppercase flex items-center gap-2">
                        <kbd className="px-2 py-0.5 rounded border border-cream/20 bg-cream/5 text-cream/70 text-[10px] font-bold">ESC</kbd>
                        per chiudere
                    </span>
                    <span className="font-mono text-flame/70 text-[10px] tracking-[0.25em] uppercase">
                        04 servizi
                    </span>
                </footer>
                </aside>
            </div>
        </div>
    );
}
