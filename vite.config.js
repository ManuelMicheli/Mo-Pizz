import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
