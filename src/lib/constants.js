// ===== ORDINA (ASPORTO) =====
export const PLATEFORM_ORDER_URL = 'https://mopizz.plateform.app/takeaway';
export const ORDER_MODE = 'iframe'; // 'iframe' | 'link'

// ===== PRENOTAZIONE TAVOLO =====
export const PLATEFORM_RESERVE_URL = 'https://mopizz.plateform.app/reserve';
export const RESERVE_MODE = 'iframe'; // 'iframe' | 'link'

// ===== FIDELITY =====
export const PLATEFORM_FIDELITY_URL = 'https://mopizz.plateform.app/fidelity';
export const FIDELITY_MODE = 'iframe'; // 'iframe' | 'link'

// ===== RECENSIONI =====
export const GOOGLE_REVIEW_URL = 'https://www.google.com/maps/place/Mo+Pizz+Pizzeria+Napoletana/@45.55597,8.9253119,13z/data=!4m8!3m7!1s0x47868d9bf3567e25:0x6c09ada059a69fd2!8m2!3d45.6028006!4d8.9061923!9m1!1b1!16s%2Fg%2F11fmzsf1lh';
export const TRIPADVISOR_REVIEW_URL = 'https://www.tripadvisor.com/Restaurant_Review-g670658-d19352966-Reviews-Mo_Pizz-Legnano_Province_of_Milan_Lombardy.html';

// ===== GEO (single source of truth — keep schema + meta + Maps URL in sync) =====
export const GEO = {
  latitude: '45.6028006',
  longitude: '8.9061923',
  region: 'IT-MI',
  placename: 'Legnano',
};

// ===== SEO SCHEMA DATA =====
export const schemaData = {
  '@context': 'https://schema.org',
  '@type': ['Restaurant', 'LocalBusiness'],
  '@id': 'https://www.mopizz.it/#restaurant',
  name: 'MO PIZZ',
  alternateName: ['Mo Pizz', 'MoPizz', 'Mo Pizz Legnano', 'Mo Pizz Pizzeria Napoletana', 'mopizz.it'],
  description: 'Pizzeria napoletana autentica a Legnano con forno a legna. Cucina tradizionale napoletana, pizza artigianale, menu fisso pranzo, asporto, consegna a domicilio e gift card.',
  slogan: 'Pizza verace, cucina autentica, forno a legna.',
  url: 'https://www.mopizz.it',
  telephone: '+390331024363',
  email: 'info@mopizz.it',
  image: [
    'https://www.mopizz.it/images/hero-home-v2.webp',
    'https://www.mopizz.it/images/gallery-main.webp',
    'https://www.mopizz.it/images/logo_mopizz.webp',
  ],
  logo: {
    '@type': 'ImageObject',
    url: 'https://www.mopizz.it/images/logo_mopizz.webp',
    width: 400,
    height: 389,
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Cadore 4',
    addressLocality: 'Legnano',
    addressRegion: 'MI',
    postalCode: '20025',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  hasMap: `https://www.google.com/maps/place/Mo+Pizz+Pizzeria+Napoletana/@${GEO.latitude},${GEO.longitude},17z`,
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'], opens: '12:00', closes: '14:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'], opens: '19:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '19:00', closes: '23:00' },
  ],
  servesCuisine: ['Napoletana', 'Italiana', 'Pizza'],
  priceRange: '€€',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Satispay',
  currenciesAccepted: 'EUR',
  menu: 'https://www.mopizz.it/#menu',
  hasMenu: {
    '@type': 'Menu',
    name: 'Menu MO PIZZ',
    url: 'https://www.mopizz.it/#menu',
    hasMenuSection: [
      {
        '@type': 'MenuSection',
        name: 'Menu Fisso Pranzo',
        description: 'Menu fisso pranzo da martedì a venerdì. A partire da €9. Acqua, servizio e caffè inclusi.',
        hasMenuItem: [
          {
            '@type': 'MenuItem',
            name: 'Menu Completo',
            description: 'Un primo a scelta, un secondo a scelta, un contorno a scelta. Acqua, servizio e caffè inclusi.',
            offers: { '@type': 'Offer', price: '13.00', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
          },
          {
            '@type': 'MenuItem',
            name: 'Menu Primo e Contorno',
            description: 'Un primo a scelta, un contorno a scelta. Acqua, servizio e caffè inclusi.',
            offers: { '@type': 'Offer', price: '9.00', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
          },
          {
            '@type': 'MenuItem',
            name: 'Menu Secondo e Contorno',
            description: 'Un secondo a scelta, un contorno a scelta. Acqua, servizio e caffè inclusi.',
            offers: { '@type': 'Offer', price: '11.00', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
          },
        ],
      },
    ],
  },
  acceptsReservations: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.2',
    reviewCount: '620',
    bestRating: '5',
    worstRating: '1',
  },
  sameAs: [
    'https://www.instagram.com/mo_pizz/',
    'https://www.facebook.com/MOPIZZ.IT/?locale=it_IT',
    'https://www.tripadvisor.com/Restaurant_Review-g670658-d19352966-Reviews-Mo_Pizz-Legnano_Province_of_Milan_Lombardy.html',
  ],
  potentialAction: [
    {
      '@type': 'OrderAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.mopizz.it/ordina',
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp',
    },
    {
      '@type': 'ReserveAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://www.mopizz.it/#prenota',
        actionPlatform: ['http://schema.org/DesktopWebPlatform', 'http://schema.org/MobileWebPlatform'],
      },
      result: {
        '@type': 'Reservation',
        name: 'Prenota un Tavolo',
      },
    },
  ],
};

