import './globals.css';
import { Geist_Mono, Caveat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import LenisProvider from '@/components/LenisProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import ServicesDrawer from '@/components/ServicesDrawer';
import { schemaData, localBusinessSchema, webSiteSchema, GEO } from '@/lib/constants';

// Mono — replaces TestTheFutureMono
const geistMono = Geist_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
    variable: '--font-geist-mono',
    display: 'swap',
});

// Handwritten accents — already OFL
const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-caveat',
    display: 'swap',
});

// Satoshi (Fontshare) loaded via <link> in <head> — free commercial license

export const metadata = {
    metadataBase: new URL('https://www.mopizz.it'),
    title: {
        default: 'MO PIZZ | Pizzeria Napoletana a Legnano — Pizza con Forno a Legna',
        template: '%s | MO PIZZ',
    },
    description: 'MO PIZZ è la pizzeria napoletana autentica a Legnano. Pizza con forno a legna, cucina tradizionale, menu fisso pranzo da €9, asporto, consegna a domicilio e gift card. Via Cadore 4, Legnano (MI).',
    keywords: 'mopizz, mo pizz, mopizz legnano, mopizz.it, mo pizz legnano, pizzeria legnano, ristorante legnano, pizza napoletana legnano, miglior pizzeria legnano, ristorante napoletano legnano, pizza forno a legna legnano, menu fisso pranzo legnano, asporto legnano, consegna a domicilio legnano, pizzeria vicino a me, pizzeria via cadore legnano',
    applicationName: 'MO PIZZ',
    authors: [{ name: 'MO PIZZ', url: 'https://www.mopizz.it' }],
    creator: 'MO PIZZ',
    publisher: 'MO PIZZ',
    category: 'restaurant',
    manifest: '/manifest.webmanifest',
    other: {
        'geo.region': GEO.region,
        'geo.placename': GEO.placename,
        'geo.position': `${GEO.latitude};${GEO.longitude}`,
        ICBM: `${GEO.latitude}, ${GEO.longitude}`,
    },
    // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION / NEXT_PUBLIC_BING_SITE_VERIFICATION
    // in Vercel project env vars to inject verification meta tags.
    verification: {
        ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION && {
            google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        }),
        ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION && {
            other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION },
        }),
    },
    robots: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
    },
    openGraph: {
        title: 'MO PIZZ | Pizzeria Napoletana a Legnano',
        description: 'Pizza napoletana autentica con forno a legna a Legnano. Cucina tradizionale, menu fisso pranzo, asporto e gift card.',
        siteName: 'MO PIZZ',
        url: 'https://www.mopizz.it',
        locale: 'it_IT',
        type: 'website',
        images: [
            {
                url: '/images/hero-home-v2.webp',
                width: 1920,
                height: 1080,
                alt: 'MO PIZZ — Pizzeria Napoletana a Legnano, interno del ristorante',
                type: 'image/webp',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'MO PIZZ | Pizzeria Napoletana a Legnano',
        description: 'Pizza napoletana autentica con forno a legna a Legnano. Cucina tradizionale, menu fisso pranzo, asporto e gift card.',
        images: [{
            url: '/images/hero-home-v2.webp',
            alt: 'MO PIZZ — Pizzeria Napoletana a Legnano',
        }],
    },
    alternates: {
        canonical: 'https://www.mopizz.it',
        languages: {
            'it-IT': 'https://www.mopizz.it',
            'x-default': 'https://www.mopizz.it',
        },
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
    themeColor: '#1A1A1A',
    colorScheme: 'dark',
};

export default function RootLayout({ children }) {
    return (
        <html lang="it" translate="no" className={`${geistMono.variable} ${caveat.variable}`}>
            <head>
                {/* Opt out of mobile browser auto-translation — Google Translate / Safari Translate
                    mutate text nodes and break React reconciliation (NotFoundError on removeChild). */}
                <meta name="google" content="notranslate" />
                {/* Preload CSCaliope display serif (heading font, above the fold) */}
                <link rel="preload" href="/fonts/CSCaliope-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/fonts/CSCaliope-ReverseItalic.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                {/* Preload above-the-fold raster images. Hero bg is handled by next/image
                    priority (it injects its own preload of the OPTIMIZED url) — preloading
                    the raw source here would double-download it, so it is intentionally absent. */}
                <link rel="preload" as="image" href="/images/logo_mopizz.webp" />
                <link rel="preload" as="image" href="/images/services-grid-bg.webp" />
                {/* Satoshi (Fontshare) — free commercial license, body sans.
                    Loaded async (media=print → all) so it never blocks first render. */}
                <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
                <link
                    rel="stylesheet"
                    href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900,1,2&display=swap"
                    media="print"
                    data-satoshi=""
                />
                <script
                    dangerouslySetInnerHTML={{
                        __html: "(function(){var l=document.querySelector('link[data-satoshi]');if(l)l.media='all';})();",
                    }}
                />
                <noscript>
                    <link
                        rel="stylesheet"
                        href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900,1,2&display=swap"
                    />
                </noscript>
                {/* dns-prefetch (not preconnect) for below-the-fold iframe origins —
                    keeps the page under the 4-preconnect budget Lighthouse warns about. */}
                <link rel="dns-prefetch" href="https://www.google.com" />
                <link rel="dns-prefetch" href="https://mopizz.plateform.app" />
                {/* Schema.org JSON-LD */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
                />
            </head>
            <body className="notranslate bg-charcoal text-cream antialiased overflow-x-hidden selection:bg-flame selection:text-cream font-sans">
                <LenisProvider>
                    <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
                        <Navbar />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                        <CookieBanner />
                    </div>
                    <ServicesDrawer />
                </LenisProvider>
                <NoiseOverlay />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
