import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Phone, Menu, X } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isInMenu, setIsInMenu] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const navRef = useRef(null);

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

    useEffect(() => {
        let ctx = gsap.context(() => {
            if (isMobileMenuOpen) {
                gsap.fromTo('.mobile-link',
                    { y: 30, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
                );
            }
        }, navRef);
        return () => ctx.revert();
    }, [isMobileMenuOpen]);

    const navLinks = [
        { label: 'Home', href: '/#' },
        { label: 'Chi Siamo', href: '/#features' },
        { label: 'Menu', href: '/menu' },
        { label: 'Lo Chef', href: '/#chef' },
        { label: 'Contatti', href: '/#contatti' },
    ];

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-center pt-4 sm:pt-6 px-4 pointer-events-none">
            <div
                className={`pointer-events-auto mx-auto rounded-[3rem] transition-all duration-500 flex items-center justify-between
        ${isInMenu
                        ? 'max-w-xs px-4 py-2 bg-charcoal/80 backdrop-blur-xl border border-white/10 shadow-lg scale-90 opacity-70 hover:opacity-100'
                        : isScrolled
                            ? 'w-full max-w-6xl px-6 py-4 bg-cream/90 backdrop-blur-xl border border-smoke/20 shadow-lg'
                            : 'w-full max-w-6xl px-6 py-4 bg-transparent border border-transparent'
                    }`}
            >
                {/* Logo */}
                <HashLink smooth to="/#" className="flex items-center gap-1.5 group">
                    <span className={`uppercase font-sans font-bold text-2xl tracking-tighter transition-colors duration-500 ${isInMenu ? 'text-cream' : isScrolled ? 'text-charcoal' : 'text-cream'}`}>Mo</span>
                    <span className={`font-playfair font-black italic text-2xl transition-colors duration-500 ${isInMenu ? 'text-cream' : isScrolled ? 'text-charcoal' : 'text-cream'}`}>Pizz</span>
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

                {/* Mobile Toggle */}
                <button
                    className="md:hidden p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? (
                        <X className={isScrolled ? 'text-charcoal' : 'text-cream'} />
                    ) : (
                        <Menu className={isScrolled ? 'text-charcoal' : 'text-cream'} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="pointer-events-auto fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center p-6 min-h-screen">
                    <button
                        className="absolute top-8 right-8 text-cream p-2"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <X size={32} />
                    </button>
                    <div className="flex flex-col items-center gap-8 text-center">
                        {navLinks.map((link, i) => (
                            <HashLink
                                smooth
                                key={i}
                                to={link.href}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="mobile-link text-3xl font-sans font-medium text-cream hover:text-flame transition-colors"
                            >
                                {link.label}
                            </HashLink>
                        ))}
                        <HashLink
                            smooth
                            to="/#contatti"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="mobile-link mt-8 bg-flame hover:bg-ember text-cream font-sans font-semibold py-4 px-10 rounded-full flex items-center gap-2 text-xl"
                        >
                            <Phone size={24} />
                            Prenota Ora
                        </HashLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
