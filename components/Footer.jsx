import Link from 'next/link';
import { products } from '@/lib/products';
import { site } from '@/data/site';
import { waLink } from '@/lib/format';

export default function Footer() {
  const year = new Date().getFullYear();
  const shopLinks = products.slice(0, 5);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            <span className="brand-mark" aria-hidden="true">
              AS
            </span>
            <strong>{site.name}</strong>
          </div>
          <p className="footer-note">
            {site.tagline} A family-run kapra shop in {site.city}, {site.region} — unstitched fabric, ready-made
            stitched pieces and accessories, posted anywhere in Pakistan.
          </p>
          <p className="footer-note">
            Owner: <strong>{site.owner}</strong>
          </p>
        </div>

        <div>
          <h4>Shop</h4>
          <ul>
            {shopLinks.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
            <li>
              <Link href="/">All products</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Store</h4>
          <ul>
            <li>
              <Link href="/about">About us</Link>
            </li>
            <li>
              <Link href="/refund-policy">Refund &amp; return policy</Link>
            </li>
            <li>
              <Link href="/privacy-policy">Privacy policy</Link>
            </li>
            <li>
              <Link href="/cart">Your cart</Link>
            </li>
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul className="footer-contact">
            <li>
              <a href={waLink(`Assalam o Alaikum ${site.name}!`)} target="_blank" rel="noopener noreferrer">
                WhatsApp: {site.phoneDisplay}
              </a>
            </li>
            <li>{site.owner}</li>
            <li>
              {site.addressLine}, {site.city}, {site.region}, {site.country}
            </li>
            <li>{site.hours}</li>
          </ul>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} {site.name}. All rights reserved.
        </span>
        <span>
          Refunds are subject to a {site.refundCutPercent}% deduction —{' '}
          <Link href="/refund-policy">read the policy</Link>.
        </span>
      </div>
    </footer>
  );
}
