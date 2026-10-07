// ---------------------------------------------------------------------------
// Smoke test for the no-database logic (stock ledger + cart).
// Runs the real browser modules against a stubbed localStorage / window.
//
//   node scripts/smoke-test.mjs
// ---------------------------------------------------------------------------

class MemoryStorage {
  constructor() {
    this.map = new Map();
  }
  getItem(key) {
    return this.map.has(key) ? this.map.get(key) : null;
  }
  setItem(key, value) {
    this.map.set(key, String(value));
  }
  removeItem(key) {
    this.map.delete(key);
  }
}

const listeners = new Map();
globalThis.window = {
  localStorage: new MemoryStorage(),
  dispatchEvent: (event) => {
    (listeners.get(event.type) || []).forEach((fn) => fn());
    return true;
  },
  addEventListener: (type, fn) => {
    listeners.set(type, [...(listeners.get(type) || []), fn]);
  },
  removeEventListener: () => {},
};
globalThis.Event = class Event {
  constructor(type) {
    this.type = type;
  }
};

const stock = await import('../lib/stock.js');
const cart = await import('../lib/cart.js');

let passed = 0;
let failed = 0;

function check(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  if (ok) {
    passed += 1;
    console.log(`  ✓ ${name}`);
  } else {
    failed += 1;
    console.log(`  ✗ ${name}\n      expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

const variant = { sku: 'test-suit--c0s0', base: 5 };

console.log('\nStock ledger (base − sold, per colour/size SKU)');
check('fresh shelf shows base', stock.availableStock(variant), 5);
check('five or fewer is the amber tier', stock.stockState(stock.availableStock(variant)).tone, 'mid');
check('a full shelf reads as green', stock.stockState(stock.availableStock({ sku: 'x--c0s0', base: 12 })).tone, 'ok');

stock.reserveOrder([{ sku: variant.sku, qty: 2 }], 'AS-TEST1');
check('after ordering 2, 3 remain', stock.availableStock(variant), 3);
check('badge turns mid', stock.stockState(stock.availableStock(variant)).tone, 'mid');

stock.reserveOrder([{ sku: variant.sku, qty: 2 }], 'AS-TEST2');
check('after ordering 2 more, 1 remains', stock.availableStock(variant), 1);
check('badge warns "Only 1 left"', stock.stockState(stock.availableStock(variant)).label, 'Only 1 left');

stock.releaseOrder('AS-TEST2');
check('releasing an order puts stock back', stock.availableStock(variant), 3);

check('two orders were placed', stock.readOrders().length === 1 && stock.readOrders()[0].code === 'AS-TEST1', true);
check('released order is removed from the list', stock.readOrders().every((o) => o.code !== 'AS-TEST2'), true);
check('override changes the shelf count', (stock.setOverride(variant.sku, 9), stock.availableStock(variant)), 7);
stock.clearOverrides();
check('clearing overrides returns to base', stock.availableStock(variant), 3);

console.log('\nNever over-sells');
stock.setOverride(variant.sku, 1);
check('cannot go below zero', stock.availableStock(variant), 0);
check('badge says Sold out', stock.stockState(stock.availableStock(variant)).label, 'Sold out');
stock.clearOverrides();

console.log('\nCart (localStorage) + WhatsApp ordering');
cart.addToCart({ sku: 'a--c0s0', slug: 'a', name: 'A', color: 'Navy Blue', size: '4 m', price: 3450 }, 2);
cart.addToCart({ sku: 'a--c0s0', slug: 'a', name: 'A', color: 'Navy Blue', size: '4 m', price: 3450 }, 1);
check('same SKU merges quantities', cart.readCart()[0].qty, 3);
check('cart quantity lookup', cart.cartQtyFor('a--c0s0'), 3);

cart.addToCart({ sku: 'b--c1s1', slug: 'b', name: 'B', color: 'Beige', size: 'S', price: 950 }, 1);
check('two lines in cart', cart.readCart().length, 2);

cart.updateQty('a--c0s0', 1);
check('quantity update', cart.cartQtyFor('a--c0s0'), 1);
cart.removeFromCart('a--c0s0');
check('removing a line', cart.readCart().length, 1);
cart.clearCart();
check('clearing the cart', cart.readCart(), []);

const offers = await import('../lib/offers.js');
console.log('\nBulk offers (5% on 2, 10% on 4, 15% on 6)');
check('1 piece earns no discount', offers.bulkDiscountFor(1, 3000).percent, 0);
check('2 pieces earn 5%', offers.bulkDiscountFor(2, 6000).percent, 5);
check('3 pieces stay on 5%', offers.bulkDiscountFor(3, 9000).percent, 5);
check('4 pieces earn 10%', offers.bulkDiscountFor(4, 12000).percent, 10);
check('5 pieces stay on 10%', offers.bulkDiscountFor(5, 15000).percent, 10);
check('6 pieces earn 15%', offers.bulkDiscountFor(6, 18000).percent, 15);
check('10 pieces stay on 15%', offers.bulkDiscountFor(10, 30000).percent, 15);
check('discount amount on 4 x Rs 3,000', offers.bulkDiscountFor(4, 12000).amount, 1200);
check('price after a 15% tier', offers.bulkDiscountFor(6, 18000).afterDiscount, 15300);
check('nudge when 3 pieces in the cart', offers.nextBulkTier(3), { qty: 4, percent: 10, needed: 1 });
check('no nudge at the top tier', offers.nextBulkTier(6), null);
check('order message label', offers.bulkDiscountLabel(4, 12000), 'Bulk discount (10% on 4 pieces)');

const site = (await import('../data/site.js')).site;
const fmt = await import('../lib/format.js');
console.log('\nWhatsApp + refund maths');
console.log('\nWhatsApp + refund maths');
check('WhatsApp number is digits only', /^\d{10,15}$/.test(site.whatsappNumber), true);
check(
  'wa.me link is encoded',
  fmt.waLink('Assalam o Alaikum!\nOrder: 2 x suit').startsWith('https://wa.me/923274934992?text=Assalam%20o%20Alaikum!'),
  true,
);
check('Rs formatting', fmt.formatPKR(3450), 'Rs 3,450');
check('20% deduction on Rs 1,000', [fmt.refundCut(1000), fmt.refundPayable(1000)], [200, 800]);
check('20% deduction on Rs 3,450', [fmt.refundCut(3450), fmt.refundPayable(3450)], [690, 2760]);
check('order reference looks right', /^AS-[A-Z0-9]{6,8}$/.test(fmt.newOrderCode()), true);

console.log(`\n${passed} passed, ${failed} failed\n`);
process.exit(failed === 0 ? 0 : 1);
