'use client';

import { useEffect } from 'react';
import GiftCardsHero from '@/components/gift-cards/GiftCardsHero';
import GiftCardsCards from '@/components/gift-cards/GiftCardsCards';
import GiftCardsHowItWorks from '@/components/gift-cards/GiftCardsHowItWorks';
import GiftCardsFaq from '@/components/gift-cards/GiftCardsFaq';
import GiftCardsCta from '@/components/gift-cards/GiftCardsCta';

const GiftCardsPage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <GiftCardsHero />
            <GiftCardsCards />
            <GiftCardsHowItWorks />
            <GiftCardsFaq />
            <GiftCardsCta />
        </>
    );
};

export default GiftCardsPage;
