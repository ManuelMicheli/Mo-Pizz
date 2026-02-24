import React from 'react';
import { Instagram, Facebook, Phone } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="w-full pt-16 sm:pt-20 pb-8 sm:pb-10 px-4 sm:px-8 md:px-16 lg:px-32 bg-[#111111] text-cream rounded-t-[3rem] sm:rounded-t-[4rem] relative mt-[-2rem] z-20">

            {/* Top Divider */}
            <div className="absolute top-0 left-12 right-12 h-[1px] bg-ember/40"></div>

            <div className="max-w-7xl mx-auto flex flex-col">
                {/* Top Section - 3 Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mb-20 pb-12 border-b border-smoke/10 text-center md:text-left">

                    {/* Brand Col */}
                    <div className="flex flex-col items-center md:items-start gap-3">
                        <a href="#" className="flex items-center gap-1.5 mb-2 group">
                            <span className="uppercase font-sans font-bold text-3xl tracking-tighter text-cream transition-colors duration-500 group-hover:text-flame">Mo</span>
                            <span className="font-playfair font-black italic text-3xl text-cream transition-colors duration-500 group-hover:text-flame">Pizz</span>
                        </a>
                        <div className="font-sans text-smoke text-sm uppercase tracking-wide">
                            La Vera Pizza Napoletana — Legnano
                        </div>
                        <div className="font-caveat text-gold text-2xl mt-4 max-w-[250px]">
                            "Passione, tradizione e fuoco dal 2019."
                        </div>
                    </div>

                    {/* Navigation Col */}
                    <div className="flex flex-col items-center md:items-start gap-4 mx-auto md:mx-0">
                        <h4 className="font-sans font-bold text-lg mb-2 uppercase tracking-wide">Navigazione</h4>
                        <div className="flex flex-col gap-3 font-sans text-smoke">
                            <a href="#" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">Home</a>
                            <a href="#menu" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">Menu</a>
                            <a href="#chef" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">Lo Chef</a>
                            <a href="#contatti" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300">Contatti</a>
                            <a href="#contatti" className="py-1 hover:text-cream hover:-translate-y-[1px] transition-all duration-300 flex items-center gap-2"><Phone size={18} />Prenota</a>
                        </div>
                    </div>

                    {/* Social & Legal Col */}
                    <div className="flex flex-col items-center md:items-end gap-6 text-center md:text-right">
                        <h4 className="font-sans font-bold text-lg mb-2 uppercase tracking-wide hidden md:block opacity-0">Social</h4>
                        <div className="flex items-center gap-4">
                            <a href="https://instagram.com/mo_pizz" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-smoke/30 flex items-center justify-center text-smoke hover:border-flame hover:bg-flame hover:text-cream transition-all duration-300">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-full border border-smoke/30 flex items-center justify-center text-smoke hover:border-flame hover:bg-flame hover:text-cream transition-all duration-300">
                                <Facebook size={20} />
                            </a>
                        </div>
                        <div className="flex flex-col gap-1 mt-auto font-caveat text-smoke text-lg sm:text-xl opacity-60">
                            <p>© 2025 Mo Pizz Legnano SRL</p>
                            <p>P.IVA 10529490960</p>
                        </div>
                    </div>

                </div>

                {/* Bottom Status Indicator */}
                <div className="flex items-center justify-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-flame shadow-[0_0_10px_#E85D26] animate-[pulse_2s_infinite]"></span>
                    <span className="font-caveat text-2xl text-smoke">Forno Operativo</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
