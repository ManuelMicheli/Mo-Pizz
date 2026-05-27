import AsportoPage from './AsportoPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Asporto a Legnano — Pizza Napoletana da Portar via | MO PIZZ',
    description: 'Asporto MO PIZZ a Legnano: pizza napoletana cotta nel forno a legna, antipasti e piatti della tradizione pronti da ritirare. Ordina online, paga in sicurezza e ritira in Via Cadore 4.',
    keywords: 'asporto legnano, pizza asporto legnano, asporto pizzeria legnano, take away pizza legnano, ritiro pizza legnano, ordina pizza asporto, pizza da portar via legnano',
    alternates: {
        canonical: 'https://www.mopizz.it/asporto',
    },
    openGraph: {
        title: 'Asporto a Legnano — MO PIZZ',
        description: 'Pizza napoletana e piatti tradizionali pronti da ritirare. Ordina online e passa a prenderli in Via Cadore 4, Legnano.',
        url: 'https://www.mopizz.it/asporto',
        images: [{ url: '/images/ordina-hero.webp', width: 1920, height: 1080, alt: 'Asporto MO PIZZ Legnano — Pizza napoletana da portar via' }],
    },
    twitter: {
        title: 'Asporto a Legnano — MO PIZZ',
        description: 'Pizza napoletana e piatti tradizionali pronti da ritirare in Via Cadore 4, Legnano.',
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Asporto', 'https://www.mopizz.it/asporto');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <AsportoPage />
        </>
    );
}
