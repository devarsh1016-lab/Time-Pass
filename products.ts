import { asset } from '@/lib/asset';

// Swap this array for your CMS / Shopify / API response.
// The UI only depends on the Product type below.

export type ProductImage = { src: string; alt: string };

export type Product = {
  id: string;
  name: string;
  detail: string; // metal + stone line under the name
  price: number; // in site.currency, whole units
  href: string;
  image: ProductImage; // shown at rest
  hoverImage: ProductImage; // swapped in on hover / focus
  note?: string; // short availability note, e.g. "Made to order, 3 weeks"
};

const img = (slug: string, alt: string, altWorn: string) => ({
  image: { src: asset(`/products/${slug}.jpg`), alt },
  hoverImage: { src: asset(`/products/${slug}-worn.jpg`), alt: altWorn },
});

export const products: Product[] = [
  {
    id: 'wick-solitaire',
    name: 'Wick solitaire',
    detail: '1.2 ct champagne diamond, 18k yellow gold',
    price: 248000,
    href: '/products/wick-solitaire',
    ...img('wick-solitaire', 'Wick solitaire ring on plum velvet', 'Wick solitaire ring worn on the hand'),
  },
  {
    id: 'glow-pendant',
    name: 'Glow pendant',
    detail: 'Pear cognac diamond, 18k rose gold chain',
    price: 132000,
    href: '/products/glow-pendant',
    ...img('glow-pendant', 'Glow pendant on a fine gold chain', 'Glow pendant worn at the collarbone'),
  },
  {
    id: 'flicker-hoops',
    name: 'Flicker hoops',
    detail: 'Pavé champagne diamonds, 18k yellow gold',
    price: 96000,
    href: '/products/flicker-hoops',
    ...img('flicker-hoops', 'Pair of Flicker hoop earrings', 'Flicker hoops worn'),
  },
  {
    id: 'taper-tennis',
    name: 'Taper tennis bracelet',
    detail: '4.8 ct graduated champagne diamonds, 18k gold',
    price: 386000,
    href: '/products/taper-tennis',
    ...img('taper-tennis', 'Taper tennis bracelet laid in a loop', 'Taper tennis bracelet worn on the wrist'),
    note: 'Made to order, 3 weeks',
  },
  {
    id: 'ember-cluster',
    name: 'Ember cluster ring',
    detail: 'Cognac and white diamond cluster, 18k rose gold',
    price: 174000,
    href: '/products/ember-cluster',
    ...img('ember-cluster', 'Ember cluster ring', 'Ember cluster ring worn'),
  },
  {
    id: 'hearth-studs',
    name: 'Hearth studs',
    detail: '0.5 ct each, champagne diamonds, bezel set',
    price: 88000,
    href: '/products/hearth-studs',
    ...img('hearth-studs', 'Pair of Hearth stud earrings', 'Hearth studs worn'),
  },
  {
    id: 'vesper-drops',
    name: 'Vesper drops',
    detail: 'Oval champagne diamonds on fine gold wire',
    price: 142000,
    href: '/products/vesper-drops',
    ...img('vesper-drops', 'Vesper drop earrings', 'Vesper drop earrings worn'),
  },
  {
    id: 'lantern-signet',
    name: 'Lantern signet',
    detail: 'Hand-engraved 18k gold, cognac diamond centre',
    price: 118000,
    href: '/products/lantern-signet',
    ...img('lantern-signet', 'Lantern signet ring', 'Lantern signet ring worn'),
    note: 'Engraving available',
  },
];

export const productById = (id: string) => products.find((p) => p.id === id);
