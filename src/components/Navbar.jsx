import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInMenu, setIsInMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);
    const savedScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 100);
            const menuEl = document.getElementById('menu');
            if (menuEl) {
                const rect = menuEl.getBoundingClientRect();
                setIsInMenu(rect.top < 80 && rect.bottom > 0);
            }
        };
        window.addEventListener('scroll', handleScroll);
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

    const navLinks = [
        { label: 'Home', href: '/#' },
        { label: 'Chi Siamo', href: '/#chef' },
        { label: 'Menu', href: '/#menu' },
        { label: 'Contatti', href: '/#contatti' },
    ];

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
            <div
                className={`pointer-events-auto mx-auto rounded-[3rem] transition-all duration-500 flex items-center justify-between
        ${isInMenu
                        ? 'max-w-xs px-4 py-2 bg-charcoal/80 backdrop-blur-xl border border-white/10 shadow-lg scale-90 opacity-70 hover:opacity-100'
                        : isScrolled
                            ? 'w-full max-w-6xl px-4 sm:px-6 py-4 bg-cream/90 backdrop-blur-xl border border-smoke/20 shadow-lg'
                            : 'w-full max-w-6xl px-4 sm:px-6 py-4 bg-transparent border border-transparent'
                    }`}
            >
                {/* Logo — responsive sizing */}
                <HashLink smooth to="/#" className="flex items-center gap-1.5 group">
                    <span className={`uppercase font-sans font-bold text-xl sm:text-2xl tracking-tighter transition-colors duration-500 ${isMobileMenuOpen ? 'text-cream' : isInMenu ? 'text-cream' : isScrolled ? 'text-charcoal' : 'text-cream'}`}>Mo</span>
                    <span className={`font-playfair font-black italic text-xl sm:text-2xl transition-colors duration-500 ${isMobileMenuOpen ? 'text-cream' : isInMenu ? 'text-cream' : isScrolled ? 'text-charcoal' : 'text-cream'}`}>Pizz</span>
                </HashLink>

                {/* Desktop Links */}
                <div className={`hidden md:flex items-center gap-8 transition-all duration-500 ${isInMenu ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    {navLinks.map((link, i) => (
                        <HashLink
                            smooth
                            key={i}
                            to={link.href}
                            className={`font-sans font-medium hover:-translate-y-[1px] transition-transform duration-300
              ${isScrolled ? 'text-charcoal hover:text-flame' : 'text-cream hover:text-gold'}`}
                        >
                            {link.label}
                        </HashLink>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className={`hidden md:block transition-all duration-500 ${isInMenu ? 'opacity-0 w-0 overflow-hidden pointer-events-none' : 'opacity-100'}`}>
                    <HashLink smooth to="/#contatti" className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-semibold py-3 px-6 rounded-full flex items-center gap-2 transition-colors duration-300">
                        <Phone size={18} />
                        Prenota Ora
                    </HashLink>
                </div>

                {/* Mobile Toggle — larger tap target, correct color for X */}
                <button
                    className="md:hidden p-3 relative z-50"
                    onClick={toggleMenu}
                    aria-label={isMobileMenuOpen ? 'Chiudi menu' : 'Apri menu'}
                >
                    {isMobileMenuOpen ? (
                        <X className="text-cream" size={28} />
                    ) : (
                        <Menu className={isScrolled ? 'text-charcoal' : 'text-cream'} size={28} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay — clip-path circle expand animation */}
            <div
                className={`pointer-events-auto fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center p-6 min-h-screen transition-[clip-path] duration-500 ease-in-out ${
                    isMobileMenuOpen
                        ? '[clip-path:circle(150%_at_calc(100%_-_2.5rem)_2.5rem)]'
                        : '[clip-path:circle(0%_at_calc(100%_-_2.5rem)_2.5rem)] pointer-events-none'
                }`}
            >
                <div className="flex flex-col items-center gap-8 text-center">
                    {navLinks.map((link, i) => (
                        <HashLink
                            smooth
                            key={i}
                            to={link.href}
                            onClick={closeMenu}
                            className="mobile-link text-3xl font-sans font-medium text-cream hover:text-flame transition-colors"
                            style={{
                                opacity: isMobileMenuOpen ? 1 : 0,
                                transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                                transition: `opacity 0.4s ease ${200 + i * 80}ms, transform 0.4s ease ${200 + i * 80}ms`,
                            }}
                        >
                            {link.label}
                        </HashLink>
                    ))}
                    <HashLink
                        smooth
                        to="/#contatti"
                        onClick={closeMenu}
                        className="mobile-link mt-8 bg-flame hover:bg-ember text-cream font-sans font-semibold py-4 px-10 rounded-full flex items-center gap-2 text-xl"
                        style={{
                            opacity: isMobileMenuOpen ? 1 : 0,
                            transform: isMobileMenuOpen ? 'translateY(0)' : 'translateY(30px)',
                            transition: `opacity 0.4s ease ${200 + navLinks.length * 80}ms, transform 0.4s ease ${200 + navLinks.length * 80}ms`,
                        }}
                    >
                        <Phone size={24} />
                        Prenota Ora
                    </HashLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
