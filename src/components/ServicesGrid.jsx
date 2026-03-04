import React, { useLayoutEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Gift, ShoppingBag, CalendarHeart, Star, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Row 1: large (2/3) + small (1/3)   |   Row 2: small (1/3) + large (2/3)
const cards = [
    {
        title: 'Gift Card',
        subtitle: 'Regala un\'esperienza napoletana',
        description: 'Sorprendi chi ami con il gusto autentico di Napoli. Scegli tra le nostre gift card e regala un momento indimenticabile.',
        icon: Gift,
        to: '/gift-cards',
        badge: 'Novità',
        badgeColor: 'bg-gold text-charcoal',
        images: [
            '/images/esperienza libera.webp',
            '/images/esperienza napoletana per 2.webp',
            '/images/pizza per due.webp',
        ],
    },
    {
        title: 'Ordina per Asporto',
        subtitle: 'La Napoli che ami, a casa tua',
        description: 'Ordina le nostre specialità e ritira al locale. Tutto preparato al momento.',
        icon: ShoppingBag,
        to: '/ordina',
        badge: 'Ordina Online',
        badgeColor: 'bg-flame text-cream',
        image: '/images/Gemini_Generated_Image_770xr3770xr3770x.webp',
    },
    {
        title: 'Eventi Privati',
        subtitle: 'Prossimamente',
        description: 'Festeggia le tue occasioni speciali con noi. Cene private e celebrazioni in stile napoletano.',
        icon: CalendarHeart,
        to: null,
        badge: 'Coming Soon',
        badgeColor: 'bg-smoke/30 text-cream/70',
        image: null,
    },
    {
        title: 'Fidelity',
        subtitle: 'Accumula punti, ottieni premi',
        description: 'Iscriviti al programma fedeltà: ogni 10€ spesi guadagni 1 punto. Raggiungi 10 punti e ottieni il 10% di sconto.',
        icon: Star,
        to: '/fidelity',
        badge: 'Novità',
        badgeColor: 'bg-gold text-charcoal',
        image: '/images/n2nty4t6f5rmw0cwq8cbbc93w8_upscayl_4x_upscayl-standard-4x.webp',
    },
];

const CardItem = memo(({ card }) => {
    const Icon = card.icon;
    const isPlaceholder = !card.to;
    const hasBg = card.image || card.images;

    const inner = (
        <div
            className={`service-card group relative overflow-hidden rounded-[2rem] h-full min-h-[220px] sm:min-h-[280px] lg:min-h-[340px] p-5 sm:p-8 flex flex-col justify-between will-change-transform ${
                isPlaceholder
                    ? 'bg-charcoal cursor-default'
                    : 'bg-charcoal hover:scale-[1.01] cursor-pointer'
            }`}
            style={{ transform: 'translateZ(0)' }}
        >

            {/* Background image(s) */}
            {card.images ? (
                <>
                    <div className="absolute inset-0 z-0 flex">
                        {card.images.map((src, idx) => (
                            <img key={idx} src={src} alt="" loading="lazy" decoding="async" className="h-full flex-1 min-w-0 object-cover" />
                        ))}
                    </div>
                    {card.hoverImages && (
                        <div className="absolute inset-0 z-0 flex opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                            {card.hoverImages.map((src, idx) => (
                                <img key={idx} src={src} alt="" loading="lazy" decoding="async" className="h-full flex-1 min-w-0 object-cover" />
                            ))}
                        </div>
                    )}
                    <div className="absolute inset-0 bg-charcoal/65 z-[1]" />
                </>
            ) : card.image ? (
                <>
                    <div
                        className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                        style={{ backgroundImage: `url('${card.image}')` }}
                    />
                    {card.hoverImage && (
                        <div
                            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                            style={{ backgroundImage: `url('${card.hoverImage}')` }}
                        />
                    )}
                    <div className="absolute inset-0 bg-charcoal/50 z-[1]" />
                </>
            ) : null}

            {/* Content */}
            <div className="relative z-10 flex flex-col h-full justify-between">
                {/* Top: Icon */}
                <div>
                    <Icon className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.5] ${isPlaceholder ? 'text-cream/20' : hasBg ? 'text-cream/70 group-hover:text-cream transition-colors duration-300' : 'text-cream/40 group-hover:text-gold transition-colors duration-300'}`} />
                </div>

                {/* Bottom: Text */}
                <div className="flex flex-col gap-2 mt-auto">
                    <h3 className={`font-playfair font-black text-xl sm:text-2xl leading-tight ${isPlaceholder ? 'text-cream/30' : 'text-cream'}`}>
                        {card.title}
                    </h3>
                    <p className={`font-sans text-sm leading-relaxed max-w-xs ${isPlaceholder ? 'text-smoke/30' : hasBg ? 'text-cream/80' : 'text-smoke'}`}>
                        {card.description}
                    </p>
                    {!isPlaceholder && (
                        <div className="flex items-center gap-2 mt-2 font-sans font-semibold text-sm text-flame group-hover:text-gold transition-colors duration-300">
                            Scopri di più
                            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

    return card.to ? (
        <Link to={card.to} className="block h-full">
            {inner}
        </Link>
    ) : (
        inner
    );
});

const ServicesGrid = () => {
    const sectionRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from('.services-header', {
                y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
                force3D: true,
                scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' },
            });

            // Row 1: large card from left, small card from right
            gsap.from('.svc-row1-left', {
                xPercent: -8, opacity: 0, duration: 0.9, ease: 'power2.out',
                force3D: true,
                scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
            });
            gsap.from('.svc-row1-right', {
                xPercent: 8, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power2.out',
                force3D: true,
                scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
            });

            // Row 2: small card from left, large card from right
            gsap.from('.svc-row2-left', {
                xPercent: -8, opacity: 0, duration: 0.9, ease: 'power2.out',
                force3D: true,
                scrollTrigger: { trigger: '.svc-row2-left', start: 'top 85%' },
            });
            gsap.from('.svc-row2-right', {
                xPercent: 8, opacity: 0, duration: 0.9, delay: 0.12, ease: 'power2.out',
                force3D: true,
                scrollTrigger: { trigger: '.svc-row2-right', start: 'top 85%' },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative z-10">
            {/* Header — sfondo bianco, scritte arancioni */}
            <div className="bg-cream py-14 sm:py-20 lg:pt-32 lg:pb-8 px-4 sm:px-8 md:px-12">
                <div className="services-header flex flex-col gap-4">
                    <span className="font-mono text-flame text-sm tracking-widest uppercase">
                        I Nostri Servizi
                    </span>
                    <h2 className="font-playfair font-black text-flame text-[clamp(1.8rem,4vw,3.5rem)] leading-[0.95] max-w-xl">
                        Scopri tutto quello che<br />
                        <span className="italic">Mo Pizz</span> ha da offrirti
                    </h2>
                    <p className="font-sans text-flame/70 text-base max-w-lg leading-relaxed">
                        Non solo pizza in sala. Esplora le nostre gift card, ordina per asporto e molto altro ancora.
                    </p>
                </div>
            </div>

            {/* Bento Grid — sfondo arancione */}
            <div
                className="services-grid relative flex flex-col gap-3 sm:gap-4 px-3 sm:px-4 pb-28 lg:pb-40 pt-8 lg:pt-12 overflow-hidden"
                style={{
                    backgroundImage: 'url(/images/f7jz553sphrmr0cwq6k8e1kc48_upscayl_4x_upscayl-standard-4x.webp)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
{/* Sfumatura in basso: → charcoal */}
                <div className="absolute bottom-0 left-0 right-0 h-32 lg:h-48 bg-gradient-to-b from-transparent to-charcoal pointer-events-none z-[1]" />
                {/* Row 1: large (2/3) + small (1/3) */}
                <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[1fr]">
                    <div className="lg:col-span-2 svc-row1-left">
                        <CardItem card={cards[0]} />
                    </div>
                    <div className="lg:col-span-1 svc-row1-right">
                        <CardItem card={cards[1]} />
                    </div>
                </div>
                {/* Row 2: small (1/3) + large (2/3) */}
                <div className="relative z-[2] grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 auto-rows-[1fr]">
                    <div className="lg:col-span-1 svc-row2-left">
                        <CardItem card={cards[2]} />
                    </div>
                    <div className="lg:col-span-2 svc-row2-right">
                        <CardItem card={cards[3]} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ServicesGrid;
