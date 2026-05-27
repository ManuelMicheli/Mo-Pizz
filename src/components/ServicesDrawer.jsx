'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import { X } from 'lucide-react';
import { siteContent } from '@/data/copy';

const ServicesGrid = dynamic(() => import('@/components/ServicesGrid'));

const { services } = siteContent;

export default function ServicesDrawer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isOverMenu, setIsOverMenu] = useState(false);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

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

    // Scroll lock + Lenis stop while drawer open
    useEffect(() => {
        if (!isOpen) return;
        const lenis = typeof window !== 'undefined' ? window.__lenis : null;
        if (lenis) lenis.stop();
        const prevOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = prevOverflow;
            if (lenis) lenis.start();
        };
    }, [isOpen]);

    // Esc to close
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e) => { if (e.key === 'Escape') setIsOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
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
                className={`fixed right-0 top-1/2 -translate-y-1/2 z-40 transition-all duration-500 ease-out ${
                    isOpen || isOverMenu
                        ? 'translate-x-full opacity-0 pointer-events-none'
                        : 'translate-x-0 opacity-100'
                }`}
            >
                <span
                    className="block bg-flame hover:bg-ember text-cream font-mono font-bold text-xs tracking-[0.25em] uppercase px-3 py-8 rounded-l-2xl shadow-[0_0_30px_rgba(232,93,38,0.35)] border border-r-0 border-cream/15 transition-colors"
                    style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                >
                    {services.eyebrow}
                </span>
            </button>

            {/* Backdrop */}
            <button
                type="button"
                onClick={close}
                aria-label="Chiudi"
                tabIndex={isOpen ? 0 : -1}
                className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 cursor-default ${
                    isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            />

            {/* Panel */}
            <aside
                id="services-drawer"
                role="dialog"
                aria-modal={isOpen}
                aria-hidden={!isOpen}
                aria-label="Servizi Mo Pizz"
                className={`fixed top-0 right-0 z-50 h-full w-[min(640px,90vw)] bg-charcoal shadow-[0_0_60px_rgba(0,0,0,0.6)] transition-transform duration-500 ease-out flex flex-col ${
                    isOpen ? 'translate-x-0' : 'translate-x-full'
                }`}
            >
                {/* Drawer header */}
                <header className="relative px-8 lg:px-10 pt-8 pb-5 border-b border-cream/10 bg-charcoal">
                    <button
                        type="button"
                        onClick={close}
                        aria-label="Chiudi"
                        className="absolute top-5 right-5 w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex flex-col gap-2 max-w-md pr-12">
                        <span className="font-mono text-flame text-xs tracking-[0.2em] uppercase">
                            {services.eyebrow}
                        </span>
                        <h2 className="font-playfair text-cream text-3xl lg:text-4xl leading-[0.95]">
                            {services.headline}{' '}
                            <span className="italic">{services.headlineEm}</span>{' '}
                            {services.headlineSuffix}
                        </h2>
                        <p className="font-sans text-cream/70 text-sm leading-relaxed mt-1">
                            {services.subtext}
                        </p>
                    </div>
                </header>

                {/* Drawer body — grid */}
                <div className="flex-1 overflow-y-auto">
                    <ServicesGrid hideHeader={true} />
                </div>
            </aside>
        </div>
    );
}
