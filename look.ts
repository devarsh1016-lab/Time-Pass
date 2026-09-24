import { asset } from '@/lib/asset';

// "Shop the look" editorial. Hotspot x / y are percentages of the image.
export type Hotspot = { productId: string; x: number; y: number };

export const look = {
  title: 'Dressed for a late dinner',
  body: 'Three pieces that read quietly across a table and catch the light when you lean in. Wear them together or let one carry the evening.',
  image: {
    src: asset('/media/look.jpg'),
    alt: 'Model in a plum gown wearing the Flicker hoops, Glow pendant and Taper tennis bracelet',
    width: 1120,
    height: 1400,
  },
  hotspots: [
    { productId: 'flicker-hoops', x: 39.5, y: 26.5 },
    { productId: 'glow-pendant', x: 51, y: 48 },
    { productId: 'taper-tennis', x: 18.5, y: 69 },
  ] satisfies Hotspot[],
};
