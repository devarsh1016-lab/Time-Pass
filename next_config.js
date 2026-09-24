// Built as a static site so it can be hosted on GitHub Pages (no Node server).
// NEXT_PUBLIC_BASE_PATH is "/<repo-name>" on GitHub Pages and empty locally;
// the workflow in .github/workflows/deploy.yml sets it for you.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath,
  trailingSlash: true,
  images: {
    // GitHub Pages has no image optimizer, so images ship as-is.
    // They are pre-sized in /public for this reason.
    unoptimized: true,
  },
};

export default nextConfig;
