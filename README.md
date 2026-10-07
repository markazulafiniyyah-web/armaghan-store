# Armaghan Store — kapra &amp; fabric website

A **Next.js 14** storefront that is exported as **fully static files** and published on
**GitHub Pages**. There is **no database and no server**: stock is counted from a data file
plus the visitor's own browser, and every order is handed over to **WhatsApp**.

| | |
|---|---|
| Shop | Armaghan Store — Main Bazaar, Vihari, Punjab, Pakistan |
| Owner | Qari Ali Husnain Aslam |
| WhatsApp / phone | [+92 327 4934992](https://wa.me/923274934992) |
| Currency | PKR (Rs) |
| Refunds | 20% deduction on change-of-mind refunds — full policy page included |

---

## Pages

| Route | What it is |
|---|---|
| `/` | Hero, trust strip, **bulk offer band**, featured pieces, full shop grid with search + category filter + sorting |
| `/products/[slug]` | Product page: **named colour attributes**, size buttons that show how many pieces are left, live stock counter, Add to cart, *Order on WhatsApp* |
| `/about` | About page: the shop's story, how we work, how the shop grew, how ordering works |
| `/refund-policy` | Refund & return policy — includes the **20% deduction** with worked examples |
| `/privacy-policy` | Privacy policy — explains that no data leaves the browser, what is stored locally and for how long |
| `/cart` | Cart with the **bulk discount applied automatically**, delivery details form → builds a complete WhatsApp order message |
| `/admin` | Private stock counter (not linked from the shop) to export new stock numbers |
| `404.html` | Friendly not-found page (GitHub Pages serves this automatically) |

---

## Quick start (local)

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # writes the static site into ./out
npm run preview    # serves ./out at http://localhost:3000
```

---

## Deploying to GitHub Pages

1. Create a repository, for example `armaghan-store`, and push this folder to the `main` branch.
2. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Push a commit. The workflow in `.github/workflows/deploy.yml` builds the site and publishes
   the `out/` folder. Your address will be one of:
   * `https://<user>.github.io/armaghan-store/` (project page — `basePath` is set automatically)
   * `https://<user>.github.io/` (user page — no `basePath`, handled automatically too)
4. Optional: in the workflow file, replace `NEXT_PUBLIC_SITE_URL` (used by `sitemap.xml`) with
   your real address.

Nothing else is needed — no API keys, no database, no server costs. `public/.nojekyll` is already
in place so Pages does not hide the `_next` folder.

---

## Adding your real data (this is where you come in)

**Everything you will want to change lives in two files.**

### 1. `data/site.js` — shop details

```js
whatsappNumber: '923274934992',   // digits only, country code, no "+"
phoneDisplay:   '+92 327 4934992',
email: 'hello@armaghanstore.pk',  // ← replace with your real email
addressLine: 'Main Bazaar',
city: 'Vihari',
deliveryFee: 250,
freeDeliveryOver: 5000,
refundCutPercent: 20,
refundWindowDays: 7,
```

`COLOR_HEX` at the bottom of the same file maps every **colour name** to a swatch colour.
Add a line for any new colour you use.

### 2. `data/products.js` — products with colour + size stock

```js
{
  slug: 'royal-wash-n-wear-unstitched',   // becomes the page URL
  name: 'Royal Wash & Wear Unstitched Suit',
  category: 'Men – Unstitched',
  fabric: 'Wash & Wear (poly-viscose)',
  price: 3450,
  compareAtPrice: 4200,                   // set equal to price to hide the "was" price
  badge: 'Best seller',
  featured: true,                         // shows in "Featured this week"
  short: '…',                             // one line for the cards
  description: '…',                        // the paragraph on the product page
  highlights: ['…', '…'],
  care: '…',

  colors: ['Charcoal Grey', 'Navy Blue', 'Beige'],   // named colour attributes
  sizes:  ['2.5 m', '4 m', '4.5 m'],
  stock: [                                            // ONE ROW PER COLOUR
    [6, 4, 2],                                        //  Charcoal Grey
    [8, 5, 3],                                        //  Navy Blue
    [5, 2, 1],                                        //  Beige
  ],                                                  //  one column per size
}
```

Rules to remember:

* `stock` is a grid — **rows = colours, columns = sizes, in the same order** as the two lists.
* A `0` makes that colour/size **sold out**: the size button disables itself and the card shows
  "Sold out".
* Every colour + size combination gets its own **SKU** automatically
  (`royal-wash-n-wear-unstitched--c1s2`), so stock is counted per variant.
* Set `archived: true` on a product to hide it without deleting it.
* Add as many products as you like — new `data/products.js` entries create new pages at build time.

### 3. Product photos

Put your photos in **`public/products/`** and list them on the product:

```js
images: ['/products/royal-wash-n-wear-1.jpg', '/products/royal-wash-n-wear-2.jpg'],
```

The first photo is used on the shop card; the product page turns them into a gallery with
thumbnails. Up to 4 look best — keep them around 1200×900 px and under ~300 KB so the site
stays fast. Products without photos show a fabric swatch built from their named colours
(the two demo products ship with sample photos so you can see it working — delete the file
paths when you add your own).

### Editing stock quickly, later on

Once you have changed a few numbers on `/admin`, press **Download stock.json** and save it
straight over `data/stock.json`. Any SKU listed there wins over the grid in `data/products.js`
(that is what the placeholder file in `data/stock.json` is for). Commit, and the published
site follows — handy when you have sold a lot in one day and do not want to re-edit the grid.

### 4. Test it

```bash
npm test                       # 38 checks on stock, cart, bulk offers, WhatsApp + refund maths
npm run preview                # then, in another terminal:
npm i -D playwright && npx playwright install chromium
npm run e2e                    # walks a real purchase in a browser
```

---

## How the "no database" stock handler works

1. **`base`** — the pieces you physically hold, written in `data/products.js`. This file ships with
   the site, so it is the shared source of truth for every visitor.
2. **`sold`** — pieces already ordered *from this browser*, kept in `localStorage`
   (`armaghan.stock`). This stops the same shopper counting a piece twice.
3. **available = base − sold** (never below zero) → drives the badges, the size buttons and the
   quantity ceiling.
4. **`/admin`** — type the real numbers, then **Download stock.json** / **Copy as JSON** and paste
   them back into `data/products.js`. Commit → GitHub Actions rebuilds → everyone sees the new
   stock. It also lists the orders placed from that device (order references sent to WhatsApp).

Trade-off to understand: because each browser keeps its own "sold" record, two customers on two
different phones can still both add the last piece to the cart. The WhatsApp confirmation step is
the real gate — you always confirm stock before packing. That is the honest, no-database way to do
it, and it is written in the docs on the `/admin` page so nobody forgets.

---

## Project structure

```
armaghan-store/
├─ app/
│  ├─ layout.jsx            shell: header, footer, WhatsApp button, SEO metadata
│  ├─ globals.css           all styling (no CSS framework, no external fonts)
│  ├─ page.jsx              home + shop grid
│  ├─ products/[slug]/      product page (pre-rendered for every product)
│  ├─ about/                about page
│  ├─ refund-policy/        refund & return policy (20% deduction)
│  ├─ privacy-policy/       privacy policy
│  ├─ cart/                 cart + WhatsApp checkout
│  ├─ admin/                private stock counter / export
│  ├─ not-found.jsx         -> 404.html
│  └─ sitemap.js            sitemap.xml
├─ components/              Header, Footer, ProductCard, ProductDetail, ShopGrid, BulkOffer,
│                           CartView, AdminStock, StockBadge, WhatsAppFab
├─ lib/
│  ├─ offers.js             the 5% / 10% / 15% bulk tiers
│  ├─ cart.js               cart in localStorage + WhatsApp message
│  ├─ stock.js              the stock ledger (base − sold), no database
│  ├─ products.js           colour/size → variant + SKU builder
│  ├─ format.js             Rs formatting, refund maths, WhatsApp links
│  └─ useStock.js           React hooks for live stock
├─ data/
│  ├─ site.js               shop settings  ← edit me
│  └─ products.js           products + stock grid ← edit me
├─ public/                  favicon.svg, robots.txt, .nojekyll, products/ (photos)
└─ .github/workflows/deploy.yml   build + publish to GitHub Pages
```

---

## Bulk offers & wholesale

The offer lives in one place — `data/site.js`:

```js
bulkTiers: [
  { qty: 2, percent: 5 },
  { qty: 4, percent: 10 },
  { qty: 6, percent: 15 },
],
bulkFinePrint: 'Discount applies to the pieces in one order — suits, suit pieces, kurtas or accessories.',
wholesaleNote: 'Ordering more than 6 pieces, or buying for a shop? Contact us to get clothes at wholesale rates.',
```

What happens with it:

* **Home page** — a "Buy more pieces, pay less on each" band showing the three tiers, a live nudge
  ("You have 3 pieces in the cart — add 1 more for 10% off") and an *Ask for wholesale rates*
  WhatsApp button.
* **Every product page** — a compact strip under the buy buttons:
  `5% off on 2 pieces · 10% off on 4 pieces · 15% off on 6 pieces · Wholesale rates →`.
* **Cart** — the tier is chosen from the number of pieces in the order, the discount gets its own
  green line (`Bulk discount (10% on 4 pieces)  − Rs 1,200`), and the total, the free-delivery
  threshold and the WhatsApp message all use the discounted amount. The message also nudges the
  customer toward the next tier, and repeats the wholesale line once they are at the top.

Worked example: 4 × China Boski at Rs 3,000 → subtotal Rs 12,000, 10% off = − Rs 1,200, delivery
free (over Rs 5,000) → **Rs 10,800 payable**. That is exactly what the customer sees and exactly
what arrives in your WhatsApp.

Change the tiers, or add a fourth (`{ qty: 10, percent: 20 }`), and every page, the cart maths and
the WhatsApp message follow automatically. If you would rather count *suits* than *pieces* (a
2.5 m + 4 m pair counting as one), say the word and I will switch the counter.

---

## SEO

Everything sits in three files, so there is one place to change anything:

| File | What it holds |
|---|---|
| `lib/seo.js` | the site root, keyword sets per page type, `productKeywords()`, `collectionKeywords()` and `buildMetadata()` |
| `lib/schema.js` | the JSON-LD builders (store, website, product, breadcrumb, item list, FAQ) |
| `components/LiveSeo.jsx` | rewrites canonical / OG / schema URLs from the browser's address bar at runtime |

### What every page gets

* a unique **title** and **description** written for search, not for the layout
* a **keyword set** built from what people actually type — *kapra online*, *china boski*,
  *khaddar suit*, *kapra wholesale rate*, plus city terms (`kapra delivery Multan`, …)
* a **canonical URL** (`en-PK` + `x-default` alternates)
* **Open Graph + Twitter** cards, with a real 1200×630 image (`public/og-image.png`) —
  product pages use their own photo as the social card instead
* **structured data**: `ClothingStore`/`LocalBusiness` (address, hours, payment, delivery
  areas, catalogue) on every page, `WebSite`, `Product` + `Offer` + shipping details +
  breadcrumbs on product pages, `ItemList` on the shop and collection pages, and a
  **`FAQPage` with 7 questions** on the refund page for rich results
* `robots` directives — `/cart` and `/admin` are `noindex`, everything else is
  `index, follow` with `max-image-preview: large`

### Pages that exist for search

Five **collection pages** (`/collection/men-unstitched/`, `/collection/women-unstitched/`,
`/collection/kids-wear/`, …) give each category its own landing page with an intro,
price range and item count — these are usually the pages that rank for "mens unstitched
suit price" style queries.

### The domain is read from the address bar

The site is static, so at build time the address is only a guess (the GitHub Pages
workflow passes the right one). On every page load `LiveSeo` reads
`window.location` and rewrites:

* `<link rel="canonical">` and `og:url`
* `og:image` / `twitter:image` (made absolute)
* the origin inside every JSON-LD block, leaving `schema.org` references untouched

So if the shop later moves to `armaghanstore.pk`, or you open it through a preview URL,
the tags follow the address bar instead of pointing at the old host. The deploy workflow
still writes the correct value at build time, which is what crawlers that do **not** run
JavaScript (WhatsApp link previews, Facebook) will use.

### Verification and submitting to Google

Two optional environment variables are read automatically — set them in
`.github/workflows/deploy.yml` and the meta tags appear:

```yaml
env:
  NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION: your-google-token
  NEXT_PUBLIC_BING_SITE_VERIFICATION: your-bing-token
```

Then, once the site is live:

1. [Google Search Console](https://search.google.com/search-console) → *Add property* → your
   Pages URL → verify → **Sitemaps** → submit `sitemap.xml`.
2. Repeat in [Bing Webmaster Tools](https://www.bing.com/webmasters) if you like.
3. Rich results to watch for: product snippets, FAQ, breadcrumbs — test any page with the
   [Rich Results Test](https://search.google.com/test/rich-results).

### Checking it yourself

```bash
npm run build                       # local build
npm test                            # 38 logic checks
npm run test:seo                    # live-domain rewriting (needs the test server, see the file header)
npm run e2e                         # full purchase journey in a browser
```

The SEO check builds the site for a pretend Pages address, serves it from a different one,
and asserts that canonical, `og:*` and the structured data all follow the address bar —
including that no stale build-domain URL is left behind and that `schema.org` links stay
exactly as they are.

---

## To-do when you send your product list

Nothing below is missing from the site — these are the details only you can fill in:

- [ ] `data/site.js` — your real email, exact street address, opening hours, social links
- [x] **China Boski — 12 Pound (AAA Grade), Rs 3,000** is live with brand photos, colour
      attribute *Boski Cream* and sizes 2.5 m / 4 m / 4.5 m — only the stock counts are placeholders
      (10 / 6 / 4), set them in `/admin`
- [ ] `data/products.js` — replace the remaining 9 demo products with your items (name, fabric,
      price, colours, sizes and the stock grid)
- [ ] `data/site.js` → `COLOR_HEX` — add a line for every colour name you use
- [ ] `public/products/` — drop in your photos and add `images: […]` to each product
- [ ] `data/site.js` — confirm the delivery fee, free-delivery threshold and the refund numbers
- [ ] Push to GitHub and switch Pages on (Settings → Pages → GitHub Actions)
- [ ] After it is live: verify the site in Google Search Console and submit `sitemap.xml`
      (see **SEO** above)

## Notes

* The policies are written for this shop in plain English, based on the details you gave
  (20% refund deduction, 7-day window, WhatsApp support). If you want different windows or
  numbers, change `refundCutPercent`, `refundWindowDays`, `damagedReportHours` and
  `refundProcessing` in `data/site.js` and every page updates itself.
* Prices, product names and photos in the demo data are placeholders — replace them with your
  real list whenever you are ready.
