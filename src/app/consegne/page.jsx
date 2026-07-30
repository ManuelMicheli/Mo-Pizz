import OrderServicePage from '@/components/servizi/OrderServicePage';
import { siteContent } from '@/data/copy';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Consegna Pizza a Domicilio a Legnano — Ordina Online',
    description: 'Consegna a domicilio della vera pizza napoletana a Legnano. Ordina online da MO PIZZ e ricevi la tua pizza cotta nel forno a legna comodamente a casa.',
    keywords: 'pizza a domicilio legnano, consegna pizza legnano, pizza domicilio legnano, delivery pizza legnano, pizza napoletana a domicilio legnano',
    alternates: {
        canonical: 'https://www.mopizz.it/consegne',
    },
    openGraph: {
        title: 'Consegna Pizza a Domicilio — MO PIZZ Legnano',
        description: 'La vera pizza napoletana a casa tua. Ordina online e ricevi la consegna a domicilio a Legnano.',
        url: 'https://www.mopizz.it/consegne',
    },
    twitter: {
        title: 'Consegna Pizza a Domicilio — MO PIZZ Legnano',
        description: 'La vera pizza napoletana a casa tua. Ordina online a Legnano.',
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Consegne a domicilio', 'https://www.mopizz.it/consegne');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <OrderServicePage service={siteContent.servizi.consegne} />
        </>
    );
}
