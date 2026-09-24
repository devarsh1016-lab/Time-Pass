'use client';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { site } from '@/data/site';
import { useScrollTo } from './SmoothScroll';

const lines = ['Worn for the hour', 'the lights go low'];
const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const section = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const scrollTo = useScrollTo();

  // Slow parallax on the footage as the hero leaves the viewport.
  const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  // Play only while visible, never for reduced motion (the poster stays up).
  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (reduce) { el.pause(); return; }
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) el.play().catch(() => {});
      else el.pause();
    }, { threshold: 0.05 });
    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={section} id="top" className="relative h-[100svh] min-h-[600px] overflow-hidden" aria-label={`${site.collection} collection`}>
      <motion.div style={reduce ? undefined : { y, scale }} className="absolute inset-0 will-change-transform">
        <video
          ref={video}
          className="h-full w-full object-cover"
          poster={site.heroVideo.poster}
          muted
          loop
          playsInline
          autoPlay={!reduce}
          preload="metadata"
          aria-hidden
        >
          {site.heroVideo.sources.map((s) => <source key={s.src} src={s.src} type={s.type} />)}
        </video>
      </motion.div>

      {/* Weighted to the bottom-left where the type sits. */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(120%_90%_at_15%_100%,rgba(26,16,23,.92)_0%,rgba(26,16,23,.55)_45%,rgba(26,16,23,.15)_100%)]" />

      <motion.div
        style={reduce ? undefined : { opacity: fade }}
        className="relative mx-auto flex h-full max-w-[1440px] flex-col justify-end px-5 pb-14 md:px-10 md:pb-20"
      >
        <p className="mb-6 max-w-sm text-sm leading-relaxed text-mist md:text-base">
          The {site.collection} collection. Champagne and cognac diamonds in 18k gold, cut to hold the warmth of a room after dark.
        </p>

        <h1 className="font-display font-light leading-[0.9] tracking-[-0.02em] text-ivory text-[clamp(3.25rem,10.5vw,10.5rem)]">
          {lines.map((line, i) => (
            <span key={line} className="-mb-[0.1em] block overflow-hidden pb-[0.18em]">
              <motion.span
                className={`block ${i === 1 ? 'md:pl-[1.1em] italic' : ''}`}
                initial={reduce ? false : { y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1.3, delay: 0.25 + i * 0.16, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.div
          className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.1 }}
        >
          <a
            href="#collection"
            onClick={(e) => { e.preventDefault(); scrollTo('#collection'); }}
            className="rounded-full bg-champagne px-7 py-3.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-ivory"
          >
            Shop the collection
          </a>
          <a
            href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`}
            className="text-sm text-ivory underline decoration-champagne/60 underline-offset-[6px] transition-colors hover:decoration-champagne"
          >
            Book a private viewing
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
