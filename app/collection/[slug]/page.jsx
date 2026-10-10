import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import JsonLd from '@/components/JsonLd';
import { products, categories, categorySlug, categoryFromSlug, productsInCategory } from '@/lib/products';
import { site } from '@/data/site';
import { buildMetadata, collectionKeywords, SITE_ORIGIN } from '@/lib/seo';
import { breadcrumbSchema, itemListSchema } from '@/lib/schema';
import { formatPKR, waLink } from '@/lib/format';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: categorySlug(c) }));
}

/** Short intro written per category so every collection page has real content. */
const INTROS = {
  Boski:
    'AAA-grade Boski in the 12 pound lot — creamy, smooth and comfortable in both winter and summer. Sold as full unstitched suit pieces at Rs 3,000.',
  'Wash & Wear':
    'Wrinkle-resistant wash & wear suiting — winter weight at Rs 2,400 and the premium grade at Rs 3,300. All colours available.',
  'Pure Cotton':
    '100% pure cotton suit fabric in the full colour range — breathable, honest fabric at Rs 3,300, softening with every wash.',
};

export function generateMetadata({ params }) {
  const category = categoryFromSlug(params.slug);
  if (!category) return { title: 'Collection not found', robots: { index: false } };
  const items = productsInCategory(category);
  const cheapest = items.length ? Math.min(...items.map((p) => p.price)) : 0;

  return buildMetadata({
    path: `/collection/${params.slug}/`,
    title: `${category} — Buy Online in Pakistan`,
    description: `${items.length} ${category.toLowerCase()} items from ${formatPKR(cheapest)} at ${site.name}, ${site.city}. Live colour and size stock, order on WhatsApp, Cash on Delivery across Pakistan.`,
    keywords: collectionKeywords(category),
  });
}

export default function CollectionPage({ params }) {
  const category = categoryFromSlug(params.slug);
  if (!category) notFound();

  const items = productsInCategory(category);
  const others = categories.filter((c) => c !== category);
  const cheapest = items.length ? Math.min(...items.map((p) => p.price)) : 0;

  return (
    <div className="container">
      <JsonLd
        id={`ld-collection-${params.slug}`}
        data={[
          itemListSchema(items, SITE_ORIGIN, category),
          breadcrumbSchema(
            [
              ['Shop', '/'],
              [category, `/collection/${params.slug}/`],
            ],
            SITE_ORIGIN,
          ),
        ]}
      />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>{category}</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Collection</span>
        <h1>{category}</h1>
        <p className="lede">{INTROS[category] || `Everything we stock in ${category.toLowerCase()}.`}</p>
        <p className="muted small">
          {items.length} item{items.length === 1 ? '' : 's'} · from {formatPKR(cheapest)} · live stock for every colour
          and size · delivery across Pakistan with Cash on Delivery
        </p>
      </header>

      <div className="grid products">
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>

      <section className="section">
        <div className="wa-banner">
          <div>
            <h2>Looking for something in {category.toLowerCase()} that is not here?</h2>
            <p>
              We keep more in the shop than on the website. Send us a message at {site.phoneDisplay} and we will check
              the shelf and the next lot for you.
            </p>
          </div>
          <a
            className="btn btn-wa btn-lg"
            href={waLink(
              `Assalam o Alaikum ${site.name}! I am looking for ${category}. Please tell me what you have available.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>

      <section className="section">
        <h2 className="section-title">Other collections</h2>
        <div className="chips">
          {others.map((c) => (
            <Link key={c} href={`/collection/${categorySlug(c)}/`} className="chip">
              {c}
            </Link>
          ))}
          <Link href="/" className="chip">
            All products
          </Link>
        </div>
      </section>
    </div>
  );
}
