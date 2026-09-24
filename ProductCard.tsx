'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import type { Product } from '@/data/products';
import { formatPrice } from '@/lib/format';
import { AddButton } from './AddButton';

const sizes = '(min-width: 1280px) 25vw, (min-width: 768px) 33vw, 50vw';

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  // Framer's hover gesture ignores touch, so phones never get a stuck lifted state.
  const [active, setActive] = useState(false);

  return (
    <motion.article
      onHoverStart={() => setActive(true)}
      onHoverEnd={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setActive(false); }}
      animate={active ? 'lift' : 'rest'}
      initial={false}
      className="group relative flex h-full flex-col"
    >
      <a href={product.href} className="block" aria-label={product.name}>
        <motion.div
          variants={{
            rest: { y: 0, boxShadow: '0 0 0 rgba(201,174,124,0)' },
            lift: { y: -12, boxShadow: '0 28px 60px -24px rgba(201,174,124,0.28)' },
          }}
          transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          className="relative aspect-[4/5] overflow-hidden rounded-[2px] bg-plum"
        >
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes={sizes}
            priority={priority}
            className="object-cover"
          />
          <motion.div
            aria-hidden
            className="absolute inset-0"
            variants={{ rest: { opacity: 0, scale: 1.06 }, lift: { opacity: 1, scale: 1 } }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={product.hoverImage.src} alt="" fill sizes={sizes} className="object-cover" />
          </motion.div>
          {product.note && (
            <span className="absolute left-3 top-3 rounded-full bg-ink/70 px-3 py-1 text-xs text-ivory backdrop-blur-sm">
              {product.note}
            </span>
          )}
        </motion.div>
      </a>

      <div className="mt-4 flex flex-col gap-1 sm:mt-5 sm:flex-row sm:items-start sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h3 className="font-display text-xl leading-tight sm:text-2xl">
            <a href={product.href} className="hover:text-champagne focus-visible:text-champagne">{product.name}</a>
          </h3>
          <p className="mt-1 text-sm leading-snug text-mist">{product.detail}</p>
        </div>
        <p className="text-sm tabular-nums sm:shrink-0 sm:pt-1">{formatPrice(product.price)}</p>
      </div>

      <div className="mt-auto pt-4">
        <AddButton
          ids={product.id}
          className="h-10 w-full rounded-full border border-line text-ivory hover:border-champagne hover:text-champagne"
        />
      </div>
    </motion.article>
  );
}
