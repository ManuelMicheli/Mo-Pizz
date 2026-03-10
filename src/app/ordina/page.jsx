import OrdinaPage from './OrdinaPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Ordina per Asporto | MO PIZZ — Pizza Napoletana da Asporto a Legnano',
    description: 'Ordina pizza napoletana e piatti della tradizione per asporto da MO PIZZ Legnano. Ordina online, prepariamo tutto al momento con forno a legna. Ritira in Via Cadore 4.',
    keywords: 'asporto legnano, pizza asporto legnano, ordina pizza legnano, cibo da asporto legnano, take away legnano',
    alternates: {
        canonical: 'https://www.mopizz.it/ordina',
    },
    openGraph: {
        title: 'Asporto MO PIZZ — Ordina Pizza Napoletana a Legnano',
        description: 'Pizza e cucina napoletana da asporto. Ordina online e ritira al locale.',
        url: 'https://www.mopizz.it/ordina',
    },
    twitter: {
        title: 'Asporto MO PIZZ — Ordina Pizza Napoletana a Legnano',
        description: 'Pizza e cucina napoletana da asporto. Ordina online e ritira al locale.',
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
