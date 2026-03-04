import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import FidelityHero from '@/components/fidelity/FidelityHero';
import FidelityBenefits from '@/components/fidelity/FidelityBenefits';
import FidelityEmbed from '@/components/fidelity/FidelityEmbed';
import FidelityRegolamento from '@/components/fidelity/FidelityRegolamento';
import FidelityFaq from '@/components/fidelity/FidelityFaq';
import FidelityCta from '@/components/fidelity/FidelityCta';

const Fidelity = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>Programma Fidelity | MO PIZZ — Accumula Punti e Ottieni Sconti</title>
                <meta
                    name="description"
                    content="Iscriviti al programma Fidelity MO PIZZ: accumula punti ad ogni visita e ottieni sconti esclusivi. Ogni 10€ spesi guadagni 1 punto, 10 punti = 10% di sconto."
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
