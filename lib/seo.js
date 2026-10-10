import { site } from '@/data/site';

// ---------------------------------------------------------------------------
// SEO — one place for the site root, the keyword sets and the metadata builder.
//
// NEXT_PUBLIC_SITE_URL should be the *site root*, base path included — that is
// what the GitHub Pages workflow passes in:
//   project page  -> https://<user>.github.io/<repo>
//   user page     -> https://<user>.github.io
// If it is missing the base path (or NEXT_PUBLIC_BASE_PATH is set on its own),
// the two are joined so every absolute URL is built one single way.
// ---------------------------------------------------------------------------

const RAW_BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';
export const BASE_PATH = RAW_BASE_PATH.replace(/\/+$/, '');

const RAW_SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/+$/, '');

export const SITE_ORIGIN =
  BASE_PATH && !RAW_SITE_URL.endsWith(BASE_PATH) ? `${RAW_SITE_URL}${BASE_PATH}` : RAW_SITE_URL;

export const OG_IMAGE = '/og-image.png';

/** Absolute URL for a path that starts with '/'. */
export function absoluteUrl(path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean}`;
}

/** Cities and regions we actually deliver to — used in local keywords. */
const AREAS = Array.from(new Set([site.city, 'Lahore', 'Multan', 'Bahawalpur', 'Sahiwal', 'Karachi', 'Islamabad', 'Punjab', 'Pakistan']));

const AREA_KEYWORDS = AREAS.map((c) => `kapra delivery ${c}`);

export const KEYWORDS = {
  home: [
    'kapra online',
    'kapra shop Pakistan',
    'fabric online Pakistan',
    'unstitched suit price',
    'china boski',
    'boski kapra',
    'asli 12 pound boski',
    'boski winter summer',
    'wash and wear suit',
    'pure cotton suit',
    'kameez shalwar cloth',
    'wash and wear winter',
    'all colours kapra',
    'kapra wholesale rate',
    'sasta kapra online',
    'asli boski kapra',
    'fabric shop Urdu Bazar Lahore',
    'Armaghan Store',
    ...AREA_KEYWORDS,
  ],
  shop: [
    'buy fabric online Pakistan',
    'kapra rate list',
    'unstitched fabric online',
    'boski 12 pound original',
    'wash and wear suit',
    'winter wash and wear',
    'premium wash and wear',
    '100% pure cotton fabric',
    'cotton suit piece price',
    'mens suit piece price',
    'fabric with Cash on Delivery',
    ...AREA_KEYWORDS,
  ],
  wholesale: [
    'kapra wholesale rate',
    'fabric wholesale Pakistan',
    'bulk fabric order',
    'suit wholesale rate',
    'kapra supplier Lahore',
    'shopkeeper fabric rate',
    'wholesale kameez shalwar cloth',
    'fabric mill rate Pakistan',
  ],
  about: [
    'Armaghan Store',
    'Qari Ali Husnain Aslam',
    'kapra shop Vihari Punjab',
    'family fabric business Pakistan',
    'trusted fabric shop Pakistan',
    'fabric shop about us',
  ],
  refund: [
    'refund policy Pakistan',
    'return policy fabric shop',
    '20% refund deduction',
    'kapra return policy',
    'exchange fabric online',
    'courier return Pakistan',
    'store credit fabric shop',
  ],
  privacy: [
    'privacy policy kapra store',
    'how we use your data',
    'no database online shop',
    'customer data protection Pakistan',
  ],
  cart: ['shopping cart', 'order on WhatsApp', 'Cash on Delivery order'],
};

/** A short, clean fabric name for keyword combinations. */
function shortFabric(fabric = '') {
  return fabric
    .split(/[—–(,]/)[0]
    .trim()
    .replace(/\s+/g, ' ');
}

/** Keywords for a single product, built from its own data. */
export function productKeywords(product) {
  const fabric = shortFabric(product.fabric);
  const gender = (product.category || '').split('–')[0].trim();
  const colourTerms = (product.colors || []).map((c) => `${c} ${fabric}`.trim());

  return [
    product.name,
    `${product.name} price in Pakistan`,
    `${fabric} suit`,
    `${fabric} online`,
    `${fabric} price in Pakistan`,
    `${fabric} for ${gender.toLowerCase() || 'men'}`,
    ...colourTerms,
    ...(product.sizes || []).map((s) => `${product.name} ${s}`),
    `buy ${product.name} online`,
    `${product.name} ${site.city}`,
    `${product.category} price Pakistan`,
    'kapra online Pakistan',
    ...AREA_KEYWORDS.slice(0, 4),
  ]
    .filter(Boolean)
    .map((k) => k.replace(/\s+/g, ' ').trim());
}

/** Keywords for a collection (category) page. */
export function collectionKeywords(category) {
  const base = category.toLowerCase();
  return [
    `${base} online Pakistan`,
    `${base} price`,
    `buy ${base}`,
    `${base} kapra`,
    `${base} collection ${new Date().getFullYear()}`,
    `best ${base} shop`,
    ...AREA_KEYWORDS.slice(0, 4),
  ];
}

// ---------------------------------------------------------------------------
// Metadata builder — used by every page so titles, descriptions, canonicals,
// OG/Twitter cards and robots directives stay consistent.
// ---------------------------------------------------------------------------

export function buildMetadata({
  title,
  description,
  path = '/',
  keywords = [],
  images = [{ url: OG_IMAGE, width: 1200, height: 630, alt: `${site.name} — kapra & fabric` }],
  type = 'website',
  noindex = false,
  publishedTime,
} = {}) {
  const pathname = path.startsWith('/') ? path : `/${path}`;
  const url = absoluteUrl(pathname);
  const fullTitle = title ? title : `${site.name} — Kapra & Fabric Online, ${site.city}`;
  const absImages = images.map((img) => ({ ...img, url: img.url.startsWith('http') ? img.url : absoluteUrl(img.url) }));

  return {
    title: title || undefined,
    description,
    keywords: keywords.length ? keywords : undefined,
    alternates: {
      canonical: url,
      languages: { 'en-PK': url, 'x-default': url },
    },
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: 'en_PK',
      images: absImages,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: absImages.map((i) => i.url),
    },
  };
}
