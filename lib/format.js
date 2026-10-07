import { site } from '@/data/site';

/** Format a number as Pakistani Rupees, e.g. 3450 -> "Rs 3,450". */
export function formatPKR(amount) {
  const n = Number(amount) || 0;
  return `${site.currency === 'PKR' ? 'Rs ' : site.currency + ' '}${new Intl.NumberFormat('en-PK').format(Math.round(n))}`;
}

/** Percentage discount between compare-at price and price (0 if not set). */
export function discountPercent(price, compareAtPrice) {
  if (!compareAtPrice || compareAtPrice <= price) return 0;
  return Math.round(((compareAtPrice - price) / compareAtPrice) * 100);
}

/** Amount deducted on a refund, per the 20% refund policy. */
export function refundCut(amount) {
  return Math.round(((Number(amount) || 0) * site.refundCutPercent) / 100);
}

/** Amount the customer receives back after the refund deduction. */
export function refundPayable(amount) {
  return Math.round((Number(amount) || 0) - refundCut(amount));
}

/** Prefix a public asset path with the GitHub Pages basePath when needed. */
export function asset(path) {
  if (!path) return '';
  if (/^https?:\/\//i.test(path)) return path;
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return `${basePath}${path.startsWith('/') ? path : `/${path}`}`;
}

/** Build a wa.me deep link with a pre-filled message. */
export function waLink(message) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

/** Short, human-friendly order reference, e.g. "AS-M8X2Q1". */
export function newOrderCode() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-5);
  const rand = Math.random().toString(36).toUpperCase().slice(2, 4);
  return `AS-${stamp}${rand}`;
}

/** Stable fallback swatch colour for any colour name not listed in COLOR_HEX. */
export function fallbackHex(name = '') {
  let hash = 0;
  for (let i = 0; i < name.length; i += 1) hash = (hash * 31 + name.charCodeAt(i)) % 360;
  return `hsl(${hash} 28% 58%)`;
}
