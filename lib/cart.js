'use client';

// ---------------------------------------------------------------------------
// CART — items live in localStorage, so an order survives a page reload.
// Checkout hands the order to WhatsApp as a ready-written message.
// ---------------------------------------------------------------------------

import { useEffect, useState } from 'react';

const CART_KEY = 'armaghan.cart.v1';
const CART_EVENT = 'armaghan:cart';

function canUseStorage() {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
}

export function readCart() {
  if (!canUseStorage()) return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(CART_KEY));
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeCart(items) {
  if (!canUseStorage()) return;
  window.localStorage.setItem(CART_KEY, JSON.stringify(items));
  window.dispatchEvent(new Event(CART_EVENT));
}

export function addToCart(item, qty = 1) {
  const items = readCart();
  const existing = items.find((i) => i.sku === item.sku);
  if (existing) {
    existing.qty += qty;
  } else {
    items.push({ ...item, qty });
  }
  writeCart(items);
}

export function updateQty(sku, qty) {
  const items = readCart()
    .map((i) => (i.sku === sku ? { ...i, qty: Math.max(0, qty) } : i))
    .filter((i) => i.qty > 0);
  writeCart(items);
}

export function removeFromCart(sku) {
  writeCart(readCart().filter((i) => i.sku !== sku));
}

export function clearCart() {
  writeCart([]);
}

/** React hook: live cart contents + totals, synced across tabs. */
export function useCart() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const sync = () => setItems(readCart());
    sync();
    setReady(true);
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const count = items.reduce((sum, i) => sum + i.qty, 0);

  return { items, ready, subtotal, count };
}

/** Quantity of one SKU already in the cart (used to cap the stepper). */
export function cartQtyFor(sku) {
  const item = readCart().find((i) => i.sku === sku);
  return item ? item.qty : 0;
}

/** React hook: how many pieces of one SKU are sitting in the cart right now. */
export function useCartQty(sku) {
  const [qty, setQty] = useState(0);

  useEffect(() => {
    if (!sku) return undefined;
    const sync = () => setQty(cartQtyFor(sku));
    sync();
    window.addEventListener(CART_EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(CART_EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, [sku]);

  return qty;
}
