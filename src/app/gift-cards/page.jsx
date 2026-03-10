import GiftCardsPage from './GiftCardsPage';
import { buildBreadcrumb, buildFaqSchema } from '@/lib/constants';
import { siteContent } from '@/data/copy';

export const metadata = {
    title: "Gift Card — Regala un'Esperienza Napoletana a Legnano",
    description: "Regala un'esperienza culinaria unica con le gift card MO PIZZ. Tre formule: Esperienza Libera da €15, Pizza per Due €40, Esperienza Napoletana per Due €90. Pizzeria a Legnano.",
    keywords: 'gift card ristorante legnano, buono regalo pizzeria legnano, regalo esperienza culinaria legnano, carta regalo pizzeria, gift card cena',
    alternates: {
        canonical: 'https://www.mopizz.it/gift-cards',
    },
    openGraph: {
        title: "Gift Card MO PIZZ — Regala un'Esperienza Napoletana",
        description: "Tre gift card per regalare l'autentica esperienza napoletana. Esperienza Libera da €15, Pizza per Due €40, Cena Completa €90.",
        url: 'https://www.mopizz.it/gift-cards',
        images: [{ url: '/images/gift-card-hero.webp', width: 1920, height: 1080, alt: 'Gift Card MO PIZZ — Regala la cucina napoletana a Legnano' }],
    },
    twitter: {
        title: "Gift Card MO PIZZ — Regala un'Esperienza Napoletana",
        description: "Tre gift card per regalare l'autentica esperienza napoletana. A partire da €15.",
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Gift Cards', 'https://www.mopizz.it/gift-cards');
    const faqSchema = buildFaqSchema(siteContent.giftCards.faq.items);

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <GiftCardsPage />
        </>
    );
}
