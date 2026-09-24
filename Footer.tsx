'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useId, useState, type FormEvent } from 'react';
import { site } from '@/data/site';
import { subscribe } from '@/lib/newsletter';
import { Grain } from './Grain';

type Status = 'idle' | 'sending' | 'done' | 'error';

const columns = [
  { title: 'Shop', links: [['Candlelight', '#collection'], ['Rings', '/rings'], ['Earrings', '/earrings'], ['Bracelets', '/bracelets']] },
  { title: 'Care', links: [['Sizing guide', '/sizing'], ['Certificates', '/certificates'], ['Returns and resizing', '/returns'], ['Lifetime cleaning', '/care']] },
] as const;

export function Footer() {
  const [status, setStatus] = useState<Status>('idle');
  const [message, setMessage] = useState('');
  const fieldId = useId();
  const msgId = useId();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = String(new FormData(e.currentTarget).get('email') ?? '').trim();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('error');
      setMessage('Enter an email address like name@example.com.');
      return;
    }
    setStatus('sending');
    try {
      await subscribe(email);
      setStatus('done');
      setMessage('Subscribed. The next collection reaches you before it goes public.');
    } catch (err) {
      setStatus('error');
      setMessage(err instanceof Error ? err.message : 'Subscription failed. Try again in a minute.');
    }
  }

  return (
    <footer className="relative isolate overflow-hidden bg-ink pt-24 md:pt-32">
      <Grain opacity={0.16} />
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[70%] bg-[radial-gradient(60%_60%_at_80%_0%,rgba(74,42,66,.55),transparent_70%)]" />

      <div className="relative mx-auto grid max-w-[1440px] gap-x-8 gap-y-16 px-5 md:grid-cols-12 md:px-10">
        {/* Newsletter */}
        <div className="md:col-span-5">
          <h2 className="font-display text-4xl font-light leading-[1.05] md:text-6xl">
            First look at each new collection
          </h2>
          <p className="mt-5 max-w-md leading-relaxed text-mist">
            One letter a month: new pieces, private viewing dates, and the stories behind the stones.
          </p>

          <form onSubmit={onSubmit} noValidate className="mt-10 max-w-lg">
            <label htmlFor={fieldId} className="sr-only">Email address</label>
            <div className="flex items-center gap-3 border-b border-line pb-3 transition-colors focus-within:border-champagne">
              <input
                id={fieldId}
                name="email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="Your email address"
                aria-invalid={status === 'error'}
                aria-describedby={msgId}
                disabled={status === 'done'}
                className="min-w-0 flex-1 bg-transparent py-2 text-lg text-ivory placeholder:text-mist/70 focus:outline-none"
              />
              <button
                type="submit"
                disabled={status === 'sending' || status === 'done'}
                className="shrink-0 rounded-full bg-champagne px-6 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ivory disabled:opacity-60"
              >
                {status === 'sending' ? 'Subscribing' : status === 'done' ? 'Subscribed' : 'Subscribe'}
              </button>
            </div>
            <div id={msgId} aria-live="polite" className="mt-3 min-h-6 text-sm">
              <AnimatePresence mode="wait">
                {message && (
                  <motion.p
                    key={message}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className={status === 'error' ? 'text-[#E3A6A0]' : 'text-champagne'}
                  >
                    {message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>

        {/* Link columns */}
        {columns.map((col, i) => (
          <nav key={col.title} aria-label={col.title} className={`md:col-span-2 ${i === 0 ? 'md:col-start-7' : ''}`}>
            <h3 className="mb-5 text-sm text-mist">{col.title}</h3>
            <ul className="space-y-3">
              {col.links.map(([label, href]) => (
                <li key={href}>
                  <a href={href} className="text-ivory/90 transition-colors hover:text-champagne">{label}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}

        <div className="md:col-span-2 md:col-start-11">
          <h3 className="mb-5 text-sm text-mist">Visit</h3>
          <address className="space-y-3 text-[15px] not-italic leading-relaxed text-ivory/90">
            <p>{site.contact.address.map((l) => <span key={l} className="block">{l}</span>)}</p>
            <p><a href={`mailto:${site.contact.email}`} className="break-all hover:text-champagne">{site.contact.email}</a></p>
            <p><a href={`https://wa.me/${site.contact.whatsapp.replace(/\D/g, '')}`} className="hover:text-champagne">WhatsApp {site.contact.whatsapp}</a></p>
          </address>
        </div>
      </div>

      {/* Closing wordmark, cropped by the page edge */}
      <div className="relative mt-24 md:mt-32">
        <p aria-hidden className="select-none whitespace-nowrap text-center font-display font-light leading-[0.75] tracking-[-0.03em] text-plum text-[clamp(4rem,19vw,20rem)] translate-y-[12%]">
          {site.collection}
        </p>
        <div className="absolute inset-x-0 bottom-0 mx-auto flex max-w-[1440px] flex-wrap justify-between gap-3 px-5 pb-6 text-xs text-mist md:px-10">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <p>{site.credentials}</p>
        </div>
      </div>
    </footer>
  );
}
