// ---------------------------------------------------------------------------
// PRODUCT DATA  —  replace these demo items with your real stock.
//
// For every product:
//   colors : list of colour NAMES (must match names in data/site.js COLOR_HEX)
//   sizes  : list of size / cut-length labels
//   stock  : a grid of available pieces.
//            ONE ROW PER COLOUR (same order as `colors`)
//            ONE COLUMN PER SIZE  (same order as `sizes`)
//            stock: [ [ 6, 4, 2 ],   <-- row for colors[0]
//                      [ 8, 5, 3 ],   <-- row for colors[1]
//                      [ 5, 0, 1 ] ]  <-- row for colors[2]
//
// 0 means sold out. Every colour + size combination gets its own SKU
// automatically, so stock is counted per variant — no database needed.
//
// Set an item `archived: true` to hide it from the shop without deleting it.
// ---------------------------------------------------------------------------

export const CATEGORIES = [
  'Men – Unstitched',
  'Men – Stitched',
  'Women – Unstitched',
  'Women – Stitched',
  'Kidswear',
  'Accessories',
];

export const products = [
  {
    slug: 'china-boski-12-pound',
    images: ['/products/china-boski-1-card.jpg', '/products/china-boski-2-card.jpg'],
    name: 'China Boski — 12 Pound (AAA Grade)',
    category: 'Men – Unstitched',
    fabric: 'Boski (fine cotton) — 12 pound, China',
    price: 3000,
    compareAtPrice: 3000, // same as price = no "was" price shown
    badge: 'New arrival',
    featured: true,
    short: 'The creamy China Boski our regulars ask for by name — light, smooth and sharp on the press.',
    description:
      'China Boski in the 12 pound lot, AAA grade — a fine, creamy off-white weave with a soft sheen that stays cool on the body and takes a crisp press. The selvedge carries the mill marking and a slim blue edge line, which is the quickest way to tell this lot from the thinner copies in the market. Sold unstitched by the suit length, so you can get it cut to your own measurement.',
    highlights: [
      '12 pound weight, AAA grade (China)',
      'Fine creamy weave with a soft sheen',
      'Slim blue line along the selvedge',
      'Cool for summer, presses sharp',
      'Sold unstitched by the suit length',
    ],
    care: 'Gentle hand wash or dry clean for the first wash. Iron on medium heat, inside out.',
    // NOTE: these are starting numbers. Set your real counts in /admin and press
    // "Download stock.json", then save that file over data/stock.json.
    colors: ['Boski Cream'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [10, 6, 4], // Boski Cream
    ],
  },
  {
    slug: 'royal-wash-n-wear-unstitched',
    // Optional real photos. Add up to 4 — the first one is used on the cards.
    // Leave the list empty (or remove it) and the site shows a colour swatch instead.
    images: ['/products/royal-wash-n-wear-1.jpg', '/products/royal-wash-n-wear-2.jpg'],
    name: 'Royal Wash & Wear Unstitched Suit',
    category: 'Men – Unstitched',
    fabric: 'Wash & Wear (poly-viscose)',
    price: 3450,
    compareAtPrice: 4200,
    badge: 'Best seller',
    featured: true,
    short: 'Soft, shrink-resistant wash & wear suit piece — the everyday classic.',
    description:
      'A smooth, wrinkle-resistant wash & wear fabric with a clean matte finish. It holds its shape after washing, takes a press beautifully and is comfortable enough for daily wear, office and Eid. Sold as a suit piece you can get stitched to your own measurements.',
    highlights: [
      'Suit piece with matching trouser length',
      'Shrink-resistant and colour-fast finish',
      'Suitable for all seasons',
      'Machine washable',
    ],
    care: 'Gentle machine wash inside out, dry in shade, medium-hot iron.',
    colors: ['Charcoal Grey', 'Navy Blue', 'Beige'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [6, 4, 2], // Charcoal Grey
      [8, 5, 3], // Navy Blue
      [5, 2, 1], // Beige
    ],
  },
  {
    slug: 'premium-khaddar-suit',
    images: ['/products/premium-khaddar-1.jpg'],
    name: 'Premium Khaddar Winter Suit',
    category: 'Men – Unstitched',
    fabric: 'Khaddar (cotton)',
    price: 3950,
    compareAtPrice: 4600,
    badge: 'Winter pick',
    featured: true,
    short: 'Warm, breathable pure cotton khaddar for the cold months.',
    description:
      'Woven from pure cotton with a slightly textured hand-feel, our premium khaddar keeps you warm without feeling heavy. A dependable choice for December and January — and it only gets softer with every wash.',
    highlights: ['Pure cotton khaddar', 'Warm yet breathable', 'Natural texture', 'Colour-fast dye'],
    care: 'Hand wash or gentle machine wash, dry in shade.',
    colors: ['Charcoal Grey', 'Bottle Green', 'Brown'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [4, 3, 2],
      [5, 4, 2],
      [3, 2, 0],
    ],
  },
  {
    slug: 'classic-white-shirting',
    name: 'Classic White Shirting',
    category: 'Men – Unstitched',
    fabric: 'Cotton-poly shirting',
    price: 1850,
    compareAtPrice: 2200,
    badge: '',
    featured: false,
    short: 'Crisp white shirting that stays bright wash after wash.',
    description:
      'A tight, even weave that presses sharp and resists creasing through the day. One of our most repeated orders — ideal for office shirts, and it matches everything you already own.',
    highlights: ['Crisp matte finish', 'Easy-press weave', 'Colour-locked white', '48-inch width'],
    care: 'Machine wash with similar whites, warm iron.',
    colors: ['Off White', 'Sky Blue', 'Black'],
    sizes: ['4 m', '5 m'],
    stock: [
      [12, 9],
      [7, 5],
      [3, 1],
    ],
  },
  {
    slug: 'ready-to-wear-kurta',
    name: 'Ready to Wear Cotton Kurta',
    category: 'Men – Stitched',
    fabric: 'Cotton blend',
    price: 2950,
    compareAtPrice: 3400,
    badge: 'Stitched',
    featured: true,
    short: 'Neatly stitched, ready to wear straight out of the bag.',
    description:
      'A clean, straight-cut kurta with a band collar and a matched button placket — stitched in our own unit so the fit and finishing stay consistent. Perfect for Eid, Friday prayers and everyday wear.',
    highlights: ['Band collar, straight cut', 'Reinforced side slits', 'Pre-shrunk fabric', 'Ready stitched'],
    care: 'Machine wash cold, hang dry, iron on reverse.',
    colors: ['Off White', 'Sky Blue', 'Mustard', 'Teal'],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: [
      [4, 6, 5, 3],
      [2, 5, 4, 2],
      [1, 3, 2, 1],
      [0, 2, 3, 2],
    ],
  },
  {
    slug: 'midnight-shirt-trouser-suit',
    name: 'Midnight Shirt & Trouser Suit (2 pc)',
    category: 'Men – Stitched',
    fabric: 'Blended suiting',
    price: 6750,
    compareAtPrice: 7900,
    badge: 'Formal',
    featured: false,
    short: 'A quietly formal two-piece that wears light and sits neat.',
    description:
      'Tailored two-piece suit in a soft blended suiting fabric — light enough for long days, structured enough to look sharp. Straight-stitched trouser with a firm waistband, pockets and a matching blazer.',
    highlights: ['Two-piece stitched suit', 'Soft-shoulder stitching', 'Wrinkle resistant', 'Fully finished seams'],
    care: 'Dry clean recommended.',
    colors: ['Navy Blue', 'Black', 'Charcoal Grey'],
    sizes: ['M', 'L', 'XL'],
    stock: [
      [3, 4, 2],
      [5, 3, 2],
      [2, 2, 1],
    ],
  },
  {
    slug: 'lawn-3-piece-summer-suit',
    name: 'Lawn 3-Piece Summer Suit',
    category: 'Women – Unstitched',
    fabric: 'Printed lawn (cotton)',
    price: 4290,
    compareAtPrice: 5100,
    badge: 'Summer',
    featured: true,
    short: 'Airy printed lawn with a matching dupatta — unstitched 3 piece.',
    description:
      'Light, breathable lawn with a fresh digital print and a soft matching dupatta. Unstitched so you can choose your own cut, and generous in length so you decide the style.',
    highlights: ['3 piece: shirt, dupatta, trouser', 'Breathable printed lawn', 'Soft cotton dupatta', 'Generous lengths'],
    care: 'Hand wash separately first time, dry in shade.',
    colors: ['Dusty Rose', 'Powder Blue', 'Lilac', 'Mustard'],
    sizes: ['2 piece', '3 piece'],
    stock: [
      [5, 3],
      [4, 4],
      [3, 2],
      [2, 1],
    ],
  },
  {
    slug: 'embroidered-cambric-suit',
    name: 'Embroidered Cambric 3-Piece',
    category: 'Women – Unstitched',
    fabric: 'Cambric cotton',
    price: 5850,
    compareAtPrice: 6800,
    badge: 'Featured',
    featured: true,
    short: 'Fine thread embroidery on smooth cambric — dressy without the fuss.',
    description:
      'Delicate machine embroidery across the front panel on a smooth cambric base, with a printed dupatta and a solid trouser to balance it. Comes packed in a printed box — good enough to gift as it is.',
    highlights: ['Embroidered front panel', 'Printed dupatta', 'Gift-ready box packing', 'Soft cambric base'],
    care: 'Dry clean or very gentle hand wash.',
    colors: ['Cream', 'Maroon', 'Teal', 'Black'],
    sizes: ['3 piece', '3 piece + trouser extra'],
    stock: [
      [3, 2],
      [2, 1],
      [3, 2],
      [0, 0],
    ],
  },
  {
    slug: 'kids-eid-suit',
    name: 'Kids Cotton Eid Suit',
    category: 'Kidswear',
    fabric: 'Soft cotton',
    price: 2450,
    compareAtPrice: 2950,
    badge: 'Kids',
    featured: false,
    short: 'Soft cotton two-piece for kids — meant to be played in.',
    description:
      'Rounded neck, elastic waist and a fabric that survives mud, mango juice and everything else. Cut a little roomy so it lasts a season longer.',
    highlights: ['Skin-friendly cotton', 'Elasticated waist', 'Roomy comfortable cut', 'Machine washable'],
    care: 'Machine wash warm, tumble dry low.',
    colors: ['Sky Blue', 'Rust', 'Bottle Green'],
    sizes: ['2–3 yr', '4–5 yr', '6–7 yr', '8–9 yr'],
    stock: [
      [4, 4, 3, 2],
      [2, 3, 2, 1],
      [3, 2, 2, 0],
    ],
  },
  {
    slug: 'cotton-mens-handkerchief-set',
    name: 'Cotton Handkerchief Set (Pack of 6)',
    category: 'Accessories',
    fabric: 'Soft cotton',
    price: 950,
    compareAtPrice: 1200,
    badge: '',
    featured: false,
    short: 'A simple, useful six-pack in assorted shades.',
    description:
      'Mid-weight cotton handkerchiefs with hand-finished hems, packed as a mixed set of six. An easy add-on with any order.',
    highlights: ['Pack of 6', 'Hand-finished hem', 'Assorted shades', 'Quick add-on'],
    care: 'Machine wash with lights.',
    colors: ['Off White', 'Sky Blue', 'Beige'],
    sizes: ['Standard'],
    stock: [
      [20],
      [14],
      [9],
    ],
  },
];
