import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        // Block /api/* requests in dev — these are Vercel serverless functions
        {
            name: 'block-api-routes',
            configureServer(server) {
                server.middlewares.use((req, res, next) => {
                    if (req.url?.startsWith('/api/')) {
                        res.statusCode = 404;
                        res.end(JSON.stringify({ error: 'API routes are only available on Vercel' }));
                        return;
                    }
                    next();
                });
            },
        },
        react(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    build: {
        // Split vendor chunks for better caching
        rollupOptions: {
            output: {
                manualChunks: {
                    'vendor-react': ['react', 'react-dom', 'react-router-dom', 'react-router-hash-link'],
                    'vendor-gsap': ['gsap'],
                    'vendor-lenis': ['lenis'],
                    'vendor-framer': ['framer-motion'],
                },
            },
        },
        // Drop console.log in production
        minify: 'esbuild',
        target: 'es2020',
    },
})