// LocalBusiness schema (supplements Restaurant schema)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://www.mopizz.it/#localbusiness',
  name: 'MO PIZZ — Pizzeria Napoletana Legnano',
  image: 'https://www.mopizz.it/images/hero-home-v2.webp',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Via Cadore 4',
    addressLocality: 'Legnano',
    addressRegion: 'Lombardia',
    postalCode: '20025',
    addressCountry: 'IT',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: GEO.latitude,
    longitude: GEO.longitude,
  },
  url: 'https://www.mopizz.it',
  telephone: '+390331024363',
  email: 'info@mopizz.it',
  priceRange: '€€',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'], opens: '12:00', closes: '14:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Sunday'], opens: '19:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '19:00', closes: '23:00' },
  ],
  sameAs: [
    'https://www.instagram.com/mo_pizz/',
    'https://www.facebook.com/MOPIZZ.IT/?locale=it_IT',
    'https://www.tripadvisor.com/Restaurant_Review-g670658-d19352966-Reviews-Mo_Pizz-Legnano_Province_of_Milan_Lombardy.html',
  ],
  areaServed: [
    { '@type': 'City', name: 'Legnano' },
    { '@type': 'City', name: 'San Giorgio su Legnano' },
    { '@type': 'City', name: 'Canegrate' },
    { '@type': 'City', name: 'Cerro Maggiore' },
    { '@type': 'City', name: 'Rescaldina' },
    { '@type': 'City', name: 'Nerviano' },
  ],
};

// WebSite schema (enables sitelinks search box in SERP)
export const webSiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': 'https://www.mopizz.it/#website',
  name: 'MO PIZZ',
  alternateName: ['Mo Pizz', 'MoPizz', 'Mo Pizz Pizzeria Napoletana', 'Mo Pizz Legnano'],
  url: 'https://www.mopizz.it',
  publisher: { '@id': 'https://www.mopizz.it/#restaurant' },
  inLanguage: 'it-IT',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mopizz.it/?q={search_term_string}',
    },
    'query-input': 'required name=search_term_string',
  },
};

// Service schemas — takeaway + delivery (boost local "asporto"/"domicilio" queries)
const SERVICE_AREA = [
  { '@type': 'City', name: 'Legnano' },
  { '@type': 'City', name: 'San Giorgio su Legnano' },
  { '@type': 'City', name: 'Canegrate' },
  { '@type': 'City', name: 'Cerro Maggiore' },
  { '@type': 'City', name: 'Rescaldina' },
  { '@type': 'City', name: 'Nerviano' },
  { '@type': 'City', name: 'Castellanza' },
  { '@type': 'City', name: 'Busto Arsizio' },
  { '@type': 'City', name: 'Parabiago' },
];

