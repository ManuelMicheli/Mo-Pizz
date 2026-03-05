// ═══════════════════════════════════════════════════════
// copy.js — Tutto il copy editoriale di Mo Pizz
// Ogni componente importa da qui. Zero stringhe inline.
// ═══════════════════════════════════════════════════════

export const siteContent = {

  // ─── SEO META ───────────────────────────────────────
  meta: {
    title: 'Mo Pizz — Pizzeria e Ristorante a Legnano',
    description: 'Pizzeria e ristorante a Legnano: pizza verace con lievitazione 48-60h, cucina di tradizione, ingredienti DOP e IGP. Prenota il tuo tavolo.',
    ogTitle: 'Mo Pizz — Pizzeria e Ristorante a Legnano',
    ogDescription: 'Pizza verace e cucina autentica a Legnano. Forno a legna, ingredienti selezionati, atmosfera unica. Dal 2019.',
    // Sub-pages
    giftCardsTitle: 'Gift Card — Mo Pizz Legnano',
    giftCardsDescription: 'Regala un\'esperienza autentica da Mo Pizz. Scegli tra le nostre gift card e sorprendi chi ami con pizza verace e cucina di tradizione a Legnano.',
    fidelityTitle: 'Programma Fidelity | Mo Pizz — Accumula Punti e Ottieni Sconti',
    fidelityDescription: 'Iscriviti al programma Fidelity Mo Pizz: accumula punti ad ogni visita e ottieni sconti esclusivi. Ogni 10€ spesi guadagni 1 punto, 10 punti = 10% di sconto.',
    ordinaTitle: 'Ordina per Asporto — Mo Pizz Legnano',
    ordinaDescription: 'Ordina la tua pizza e i piatti di Mo Pizz online, ritira al locale. Pronto in 20-30 minuti.',
  },

  // ─── NAVIGAZIONE ────────────────────────────────────
  nav: {
    links: [
      { label: 'Home', href: '/#' },
      { label: 'Chi Siamo', href: '/#chi-siamo' },
      { label: 'Menu', href: '/#menu' },
      { label: 'Gift Card', href: '/gift-cards', isRoute: true },
      { label: 'Fidelity', href: '/fidelity', isRoute: true },
      { label: 'Contatti', href: '/#contatti' },
    ],
    ctaOrdina: 'Ordina',
    ctaPrenota: 'Prenota Ora',
    ariaOpenMenu: 'Apri menu',
    ariaCloseMenu: 'Chiudi menu',
  },

  // ─── HERO ───────────────────────────────────────────
  hero: {
    eyebrow: 'Pizzeria & Ristorante • Legnano',
    headline: 'Pizza verace.',
    headlineEm: 'Cucina autentica.',
    ctaMenu: 'Scopri il Menu',
    ctaPrenota: 'Prenota un Tavolo',
    ariaBackground: 'Mo Pizz — Pizzeria e Ristorante a Legnano',
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
    highlightCtaEyebrow: 'Vuoi scoprire tutto?',
    highlightCtaLabel: 'Scarica il Menu Completo',
  },

  // ─── CHI SIAMO (ex Chef) ───────────────────────────
  chiSiamo: {
    eyebrow: 'Chi Siamo',
    headline: 'Un team',
    headlineEm: 'con le mani in pasta.',
    subheadline: 'Dal 2019 a Legnano — passione, visione e fuoco.',
    paragraphs: [
      'Mo Pizz nasce nel 2019 dall\'idea di Cristian e Lule: creare a Legnano un locale dove la pizza verace incontra una cucina di tradizione curata nei minimi dettagli. Dal primo giorno, ogni scelta — dalle farine ai fornitori, dal servizio all\'atmosfera — è pensata per offrire un\'esperienza che va oltre il piatto.',
      'In cucina lavora un team affiatato: Cristian segue il forno e gli impasti, il cuoco — di formazione campana — firma antipasti, primi e secondi, mentre Lule cura la visione e la gestione del brand. Attorno a loro, uno staff giovane e professionale che trasforma ogni serata in qualcosa da ricordare.',
    ],
    quote: 'La pizza è rispetto per la materia prima e amore per il fuoco.',
    photoAlt: 'Il team di Mo Pizz',
  },

  // ─── STAFF ──────────────────────────────────────────
  staff: {
    eyebrow: 'Lo Staff',
    paragraphs: [
      'Varcare la soglia di Mo Pizz significa lasciarsi alle spalle il rumore della città e ritrovarsi immersi in un\'atmosfera sospesa tra il contemporaneo e la tradizione più genuina. Le luci soffuse avvolgono la sala come un abbraccio, calde e ambrate, mentre il profumo della legna che brucia nel forno si mescola all\'aria con la stessa naturalezza di un ricordo d\'infanzia.',
      'Al centro del progetto c\'è una squadra che lavora con lo stesso ritmo: Cristian al forno, Lule dietro le quinte, il cuoco che porta la sua formazione del sud tra primi di mare e secondi di terra, e uno staff giovane che ha costruito, sera dopo sera, un modo tutto suo di accogliere le persone — diretto, autentico, senza copione.',
      'Attorno si muove un gruppo affiatato, cresciuto nel tempo come si cresce in una famiglia — con fiducia, rispetto e qualche litigata bonaria a fine servizio. C\'è chi accoglie con una battuta pronta, chi ricorda le preferenze dei clienti abituali senza che nessuno glielo abbia chiesto, chi porta i piatti con quella leggerezza elegante che non si insegna sui manuali.',
      'La sala è pensata per farti stare bene senza chiederti di cambiare registro: tavoli in legno scuro, linee pulite, dettagli curati con quella sobria eleganza che non urla ma si fa notare. In sottofondo, una selezione musicale che scorre senza imporsi — jazz, soul, qualche traccia indie italiana, a volte il silenzio quasi perfetto di una serata infrasettimanale dove ogni parola sembra più vera.',
      'Essere un cliente di Mo Pizz non significa sedersi, ordinare e andarsene: significa entrare a far parte, anche per un\'ora sola, di qualcosa di più grande di una cena fuori. Lo staff lavora perché tu ti senta visto, non solo servito — e c\'è una differenza enorme tra le due cose.',
      'Mo Pizz è il ritratto di una generazione che ha scelto di fare le cose con serietà e con gioia allo stesso tempo — senza nostalgia finta, senza artifici, senza compromessi. Il team porta ogni giorno in sala quella fame di fare bene le cose che si vede negli occhi di chi ha davvero scelto il proprio mestiere. E si percepisce, nel profumo della pizza appena sfornata, nel sorriso di chi ti porge il piatto, in quella sensazione rara di aver mangiato qualcosa di vero.',
    ],
  },

  // ─── CHI SIAMO VIDEO (Features + MenuVideoIntro) ───
  chiSiamoVideo: {
    eyebrow: 'Dal 2019, Legnano',
    headline: 'Ogni pizza è un racconto',
    headlineEm: 'scritto col fuoco.',
    body: '48 ore di doppia lievitazione. Farine selezionate.\nIngredienti DOP, IGP, Slow Food.\nIl menu firmato dal nostro team.',
  },

  // ─── INSTAGRAM ──────────────────────────────────────
  instagram: {
    handle: '@mo_pizz',
    eyebrow: 'Seguici su Instagram',
    body: 'Le nostre creazioni, il dietro le quinte e l\'atmosfera che ci rende unici.',
    cta: 'Vedi il profilo',
    ctaMobile: 'Seguici su Instagram',
  },

  // ─── RECENSIONI ─────────────────────────────────────
  recensioni: {
    eyebrow: 'Dicono Di Noi',
    headline: 'Cosa Dicono i Nostri Clienti',
    badge1: '4.2/5 su Google — 620+ recensioni',
    badge2: "Travellers' Choice Tripadvisor",
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
      { giorno: 'Martedì — Giovedì', ore: '18:00 – 22:30' },
      { giorno: 'Venerdì — Sabato', ore: '12:00 – 14:30\n18:00 – 22:30' },
      { giorno: 'Domenica', ore: '18:00 – 22:30' },
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
    tagline: 'Passione, tradizione e fuoco dal 2019.',
    navHeading: 'Navigazione',
    navLinks: [
      { label: 'Home', href: '#' },
      { label: 'Menu', href: '#menu' },
      { label: 'Chi Siamo', href: '#chi-siamo' },
      { label: 'Contatti', href: '#contatti' },
    ],
    ctaPrenota: 'Prenota',
    ctaOrdina: 'Ordina Online',
    ctaGiftCard: 'Gift Card',
    ctaFidelity: 'Fidelity',
    statusOpen: 'Forno Operativo',
    statusClosed: 'Forno Spento',
    legal: '© 2025 Mo Pizz Legnano SRL',
    piva: 'P.IVA 10529490960',
  },

  // ─── SERVICES GRID ──────────────────────────────────
  services: {
    eyebrow: 'I Nostri Servizi',
    headline: 'Scopri tutto quello che',
    headlineEm: 'Mo Pizz',
    headlineSuffix: 'ha da offrirti',
    subtext: 'Non solo pizza in sala. Esplora le nostre gift card, ordina per asporto e molto altro ancora.',
    cards: [
      {
        title: 'Gift Card',
        subtitle: 'Regala un\'esperienza unica',
        description: 'Sorprendi chi ami con il gusto autentico della nostra cucina. Scegli tra le nostre gift card e regala un momento indimenticabile.',
      },
      {
        title: 'Ordina per Asporto',
        subtitle: 'Il nostro forno, a casa tua',
        description: 'Ordina le nostre specialità e ritira al locale. Tutto preparato al momento.',
      },
      {
        title: 'Eventi Privati',
        subtitle: 'Prossimamente',
        description: 'Festeggia le tue occasioni speciali con noi. Cene private e celebrazioni su misura.',
      },
      {
        title: 'Fidelity',
        subtitle: 'Accumula punti, ottieni premi',
        description: 'Iscriviti al programma fedeltà: ogni 10€ spesi guadagni 1 punto. Raggiungi 10 punti e ottieni il 10% di sconto.',
      },
    ],
  },

  // ─── ORDINA (Asporto) ──────────────────────────────
  ordina: {
    hero: {
      eyebrow: 'Asporto • Ordina Online',
      headline: 'Il nostro forno,',
      headlineEm: 'a casa tua.',
      body: 'La stessa pizza del nostro forno a legna, pronta da ritirare in pochi minuti. Ordina online e vieni a prenderla calda.',
      ctaPrimary: 'Ordina Ora',
      ctaSecondary: 'Vedi il Menu',
    },
    comeFunziona: {
      eyebrow: 'Semplice e veloce',
      headline: 'Come Funziona',
      steps: [
        { num: '01', title: 'Scegli', desc: 'Sfoglia il menu e componi il tuo ordine con pochi tap.' },
        { num: '02', title: 'Ordina', desc: 'Conferma e paga online in modo sicuro su Plateform.' },
        { num: '03', title: 'Ritira', desc: "Passa in pizzeria all'orario indicato e ritira il tuo ordine caldo." },
      ],
    },
    infoPratiche: {
      eyebrow: 'Info utili',
      headline: 'Informazioni Pratiche',
      cards: [
        {
          title: 'Orari Asporto',
          lines: ['Lunedì: Chiuso', 'Mar – Gio: 18:00 – 22:30', 'Ven – Sab: 12:00 – 14:30 / 18:00 – 22:30', 'Domenica: 18:00 – 22:30'],
        },
        {
          title: 'Tempo di Preparazione',
          lines: ['Circa 20–30 minuti', "dalla conferma dell'ordine."],
        },
        {
          title: 'Dove Ritirare',
          lines: ['Via Cadore 4, Legnano (MI)'],
          link: { href: 'https://maps.google.com/?q=Mo+Pizz+Via+Cadore+4+Legnano', label: 'Apri in Google Maps →' },
        },
        {
          title: 'Pagamento',
          lines: ['Online con carta di credito/debito', 'oppure in pizzeria al ritiro.'],
        },
      ],
    },
    perche: {
      eyebrow: 'Perché Mo Pizz',
      headline: 'La Differenza Mo Pizz',
      usps: [
        { num: '01', title: 'Impasto Autentico', desc: 'Lievitazione naturale 48–60 ore per una pizza leggera e digeribile.' },
        { num: '02', title: 'Ingredienti DOP', desc: 'Mozzarella di bufala, pomodoro San Marzano e farine selezionate.' },
        { num: '03', title: 'Sempre Caldo', desc: 'Preparato al momento del ritiro per garantire freschezza e qualità.' },
        { num: '04', title: 'Ordine Sicuro', desc: 'Pagamento protetto online o comodamente al ritiro in pizzeria.' },
      ],
    },
    ctaFinale: {
      headline: 'Pronto per ordinare?',
      body: 'La tua pizza preferita ti aspetta. Ordina online o chiamaci direttamente.',
      ctaPrimary: 'Ordina Ora',
      ctaSecondary: 'Chiama per Ordinare',
    },
  },

  // ─── GIFT CARDS ─────────────────────────────────────
  giftCards: {
    hero: {
      eyebrow: 'Un regalo speciale per chi ami',
      headline: 'Non solo pizza,',
      headlineEm: "regala un'esperienza.",
      body: 'Le nostre gift card portano il calore del forno e la passione per la tradizione direttamente nelle mani di chi vuoi bene.',
    },
    cards: {
      headerBadge: 'Gift Card',
      headerTitle: 'Scegli la tua Gift Card',
      headerSubtitle: 'Tre modi per regalare un\'esperienza autentica.',
      items: [
        {
          id: 'libera',
          badge: 'Flessibile',
          title: "Scegli tu l'importo perfetto.",
          price: 'Da €15 a €300',
          description: 'La libertà di regalare qualsiasi importo, da una pizza a una cena completa. Il destinatario potrà scegliere liberamente dal nostro menu e vivere la propria esperienza su misura.',
        },
        {
          id: 'napoletana',
          badge: 'Più Popolare',
          title: 'La cena completa per due persone.',
          price: '€90',
          description: "Un'esperienza completa per due: antipasto dello chef, due pizze a scelta dal menu, dolce della casa e bevande incluse. Il modo perfetto per far scoprire Mo Pizz a qualcuno di speciale.",
        },
        {
          id: 'pizza',
          badge: 'Classica',
          title: 'Due pizze, una serata indimenticabile.',
          price: '€40',
          description: 'Due pizze a scelta dal nostro menu con bevande incluse. Perfetta per un regalo pensato ma accessibile, ideale per compleanni e occasioni speciali.',
        },
      ],
      ctaLabel: 'Regala Ora',
    },
    howItWorks: {
      eyebrow: 'Come Funziona',
      headline: 'Quattro semplici passi',
      steps: [
        { number: '01', title: 'Scegli', description: 'Seleziona la gift card perfetta tra le nostre tre esperienze curate.' },
        { number: '02', title: 'Personalizza', description: 'Contattaci su WhatsApp e aggiungi il tuo messaggio di auguri personale.' },
        { number: '03', title: 'Regala', description: "Ricevi la gift card digitale, pronta da inviare o stampare per l'occasione." },
        { number: '04', title: "Vivi l'Esperienza", description: 'Il destinatario si presenta da noi e vive la magia della vera pizza.' },
      ],
    },
    faq: {
      eyebrow: 'Hai domande?',
      headline: 'Domande Frequenti',
      items: [
        {
          question: 'Come posso acquistare una gift card?',
          answer: "Scegli la gift card che preferisci e clicca su \"Regala Ora\". Verrai reindirizzato su WhatsApp dove potrai completare l'acquisto direttamente con il nostro team. Accettiamo pagamenti tramite bonifico o in contanti al locale.",
        },
        {
          question: 'Le gift card hanno una scadenza?',
          answer: 'Le nostre gift card sono valide per 12 mesi dalla data di acquisto. Troverai la data di scadenza indicata sulla card stessa.',
        },
        {
          question: 'Posso personalizzare la gift card con un messaggio?',
          answer: 'Assolutamente! Quando ci contatti su WhatsApp, comunicaci il messaggio che desideri includere. Prepareremo la gift card con la tua dedica personale.',
        },
        {
          question: 'La gift card è utilizzabile in più visite?',
          answer: "Sì, il credito della gift card \"Esperienza Libera\" può essere utilizzato in più visite fino all'esaurimento del saldo. Le gift card \"Esperienza per Due\" e \"Pizza per Due\" sono invece utilizzabili in un'unica visita.",
        },
        {
          question: 'Posso regalare la gift card in formato digitale?',
          answer: 'Certamente! Riceverai la gift card in formato digitale via WhatsApp, pronta per essere inoltrata al destinatario. Se preferisci il formato fisico, puoi ritirarla direttamente al locale.',
        },
      ],
    },
    cta: {
      eyebrow: 'Non aspettare',
      headline: 'Regala un\'esperienza unica',
      body: "Un regalo che scalda il cuore e delizia il palato. Sorprendi chi ami con un'esperienza autentica da Mo Pizz.",
      ctaPrimary: 'Acquista su WhatsApp',
      ctaSecondary: 'Torna alla Home',
    },
  },

  // ─── FIDELITY ───────────────────────────────────────
  fidelity: {
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
