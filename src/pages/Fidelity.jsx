import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FidelityHero from '@/components/fidelity/FidelityHero';
import FidelityBenefits from '@/components/fidelity/FidelityBenefits';
import FidelityEmbed from '@/components/fidelity/FidelityEmbed';
import FidelityRegolamento from '@/components/fidelity/FidelityRegolamento';
import FidelityFaq from '@/components/fidelity/FidelityFaq';
import FidelityCta from '@/components/fidelity/FidelityCta';
import { siteContent } from '@/data/copy';
import { buildBreadcrumb, buildFaqSchema } from '@/lib/constants';

const Fidelity = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{siteContent.meta.fidelityTitle}</title>
                <meta name="description" content={siteContent.meta.fidelityDescription} />
                <meta name="keywords" content={siteContent.meta.fidelityKeywords} />
                <link rel="canonical" href="https://www.mopizz.it/fidelity" />
                <meta property="og:title" content="Programma Fidelity MO PIZZ — Accumula Punti" />
                <meta property="og:description" content="Ogni 10€ spesi guadagni 1 punto. 10 punti = 10% di sconto. Pizzeria napoletana a Legnano." />
                <meta property="og:url" content="https://www.mopizz.it/fidelity" />
                <meta name="twitter:title" content="Programma Fidelity MO PIZZ — Accumula Punti" />
                <meta name="twitter:description" content="Ogni 10€ spesi guadagni 1 punto. 10 punti = 10% di sconto. Pizzeria napoletana a Legnano." />
                <script type="application/ld+json">
                    {JSON.stringify(buildBreadcrumb('Fidelity', 'https://www.mopizz.it/fidelity'))}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(buildFaqSchema(siteContent.fidelity.faqs))}
                </script>
            </Helmet>

            <FidelityHero />
            <FidelityBenefits />
            <FidelityEmbed />
            <FidelityRegolamento />
            <FidelityFaq />
            <FidelityCta />
        </>
    );
};

export default Fidelity;
