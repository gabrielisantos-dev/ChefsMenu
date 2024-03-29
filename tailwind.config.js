/** @type {import('tailwindcss').Config} */
export const content = [
  './src/**/*.{js,jsx,ts,tsx}',
];
export const theme = {
  extend: {},
  fontFamily: {
    epilogue: ['Epilogue', 'sans-serif'],
  },
  screens: {
    sm: '394px',
    md: '768px',
    lg: '1024px',
  },
  colors: {
    red: '#C1292E',
    yellow: '#F1D302',
    gray: '#262730',
    zinc: '#B1B1B1',
    black: '#000000',
    white: '#FFFFFF',
  },
};
export const plugins = [];
