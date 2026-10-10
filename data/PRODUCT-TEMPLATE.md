# Product template — copy this when adding items

Fill one block per product and paste it into the `products` array in `data/products.js`.
You can also just send me this filled in and I will add it for you.

```js
{
  slug: 'unique-url-name',                 // lowercase words with dashes, no spaces
  name: 'Product name as customers know it',
  category: 'Men – Unstitched',            // must be one of the CATEGORIES list
  fabric: 'Wash & Wear (poly-viscose)',
  price: 3450,                             // selling price in rupees
  compareAtPrice: 4200,                    // "was" price; same as price = no discount shown
  badge: 'Best seller',                    // short tag on the photo, or leave ''
  featured: true,                          // shows in "Featured this week"
  short: 'One line for the product cards.',
  description: 'A short paragraph for the product page — the feel of the cloth, who it suits, what is included.',
  highlights: ['Point one', 'Point two', 'Point three'],
  care: 'Washing instructions.',
  images: ['/products/photo-1.jpg', '/products/photo-2.jpg'],   // optional

  colors: ['Navy Blue', 'Beige'],          // names used in data/site.js COLOR_HEX
  sizes:  ['2.5 m', '4 m'],
  stock: [                                 // one row per colour, one column per size
    [6, 4],                                //  Navy Blue: 6 of the 2.5 m, 4 of the 4 m
    [0, 2],                                //  Beige: none of the 2.5 m, 2 of the 4 m
  ],
},
```

## A worked example

Two colours, three sizes, and one combination sold out:

```js
colors: ['Charcoal Grey', 'Maroon'],
sizes:  ['S', 'M', 'L'],
stock: [
  [5, 3, 0],   // Charcoal Grey  → S: 5, M: 3, L: sold out
  [2, 4, 1],   // Maroon         → S: 2, M: 4, L: 1
],
```

That creates six SKUs automatically:

| SKU | Colour | Size | Pieces |
|---|---|---|---|
| `slug--c0s0` | Charcoal Grey | S | 5 |
| `slug--c0s1` | Charcoal Grey | M | 3 |
| `slug--c0s2` | Charcoal Grey | L | 0 → shown as Sold out |
| `slug--c1s0` | Maroon | S | 2 |
| `slug--c1s1` | Maroon | M | 4 |
| `slug--c1s2` | Maroon | L | 1 |

## What I need from you

Send me this and I will wire it in:

1. **Shop details** — full address, email, opening hours, any Facebook / Instagram / TikTok pages.
2. **Products** — for each: name, fabric type, price (and "was" price if any), colours with
   their exact names, sizes, and how many pieces you have of each colour and size.
3. **Photos** — one to four per product (WhatsApp photos are fine, daylight shots look best).
4. **Rules** — delivery fee, free-delivery threshold, and whether the 20% refund cut and
   7-day window should stay as they are.
