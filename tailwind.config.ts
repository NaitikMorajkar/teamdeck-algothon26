import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#10131B',
        paper: '#F6F7F2',
        lime: '#C8F169',
        coral: '#FF8364',
        lilac: '#9BA7FF'
      },
      fontFamily: {
        display: ['var(--font-space)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif']
      }
    }
  },
  plugins: []
};
export default config;
