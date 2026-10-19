/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        chelsea: {
          50: '#fdf2f4',
          100: '#fce7eb',
          200: '#fad1d9',
          300: '#f5abbc',
          400: '#ee7794',
          500: '#a8354e', // Primary Brand Burgundy from Chelsea PC
          600: '#93263e',
          700: '#7c1c32',
          800: '#68182b',
          900: '#581726',
          950: '#320912',
        },
        slateDark: '#1a1f26',
        charcoal: '#232932',
      },
      fontFamily: {
        sans: ['Jost', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.03)',
        'card': '0 4px 16px -2px rgba(0,0,0,0.06), 0 2px 6px -1px rgba(0,0,0,0.04)',
        'float': '0 10px 25px -5px rgba(168, 53, 78, 0.2), 0 8px 10px -6px rgba(0,0,0,0.05)',
      }
    },
  },
  plugins: [],
}
