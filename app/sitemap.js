import { products, categories, categorySlug } from '@/lib/products';

// Static export needs a fixed list of URLs at build time.
export const dynamic = 'force-static';

// TODO: set your real published address (with the repo name) so search engines
// get absolute links. Override with NEXT_PUBLIC_SITE_URL in the Pages workflow.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.github.io/armaghan-store';

export default function sitemap() {
  const now = new Date();
  // /cart and /admin are deliberately excluded — they are noindex.
  const pages = ['', '/about', '/refund-policy', '/privacy-policy'];

  return [
    ...pages.map((p) => ({
      url: `${SITE_URL}${p}/`,
      lastModified: now,
      changeFrequency: p === '' ? 'daily' : 'monthly',
      priority: p === '' ? 1 : 0.6,
    })),
    ...categories.map((c) => ({
      url: `${SITE_URL}/collection/${categorySlug(c)}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.7,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/products/${product.slug}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    })),
  ];
}
