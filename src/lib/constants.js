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
  description: 'Pizzeria napoletana autentica a Legnano con forno a legna. Cucina tradizionale napoletana e pizza artigianale, aperti a cena dal martedì alla domenica. Prenota il tuo tavolo in Via Cadore 4.',
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
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Sunday'], opens: '19:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '19:00', closes: '23:00' },
  ],
  servesCuisine: ['Napoletana', 'Italiana', 'Pizza'],
  priceRange: '€€',
  paymentAccepted: 'Cash, Credit Card, Debit Card, Satispay',
  currenciesAccepted: 'EUR',
  menu: 'https://www.mopizz.it/#menu',
  acceptsReservations: true,
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.3',
    reviewCount: '625',
    bestRating: '5',
    worstRating: '1',
  },
  areaServed: [
    { '@type': 'City', name: 'Legnano' },
    { '@type': 'City', name: 'San Giorgio su Legnano' },
    { '@type': 'City', name: 'Canegrate' },
    { '@type': 'City', name: 'Cerro Maggiore' },
    { '@type': 'City', name: 'Rescaldina' },
    { '@type': 'City', name: 'Nerviano' },
  ],
  sameAs: [
    'https://www.instagram.com/mo_pizz/',
    'https://www.facebook.com/MOPIZZ.IT/?locale=it_IT',
    'https://www.tripadvisor.com/Restaurant_Review-g670658-d19352966-Reviews-Mo_Pizz-Legnano_Province_of_Milan_Lombardy.html',
  ],
  potentialAction: [
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
        text: 'MO PIZZ è aperta solo a cena: da martedì a giovedì e la domenica 19:00–22:30, venerdì e sabato 19:00–23:00. Chiuso il lunedì.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come si prenota un tavolo da MO PIZZ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prenoti un tavolo online in pochi secondi con TheFork dalla sezione Prenota, oppure chiamando lo 0331 024363. Ti confermiamo subito data, orario e numero di coperti.',
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
