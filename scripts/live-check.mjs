// ---------------------------------------------------------------------------
// Live-site verifier — run against the deployed website.
//
//   node scripts/live-check.mjs
//   LIVE_BASE=https://your-domain.com/repo node scripts/live-check.mjs
//
// Checks that the deployed copy really serves: the address-bar canonical,
// assets and product photos, the stock counter, the bulk tier maths, the
// structured data, noindex on /cart, and the sitemap/robots pair.
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const LIVE_BASE = process.env.LIVE_BASE || 'https://markazalmurtaza.localplayer.dev/armaghan-store';
const LIVE = LIVE_BASE;
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
let fails = 0;
const check = (ok, msg) => { if (!ok) fails++; console.log(`${ok ? '  ✓' : '  ✗ FAIL'} ${msg}`); };
const errors = [];
page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
page.on('pageerror', (e) => errors.push(String(e)));

console.log('LIVE SITE:', LIVE);
await page.goto(`${LIVE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

check((await page.title()).includes('Kapra'), `page loads: "${await page.title()}"`);
const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
check(canonical === `${LIVE}/`, `canonical matches the address bar: ${canonical}`);
const og = await page.getAttribute('meta[property="og:image"]', 'content');
check(og === `${LIVE}/og-image.png`, `og:image absolute on the live domain`);

// styles + images really loaded?
const cssLoaded = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
check(cssLoaded !== 'rgba(0, 0, 0, 0)', `stylesheet applied (body bg ${cssLoaded})`);
const fab = await page.locator('.fab').count();
check(fab === 1, 'WhatsApp button rendered');

// product page: photo + stock
await page.goto(`${LIVE}/products/china-boski-12-pound/`, { waitUntil: 'networkidle' });
await page.waitForSelector('.stock-panel');
const photo = await page.locator('.gallery-photo').getAttribute('src');
check(photo.includes('/armaghan-store/products/china-boski-1-card.jpg'), `product photo served from Pages: ${photo}`);
const photoOk = await page.evaluate(async (src) => {
  const r = await fetch(src); return r.ok && (r.headers.get('content-type') || '').includes('image');
}, photo);
check(photoOk, 'product photo returns a valid image');
check((await page.locator('.swatch-name').first().innerText()) === 'Boski Cream', 'colour attribute intact');
check((await page.locator('.stock-panel-main strong').innerText()).includes('available'), `stock counter live: ${await page.locator('.stock-panel-main strong').innerText()}`);

// add to cart -> bulk tier -> whatsapp
for (let i = 0; i < 4; i++) { await page.locator('button:has-text("Add to cart")').click(); await page.waitForTimeout(120); }
await page.goto(`${LIVE}/cart/`, { waitUntil: 'networkidle' });
const summary = await page.locator('.summary').innerText();
check(/Bulk discount \(10% on 4 pieces\)/.test(summary), 'tier 2 auto-applied in production');
check(summary.includes('Rs 10,800'), 'total after discount: Rs 10,800');

// structured data still correct live
const schema = await page.$$eval('script[type="application/ld+json"]', (els) => els.map((e) => e.textContent).join(' '));
check(schema.includes(LIVE), 'structured data uses the live domain');
check(!schema.includes('github.io'), 'no github.io left in structured data');

// vocabulary check needs a product page (the cart page has no Product schema)
await page.goto(`${LIVE}/products/china-boski-12-pound/`, { waitUntil: 'networkidle' });
const productSchema = await page.$$eval('script[type="application/ld+json"]', (els) => els.map((e) => e.textContent).join(' '));
check(productSchema.includes('schema.org/InStock'), 'schema.org vocabulary untouched (InStock)');
check(productSchema.includes('"price":3000'), 'product price in structured data: Rs 3,000');
check(productSchema.includes('China'), 'country of origin recorded for Boski');

// policy pages reachable
for (const p of ['/about/', '/refund-policy/', '/privacy-policy/']) {
  const r = await page.goto(`${LIVE}${p}`, { waitUntil: 'domcontentloaded' });
  check(r.status() === 200, `${p} -> HTTP ${r.status()}`);
}
await page.goto(`${LIVE}/refund-policy/`, { waitUntil: 'networkidle' });
check((await page.locator('.faq-item').count()) === 7, 'FAQ block present (7 questions)');

// cart must stay out of search
const cartHtml = await (await fetch(`${LIVE}/cart/`)).text();
check(/noindex/.test(cartHtml), '/cart is noindex on the live site');

// sitemap + robots live
const sm = await (await fetch(`${LIVE}/sitemap.xml`)).text();
const urls = (sm.match(/<loc>/g) || []).length;
check(urls === 19, `sitemap lists ${urls} URLs`);
check(sm.includes(LIVE), 'sitemap uses the live domain');
const rb = await (await fetch(`${LIVE}/robots.txt`)).text();
check(rb.includes(`${LIVE}/sitemap.xml`), 'robots.txt points at the live sitemap');
check(/Disallow: \/admin\//.test(rb), 'robots.txt keeps /admin/ private');

console.log(errors.length ? `\nconsole errors: ${errors.slice(0, 3).join(' | ')}` : '\nno console errors');
console.log(fails === 0 ? 'LIVE SITE VERIFIED\n' : `${fails} LIVE CHECK(S) FAILED\n`);
await browser.close();
process.exit(fails ? 1 : 0);
