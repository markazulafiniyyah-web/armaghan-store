import Link from 'next/link';
import { products } from '@/lib/products';
import { site } from '@/data/site';
import { asset, waLink } from '@/lib/format';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/#collections', label: 'Collections' },
  { href: '/#shop', label: 'Shop' },
  { href: '/about', label: 'About us' },
  { href: '/cart', label: 'Your cart' },
  { href: '/refund-policy', label: 'Refund & return policy' },
  { href: '/privacy-policy', label: 'Privacy policy' },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const topProducts = products.slice(0, 4);

  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="brand-logo" src={asset('/logo.svg')} alt={`${site.name} — ${site.arabicName}`} />
          </div>
          <p className="footer-note">
            {site.tagline} Unstitched suiting, Bosky, wash &amp; wear and ladies collection — wholesale and retail,
            posted anywhere in Pakistan.
          </p>
          <p className="footer-note">
            Owner: <strong>{site.owner}</strong>
          </p>
        </div>

        <div>
          <h4>Quick links</h4>
          <ul>
            {QUICK_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
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
            <li>
              {site.addressLine}, {site.city}
            </li>
            <li>{site.hours}</li>
          </ul>
          <h4 style={{ marginTop: '1.6rem' }}>Hot selling</h4>
          <ul>
            {topProducts.map((p) => (
              <li key={p.slug}>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-newsletter">
          <h4>Subscribe to our emails</h4>
          <p>New colours, winter stock and seasonal fabrics — straight to your inbox.</p>
          <form
            className="newsletter"
            action={`https://wa.me/${site.whatsappNumber}`}
            method="get"
            target="_blank"
            rel="noopener noreferrer"
          >
            <input type="hidden" name="text" value={`Assalam o Alaikum! Please add me to the ${site.name} mailing list.`} />
            <input type="email" name="email" placeholder="Email" aria-label="Email" required />
            <button type="submit" aria-label="Subscribe">
              →
            </button>
          </form>
          <p className="footer-note" style={{ marginTop: '1.15rem' }}>
            Prefer chatting?{' '}
            <a
              href={waLink(`Assalam o Alaikum ${site.name}!`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Message us on WhatsApp
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>
          © {year} {site.name} ({site.arabicName}). All rights reserved.
        </span>
        <span>
          Refunds are subject to a {site.refundCutPercent}% deduction —{' '}
          <Link href="/refund-policy">read the policy</Link>.
        </span>
      </div>
    </footer>
  );
}
