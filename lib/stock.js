'use client';

// ---------------------------------------------------------------------------
// STOCK HANDLER — no database, no server.
//
// How it works:
//   1. `base`  = the pieces you physically hold, written in data/products.js.
//      That file is the single source of truth and it ships with the site.
//   2. `sold`  = quantities already ordered from THIS browser. It is kept in
//      localStorage, so a refund/reserve never double-decrements.
//   3. available = base - sold (never below 0).
//   4. The admin page (/admin) lets you set new base numbers, export them as
//      stock.json and commit it — the site is then updated for everyone the
//      next time GitHub Pages rebuilds.
//
// Nothing leaves the visitor's device: no accounts, no database, no API keys.
// ---------------------------------------------------------------------------

const LEDGER_KEY = 'armaghan.stock.ledger.v1';
const OVERRIDE_KEY = 'armaghan.stock.overrides.v1';
const STOCK_EVENT = 'armaghan:stock';

const EMPTY_LEDGER = { sold: {}, orders: [] };

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

function safeParse(value, fallback) {
  try {
    const parsed = JSON.parse(value);
    return parsed && typeof parsed === 'object' ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function emit() {
  if (typeof window !== 'undefined') window.dispatchEvent(new Event(STOCK_EVENT));
}

/* ------------------------------- ledger ---------------------------------- */

export function readLedger() {
  if (!canUseStorage()) return { ...EMPTY_LEDGER };
  const parsed = safeParse(window.localStorage.getItem(LEDGER_KEY), null);
  if (!parsed) return { ...EMPTY_LEDGER };
  return {
    sold: parsed.sold && typeof parsed.sold === 'object' ? parsed.sold : {},
    orders: Array.isArray(parsed.orders) ? parsed.orders : [],
  };
}

function writeLedger(ledger) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(LEDGER_KEY, JSON.stringify(ledger));
  emit();
}

/** How many pieces of this SKU were already ordered from this device. */
export function soldQty(sku) {
  return Number(readLedger().sold[sku]) || 0;
}

/* ------------------------------ overrides -------------------------------- */
// Extra numbers set from the admin page on this device (useful before you
// commit an exported stock.json back to the repo).

export function readOverrides() {
  if (!canUseStorage()) return {};
  return safeParse(window.localStorage.getItem(OVERRIDE_KEY), {});
}

export function setOverride(sku, value) {
  if (!canUseStorage()) return;
  const overrides = readOverrides();
  if (value === null || value === undefined || Number.isNaN(Number(value))) {
    delete overrides[sku];
  } else {
    overrides[sku] = Math.max(0, Math.floor(Number(value)));
  }
  window.localStorage.setItem(OVERRIDE_KEY, JSON.stringify(overrides));
  emit();
}

export function clearOverrides() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(OVERRIDE_KEY);
  emit();
}

/* ------------------------------- quantities ------------------------------ */

export function effectiveBase(base, sku) {
  const overrides = readOverrides();
  return Object.prototype.hasOwnProperty.call(overrides, sku) ? overrides[sku] : base;
}

/** Pieces still sellable for a variant object ({sku, base}). */
export function availableStock(variant) {
  const base = effectiveBase(variant.base, variant.sku);
  return Math.max(0, base - soldQty(variant.sku));
}

/** Stock label + css class for a given available count. */
export function stockState(available) {
  if (available <= 0) return { label: 'Sold out', className: 'stock-out', tone: 'out' };
  if (available <= 2) return { label: `Only ${available} left`, className: 'stock-low', tone: 'low' };
  if (available <= 5) return { label: `In stock — ${available} available`, className: 'stock-mid', tone: 'mid' };
  return { label: `In stock — ${available} available`, className: 'stock-ok', tone: 'ok' };
}

/* ------------------------------- ordering -------------------------------- */

/**
 * Reserve stock for an order placed on this device.
 * items: [{ sku, qty }]
 * Returns the ledger entry that was written.
 */
export function reserveOrder(items, code) {
  const ledger = readLedger();
  items.forEach(({ sku, qty }) => {
    if (!sku) return;
    ledger.sold[sku] = (Number(ledger.sold[sku]) || 0) + (Number(qty) || 0);
  });
  const entry = { code, at: new Date().toISOString(), items: items.map((i) => ({ sku: i.sku, qty: i.qty })) };
  ledger.orders = [entry, ...ledger.orders].slice(0, 100);
  writeLedger(ledger);
  return entry;
}

/** Put an order's stock back (e.g. the customer cancelled). */
export function releaseOrder(code) {
  const ledger = readLedger();
  const order = ledger.orders.find((o) => o.code === code);
  if (!order) return false;
  order.items.forEach(({ sku, qty }) => {
    ledger.sold[sku] = Math.max(0, (Number(ledger.sold[sku]) || 0) - (Number(qty) || 0));
  });
  ledger.orders = ledger.orders.filter((o) => o.code !== code);
  writeLedger(ledger);
  return true;
}

export function readOrders() {
  return readLedger().orders;
}

/** Wipe the locally-recorded sales of this device only. */
export function resetLocalSales() {
  writeLedger({ ...EMPTY_LEDGER });
}

export const STOCK_CHANGE_EVENT = STOCK_EVENT;
