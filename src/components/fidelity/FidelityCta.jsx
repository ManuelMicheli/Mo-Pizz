import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FidelityCta = () => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.fid-cta-elem', {
                y: 50,
                opacity: 0,
                duration: 1,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                },
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    const scrollToForm = (e) => {
        e.preventDefault();
        const el = document.getElementById('fidelity-form');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section ref={sectionRef} className="relative w-full py-28 sm:py-40 overflow-hidden bg-charcoal">
            {/* Full-width gradient background */}
            <div className="absolute inset-0"
                style={{
                    background: 'radial-gradient(ellipse 90% 60% at 50% 100%, rgba(212,168,83,0.18) 0%, transparent 55%)',
                }}
            />

            {/* Secondary glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse, rgba(232,93,38,0.06) 0%, transparent 70%)',
                }}
            />

            {/* Film grain */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.04]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    backgroundSize: '256px 256px',
                }}
            />

            <div className="relative w-full max-w-[1200px] mx-auto px-6 sm:px-12 md:px-16 lg:px-24 text-center flex flex-col items-center gap-10 sm:gap-12">
                <h2 className="fid-cta-elem font-playfair font-bold text-cream text-[clamp(2rem,5vw,4.5rem)] leading-tight">
                    Ogni pizza ti avvicina
                    <br />
                    <span className="italic"
                        style={{
                            background: 'linear-gradient(135deg, #D4A853 0%, #E85D26 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                        }}
                    >
                        al premio.
                    </span>
                </h2>

                <p className="fid-cta-elem font-sans text-smoke/80 text-lg sm:text-xl max-w-xl leading-relaxed">
                    Iscriviti al programma Fidelity e inizia ad accumulare punti oggi stesso.
                </p>

                <div className="fid-cta-elem flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
                    <button
                        onClick={scrollToForm}
                        className="magnetic-btn w-full sm:w-auto bg-gradient-to-r from-gold to-[#c4943d] text-charcoal font-sans font-bold py-4 px-10 sm:py-5 sm:px-14 rounded-full text-lg flex items-center justify-center gap-3 transition-all duration-300 hover:shadow-[0_0_40px_rgba(212,168,83,0.25)]"
                    >
                        Iscriviti al Programma
                        <ArrowRight size={20} />
                    </button>
                    <Link
                        to="/ordina"
                        className="magnetic-btn w-full sm:w-auto border border-white/15 text-cream hover:bg-white/[0.06] font-sans font-medium py-4 px-10 sm:py-5 sm:px-14 rounded-full text-lg flex items-center justify-center gap-3 transition-all duration-300"
                    >
                        Scopri il Menu
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FidelityCta;
