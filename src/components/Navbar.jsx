'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Phone, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { siteContent } from '@/data/copy';

const { nav } = siteContent;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isGathering, setIsGathering] = useState(false);
    const [isInMenu, setIsInMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const savedScrollY = useRef(0);
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    useEffect(() => {
        let heroEl = null;
        let menuEl = null;
        let ticking = false;

        const handleScroll = () => {
            if (ticking) return;
            ticking = true;

            requestAnimationFrame(() => {
                const y = window.scrollY;
                setIsGathering(y > 40);

                // Lazy-cache DOM refs (re-query only while not yet found).
                // #menu is mounted lazily via DeferMount: the placeholder we
                // first cache gets detached when MenuSection swaps in (its own
                // id="menu"), and a detached node reports an all-zero rect — so
                // re-query whenever the cached node is no longer connected.
                if (!heroEl || !heroEl.isConnected) heroEl = document.getElementById('home');
                if (!menuEl || !menuEl.isConnected) menuEl = document.getElementById('menu');

                if (heroEl) {
                    setIsScrolled(heroEl.getBoundingClientRect().bottom <= 80);
                } else {
                    setIsScrolled(y > window.innerHeight * 0.55);
                }

                // Hide navbar while #menu section is on screen — only on home
                if (isHomePage && menuEl) {
                    const rect = menuEl.getBoundingClientRect();
                    setIsInMenu(rect.top < 80 && rect.bottom > 0);
                } else {
                    setIsInMenu(false);
                }

                ticking = false;
            });
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    // Scroll lock: add/remove body.menu-open and save/restore scrollY
    useEffect(() => {
        if (isMobileMenuOpen) {
            savedScrollY.current = window.scrollY;
            document.body.classList.add('menu-open');
            document.body.style.top = `-${savedScrollY.current}px`;
            document.documentElement.style.overscrollBehavior = 'none';
        } else {
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            document.documentElement.style.overscrollBehavior = '';
            window.scrollTo(0, savedScrollY.current);
        }
        return () => {
            document.body.classList.remove('menu-open');
            document.body.style.top = '';
            document.documentElement.style.overscrollBehavior = '';
        };
    }, [isMobileMenuOpen]);

    const toggleMenu = useCallback(() => {
        setIsMobileMenuOpen(prev => !prev);
    }, []);

    const closeMenu = useCallback(() => {
        setIsMobileMenuOpen(false);
    }, []);

    const navLinks = nav.links;

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">

            <div
                className={`mx-auto rounded-[3rem] transition-all duration-500 flex items-center ${
                    isInMenu
                        ? 'opacity-0 -translate-y-[120%] pointer-events-none'
                        : isScrolled
                            ? 'pointer-events-auto justify-between w-full max-w-6xl px-4 sm:px-6 py-4 bg-cream/90 backdrop-blur-xl border border-smoke/20 shadow-lg'
                            : 'pointer-events-auto justify-between w-full max-w-6xl px-4 sm:px-6 py-4 bg-transparent border border-transparent'
                }`}
            >
                {/* Logo — hidden only during home hero (transparent navbar), visible everywhere else */}
                <a href="/#" className={`flex items-center gap-1.5 group transition-opacity duration-500 ${!isScrolled && !isInMenu && isHomePage ? 'opacity-0 pointer-events-none' : ''}`}>
                    {isInMenu ? (
                        <>
                            <span className="uppercase font-sans font-bold text-xl sm:text-2xl tracking-tighter text-cream">Mo</span>
                            <span className="font-playfair italic text-xl sm:text-2xl text-cream">Pizz</span>
                        </>
                    ) : (
                        <Image src="/images/logo_mopizz.webp" alt="MO PIZZ — Pizzeria Napoletana Legnano" width={48} height={47} priority className="h-8 sm:h-9 w-auto" />
                    )}
                </a>

                {/* Desktop Links — hidden during hero (home only) & menu horizontal scroll */}
                <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${isInMenu || (!isScrolled && isHomePage) ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    {navLinks.map((link, i) => {
                        const cls = `font-sans font-medium hover:-translate-y-[1px] transition-transform duration-300 ${isScrolled ? 'text-charcoal hover:text-flame' : 'text-cream hover:text-gold'}`;
                        return link.isRoute ? (
                            <Link key={i} href={link.href} className={cls}>{link.label}</Link>
                        ) : (
                            <a key={i} href={link.href} className={cls}>{link.label}</a>
                        );
                    })}
                </div>

                {/* Desktop CTAs — hidden during menu horizontal scroll and home hero */}
                <div className={`hidden md:flex items-center gap-3 transition-all duration-500 ${isInMenu || (!isScrolled && isHomePage) ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    <a href="/#prenota" className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300">
                        <Phone size={18} />
                        {nav.ctaPrenota}
                    </a>
                </div>

                {/* Mobile Toggle — hidden in home menu section unless overlay open */}
                <button
                    className={`md:hidden p-3 relative z-50 transition-all duration-500 ${
                        isInMenu && !isMobileMenuOpen ? 'opacity-0 w-0 overflow-hidden pointer-events-none p-0' : 'opacity-100'
                    }`}
                    onClick={toggleMenu}
                    aria-label={isMobileMenuOpen ? nav.ariaCloseMenu : nav.ariaOpenMenu}
                >
                    {isMobileMenuOpen ? (
                        <X className="text-cream" size={28} />
                    ) : (
                        <Menu className={isScrolled ? 'text-charcoal' : 'text-cream'} size={28} />
                    )}
                </button>
            </div>

            {/* Vertical Hero Nav — desktop only, right side, HOME ONLY */}
            {isHomePage && <div
                className={`pointer-events-auto hidden md:flex fixed right-8 lg:right-12 top-1/2 -translate-y-1/2 flex-col items-end transition-all ease-[cubic-bezier(0.4,0,0.2,1)] ${
                    isScrolled || isInMenu
                        ? 'gap-0 opacity-0 -translate-y-16 scale-75 pointer-events-none duration-500'
                        : isGathering
                            ? 'gap-0 opacity-40 -translate-y-8 scale-[0.85] duration-500'
                            : 'gap-5 opacity-100 translate-x-0 translate-y-0 scale-100 duration-700'
                }`}
            >
                {navLinks.map((link, i) => {
                    const cls = `font-sans text-[11px] uppercase tracking-[0.25em] transition-all duration-500 ${
                        isGathering && !isScrolled
                            ? 'text-cream/20 scale-90'
                            : 'text-cream/50 hover:text-cream scale-100'
                    }`;
                    const style = { transitionDelay: `${i * 35}ms` };
                    return link.isRoute ? (
                        <Link key={i} href={link.href} className={cls} style={style}>{link.label}</Link>
                    ) : (
                        <a key={i} href={link.href} className={cls} style={style}>{link.label}</a>
                    );
                })}
                <div className={`h-px bg-cream/20 transition-all duration-500 ${isGathering ? 'w-0 opacity-0' : 'w-8 opacity-100'}`} style={{ transitionDelay: `${navLinks.length * 35}ms` }} />
                <a
                    href="/#prenota"
                    className={`font-sans text-[11px] uppercase tracking-[0.25em] flex items-center gap-1.5 transition-all duration-500 ${
                        isGathering && !isScrolled ? 'text-flame/10 scale-90' : 'text-flame/70 hover:text-flame scale-100'
                    }`}
                    style={{ transitionDelay: `${(navLinks.length + 1) * 35}ms` }}
                >
                    <Phone size={11} />
                    {nav.ctaPrenota}
                </a>
            </div>}

            {/* Mobile Menu Overlay — clip-path circle expand animation */}
            <div
                className={`pointer-events-auto fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center p-6 min-h-screen transition-[clip-path] duration-500 ease-in-out ${
                    isMobileMenuOpen
                        ? '[clip-path:circle(150%_at_calc(100%_-_2.5rem)_2.5rem)]'
                        : '[clip-path:circle(0%_at_calc(100%_-_2.5rem)_2.5rem)] pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center gap-8 text-center">
                    {navLinks.map((link, i) => {
                        const cls = "mobile-link text-3xl font-sans font-medium text-cream hover:text-flame transition-colors";
                        const style = {
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.4s ease ${200 + i * 80}ms, transform 0.4s ease ${200 + i * 80}ms`,
                        };
                        return link.isRoute ? (
                            <Link key={i} href={link.href} onClick={closeMenu} className={cls} style={style}>{link.label}</Link>
                        ) : (
                            <a key={i} href={link.href} onClick={closeMenu} className={cls} style={style}>{link.label}</a>
                        );
                    })}
                    <a
                        href="/#prenota"
                        onClick={closeMenu}
                        className="mobile-link mt-8 bg-flameDark hover:bg-ember text-cream font-sans font-semibold py-4 px-10 rounded-full flex items-center gap-2 text-xl"
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.4s ease ${200 + navLinks.length * 80}ms, transform 0.4s ease ${200 + navLinks.length * 80}ms`,
                        }}
                    >
                        <Phone size={24} />
                        {nav.ctaPrenota}
                    </a>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
