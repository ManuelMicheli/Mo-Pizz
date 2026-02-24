/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                charcoal: '#1A1A1A',
                flame: '#E85D26',
                cream: '#FFF8F0',
                ember: '#C94A1A',
                gold: '#D4A853',
                smoke: '#8A8278',
                flour: '#F5F0E8',
                wood: '#6B4226',
            },
            fontFamily: {
                playfair: ['"CSCaliope"', 'serif'],
                sans: ['"TestTheFuture"', 'sans-serif'],
                caveat: ['"Caveat"', 'cursive'],
                mono: ['"TestTheFutureMono"', 'monospace'],
            },
            borderRadius: {
                '2rem': '2rem',
                '3rem': '3rem',
                '4rem': '4rem',
            }
        },
    },
    plugins: [],
}