export const takeawayServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.mopizz.it/ordina#service',
  name: 'Pizza Asporto Legnano — MO PIZZ',
  serviceType: 'Take Away',
  description: 'Ordina pizza napoletana e cucina tradizionale per asporto da MO PIZZ Legnano. Pizza con forno a legna, ritiro in Via Cadore 4.',
  url: 'https://www.mopizz.it/ordina',
  provider: { '@id': 'https://www.mopizz.it/#restaurant' },
  areaServed: SERVICE_AREA,
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://www.mopizz.it/ordina',
    serviceLocation: { '@id': 'https://www.mopizz.it/#restaurant' },
  },
  offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
};

export const deliveryServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': 'https://www.mopizz.it/asporto#service',
  name: 'Consegna a Domicilio Legnano — MO PIZZ',
  serviceType: 'Food Delivery',
  description: 'Consegna a domicilio MO PIZZ: pizza napoletana cotta nel forno a legna, antipasti e piatti tradizionali consegnati caldi a Legnano e comuni limitrofi.',
  url: 'https://www.mopizz.it/asporto',
  provider: { '@id': 'https://www.mopizz.it/#restaurant' },
  areaServed: SERVICE_AREA,
  availableChannel: {
    '@type': 'ServiceChannel',
    serviceUrl: 'https://www.mopizz.it/asporto',
    serviceLocation: { '@id': 'https://www.mopizz.it/#restaurant' },
  },
  offers: { '@type': 'Offer', priceCurrency: 'EUR', availability: 'https://schema.org/InStock' },
};

// Home FAQ (questions Google + AI engines answer directly with brand)
export const homeFaqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  '@id': 'https://www.mopizz.it/#faq',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Dove si trova MO PIZZ a Legnano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MO PIZZ si trova in Via Cadore 4, 20025 Legnano (MI). La pizzeria napoletana è nel cuore di Legnano, raggiungibile da San Giorgio su Legnano, Canegrate, Cerro Maggiore, Rescaldina, Nerviano, Castellanza, Busto Arsizio e Parabiago.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali sono gli orari di apertura di MO PIZZ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'MO PIZZ è aperta da martedì a venerdì 12:00–14:30 e 19:00–22:30, sabato 19:00–23:00, domenica 12:00–14:30 e 19:00–22:30. Chiuso il lunedì.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quanto costa il menu fisso pranzo di MO PIZZ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il menu fisso pranzo MO PIZZ parte da €9 (primo + contorno), €11 (secondo + contorno) o €13 (primo + secondo + contorno). Acqua, servizio e caffè sempre inclusi. Disponibile da martedì a venerdì.',
      },
    },
    {
      '@type': 'Question',
      name: 'MO PIZZ fa consegna a domicilio o asporto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì. MO PIZZ offre asporto e consegna a domicilio a Legnano e comuni limitrofi. Ordini online da mopizz.it/ordina (asporto) o mopizz.it/asporto (consegna a casa).',
      },
    },
    {
      '@type': 'Question',
      name: 'Come si prenota un tavolo da MO PIZZ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prenoti un tavolo direttamente online su mopizz.it nella sezione Prenota, oppure chiamando lo 0331 024363. Conferma immediata data, orario e numero di coperti.',
      },
    },
    {
      '@type': 'Question',
      name: 'La pizza di MO PIZZ è cotta nel forno a legna?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì. MO PIZZ cuoce la pizza napoletana esclusivamente nel forno a legna, con impasto a lunga lievitazione e ingredienti selezionati direttamente dalla Campania.',
      },
    },
    {
      '@type': 'Question',
      name: 'Qual è il numero di telefono di MO PIZZ Legnano?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Telefono MO PIZZ Legnano: 0331 024363. Email: info@mopizz.it.',
      },
    },
  ],
};

export const homeBreadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  '@id': 'https://www.mopizz.it/#breadcrumb',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mopizz.it' },
  ],
};

// BreadcrumbList schema generator
export const buildBreadcrumb = (pageName, pageUrl) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.mopizz.it' },
    { '@type': 'ListItem', position: 2, name: pageName, item: pageUrl },
  ],
});

// FAQPage schema generator
export const buildFaqSchema = (faqs) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
});
