// ═══════════════════════════════════════════════════════
// copy.js — Tutto il copy editoriale di Mo Pizz
// Ogni componente importa da qui. Zero stringhe inline.
// ═══════════════════════════════════════════════════════

export const siteContent = {

  // ─── SEO META ───────────────────────────────────────
  meta: {
    // Homepage
    title: 'MO PIZZ | Pizzeria Napoletana a Legnano — Pizza con Forno a Legna',
    description: 'MO PIZZ è la pizzeria napoletana autentica a Legnano. Pizza con forno a legna e cucina tradizionale, aperti a cena dal martedì alla domenica. Via Cadore 4.',
    keywords: 'pizzeria legnano, ristorante legnano, pizza napoletana legnano, miglior pizzeria legnano, ristorante napoletano legnano, pizza forno a legna legnano, pizzeria vicino a me',
    ogTitle: 'MO PIZZ | Pizzeria Napoletana a Legnano',
    ogDescription: 'Pizza napoletana autentica con forno a legna a Legnano. Cucina tradizionale, aperti a cena dal martedì alla domenica.',
  },

  // ─── NAVIGAZIONE ────────────────────────────────────
  nav: {
    links: [
      { label: 'Home', href: '/#' },
      { label: 'Menu', href: '/#menu' },
      { label: 'Asporto', href: '/asporto', isRoute: true },
      { label: 'Consegne', href: '/consegne', isRoute: true },
      { label: 'Fidelity', href: '/fidelity', isRoute: true },
      { label: 'Eventi', href: '/eventi', isRoute: true },
      { label: 'Contatti', href: '/#contatti' },
    ],
    ctaPrenota: 'Prenota Ora',
    ariaOpenMenu: 'Apri menu',
    ariaCloseMenu: 'Chiudi menu',
  },

  // ─── HERO ───────────────────────────────────────────
  hero: {
    eyebrow: 'Pizzeria Napoletana • Legnano',
    headline: 'Pizza verace.',
    headlineEm: 'Cucina autentica.',
    h1Sr: 'MO PIZZ — Pizzeria Napoletana a Legnano',
    ctaMenu: 'Scopri il Menu',
    ctaPrenota: 'Prenota un Tavolo',
    ariaBackground: 'Interno del ristorante MO PIZZ, pizzeria napoletana a Legnano',
  },

  // ─── STATEMENT / MARQUEE ────────────────────────────
  statement: {
    marquee: 'Mo Pizz — pizza verace, cucina di tradizione, forno a legna.',
  },

  // ─── MENU ───────────────────────────────────────────
  menu: {
    introCta: 'Esplora il Menu',
    introCtaClose: 'Chiudi il Menu',
    highlightEyebrow: 'La Firma dello Chef',
    highlightHeadline: 'I Piatti Iconici',
    copertoNote: 'Coperto e servizio 2,00 € a persona',
  },

  // ─── OFFERTE (promo settimanali) ────────────────────
  offerte: {
    eyebrow: 'Le Nostre Offerte',
    headline: 'Ogni sera',
    headlineEm: 'ha la sua promo.',
    body: 'Gli appuntamenti fissi della settimana da Mo Pizz. Qualcosa in più nel piatto, senza sorprese sul conto.',
    items: [
      {
        day: 'Ogni martedì',
        title: 'MarteBirra',
        price: 'In omaggio',
        desc: 'Prima consumazione in omaggio, a scelta tra birra o bibita.',
        note: 'Offerta valida per ogni commensale che consuma.',
      },
      {
        day: 'Ogni mercoledì',
        title: 'MercolePizza',
        price: '15,00 €',
        desc: '1 pizza a scelta tra le classiche + dolce a scelta + bibita o birra media + limoncello e coperto.',
        note: '',
      },
      {
        day: 'Ogni giovedì',
        title: 'GioveDolce',
        price: 'In omaggio',
        desc: 'Dolce a scelta in omaggio.',
        note: '',
      },
    ],
    disclaimer: 'Le offerte non sono cumulabili con altre promo, coupon o buoni sconto.',
    club: {
      title: 'Club Mo Pizz',
      body: 'Fidelity card con raccolta punti, ordini da asporto e delivery, coupon esclusivi, sconti dedicati agli iscritti e promozioni sempre aggiornate.',
      cta: 'Entra nel Club',
      href: '/fidelity',
    },
  },

  // ─── CHI SIAMO (ex Chef) ───────────────────────────
  chiSiamo: {
    eyebrow: 'Chi Siamo',
    headline: 'Un team',
    headlineEm: 'con le mani in pasta.',
    subheadline: 'A Legnano — passione, visione e fuoco.',
    paragraphs: [
      '**Mo Pizz** nasce dall\'idea della **famiglia Moschiano**: creare a Legnano un locale dove la pizza verace incontra una cucina di tradizione curata nei minimi dettagli. Dal primo giorno, ogni scelta, dalle farine ai fornitori, dal servizio all\'atmosfera, è pensata per offrire un\'esperienza che va oltre il piatto.',
      'In cucina lavora un team affiatato: **Christian**, di formazione campana, segue il forno e gli impasti e firma anche antipasti, fritti e dolci, mentre **Carmine e Alessia** curano la visione e la gestione del brand. Attorno a loro, uno staff giovane e professionale che trasforma ogni serata in qualcosa da ricordare.',
    ],
    quote: 'La pizza è rispetto per la materia prima e amore per il fuoco.',
    photoAlt: 'Il team di MO PIZZ, pizzeria napoletana a Legnano — famiglia Moschiano e lo staff',
  },

  // ─── STAFF ──────────────────────────────────────────
  staff: {
    eyebrow: 'Lo Staff',
    paragraphs: [
      'Varcare la soglia di **Mo Pizz** significa lasciarsi alle spalle il rumore della città e ritrovarsi immersi in un\'atmosfera sospesa tra il contemporaneo e la **tradizione** più genuina. Le luci soffuse avvolgono la sala come un abbraccio, calde e ambrate, mentre il profumo della legna che brucia nel forno si mescola all\'aria con la stessa naturalezza di un ricordo d\'infanzia.',
      'Al centro del progetto c\'è una squadra che lavora con lo stesso ritmo: **Christian** al forno e in cucina, **Carmine e Alessia** dietro le quinte a curare visione e accoglienza, e uno **staff giovane** che ha costruito, sera dopo sera, un modo tutto suo di accogliere le persone, diretto, autentico, senza copione.',
      'Attorno si muove un **gruppo affiatato**, cresciuto nel tempo come si cresce in una famiglia, con fiducia, rispetto e qualche litigata bonaria a fine servizio. C\'è chi accoglie con una battuta pronta, chi ricorda le preferenze dei clienti abituali senza che nessuno glielo abbia chiesto, chi porta i piatti con quella leggerezza elegante che non si insegna sui manuali.',
      'La sala è pensata per farti **stare bene** senza chiederti di cambiare registro: tavoli in legno scuro, linee pulite, dettagli curati con quella sobria eleganza che non urla ma si fa notare. In sottofondo, una selezione musicale che scorre senza imporsi, jazz, soul, qualche traccia indie italiana, a volte il silenzio quasi perfetto di una serata infrasettimanale dove ogni parola sembra più vera.',
      'Essere un cliente di **Mo Pizz** non significa sedersi, ordinare e andarsene: significa entrare a far parte, anche per un\'ora sola, di qualcosa di più grande di una cena fuori. Lo staff lavora perché tu ti senta **visto, non solo servito**, e c\'è una differenza enorme tra le due cose.',
      '**Mo Pizz** è il ritratto di una generazione che ha scelto di fare le cose con **serietà e con gioia** allo stesso tempo, senza nostalgia finta, senza artifici, senza compromessi. Il team porta ogni giorno in sala quella fame di fare bene le cose che si vede negli occhi di chi ha davvero scelto il proprio mestiere. E si percepisce, nel profumo della **pizza appena sfornata**, nel sorriso di chi ti porge il piatto, in quella sensazione rara di aver mangiato qualcosa di vero.',
    ],
  },

  // ─── CHI SIAMO VIDEO (Features + MenuVideoIntro) ───
  chiSiamoVideo: {
    eyebrow: 'Legnano',
    headline: 'Ogni pizza è un racconto',
    headlineEm: 'scritto col fuoco.',
    body: '48 ore di doppia lievitazione. Farine selezionate.\nIngredienti DOP, IGP, Slow Food.\nIl menu firmato dal nostro team.',
  },

  // ─── INSTAGRAM ──────────────────────────────────────
  instagram: {
    handle: '@mo_pizz',
    eyebrow: 'Vivi Mo Pizz, ogni giorno',
    body: 'Le nostre creazioni, il dietro le quinte e l\'atmosfera che ci rende unici.',
    highlights: ['Le nostre creazioni', 'Pizze appena sfornate', 'Il dietro le quinte del forno', 'Le serate da non perdere'],
    cta: 'Seguici ora',
    ctaMobile: 'Seguici su Instagram',
  },

  // ─── RECENSIONI ─────────────────────────────────────
  recensioni: {
    eyebrow: 'Dicono Di Noi',
    headline: 'Cosa Dicono i Nostri Clienti',
    featuredLabel: 'Ultima recensione',
    featuredNudge: 'La prossima potrebbe essere la tua',
    badge1: '4.3/5 su Google — 625+ recensioni',
    badge2: "Travellers' Choice Tripadvisor",
    ctaReviewEyebrow: 'Aiutaci a Crescere',
    ctaReviewHeadline: 'Lascia la tua recensione',
    ctaReviewBody: 'Ti è piaciuta l\'esperienza da Mo Pizz? Raccontalo agli altri — bastano due minuti.',
    ctaGoogle: 'Recensisci su Google',
    ctaTripadvisor: 'Recensisci su Tripadvisor',
  },

  // ─── SEO CONTENT (Homepage) ─────────────────────────
  seoContent: {
    headline: 'Dove Siamo a Legnano',
    paragraphs: [
      'MO PIZZ è la pizzeria napoletana di Legnano dove la tradizione incontra l\'autenticità. In Via Cadore 4, nel cuore di Legnano, prepariamo ogni giorno pizza napoletana con forno a legna, impasto a lunga lievitazione e ingredienti selezionati direttamente dalla Campania.',
      'Il nostro ristorante a Legnano offre un\'esperienza culinaria completa: dalla pizza margherita alle pizze d\'autore dello chef, con antipasti e fritti della tradizione napoletana, panuozzi e dolci della casa. Siamo aperti a cena dal martedì alla domenica, con il forno a legna sempre acceso.',
      'Cerchi una pizzeria a Legnano per una serata speciale, una cena con amici o semplicemente la miglior pizza napoletana della zona? Vieni a trovarci in Via Cadore 4. Accogliamo con piacere anche i clienti dei comuni limitrofi: San Giorgio su Legnano, Canegrate, Cerro Maggiore, Rescaldina e Nerviano. MO PIZZ: il sapore di Napoli a Legnano.',
    ],
    ctaMenu: 'Scopri il nostro menu',
    ctaPrenota: 'Prenota il tuo tavolo',
  },

  // ─── CONTATTI ───────────────────────────────────────
  contatti: {
    eyebrow: 'Contatti',
    headline: 'Vieni a Trovarci',
    indirizzo: 'Via Cadore 4,\n20025 Legnano (MI)',
    telefono: '0331 024363',
    telefonoHref: 'tel:+390331024363',
    instagramHandle: '@mo_pizz',
    orariTitle: 'Orari di Apertura',
    orari: [
      { giorno: 'Lunedì', ore: 'Chiuso', isChiuso: true },
      { giorno: 'Martedì — Giovedì', ore: '19:00 – 22:30' },
      { giorno: 'Venerdì — Sabato', ore: '19:00 – 23:00' },
      { giorno: 'Domenica', ore: '19:00 – 22:30' },
    ],
    ctaChiama: 'Chiama Ora',
    ctaMappa: 'Indicazioni Stradali',
    mappaUrl: 'https://maps.google.com/?q=Mo+Pizz+Via+Cadore+4+Legnano',
    mappaTitle: 'Mappa di Mo Pizz a Legnano',
    mappaCarica: 'Carica Google Maps',
    mappaCookie: 'Accetta i cookie per vedere la mappa',
    mappaDisclaimer: 'Cliccando, i dati verranno inviati a Google',
    mappaCookieDisclaimer: 'La mappa richiede il consenso ai cookie di terze parti',
  },

  // ─── FOOTER ─────────────────────────────────────────
  footer: {
    subTagline: 'Pizzeria & Ristorante — Legnano',
    tagline: 'Passione, tradizione e fuoco.',
    navHeading: 'Navigazione',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'Menu', href: '#menu' },
      { label: 'Offerte', href: '#offerte' },
      { label: 'Chi Siamo', href: '#chi-siamo' },
      { label: 'Asporto', href: 'asporto' },
      { label: 'Consegne', href: 'consegne' },
      { label: 'Contatti', href: '#contatti' },
    ],
    ctaPrenota: 'Prenota',
    ctaEventi: 'Eventi',
    ctaFidelity: 'Fidelity',
    ctaPromozioni: 'Promozioni & Info',
    promozioniUrl: 'https://mopizz.order.xmenu.it/',
    statusOpen: 'Forno Operativo',
    statusClosed: 'Forno Spento',
    legal: `© ${new Date().getFullYear()} Mo Pizz Legnano SRL`,
    piva: 'P.IVA 10529490960',
  },

  // ─── SERVIZI (Asporto + Consegne a domicilio via TheFork) ──
  // theForkUrl: incolla qui il link widget.thefork.com del servizio.
  // Finché è vuoto, la pagina mostra il fallback telefonico.
  servizi: {
    placeholderNote: 'L\'ordine online sarà attivo a breve. Nel frattempo ordina con una telefonata: ti prepariamo tutto al momento.',
    fallbackLead: 'Preferisci il telefono? Chiamaci, prepariamo il tuo ordine al momento.',
    orari: 'Mar–Gio e Dom 19:00–22:30 · Ven–Sab 19:00–23:00 · Lun chiuso',
    telefono: '0331 024363',
    telefonoHref: 'tel:+390331024363',
    asporto: {
      slug: 'asporto',
      orderUrl: 'https://mopizz.order.xmenu.it/order',
      hero: {
        eyebrow: 'Asporto • Legnano',
        headline: 'Il forno a legna,',
        headlineEm: 'da portare a casa.',
        body: 'Pizza napoletana, antipasti e piatti della tradizione preparati al momento. Componi il tuo ordine online e vieni a ritirarlo caldo in Via Cadore 4.',
      },
      comeFunziona: {
        eyebrow: 'In tre passi',
        headline: 'Come Funziona',
        steps: [
          { num: '01', title: 'Componi l\'ordine', desc: 'Sfoglia il menu, scegli pizze e piatti e personalizza come preferisci.' },
          { num: '02', title: 'Conferma', desc: 'Completa l\'ordine online in pochi click e scegli l\'orario di ritiro.' },
          { num: '03', title: 'Ritira al locale', desc: 'Vieni in Via Cadore 4 all\'orario scelto: il tuo ordine è pronto e caldo.' },
        ],
      },
      iframe: {
        eyebrow: 'Componi il tuo ordine',
        headline: 'Ordina',
        headlineEm: 'e Ritira',
        body: 'Sfoglia il menu, scegli i tuoi piatti e completa l\'ordine in pochi click. Ti prepariamo tutto al momento per il ritiro in Via Cadore 4.',
        secureNote: 'Ordine sicuro su xMenu',
        title: 'MO PIZZ — Ordina il tuo asporto online',
      },
    },
    consegne: {
      slug: 'consegne',
      eyebrow: 'Consegne a domicilio • Legnano',
      headline: 'Consegna a',
      headlineEm: 'domicilio.',
      body: 'La vera pizza napoletana a casa tua. Ordina online e ricevi la consegna comodamente a domicilio.',
      widgetTitle: 'Ordina la consegna a domicilio da Mo Pizz con TheFork',
      theForkUrl: '',
    },
  },

  // ─── EVENTI (Serate a tema) ─────────────────────────
  eventi: {
    hero: {
      eyebrow: 'Eventi • Serate a tema a Legnano',
      headline: 'Le nostre',
      headlineEm: 'serate speciali.',
      body: 'Da Mo Pizz non si mangia soltanto: ci si diverte. Appuntamenti fissi e serate a tema per vivere la pizzeria in compagnia, con musica e buon cibo.',
    },
    cenaCantata: {
      badge: 'Ogni Venerdì',
      title: 'Cena Cantata',
      subtitle: 'Una serata di musica, buon cibo e divertimento',
      by: 'con Il Matto e la Volpe',
      poster: '/images/eventi/cena-cantata.webp',
      posterAlt: 'Locandina Cena Cantata da Mo Pizz — ogni venerdì sera, formula All You Can Napoli a 25€ a persona',
      details: [
        { label: 'Quando', value: 'Ogni venerdì sera' },
        { label: 'Orario', value: 'Dalle 21:00' },
        { label: 'Dove', value: 'Legnano, Via Cadore 4' },
        { label: 'Prezzo', value: '25€ a persona' },
      ],
      menuTitle: 'All You Can Napoli',
      menuIntro: 'La formula della serata, una bevanda inclusa:',
      menu: [
        'Antipasti misti',
        'Fritti tipici campani',
        'Pizze no limit',
        'Primi piatti della tradizione',
        'Graffe con Nutella',
      ],
      menuNote: 'Bevanda inclusa: birra, ¼ di vino, bibita o acqua.',
      phone: '0331 024363',
      ctaPrimary: 'Prenota un tavolo',
      ctaSecondary: 'Chiama ora',
    },
  },

  // ─── FIDELITY (Programma fedeltà — xMenu) ───────────
  fidelity: {
    rewardsUrl: 'https://mopizz.xmenu.it/loyalty-signup',
    hero: {
      headlinePart1: 'La tua fedeltà',
      headlinePart2: 'merita un premio.',
      body: 'Accumula punti ad ogni visita e ottieni sconti esclusivi riservati solo a te.',
      bodyHighlight: 'È gratis, ci vuole un minuto.',
    },
    benefits: [
      { title: 'È Gratis', desc: "L'iscrizione non costa nulla, basta un minuto del tuo tempo.", featured: false },
      { title: 'Punti Automatici', desc: 'Ogni volta che mangi da noi, i punti si accumulano senza pensarci.', featured: false },
      { title: 'Sconti Esclusivi', desc: 'Raggiungi la soglia e ottieni il 10% di sconto, riservato solo ai membri Fidelity.', featured: true },
      { title: 'Sempre Aggiornato', desc: 'Ricevi in anteprima news su eventi, serate speciali e promozioni riservate.', featured: false },
    ],
    steps: [
      { num: '01', title: 'Iscriviti', desc: 'Compila il form con i tuoi dati e entra nel programma Fidelity Mo Pizz. È gratis e ci vuole meno di un minuto!', icon: 'UserPlus' },
      { num: '02', title: 'Accumula Punti', desc: 'Ogni 10€ spesi al locale guadagni 1 punto. Goditi i nostri piatti e i punti si accumulano da soli!', icon: 'Coins' },
      { num: '03', title: 'Riscatta il Premio', desc: 'Raggiungi 10 punti e ottieni uno sconto del 10% sul tuo conto. Il tuo palato (e il tuo portafoglio) ti ringrazieranno!', icon: 'Gift' },
    ],
    stepsHeader: { eyebrow: 'Semplice e veloce', headline: 'Come Funziona' },
    faqs: [
      { question: 'Come faccio a controllare i miei punti?', answer: 'I tuoi punti sono memorizzati nel sistema Fidelity e ti verranno comunicati via email. Puoi anche chiedere il tuo saldo direttamente al locale.' },
      { question: 'Quanto tempo ho per utilizzare i punti?', answer: "I punti hanno una validità di 12 mesi dall'inizio del programma. Dopo la scadenza, i punti inutilizzati non saranno più disponibili." },
      { question: 'Posso usare i punti insieme ad altre promozioni?', answer: 'No, i punti Fidelity non sono cumulabili con altre promozioni o sconti in corso. Lo sconto del 10% è applicabile solo singolarmente.' },
      { question: 'Cosa succede se perdo il mio account?', answer: 'Nessun problema! Contattaci a info@mopizz.it e ti aiuteremo a recuperare il tuo profilo e il saldo punti.' },
      { question: "I punti valgono anche per l'asporto e il delivery?", answer: 'Il programma Fidelity è valido esclusivamente per consumazioni presso la sede di Legnano, Via Cadore 4.' },
      { question: 'Come posso cancellarmi dal programma?', answer: "Puoi richiedere la cancellazione in qualsiasi momento contattando il nostro servizio clienti all'indirizzo info@mopizz.it." },
    ],
    faqHeader: { eyebrow: 'Hai domande?', headline: 'Domande Frequenti' },
    regolamento: [
      'Promotore: Mo Pizz Legnano Srl, P.IVA 10847680963.',
      'Durata: inizio 06/01/2026. Proroghe e variazioni saranno comunicate tramite il Regolamento aggiornato.',
      'Ambito territoriale: valido solo presso la sede di Legnano, Via Cadore 4.',
      'Partecipanti: qualsiasi persona fisica maggiorenne o persona giuridica iscritta al programma.',
      'Modalità raccolta punti: ogni 10€ di spesa = 1 punto. Punti personali, non cedibili. In caso di serate particolari o promozioni, il caricamento può essere sospeso.',
      'Utilizzo punti: memorizzati nel sistema Fidelity, consultabili dal cliente. Comunicati via email. Saldo aggiornato con la decurtazione dei punti utilizzati. Validità fino al 06/01/2027; dopo 12 mesi i punti inutilizzati scadono. Punti NON cedibili, sconti NON cumulabili con altre promo.',
      'Natura e valore indicativo: ogni 10 punti = sconto del 10%.',
      'Consultazione regolamento: disponibile in pagina e al link dedicato.',
      "Trattamento dati personali: regolato dall'informativa generale alla voce trattamenti marketing.",
      'Cessazione partecipazione: possibile contattando il servizio clienti. Il ristoratore può escludere partecipanti per giusta causa (violazioni regolamento, assenza a prenotazioni, disdette di ordini take-away/delivery).',
      'Modifica regolamento: il ristoratore si riserva il diritto di modificare il regolamento, comunicando le modifiche ai partecipanti.',
      'Servizio clienti: info@mopizz.it.',
    ],
    regolamentoTitle: 'Regolamento del Programma Fidelity',
    cta: {
      headline: 'Ogni pizza ti avvicina',
      headlineEm: 'al premio.',
      body: 'Iscriviti al programma Fidelity e inizia ad accumulare punti oggi stesso.',
      ctaPrimary: 'Iscriviti al Programma',
      ctaSecondary: 'Scopri il Menu',
    },
  },

};
