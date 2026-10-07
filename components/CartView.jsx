'use client';

import Link from 'next/link';
import { useState } from 'react';
import { site } from '@/data/site';
import { formatPKR, newOrderCode, waLink } from '@/lib/format';
import { clearCart, removeFromCart, updateQty, useCart } from '@/lib/cart';
import { reserveOrder } from '@/lib/stock';
import { bulkDiscountFor, nextBulkTier } from '@/lib/offers';

const PAYMENTS = ['Cash on Delivery', 'Bank transfer / online payment'];

export default function CartView() {
  const { items, ready, subtotal, count } = useCart();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    address: '',
    payment: PAYMENTS[0],
    notes: '',
  });
  const [error, setError] = useState('');
  const [placed, setPlaced] = useState(null);

  // Bulk offer: the tier is decided by the number of pieces in the cart.
  const bulk = bulkDiscountFor(count, subtotal);
  const nextTier = nextBulkTier(count);
  const payable = bulk.afterDiscount;
  const deliveryFee = payable === 0 || payable >= site.freeDeliveryOver ? 0 : site.deliveryFee;
  const total = payable + deliveryFee;

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  /** How many pieces of this line are still available for other shoppers. */

  function buildMessage(code) {
    const lines = [
      `Assalam o Alaikum ${site.name}!`,
      '',
      `I want to place an order. Order ref: ${code}`,
      '',
      '*Items*',
      ...items.map(
        (i, idx) =>
          `${idx + 1}. ${i.name}\n   Colour: ${i.color} · Size: ${i.size}\n   Qty: ${i.qty} × ${formatPKR(i.price)} = ${formatPKR(i.price * i.qty)}`,
      ),
      '',
      `Subtotal (${count} piece${count === 1 ? '' : 's'}): ${formatPKR(subtotal)}`,
      bulk.percent > 0
        ? `Bulk discount (${bulk.percent}% on ${count} pieces): − ${formatPKR(bulk.amount)}`
        : 'Bulk discount: not applied (offer starts at 2 pieces)',
      `Delivery: ${deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}`,
      `*Total payable: ${formatPKR(total)}*`,
      '',
      nextTier
        ? `Note: I saw the offer — add ${nextTier.needed} more piece${nextTier.needed === 1 ? '' : 's'} for ${nextTier.percent}% off. Please tell me if that works out better.`
        : `${site.wholesaleNote}`,
      '',
      '*Delivery details*',
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `City: ${form.city}`,
      `Address: ${form.address}`,
      `Payment: ${form.payment}`,
      form.notes ? `Notes: ${form.notes}` : '',
      '',
      `I have read the returns policy (refunds carry a ${site.refundCutPercent}% deduction).`,
    ];
    return lines.filter(Boolean).join('\n');
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (items.length === 0) return;
    if (!form.name.trim() || !form.phone.trim() || !form.address.trim() || !form.city.trim()) {
      setError('Please fill in your name, phone number, city and delivery address.');
      return;
    }
    setError('');

    const code = newOrderCode();
    reserveOrder(
      items.map((i) => ({ sku: i.sku, qty: i.qty })),
      code,
    );

    const message = buildMessage(code);
    window.open(waLink(message), '_blank', 'noopener,noreferrer');

    setPlaced({
      code,
      total,
      pieces: count,
      discountPercent: bulk.percent,
      discountAmount: bulk.amount,
      message,
      copyText: `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`,
    });
    clearCart();
  }

  if (placed) {
    return (
      <section className="section narrow">
        <div className="callout callout-ok big">
          <h2>Order {placed.code} is ready for WhatsApp</h2>
          <p>
            A WhatsApp chat should have opened with your order written out. If it did not open, tap the button below
            and send the message — we will confirm your stock and delivery time personally.
          </p>
          <p className="muted small">
            Total payable: <strong>{formatPKR(placed.total)}</strong>
            {placed.discountPercent > 0 ? (
              <>
                {' '}
                — your {placed.discountPercent}% bulk discount on {placed.pieces} pieces (
                {formatPKR(placed.discountAmount)}) is already taken off.
              </>
            ) : null}{' '}
            Stock for these pieces has been held on this device so nobody double-orders it from you.
          </p>
          <div className="btn-row">
            <a className="btn btn-wa" href={placed.copyText} target="_blank" rel="noopener noreferrer">
              Open WhatsApp again
            </a>
            <Link className="btn btn-outline" href="/">
              Keep shopping
            </Link>
          </div>
        </div>
      </section>
    );
  }

  if (!ready) {
    return (
      <section className="section narrow">
        <p className="muted">Checking your cart…</p>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section narrow empty-cart">
        <h1>Your cart is empty</h1>
        <p className="muted">
          Add a few pieces and they will stay here — even if you close the page. Or message us on WhatsApp and we will
          put an order together for you.
        </p>
        <div className="btn-row">
          <Link className="btn btn-primary" href="/">
            Browse the shop
          </Link>
          <a
            className="btn btn-wa"
            href={waLink(`Assalam o Alaikum ${site.name}! I would like some help choosing fabric.`)}
            target="_blank"
            rel="noopener noreferrer"
          >
            Ask on WhatsApp
          </a>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="section-head">
        <h1 className="section-title">Your cart</h1>
        <button type="button" className="link-btn" onClick={() => clearCart()}>
          Clear cart
        </button>
      </div>

      <div className="cart-grid">
        <div className="cart-lines">
          {items.map((item) => (
            <div className="cart-line" key={item.sku}>
              <span
                className="cart-swatch"
                style={{ '--sw': item.swatch || '#d8c7a8' }}
                aria-hidden="true"
              />
              <div className="cart-line-body">
                <Link href={`/products/${item.slug}`} className="cart-line-title">
                  {item.name}
                </Link>
                <p className="muted small">
                  Colour: {item.color} · Size: {item.size}
                </p>
                <p className="muted small">{formatPKR(item.price)} each</p>
              </div>
              <div className="cart-line-actions">
                <div className="qty qty-sm">
                  <button type="button" onClick={() => updateQty(item.sku, item.qty - 1)} aria-label="Decrease quantity">
                    −
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    aria-label={`Quantity for ${item.name}`}
                    onChange={(e) => updateQty(item.sku, Number(e.target.value) || 1)}
                  />
                  <button type="button" onClick={() => updateQty(item.sku, item.qty + 1)} aria-label="Increase quantity">
                    +
                  </button>
                </div>
                <strong className="cart-line-total">{formatPKR(item.price * item.qty)}</strong>
                <button type="button" className="link-btn danger" onClick={() => removeFromCart(item.sku)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="cart-side">
          <div className="summary-card">
            <h2>Order summary</h2>
            <dl className="summary">
              <div>
                <dt>
                  Subtotal ({count} piece{count === 1 ? '' : 's'})
                </dt>
                <dd>{formatPKR(subtotal)}</dd>
              </div>
              {bulk.percent > 0 ? (
                <div className="summary-discount">
                  <dt>
                    Bulk discount ({bulk.percent}% on {count} pieces)
                  </dt>
                  <dd>− {formatPKR(bulk.amount)}</dd>
                </div>
              ) : null}
              <div>
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? 'Free' : formatPKR(deliveryFee)}</dd>
              </div>
              <div className="summary-total">
                <dt>Total payable</dt>
                <dd>{formatPKR(total)}</dd>
              </div>
            </dl>

            {nextTier ? (
              <p className="offer-nudge">
                Add <strong>{nextTier.needed}</strong> more piece{nextTier.needed === 1 ? '' : 's'} and your{' '}
                <strong>{nextTier.percent}%</strong> discount applies to the whole order.
              </p>
            ) : (
              <p className="offer-nudge ok">
                Best tier reached — {bulk.percent}% off. {site.wholesaleNote}
              </p>
            )}

            {payable < site.freeDeliveryOver ? (
              <p className="muted small">
                Add {formatPKR(site.freeDeliveryOver - payable)} more for free delivery.
              </p>
            ) : (
              <p className="muted small">Free delivery applied.</p>
            )}

            <form className="checkout" onSubmit={handleSubmit}>
              <h3>Delivery details</h3>
              <label>
                <span>Full name *</span>
                <input value={form.name} onChange={set('name')} required placeholder="e.g. Ahmed Raza" />
              </label>
              <label>
                <span>Phone / WhatsApp number *</span>
                <input value={form.phone} onChange={set('phone')} required placeholder="03xx xxxxxxx" inputMode="tel" />
              </label>
              <div className="two-col">
                <label>
                  <span>City *</span>
                  <input value={form.city} onChange={set('city')} required placeholder="e.g. Multan" />
                </label>
                <label>
                  <span>Payment</span>
                  <select value={form.payment} onChange={set('payment')}>
                    {PAYMENTS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <label>
                <span>Full address *</span>
                <textarea
                  value={form.address}
                  onChange={set('address')}
                  required
                  rows={3}
                  placeholder="House / street, area, nearest landmark, postal code"
                />
              </label>
              <label>
                <span>Notes (optional)</span>
                <textarea
                  value={form.notes}
                  onChange={set('notes')}
                  rows={2}
                  placeholder="Stitching instructions, preferred delivery time, etc."
                />
              </label>

              {error ? <p className="callout callout-warn">{error}</p> : null}

              <button type="submit" className="btn btn-wa btn-block">
                Send order on WhatsApp
              </button>
              <p className="muted tiny">
                Nothing is charged here. Your order is written into a WhatsApp message to {site.phoneDisplay} and we
                confirm it with you before packing. Bulk discounts (up to {site.bulkTiers[site.bulkTiers.length - 1].percent}%)
                are applied automatically above. Refunds are subject to a {site.refundCutPercent}% deduction as per the{' '}
                <Link href="/refund-policy">returns policy</Link>.
              </p>
            </form>
          </div>
        </aside>
      </div>
    </section>
  );
}
