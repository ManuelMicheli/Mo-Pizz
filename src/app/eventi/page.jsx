import EventiPage from './EventiPage';
import { buildBreadcrumb } from '@/lib/constants';

export const metadata = {
    title: 'Eventi e Serate a Tema — Cena Cantata ogni Venerdì',
    description: 'Cena Cantata da MO PIZZ: ogni venerdì sera musica, buon cibo e divertimento con la formula All You Can Napoli a 25€ a persona. Pizzeria napoletana a Legnano, Via Cadore 4.',
    keywords: 'cena cantata legnano, serate a tema pizzeria legnano, eventi pizzeria legnano, all you can eat pizza legnano, musica dal vivo ristorante legnano',
    alternates: {
        canonical: 'https://www.mopizz.it/eventi',
    },
    openGraph: {
        title: 'Cena Cantata ogni Venerdì — MO PIZZ Legnano',
        description: 'Ogni venerdì sera musica, buon cibo e divertimento. Formula All You Can Napoli a 25€ a persona. Pizzeria napoletana a Legnano, Via Cadore 4.',
        url: 'https://www.mopizz.it/eventi',
        images: [{ url: '/images/eventi/cena-cantata.webp', width: 1080, height: 1528, alt: 'Locandina Cena Cantata da MO PIZZ — ogni venerdì sera a Legnano' }],
    },
    twitter: {
        title: 'Cena Cantata ogni Venerdì — MO PIZZ Legnano',
        description: 'Ogni venerdì sera musica, buon cibo e divertimento. Formula All You Can Napoli a 25€ a persona.',
    },
};

const eventSchema = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Cena Cantata — All You Can Napoli',
    description: 'Ogni venerdì sera musica, buon cibo e divertimento con Il Matto e la Volpe. Formula All You Can Napoli a 25€ a persona, bevanda inclusa.',
    image: 'https://www.mopizz.it/images/eventi/cena-cantata.webp',
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventSchedule: {
        '@type': 'Schedule',
        repeatFrequency: 'P1W',
        byDay: 'https://schema.org/Friday',
        startTime: '21:00',
    },
    location: {
        '@type': 'Place',
        name: 'MO PIZZ — Pizzeria Napoletana',
        address: {
            '@type': 'PostalAddress',
            streetAddress: 'Via Cadore 4',
            addressLocality: 'Legnano',
            addressRegion: 'MI',
            postalCode: '20025',
            addressCountry: 'IT',
        },
    },
    offers: {
        '@type': 'Offer',
        price: '25',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock',
        url: 'https://www.mopizz.it/eventi',
    },
    organizer: {
        '@type': 'Restaurant',
        name: 'MO PIZZ',
        url: 'https://www.mopizz.it',
        telephone: '+390331024363',
    },
};

export default function Page() {
    const breadcrumb = buildBreadcrumb('Eventi', 'https://www.mopizz.it/eventi');

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(eventSchema) }}
            />
            <EventiPage />
        </>
    );
}
