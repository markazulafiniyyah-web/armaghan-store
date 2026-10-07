'use client';

import { site } from '@/data/site';
import { waLink } from '@/lib/format';
import { bulkTiers, nextBulkTier } from '@/lib/offers';
import { useCart } from '@/lib/cart';

/**
 * The bulk offer. Two shapes:
 *   <BulkOffer />            full band for the home page (live "you are on 5%" nudge)
 *   <BulkOffer compact />    one-line strip for product pages
 */
export default function BulkOffer({ compact = false }) {
  const { count } = useCart();
  const next = nextBulkTier(count);
  const reached = [...bulkTiers].reverse().find((t) => count >= t.qty) || null;

  const waMessage = `Assalam o Alaikum ${site.name}! I want to order in bulk / at wholesale rates. Please tell me your best rate.`;

  if (compact) {
    return (
      <div className="offer-inline">
        <span className="offer-inline-label">Bulk offer:</span>
        {bulkTiers.map((t) => (
          <span key={t.qty} className={`offer-pill ${reached && reached.qty === t.qty ? 'active' : ''}`}>
            {t.percent}% off on {t.qty} pieces
          </span>
        ))}
        <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="offer-link">
          Wholesale rates →
        </a>
      </div>
    );
  }

  return (
    <div className="offer-band">
      <div className="offer-copy">
        <span className="eyebrow">Bulk offer</span>
        <h2>Buy more pieces, pay less on each</h2>
        <p>
          The discount is worked out automatically in your cart — no code needed. {site.bulkFinePrint}
        </p>
        <p className="offer-wholesale">
          <strong>Buying for a shop?</strong> {site.wholesaleNote}
        </p>
        <div className="btn-row">
          <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn btn-wa">
            Ask for wholesale rates
          </a>
          <a href="#shop" className="btn btn-outline">
            Start shopping
          </a>
        </div>
      </div>

      <div className="offer-tiers-wrap">
        <div className="offer-tiers">
          {bulkTiers.map((t) => (
            <div key={t.qty} className={`offer-tier ${reached && reached.qty === t.qty ? 'active' : ''}`}>
              <strong>{t.percent}%</strong>
              <span>off on {t.qty} pieces</span>
            </div>
          ))}
        </div>
        {count > 0 ? (
          <p className={`offer-nudge ${next ? '' : 'ok'}`}>
            {next ? (
              <>
                You have <strong>{count}</strong> piece{count === 1 ? '' : 's'} in the cart — add{' '}
                <strong>{next.needed}</strong> more for <strong>{next.percent}% off</strong>.
              </>
            ) : (
              <>Your cart has {count} pieces — the best tier, {reached?.percent}% off, is applied.</>
            )}
          </p>
        ) : (
          <p className="offer-nudge muted">Add 2, 4 or 6 pieces to your cart to see the discount applied.</p>
        )}
      </div>
    </div>
  );
}
