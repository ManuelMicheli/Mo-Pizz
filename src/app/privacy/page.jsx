import PrivacyPage from './PrivacyPage';

export const metadata = {
    title: 'Privacy Policy | MO PIZZ',
    description: 'Informativa sulla privacy di MO PIZZ Legnano. Nessun cookie di profilazione. Solo cookie tecnici.',
    alternates: {
        canonical: 'https://www.mopizz.it/privacy',
    },
};

export default function Page() {
    return <PrivacyPage />;
}
