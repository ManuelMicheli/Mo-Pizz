import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from './CookieBanner';
import { schemaData } from '@/lib/constants';
import { siteContent } from '@/data/copy';

// A persistent layout wrapper so Navbar and Footer survive route changes without unmounting
const Layout = () => {
    const { pathname } = useLocation();

    // Scroll to top on every route change, including Lenis
    useEffect(() => {
        window.scrollTo(0, 0);
        if (window.__lenis) {
            window.__lenis.scrollTo(0, { immediate: true });
        }
    }, [pathname]);

    return (
        <div className="relative w-full min-h-screen bg-charcoal font-sans text-cream selection:bg-flame flex flex-col">
            <Helmet>
                <title>{siteContent.meta.title}</title>
                <meta name="description" content={siteContent.meta.description} />
                <meta property="og:title" content={siteContent.meta.ogTitle} />
                <meta property="og:description" content={siteContent.meta.ogDescription} />
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
