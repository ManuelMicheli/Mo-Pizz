'use client';

export default function Error({ error, reset }) {
  const details = [
    error?.name && `name: ${error.name}`,
    error?.message && `message: ${error.message}`,
    error?.digest && `digest: ${error.digest}`,
    error?.stack && `stack:\n${error.stack}`,
  ]
    .filter(Boolean)
    .join('\n\n');

  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center px-6 py-12">
      <div className="text-center max-w-3xl w-full">
        <h2 className="font-playfair text-cream text-3xl sm:text-4xl mb-4">
          Qualcosa è andato storto
        </h2>
        <p className="font-sans text-smoke text-base mb-8 leading-relaxed">
          Si è verificato un errore imprevisto. Riprova o torna alla homepage.
        </p>

        {details && (
          <pre
            style={{
              textAlign: 'left',
              background: '#0a0a0a',
              color: '#FFE0B0',
              padding: '12px',
              borderRadius: '12px',
              fontSize: '11px',
              lineHeight: '1.4',
              overflow: 'auto',
              maxHeight: '50vh',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              marginBottom: '24px',
              border: '1px solid rgba(232,93,38,0.3)',
            }}
          >
            {details}
          </pre>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="magnetic-btn bg-flameDark hover:bg-ember text-cream font-sans font-bold py-3 px-8 rounded-full transition-colors duration-300"
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
