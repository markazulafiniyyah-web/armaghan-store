// ---------------------------------------------------------------------------
// Live-domain SEO check.
//
// Proves that canonical, og:url, og:image and the JSON-LD URLs follow the
// domain in the browser's address bar rather than the domain the site was
// built for.
//
//   1. Build for a pretend Pages address:
//        NEXT_PUBLIC_BASE_PATH=/armaghan-store \
//        NEXT_PUBLIC_SITE_URL=https://youruser.github.io/armaghan-store npm run build
//   2. Serve the output under that base path, e.g.
//        mkdir -p /tmp/stage && cp -r out /tmp/stage/armaghan-store
//        npx serve /tmp/stage -l 3100
//   3. node scripts/seo-check.mjs
//
// Override the address under test with LIVE_BASE / BUILD_HOST env vars.
// ---------------------------------------------------------------------------
import { chromium } from 'playwright';

const LIVE = process.env.LIVE_BASE || 'http://localhost:3100/armaghan-store';
const BUILD_HOST = process.env.BUILD_HOST || 'aliarmaghan.github.io';

// The site was BUILT for https://aliarmaghan.github.io/armaghan-store but is
// being SERVED from http://localhost:3100/armaghan-store. If LiveSeo works,
// the canonical/OG/schema URLs must follow the address bar, not the build.
const browser = await chromium.launch({ args: ['--no-sandbox'] });
const page = await browser.newPage();
let fails = 0;
const check = (ok, msg) => { if (!ok) fails++; console.log(`${ok ? '  ✓' : '  ✗ FAIL'} ${msg}`); };

const BASE = LIVE;
const live = LIVE; // live root INCLUDING the deploy base path

for (const [path, label] of [['/', 'home'], ['/products/china-boski-12-pound/', 'product'], ['/collection/men-unstitched/', 'collection']]) {
  console.log(`\n${label}: ${BASE}${path}`);
  await page.goto(`${BASE}${path}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);

  const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
  check(canonical === `${live}${path}`.replace(/\/$/, path === '/' ? '/' : '/'), `canonical follows the address bar: ${canonical}`);

  const ogUrl = await page.getAttribute('meta[property="og:url"]', 'content');
  check(ogUrl === canonical, `og:url matches canonical: ${ogUrl}`);

  const ogImage = await page.getAttribute('meta[property="og:image"]', 'content');
  check(ogImage.startsWith(live) && !ogImage.includes('/armaghan-store/armaghan-store'), `og:image on the live root (no double base path): ${ogImage.slice(0, 66)}…`);

  const blocks = await page.$$eval('script[type="application/ld+json"]', (els) => els.map((e) => e.textContent));
  const joined = blocks.join(' ');
  check(!joined.includes(BUILD_HOST), 'no stale build-domain URLs left in structured data');
  check(joined.includes('schema.org'), 'external schema.org references untouched');
  check(joined.includes(live), 'structured data uses the live domain');
}

console.log('\nSample of the rewritten structured data:');
const home = await page.goto(`${BASE}/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(400);
const schema = await page.$$eval('script[type="application/ld+json"]', (els) =>
  els.map((e) => { try { return JSON.parse(e.textContent); } catch { return null; } }).filter(Boolean));
for (const block of schema) {
  const list = Array.isArray(block) ? block : [block];
  for (const d of list) {
    const t = Array.isArray(d['@type']) ? d['@type'].join('/') : d['@type'];
    const url = d.url || d['@id'] || '';
    if (url) console.log(`  ${t}: ${url}`);
    if (d.image) console.log(`  ${t} image: ${d.image}`);
  }
}

console.log(fails === 0 ? '\nLIVE-DOMAIN SEO REWRITE PASSED\n' : `\n${fails} CHECK(S) FAILED\n`);
await browser.close();
process.exit(fails ? 1 : 0);
