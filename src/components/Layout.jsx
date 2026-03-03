import React from 'react';
import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { schemaData } from '@/lib/constants';

// A persistent layout wrapper so Navbar and Footer survive route changes without unmounting
const Layout = () => {
    return (
        <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
            <Helmet>
                <title>Mo Pizz — Pizzeria Napoletana Verace a Legnano</title>
                <meta name="description" content="La vera pizza napoletana a Legnano. Impasto a lievitazione naturale 48-60h, forno a legna 450°C, ingredienti DOP e IGP dai produttori campani. Prenota il tuo tavolo." />
                <meta property="og:title" content="Mo Pizz — Pizzeria Napoletana Verace" />
                <meta property="og:description" content="Dal cuore di Napoli al cuore di Legnano. Pizza napoletana verace con ingredienti DOP, IGP e Presidio Slow Food." />
                <meta property="og:image" content="/og-image.jpg" />
                <meta property="og:type" content="restaurant" />
                <meta property="og:url" content="https://www.mopizz.it" />
                <meta property="og:locale" content="it_IT" />
                <link rel="canonical" href="https://www.mopizz.it" />
                <script type="application/ld+json">
                    {JSON.stringify(schemaData)}
                </script>
            </Helmet>

            <Navbar />

            {/* Main content route injection point */}
            <main className="flex-1">
                <Outlet />
            </main>

            <Footer />
            <CookieBanner />
        </div>
    );
};

export default Layout;
