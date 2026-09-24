import type { Config } from 'tailwindcss';

// Palette follows the Star Jewellery system (ivory / plum / champagne),
// pushed dark: plum-black is the base, champagne is reserved for metal and actions.
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1A1017', // plum-black base
        plum: '#2E1929', // raised surfaces
        wine: '#4A2A42', // hover surfaces, hotspot fill
        line: '#4D3647', // hairlines
        ivory: '#F3ECE2', // primary text
        mist: '#B3A3AB', // secondary text
        champagne: '#C9AE7C', // metal, actions
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        silk: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      keyframes: {
        marquee: { from: { transform: 'translate3d(0,0,0)' }, to: { transform: 'translate3d(-50%,0,0)' } },
      },
      animation: {
        marquee: 'marquee var(--marquee-duration, 60s) linear infinite',
      },
    },
  },
  plugins: [],
};

export default config;
