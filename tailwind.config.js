/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,css}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        barber: {
          bg: '#ffffff',
          'bg-alt': '#f7f6f1',
          green: '#163a2e',
          'green-light': '#1f5040',
          'green-muted': 'rgba(22, 58, 46, 0.08)',
          ink: '#0f1f1a',
          muted: '#6b7e78',
          cream: '#ececd4',
        },
      },
    },
  },
  plugins: [],
};
