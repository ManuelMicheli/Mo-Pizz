import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-charcoal flex items-center justify-center px-4">
            <div className="text-center">
                <p className="text-[8rem] sm:text-[12rem] leading-none font-playfair font-bold text-flame/20">
                    404
                </p>
                <h1 className="font-playfair font-bold text-3xl sm:text-5xl text-cream -mt-8 sm:-mt-12 relative z-10">
                    Pagina non trovata
                </h1>
                <p className="font-sans text-cream/60 text-lg mt-6 max-w-md mx-auto">
                    La pagina che cerchi non esiste o è stata spostata.
                </p>
                <Link
                    href="/"
                    className="inline-block mt-8 bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-8 rounded-full transition-colors duration-300"
                >
                    Torna alla Home
                </Link>
            </div>
        </div>
    );
}
