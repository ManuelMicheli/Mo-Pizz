import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { siteContent } from '@/data/copy';

const { nav } = siteContent;

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isGathering, setIsGathering] = useState(false);
    const [isInMenu, setIsInMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const savedScrollY = useRef(0);
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            const y = window.scrollY;
            setIsGathering(y > 40);
            // Show horizontal navbar when hero ends
            // Detect any hero section to know when to switch to cream navbar
            const heroEl = document.getElementById('home');
            if (heroEl) {
                const heroBottom = heroEl.getBoundingClientRect().bottom;
                setIsScrolled(heroBottom <= 80);
            } else {
                // Non-home pages: switch after ~60vh scroll (past their dark heroes)
                setIsScrolled(y > window.innerHeight * 0.55);
            }
            const menuHorizEl = document.getElementById('menu-horizontal');
            if (menuHorizEl) {
                const rect = menuHorizEl.getBoundingClientRect();
                setIsInMenu(rect.top < 80 && rect.bottom > 0);
            } else {
                setIsInMenu(false);
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                className={`pointer-events-auto mx-auto rounded-[3rem] transition-all duration-500 flex items-center justify-between ${
                    isInMenu
                        ? 'max-w-xs px-4 py-2 bg-charcoal/90 backdrop-blur-xl border border-white/10 shadow-lg scale-95 opacity-90 hover:opacity-100'
                        : isScrolled
                            ? 'w-full max-w-6xl px-4 sm:px-6 py-4 bg-cream/90 backdrop-blur-xl border border-smoke/20 shadow-lg'
                            : 'w-full max-w-6xl px-4 sm:px-6 py-4 bg-transparent border border-transparent'
                }`}
            >
                {/* Logo — hidden only during home hero (transparent navbar), visible everywhere else */}
                <HashLink smooth to="/#" className={`flex items-center gap-1.5 group transition-opacity duration-500 ${!isScrolled && !isInMenu && isHomePage ? 'opacity-0 pointer-events-none' : ''}`}>
                    {isInMenu ? (
                        <>
                            <span className="uppercase font-sans font-bold text-xl sm:text-2xl tracking-tighter text-cream">Mo</span>
                            <span className="font-playfair font-black italic text-xl sm:text-2xl text-cream">Pizz</span>
                        </>
                    ) : (
                        <img src="/images/logo_mopizz.webp" alt="MO PIZZ — Pizzeria Napoletana Legnano" decoding="async" width="400" height="389" className="h-8 sm:h-9 w-auto" />
                    )}
                </HashLink>

                {/* Desktop Links — hidden during hero (home only) & menu horizontal scroll */}
                <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${isInMenu || (!isScrolled && isHomePage) ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    {navLinks.map((link, i) => {
                        const cls = `font-sans font-medium hover:-translate-y-[1px] transition-transform duration-300 ${isScrolled ? 'text-charcoal hover:text-flame' : 'text-cream hover:text-gold'}`;
                        return link.isRoute ? (
                            <Link key={i} to={link.href} className={cls}>{link.label}</Link>
                        ) : (
                            <HashLink smooth key={i} to={link.href} className={cls}>{link.label}</HashLink>
                        );
                    })}
                </div>

                {/* Desktop CTAs — hidden during menu horizontal scroll and home hero */}
                <div className={`hidden md:flex items-center gap-3 transition-all duration-500 ${isInMenu || (!isScrolled && isHomePage) ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    <Link
                        to="/ordina"
                        className={`magnetic-btn font-sans font-semibold py-2.5 px-5 rounded-full flex items-center gap-1.5 transition-colors duration-300 border ${
                            isScrolled
                                ? 'border-flame text-flame hover:bg-flame hover:text-cream'
                                : 'border-cream/60 text-cream hover:bg-cream hover:text-charcoal'
                        }`}
                    >
                        {nav.ctaOrdina}
                    </Link>
                    <HashLink smooth to="/#prenota" className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300">
                        <Phone size={18} />
                        {nav.ctaPrenota}
                    </HashLink>
                </div>

                {/* Mobile Toggle — larger tap target, correct color for X */}
                <button
                    className="md:hidden p-3 relative z-50"
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
                        <Link key={i} to={link.href} className={cls} style={style}>{link.label}</Link>
                    ) : (
                        <HashLink smooth key={i} to={link.href} className={cls} style={style}>{link.label}</HashLink>
                    );
                })}
                <div className={`h-px bg-cream/20 transition-all duration-500 ${isGathering ? 'w-0 opacity-0' : 'w-8 opacity-100'}`} style={{ transitionDelay: `${navLinks.length * 35}ms` }} />
                <Link
                    to="/ordina"
                    className={`font-sans text-[11px] uppercase tracking-[0.25em] transition-all duration-500 ${
                        isGathering && !isScrolled ? 'text-gold/10 scale-90' : 'text-gold/70 hover:text-gold scale-100'
                    }`}
                    style={{ transitionDelay: `${(navLinks.length + 1) * 35}ms` }}
                >
                    {nav.ctaOrdina}
                </Link>
                <HashLink
                    smooth
                    to="/#prenota"
                    className={`font-sans text-[11px] uppercase tracking-[0.25em] flex items-center gap-1.5 transition-all duration-500 ${
                        isGathering && !isScrolled ? 'text-flame/10 scale-90' : 'text-flame/70 hover:text-flame scale-100'
                    }`}
                    style={{ transitionDelay: `${(navLinks.length + 2) * 35}ms` }}
                >
                    <Phone size={11} />
                    {nav.ctaPrenota}
                </HashLink>
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
                            <Link key={i} to={link.href} onClick={closeMenu} className={cls} style={style}>{link.label}</Link>
                        ) : (
                            <HashLink smooth key={i} to={link.href} onClick={closeMenu} className={cls} style={style}>{link.label}</HashLink>
                        );
                    })}
                    <Link
                        to="/ordina"
                        onClick={closeMenu}
                        className="mobile-link text-3xl font-sans font-bold text-gold hover:text-flame transition-colors"
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.4s ease ${200 + navLinks.length * 80}ms, transform 0.4s ease ${200 + navLinks.length * 80}ms`,
                        }}
                    >
                        {nav.ctaOrdina}
                    </Link>
                    <HashLink
                        smooth
                        to="/#prenota"
                        onClick={closeMenu}
                        className="mobile-link mt-8 bg-flame hover:bg-ember text-cream font-sans font-semibold py-4 px-10 rounded-full flex items-center gap-2 text-xl"
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.4s ease ${200 + (navLinks.length + 1) * 80}ms, transform 0.4s ease ${200 + (navLinks.length + 1) * 80}ms`,
                        }}
                    >
                        <Phone size={24} />
                        {nav.ctaPrenota}
                    </HashLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
