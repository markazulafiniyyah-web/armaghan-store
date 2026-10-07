'use client';

import { useEffect, useState } from 'react';
import { STOCK_CHANGE_EVENT, availableStock } from '@/lib/stock';

/**
 * Live available-stock for a variant, re-rendering when the stock ledger or
 * another tab changes. Returns null until mounted (so server-rendered HTML
 * and the first client render always match).
 */
export function useAvailableStock(variant) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    if (!variant) return undefined;
    const read = () => setAvailable(availableStock(variant));
    read();
    window.addEventListener(STOCK_CHANGE_EVENT, read);
    window.addEventListener('storage', read);
    window.addEventListener('focus', read);
    return () => {
      window.removeEventListener(STOCK_CHANGE_EVENT, read);
      window.removeEventListener('storage', read);
      window.removeEventListener('focus', read);
    };
  }, [variant && variant.sku, variant && variant.base]);

  return available;
}

/**
 * Total available stock for a whole product (sum over every variant).
 */
export function useProductStock(product) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    if (!product) return undefined;
    const read = () => setAvailable(product.variants.reduce((sum, v) => sum + availableStock(v), 0));
    read();
    window.addEventListener(STOCK_CHANGE_EVENT, read);
    window.addEventListener('storage', read);
    return () => {
      window.removeEventListener(STOCK_CHANGE_EVENT, read);
      window.removeEventListener('storage', read);
    };
  }, [product && product.slug]);

  return available;
}
