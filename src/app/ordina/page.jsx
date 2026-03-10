import OrdinaPage from './OrdinaPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Ordina Pizza per Asporto a Legnano — Forno a Legna',
    description: 'Ordina pizza napoletana e piatti della tradizione per asporto da MO PIZZ Legnano. Ordina online, prepariamo tutto al momento con forno a legna. Ritira in Via Cadore 4.',
    keywords: 'asporto legnano, pizza asporto legnano, ordina pizza legnano, cibo da asporto legnano, take away legnano, pizza da asporto vicino a me, ordina online pizza',
    alternates: {
        canonical: 'https://www.mopizz.it/ordina',
    },
    openGraph: {
        title: 'Ordina Pizza per Asporto a Legnano — MO PIZZ',
        description: 'Pizza napoletana e cucina tradizionale da asporto. Ordina online, prepariamo tutto al momento con forno a legna. Ritira in Via Cadore 4, Legnano.',
        url: 'https://www.mopizz.it/ordina',
        images: [{ url: '/images/ordina-hero.webp', width: 1920, height: 1080, alt: 'Ordina pizza per asporto da MO PIZZ Legnano' }],
    },
    twitter: {
        title: 'Ordina Pizza per Asporto a Legnano — MO PIZZ',
        description: 'Pizza napoletana e cucina tradizionale da asporto. Ordina online, prepariamo tutto al momento con forno a legna.',
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Ordina per Asporto', 'https://www.mopizz.it/ordina');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <OrdinaPage />
        </>
    );
}
