/**
 * Menu data for Mo Pizz restaurant — Menu 2026.
 *
 * Dato statico, gestito manualmente. (La sincronizzazione automatica da
 * Plateform è stata rimossa: la collaborazione con Plateform è terminata.)
 *
 * Fonte: mo-pizz-menu-2026.md — l'ordine delle voci rispetta quello del menu
 * cartaceo. Coperto e servizio: 2,00 € (vedi siteContent.menu.copertoNote).
 *
 * Exports:
 *   menuCategories  - array of category objects
 *   signatureDishes - array of signature dish objects for the highlight section
 *
 * Note:
 *   - `desc` viene passato a <HighlightBadges>, che evidenzia in oro le sigle
 *     DOP / DOCG / IGP / DOC / IGT / Slow Food: vanno scritte in maiuscolo.
 *   - `price` è una stringa senza simbolo di valuta (il carrello la converte).
 *   - `hoverImage` è opzionale e usato solo su desktop: puntare a file esistenti
 *     in /public/images/menu/, altrimenti l'anteprima resta vuota.
 */

export const menuCategories = [
  {
    id: 'pizzeria',
    title: 'La Pizzeria',
    subtitle: 'Fior di Latte del Matese, San Marzano dell\'Agro Sarnese, 48 ore di doppia lievitazione',
    heroImage: '/images/menu/pizzeria-hero.webp',
    sections: [
      {
        heading: 'Pizze Classiche',
        items: [
          { name: 'Margherita', desc: 'Pomodoro San Marzano dell\'agro sarnese, Fior di Latte del Matese, spolverata di parmigiano 24 mesi, basilico e olio Evo.', price: '7.00', hoverImage: '/images/menu/signature-margherita.webp' },
          { name: 'Margherita Sbagliata', desc: 'Pomodoro giallo dei paesi vesuviani, Fior di Latte del Matese, spolverata di parmigiano 24 mesi, basilico e olio Evo.', price: '7.50' },
          { name: 'Marinara', desc: 'Pomodoro San Marzano dell\'agro sarnese, aglio, basilico e olio Evo.', price: '6.00' },
          { name: 'Margherita DOP', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, Caciocavallo dell\'Irpinia stagionato in grotte, pomodorini confit, basilico e olio Evo.', price: '8.50' },
          { name: 'Regina', desc: 'Pomodoro San Marzano, bufala campana DOP, spolverata di parmigiano 24 mesi, basilico e olio Evo.', price: '8.50' },
          { name: 'Cosacca', desc: 'Pomodoro San Marzano, olio piccante artigianale a filo, spolverata di parmigiano 24 mesi, scaglie di pecorino romano IGP, basilico e olio Evo.', price: '6.50' },
          { name: 'Diavola', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, spianata piccante di San Pietro al coltello, basilico e olio Evo.', price: '8.00' },
          { name: 'Quattro Stagioni', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, carciofo con gambo alla romana, cotto di alta qualità, funghi freschi, taggiasche DOP, basilico e olio Evo.', price: '9.00' },
          { name: 'Capricciosa', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, carciofo con gambo alla romana, cotto di alta qualità, funghi freschi, taggiasche DOP, acciuga siciliana IGP, cappero in frutto, basilico e olio Evo.', price: '9.50' },
          { name: 'Cotto e Funghi', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, cotto di alta qualità, funghi freschi, basilico e olio Evo.', price: '8.50' },
          { name: 'Rustica', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, spianata di San Pietro al coltello, gorgonzola novarese, taggiasca DOP, basilico e olio Evo.', price: '9.00' },
          { name: 'Stamm Lontan', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, pezzi di tonno al naturale, cruda rossa di Tropea IGP, basilico e olio Evo.', price: '8.00' },
          { name: 'Fantasia dell\'Orto', desc: 'Fior di Latte del Matese, macedonia di verdure al forno con i suoi profumi, basilico e olio Evo.', price: '8.00' },
          { name: 'Quattro Formaggi', desc: 'Fior di Latte del Matese, fantasia di formaggi di alta qualità, basilico e olio Evo.', price: '8.50' },
          { name: 'Ardita', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, straccetti di peperoni al forno, taggiasche DOP, salsiccia casertana IGP, basilico e olio Evo.', price: '10.00' },
          { name: 'Napoli', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, acciuga siciliana IGP, origano, basilico e olio Evo.', price: '8.00' },
          { name: 'Romana', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, cappero in frutto, taggiasche DOP, acciuga siciliana IGP, basilico, origano e olio Evo.', price: '8.50' },
          { name: 'Cotto', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, cotto di alta qualità, basilico e olio Evo.', price: '8.00' },
          { name: 'Salsiccia e Patatine', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, salsiccia casertana IGP e patatine fritte, basilico e olio Evo.', price: '9.50' },
          { name: 'Wurstel e Patatine', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, wurstel e patatine fritte, basilico e olio Evo.', price: '8.50' },
          { name: 'Friarielli e Co.', desc: 'Fior di Latte del Matese, friarielli napoletani, provola di Agerola affumicata con paglia, salsiccia casertana IGP, basilico e olio Evo.', price: '11.00' },
          { name: 'Provola e Pepe', desc: 'Pomodoro San Marzano, provola di Agerola affumicata in paglia, pepe nero, basilico e olio Evo.', price: '8.00' },
          { name: 'Parmigiana', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, melanzane fritte alla parmigiana, basilico e olio Evo.', price: '9.00' },
        ],
      },
      {
        heading: 'By Moschiano Pizza Chef',
        items: [
          { name: 'Bronte 2.0', desc: 'Fior di Latte del Matese, basilico e olio Evo; all\'uscita dal forno: burrata di Puglia IGP, mortadella di alta qualità e pistacchio.', price: '14.00', hoverImage: '/images/menu/signature-bronte.webp' },
          { name: 'Superlativa', desc: 'Pomodoro San Marzano, Fior di Latte del Matese, basilico e olio Evo; all\'uscita dal forno: Parma 24 mesi DOCG, rughetta croccante e burrata di Puglia IGP.', price: '14.00' },
          { name: 'Vesuviana', desc: 'Pomodoro giallo dei paesi vesuviani, basilico e olio Evo; all\'uscita: Parma 24 mesi DOCG, Caciocavallo dell\'Irpinia stagionato in grotte e stracciata di bufala al cucchiaio.', price: '14.00', hoverImage: '/images/menu/signature-vesuviana.webp' },
          { name: 'Nduja e Co.', desc: 'Fior di Latte del Matese, spianata piccante di San Pietro al coltello, N\'duja di Spilinga IGP, taggiasche DOP e rossa di Tropea stufata, basilico e olio Evo; all\'uscita: burrata di Puglia.', price: '14.00' },
          { name: 'Primavera', desc: 'Fior di Latte del Matese, basilico e olio Evo; all\'uscita: Parma 24 mesi DOCG, rughetta croccante, pomodorino IGP, bufala campana DOCG da 125 gr e scaglie di parmigiano 24 mesi.', price: '17.00' },
          { name: 'Campana', desc: 'Fior di Latte del Matese, provola di Agerola affumicata con paglia, salsiccia casertana IGP, patate al forno con i suoi profumi, pepe macinato, basilico e olio Evo.', price: '12.00' },
          { name: 'Sole Mio', desc: 'Pomodoro giallo dei paesi vesuviani, basilico e olio Evo; all\'uscita: pomodorino confit, acciuga siciliana, pesto home made e ciuffi di ricotta di bufala DOCG.', price: '11.00' },
          { name: 'Crocchè', desc: 'Fior di Latte del Matese, cotto alta qualità, crocchè sbriciolati, provola di Agerola affumicata con paglia, pepe macinato, basilico e olio Evo.', price: '12.00' },
          { name: 'Nerano', desc: 'Vellutata di zucchine, Fior di Latte del Matese; all\'uscita: chips di zucchine e Caciocavallo dell\'Irpinia stagionato in grotte, basilico e olio Evo.', price: '12.00' },
          { name: 'Mugnano del Cardinale', desc: 'Pomodoro giallo dei paesi vesuviani, spolverata di parmigiano 24 mesi, salame artigianale di Mugnano del Cardinale, pepe macinato, basilico e olio Evo; all\'uscita: Caciocavallo dell\'Irpinia stagionato in grotte.', price: '13.00' },
        ],
      },
      {
        heading: 'Ripieni',
        items: [
          { name: 'Ripieno Classico', desc: 'Ripieno di pomodoro San Marzano dell\'agro sarnese, Fior di Latte del Matese, cotto alta qualità, basilico e olio Evo.', price: '8.00' },
          { name: 'Tronchetto Napoletano', desc: 'Ripieno di bufala campana DOCG; all\'uscita dal forno: Parma 24 mesi DOCG, rughetta croccante, scaglie di parmigiano 24 mesi, pomodorino IGP e olio Evo.', price: '16.00' },
          { name: 'Pizza Fritta', desc: 'Ripieno di Fior di Latte del Matese, provola di Agerola affumicata con paglia, salame dolce, ciuffi di ricotta di bufala DOCG e pepe nero.', price: '10.00' },
        ],
      },
      {
        heading: 'Panuozzi',
        items: [
          { name: 'Il Friariello', desc: 'Provola di Agerola affumicata con paglia, salsiccia campana e friariello saltato.', price: '10.00' },
          { name: 'Il Superbo', desc: 'Fior di Latte del Matese, Parma 24 mesi, rughetta croccante e stracciata di bufala al cucchiaio.', price: '12.00' },
        ],
      },
    ],
  },
  {
    id: 'antipasti',
    title: 'Antipasti',
    subtitle: 'Sfizi, fritti napoletani e piatti da condividere',
    heroImage: '/images/menu/cucina-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Antipasti, Sfizi e Fritti',
        items: [
          { name: 'O\'Cuopp', desc: 'Misto di frittini tipici napoletani.', price: '10.00' },
          { name: 'Montanarina', desc: 'Montanarina napoletana: 1 pz pomodoro, parmigiano, olio e basilico.', price: '2.50' },
          { name: 'Crudo e Bufala', desc: 'Parma 24 mesi e bufala campana da 125 gr.', price: '9.00' },
          { name: 'Straccetti Golosi', desc: 'Straccetti di impasto home made fritti, serviti con stracciata, rughetta e datterino IGP.', price: '8.00' },
          { name: 'La Nostra Fresella', desc: 'Fresella artigianale, datterini IGP, profumi, burratina pugliese, olio Evo, basilico.', price: '9.00' },
          { name: 'Caesar Salad', desc: 'Insalata, crostini di pane, petto di pollo a filetti, salsa caesar, scaglie di parmigiano.', price: '11.00' },
          { name: 'Patatine Fritte', desc: 'Servite con salse.', price: '4.00' },
          { name: 'Parmigiana di Melanzane', desc: 'Classica parmigiana di melanzane.', price: '7.00' },
          { name: 'Polpette della Nonna 2.0', desc: 'Polpettine servite con pomodoro, burrata pugliese all\'uscita.', price: '12.00' },
          { name: 'Fritto Misto di Pesce', desc: 'Servito con gamberetti e totani.', price: '17.00' },
        ],
      },
    ],
  },
  {
    id: 'dolci',
    title: 'I Dolci',
    subtitle: 'Home made, tutti allo stesso prezzo — 5,00 €',
    heroImage: '/images/menu/dolci-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Dolci Home Made',
        items: [
          { name: 'Tiramisù', desc: '', price: '5.00' },
          { name: 'Crema Catalana', desc: '', price: '5.00' },
          { name: 'Cheese Cake', desc: '', price: '5.00' },
          { name: 'Straccetti Golosi', desc: '', price: '5.00' },
          { name: 'Pastiera Napoletana', desc: '', price: '5.00' },
          { name: 'Sorbetto al Limone', desc: '', price: '5.00' },
          { name: 'Panna Cotta', desc: '', price: '5.00' },
        ],
      },
    ],
  },
  {
    id: 'bar',
    title: 'Dal Bar',
    subtitle: 'Birre alla spina, bibite, vini campani e caffetteria',
    heroImage: '/images/menu/bevande-hero.webp',
    heroFit: 'contain',
    sections: [
      {
        heading: 'Birre',
        items: [
          { name: 'Birra Chiara Löwenbräu Original — 0,20 cl', desc: '5,20% vol.', price: '3.50' },
          { name: 'Birra Chiara Löwenbräu Original — 0,40 cl', desc: '5,20% vol.', price: '5.50' },
          { name: 'Birra Rossa Leffe — 0,33 cl', desc: '6,60% vol.', price: '4.50' },
          { name: 'Birra Rossa Leffe — 0,50 cl', desc: '6,60% vol.', price: '7.00' },
          { name: 'Panaché — 0,20 cl', desc: 'Con Löwenbräu Original.', price: '3.50' },
          { name: 'Panaché — 0,40 cl', desc: 'Con Löwenbräu Original.', price: '5.50' },
        ],
      },
      {
        heading: 'Bibite',
        items: [
          { name: 'Acqua Naturale o Gasata — 0,75 cl', desc: '', price: '2.50' },
          { name: 'Bibite — 0,33 cl', desc: 'Coca-Cola, Coca-Cola Zero, Fanta, Sprite, Thè Limone e Pesca.', price: '3.00' },
        ],
      },
      {
        heading: 'Vini',
        items: [
          { name: 'Falanghina IGP — 0,75 cl', desc: '', price: '15.00' },
          { name: 'Aglianico IGP — 0,75 cl', desc: '', price: '15.00' },
          { name: 'Extra Dry — 0,75 cl', desc: '', price: '14.00' },
          { name: 'Valdobbiadene DOCG — 0,75 cl', desc: '', price: '22.00' },
        ],
      },
      {
        heading: 'Caffè e Amari',
        items: [
          { name: 'Caffè Espresso o Macchiato', desc: '', price: '1.50' },
          { name: 'Caffè Corretto', desc: '', price: '2.00' },
          { name: 'Amari Classici', desc: '', price: '8.00' },
          { name: 'Amari Riserva', desc: '', price: '5.00' },
          { name: 'Amari Speciali', desc: '', price: '8.00' },
          { name: 'Grappa Classica Bianca', desc: '', price: '3.50' },
          { name: 'Grappa Barrique', desc: '', price: '4.50' },
        ],
      },
    ],
  },
];

export const signatureDishes = [
  {
    name: 'Bronte 2.0',
    poeticDesc: 'Burrata che si scioglie, mortadella che sussurra, pistacchio che incorona.',
    price: '14.00',
    image: '/images/menu/signature-bronte.webp',
  },
  {
    name: 'Vesuviana',
    poeticDesc: 'Pomodoro giallo del Vesuvio, Parma 24 mesi e stracciata di bufala al cucchiaio.',
    price: '14.00',
    image: '/images/menu/signature-vesuviana.webp',
  },
  {
    name: 'Margherita',
    poeticDesc: 'San Marzano, Fior di Latte del Matese, basilico. Il punto di partenza di tutto.',
    price: '7.00',
    image: '/images/menu/signature-margherita.webp',
  },
];
