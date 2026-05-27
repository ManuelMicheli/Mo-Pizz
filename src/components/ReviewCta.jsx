import React from 'react';
import { Star, ExternalLink, PenLine } from 'lucide-react';
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from '@/lib/constants';
import { siteContent } from '@/data/copy';

const { recensioni } = siteContent;

const ReviewCta = () => (
    <section className="bg-charcoal border-t border-white/[0.04] relative overflow-hidden">
        {/* Soft flame glow backdrop */}
        <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-[0.08]"
            style={{
                background:
                    'radial-gradient(ellipse at 50% 0%, #E85D26 0%, transparent 55%)',
            }}
        />

        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-14 sm:py-20">
            <div className="flex flex-col items-center text-center gap-5">
                {/* Stars */}
                <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="fill-gold stroke-gold w-5 h-5 sm:w-6 sm:h-6" />
                    ))}
                </div>

                {/* Eyebrow */}
                <div className="font-caveat text-gold text-xl sm:text-2xl">
                    {recensioni.ctaReviewEyebrow}
                </div>

                {/* Headline */}
                <h2 className="font-playfair text-cream text-3xl sm:text-4xl md:text-5xl leading-tight max-w-2xl">
                    {recensioni.ctaReviewHeadline}
                </h2>

                {/* Body */}
                <p className="font-sans text-cream/70 text-base sm:text-lg max-w-xl">
                    {recensioni.ctaReviewBody}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-4 w-full sm:w-auto">
                    <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-bold py-4 px-7 rounded-full text-base flex items-center justify-center gap-2.5 transition-colors duration-300 shadow-[0_8px_28px_rgba(232,93,38,0.35)]"
                    >
                        <PenLine className="w-5 h-5" strokeWidth={2.5} />
                        {recensioni.ctaGoogle}
                        <ExternalLink size={16} className="opacity-70" />
                    </a>
                    <a
                        href={TRIPADVISOR_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn bg-cream/[0.08] hover:bg-cream/[0.16] border-2 border-cream/30 hover:border-cream/60 text-cream font-sans font-bold py-4 px-7 rounded-full text-base flex items-center justify-center gap-2.5 transition-all duration-300"
                    >
                        <Star className="fill-gold stroke-gold w-5 h-5" />
                        {recensioni.ctaTripadvisor}
                        <ExternalLink size={16} className="opacity-70" />
                    </a>
                </div>

                {/* Trust badges */}
                <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 font-sans text-xs sm:text-sm text-cream/50 mt-3">
                    <span>{recensioni.badge1}</span>
                    <span className="hidden sm:inline-block w-1 h-1 rounded-full bg-cream/30" />
                    <span>{recensioni.badge2}</span>
                </div>
            </div>
        </div>
    </section>
);

export default ReviewCta;
