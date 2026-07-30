'use client';
import React, { useEffect } from 'react';
import AspHero from '@/components/asporto/AspHero';
import AspComeFunziona from '@/components/asporto/AspComeFunziona';
import AspIframe from '@/components/asporto/AspIframe';

const AsportoPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="bg-charcoal">
            <AspHero />
            <AspComeFunziona />
            <AspIframe />
        </main>
    );
};

export default AsportoPage;
