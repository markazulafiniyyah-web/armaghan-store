import { COLOR_HEX } from '@/data/site';
import { fallbackHex } from '@/lib/format';
import { products as rawProducts } from '@/data/products';
import stockFile from '@/data/stock.json';

// Stock can come from two places, in this order:
//   1. data/stock.json   — the file you download from /admin (wins when a SKU is listed)
//   2. data/products.js  — the colour x size grid written by hand
const STOCK_OVERRIDES = (stockFile && stockFile.variants) || {};

/** Swatch colour for a named colour attribute. */
export function colorHex(name) {
  return COLOR_HEX[name] || fallbackHex(name);
}

/**
 * Turn the compact colour x size stock grid in data/products.js into a flat
 * list of variants, each with its own SKU:
 *
 *   { sku, color, size, base }   // `base` = pieces available in the shop
 */
export function buildVariants(product) {
  const colors = product.colors || [];
  const sizes = product.sizes || [];
  const variants = [];

  colors.forEach((color, ci) => {
    const row = (product.stock && product.stock[ci]) || [];
    sizes.forEach((size, si) => {
      const sku = `${product.slug}--c${ci}s${si}`;
      const fromGrid = Number.isFinite(row[si]) ? row[si] : 0;
      const override = Number(STOCK_OVERRIDES[sku]);
      variants.push({
        sku,
        color,
        size,
        base: Object.prototype.hasOwnProperty.call(STOCK_OVERRIDES, sku) && Number.isFinite(override)
          ? Math.max(0, override)
          : fromGrid,
      });
    });
  });

  return variants;
}

export const products = rawProducts
  .filter((p) => !p.archived)
  .map((p) => ({ ...p, variants: buildVariants(p) }));

export const categories = Array.from(new Set(products.map((p) => p.category)));

/** 'Men – Unstitched' -> 'men-unstitched' (used for collection page URLs). */
export function categorySlug(category) {
  return category
    .toLowerCase()
    .replace(/–|—/g, '-')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/** Reverse lookup: 'men-unstitched' -> 'Men – Unstitched' */
export function categoryFromSlug(slug) {
  return categories.find((c) => categorySlug(c) === slug) || null;
}

/** All products in a category. */
export function productsInCategory(category) {
  return products.filter((p) => p.category === category);
}

export function getProduct(slug) {
  return products.find((p) => p.slug === slug);
}

/** Every variant of every product, with a back-reference to its product. */
export function allVariants() {
  return products.flatMap((p) => p.variants.map((v) => ({ ...v, product: p })));
}

/** Total pieces the shop holds for a product (all colour/size combinations). */
export function productBaseStock(product) {
  return product.variants.reduce((sum, v) => sum + v.base, 0);
}
