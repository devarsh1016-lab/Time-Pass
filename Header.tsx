'use client';

import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';
import { site } from '@/data/site';
import { useCart } from './Cart';
import { useScrollTo } from './SmoothScroll';

export function Header() {
  const { scrollY } = useScroll();
  const [solid, setSolid] = useState(false);
  const { count } = useCart();
  const scrollTo = useScrollTo();

  useMotionValueEvent(scrollY, 'change', (y) => setSolid(y > 48));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        solid ? 'border-b border-line/60 bg-ink/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 md:h-[72px] md:px-10">
        <a href="#top" onClick={(e) => { e.preventDefault(); scrollTo('#top'); }} className="font-display text-2xl tracking-tight">
          {site.name}
        </a>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex gap-9 text-sm text-mist">
            {site.nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); scrollTo(item.href); }}
                  className="transition-colors hover:text-ivory"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a href="/bag" className="flex items-center gap-2 text-sm">
          Bag
          <span className="relative inline-flex h-6 min-w-6 items-center justify-center overflow-hidden rounded-full border border-champagne/60 px-1.5 text-xs text-champagne">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={count}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {count}
              </motion.span>
            </AnimatePresence>
            <span className="sr-only"> items</span>
          </span>
        </a>
      </div>
    </header>
  );
}
