// Puts every project file in the folder Next.js expects, however it was uploaded.
// Needed because the GitHub website on iPhone can't create folders: files end up
// flat at the repo root, or in folders the keyboard auto-capitalised ("App/").
// Safe to run on an already-correct repo: files in the right place are left alone.
import { existsSync, mkdirSync, readdirSync, renameSync, statSync } from 'node:fs';
import { basename, dirname, join, relative } from 'node:path';

const layout = {
  app: ['page.tsx', 'layout.tsx', 'globals.css'],
  components: [
    'AddButton.tsx', 'Cart.tsx', 'Footer.tsx', 'Grain.tsx', 'Header.tsx', 'Hero.tsx',
    'ProductCard.tsx', 'ProductGrid.tsx', 'ReviewMarquee.tsx', 'ShopTheLook.tsx', 'SmoothScroll.tsx',
  ],
  data: ['look.ts', 'products.ts', 'reviews.ts', 'site.ts'],
  lib: ['asset.ts', 'format.ts', 'newsletter.ts'],
  'public/media': ['hero.mp4', 'hero.webm', 'hero-poster.jpg', 'look.jpg'],
  'public/products': [
    'wick-solitaire', 'glow-pendant', 'flicker-hoops', 'taper-tennis',
    'ember-cluster', 'hearth-studs', 'vesper-drops', 'lantern-signet',
  ].flatMap((s) => [`${s}.jpg`, `${s}-worn.jpg`]),
};

// file name (lower-case) -> correct relative path
const target = new Map();
for (const [dir, files] of Object.entries(layout)) {
  for (const f of files) target.set(f.toLowerCase(), join(dir, f));
}

const skip = new Set(['node_modules', '.git', '.next', 'out']);
function walk(dir, found = []) {
  for (const name of readdirSync(dir)) {
    if (skip.has(name)) continue;
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, found);
    else found.push(relative('.', full));
  }
  return found;
}

// Undo renames phones sometimes add on download: "Hero.tsx.txt", "Hero (1).tsx".
const clean = (name) => name.replace(/\.txt$/i, '').replace(/ \(\d+\)(?=\.)/, '');

let moved = 0;
const missing = new Set(target.values());
for (const file of walk('.')) {
  const want = target.get(clean(basename(file)).toLowerCase());
  if (!want) continue;
  if (file !== want && !existsSync(want)) {
    mkdirSync(dirname(want), { recursive: true });
    renameSync(file, want);
    console.log(`moved ${file} -> ${want}`);
    moved++;
  }
  missing.delete(want);
}

console.log(`organize: ${moved} file(s) moved`);
if (missing.size) {
  console.error(`organize: these files are not in the repository yet:\n  ${[...missing].join('\n  ')}`);
  process.exit(1);
}
