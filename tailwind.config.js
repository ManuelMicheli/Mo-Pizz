/** @type {import('tailwindcss').Config} */
export default {
    content: [
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
            },
            backgroundImage: {
                'lines-pattern': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='4' stroke='hsla(25, 80%25, 85%25, 1)' fill='none'%3E%3Cline x1='0' y1='0' x2='400' y2='400'/%3E%3Cline x1='400' y1='0' x2='800' y2='400'/%3E%3Cline x1='800' y1='0' x2='1200' y2='400'/%3E%3Cline x1='0' y1='400' x2='400' y2='800'/%3E%3Cline x1='400' y1='400' x2='800' y2='800'/%3E%3Cline x1='800' y1='400' x2='1200' y2='800'/%3E%3Cline x1='0' y1='800' x2='400' y2='1200'/%3E%3Cline x1='400' y1='800' x2='800' y2='1200'/%3E%3Cline x1='800' y1='800' x2='1200' y2='1200'/%3E%3C/g%3E%3C/svg%3E")`,
                'lines-pattern-light': `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 800'%3E%3Cg stroke-width='4' stroke='hsla(17, 79%25, 53%25, 0.6)' fill='none'%3E%3Cline x1='0' y1='0' x2='400' y2='400'/%3E%3Cline x1='400' y1='0' x2='800' y2='400'/%3E%3Cline x1='800' y1='0' x2='1200' y2='400'/%3E%3Cline x1='0' y1='400' x2='400' y2='800'/%3E%3Cline x1='400' y1='400' x2='800' y2='800'/%3E%3Cline x1='800' y1='400' x2='1200' y2='800'/%3E%3Cline x1='0' y1='800' x2='400' y2='1200'/%3E%3Cline x1='400' y1='800' x2='800' y2='1200'/%3E%3Cline x1='800' y1='800' x2='1200' y2='1200'/%3E%3C/g%3E%3C/svg%3E")`,
            }
        },
    },
    plugins: [],
}
