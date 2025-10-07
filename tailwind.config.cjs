/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ivory: '#F8F5F0',
        sandstone: '#E9D8C5',
        terracotta: '#D9A282',
        peacock: '#1CA9C9',
        saffron: '#FFC145',
        jade: '#2FBF71',
        indigo: {
          950: '#0F1A3A'
        },
        charcoal: '#2B2B2B',
        terracottaRed: '#C75C5C',
      },
      boxShadow: {
        carved: 'inset 0 2px 0 rgba(255,255,255,0.5), inset 0 -2px 0 rgba(0,0,0,0.06)'
      },
      fontFamily: {
        body: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Poppins', 'ui-sans-serif', 'system-ui']
      },
      backgroundImage: {
        mandala: 'radial-gradient(circle, rgba(28,169,201,0.08) 0%, rgba(0,0,0,0) 60%)',
        warli: "url('/assets/patterns/warli.svg')",
        carved: "url('/assets/patterns/carved.svg')",
      },
      keyframes: {
        ripple: {
          '0%': { transform: 'scale(0.95)', opacity: 0.6 },
          '100%': { transform: 'scale(1.1)', opacity: 0 }
        },
        bloom: {
          '0%': { transform: 'scale(0.85)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 }
        },
        pulseLotus: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.08)' }
        }
      },
      animation: {
        ripple: 'ripple 1.2s ease-out',
        bloom: 'bloom 600ms ease-out',
        pulseLotus: 'pulseLotus 1.4s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
