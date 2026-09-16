import React from 'react';
import Image from 'next/image';
import { Apple, PlayCircle } from 'lucide-react';
import { siteContent } from '@/data/copy';
import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/constants';

const { appBanner } = siteContent;

const AppBanner = () => {
    return (
        <section className="w-full bg-gradient-to-r from-charcoal via-[#251a10] to-charcoal border-y border-flame/25 py-4 sm:py-5 px-4 sm:px-8">
            <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center sm:text-left">
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                    <Image
                        src="/images/logo_mopizz.webp"
                        alt="MO PIZZ"
                        width={64}
                        height={62}
                        loading="lazy"
                        className="h-9 sm:h-11 w-auto shrink-0"
                    />
                    <p className="font-sans text-cream text-sm sm:text-base font-medium leading-snug">
                        {appBanner.text}
                    </p>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                    <a
                        href={APP_STORE_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn flex items-center gap-1.5 bg-cream/10 hover:bg-flame border border-cream/20 hover:border-flame text-cream text-xs sm:text-sm font-sans font-semibold py-2 px-4 rounded-full transition-colors duration-300"
                    >
                        <Apple size={16} aria-hidden="true" />
                        {appBanner.ctaAppStore}
                    </a>
                    <a
                        href={GOOGLE_PLAY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="magnetic-btn flex items-center gap-1.5 bg-cream/10 hover:bg-flame border border-cream/20 hover:border-flame text-cream text-xs sm:text-sm font-sans font-semibold py-2 px-4 rounded-full transition-colors duration-300"
                    >
                        <PlayCircle size={16} aria-hidden="true" />
                        {appBanner.ctaGooglePlay}
                    </a>
                </div>
            </div>
        </section>
    );
};

export default AppBanner;
