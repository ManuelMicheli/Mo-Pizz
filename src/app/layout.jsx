import './globals.css';
import { Playfair_Display, Inter, JetBrains_Mono, Caveat } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CookieBanner from '@/components/CookieBanner';
import LenisProvider from '@/components/LenisProvider';
import NoiseOverlay from '@/components/NoiseOverlay';
import { schemaData, localBusinessSchema, webSiteSchema } from '@/lib/constants';

// Display serif — replaces CSCaliope (Didone-style)
const playfair = Playfair_Display({
    subsets: ['latin'],
    weight: ['400', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-playfair',
    display: 'swap',
});

// Body / UI sans — replaces TestTheFuture (geometric grotesk)
const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '900'],
    style: ['normal', 'italic'],
    variable: '--font-sans',
    display: 'swap',
});

// Mono — replaces TestTheFutureMono
const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-mono',
    display: 'swap',
});

// Caveat — handwritten accents
const caveat = Caveat({
    subsets: ['latin'],
    weight: ['400', '700'],
    variable: '--font-caveat',
    display: 'swap',
});

export const metadata = {
    metadataBase: new URL('https://www.mopizz.it'),
    title: {
        default: 'MO PIZZ | Pizzeria Napoletana a Legnano — Pizza con Forno a Legna',
        template: '%s | MO PIZZ',
    },
    description: 'MO PIZZ è la pizzeria napoletana autentica a Legnano. Pizza con forno a legna, cucina tradizionale, menu fisso pranzo da €9, asporto e gift card. Via Cadore 4.',
    keywords: 'pizzeria legnano, ristorante legnano, pizza napoletana legnano, miglior pizzeria legnano, ristorante napoletano legnano, pizza forno a legna legnano, menu fisso pranzo legnano, asporto legnano, pizzeria vicino a me',
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
                url: '/images/hero-home.webp',
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
            url: '/images/hero-home.webp',
            alt: 'MO PIZZ — Pizzeria Napoletana a Legnano',
        }],
    },
    alternates: {
        canonical: 'https://www.mopizz.it',
    },
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    viewportFit: 'cover',
};

export default function RootLayout({ children }) {
    return (
        <html lang="it" className={`${playfair.variable} ${inter.variable} ${jetbrainsMono.variable} ${caveat.variable}`}>
            <head>
                {/* Hero images preloaded via next/image priority prop */}
                {/* Preconnect for iframe origins */}
                <link rel="preconnect" href="https://www.google.com" />
                <link rel="preconnect" href="https://mopizz.plateform.app" />
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
            <body className="bg-charcoal text-cream antialiased overflow-x-hidden selection:bg-flame selection:text-cream font-sans">
                <LenisProvider>
                    <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
                        <Navbar />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                        <CookieBanner />
                    </div>
                </LenisProvider>
                <NoiseOverlay />
                <Analytics />
                <SpeedInsights />
            </body>
        </html>
    );
}
