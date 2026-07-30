/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap', 'framer-motion'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384],
    qualities: [60, 75, 85, 95],
    minimumCacheTTL: 31536000, // 1 year — Lighthouse "efficient cache lifetime"
  },

  reactCompiler: false,
  reactStrictMode: true,
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: '/fonts/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/videos/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://va.vercel-scripts.com; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: https://www.mopizz.it; frame-src https://www.google.com https://widget.thefork.com https://*.thefork.com https://*.xmenu.it; frame-ancestors 'self'; base-uri 'self'; form-action 'self'; connect-src 'self' https://va.vercel-scripts.com; upgrade-insecure-requests",
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/menu',
        destination: '/#menu',
        permanent: true,
      },
      {
        source: '/prenota',
        destination: '/#prenota',
        permanent: true,
      },
      // Vecchia pagina ordine a domicilio (Plateform) → nuova pagina Consegne (TheFork).
      { source: '/ordina', destination: '/consegne', permanent: true },
      // Servizi non più attivi → home per non perdere il traffico indicizzato.
      { source: '/gift-cards', destination: '/', permanent: true },
    ];
  },
};

export default nextConfig;
