import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { Instagram, Facebook, Phone } from 'lucide-react';
import { siteContent } from '@/data/copy';

const { footer } = siteContent;

const getIsOpen = () => {
    const now = new Date();
    const italyTime = new Date(now.toLocaleString('en-US', { timeZone: 'Europe/Rome' }));
    const day = italyTime.getDay(); // 0=Sunday, 1=Monday
    const currentMinutes = italyTime.getHours() * 60 + italyTime.getMinutes();

    // Lunedì chiuso
    if (day === 1) return false;

    // Venerdì (5) e Sabato (6): 12:00–14:30 + 18:00–22:30
    if (day === 5 || day === 6) {
        return (currentMinutes >= 720 && currentMinutes <= 870) ||
               (currentMinutes >= 1080 && currentMinutes <= 1350);
    }

    // Mar–Gio (2-4), Domenica (0): 18:00–22:30
    return currentMinutes >= 1080 && currentMinutes <= 1350;
};

const Footer = () => {
    const [isOpen, setIsOpen] = useState(getIsOpen);

    useEffect(() => {
        const interval = setInterval(() => setIsOpen(getIsOpen()), 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <footer className="w-full pt-12 sm:pt-20 pb-6 sm:pb-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#111111] text-cream rounded-t-[2rem] sm:rounded-t-[4rem] relative mt-[-2rem] z-20">

            {/* Top Divider */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-ember/40"></div>

            <div className="max-w-7xl mx-auto flex flex-col">
                {/* Top Section - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 lg:gap-16 mb-12 sm:mb-20 pb-12 border-b border-smoke/10 text-center md:text-left">

                    {/* Brand Col */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <a href="#" className="mb-2 group">
                            <img src="/images/logo_mopizz.webp" alt="Mo Pizz" className="h-10 sm:h-12 w-auto" />
                        </a>
                        <div className="font-sans text-smoke text-sm uppercase tracking-wide">
                            {footer.subTagline}
                        </div>
                        <div className="font-caveat text-gold text-2xl mt-4 max-w-[250px]">
                            &ldquo;{footer.tagline}&rdquo;
                        </div>
                    </div>

                    {/* Navigation Col */}
                    <div className="flex flex-col items-center md:items-start gap-4 mx-auto md:mx-0">
                        <h4 className="font-sans font-bold text-lg mb-2 uppercase tracking-wide">{footer.navHeading}</h4>
                        <div className="flex flex-col gap-3 font-sans text-smoke">
                            {footer.navLinks.map((link, i) => (
                                <HashLink smooth key={i} to={`/${link.href}`} className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">{link.label}</HashLink>
                            ))}
                            <HashLink smooth to="/#prenota" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300 flex items-center gap-2"><Phone size={18} />{footer.ctaPrenota}</HashLink>
                            <Link to="/ordina" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">{footer.ctaOrdina}</Link>
                            <Link to="/gift-cards" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">{footer.ctaGiftCard}</Link>
                            <Link to="/fidelity" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">{footer.ctaFidelity}</Link>
                        </div>
                    </div>

                    {/* Social & Legal Col */}
                    <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
                        <h4 className="font-sans font-bold text-lg mb-2 uppercase tracking-wide hidden md:block opacity-0">Social</h4>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/mo_pizz" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-12 h-12 rounded-full border border-smoke/30 flex items-center justify-center text-smoke hover:border-flame hover:bg-flame hover:text-cream transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="https://www.facebook.com/MOPIZZ.IT/?locale=it_IT" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-12 h-12 rounded-full border border-smoke/30 flex items-center justify-center text-smoke hover:border-flame hover:bg-flame hover:text-cream transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                        </div>
                        <Link to="/privacy" className="font-sans text-smoke text-sm hover:text-cream transition-colors duration-300">
                            Privacy Policy
                        </Link>
                        <div className="flex flex-col gap-1 mt-auto font-caveat text-smoke text-lg sm:text-xl opacity-60">
                            <p>{footer.legal}</p>
                            <p>{footer.piva}</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Status Indicator */}
                <div className="flex items-center justify-center gap-3">
                    <span className={`w-2.5 h-2.5 rounded-full transition-colors duration-700 ${isOpen ? 'bg-flame shadow-[0_0_10px_#E85D26] animate-[pulse_2s_infinite]' : 'bg-smoke/50'}`}></span>
                    <span className={`font-caveat text-2xl transition-colors duration-700 ${isOpen ? 'text-smoke' : 'text-smoke/40'}`}>
                        {isOpen ? footer.statusOpen : footer.statusClosed}
                    </span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
