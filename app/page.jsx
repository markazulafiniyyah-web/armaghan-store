import Link from 'next/link';
import ShopGrid from '@/components/ShopGrid';
import BulkOffer from '@/components/BulkOffer';
import HeroSlider from '@/components/HeroSlider';
import ContactForm from '@/components/ContactForm';
import JsonLd from '@/components/JsonLd';
import ProductCard from '@/components/ProductCard';
import { products, categorySlug } from '@/lib/products';
import { site } from '@/data/site';
import { asset, formatPKR, waLink } from '@/lib/format';
import { buildMetadata, KEYWORDS } from '@/lib/seo';
import { itemListSchema } from '@/lib/schema';
import { SITE_ORIGIN } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/',
  title: `Fabric Shop in ${site.city} — Boski, Wash & Wear & Pure Cotton`,
  description: `Buy kapra online from ${site.name} (${site.arabicName}) — Boski winter & summer Rs 3,000, wash & wear winter Rs 2,400, fine quality wash & wear Rs 3,300, 100% pure cotton Rs 3,300. All colours available. Cash on Delivery across Pakistan. WhatsApp ${site.phoneDisplay}.`,
  keywords: KEYWORDS.home,
});

const COLLECTION_TILES = [
  { category: 'Boski', image: '/products/boski-12-pound-1.jpg', note: 'Winter & summer · Rs 3,000' },
  { category: 'Wash & Wear', image: '/products/wash-n-wear-winter-1.jpg', note: 'Winter Rs 2,400 · Fine quality Rs 3,300' },
  { category: 'Pure Cotton', image: '/products/pure-cotton-1.jpg', note: 'All colours · Rs 3,300' },
];

const USP = [
  {
    icon: '🚚',
    title: 'Cash on Delivery',
    text: 'COD available all over Pakistan — pay when the parcel arrives.',
  },
  {
    icon: '✅',
    title: '100% Guaranteed Original',
    text: 'Original Boski, quality wash & wear and 100% pure cotton — no copies.',
  },
  {
    icon: '💬',
    title: '24/7 WhatsApp Support',
    text: `Message ${site.phoneDisplay} for shade cards, stock and orders.`,
  },
  {
    icon: '📦',
    title: 'Nationwide Delivery',
    text: `2–5 working days via courier. Free over ${formatPKR(site.freeDeliveryOver)}.`,
  },
];

export default function HomePage() {
  const hotSelling = products.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <JsonLd id="ld-home-products" data={itemListSchema(products, SITE_ORIGIN, 'Kapra & fabric')} />

      {/* ------------------------------- hero slider ------------------------------ */}
      <HeroSlider />

      {/* ---------------------------------- USP ---------------------------------- */}
      <section className="usp" aria-label="Why shop with us">
        <div className="container usp-grid">
          {USP.map((u) => (
            <div className="usp-item" key={u.title}>
              <span className="usp-icon" aria-hidden="true">
                {u.icon}
              </span>
              <div>
                <strong>{u.title}</strong>
                <p>{u.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------- collections ------------------------------ */}
      <section className="container section" id="collections">
        <div className="section-head">
          <div>
            <h2 className="section-title">Collections</h2>
            <p className="section-sub">Browse the shop the way you would ask for it across the counter.</p>
          </div>
          <Link className="btn btn-outline" href="/#shop">
            View all products
          </Link>
        </div>
        <div className="collection-grid">
          {COLLECTION_TILES.map((tile) => (
            <Link key={tile.category} href={`/collection/${categorySlug(tile.category)}/`} className="collection-tile">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className="collection-photo" src={asset(tile.image)} alt={tile.category} />
              <span className="collection-scrim" />
              <span className="collection-info">
                <strong>{tile.category}</strong>
                <span>{tile.note}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ------------------------------ hot selling ------------------------------- */}
      <section className="container section">
        <div className="section-head">
          <div>
            <h2 className="section-title">Hot Selling Items</h2>
            <p className="section-sub">The pieces people come back for — restocked every week.</p>
          </div>
        </div>
        <div className="grid featured-grid">
          {hotSelling.map((p) => (
            <ProductCard product={p} key={p.slug} />
          ))}
        </div>
      </section>

      {/* ------------------------------- bundle deals ----------------------------- */}
      <section className="container section" id="bulk">
        <BulkOffer />
      </section>

      {/* ---------------------------- flagship store ------------------------------ */}
      <section className="container section">
        <div className="image-with-text">
          <div
            className="image-with-text-photo"
            style={{ backgroundImage: `url(${asset('/hero/flagship-store.jpg')})` }}
            role="img"
            aria-label="Inside the Armaghan Store flagship shop"
          />
          <div className="image-with-text-body">
            <span className="eyebrow">Armaghan Store · Flagship Store</span>
            <h2>Visit us in Urdu Bazar, Lahore</h2>
            <p>
              See and feel the fabric before you buy — our counter at Hadia Haleema Center, Ghazni Street keeps Boski,
              wash &amp; wear and 100% pure cotton in every colour, winter and summer stock both. Wholesale and retail
              both welcome.
            </p>
            <p>
              <strong>
                {site.addressLine}, {site.city}
              </strong>
              <br />
              {site.hours}
            </p>
            <div className="btn-row">
              <a
                className="btn btn-wa"
                href={waLink(`Assalam o Alaikum ${site.name}! I want to visit your shop.`)}
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp {site.phoneDisplay}
              </a>
              <Link className="btn btn-outline" href="/about">
                About the shop
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --------------------------------- shop ---------------------------------- */}
      <div className="shop-band" id="shop">
        <div className="container">
          <ShopGrid products={products} />
        </div>
      </div>

      {/* -------------------------------- contact -------------------------------- */}
      <section className="container section" id="contact">
        <div className="section-head">
          <div>
            <h2 className="section-title">Contact us</h2>
            <p className="section-sub">
              Questions about shade, size or stock? Send a message — we reply personally on WhatsApp.
            </p>
          </div>
        </div>
        <div className="contact-grid">
          <ContactForm />
          <div className="info-card">
            <h3>{site.name} — {site.arabicName}</h3>
            <ul className="contact-info">
              <li>
                <span aria-hidden="true">📍</span>
                <span>
                  {site.addressLine}
                  <br />
                  {site.city}, {site.region}, {site.country}
                </span>
              </li>
              <li>
                <span aria-hidden="true">💬</span>
                <a href={waLink(`Assalam o Alaikum ${site.name}!`)} target="_blank" rel="noopener noreferrer">
                  WhatsApp / Phone: {site.phoneDisplay}
                </a>
              </li>
              <li>
                <span aria-hidden="true">🕐</span>
                <span>{site.hours}</span>
              </li>
              <li>
                <span aria-hidden="true">🚚</span>
                <span>{site.deliveryNote}</span>
              </li>
            </ul>
            <a
              className="btn btn-wa btn-block"
              style={{ marginTop: '1.25rem' }}
              href={waLink(`Assalam o Alaikum ${site.name}! I would like to ask about your fabric stock and prices.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
