import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import { GOOGLE_REVIEW_URL, TRIPADVISOR_REVIEW_URL } from '@/lib/constants';
import { siteContent } from '@/data/copy';

const { recensioni } = siteContent;

const ReviewCta = () => (
    <section className="bg-charcoal border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20 py-10 sm:py-14">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 sm:gap-8">
                <div className="flex items-center gap-4">
                    <div className="hidden sm:flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className="fill-gold stroke-gold w-4 h-4" />
                        ))}
                    </div>
                    <p className="font-sans text-cream/70 text-sm sm:text-base text-center sm:text-left">
                        {recensioni.ctaReviewBody}
                    </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                    <a
                        href={GOOGLE_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-cream font-sans font-semibold py-3 px-5 rounded-full text-sm flex items-center gap-2 transition-colors duration-300"
                    >
                        <Star className="fill-gold stroke-gold w-3.5 h-3.5" />
                        {recensioni.ctaGoogle}
                        <ExternalLink size={13} className="text-smoke/50" />
                    </a>
                    <a
                        href={TRIPADVISOR_REVIEW_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn bg-white/[0.06] hover:bg-white/[0.12] border border-white/10 text-cream font-sans font-semibold py-3 px-5 rounded-full text-sm flex items-center gap-2 transition-colors duration-300"
                    >
                        <Star className="fill-gold stroke-gold w-3.5 h-3.5" />
                        {recensioni.ctaTripadvisor}
                        <ExternalLink size={13} className="text-smoke/50" />
                    </a>
                </div>
            </div>
        </div>
    </section>
);

export default ReviewCta;
