// ---------------------------------------------------------------------------
// End-to-end browser test (optional).
//
//   npm i -D playwright && npx playwright install chromium
//   npm run build && npm run preview      # in another terminal
//   node scripts/e2e.mjs
//
// Walks a real purchase: colour/size selection -> stock counts -> cart ->
// WhatsApp handoff -> stock ledger -> /admin exporter.
// Set BASE_URL to test a deployed copy.
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const BASE = process.env.BASE_URL || 'http://localhost:3000';

const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const log = (ok, msg) => console.log(`${ok ? '  ✓' : '  ✗ FAIL'} ${msg}`);
let fails = 0;
const check = (ok, msg) => { if (!ok) fails++; log(ok, msg); };

// capture window.open targets
await page.addInitScript(() => {
  window.__opened = [];
  window.open = (url) => {
    window.__opened.push(url);
    return { focus() {} };
  };
});

console.log('\n1. Product page stock + colour attributes');
await page.goto(`${BASE}/products/royal-wash-n-wear-unstitched/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
let stockText = await page.locator('.stock-panel-main strong').innerText();
check(stockText.includes('6 available'), `initial stock shown: "${stockText}"`);
const swatchNames = await page.locator('.swatch-name').allInnerTexts();
check(swatchNames.join('|') === 'Charcoal Grey|Navy Blue|Beige', `named colour attributes: ${swatchNames.join(', ')}`);
const sizeLabels = await page.locator('.size-btn').allInnerTexts();
check(sizeLabels[0].includes('6 left') && sizeLabels[2].includes('2 left'), `per-size stock labels: ${sizeLabels.join(' / ').replace(/\n/g,' ')}`);

console.log('\n2. Switching colour changes the SKU and stock');
await page.locator('.swatch', { hasText: 'Beige' }).click();
await page.waitForTimeout(200);
const skuText = await page.locator('.stock-sku').innerText();
const beigeStock = await page.locator('.stock-panel-main strong').innerText();
check(skuText.includes('c2s0'), `SKU follows the colour: ${skuText}`);
check(beigeStock.includes('5 available'), `Beige stock is its own count: ${beigeStock}`);

console.log('\n3. Sold-out combination is disabled');
await page.locator('.size-btn', { hasText: '4.5 m' }).click();
await page.waitForTimeout(200);
const halfStock = await page.locator('.stock-panel-main strong').innerText();
check(halfStock.includes('Only 1 left'), `Beige 4.5m (last piece) shows: ${halfStock}`);
await page.goto(`${BASE}/products/embroidered-cambric-suit/`, { waitUntil: 'networkidle' });
await page.locator('.swatch', { hasText: 'Black' }).click();
await page.waitForTimeout(200);
const sizeDisabled = await page.locator('.size-btn').first().isDisabled();
const outMsg = await page.locator('.callout-warn').first().innerText();
const addDisabled = await page.locator('button:has-text("Add to cart")').isDisabled();
check(sizeDisabled && addDisabled, 'a fully sold-out colour: size buttons + Add to cart are disabled');
check(outMsg.includes('finished for now'), `sold-out guidance shown: "${outMsg.slice(0, 44)}..."`);

console.log('\n4. Add to cart: cart holds the pieces, stock drops at checkout');
await page.goto(`${BASE}/products/royal-wash-n-wear-unstitched/`, { waitUntil: 'networkidle' });
await page.locator('.qty button:has-text("+")').first().click();
await page.locator('button:has-text("Add to cart")').click();
await page.waitForTimeout(300);
check((await page.locator('.callout-ok').innerText()).includes('Added 2 ×'), 'cart confirmation shown');
const cartBadge = await page.locator('.cart-count').innerText();
check(cartBadge === '2', `header cart badge updated: ${cartBadge}`);
await page.reload({ waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
const metaBefore = await page.locator('.stock-panel-meta').innerText();
check(metaBefore.includes('In your cart: 2'), `cart hold is visible on the product page: "${metaBefore}"`);
const ceiling = await page.locator('.qty input').getAttribute('max');
check(ceiling === '4', `you cannot add more than the shelf holds (max 6 - 2 in cart = ${ceiling})`);

console.log('\n5. Cart page, delivery fee, WhatsApp checkout');
await page.goto(`${BASE}/cart/`, { waitUntil: 'networkidle' });
check((await page.locator('.summary').innerText()).includes('Rs 6,900'), 'subtotal = 2 x Rs 3,450');
check((await page.locator('.summary').innerText()).includes('Free'), 'free delivery applied above Rs 5,000');
const cartSwatch = await page.locator('.cart-swatch').count();
check(cartSwatch === 1, 'cart line keeps its colour swatch');
await page.fill('input[placeholder="e.g. Ahmed Raza"]', 'Ahmed Raza');
await page.fill('input[placeholder="03xx xxxxxxx"]', '03001234567');
await page.fill('input[placeholder="e.g. Multan"]', 'Multan');
await page.fill('textarea >> nth=0', 'House 12, Block B, near Jamia Masjid');
await page.selectOption('select >> nth=0', 'Bank transfer / online payment');
await page.locator('button:has-text("Send order on WhatsApp")').click();
await page.waitForTimeout(600);
const opened = await page.evaluate(() => window.__opened);
check(opened.length === 1 && opened[0].startsWith('https://wa.me/923274934992?text='), 'WhatsApp handoff opened');
const msg = decodeURIComponent(opened[0].split('text=')[1]);
check(msg.includes('Ahmed Raza') && msg.includes('03001234567') && msg.includes('House 12'), 'order message carries the delivery details');
check(msg.includes('Colour: Charcoal Grey · Size: 2.5 m'), 'order message carries colour + size');
check(msg.includes('Bulk discount (5% on 2 pieces): − Rs 345'), 'tier 1 (5%) applied on a 2-piece order');
check(msg.includes('Total payable: Rs 6,555'), 'order message carries the discounted total');
check(msg.includes('add 2 more pieces for 10% off'), 'order message nudges toward tier 2');
check(msg.includes('20% deduction'), 'order message references the refund policy');
check((await page.locator('.callout-ok.big h2').innerText()).includes('AS-'), 'order reference shown to the customer');
check((await page.locator('.cart-count').count()) === 0, 'cart emptied after checkout');

console.log('\n5b. The order really reduced the shelf');
await page.goto(`${BASE}/products/royal-wash-n-wear-unstitched/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
const afterOrder = await page.locator('.stock-panel-main strong').innerText();
const meta = await page.locator('.stock-panel-meta').innerText();
check(afterOrder.includes('4 available'), `stock dropped 6 -> 4 after the order: "${afterOrder}"`);
check(meta.includes('Ordered from this device: 2'), `ledger records the sale: "${meta}"`);
const sizeAfter = await page.locator('.size-btn').first().innerText();
check(sizeAfter.includes('4 left'), `size button re-counted: ${sizeAfter.replace(/\n/g, ' ')}`);

console.log('\n6. Ledger + admin stock counter');
await page.goto(`${BASE}/admin/`, { waitUntil: 'networkidle' });
const ordersRows = await page.locator('.admin-card').last().locator('table tbody tr').count();
check(ordersRows >= 1, `admin lists ${ordersRows} order(s) placed from this device`);
const skuCell = await page.locator('.admin-table code.tiny').first().innerText();
check(skuCell === 'china-boski-12-pound--c0s0', `admin table keyed by SKU: ${skuCell}`);
const adminInput = page.locator('tr:has-text("royal-wash-n-wear-unstitched--c0s0") input').first();
await adminInput.fill('12');
await page.waitForTimeout(300);
const changed = await page.locator('.admin-table tr.changed').count();
check(changed === 1, 'edited row is flagged until published');
await page.goto(`${BASE}/products/royal-wash-n-wear-unstitched/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
const overrideStock = await page.locator('.stock-panel-main strong').innerText();
check(overrideStock.includes('10 available'), `shelf set to 12 minus 2 sold = 10: "${overrideStock}"`);

// ---------------------------------------------------------------------------
// Bulk offer: 5% / 10% / 15% tiers, on the real China Boski product
// ---------------------------------------------------------------------------
// start this scenario from a clean shelf (the earlier admin step left an override)
await page.goto(`${BASE}/admin/`, { waitUntil: 'networkidle' });
await page.locator('button:has-text("Clear this device")').click();
await page.waitForTimeout(300);

console.log('\nChina Boski — product page');
await page.goto(`${BASE}/products/china-boski-12-pound/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
check((await page.locator('h1').innerText()).includes('China Boski'), 'product is on its own page');
check((await page.locator('.pdp-price strong').innerText()).replace(/[^0-9]/g, '') === '3000', 'priced at Rs 3,000');
check((await page.locator('.swatch-name').first().innerText()) === 'Boski Cream', 'named colour attribute: Boski Cream');
check((await page.locator('.gallery-photo').count()) === 1, 'brand photo shows in the gallery');
check((await page.locator('.thumb-photo').count()) === 2, 'both brand photos are in the thumbnail strip');
check((await page.locator('.gallery-photo').getAttribute('src')).includes('china-boski-1-card.jpg'), 'card image wired from data/products.js');
const sizeTxt = await page.locator('.size-btn').first().innerText();
check(sizeTxt.includes('10 left'), `per-size stock shown: ${sizeTxt.replace(/\n/g, ' ')}`);
check((await page.locator('.offer-inline').innerText()).includes('5% off on 2 pieces'), 'bulk offer strip on the product page');

console.log('\n4 pieces should trigger the 10% tier');
for (let i = 0; i < 4; i++) {
  await page.locator('button:has-text("Add to cart")').click();
  await page.waitForTimeout(120);
}
await page.goto(`${BASE}/cart/`, { waitUntil: 'networkidle' });
const summary = await page.locator('.summary').innerText();
check(summary.includes('4 pieces'), 'summary counts 4 pieces');
check(summary.includes('Rs 12,000'), 'subtotal = 4 x Rs 3,000');
check(/Bulk discount \(10% on 4 pieces\)/.test(summary), 'tier 2 applied automatically');
check(summary.includes('1,200'), 'discount is Rs 1,200 (10% of 12,000)');
check(summary.includes('Rs 10,800'), 'total payable after discount');
check(summary.includes('Free'), 'free delivery above Rs 5,000 still applies (on the discounted amount)');
check((await page.locator('.offer-nudge').innerText()).includes('Best tier reached') === false, 'shows a nudge toward the next tier, not the top tier');

await page.fill('input[placeholder="e.g. Ahmed Raza"]', 'Bilal Ahmed');
await page.fill('input[placeholder="03xx xxxxxxx"]', '03211234567');
await page.fill('input[placeholder="e.g. Multan"]', 'Vihari');
await page.fill('textarea >> nth=0', 'Shop 4, Main Bazaar');
await page.locator('button:has-text("Send order on WhatsApp")').click();
await page.waitForTimeout(600);
const bulkMsg = decodeURIComponent((await page.evaluate(() => window.__opened))[0].split('text=')[1]);
check(bulkMsg.includes('Bulk discount (10% on 4 pieces): − Rs 1,200'), 'WhatsApp message shows the discount line');
check(bulkMsg.includes('Total payable: Rs 10,800'), 'WhatsApp message shows the discounted total');
check(bulkMsg.includes('add 2 more pieces for 15% off'), 'message nudges toward the next tier');
check((await page.locator('.callout-ok.big').innerText()).includes('bulk discount'), 'confirmation explains what was taken off');

console.log('\nStock only drops for what was really bought');
await page.goto(`${BASE}/products/china-boski-12-pound/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
check((await page.locator('.stock-panel-main strong').innerText()).includes('6 available'), '10 on the shelf − 4 ordered = 6 available');
check((await page.locator('.stock-panel-meta').innerText()).includes('Ordered from this device: 4'), 'ledger recorded 4 pieces');

console.log(fails === 0 ? '\nALL E2E CHECKS PASSED\n' : `\n${fails} E2E CHECK(S) FAILED\n`);
await browser.close();
process.exit(fails ? 1 : 0);
