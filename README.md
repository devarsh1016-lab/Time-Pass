# Candlelight landing

Next 15 (App Router) + Tailwind 3 + Framer Motion + Lenis. Dark plum / champagne on the Star Jewellery type system (Cormorant Garamond + Jost via `next/font`).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Putting it on GitHub Pages

1. Create a new repository on GitHub. Its name becomes part of the web address.
2. Upload the contents of this folder (not the folder itself), including the hidden `.github` folder. Do not upload `node_modules`, `.next` or `out`.
3. In the repository go to Settings > Pages and set Source to **GitHub Actions**.
4. Open the Actions tab. The "Deploy to GitHub Pages" workflow builds the site in about 2 minutes, then shows the live link, usually `https://<username>.github.io/<repo-name>/`.

Every later commit to `main` redeploys automatically. The site is built as static files (`output: 'export'`), so Pages needs no server. The workflow passes the repository name to the build as `NEXT_PUBLIC_BASE_PATH`, and `lib/asset.ts` adds it to every image and video path. Use `asset('/your-file.jpg')` for any new file you put in `public/`.

## Swapping content

| What | Where |
| --- | --- |
| Store name, collection, currency/locale, contact, nav, hero video | `data/site.ts` |
| Products (8 placeholder pieces) | `data/products.ts`, typed `Product` |
| Shop the look image + hotspots (x/y in %) | `data/look.ts` |
| Reviews + rating summary (placeholders) | `data/reviews.ts` |
| Newsletter provider | `lib/newsletter.ts` |
| Bag / add to cart | `components/Cart.tsx` (`add()`), swap for Shopify etc. |

Product images are 4:5. Replace `public/products/*.jpg` (and `*-worn.jpg` for the hover swap) or point `image.src` at a full CDN URL.

Everything in `public/` is generated placeholder art, including the hero loop (`media/hero.webm` 170 KB, `media/hero.mp4` 270 KB, 8 s). For your real footage: 1280-1920 px wide, 6-10 s loop, no audio, H.264 mp4 at ~1-2 MB, plus a VP9 `.webm` (listed first in `site.heroVideo.sources`). Export the first frame as `hero-poster.jpg` so there is no flash before playback.

## Performance and accessibility notes

- Hero video: `preload="metadata"`, poster first, plays only while on screen, never for reduced motion.
- Lenis is not instantiated for `prefers-reduced-motion`; native scrolling takes over. Anchor links go through `useScrollTo()` and move focus to the target section.
- Product images use `next/image` with `sizes` and lazy loading. GitHub Pages has no image optimizer, so the files in `public/` are pre-sized to 2x their display size (product shots 800 x 1000, about 80 KB each). Keep replacements at that size.
- Hover lift + image swap is Framer's hover gesture (ignores touch) and also triggers on keyboard focus.
- Marquee is pure CSS, pauses on hover/focus, and becomes a static scrollable row for reduced motion. The duplicate row is `aria-hidden`.
- First load JS is ~168 kB for the page.
