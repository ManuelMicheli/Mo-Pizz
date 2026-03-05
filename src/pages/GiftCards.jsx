import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GiftCardsHero from '@/components/gift-cards/GiftCardsHero';
import GiftCardsCards from '@/components/gift-cards/GiftCardsCards';
import GiftCardsHowItWorks from '@/components/gift-cards/GiftCardsHowItWorks';
import GiftCardsFaq from '@/components/gift-cards/GiftCardsFaq';
import GiftCardsCta from '@/components/gift-cards/GiftCardsCta';
import { siteContent } from '@/data/copy';

const GiftCards = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{siteContent.meta.giftCardsTitle}</title>
                <meta
                    name="description"
                    content={siteContent.meta.giftCardsDescription}
                />
                <link rel="canonical" href="https://www.mopizz.it/gift-cards" />
            </Helmet>

            <GiftCardsHero />
            <GiftCardsCards />
            <GiftCardsHowItWorks />
            <GiftCardsFaq />
            <GiftCardsCta />
        </>
    );
};

export default GiftCards;
