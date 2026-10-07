'use client';

import Link from 'next/link';
import { colorHex, productBaseStock } from '@/lib/products';
import { asset, discountPercent, formatPKR } from '@/lib/format';
import { useProductStock } from '@/lib/useStock';
import StockBadge from '@/components/StockBadge';

export default function ProductCard({ product }) {
  const available = useProductStock(product);
  const base = productBaseStock(product);
  const off = discountPercent(product.price, product.compareAtPrice);
  const swatches = product.colors.slice(0, 5);

  return (
    <article className="card">
      <Link
        href={`/products/${product.slug}`}
        className="card-media"
        aria-label={`View ${product.name}`}
        style={{
          '--sw1': colorHex(product.colors[0] || 'Beige'),
          '--sw2': colorHex(product.colors[1] || product.colors[0] || 'Beige'),
          '--sw3': colorHex(product.colors[2] || product.colors[1] || product.colors[0] || 'Beige'),
        }}
      >
        {product.images?.length ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="card-photo" src={asset(product.images[0])} alt={`${product.name} in ${product.colors[0]}`} />
        ) : (
          <>
            <span className="fabric-fold fold-a" aria-hidden="true" />
            <span className="fabric-fold fold-b" aria-hidden="true" />
          </>
        )}
        {product.badge ? <span className="card-badge">{product.badge}</span> : null}
        {off > 0 ? <span className="card-off">-{off}%</span> : null}
        <span className="card-fabric">{product.fabric}</span>
      </Link>

      <div className="card-body">
        <span className="card-cat">{product.category}</span>
        <h3 className="card-title">
          <Link href={`/products/${product.slug}`}>{product.name}</Link>
        </h3>
        <p className="card-short">{product.short}</p>

        <div className="card-price">
          <strong>{formatPKR(product.price)}</strong>
          {product.compareAtPrice > product.price ? (
            <span className="price-old">{formatPKR(product.compareAtPrice)}</span>
          ) : null}
        </div>

        <div className="card-meta">
          <span className="dot-row" aria-label="Available colours">
            {swatches.map((name) => (
              <span
                key={name}
                className="dot"
                style={{ background: colorHex(name) }}
                title={name}
                aria-label={name}
              />
            ))}
            {product.colors.length > swatches.length ? (
              <span className="dot-more">+{product.colors.length - swatches.length}</span>
            ) : null}
          </span>
          <span className="size-note">{product.sizes.length} size{product.sizes.length === 1 ? '' : 's'}</span>
        </div>

        <StockBadge available={available} base={base} compact />

        <Link className="btn btn-outline btn-sm card-btn" href={`/products/${product.slug}`}>
          Choose colour &amp; size
        </Link>
      </div>
    </article>
  );
}
