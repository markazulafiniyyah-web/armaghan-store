'use client';

// ---------------------------------------------------------------------------
// BULK OFFERS — the 5% / 10% / 15% tiers, in one place.
// The tier is decided by how many pieces are in the order (cart quantity).
// ---------------------------------------------------------------------------

import { site } from '@/data/site';

export const bulkTiers = [...(site.bulkTiers || [])].sort((a, b) => a.qty - b.qty);

export const bestPercent = bulkTiers.length ? bulkTiers[bulkTiers.length - 1].percent : 0;

/**
 * Discount for an order of `count` pieces with a `subtotal` in rupees.
 * Returns { tier, percent, amount, afterDiscount } — a zero-percent result
 * when the order has not reached the first tier.
 */
export function bulkDiscountFor(count, subtotal) {
  const safeSubtotal = Math.max(0, Number(subtotal) || 0);
  const tier = [...bulkTiers].reverse().find((t) => count >= t.qty) || null;
  if (!tier) return { tier: null, percent: 0, amount: 0, afterDiscount: safeSubtotal };

  const amount = Math.round((safeSubtotal * tier.percent) / 100);
  return { tier, percent: tier.percent, amount, afterDiscount: safeSubtotal - amount };
}

/** The next tier this order could reach: { qty, percent, needed } or null. */
export function nextBulkTier(count) {
  const tier = bulkTiers.find((t) => count < t.qty);
  if (!tier) return null;
  return { ...tier, needed: tier.qty - count };
}

/** Human summary used in the WhatsApp order message. */
export function bulkDiscountLabel(count, subtotal) {
  const { percent, amount } = bulkDiscountFor(count, subtotal);
  if (!percent) return null;
  return `Bulk discount (${percent}% on ${count} pieces)`;
}
