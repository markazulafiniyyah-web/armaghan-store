import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import { site } from '@/data/site';
import { formatPKR, refundCut, refundPayable, waLink } from '@/lib/format';
import { buildMetadata, KEYWORDS, SITE_ORIGIN } from '@/lib/seo';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';

export const metadata = buildMetadata({
  path: '/refund-policy/',
  title: 'Refund & Return Policy — 20% Cut Explained',
  description: `${site.name} returns policy: ${site.refundWindowDays}-day return window, full refund when the mistake is ours, and refunds after a ${site.refundCutPercent}% cut when you change your mind. Worked examples, exchange and shop credit options.`,
  keywords: KEYWORDS.refund,
});

const EXAMPLES = [1000, 3450, 6750];

// These questions are shown on the page and marked up as FAQPage, so they can
// appear as rich results in Google.
export const FAQS = [
  {
    q: `Can I get a refund if I change my mind after ordering?`,
    a: `Yes. Tell us within ${site.refundWindowDays} days of delivery and send the unused piece back in its original packing. When you change your mind, refunds are paid after a ${site.refundCutPercent}% cut, or you can take an exchange or shop credit with no cut at all.`,
  },
  {
    q: 'How much is kept on a refund?',
    a: `A flat ${site.refundCutPercent}% of the item price is kept when you return after changing your mind. On a Rs 1,000 item that is Rs 200, so you receive Rs 800. The cut covers courier charges both ways, packing and handling. It is not applied when the mistake is ours.`,
  },
  {
    q: 'When is the refund paid in full, without any cut?',
    a: 'When we sent the wrong colour, size or product, when the item arrived damaged or faulty, or when we had to cancel the order ourselves — then you get a full refund or a free replacement, no cut.',
  },
  {
    q: 'What can I return and what cannot be returned?',
    a: 'Unused, unwashed and uncut items in their original packing can be returned. Fabric that has been cut, stitched or washed, and custom stitching to your measurements, cannot be returned or refunded.',
  },
  {
    q: 'How long do I have to report a problem?',
    a: `Ask for a return within ${site.refundWindowDays} days of delivery. Damaged, faulty or wrong items should be reported within ${site.damagedReportHours} hours with photographs of the item and the parcel, so we can raise it with the courier in time.`,
  },
  {
    q: 'How do I start a return or refund?',
    a: `Message us on WhatsApp at ${site.phoneDisplay} with your order reference, a photo and a one-line reason. We reply with a return address and an approval note. Once the parcel reaches us we check it and pay approved refunds within ${site.refundProcessing}.`,
  },
  {
    q: 'Can I cancel my order?',
    a: 'Yes, free of charge any time before the parcel is posted. After posting, a cancellation is treated as a return when you change your mind, so the 20% cut applies.',
  },
];

