import AsportoPage from './AsportoPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Consegna a Domicilio a Legnano — Pizza Napoletana | MO PIZZ',
    description: 'Consegna a domicilio MO PIZZ a Legnano: pizza napoletana cotta nel forno a legna, antipasti e piatti della tradizione consegnati caldi direttamente a casa tua. Ordina online e paga in sicurezza.',
    keywords: 'consegna a domicilio legnano, pizza a domicilio legnano, delivery pizza legnano, pizza a casa legnano, ordina pizza domicilio, consegna pizza napoletana legnano, food delivery legnano',
    alternates: {
        canonical: 'https://www.mopizz.it/asporto',
    },
    openGraph: {
        title: 'Consegna a Domicilio a Legnano — MO PIZZ',
        description: 'Pizza napoletana e piatti tradizionali consegnati caldi direttamente a casa tua. Ordina online da MO PIZZ Legnano.',
        url: 'https://www.mopizz.it/asporto',
        images: [{ url: '/images/asporto-hero.webp', width: 1920, height: 1080, alt: 'Consegna a domicilio MO PIZZ Legnano — Pizza napoletana a casa' }],
    },
    twitter: {
        title: 'Consegna a Domicilio a Legnano — MO PIZZ',
        description: 'Pizza napoletana e piatti tradizionali consegnati caldi direttamente a casa tua. Ordina online.',
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
