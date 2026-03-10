import PrivacyPage from './PrivacyPage';

export const metadata = {
    title: { absolute: 'Privacy Policy | MO PIZZ Legnano' },
    description: 'Informativa sulla privacy di MO PIZZ Legnano. Nessun cookie di profilazione, solo cookie tecnici necessari al funzionamento del sito.',
    robots: {
        index: false,
        follow: true,
    },
    alternates: {
        canonical: 'https://www.mopizz.it/privacy',
    },
    openGraph: {
        title: 'Privacy Policy — MO PIZZ',
        description: 'Informativa sulla privacy di MO PIZZ Legnano.',
        url: 'https://www.mopizz.it/privacy',
    },
};

export default function Page() {
    return <PrivacyPage />;
}
