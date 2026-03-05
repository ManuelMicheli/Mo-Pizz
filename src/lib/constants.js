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

// ===== SEO SCHEMA DATA =====
export const schemaData = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  '@id': 'https://www.mopizz.it/#restaurant',
  name: 'MO PIZZ',
  alternateName: 'Mo Pizz Legnano',
  description: 'Pizzeria napoletana autentica a Legnano con forno a legna. Cucina tradizionale napoletana, pizza artigianale, menu fisso pranzo, asporto e gift card.',
  url: 'https://www.mopizz.it',
  telephone: '+390331024363',
  email: 'info@mopizz.it',
  image: [
    'https://www.mopizz.it/og-image.jpg',
    'https://www.mopizz.it/images/hero-home.webp',
  ],
  logo: 'https://www.mopizz.it/images/logo_mopizz.webp',
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
    latitude: '45.5979',
    longitude: '8.9040',
  },
  hasMap: 'https://maps.google.com/?q=MO+PIZZ+Legnano+Via+Cadore+4',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Tuesday', opens: '18:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Wednesday', opens: '18:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Thursday', opens: '18:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '12:00', closes: '14:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Friday', 'Saturday'], opens: '18:00', closes: '22:30' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Sunday', opens: '18:00', closes: '22:30' },
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
            offers: { '@type': 'Offer', price: '13.00', priceCurrency: 'EUR' },
          },
          {
            '@type': 'MenuItem',
            name: 'Menu Primo e Contorno',
            description: 'Un primo a scelta, un contorno a scelta. Acqua, servizio e caffè inclusi.',
            offers: { '@type': 'Offer', price: '9.00', priceCurrency: 'EUR' },
          },
          {
            '@type': 'MenuItem',
            name: 'Menu Secondo e Contorno',
            description: 'Un secondo a scelta, un contorno a scelta. Acqua, servizio e caffè inclusi.',
            offers: { '@type': 'Offer', price: '11.00', priceCurrency: 'EUR' },
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
  ],
  potentialAction: {
    '@type': 'OrderAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: 'https://www.mopizz.it/ordina',
      actionPlatform: 'http://schema.org/DesktopWebPlatform',
    },
    deliveryMethod: 'http://purl.org/goodrelations/v1#DeliveryModePickUp',
  },
};

// LocalBusiness schema (supplements Restaurant schema)
export const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'MO PIZZ — Pizzeria Napoletana Legnano',
  image: 'https://www.mopizz.it/images/hero-home.webp',
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
    latitude: '45.5979',
    longitude: '8.9040',
  },
  url: 'https://www.mopizz.it',
  telephone: '+390331024363',
  areaServed: [
    { '@type': 'City', name: 'Legnano' },
    { '@type': 'City', name: 'San Giorgio su Legnano' },
    { '@type': 'City', name: 'Canegrate' },
    { '@type': 'City', name: 'Cerro Maggiore' },
    { '@type': 'City', name: 'Rescaldina' },
    { '@type': 'City', name: 'Nerviano' },
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
