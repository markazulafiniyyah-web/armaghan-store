'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { site } from '@/data/site';
import { colorHex } from '@/lib/products';
import { asset, discountPercent, formatPKR, waLink } from '@/lib/format';import { addToCart, cartQtyFor, useCartQty } from '@/lib/cart';
import { availableStock, effectiveBase, soldQty, stockState } from '@/lib/stock';
import { useAvailableStock } from '@/lib/useStock';
import BulkOffer from '@/components/BulkOffer';

const MAX_QTY = 10;

export default function ProductDetail({ product, related }) {
  const colors = product.colors;
  const sizes = product.sizes;

  const [color, setColor] = useState(colors[0]);
  const [size, setSize] = useState(sizes[0]);
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState('');
  const [photo, setPhoto] = useState(0);

  // Optional real photos: add `images: ['/products/file-1.jpg', …]` in data/products.js
  const images = product.images || [];
  const hasPhotos = images.length > 0;

  const variant = useMemo(
    () => product.variants.find((v) => v.color === color && v.size === size) || product.variants[0],
    [product.variants, color, size],
  );

  const available = useAvailableStock(variant);
  const inCart = useCartQty(variant.sku);
  const off = discountPercent(product.price, product.compareAtPrice);

  // Stock for every size of the currently selected colour — the shopkeeper's view.
  const sizeStock = useMemo(
    () =>
      sizes.map((s) => {
        const v = product.variants.find((x) => x.color === color && x.size === s);
        return { size: s, variant: v, available: v ? availableStock(v) : 0 };
      }),
    // `available` is intentionally part of the deps so the row updates live.
    [product.variants, color, sizes, available],
  );

  // Never let the stepper sit above what is actually left.
  useEffect(() => {
    if (available === null) return;
    const inCart = cartQtyFor(variant.sku);
    const ceiling = Math.max(1, Math.min(MAX_QTY, available - inCart));
    setQty((q) => (available <= 0 ? 1 : Math.min(q, ceiling)));
  }, [available, variant.sku]);

  const maxQty = available === null ? 1 : Math.max(1, Math.min(MAX_QTY, available - cartQtyFor(variant.sku)));
  const state = stockState(available === null ? variant.base : available);
  const soldOut = (available === null ? variant.base : available) <= 0;

  const lineItem = {
    sku: variant.sku,
    slug: product.slug,
    name: product.name,
    color,
    size,
    price: product.price,
    qty,
  };

  function handleAdd() {
    addToCart(lineItem, qty);
    setFlash(`Added ${qty} × ${product.name} (${color}, ${size}) to your cart.`);
    window.setTimeout(() => setFlash(''), 4000);
  }

  function orderMessage() {
    const url = typeof window !== 'undefined' ? window.location.href : '';
    return [
      `Assalam o Alaikum ${site.name}!`,
      '',
      'I would like to order:',
      `• ${product.name}`,
      `   Colour: ${color}`,
      `   Size: ${size}`,
      `   Quantity: ${qty}`,
      `   Price: ${formatPKR(product.price * qty)}`,
      product.fabric ? `   Fabric: ${product.fabric}` : '',
      '',
      url ? `Product link: ${url}` : '',
      '',
      'Please confirm the stock and delivery time.',
      `(I understand refunds carry a ${site.refundCutPercent}% deduction as per your return policy.)`,
    ]
      .filter(Boolean)
      .join('\n');
  }

  function handleOrderNow() {
    window.open(waLink(orderMessage()), '_blank', 'noopener,noreferrer');
  }

  return (
    <div className="pdp">
      <nav className="crumbs" aria-label="Breadcrumb">
        <Link href="/">Shop</Link>
        <span aria-hidden="true">/</span>
        <span>{product.category}</span>
        <span aria-hidden="true">/</span>
        <span>{product.name}</span>
      </nav>

      <div className="pdp-grid">
        {/* ---------------------------- gallery ---------------------------- */}
        <div className="gallery">
          <div
            className="gallery-main"
            style={hasPhotos ? undefined : { '--sw1': colorHex(color), '--sw2': colorHex(colors[1] || color) }}
            role="img"
            aria-label={`${product.name} in ${color}`}
          >
            {hasPhotos ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img className="gallery-photo" src={asset(images[Math.min(photo, images.length - 1)])} alt={`${product.name} — ${color}`} />
            ) : (
              <>
                <span className="fabric-fold fold-a" aria-hidden="true" />
                <span className="fabric-fold fold-b" aria-hidden="true" />
              </>
            )}
            <span className="gallery-tag">{color}</span>
          </div>

          <div className="thumbs">
            {hasPhotos
              ? images.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    className={`thumb thumb-photo ${i === photo ? 'active' : ''}`}
                    onClick={() => setPhoto(i)}
                    aria-label={`Show photo ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={asset(src)} alt="" />
                  </button>
                ))
              : colors.slice(0, 4).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`thumb ${c === color ? 'active' : ''}`}
                    onClick={() => setColor(c)}
                    style={{ background: colorHex(c) }}
                    aria-label={`Preview ${c}`}
                    title={c}
                  />
                ))}
            <span className="thumb-note">
              {hasPhotos
                ? 'Photos show the actual cloth. Swatch colours under “Colour” are the exact shades available.'
                : 'Photos coming soon — until then each colour shows a swatch of that exact shade.'}
            </span>
          </div>
        </div>

        {/* --------------------------- info panel -------------------------- */}
        <div className="pdp-info">
          <span className="card-cat">{product.category}</span>
          <h1>{product.name}</h1>
          <p className="lede">{product.short}</p>

          <div className="pdp-price">
            <strong>{formatPKR(product.price)}</strong>
            {product.compareAtPrice > product.price ? (
              <>
                <span className="price-old">{formatPKR(product.compareAtPrice)}</span>
                <span className="save-badge">Save {off}%</span>
              </>
            ) : null}
          </div>

          <p className="fabric-line">
            <strong>Fabric:</strong> {product.fabric}
          </p>

          {/* ---------------------------- colour --------------------------- */}
          <div className="attr">
            <div className="attr-head">
              <span className="attr-label">Colour</span>
              <span className="attr-value">{color}</span>
            </div>
            <div className="swatches">
              {colors.map((c) => {
                const anyStock = sizes.some((s) => {
                  const v = product.variants.find((x) => x.color === c && x.size === s);
                  return v && availableStock(v) > 0;
                });
                return (
                  <button
                    key={c}
                    type="button"
                    className={`swatch ${c === color ? 'active' : ''} ${anyStock ? '' : 'is-out'}`}
                    onClick={() => setColor(c)}
                    aria-pressed={c === color}
                    title={anyStock ? c : `${c} — sold out`}
                  >
                    <span className="swatch-dot" style={{ background: colorHex(c) }} aria-hidden="true" />
                    <span className="swatch-name">{c}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ----------------------------- size ---------------------------- */}
          <div className="attr">
            <div className="attr-head">
              <span className="attr-label">Size</span>
              <span className="attr-value">{size}</span>
            </div>
            <div className="sizes">
              {sizeStock.map(({ size: s, available: avail }) => (
                <button
                  key={s}
                  type="button"
                  className={`size-btn ${s === size ? 'active' : ''}`}
                  onClick={() => setSize(s)}
                  aria-pressed={s === size}
                  disabled={avail <= 0}
                >
                  {s}
                  <span className="size-stock">{avail <= 0 ? 'sold out' : `${avail} left`}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ---------------------------- stock ---------------------------- */}
          <div className={`stock-panel ${state.className}`}>
            <div className="stock-panel-main">
              <span className="stock-dot" aria-hidden="true" />
              <strong>{state.label}</strong>
              <span className="stock-sku">
                {color} · {size} · SKU {variant.sku}
              </span>
            </div>
            <div className="stock-panel-meta">
              Shelf count: {effectiveBase(variant.base, variant.sku)} · In your cart: {inCart} · Ordered from this device:{' '}
              {soldQty(variant.sku)}
            </div>
          </div>

          {/* ----------------------------- qty ---------------------------- */}
          <div className="buy-row">
            <div className="qty">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="Decrease quantity">
                −
              </button>
              <input
                type="number"
                min="1"
                max={maxQty}
                value={qty}
                aria-label="Quantity"
                onChange={(e) => {
                  const next = Number(e.target.value) || 1;
                  setQty(Math.max(1, Math.min(maxQty, next)));
                }}
              />
              <button type="button" onClick={() => setQty((q) => Math.min(maxQty, q + 1))} aria-label="Increase quantity">
                +
              </button>
            </div>
            <button type="button" className="btn btn-primary" onClick={handleAdd} disabled={soldOut}>
              Add to cart
            </button>
            <button type="button" className="btn btn-wa" onClick={handleOrderNow} disabled={soldOut}>
              Order on WhatsApp
            </button>
          </div>
          {available !== null && available > 0 && maxQty <= available ? (
            <p className="muted small">You can add up to {maxQty} piece{maxQty === 1 ? '' : 's'} of this colour and size.</p>
          ) : null}
          {soldOut ? (
            <p className="callout callout-warn">
              This colour and size is finished for now. Message us on WhatsApp — we can often arrange the same fabric
              from our next lot.
            </p>
          ) : null}
          {flash ? <p className="callout callout-ok">{flash}</p> : null}

          <BulkOffer compact />

          <ul className="pdp-facts">
            <li>{site.deliveryNote}</li>
            <li>
              Refunds are settled after a {site.refundCutPercent}% deduction —{' '}
              <Link href="/refund-policy">see how it works</Link>.
            </li>
            <li>Delivery within {site.city}: {formatPKR(site.deliveryFee)} · free over {formatPKR(site.freeDeliveryOver)}</li>
          </ul>
        </div>
      </div>

      {/* ---------------------------- details ---------------------------- */}
      <div className="pdp-details">
        <div className="pdp-details-main">
          <h2>About this fabric</h2>
          <p>{product.description}</p>
          {product.highlights?.length ? (
            <ul className="tick-list">
              {product.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <aside className="pdp-details-side">
          <div className="info-card">
            <h3>Washing &amp; care</h3>
            <p>{product.care}</p>
          </div>
          <div className="info-card">
            <h3>How to order</h3>
            <ol className="steps-list">
              <li>Pick your colour and size above.</li>
              <li>Add to cart, or send the order straight to WhatsApp.</li>
              <li>Confirm your address and payment (COD or transfer).</li>
              <li>We pack and post within 24 hours.</li>
            </ol>
          </div>
        </aside>
      </div>

      {/* ---------------------------- related ---------------------------- */}
      {related?.length ? (
        <section className="section">
          <div className="section-head">
            <h2 className="section-title">You may also like</h2>
            <Link className="btn btn-outline btn-sm" href="/">
              See everything
            </Link>
          </div>
          <div className="grid products">
            {related.map((p) => (
              <Link key={p.slug} href={`/products/${p.slug}`} className="mini-card">
                <span
                  className="mini-swatch"
                  style={{ '--sw1': colorHex(p.colors[0]), '--sw2': colorHex(p.colors[1] || p.colors[0]) }}
                  aria-hidden="true"
                />
                <span className="mini-body">
                  <strong>{p.name}</strong>
                  <span className="muted small">{p.fabric}</span>
                  <span className="mini-price">{formatPKR(p.price)}</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
