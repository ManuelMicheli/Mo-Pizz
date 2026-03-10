/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', 'gsap'],
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
    imageSizes: [32, 48, 64, 96, 128, 192, 256, 384],
    qualities: [60, 75, 85, 95],
    minimumCacheTTL: 2678400, // 31 days
  },

  reactCompiler: true,
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
          { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'X-Permitted-Cross-Domain-Policies', value: 'none' },
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' https://mopizz.plateform.app; style-src 'self' 'unsafe-inline' https://mopizz.plateform.app; font-src 'self' https://mopizz.plateform.app https://*.plateform.app; img-src 'self' data: https://www.mopizz.it https://mopizz.plateform.app https://*.plateform.app; frame-src https://www.google.com https://mopizz.plateform.app; frame-ancestors 'self'; base-uri 'self'; form-action 'self' https://mopizz.plateform.app; connect-src 'self' https://mopizz.plateform.app https://*.plateform.app",
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
    ];
  },
};

export default nextConfig;
