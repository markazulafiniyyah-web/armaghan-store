'use client';

import { useEffect, useMemo, useState } from 'react';
import { products } from '@/lib/products';
import { clearOverrides, effectiveBase, readOrders, readOverrides, setOverride } from '@/lib/stock';
import { formatPKR } from '@/lib/format';
import { site } from '@/data/site';

/**
 * Shop-side stock counter. Runs entirely in the browser:
 *   1. Set the real count for each colour/size here.
 *   2. Download stock.json and commit it to data/ — the published site
 *      then shows those numbers for every visitor.
 * (localStorage overrides are also kept for this device.)
 */
export default function AdminStock() {
  const [overrides, setOverridesState] = useState({});
  const [orders, setOrders] = useState([]);
  const [copyNote, setCopyNote] = useState('');

  useEffect(() => {
    const sync = () => {
      setOverridesState(readOverrides());
      setOrders(readOrders());
    };
    sync();
    window.addEventListener('storage', sync);
    return () => window.removeEventListener('storage', sync);
  }, []);

  const rows = useMemo(() => products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p }))), []);

  const totalPieces = useMemo(
    () => rows.reduce((sum, r) => sum + effectiveBase(r.base, r.sku), 0),
    [rows, overrides],
  );

  function download() {
    const lines = [];
    lines.push('{');
    lines.push('  "_comment": "Exported from /admin — paste these numbers back into data/products.js",');
    lines.push('  "exportedAt": "' + new Date().toISOString() + '",');
    lines.push('  "note": "Counts are available pieces per colour/size.",');
    lines.push('  "variants": {');
    const entries = rows.map((r) => {
      const value = effectiveBase(r.base, r.sku);
      return `    "${r.sku}": ${value}`;
    });
    lines.push(entries.join(',\n'));
    lines.push('  }');
    lines.push('}');

    const blob = new Blob([lines.join('\n')], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stock.json';
    a.click();
    URL.revokeObjectURL(url);
  }

  async function copyJson() {
    const obj = {};
    rows.forEach((r) => {
      obj[r.sku] = effectiveBase(r.base, r.sku);
    });
    const text = JSON.stringify(obj, null, 2);
    try {
      await navigator.clipboard.writeText(text);
      setCopyNote('Stock JSON copied — paste it into data/stock.json or straight into your product rows.');
      window.setTimeout(() => setCopyNote(''), 4000);
    } catch {
      setCopyNote('Copy failed — use the download button instead.');
    }
  }

  return (
    <section className="section">
      <div className="section-head">
        <div>
          <h1 className="section-title">Stock counter</h1>
          <p className="section-sub">
            This page is for you, not for customers — it is not linked anywhere on the site. Type the pieces you
            physically have, then export the numbers and commit them to the repository.
          </p>
        </div>
        <div className="btn-row">
          <button type="button" className="btn btn-primary" onClick={download}>
            Download stock.json
          </button>
          <button type="button" className="btn btn-outline" onClick={copyJson}>
            Copy as JSON
          </button>
          <button type="button" className="link-btn danger" onClick={() => clearOverrides()}>
            Clear this device’s overrides
          </button>
        </div>
      </div>

      {copyNote ? <p className="callout callout-ok">{copyNote}</p> : null}

      <p className="callout">
        <strong>{rows.length}</strong> colour/size combinations across <strong>{products.length}</strong> products ·
        total pieces on the shelf: <strong>{totalPieces}</strong>
      </p>

      <details className="admin-help">
        <summary>How to publish new numbers (2 minutes, no database)</summary>
        <ol className="steps-list">
          <li>
            Type the new count in the box next to any colour and size below. Rows turn amber until you publish them.
          </li>
          <li>
            Press <em>Download stock.json</em> (or copy the JSON), then paste each number into the matching
            <code> stock </code> row in <code>data/products.js</code>.
          </li>
          <li>
            Commit and push. GitHub Actions rebuilds the site and every visitor sees the new stock.
          </li>
        </ol>
      </details>

      <div className="admin-groups">
        {products.map((p) => (
          <div className="admin-card" key={p.slug}>
            <header>
              <h2>{p.name}</h2>
              <span className="muted small">{p.category}</span>
            </header>
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Colour</th>
                  <th>Size</th>
                  <th>SKU</th>
                  <th>On the shelf</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {p.variants.map((v) => {
                  const value = effectiveBase(v.base, v.sku);
                  const changed = Object.prototype.hasOwnProperty.call(overrides, v.sku);
                  return (
                    <tr key={v.sku} className={changed ? 'changed' : ''}>
                      <td>{v.color}</td>
                      <td>{v.size}</td>
                      <td>
                        <code className="tiny">{v.sku}</code>
                      </td>
                      <td>
                        <input
                          type="number"
                          min="0"
                          value={value}
                          aria-label={`Stock for ${v.color} ${v.size}`}
                          onChange={(e) => {
                            const next = e.target.value === '' ? null : Math.max(0, Number(e.target.value));
                            setOverride(v.sku, next);
                            setOverridesState(readOverrides());
                          }}
                        />
                      </td>
                      <td className="muted tiny">
                        {changed ? 'edited on this device' : `from data file: ${v.base}`}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <div className="admin-card">
        <header>
          <h2>Orders placed from this device</h2>
          <span className="muted small">Sent to WhatsApp, recorded locally only</span>
        </header>
        {orders.length === 0 ? (
          <p className="muted">No orders recorded in this browser yet.</p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ref</th>
                <th>When</th>
                <th>Lines</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.code}>
                  <td>
                    <strong>{o.code}</strong>
                  </td>
                  <td>{new Date(o.at).toLocaleString()}</td>
                  <td>{o.items.map((i) => `${i.qty} × ${i.sku}`).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <p className="muted small">
        Delivery fee setting: {formatPKR(site.deliveryFee)} · free delivery over {formatPKR(site.freeDeliveryOver)}{' '}
        (edit these in <code>data/site.js</code>).
      </p>
    </section>
  );
}
