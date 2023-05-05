/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/containter/**/*.{js,ts,jsx,tsx}',
    './src/features/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      height: {
        menu: 'calc(100vh - 64px)',
      },
      colors: {
        primary: '#FFA500',
        secondary: '#007BFF',
      },
      backgroundColor: {
        selected: '#66b2ff26',
      },
      borderRadius: {
        xl: '1rem',
      },
      boxShadow: {
        md: '0px 4px 6px -1px rgba(0, 0, 0, 0.1), 0px 2px 4px -1px rgba(0, 0, 0, 0.06)',
      },
      borderWidth: {
        1: '1px',
      },
      minWidth: {
        '1/3': '33%',
        9: '2.25rem',
      },
    },
  },
  plugins: [],
};
