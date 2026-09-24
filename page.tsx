import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { ProductGrid } from '@/components/ProductGrid';
import { ReviewMarquee } from '@/components/ReviewMarquee';
import { ShopTheLook } from '@/components/ShopTheLook';

export default function Page() {
  return (
    <>
      <a href="#collection" className="sr-only z-50 rounded bg-champagne px-4 py-2 text-ink focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to the collection
      </a>
      <Header />
      <main>
        <Hero />
        <ProductGrid />
        <ShopTheLook />
        <ReviewMarquee />
      </main>
      <Footer />
    </>
  );
}
