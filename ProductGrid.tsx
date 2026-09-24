import { products } from '@/data/products';
import { site } from '@/data/site';
import { ProductCard } from './ProductCard';

export function ProductGrid() {
  return (
    <section id="collection" aria-labelledby="collection-title" className="mx-auto max-w-[1440px] px-5 py-24 outline-none md:px-10 md:py-36">
      <div className="mb-14 grid gap-6 md:mb-20 md:grid-cols-12 md:items-end">
        <h2 id="collection-title" className="font-display text-5xl font-light leading-none tracking-[-0.01em] md:col-span-7 md:text-7xl">
          The {site.collection} pieces
        </h2>
        <p className="max-w-md text-base leading-relaxed text-mist md:col-span-4 md:col-start-9">
          {products.length} pieces, each set by hand in Surat and shipped with its diamond certificate.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-x-4 gap-y-14 md:grid-cols-3 md:gap-x-8 md:gap-y-20 xl:grid-cols-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
