// Static export needs a fixed value at build time.
export const dynamic = 'force-static';

// TODO: set your real published address (with the repo name) so search engines
// get absolute links. Override with NEXT_PUBLIC_SITE_URL in the Pages workflow.
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://example.github.io/armaghan-store';

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/cart/'], // private stock counter and cart
      },
      // Link previews matter for a shop that sells through WhatsApp.
      { userAgent: 'WhatsApp', allow: '/' },
      { userAgent: 'facebookexternalhit', allow: '/' },
      { userAgent: 'Twitterbot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
