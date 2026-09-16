'use client';

import { useEffect } from 'react';
import FidelityHero from '@/components/fidelity/FidelityHero';
import FidelityBenefits from '@/components/fidelity/FidelityBenefits';
import FidelityEmbed from '@/components/fidelity/FidelityEmbed';
import FidelityRegolamento from '@/components/fidelity/FidelityRegolamento';
import FidelityFaq from '@/components/fidelity/FidelityFaq';
import FidelityCta from '@/components/fidelity/FidelityCta';
import AppBanner from '@/components/AppBanner';

const FidelityPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <FidelityHero />
            <FidelityBenefits />
            <FidelityEmbed />
            <FidelityRegolamento />
            <FidelityFaq />
            <FidelityCta />
            <AppBanner />
        </>
    );
};

export default FidelityPage;
