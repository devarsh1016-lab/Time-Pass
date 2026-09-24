'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { useCart } from './Cart';

type Props = { ids: string | string[]; label?: string; doneLabel?: string; className?: string };

export function AddButton({ ids, label = 'Add to bag', doneLabel = 'Added to bag', className = '' }: Props) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!done) return;
    const t = setTimeout(() => setDone(false), 1800);
    return () => clearTimeout(t);
  }, [done]);

  return (
    <button
      type="button"
      onClick={() => {
        add(ids);
        setDone(true);
      }}
      className={`relative overflow-hidden text-sm transition-colors duration-300 ${className}`}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={done ? 'done' : 'idle'}
          className="block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {done ? doneLabel : label}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
