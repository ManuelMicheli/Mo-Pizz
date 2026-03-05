import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import GiftCardsHero from '@/components/gift-cards/GiftCardsHero';
import GiftCardsCards from '@/components/gift-cards/GiftCardsCards';
import GiftCardsHowItWorks from '@/components/gift-cards/GiftCardsHowItWorks';
import GiftCardsFaq from '@/components/gift-cards/GiftCardsFaq';
import GiftCardsCta from '@/components/gift-cards/GiftCardsCta';
import { siteContent } from '@/data/copy';
import { buildBreadcrumb, buildFaqSchema } from '@/lib/constants';

const GiftCards = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <Helmet>
                <title>{siteContent.meta.giftCardsTitle}</title>
                <meta name="description" content={siteContent.meta.giftCardsDescription} />
                <meta name="keywords" content={siteContent.meta.giftCardsKeywords} />
                <link rel="canonical" href="https://www.mopizz.it/gift-cards" />
                <meta property="og:title" content="Gift Card MO PIZZ — Regala la Cucina Napoletana" />
                <meta property="og:description" content="Tre gift card per regalare l'autentica esperienza napoletana. A partire da €15." />
                <meta property="og:url" content="https://www.mopizz.it/gift-cards" />
                <meta name="twitter:title" content="Gift Card MO PIZZ — Regala la Cucina Napoletana" />
                <meta name="twitter:description" content="Tre gift card per regalare l'autentica esperienza napoletana. A partire da €15." />
                <script type="application/ld+json">
                    {JSON.stringify(buildBreadcrumb('Gift Cards', 'https://www.mopizz.it/gift-cards'))}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(buildFaqSchema(siteContent.giftCards.faq.items))}
                </script>
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
