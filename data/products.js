// ---------------------------------------------------------------------------
// PRODUCT DATA  —  real stock at Armaghan Store, Urdu Bazar, Lahore.
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

export const CATEGORIES = ['Boski', 'Wash & Wear', 'Pure Cotton'];

export const products = [
  // ======================= BOSKI =======================
  {
    slug: 'boski-winter-summer',
    images: ['/products/boski-12-pound-1.jpg'],
    name: 'Boski — Winter & Summer (12 Pound AAA)',
    category: 'Boski',
    fabric: 'Boski — 12 pound, AAA grade',
    price: 3000,
    compareAtPrice: 3000, // same as price = no "was" price shown
    badge: 'Winter & Summer',
    featured: true,
    short: 'AAA-grade 12 pound Boski — light and cool in summer, comfortable in winter. Rs 3,000.',
    description:
      'Our AAA-grade Boski in the 12 pound lot — the creamy, smooth weave with a soft sheen that customers ask for by name. It stays cool in the summer months and carries comfortably through winter, so one suit works all year. The selvedge carries the mill marking, the quickest way to tell this lot from the thinner copies in the market. Sold unstitched as a full suit piece.',
    highlights: [
      '12 pound weight, AAA grade',
      'Comfortable in winter and summer',
      'Fine creamy weave with a soft sheen',
      'Full unstitched suit piece',
      'Only Rs 3,000',
    ],
    care: 'Gentle hand wash or dry clean for the first wash. Iron on medium heat, inside out.',
    colors: ['Boski Cream', 'Off White'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7], // Boski Cream
      [8, 6, 4], // Off White
    ],
  },

  // ======================= WASH & WEAR =======================
  {
    slug: 'wash-n-wear-winter',
    images: ['/products/wash-n-wear-winter-1.jpg'],
    name: 'Wash & Wear — Winter Suit',
    category: 'Wash & Wear',
    fabric: 'Wash & wear (winter weight)',
    price: 2400,
    compareAtPrice: 2400,
    badge: 'Winter',
    featured: true,
    short: 'Winter-weight wash & wear in all colours — smooth, crease-resistant, Rs 2,400.',
    description:
      'Winter-weight wash & wear suiting — a smooth, dense weave that keeps its shape, shakes out almost crease-free and needs barely any ironing. The everyday winter suit at an honest price of Rs 2,400, and the full colour range is on the shelf. Sold unstitched as a full suit piece with matching trouser length.',
    highlights: [
      'Warm winter-weight weave',
      'All colours available',
      'Almost crease-free — barely needs ironing',
      'Colour-fast and shrink-resistant',
      'Only Rs 2,400',
    ],
    care: 'Machine wash, hang to dry, light iron if needed.',
    colors: ['Steel Grey', 'Navy Blue', 'Charcoal Grey', 'Indigo', 'Black', 'Taupe'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7], // Steel Grey
      [14, 10, 8], // Navy Blue
      [10, 8, 6], // Charcoal Grey
      [9, 7, 5], // Indigo
      [11, 8, 6], // Black
      [8, 6, 4], // Taupe
    ],
  },
  {
    slug: 'wash-n-wear-premium',
    images: ['/products/wash-n-wear-premium-1.jpg'],
    name: 'Wash & Wear — Premium Suit',
    category: 'Wash & Wear',
    fabric: 'Wash & wear (premium grade)',
    price: 3300,
    compareAtPrice: 3300,
    badge: 'All colours',
    featured: true,
    short: 'Premium-grade wash & wear — denser, smoother, longer lasting. All colours, Rs 3,300.',
    description:
      'The premium grade of wash & wear — smoother and denser than the standard lot, with a clean matte finish and a press that lasts the day. It holds its shade wash after wash and resists shrinking, which is why regulars keep coming back for it. All colours available. Sold unstitched as a full suit piece.',
    highlights: [
      'Premium-grade wash & wear',
      'All colours available',
      'Denser, smoother weave',
      'Colour-fast and shrink-resistant',
      'Rs 3,300',
    ],
    care: 'Machine wash, hang to dry, medium iron.',
    colors: ['Charcoal Grey', 'Olive', 'Black', 'Taupe', 'Navy Blue', 'Maroon'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7], // Charcoal Grey
      [9, 7, 5], // Olive
      [13, 10, 8], // Black
      [9, 7, 5], // Taupe
      [14, 10, 8], // Navy Blue
      [8, 6, 4], // Maroon
    ],
  },

  // ======================= PURE COTTON =======================
  {
    slug: 'pure-cotton-suit',
    images: ['/products/pure-cotton-1.jpg'],
    name: 'Pure Cotton Suit',
    category: 'Pure Cotton',
    fabric: '100% pure cotton',
    price: 3300,
    compareAtPrice: 3300,
    badge: 'Pure cotton',
    featured: true,
    short: '100% pure cotton in all colours — breathable, honest fabric at Rs 3,300.',
    description:
      'Real 100% pure cotton — no blend, no shortcuts. A matte, breathable weave that softens with every wash and stays comfortable through the whole day. The full colour range is on the shelf, from soft pastels to deep navy and black. Sold unstitched as a full suit piece with matching trouser length.',
    highlights: [
      '100% pure cotton — no blend',
      'All colours available',
      'Breathable and soft on the skin',
      'Softens with every wash',
      'Rs 3,300',
    ],
    care: 'Machine wash warm, dry in shade, hot iron.',
    colors: ['Off White', 'Sand', 'Peach', 'Sage', 'Powder Blue', 'Dusty Rose', 'Mustard', 'Navy Blue'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7], // Off White
      [10, 8, 6], // Sand
      [9, 7, 5], // Peach
      [10, 8, 6], // Sage
      [11, 8, 6], // Powder Blue
      [8, 6, 4], // Dusty Rose
      [9, 7, 5], // Mustard
      [12, 9, 7], // Navy Blue
    ],
  },
];
