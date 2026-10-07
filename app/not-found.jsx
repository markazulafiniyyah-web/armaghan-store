import Link from 'next/link';
import { site } from '@/data/site';
import { waLink } from '@/lib/format';

export const metadata = { title: 'Page not found', robots: { index: false, follow: true } };

export default function NotFound() {
  return (
    <section className="container section narrow empty-cart">
      <h1>This page has been folded away</h1>
      <p className="muted">
        The link you followed does not exist any more — the fabric may have sold out or moved. Browse the shop, or just
        message us on WhatsApp and we will find it for you.
      </p>
      <div className="btn-row">
        <Link className="btn btn-primary" href="/">
          Back to the shop
        </Link>
        <a
          className="btn btn-wa"
          href={waLink(`Assalam o Alaikum ${site.name}! I could not find a product on your website.`)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Ask on WhatsApp
        </a>
      </div>
    </section>
  );
}
