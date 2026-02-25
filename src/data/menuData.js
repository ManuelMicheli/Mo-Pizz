/**
 * Menu data for Mo Pizz restaurant.
 *
 * Exports:
 *   menuCategories  - array of 4 category objects (Pizzeria, Cucina [8 sezioni], Dolci, Birre & Vini)
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
        heading: 'Antipasti di Mare',
        items: [
          { name: "A' Mpepata e Cozze", desc: 'Cozze fresche saltate in padella, olio, aglio, limone I.G.P. e prezzemolo', price: '12.00' },
          { name: 'Nzalat e Mar', desc: 'Insalata di mare classica con seppioline, polpo, gamberetti, calamari e cozze', price: '14.00' },
          { name: "A' Bruschetta e Mare", desc: 'Bruschetta con stracciata di bufala campana, filetto di acciuga e bruschetta con polipetti alla luciana', price: '10.00' },
          { name: 'O Purptiell Affugat', desc: 'Polipetti alla luciana, pomodoro San Marzano e tanto amore', price: '13.00' },
          { name: 'Code di Gambero alla Catalana', desc: 'Code di gambero cotte, servite con verdurine, olio EVO e basilico', price: '15.00' },
          { name: "O' Mar a Tavola", desc: 'Mix di antipasti di mare in unica portata', price: '18.00' },
        ],
      },
      {
        heading: 'Antipasti, Sfizi e Fritti',
        items: [
          { name: "O' Cuopp", desc: 'Tipici fritti napoletani: zeppoline, crocch\u00E8, frittatine', price: '10.00' },
          { name: "A' Fellat", desc: 'Selezione di salumi alta qualit\u00E0, stracciatella, bufala campana D.O.G.C., gnocco fritto home made', price: '15.00' },
          { name: "A' Parmmigian", desc: 'Classica parmigiana di melanzane', price: '9.00' },
          { name: "A' Bruschetta e Terra", desc: 'Bruschetta classica con pomodorini, basilico, origano e olio EVO; bruschetta con Parma 24 mesi e stracciata di bufala', price: '7.00' },
          { name: 'Tris di Frittatine', desc: 'Tris di frittatine napoletane', price: '7.00' },
          { name: 'Patatine alla Zingara', desc: 'Patatine fritte, ripassate in forno con provola di Agerola affumicata e wurstel', price: '6.00' },
        ],
      },
      {
        heading: 'Primi di Mare',
        items: [
          { name: "O' Scialatiello allo Scoglio", desc: 'Pasta fresca napoletana in crosta vesuviana, prima cottura in cucina, seconda nel forno della pizza, basilico e olio EVO', price: '19.00' },
          { name: "Spaghetto a' Vongole", desc: 'Spaghetto trafilato a bronzo con vongole veraci', price: '18.00' },
          { name: 'Spaghetto & Bisque', desc: 'Spaghetto, bisque di crostacei, olio EVO e zeste di limone della costiera', price: '14.00', hoverImage: '/images/menu/spaghetto.jpg' },
          { name: 'Mezzemaniche e Purptiell', desc: 'Mezzemaniche, polipetti, pomodoro, capperi e taggiasche, basilico e olio EVO', price: '14.00' },
        ],
      },
      {
        heading: 'Primi della Tradizione',
        items: [
          { name: 'Pasta, Patate e Provola', desc: 'Pasta della tradizione napoletana, patate selezionate, provola di Agerola affumicata, pepe, basilico e olio EVO', price: '13.00' },
          { name: 'Pasta Fasule e Cozz', desc: 'Pasta della tradizione napoletana, fagioli cannellini e cozze fresche, olio EVO', price: '14.00' },
          { name: "A' Genovese", desc: 'Zito napoletano, cipolla di Montoro, carne di manzo e lunga cottura, basilico e olio EVO', price: '14.00' },
          { name: 'La Nerano', desc: 'Spaghetti trafilati a bronzo, crema di zucchine, profumo di menta, chips di zucchine e provolone del Monaco', price: '13.00', badges: ['DOP'], hoverImage: '/images/menu/nerano.jpg' },
        ],
      },
      {
        heading: 'Secondi di Mare',
        items: [
          { name: 'Bianco di Orata', desc: 'Filetto di orata e i suoi profumi, servito con crosta di patate e zucchine, olio EVO', price: '15.00' },
          { name: "A' Frittur e' Pesce", desc: 'Classico fritto misto con calamari, gamberi e verdure', price: '18.00' },
          { name: "O' Calamar M'buttunato", desc: 'Calamaro al forno farcito con pane, acciughe, capperi e taggiasche, su cremoso di friariello vivace', price: '16.00' },
          { name: 'Spiedino di Pesce', desc: 'Due spiedini di gamberi, seppia e calamaro gratinato al forno al profumo di agrumi', price: '15.00' },
        ],
      },
      {
        heading: 'Secondi di Carne',
        items: [
          { name: "A' Purpett ra Nonna", desc: 'Polpette di carne fatte in casa, affogate in pomodoro San Marzano, basilico e olio EVO', price: '12.00' },
          { name: 'Ribs CBT in Salsa BBQ', desc: 'Costine di maialino cotte a bassa temperatura, salsa BBQ e profumi, patate al forno', price: '15.00' },
          { name: 'Costata alla Griglia', desc: 'Costata di manzo alla griglia c.ca 500 g, profumo di rosmarino e olio EVO, servita con patate al forno', price: '23.00' },
          { name: 'Stinco CBT', desc: 'Stinco di maialino cotto a bassa temperatura, disossato e porchettato con i suoi profumi, patate al forno', price: '14.00' },
        ],
      },
      {
        heading: 'Contorni',
        items: [
          { name: 'Patate al Forno', desc: 'Patate al forno con i nostri profumi', price: '5.00' },
          { name: 'Friarielli Saltati', desc: 'Friarielli saltati in padella', price: '5.00' },
          { name: 'Patatine Fritte', desc: 'Patatine fritte classiche', price: '4.00' },
          { name: 'Insalata Verde', desc: 'Insalata verde mista', price: '4.00' },
          { name: 'Verdure', desc: 'Verdure di stagione', price: '5.00' },
        ],
      },
      {
        heading: 'Per i Bambini',
        items: [
          { name: 'Pennette al Pomodoro', desc: 'Pennetta classica al pomodoro, basilico e olio EVO', price: '8.00' },
          { name: 'Pennette al Pesto', desc: 'Pennetta classica al pesto artigianale, basilico e olio EVO', price: '8.00' },
          { name: 'Cotoletta e Patatine', desc: 'Classica cotoletta di pollo, dorata e fritta, servita con patatine fritte', price: '12.00' },
          { name: "O' Cuopp Beby", desc: 'Nuggets di pollo fritti, serviti con patatine fritte', price: '10.00' },
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
