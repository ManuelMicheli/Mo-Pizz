'use client';

export default function Error({ reset }) {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h2 className="font-playfair font-bold text-cream text-3xl sm:text-4xl mb-4">
          Qualcosa è andato storto
        </h2>
        <p className="font-sans text-smoke text-base mb-8 leading-relaxed">
          Si è verificato un errore imprevisto. Riprova o torna alla homepage.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="magnetic-btn bg-flame hover:bg-ember text-cream font-sans font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Riprova
          </button>
          <a
            href="/"
            className="magnetic-btn border-2 border-cream/30 text-cream hover:bg-cream/10 font-sans font-bold py-3 px-8 rounded-full transition-colors duration-300"
          >
            Torna alla Home
          </a>
        </div>
      </div>
    </div>
  );
}
