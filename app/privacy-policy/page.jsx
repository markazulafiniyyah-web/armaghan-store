import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';
import { waLink } from '@/lib/format';
import { buildMetadata, KEYWORDS, SITE_ORIGIN } from '@/lib/seo';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  path: '/privacy-policy/',
  title: 'Privacy Policy — What We Store and Where',
  description: `How ${site.name} handles your information: no accounts, no database and no advertising cookies. Your cart and stock counts stay in your own browser; we ask only for what a courier needs.`,
  keywords: KEYWORDS.privacy,
});

export default function PrivacyPolicyPage() {
  return (
    <div className="container prose-page policy">
      <JsonLd
        id="ld-privacy"
        data={breadcrumbSchema(
          [
            ['Shop', '/'],
            ['Privacy policy', '/privacy-policy/'],
          ],
          SITE_ORIGIN,
        )}
      />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>Privacy policy</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Policy</span>
        <h1>Privacy policy</h1>
        <p className="lede">
          This website is run by {site.name}, {site.addressLine}, {site.city}, {site.region}, {site.country}. We keep
          this policy short and honest: we collect as little as possible, we never sell your information, and there are
          no customer accounts or databases behind this site.
        </p>
      </header>

      <div className="policy-grid">
        <article className="policy-main">
          <section>
            <h2>1. What we collect</h2>
            <ul className="tick-list">
              <li>
                <strong>Order details you send us.</strong> When you check out, your name, phone number, city, delivery
                address, notes and item choices are written into a WhatsApp message addressed to{' '}
                {site.phoneDisplay}. Nothing is submitted to a server on this website.
              </li>
              <li>
                <strong>Messages you send us.</strong> If you contact us on WhatsApp or by phone, we keep that
                conversation so we can fulfil your order and handle any return.
              </li>
              <li>
                <strong>Nothing else.</strong> We do not ask for your CNIC, your email address, your card number or
                your date of birth. We do not run advertising trackers on this site.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. What stays on your own device</h2>
            <p>
              This site has no database and no login. Two things are stored in your browser’s local storage, on your
              own device only, so the shop works smoothly:
            </p>
            <div className="table-wrap">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Stored item</th>
                    <th>Why</th>
                    <th>Who can see it</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <code>armaghan.cart</code> — the colour, size and quantity of the pieces in your cart
                    </td>
                    <td>So your cart survives a page reload or a closed tab</td>
                    <td>Only your browser. It is never uploaded.</td>
                  </tr>
                  <tr>
                    <td>
                      <code>armaghan.stock</code> — a record that an order was placed from this device
                    </td>
                    <td>So sold pieces are counted correctly instead of double-selling</td>
                    <td>Only your browser. It is never uploaded.</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              You can clear both at any time by pressing “Clear cart” or by clearing your browser’s site data. Your
              order itself lives in WhatsApp, not on this website.
            </p>
          </section>

          <section>
            <h2>3. How we use your information</h2>
            <ul className="tick-list">
              <li>To confirm, pack, post and track your order, and to contact you about it.</li>
              <li>To arrange Cash on Delivery, or to verify a bank / JazzCash / Easypaisa payment.</li>
              <li>To handle exchanges and refunds under our <Link href="/refund-policy">refund policy</Link>.</li>
              <li>To answer your questions and, if you ask us to, to tell you when new stock arrives.</li>
            </ul>
          </section>

          <section>
            <h2>4. Who we share it with</h2>
            <ul className="tick-list">
              <li>
                <strong>Courier companies</strong> — your name, address and phone number, only so the parcel can be
                delivered.
              </li>
              <li>
                <strong>WhatsApp</strong> — our conversations sit inside WhatsApp, so their own privacy policy applies
                to those messages as well.
              </li>
              <li>
                <strong>Nobody else.</strong> We do not sell, rent or trade customer details, and we do not send
                marketing messages to people who have not asked for them.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Cookies and analytics</h2>
            <p>
              This website does not set advertising or tracking cookies. It uses your browser’s local storage (explained
              in section 2) and nothing more. If we ever add a simple visitor counter in future, this policy will be
              updated first and it will be anonymised.
            </p>
          </section>

          <section>
            <h2>6. How long we keep things</h2>
            <ul className="tick-list">
              <li>Order records: up to 12 months, so returns and warranty questions can be handled properly.</li>
              <li>WhatsApp chats: kept while they are useful; you can ask us to delete yours at any time.</li>
              <li>Anything stored in your own browser: until you clear it yourself.</li>
            </ul>
          </section>

          <section>
            <h2>7. Your choices</h2>
            <ul className="tick-list">
              <li>Ask us what information we hold about you, and we will tell you plainly.</li>
              <li>Ask us to correct it, or to delete it once any active order or refund is finished.</li>
              <li>Ask us to stop sending you stock updates — one message and it stops.</li>
            </ul>
          </section>

          <section>
            <h2>8. Security</h2>
            <p>
              We keep order details on protected devices and only those involved in running the shop can see them. No
              website can promise 100% security, but because this site never uploads your data to a server, there is no
              customer database here to breach.
            </p>
          </section>

          <section>
            <h2>9. Children</h2>
            <p>
              Our shop sells clothing for children, but we expect orders to be placed by adults. We do not knowingly
              collect any information from children.
            </p>
          </section>

          <section>
            <h2>10. Changes to this policy</h2>
            <p>
              If anything here changes, the new version is published on this page and takes effect from the day it
              appears. We will not quietly rewrite the rules that applied to an order you have already placed.
            </p>
          </section>

          <section>
            <h2>11. Contact us</h2>
            <p>
              For any privacy question or request, message <strong>{site.owner}</strong> on WhatsApp at{' '}
              <a href={waLink(`Assalam o Alaikum ${site.name}! I have a question about your privacy policy.`)} target="_blank" rel="noopener noreferrer">
                {site.phoneDisplay}
              </a>
              . Our returns rules are explained in the <Link href="/refund-policy">refund &amp; return policy</Link>.
            </p>
          </section>
        </article>

        <aside className="policy-side">
          <div className="info-card">
            <h3>The short version</h3>
            <ul className="tick-list">
              <li>No accounts, no database, no tracking cookies.</li>
              <li>Your cart and stock count stay in your own browser.</li>
              <li>We ask for only what a courier needs: name, address, phone.</li>
              <li>We never sell your details.</li>
              <li>Ask us any time to see or delete what we hold.</li>
            </ul>
          </div>
          <div className="info-card">
            <h3>Contact</h3>
            <dl className="detail-list">
              <div>
                <dt>Shop</dt>
                <dd>{site.name}</dd>
              </div>
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
                <dt>WhatsApp</dt>
                <dd>
                  <a href={waLink(`Assalam o Alaikum ${site.name}!`)} target="_blank" rel="noopener noreferrer">
                    {site.phoneDisplay}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
