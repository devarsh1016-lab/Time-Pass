'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { look } from '@/data/look';
import { productById, type Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { AddButton } from './AddButton';

const ease = [0.22, 1, 0.36, 1] as const;

export function ShopTheLook() {
  const items = look.hotspots
    .map((h) => ({ ...h, product: productById(h.productId) }))
    .filter((h): h is typeof h & { product: Product } => Boolean(h.product));
  const [activeId, setActiveId] = useState(items[0]?.productId);
  const active = items.find((i) => i.productId === activeId)?.product;
  const total = items.reduce((sum, i) => sum + i.product.price, 0);

  return (
    <section id="look" aria-labelledby="look-title" className="relative bg-plum outline-none">
      <div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-24 md:grid-cols-12 md:gap-10 md:px-10 md:py-36">
        {/* Editorial image with hotspots */}
        <div className="relative md:col-span-7">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={look.image.src}
              alt={look.image.alt}
              fill
              sizes="(min-width: 768px) 58vw, 100vw"
              className="object-cover"
            />
            {items.map((item) => {
              const isActive = item.productId === activeId;
              return (
                <button
                  key={item.productId}
                  type="button"
                  onClick={() => setActiveId(item.productId)}
                  aria-pressed={isActive}
                  aria-label={`Show ${item.product.name}`}
                  style={{ left: `${item.x}%`, top: `${item.y}%` }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 p-3"
                >
                  <span
                    className={`block h-5 w-5 rounded-full border transition-all duration-500 ease-silk ${
                      isActive
                        ? 'scale-110 border-champagne bg-champagne shadow-[0_0_0_8px_rgba(201,174,124,0.18)]'
                        : 'border-ivory/80 bg-ink/40 backdrop-blur-sm group-hover:border-champagne'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        {/* Copy, piece list, active detail */}
        <div className="flex flex-col md:col-span-5 md:col-start-8 md:pt-10">
          <h2 id="look-title" className="font-display text-5xl font-light leading-[0.95] tracking-[-0.01em] md:text-6xl">
            {look.title}
          </h2>
          <p className="mt-6 max-w-md font-display text-xl leading-relaxed text-mist">{look.body}</p>

          <ul className="mt-12 border-t border-line">
            {items.map((item) => {
              const isActive = item.productId === activeId;
              return (
                <li key={item.productId} className="border-b border-line">
                  <button
                    type="button"
                    onClick={() => setActiveId(item.productId)}
                    aria-pressed={isActive}
                    className="flex w-full items-baseline justify-between gap-4 py-5 text-left"
                  >
                    <span className={`font-display text-2xl transition-colors duration-300 ${isActive ? 'text-champagne' : 'text-ivory hover:text-champagne'}`}>
                      {item.product.name}
                    </span>
                    <span className="text-sm tabular-nums text-mist">{formatPrice(item.product.price)}</span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="relative mt-8 min-h-[148px]">
            <AnimatePresence mode="wait" initial={false}>
              {active && (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.4, ease }}
                  className="flex gap-5"
                >
                  <div className="relative aspect-[4/5] w-24 shrink-0 overflow-hidden bg-ink">
                    <Image src={active.image.src} alt="" fill sizes="96px" className="object-cover" />
                  </div>
                  <div className="flex min-w-0 flex-col justify-between">
                    <p className="text-sm leading-relaxed text-mist">{active.detail}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2">
                      <AddButton ids={active.id} className="h-10 rounded-full border border-line px-5 text-ivory hover:border-champagne hover:text-champagne" />
                      <a href={active.href} className="text-sm text-ivory underline decoration-line underline-offset-[6px] hover:decoration-champagne">
                        View piece
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <AddButton
            ids={items.map((i) => i.productId)}
            label={`Add all ${items.length} to bag, ${formatPrice(total)}`}
            doneLabel={`All ${items.length} added to bag`}
            className="mt-10 h-12 w-full rounded-full bg-champagne font-medium text-ink hover:bg-ivory md:mt-auto"
          />
        </div>
      </div>
    </section>
  );
}
