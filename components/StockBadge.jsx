'use client';

import { stockState } from '@/lib/stock';

/**
 * Stock badge. Pass `available` (a number) or `null` while it is still being
 * read on the client — in that case the base number is shown as a hint.
 */
export default function StockBadge({ available, base, compact = false }) {
  const value = available === null || available === undefined ? base : available;

  if (value === null || value === undefined) {
    return <span className={`stock-line stock-loading ${compact ? 'compact' : ''}`}>Checking stock…</span>;
  }

  const state = stockState(value);

  return (
    <span className={`stock-line ${state.className} ${compact ? 'compact' : ''}`}>
      <span className="stock-dot" aria-hidden="true" />
      {state.label}
    </span>
  );
}
