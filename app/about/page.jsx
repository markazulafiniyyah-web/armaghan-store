import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';
import { formatPKR, waLink } from '@/lib/format';
import { buildMetadata, KEYWORDS, SITE_ORIGIN } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  path: '/about/',
  title: `About ${site.name} — Kapra Shop in ${site.city}`,
  description: `${site.name} is a family-run kapra and fabric shop in ${site.city}, ${site.region}, run by ${site.owner}. Unstitched fabric, stitched suits, kidswear and accessories, posted anywhere in Pakistan.`,
  keywords: KEYWORDS.about,
});

const VALUES = [
  {
    title: 'Fabric first',
    text: 'We buy in small lots and sell what we can stand behind. If a weave will not survive a wash or a season, it does not go on the shelf.',
  },
  {
    title: 'Numbers on the label',
    text: 'Colour, size, fabric and price are written plainly — the same for a walk-in customer and for someone ordering from another city.',
  },
  {
    title: 'Said, then done',
    text: 'Stock is counted honestly. If a piece is finished, the site says so instead of taking an order we cannot fill.',
  },
  {
    title: 'Fair on returns',
    text: `If something is not right, we settle it. Our policy is short and readable, including the ${site.refundCutPercent}% deduction on refunds.`,
  },
];

const MILESTONES = [
  ['Early days', `A single counter in ${site.city} with three bolts of fabric and a lot of tea.`],
  ['Growing', 'Regular customers from nearby towns started asking us to send fabric by bus and courier.'],
  ['Stitching', 'We added ready-to-wear kurta, suits and kidswear stitched in our own unit.'],
  ['Today', 'The website carries our live stock, and WhatsApp keeps us one message away from every customer.'],
];

export default function AboutPage() {
  return (
    <div className="container prose-page">
      <JsonLd
        id="ld-about"
        data={breadcrumbSchema(
          [
            ['Shop', '/'],
            ['About us', '/about/'],
          ],
          SITE_ORIGIN,
        )}
      />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>About</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">About {site.name}</span>
        <h1>A small kapra shop that answers its phone</h1>
        <p className="lede">
          {site.name} is run by <strong>{site.owner}</strong> from {site.city}, {site.region}. We deal in unstitched
          fabric, ready-stitched suits and everyday accessories — and we sell the same way online as we do standing at
          the counter: show the cloth, count what is left, quote the real price.
        </p>
      </header>

      <section className="about-grid">
        <div className="about-main">
          <h2>Our story</h2>
          <p>
            The shop began the way most family businesses in {site.city} do — with one counter, one sewing machine and
            customers who came back because the fabric did not disappoint them. Word travelled in the bazaar first,
            then by phone, and then by courier to Multan, Lahore, Karachi and beyond.
          </p>
          <p>
            What changed the most was how people buy. So many of our regulars now ask for a photo, a colour name, and
            “how much is left in that design?” before deciding. That is exactly why this website exists: every product
            here lists its colours, sizes and the pieces actually available, so you can make the decision from your own
            home and then send the order to us on WhatsApp.
          </p>
          <p>
            We are not a large chain, and we do not pretend to be. What we do promise is a straight answer about
            quality, stock and price — and a real person on the other end of the message.
          </p>

          <h2>How we work</h2>
          <div className="value-grid">
            {VALUES.map((v) => (
              <div className="value-card" key={v.title}>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>

          <h2>How the shop grew</h2>
          <ol className="timeline">
            {MILESTONES.map(([title, text]) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>

          <h2>How ordering works</h2>
          <ol className="steps-list numbered">
            <li>Pick your product and choose the exact colour and size — the site shows what is on the shelf.</li>
            <li>
              Add it to your cart, or press <em>Order on WhatsApp</em> to open a chat with the whole order already
              written out.
            </li>
            <li>We confirm stock, delivery time and the total, and you choose Cash on Delivery or a bank transfer.</li>
            <li>We pack, post and send you the tracking details the same day.</li>
          </ol>
        </div>

        <aside className="about-side">
          <div className="info-card">
            <h3>Shop details</h3>
            <dl className="detail-list">
              <div>
                <dt>Owner</dt>
                <dd>{site.owner}</dd>
              </div>
              <div>
                <dt>Address</dt>
                <dd>
                  {site.addressLine}, {site.city}, {site.region}, {site.country}
                </dd>
              </div>
              <div>
                <dt>WhatsApp / phone</dt>
                <dd>
                  <a href={waLink(`Assalam o Alaikum ${site.name}!`)} target="_blank" rel="noopener noreferrer">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
              <div>
                <dt>Hours</dt>
                <dd>{site.hours}</dd>
              </div>
              <div>
                <dt>Delivery</dt>
                <dd>
                  {formatPKR(site.deliveryFee)} — free over {formatPKR(site.freeDeliveryOver)}
                </dd>
              </div>
            </dl>
            <a
              className="btn btn-wa btn-block"
              href={waLink(`Assalam o Alaikum ${site.name}! I read your About page and would like to ask something.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Say salam on WhatsApp
            </a>
          </div>

          <div className="info-card">
            <h3>Good to know</h3>
            <ul className="tick-list">
              <li>Wholesale and bulk orders: ask us for rates on WhatsApp.</li>
              <li>Stitching can be arranged for unstitched suits.</li>
              <li>
                {site.refundWindowDays}-day returns on unused goods — refunds carry a {site.refundCutPercent}%
                deduction.
              </li>
              <li>
                <Link href="/privacy-policy">Privacy policy</Link> and{' '}
                <Link href="/refund-policy">refund policy</Link> are both two-minute reads.
              </li>
            </ul>
          </div>
        </aside>
      </section>
    </div>
  );
}
