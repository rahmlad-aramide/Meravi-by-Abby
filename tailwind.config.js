/** @type {import('tailwindcss').Config} */
export const content = [
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
];
export const theme = {
  extend: {
    screens: {
      'xxl': '1350px',
      'xl': '1280px',
      'lg': '1024px',
      'md': '768px',
      'sm': '640px',
      'ssm': '420px',
      'lsm': '320px'
    },
    colors: {
      'Primary': '#096BD8',
      'Secondary': '#0A8E26',
      "White": '#FFFFFF',
      'OtherWhite': '#F8F8F8',
      'FooterGray': '#F0F0F0',
      'Black': '#222222',
      "Gray": "#4E4E4E",
      'transparentDark': 'hsla(0, 0%, 13%, 0.8)',
      'dark': '#212121',
      'borderHash': '#BABABA',
      'borderCartActions': '#999999'
    },
    fontFamily: {
      montserrat: ['Montserrat', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
      clashGrotesk: ['ClashGrotesk'],
      outfit: ['Outfit', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    boxShadow: {
      'shawdowCart': '0px 1px 2px 0px #1018280D'
    },
    backgroundImage: {
      'hero-1': "url('/heroBg1.webp')",
    }
  },
};
export const plugins = []; 