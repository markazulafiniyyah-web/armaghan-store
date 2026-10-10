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
    name: 'Boski — Winter & Summer (12 Pound)',
    category: 'Boski',
    fabric: 'Boski — 12 pound, original China',
    price: 3000,
    compareAtPrice: 3000, // same as price = no "was" price shown
    badge: 'Winter & Summer',
    featured: true,
    short: 'Original 12 pound Boski — light and cool in summer, comfortable in winter. Rs 3,000.',
    description:
      'Our 12 pound Boski — the creamy, smooth fabric our customers ask for by name. It stays cool in the summer and carries comfortably through winter, so one suit works all year. The edge of the cloth has the original China stamp, which is the easiest way to tell it apart from the thinner copies in the market. Sold unstitched as a full suit piece.',
    highlights: [
      '12 pound weight, original China',
      'Comfortable in winter and summer',
      'Soft, creamy colour with a light shine',
      'Full unstitched suit piece',
      'Only Rs 3,000',
    ],
    care: 'Gentle hand wash or dry clean the first time. Iron on medium heat, inside out.',
    colors: ['Boski Cream', 'Off White'],
    sizes: ['2.5 m (shirt)', '4 m (shirt + shalwar)', '4.5 m (full suit)'],
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
    fabric: 'Wash & wear (warm winter fabric)',
    price: 2400,
    compareAtPrice: 2400,
    badge: 'Winter',
    featured: true,
    short: 'Warm winter wash & wear in all colours — does not wrinkle easily. Rs 2,400.',
    description:
      'Wash & wear for the winter — a smooth, warm fabric that keeps its shape and hardly needs ironing. Hang it to dry and it is ready to wear. The everyday winter suit at an honest price of Rs 2,400, and all colours are on the shelf. Sold unstitched as a full suit piece with matching trouser length.',
    highlights: [
      'Warm fabric for winter',
      'All colours available',
      'Hardly needs ironing',
      'Colour does not fade, fabric does not shrink',
      'Only Rs 2,400',
    ],
    care: 'Machine wash, hang to dry, light iron if needed.',
    colors: ['Steel Grey', 'Navy Blue', 'Charcoal Grey', 'Indigo', 'Black', 'Taupe'],
    sizes: ['2.5 m (shirt)', '4 m (shirt + shalwar)', '4.5 m (full suit)'],
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
    slug: 'wash-n-wear-fine',
    images: ['/products/wash-n-wear-fine-1.jpg'],
    name: 'Wash & Wear — Fine Quality Suit',
    category: 'Wash & Wear',
    fabric: 'Wash & wear (fine quality)',
    price: 3300,
    compareAtPrice: 3300,
    badge: 'All colours',
    featured: true,
    short: 'Fine quality wash & wear — thicker, smoother and longer lasting. All colours, Rs 3,300.',
    description:
      'The fine quality of wash & wear — thicker and smoother than the standard cloth, and it lasts longer. It stays neat all day after ironing, the colour stays wash after wash and it does not shrink. This is the one regulars keep coming back for. All colours available. Sold unstitched as a full suit piece.',
    highlights: [
      'Fine quality wash & wear',
      'All colours available',
      'Thicker and smoother than standard',
      'Colour does not fade, fabric does not shrink',
      'Rs 3,300',
    ],
    care: 'Machine wash, hang to dry, medium iron.',
    colors: ['Charcoal Grey', 'Olive', 'Black', 'Taupe', 'Navy Blue', 'Maroon'],
    sizes: ['2.5 m (shirt)', '4 m (shirt + shalwar)', '4.5 m (full suit)'],
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
    short: '100% pure cotton in all colours — soft, airy and easy on the skin. Rs 3,300.',
    description:
      'Real 100% pure cotton — no mixing, no shortcuts. It is soft, lets the skin breathe and gets softer with every wash. The full colour range is on the shelf, from light soft colours to deep navy and black. Sold unstitched as a full suit piece with matching trouser length.',
    highlights: [
      '100% pure cotton — no mixing',
      'All colours available',
      'Soft and airy on the skin',
      'Gets softer with every wash',
      'Rs 3,300',
    ],
    care: 'Machine wash warm, dry in shade, hot iron.',
    colors: ['Off White', 'Sand', 'Peach', 'Sage', 'Powder Blue', 'Dusty Rose', 'Mustard', 'Navy Blue'],
    sizes: ['2.5 m (shirt)', '4 m (shirt + shalwar)', '4.5 m (full suit)'],
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
