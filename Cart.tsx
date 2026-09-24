'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { productById } from '@/data/products';

type CartState = {
  count: number;
  add: (ids: string | string[]) => void;
  lastAdded: string; // live-region message
};

const CartContext = createContext<CartState | null>(null);

// Minimal client bag so the landing page is shoppable on its own.
// Replace `add` with your commerce SDK (Shopify cartLinesAdd, etc.).
export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<string[]>([]);
  const [lastAdded, setLastAdded] = useState('');

  const add = useCallback((ids: string | string[]) => {
    const list = Array.isArray(ids) ? ids : [ids];
    setItems((prev) => [...prev, ...list]);
    const names = list.map((id) => productById(id)?.name ?? id).join(', ');
    setLastAdded(`Added ${names} to your bag.`);
  }, []);

  const value = useMemo(() => ({ count: items.length, add, lastAdded }), [items.length, add, lastAdded]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite">
        {lastAdded}
      </p>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used inside CartProvider');
  return ctx;
}
