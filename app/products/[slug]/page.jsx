import { notFound } from 'next/navigation';
import ProductDetail from '@/components/ProductDetail';
import JsonLd from '@/components/JsonLd';
import { getProduct, products } from '@/lib/products';
import { site } from '@/data/site';
import { buildMetadata, productKeywords, SITE_ORIGIN, OG_IMAGE, absoluteUrl } from '@/lib/seo';
import { breadcrumbSchema, productSchema } from '@/lib/schema';
import { formatPKR } from '@/lib/format';

// Static export: pre-render one page per product.
export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }) {
  const product = getProduct(params.slug);
  if (!product) return { title: 'Product not found', robots: { index: false, follow: true } };

  // Product photos double as the social card — much stronger than a generic logo.
  const photo = product.images?.[0];
  const images = photo
    ? [
        {
          url: absoluteUrl(photo),
          width: 1200,
          height: 900,
          alt: `${product.name} — ${product.colors.join(', ')}`,
        },
      ]
    : [{ url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: `${product.name} — ${site.name}` }];

  return buildMetadata({
    path: `/products/${product.slug}/`,
    type: 'website',
    title: `${product.name} — ${formatPKR(product.price)}`,
    description: `${product.short} ${product.fabric}. Colours: ${product.colors.join(', ')}. Sizes: ${product.sizes.join(', ')}. ${formatPKR(product.price)} at ${site.name}, ${site.city} — order on WhatsApp with delivery across Pakistan.`,
    keywords: productKeywords(product),
    images,
  });
}

export default function ProductPage({ params }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .concat(products.filter((p) => p.slug !== product.slug))
    .filter((p, i, arr) => arr.findIndex((x) => x.slug === p.slug) === i)
    .slice(0, 3);


  return (
    <>
      <div className="container">
        <ProductDetail product={product} related={related} />
      </div>

      <JsonLd
        id={`ld-product-${product.slug}`}
        data={[
          productSchema(product, SITE_ORIGIN),
          breadcrumbSchema(
            [
              ['Shop', '/'],
              [product.category, `/collection/${product.category.toLowerCase().replace(/–|—/g, '-').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}/`],
              [product.name, `/products/${product.slug}/`],
            ],
            SITE_ORIGIN,
          ),
        ]}
      />
    </>
  );
}
