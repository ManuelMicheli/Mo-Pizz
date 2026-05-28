'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const CookieBanner = () => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('mopizz-consent')) return;
        // Show after the page settles. The banner is a large fixed card; if it
        // painted during the initial load it became the LCP element (only Google
        // Maps below the fold needs consent, so a brief delay is harmless).
        let handle;
        const show = () => setVisible(true);
        if (typeof requestIdleCallback === 'function') {
            handle = requestIdleCallback(show, { timeout: 3000 });
        } else {
            handle = setTimeout(show, 1500);
        }
        return () => {
            if (typeof cancelIdleCallback === 'function' && handle) cancelIdleCallback(handle);
            clearTimeout(handle);
        };
    }, []);

    const handleAccept = () => {
        localStorage.setItem('mopizz-consent', 'all');
        setVisible(false);
        window.dispatchEvent(new Event('consent-changed'));
    };

    const handleReject = () => {
        localStorage.setItem('mopizz-consent', 'necessary');
        setVisible(false);
        window.dispatchEvent(new Event('consent-changed'));
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 inset-x-0 z-[9999] p-4 sm:p-6">
            <div className="max-w-2xl mx-auto bg-charcoal border border-smoke/20 rounded-[2rem] p-6 sm:p-8 shadow-2xl">
                <p className="font-sans text-cream text-sm sm:text-base mb-2">
                    Questo sito utilizza solo cookie tecnici necessari. La mappa di Google Maps richiede il tuo consenso per caricarsi, poiché invia dati a Google.
                </p>
                <p className="font-sans text-smoke text-xs sm:text-sm mb-6">
                    Leggi la nostra{' '}
                    <Link href="/privacy" className="text-flame underline hover:text-ember transition-colors">
                        Privacy Policy
                    </Link>{' '}
                    per maggiori informazioni.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleAccept}
                        className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm sm:text-base"
                    >
                        Accetta Tutto
                    </button>
                    <button
                        onClick={handleReject}
                        className="magnetic-btn border border-smoke/30 text-smoke hover:text-cream hover:border-cream font-sans font-semibold py-3 px-6 rounded-full transition-colors duration-300 text-sm sm:text-base"
                    >
                        Solo Necessari
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CookieBanner;
