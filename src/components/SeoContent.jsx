import React from 'react';
import Link from 'next/link';
import { siteContent } from '@/data/copy';

const { seoContent } = siteContent;

const SeoContent = () => {
    return (
        <section className="py-16 sm:py-24 px-6 sm:px-12 md:px-20 lg:px-32 bg-flour text-charcoal">
            <div className="max-w-4xl mx-auto">
                <h2 className="font-playfair font-bold text-3xl sm:text-4xl md:text-5xl mb-8 text-charcoal">
                    {seoContent.headline}
                </h2>
                <div className="flex flex-col gap-5 font-sans text-charcoal/80 text-base sm:text-lg leading-relaxed">
                    {seoContent.paragraphs.map((p, i) => (
                        <p key={i}>{p}</p>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-8 font-sans text-sm sm:text-base">
                    <Link href="/ordina" className="text-flame hover:text-ember font-medium transition-colors underline underline-offset-4">
                        {seoContent.ctaOrdina}
                    </Link>
                    <Link href="/gift-cards" className="text-flame hover:text-ember font-medium transition-colors underline underline-offset-4">
                        {seoContent.ctaGiftCard}
                    </Link>
                    <Link href="/fidelity" className="text-flame hover:text-ember font-medium transition-colors underline underline-offset-4">
                        {seoContent.ctaFidelity}
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default SeoContent;
