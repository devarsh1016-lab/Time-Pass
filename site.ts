import { asset } from '@/lib/asset';

// Store-level settings. Everything brand- or market-specific lives here.
export const site = {
  name: 'Star Jewellery',
  collection: 'Candlelight',
  description:
    'Candlelight: champagne and cognac diamonds set in 18k gold, made to order in Surat.',
  url: 'https://www.starjewellery.com', // used for Open Graph URLs
  locale: 'en-IN',
  currency: 'INR',
  heroVideo: {
    // Browsers take the first source they can play: webm (Chrome, Firefox), then mp4 (Safari, everything else).
    sources: [
      { src: asset('/media/hero.webm'), type: 'video/webm' },
      { src: asset('/media/hero.mp4'), type: 'video/mp4' },
    ],
    poster: asset('/media/hero-poster.jpg'),
  },
  contact: {
    email: 'account@starjewellery.com',
    whatsapp: '+91 97125 22200',
    address: ['Shivam Chambers, Khand Bazar', 'Varachha Road, Surat'],
  },
  credentials: 'Forevermark, CanadaMark and RJC certified',
  nav: [
    { label: 'Collection', href: '#collection' },
    { label: 'Shop the look', href: '#look' },
    { label: 'Reviews', href: '#reviews' },
  ],
} as const;
