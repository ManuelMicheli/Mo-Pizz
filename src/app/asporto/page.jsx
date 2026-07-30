import AsportoPage from './AsportoPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Pizza da Asporto a Legnano — Ordina e Ritira',
    description: 'Pizza napoletana da asporto a Legnano. Ordina la tua pizza cotta nel forno a legna e ritirala calda in Via Cadore 4. Aperti a cena dal martedì alla domenica.',
    keywords: 'pizza asporto legnano, pizza da asporto legnano, asporto pizzeria legnano, ritiro pizza legnano, pizza napoletana asporto',
    alternates: {
        canonical: 'https://www.mopizz.it/asporto',
    },
    openGraph: {
        title: 'Pizza da Asporto — MO PIZZ Legnano',
        description: 'Ordina la tua pizza napoletana e ritirala calda in Via Cadore 4, a Legnano. Cotta al momento nel forno a legna.',
        url: 'https://www.mopizz.it/asporto',
    },
    twitter: {
        title: 'Pizza da Asporto — MO PIZZ Legnano',
        description: 'Ordina la tua pizza napoletana e ritirala calda in Via Cadore 4, a Legnano.',
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
