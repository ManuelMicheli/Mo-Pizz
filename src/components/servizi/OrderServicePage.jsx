'use client';

import React, { useEffect, useRef } from 'react';
import { Phone, Clock, Info, ShoppingBag, Bike } from 'lucide-react';
import { siteContent } from '@/data/copy';

const { servizi } = siteContent;

// Icona per slug (le funzioni non passano da server a client component)
const ICONS = { asporto: ShoppingBag, consegne: Bike };

/**
 * Pagina servizio ordine (Asporto / Consegne a domicilio).
 * Mostra il widget TheFork se `service.theForkUrl` è valorizzato,
 * altrimenti un fallback telefonico (placeholder finché arriva il link).
 */
const OrderServicePage = ({ service }) => {
    const rootRef = useRef(null);
    const Icon = ICONS[service.slug] || ShoppingBag;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        let ctx;
        let cancelled = false;

        Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
            ([{ default: gsap }, { ScrollTrigger }]) => {
                if (cancelled) return;
                gsap.registerPlugin(ScrollTrigger);
                ctx = gsap.context(() => {
                    gsap.from('.svc-hero-elem', {
                        y: 50, opacity: 0, duration: 1.1, stagger: 0.12,
                        ease: 'power3.out', delay: 0.15,
                    });
                    gsap.from('.svc-card', {
                        y: 60, opacity: 0, scale: 0.98, duration: 1.1, ease: 'power3.out',
                        scrollTrigger: { trigger: '.svc-card', start: 'top 85%', once: true },
                    });
                }, rootRef);
            }
        );

        return () => {
            cancelled = true;
            if (ctx) ctx.revert();
        };
    }, []);

    const hasWidget = Boolean(service.theForkUrl);

    return (
        <main ref={rootRef} className="relative bg-charcoal text-cream overflow-hidden">
            {/* ─── HERO ─────────────────────────────── */}
            <section className="relative w-full pt-32 sm:pt-40 pb-10 sm:pb-14 px-6 sm:px-10 md:px-16 lg:px-20">
                {/* Ambient glow */}
                <div
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,93,38,0.14) 0%, transparent 60%)' }}
                />
                <div className="relative z-10 flex flex-col items-center text-center w-full max-w-3xl mx-auto">
                    <span className="svc-hero-elem inline-flex items-center gap-2 font-mono text-flame text-xs sm:text-sm tracking-[0.25em] uppercase mb-5">
                        <Icon size={16} /> {service.eyebrow}
                    </span>
                    <h1 className="svc-hero-elem font-playfair text-cream leading-[0.95] tracking-tight">
                        <span className="block text-[clamp(2.4rem,7vw,5rem)]">{service.headline}</span>
                        <span className="block italic text-[clamp(2.6rem,8vw,6rem)]">{service.headlineEm}</span>
                    </h1>
                    <p className="svc-hero-elem font-sans text-cream/80 text-[clamp(1rem,1.5vw,1.2rem)] max-w-xl mt-6 leading-relaxed">
                        {service.body}
                    </p>
                </div>
            </section>

            {/* ─── WIDGET / FALLBACK ─────────────────── */}
            <section className="relative w-full pb-24 sm:pb-32 px-6 sm:px-10 md:px-16 lg:px-20">
                <div className={`w-full ${hasWidget ? 'max-w-6xl' : 'max-w-3xl'} mx-auto relative z-10`}>
                    <div className="svc-card w-full rounded-[2.5rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm overflow-hidden">
                        <div className="h-[3px] w-full bg-gradient-to-r from-transparent via-flame to-transparent" />

                        {hasWidget ? (
                            <div className="p-4 sm:p-6">
                                <iframe
                                    src={service.theForkUrl}
                                    title={service.widgetTitle}
                                    className="w-full rounded-[1.5rem] bg-white"
                                    style={{ height: 'min(720px, 90vh)', border: '0' }}
                                    loading="lazy"
                                    allow="payment"
                                />
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-center gap-6 py-14 sm:py-20 px-8">
                                <div className="w-16 h-16 rounded-2xl bg-flame/10 border border-flame/20 flex items-center justify-center">
                                    <Info className="text-flame" size={30} />
                                </div>
                                <p className="font-sans text-cream/80 text-lg sm:text-xl max-w-lg leading-relaxed">
                                    {servizi.placeholderNote}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Fallback telefonico — sempre presente */}
                    <div className="mt-8 flex flex-col items-center text-center gap-4">
                        <p className="font-sans text-smoke/70 text-base">
                            {servizi.fallbackLead}
                        </p>
                        <a
                            href={servizi.telefonoHref}
                            className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-bold py-3.5 px-10 rounded-full text-lg flex items-center gap-3 transition-colors duration-300"
                        >
                            <Phone size={20} />
                            {servizi.telefono}
                        </a>
                        <div className="flex items-center gap-2 text-smoke/60 mt-1">
                            <Clock size={15} />
                            <span className="font-sans text-sm">{servizi.orari}</span>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default OrderServicePage;
