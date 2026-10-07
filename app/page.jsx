import Link from 'next/link';
import ShopGrid from '@/components/ShopGrid';
import BulkOffer from '@/components/BulkOffer';
import JsonLd from '@/components/JsonLd';
import { products } from '@/lib/products';
import { site } from '@/data/site';
import { discountPercent, formatPKR, waLink } from '@/lib/format';
import { buildMetadata, KEYWORDS, SITE_ORIGIN } from '@/lib/seo';
import { itemListSchema } from '@/lib/schema';
import { categories, categorySlug, productsInCategory } from '@/lib/products';

const bulkTiers = [...(site.bulkTiers || [])].sort((a, b) => a.qty - b.qty);

export const metadata = buildMetadata({
  path: '/',
  title: `Kapra & Fabric Shop in ${site.city} — Order on WhatsApp`,
  description: `Buy kapra online from ${site.name}: unstitched suits, china boski, khaddar, lawn, stitched kurtas and kidswear. Live colour and size stock, 5–15% off on bulk orders, Cash on Delivery across Pakistan. WhatsApp ${site.phoneDisplay}.`,
  keywords: KEYWORDS.home,
});

const TRUST = [
  {
    icon: '🧵',
    title: 'Real shelf stock',
    text: 'Every colour and size is counted separately, so sold-out pieces cannot be ordered by mistake.',
  },
  {
    icon: '💬',
    title: 'Order on WhatsApp',
    text: 'Your cart writes the whole order into a WhatsApp message — we confirm it personally before packing.',
  },
  {
    icon: '🚚',
    title: 'Posted anywhere in Pakistan',
    text: `Courier delivery in 2–5 days. Free over ${formatPKR(site.freeDeliveryOver)}, Cash on Delivery available.`,
  },
  {
    icon: '↩️',
    title: `${site.refundWindowDays}-day returns`,
    text: `Unused goods can be returned — refunds are paid after a ${site.refundCutPercent}% deduction. Full policy in one click.`,
  },
];

export default function HomePage() {
  const featured = products.filter((p) => p.featured).slice(0, 3);
  const bestDeal = [...products]
    .map((p) => ({ p, off: discountPercent(p.price, p.compareAtPrice) }))
    .sort((a, b) => b.off - a.off)[0];

  return (
    <>
      <JsonLd id="ld-home-products" data={itemListSchema(products, SITE_ORIGIN, 'Kapra & fabric')} />

      {/* ------------------------------- hero ------------------------------- */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Kapra · Fabric · Stitching — {site.city}</span>
            <h1>
              Fabric that feels right,
              <br />
              prices that stay honest.
            </h1>
            <p className="lede">
              {site.name} is a family-run fabric shop run by {site.owner}. Choose your colour and size, and we hold
              the exact pieces you picked — then send your order straight to our WhatsApp.
            </p>
            <div className="btn-row">
              <Link className="btn btn-primary btn-lg" href="#shop">
                Browse the shop
              </Link>
              <a
                className="btn btn-wa btn-lg"
                href={waLink(
                  `Assalam o Alaikum ${site.name}! I would like to ask about your fabric stock and prices.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {site.phoneDisplay}
              </a>
            </div>
            <ul className="hero-points">
              <li>
                Up to {bulkTiers[bulkTiers.length - 1].percent}% off on bulk orders
              </li>
              <li>Live colour-wise stock</li>
              <li>Cash on Delivery</li>
              <li>Wholesale rates on request</li>
            </ul>
          </div>

          <div className="hero-art" aria-hidden="true">
            <div className="swatch-stack">
              <span className="swatch-slab slab-1">
                <em>Khaddar</em>
              </span>
              <span className="swatch-slab slab-2">
                <em>Lawn</em>
              </span>
              <span className="swatch-slab slab-3">
                <em>Shirting</em>
              </span>
              <span className="swatch-slab slab-4">
                <em>Cambric</em>
              </span>
            </div>
            <div className="hero-tag">
              {bestDeal && bestDeal.off > 0 ? (
                <>
                  <strong>{bestDeal.off}% off</strong>
                  <span>{bestDeal.p.name}</span>
                </>
              ) : (
                <>
                  <strong>Fresh lot</strong>
                  <span>New fabrics in the shop</span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------ trust ------------------------------ */}
      <section className="container trust">
        {TRUST.map((t) => (
          <div className="trust-item" key={t.title}>
            <span className="trust-icon" aria-hidden="true">
              {t.icon}
            </span>
            <div>
              <strong>{t.title}</strong>
              <p>{t.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* --------------------------- bulk offer ---------------------------- */}
      <section className="container section" id="bulk">
        <BulkOffer />
      </section>

      {/* ---------------------------- featured ----------------------------- */}
      {featured.length ? (
        <section className="container section">
          <div className="section-head">
            <div>
              <h2 className="section-title">Featured this week</h2>
              <p className="section-sub">Hand-picked from the front shelf — the pieces people ask for most.</p>
            </div>
          </div>
          <div className="grid featured-grid">
            {featured.map((p) => (
              <Link className="feature-tile" href={`/products/${p.slug}`} key={p.slug}>
                <span className="feature-tag">{p.badge || 'Featured'}</span>
                <strong>{p.name}</strong>
                <span className="muted small">{p.fabric}</span>
                <span className="feature-price">{formatPKR(p.price)}</span>
                <span className="feature-cta">Choose colour &amp; size →</span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}

      {/* --------------------------- collections --------------------------- */}
      <section className="container section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Shop by collection</h2>
            <p className="section-sub">Fabric and ready-made pieces, grouped the way you would ask for them in the shop.</p>
          </div>
        </div>
        <div className="collection-grid">
          {categories.map((c) => (
            <Link key={c} href={`/collection/${categorySlug(c)}/`} className="collection-tile">
              <strong>{c}</strong>
              <span className="muted small">{productsInCategory(c).length} items →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ shop ------------------------------- */}
      <div className="shop-band">
        <div className="container">
          <ShopGrid products={products} />
        </div>
      </div>

      {/* --------------------------- whatsapp cta -------------------------- */}
      <section className="container section">
        <div className="wa-banner">
          <div>
            <h2>Not sure about the shade or the size?</h2>
            <p>
              Send us a message on {site.phoneDisplay}. We will photograph the fabric in daylight, tell you exactly how
              much is left, and help you decide before you pay a rupee.
            </p>
          </div>
          <a
            className="btn btn-wa btn-lg"
            href={waLink(
              `Assalam o Alaikum ${site.name}! Please help me choose a fabric. I am looking for: `,
            )}
            target="_blank"
            rel="noopener noreferrer"
          >
            Message us on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}
