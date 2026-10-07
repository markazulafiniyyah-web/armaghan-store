import { site } from '@/data/site';
import { SITE_ORIGIN, OG_IMAGE } from '@/lib/seo';
import { products } from '@/lib/products';

// ---------------------------------------------------------------------------
// Schema.org structured data (JSON-LD).
//
// Every builder takes the build-time origin, which <LiveSeo /> replaces with
// the real domain read from the address bar at runtime.
// ---------------------------------------------------------------------------

const abs = (path, origin = SITE_ORIGIN) => `${origin}${path.startsWith('/') ? path : `/${path}`}`;

/** The shop itself — used on every page. */
export function storeSchema(origin = SITE_ORIGIN) {
  return {
    '@context': 'https://schema.org',
    '@type': ['ClothingStore', 'LocalBusiness'],
    '@id': `${origin}/#store`,
    name: site.name,
    alternateName: 'Armaghan Kapra Store',
    description: site.tagline,
    url: `${origin}/`,
    image: abs(OG_IMAGE, origin),
    logo: abs('/icon-512.png', origin),
    telephone: `+${site.whatsappNumber}`,
    currenciesAccepted: 'PKR',
    paymentAccepted: 'Cash on Delivery, Bank transfer, JazzCash, Easypaisa',
    priceRange: 'Rs 950 – Rs 7,900',
    founder: { '@type': 'Person', name: site.owner },
    address: {
      '@type': 'PostalAddress',
      streetAddress: site.addressLine,
      addressLocality: site.city,
      addressRegion: site.region,
      addressCountry: 'PK',
    },
    areaServed: [
      { '@type': 'Country', name: 'Pakistan' },
      ...['Vihari', 'Multan', 'Bahawalpur', 'Lahore', 'Karachi', 'Islamabad'].map((c) => ({
        '@type': 'City',
        name: c,
      })),
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '10:00',
        closes: '21:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Kapra & fabric',
      itemListElement: Array.from(new Set(products.map((p) => p.category))).map((category) => ({
        '@type': 'OfferCatalog',
        name: category,
        url: abs(`/collection/${slugifyCategory(category)}/`, origin),
      })),
    },
  };
}

function slugifyCategory(category) {
  return category
    .toLowerCase()
    .replace(/–|—/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** The website node, with the shop as publisher. */
export function websiteSchema(origin = SITE_ORIGIN) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: `${origin}/`,
    name: site.name,
    inLanguage: 'en-PK',
    publisher: { '@id': `${origin}/#store` },
  };
}

/** A product page: product, offer, colours, sizes and its breadcrumb. */
export function productSchema(product, origin = SITE_ORIGIN) {
  const inStock = product.variants.some((v) => v.base > 0);
  const url = abs(`/products/${product.slug}/`, origin);
  const images = (product.images || []).map((i) => abs(i, origin));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: product.name,
    description: product.short,
    sku: product.slug,
    mpn: product.slug,
    category: product.category,
    material: product.fabric,
    color: product.colors.join(', '),
    size: product.sizes.join(', '),
    image: images.length ? images : [abs(OG_IMAGE, origin)],
    brand: { '@type': 'Brand', name: site.name },
    manufacturer: { '@id': `${origin}/#store` },
    countryOfOrigin: product.fabric?.toLowerCase().includes('china')
      ? { '@type': 'Country', name: 'China' }
      : { '@type': 'Country', name: 'Pakistan' },
    offers: {
      '@type': 'Offer',
      url,
      priceCurrency: 'PKR',
      price: product.price,
      priceValidUntil: new Date(new Date().setMonth(new Date().getMonth() + 6)).toISOString().slice(0, 10),
      availability: inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      itemCondition: 'https://schema.org/NewCondition',
      seller: { '@id': `${origin}/#store` },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'PK' },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          businessDays: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday', 'Saturday'] },
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 1, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 2, maxValue: 5, unitCode: 'DAY' },
        },
      },
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Available colours',
        value: product.colors.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'Available sizes',
        value: product.sizes.join(', '),
      },
      {
        '@type': 'PropertyValue',
        name: 'How to order',
        value: `WhatsApp ${site.phoneDisplay} or add to cart on this page`,
      },
    ],
  };
}

/** Breadcrumb trail for any page: [[name, path], …] */
export function breadcrumbSchema(trail, origin = SITE_ORIGIN) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map(([name, path], i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name,
      item: abs(path, origin),
    })),
  };
}

/** A list of products — used on the home page and collection pages. */
export function itemListSchema(list, origin = SITE_ORIGIN, name = 'Kapra & fabric') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: p.name,
      url: abs(`/products/${p.slug}/`, origin),
    })),
  };
}

/** FAQ — used on the refund policy page, matches the visible Q&A. */
export function faqSchema(qas, origin = SITE_ORIGIN) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${origin}/refund-policy/#faq`,
    mainEntity: qas.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}
