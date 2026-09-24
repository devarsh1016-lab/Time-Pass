'use client';

import Lenis from 'lenis';
import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

const LenisContext = createContext<Lenis | null>(null);

/**
 * Lenis is created once on the client and skipped entirely for
 * prefers-reduced-motion, so those visitors get native scrolling.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const instance = new Lenis({ lerp: 0.085, smoothWheel: true, wheelMultiplier: 0.9 });
    let frame = 0;
    const loop = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Scroll to "#id" through Lenis when active, natively otherwise. */
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  return useCallback(
    (hash: string) => {
      const target = document.querySelector<HTMLElement>(hash);
      if (!target) return;
      if (lenis) lenis.scrollTo(target, { offset: -72, duration: 1.4 });
      else target.scrollIntoView({ block: 'start' });
      // Move focus for keyboard and screen-reader users without a second jump.
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
      history.replaceState(null, '', hash);
    },
    [lenis],
  );
}
