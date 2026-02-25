import { useEffect } from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="bg-charcoal text-cream min-h-screen">
            <div className="max-w-3xl mx-auto py-24 sm:py-32 px-4 sm:px-8">
                <h1 className="font-playfair font-bold text-4xl sm:text-5xl mb-12">
                    Privacy Policy
                </h1>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Titolare del trattamento
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    Mo Pizz Legnano SRL<br />
                    P.IVA 10529490960<br />
                    Via Cadore 4, 20025 Legnano (MI)
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Tipologia di dati raccolti
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    Nessun cookie di profilazione. Solo cookie tecnici (localStorage per preferenza cookie). Nessun dato personale raccolto direttamente.
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Google Maps
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    La mappa nella sezione Contatti si carica solo dopo il consenso esplicito dell&apos;utente. Quando caricata, Google riceve l&apos;indirizzo IP del visitatore. Informativa Google:{' '}
                    <a
                        href="https://policies.google.com/privacy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-flame hover:text-ember underline transition-colors duration-300"
                    >
                        https://policies.google.com/privacy
                    </a>
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Base giuridica
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    Consenso dell&apos;utente per contenuti di terze parti (Google Maps). Legittimo interesse per cookie tecnici necessari al funzionamento del sito.
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Diritti dell&apos;utente
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed mb-4">
                    Ai sensi degli articoli 15-22 del GDPR, hai il diritto di:
                </p>
                <ul className="list-disc list-inside space-y-2 font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    <li>Accesso</li>
                    <li>Rettifica</li>
                    <li>Cancellazione</li>
                    <li>Limitazione</li>
                    <li>Portabilit&agrave;</li>
                    <li>Opposizione</li>
                </ul>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed mt-4">
                    Per esercitare i tuoi diritti contattaci tramite i recapiti indicati.
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Contatti
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    Telefono:{' '}
                    <a
                        href="tel:0331024363"
                        className="text-flame hover:text-ember underline transition-colors duration-300"
                    >
                        0331 024363
                    </a>
                </p>

                <h2 className="font-sans font-bold text-xl sm:text-2xl text-flame mb-4 mt-10">
                    Aggiornamento
                </h2>
                <p className="font-sans text-cream/80 text-base sm:text-lg leading-relaxed">
                    Ultima modifica: Febbraio 2026
                </p>

                <div className="mt-16">
                    <Link
                        to="/"
                        className="font-sans text-flame hover:text-ember text-base sm:text-lg transition-colors duration-300"
                    >
                        &larr; Torna alla Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
