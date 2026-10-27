/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#faf5ec',
          200: '#f3e9d6',
          300: '#ead8b8',
          400: '#ddc28f',
          500: '#cea965',
        },
        bordeaux: {
          50: '#fcf5f5',
          100: '#f8e3e3',
          200: '#eec0c0',
          300: '#e09a9a',
          400: '#cf6a6a',
          500: '#b84545',
          600: '#9c2f2f',
          700: '#7d2323',
          800: '#5e1a1a',
          900: '#431414',
          950: '#2a0c0c',
        },
        gold: {
          50: '#fdfaf0',
          100: '#faf2d4',
          200: '#f4e3a0',
          300: '#edcf63',
          400: '#e7ba3a',
          500: '#d49a1f',
          600: '#b47a17',
          700: '#8f5b15',
          800: '#744716',
          900: '#613b17',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Poppins"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -15px rgba(94, 26, 26, 0.25)',
        gold: '0 8px 30px -10px rgba(212, 154, 31, 0.45)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out',
        'scale-in': 'scale-in 0.25s ease-out',
        'slide-in': 'slide-in 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
    },
  },
  plugins: [],
};
