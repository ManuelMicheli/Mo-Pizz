import FidelityPage from './FidelityPage';
import { buildBreadcrumb, buildFaqSchema } from '@/lib/constants';
import { siteContent } from '@/data/copy';

export const metadata = {
    title: 'Programma Fidelity — Accumula Punti e Ottieni Sconti',
    description: 'Iscriviti al programma Fidelity MO PIZZ: ogni 10€ spesi guadagni 1 punto, raggiungi 10 punti e ottieni il 10% di sconto. Pizzeria napoletana a Legnano, Via Cadore 4.',
    keywords: 'programma fidelity pizzeria legnano, sconti ristorante legnano, punti fedeltà pizzeria, tessera fedeltà ristorante, premi pizzeria',
    alternates: {
        canonical: 'https://www.mopizz.it/fidelity',
    },
    openGraph: {
        title: 'Programma Fidelity MO PIZZ — Accumula Punti',
        description: 'Ogni 10€ spesi guadagni 1 punto. 10 punti = 10% di sconto. Pizzeria napoletana a Legnano, Via Cadore 4.',
        url: 'https://www.mopizz.it/fidelity',
        images: [{ url: '/images/fidelity-hero.webp', width: 1920, height: 1080, alt: 'Programma Fidelity MO PIZZ — Accumula punti alla pizzeria di Legnano' }],
    },
    twitter: {
        title: 'Programma Fidelity MO PIZZ — Accumula Punti',
        description: 'Ogni 10€ spesi guadagni 1 punto. 10 punti = 10% di sconto. Pizzeria napoletana a Legnano.',
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Fidelity', 'https://www.mopizz.it/fidelity');
    const faqSchema = buildFaqSchema(siteContent.fidelity.faqs);

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
            <FidelityPage />
        </>
    );
}
