import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FidelityHero from '@/components/fidelity/FidelityHero';
import FidelityBenefits from '@/components/fidelity/FidelityBenefits';
import FidelityEmbed from '@/components/fidelity/FidelityEmbed';
import FidelityRegolamento from '@/components/fidelity/FidelityRegolamento';
import FidelityFaq from '@/components/fidelity/FidelityFaq';
import FidelityCta from '@/components/fidelity/FidelityCta';
import { siteContent } from '@/data/copy';

const Fidelity = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{siteContent.meta.fidelityTitle}</title>
                <meta
                    name="description"
                    content={siteContent.meta.fidelityDescription}
                />
                <link rel="canonical" href="https://www.mopizz.it/fidelity" />
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
