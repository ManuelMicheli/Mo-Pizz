/**
 * Menu data for Mo Pizz restaurant.
 *
 * Exports:
 *   menuCategories  - array of 4 category objects (Pizzeria, Cucina, Dolci, Birre & Vini)
 *   signatureDishes - array of 3 signature dish objects for the highlight section
 */

export const menuCategories = [
  // ─── Category 1: La Pizzeria ───────────────────────────────────────────────
  {
    id: 'pizzeria',
    title: 'La Pizzeria',
    subtitle:
      'Fiordilatte del Matese IGP, San Marzano dell\'Agro Sarnese IGP, 48 ore di doppia lievitazione',
    heroImage: '/images/menu/pizzeria-hero.webp',
    sections: [
      {
        heading: 'Le Classiche',
        items: [
          { name: 'Margherita', desc: 'San Marzano, fiordilatte del Matese, basilico, olio EVO', price: '7.00', badges: ['IGP'] },
          { name: 'Margherita Sbagliata', desc: 'Pomodoro giallo, fiordilatte, basilico', price: '7.50' },
          { name: 'Marinara', desc: 'San Marzano, aglio, origano, olio EVO', price: '6.00' },
          { name: 'Margherita DOP', desc: 'Caciocavallo, pomodorini confit, basilico', price: '8.50', badges: ['DOP'] },
          { name: 'Margherita Reale', desc: 'Bufala Campana DOP, San Marzano, basilico', price: '8.50', badges: ['DOP'] },
          { name: 'Cosacca', desc: 'Pecorino romano, olio piccante, pomodoro', price: '6.50' },
          { name: 'Diavola', desc: 'Spianata piccante, fiordilatte, San Marzano', price: '8.00' },
          { name: 'Quattro Stagioni', desc: 'Carciofi, funghi, prosciutto, olive', price: '9.00' },
          { name: 'Capricciosa', desc: 'Prosciutto cotto, funghi, carciofi, olive', price: '9.50' },
          { name: 'Cotto e Funghi', desc: 'Prosciutto cotto, champignon, fiordilatte', price: '8.50' },
          { name: 'Rustica', desc: 'Gorgonzola, spianata, olive taggiasche', price: '9.00' },
          { name: 'Stamm Lontan', desc: 'Tonno, cipolla rossa di Tropea', price: '8.00' },
          { name: 'Fantasia dell\'Orto', desc: 'Verdure al forno di stagione, fiordilatte', price: '8.00' },
          { name: 'Quattro Formaggi', desc: 'Fiordilatte, gorgonzola, parmigiano, provola', price: '8.50' },
          { name: 'Ricca', desc: 'Panna, speck del Trentino, fiordilatte', price: '8.50' },
          { name: 'Tirolese', desc: 'Porcini, gorgonzola, speck', price: '10.00' },
          { name: 'Ardita', desc: 'Peperoni, salsiccia casertana', price: '10.00' },
          { name: 'Napoli', desc: 'Acciuga, origano, San Marzano', price: '8.00' },
          { name: 'Romana', desc: 'Cappero, olive taggiasche, acciuga', price: '8.50' },
          { name: 'Parmigiana', desc: 'Melanzane fritte, pomodoro, fiordilatte', price: '9.00' },
          { name: 'Provola e Pepe', desc: 'Provola di Agerola, pepe nero', price: '8.00' },
        ],
      },
      {
        heading: 'Le Mo Pizz dello Chef',
        items: [
          { name: 'Bronte 2.0', desc: 'Burrata, mortadella, pistacchio di Bronte', price: '14.00', hoverImage: '/images/menu/bronte.jpg' },
          { name: 'Superlativa', desc: 'Parma 24 mesi, burrata pugliese', price: '14.00', hoverImage: '/images/menu/superlativa.jpg' },
          { name: 'Friarielli e Co.', desc: 'Friarielli napoletani, provola, salsiccia', price: '11.00' },
          { name: 'Mugnano del Cardinale', desc: 'Salame artigianale, caciocavallo', price: '13.00' },
          { name: 'Vesuviana', desc: 'Parma, caciocavallo, stracciata', price: '14.00' },
          { name: 'Nduja e Co.', desc: 'N\'duja calabrese, burrata', price: '14.00' },
          { name: 'Primavera', desc: 'Parma, bufala DOP, rughetta', price: '17.00', badges: ['DOP'], hoverImage: '/images/menu/primavera.jpg' },
          { name: 'Ariccia', desc: 'Porchetta di Ariccia, datterino del Vesuvio', price: '14.00' },
          { name: 'Campana', desc: 'Provola, salsiccia, patate al forno', price: '12.00' },
          { name: 'Pig', desc: 'Salsiccia, patate, cheddar', price: '12.00' },
          { name: 'Castelli Romani', desc: 'Porchetta, patata, rosmarino', price: '14.00' },
          { name: 'Sole Mio', desc: 'Acciuga, pesto genovese, ricotta', price: '11.00' },
          { name: 'Nerano', desc: 'Vellutata di zucchine, caciocavallo', price: '12.00' },
          { name: 'Fi.Ca', desc: 'Focaccia, parma, confettura di fichi, stracciata', price: '15.00' },
          { name: 'Autunno', desc: 'Pere, speck, taleggio DOP, noci di Sorrento', price: '13.00', badges: ['DOP'] },
          { name: 'Poker', desc: '4 quarti: Friarielli, Regina, Primavera, Montanara', price: '20.00', hoverImage: '/images/menu/poker.jpg' },
        ],
      },
      {
        heading: 'Fritti & Ripieni',
        items: [
          { name: 'Fritta Classica', desc: 'Provola, cicoli, ricotta, pepe', price: '11.00' },
          { name: 'Fritta', desc: 'Pomodoro, fior di latte, provola, pepe', price: '10.00' },
          { name: 'Fritta Semplice', desc: 'Pomodoro, fior di latte, ricotta', price: '10.00' },
          { name: 'Ripieno Classico', desc: 'Pomodoro, fior di latte, prosciutto cotto', price: '8.00' },
          { name: 'Tronchetto Napoletano', desc: 'Bufala DOP, parma 24 mesi, rughetta, datterino', price: '16.00', badges: ['DOP'] },
          { name: 'Ionica', desc: 'Carciofo, pancetta, n\'duja, stracciata', price: '14.00' },
          { name: 'Crocch\u00E8', desc: 'Cotto, crocch\u00E8 sbriciolati, provola', price: '12.00' },
        ],
      },
    ],
  },

  // ─── Category 2: La Cucina ─────────────────────────────────────────────────
  {
    id: 'cucina',
    title: 'La Cucina',
    subtitle: 'Antipasti, primi e secondi della tradizione napoletana',
    heroImage: '/images/menu/cucina-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Antipasti',
        items: [
          { name: 'Fritturine Napoletane', desc: 'Crocch\u00E8, arancini, frittatine artigianali', price: '12.00' },
          { name: 'Crudo e Bufala', desc: 'Crudo di Parma 24 mesi con Bufala Campana', price: '15.00', badges: ['DOP'] },
          { name: 'Tagliere Campano', desc: 'Salumi selezionati da piccoli artigiani del territorio', price: '15.00' },
        ],
      },
      {
        heading: 'Primi',
        items: [
          { name: 'Spaghetto & Bisque', desc: 'Spaghetto trafilato a bronzo, bisque di crostacei', price: '14.00', hoverImage: '/images/menu/spaghetto.jpg' },
          { name: 'Mezzemaniche e Purptiell', desc: 'Pasta corta, polpo verace napoletano', price: '14.00' },
          { name: 'La Nerano', desc: 'Spaghetti trafilati a bronzo, crema di zucchine, menta, provolone del Monaco', price: '13.00', badges: ['DOP'], hoverImage: '/images/menu/nerano.jpg' },
        ],
      },
      {
        heading: 'Secondi',
        items: [
          { name: 'Fritto Misto', desc: 'Calamari, gamberi, verdure di stagione', price: '18.00' },
          { name: 'Porchettato Disossato', desc: 'Porchetta artigianale con contorno', price: '14.00' },
        ],
      },
    ],
  },

  // ─── Category 3: I Dolci ───────────────────────────────────────────────────
  {
    id: 'dolci',
    title: 'I Dolci',
    subtitle: 'Il finale perfetto \u2014 pasticceria campana d\'autore',
    heroImage: '/images/menu/dolci-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Dolci della Tradizione',
        items: [
          { name: 'Delizia al Limone', desc: 'Crema al limone Costa d\'Amalfi, pan di Spagna soffice', price: '7.00', badges: ['IGP'], hoverImage: '/images/menu/delizia.jpg' },
          { name: 'Bab\u00E0 Napoletano', desc: 'Soffice e bagnato al rhum, panna montata', price: '6.00', hoverImage: '/images/menu/baba.jpg' },
          { name: 'Pastiera Napoletana', desc: 'Ricetta classica con grano cotto e canditi', price: '6.00' },
          { name: 'Cannolo Siciliano', desc: 'Ricotta di pecora, gocce di cioccolato fondente', price: '6.00' },
          { name: 'Tiramis\u00F9', desc: 'Fatto in casa, mascarpone, caff\u00E8 Izzo', price: '7.00' },
        ],
      },
    ],
  },

  // ─── Category 4: Birre & Vini ──────────────────────────────────────────────
  {
    id: 'bevande',
    title: 'Birre & Vini',
    subtitle: 'Artigianali, selezionate, italiane',
    heroImage: '/images/menu/bevande-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Birre Artigianali',
        items: [
          { name: 'Birra Artigianale cl. 50', desc: '5 variet\u00E0 selezionate, produzione artigianale italiana', price: '8.00' },
          { name: 'Birra Artigianale cl. 33', desc: '5 variet\u00E0 selezionate, produzione artigianale italiana', price: '6.00' },
        ],
      },
      {
        heading: 'Vini Bianchi',
        items: [
          { name: 'Grillo Maleca DOC', desc: 'Cantina Paolini \u2014 Sicilia, fresco e minerale', price: '22.00', badges: ['DOC'] },
          { name: 'Ribolla Gialla DOC', desc: 'Cantina Norina \u2014 Friuli, elegante e floreale', price: '24.00', badges: ['DOC'] },
        ],
      },
      {
        heading: 'Vini Rossi',
        items: [
          { name: 'Barbera d\'Alba', desc: 'Cantina Malabaila \u2014 Piemonte, strutturato e vellutato', price: '21.00' },
          { name: 'Etta Focu Rosso IGT', desc: 'Cantina Paolini \u2014 Sicilia, intenso e speziato', price: '22.00', badges: ['IGT'] },
        ],
      },
      {
        heading: 'Bollicine',
        items: [
          { name: 'Calice di Bollicine', desc: 'Prosecco selezionato, fresco e brioso', price: '4.00' },
        ],
      },
    ],
  },
];

export const signatureDishes = [
  {
    name: 'Bronte 2.0',
    poeticDesc:
      'Burrata che si scioglie, mortadella che sussurra, pistacchio di Bronte che incorona.',
    price: '14.00',
    image: '/images/menu/signature-bronte.webp',
  },
  {
    name: 'La Nerano',
    poeticDesc:
      'Spaghetti avvolti nella crema di zucchine, un profumo di menta, il Monaco che benedice.',
    price: '13.00',
    image: '/images/menu/signature-nerano.webp',
  },
  {
    name: 'Delizia al Limone',
    poeticDesc:
      'Il sole della Costiera racchiuso in un cucchiaio. Limone d\'Amalfi, dolcezza infinita.',
    price: '7.00',
    image: '/images/menu/signature-delizia.webp',
  },
];
