import { reviews, reviewSummary, type Review } from '@/data/reviews';

function Row({ items, hidden = false }: { items: Review[]; hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {items.map((r) => (
        <li key={r.name} className="flex shrink-0 items-center">
          <figure className="px-8 md:px-12">
            <blockquote className="whitespace-nowrap font-display text-3xl font-light italic md:text-5xl">
              {r.quote}
            </blockquote>
            <figcaption className="mt-3 text-sm text-mist">
              {r.name}, {r.city}
            </figcaption>
          </figure>
          <span aria-hidden className="text-lg text-champagne">✦</span>
        </li>
      ))}
    </ul>
  );
}

// CSS-driven so it costs nothing on the main thread. Pauses on hover and focus;
// with reduced motion it stops and becomes a scrollable row instead.
export function ReviewMarquee() {
  return (
    <section id="reviews" aria-labelledby="reviews-title" className="overflow-hidden border-y border-line py-20 outline-none md:py-28">
      <div className="mx-auto mb-12 flex max-w-[1440px] items-baseline justify-between gap-6 px-5 md:px-10">
        <h2 id="reviews-title" className="text-base text-mist">
          From the people wearing it
        </h2>
        <p className="text-sm text-mist">
          <span className="text-champagne">{reviewSummary.rating}</span> from {reviewSummary.count.toLocaleString('en-IN')} verified reviews
        </p>
      </div>

      <div className="group flex overflow-x-auto motion-safe:overflow-x-hidden [scrollbar-width:none]">
        <div
          className="flex motion-safe:animate-marquee group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]"
          style={{ ['--marquee-duration' as string]: `${reviews.length * 11}s` }}
        >
          <Row items={reviews} />
          <Row items={reviews} hidden />
        </div>
      </div>
    </section>
  );
}