export default function RefundPolicyPage() {
  return (
    <div className="container prose-page policy">
      <JsonLd
        id="ld-refund"
        data={[
          faqSchema(FAQS, SITE_ORIGIN),
          breadcrumbSchema(
            [
              ['Shop', '/'],
              ['Refund & return policy', '/refund-policy/'],
            ],
            SITE_ORIGIN,
          ),
        ]}
      />

      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>Refund &amp; return policy</span>
      </nav>

      <header className="page-head">
        <span className="eyebrow">Policy</span>
        <h1>Refund &amp; return policy</h1>
        <p className="lede">
          We want you to be happy with your fabric. If something is wrong, tell us quickly and we will settle it —
          either by exchange, as shop credit to use later, or as a refund. Refunds are paid after a{' '}
          <strong>{site.refundCutPercent}% cut</strong>, which covers the courier, packing and handling costs of
          sending the goods out and bringing them back.
        </p>
        <p className="muted small">Applies to all orders placed with {site.name} through this website, WhatsApp or the shop counter.</p>
      </header>

      <div className="policy-grid">
        <article className="policy-main">
          <section>
            <h2>1. Return window</h2>
            <ul className="tick-list">
              <li>
                You have <strong>{site.refundWindowDays} days</strong> from the day the parcel is delivered to ask for
                a return. Requests after {site.refundWindowDays} days cannot be accepted.
              </li>
              <li>
                Faulty, wrong or damaged items must be reported within{' '}
                <strong>{site.damagedReportHours} hours</strong> of delivery, with photographs of the item and the
                parcel.
              </li>
              <li>Items must be unused, unwashed, uncut and in their original packing with tags and labels intact.</li>
            </ul>
          </section>

          <section>
            <h2>2. What can be returned</h2>
            <div className="table-wrap">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Situation</th>
                    <th>What we do</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Wrong colour, size or product sent by us</td>
                    <td>Full refund (no cut) or free replacement — your choice</td>
                  </tr>
                  <tr>
                    <td>Item arrived damaged or faulty</td>
                    <td>Full refund (no cut) or free replacement — your choice</td>
                  </tr>
                  <tr>
                    <td>You changed your mind / no longer want it</td>
                    <td>
                      Refund after a <strong>{site.refundCutPercent}% cut</strong>, or exchange or shop credit
                      with <strong>no cut</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Wrong colour or size ordered by mistake</td>
                    <td>
                      Exchange, or refund after a <strong>{site.refundCutPercent}% cut</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Item was cut, stitched, washed or altered</td>
                    <td>Cannot be returned or exchanged</td>
                  </tr>
                  <tr>
                    <td>Custom stitching to your measurements</td>
                    <td>Cannot be returned or exchanged</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2>3. How the {site.refundCutPercent}% cut works</h2>
            <p>
              When you ask for a refund after changing your mind, {site.refundCutPercent}% of the amount you paid for
              that item is kept. The remaining {100 - site.refundCutPercent}% is paid back to you. The cut
              covers courier charges both ways, packing material, and the staff time spent handling and re-checking
              the goods. It does <strong>not</strong> apply when the mistake was ours.
            </p>
            <div className="table-wrap">
              <table className="policy-table">
                <thead>
                  <tr>
                    <th>Item price</th>
                    <th>Cut ({site.refundCutPercent}%)</th>
                    <th>You receive</th>
                  </tr>
                </thead>
                <tbody>
                  {EXAMPLES.map((amount) => (
                    <tr key={amount}>
                      <td>{formatPKR(amount)}</td>
                      <td>− {formatPKR(refundCut(amount))}</td>
                      <td>
                        <strong>{formatPKR(refundPayable(amount))}</strong>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="muted small">
              Delivery charges paid on the original order are not refunded, except where the error was on our side.
            </p>
          </section>

          <section>
            <h2>4. Alternatives to a refund</h2>
            <ul className="tick-list">
              <li>
                <strong>Exchange</strong> — swap for another colour, size or fabric of equal or higher value (you pay
                any difference). No cut.
              </li>
              <li>
                <strong>Shop credit</strong> — we keep the full money with us, and you can spend it any time for{' '}
                <strong>6 months</strong>, usable in the shop or online. No cut.
              </li>
              <li>
                <strong>Partial refund</strong> — if you keep the item but want a price adjustment for a small defect,
                we will agree a fair amount with you on WhatsApp.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. How to start a return or refund</h2>
            <ol className="steps-list numbered">
              <li>
                Message us on WhatsApp at <strong>{site.phoneDisplay}</strong> within the return window, with your
                order reference, a photo, and a one-line reason.
              </li>
              <li>We reply with a return address and an approval note — please do not post anything back before we confirm.</li>
              <li>
                Send the parcel back by courier, packed safely, ideally in the same packing. Return courier cost is
                paid by the customer unless the error was ours.
              </li>
              <li>
                Once it reaches us we check the item within <strong>{site.damagedReportHours} hours</strong> and tell
                you the outcome.
              </li>
              <li>
                Approved refunds are paid within <strong>{site.refundProcessing}</strong> by bank transfer, JazzCash /
                Easypaisa, or as shop credit to use later if you prefer.
              </li>
            </ol>
          </section>

          <section>
            <h2>6. Cancellations</h2>
            <ul className="tick-list">
              <li>You can cancel free of charge any time before your parcel is posted.</li>
              <li>
                Once posted, cancelling counts as a return when you change your mind, so the {site.refundCutPercent}% cut
                applies — or refuse the parcel and contact us so we can process it.
              </li>
              <li>
                If we ever have to cancel your order (stock finished, fabric flawed), you are refunded{' '}
                <strong>in full, with no cut</strong>, and we will suggest a similar item if you like.
              </li>
            </ul>
          </section>

          <section>
            <h2>7. Quick summary</h2>
            <ul className="tick-list">
              <li>{site.refundWindowDays} days to raise a return.</li>
              <li>Unused and uncut only, in original packing.</li>
              <li>
                Our mistake → full refund, no cut. Your change of mind → refund with a{' '}
                {site.refundCutPercent}% cut, or exchange or shop credit with no cut.
              </li>
              <li>Refund paid within {site.refundProcessing} of approval.</li>
            </ul>
          </section>

          <section id="faq">
            <h2>8. Frequently asked questions</h2>
            <div className="faq-list">
              {FAQS.map(({ q, a }) => (
                <details key={q} className="faq-item">
                  <summary>{q}</summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2>9. Questions</h2>
            <p>
              Message <strong>{site.owner}</strong> directly on WhatsApp at{' '}
              <a href={waLink(`Assalam o Alaikum ${site.name}! I have a question about your refund policy.`)} target="_blank" rel="noopener noreferrer">
                {site.phoneDisplay}
              </a>{' '}
              — refund questions are answered the same day. You can also read our{' '}
              <Link href="/privacy-policy">privacy policy</Link> to see how we handle your details.
            </p>
          </section>
        </article>

        <aside className="policy-side">
          <div className="info-card">
            <h3>At a glance</h3>
            <dl className="detail-list">
              <div>
                <dt>Return window</dt>
                <dd>{site.refundWindowDays} days from delivery</dd>
              </div>
              <div>
                <dt>Report damage within</dt>
                <dd>{site.damagedReportHours} hours</dd>
              </div>
              <div>
                <dt>Refund cut</dt>
                <dd>{site.refundCutPercent}% (not our fault cases)</dd>
              </div>
              <div>
                <dt>Exchange / shop credit</dt>
                <dd>No cut</dd>
              </div>
              <div>
                <dt>Refund paid in</dt>
                <dd>{site.refundProcessing}</dd>
              </div>
              <div>
                <dt>Shop credit valid for</dt>
                <dd>6 months</dd>
              </div>
            </dl>
            <a
              className="btn btn-wa btn-block"
              href={waLink(`Assalam o Alaikum ${site.name}! I would like to start a return/refund request.`)}
              target="_blank"
              rel="noopener noreferrer"
            >
              Start a return on WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
