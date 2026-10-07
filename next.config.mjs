/** @type {import('next').NextConfig} */

// ---------------------------------------------------------------------------
// GitHub Pages configuration
// ---------------------------------------------------------------------------
// The site is exported as fully static HTML (no server, no database).
//
//   * Project page  ->  https://<user>.github.io/<repo>/   -> needs basePath "/<repo>"
//   * User page     ->  https://<user>.github.io/          -> needs NO basePath
//
// The GitHub Actions workflow (.github/workflows/deploy.yml) sets
// NEXT_PUBLIC_BASE_PATH automatically. For a local build it stays empty.
// ---------------------------------------------------------------------------

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

const nextConfig = {
  output: 'export',            // static HTML export -> the `out/` folder
  basePath,
  assetPrefix: basePath || undefined,
  trailingSlash: true,         // /about/ -> /about/index.html (works on Pages)
  images: { unoptimized: true }, // no Image Optimization server on Pages
  reactStrictMode: true,
  // The preview/browser client needs the value too, for any asset paths.
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
