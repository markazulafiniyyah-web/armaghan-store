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
  'Roman Bosky',
  'Boski & Silk',
  'Cotton Suiting',
  'Wash & Wear',
  'Ladies Collection',
  'Stitched',
  'Bundles & Deals',
  'Accessories',
];

export const products = [
  // ======================= ROMAN BOSKY =======================
  {
    slug: 'roman-bosky-classic',
    images: ['/products/roman-bosky-1.jpg'],
    name: 'Roman Bosky Unstitched Suit',
    category: 'Roman Bosky',
    fabric: 'Roman Bosky (4 season)',
    price: 1599,
    compareAtPrice: 2200,
    badge: 'Hot sale',
    featured: true,
    short: 'The famous Roman Bosky — 60+ colours, 4-season comfort, only Rs 1,599.',
    description:
      'Roman Bosky is the fabric our customers ask for by name — a smooth, light suiting that drapes neatly, resists creasing and works in every season. Sold as a full unstitched suit piece with matching trouser length. At Rs 1,599 it is the best-value suit in the shop, and the colour range is the widest we keep.',
    highlights: [
      'Only Rs 1,599 per suit piece',
      '60+ colours available (ask on WhatsApp)',
      'Smooth 4-season Bosky weave',
      'Crease-resistant and colour-fast',
      'Shirt + trouser length included',
    ],
    care: 'Machine wash cold, dry in shade, medium iron.',
    colors: ['Boski Cream', 'Charcoal Grey', 'Navy Blue', 'Bottle Green', 'Maroon', 'Mustard', 'Steel Grey', 'Wine'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [14, 10, 8],
      [12, 9, 7],
      [15, 11, 8],
      [10, 8, 6],
      [9, 7, 5],
      [8, 6, 4],
      [11, 8, 6],
      [7, 5, 3],
    ],
  },
  {
    slug: 'hand-made-embroidery-bosky',
    images: ['/products/embroidered-bosky-1.jpg'],
    name: 'Hand-Made Embroidery Bosky',
    category: 'Roman Bosky',
    fabric: 'Bosky with hand embroidery',
    price: 4950,
    compareAtPrice: 6200,
    badge: 'Hand embroidered',
    featured: true,
    short: 'Exquisitely hand-embroidered Bosky — the showpiece of the collection.',
    description:
      'Hand embroidery worked onto smooth Bosky fabric by Pakistani craftsmen — a rich border and front panel that turn a simple suit into a wedding-grade outfit. Limited pieces per design; once a pattern is gone it is gone. Ideal for Nikah, Eid and formal evenings.',
    highlights: [
      'Hand embroidery on Bosky base',
      'Rich border + front panel work',
      'Limited pieces per design',
      'Wedding & Eid quality',
    ],
    care: 'Dry clean only.',
    colors: ['Maroon', 'Wine', 'Bottle Green', 'Navy Blue'],
    sizes: ['3 m embroidered + 1.5 m trouser'],
    stock: [
      [4],
      [3],
      [3],
      [2],
    ],
  },
  {
    slug: 'roman-bosky-bundle-2-suits',
    name: 'Roman Bosky Bundle — 2 Suits',
    category: 'Bundles & Deals',
    fabric: 'Roman Bosky (4 season)',
    price: 3100,
    compareAtPrice: 3198,
    badge: '2 suits deal',
    featured: false,
    short: '2 Roman Bosky suits for only Rs 3,100 — pick any colours.',
    description:
      'The Roman Bosky family deal: two full unstitched suit pieces for Rs 3,100. Choose any two colours from the Roman Bosky range (60+ available — message us for the full shade card). Perfect for brothers, cousins, or stocking up for the season.',
    highlights: [
      '2 full suit pieces — Rs 3,100 only',
      'Any 2 colours of your choice',
      'Same quality as single suits',
      'Bigger bundle? 3 suits Rs 4,500 · 4 suits Rs 5,900',
    ],
    care: 'Machine wash cold, dry in shade.',
    colors: ['Boski Cream', 'Charcoal Grey', 'Navy Blue'],
    sizes: ['2 suits'],
    stock: [
      [10],
      [10],
      [10],
    ],
  },
  {
    slug: 'roman-bosky-bundle-3-suits',
    name: 'Roman Bosky Bundle — 3 Suits',
    category: 'Bundles & Deals',
    fabric: 'Roman Bosky (4 season)',
    price: 4500,
    compareAtPrice: 4797,
    badge: '3 suits deal',
    featured: true,
    short: '3 Roman Bosky suits for only Rs 4,500 — our most popular deal.',
    description:
      'Three full unstitched Roman Bosky suit pieces for Rs 4,500 — the deal people come back for. Mix the colours however you like; each suit is the same smooth 4-season Bosky weave with shirt and trouser length included.',
    highlights: [
      '3 full suit pieces — Rs 4,500 only',
      'Mix any colours from the shade card',
      'Same quality as single suits',
      '4-suit bundle also available at Rs 5,900',
    ],
    care: 'Machine wash cold, dry in shade.',
    colors: ['Boski Cream', 'Charcoal Grey', 'Navy Blue', 'Bottle Green'],
    sizes: ['3 suits'],
    stock: [
      [12],
      [12],
      [12],
      [12],
    ],
  },
  {
    slug: 'roman-bosky-bundle-4-suits',
    name: 'Roman Bosky Bundle — 4 Suits',
    category: 'Bundles & Deals',
    fabric: 'Roman Bosky (4 season)',
    price: 5900,
    compareAtPrice: 6396,
    badge: '4 suits deal',
    featured: false,
    short: '4 Roman Bosky suits for Rs 5,900 — best wholesale-style value.',
    description:
      'Four full unstitched Roman Bosky suit pieces for Rs 5,900. The best per-suit price we offer on the retail shop — ideal for families and small shop orders. Need more than four? Ask us for wholesale rates.',
    highlights: [
      '4 full suit pieces — Rs 5,900 only',
      'Lowest per-suit price',
      'Ideal for families & shop orders',
      'Wholesale rates available above 6 pieces',
    ],
    care: 'Machine wash cold, dry in shade.',
    colors: ['Boski Cream', 'Charcoal Grey', 'Navy Blue'],
    sizes: ['4 suits'],
    stock: [
      [8],
      [8],
      [8],
    ],
  },

  // ======================= BOSKI & SILK =======================
  {
    slug: 'china-boski-12-pound',
    images: ['/products/china-boski-1-card.jpg', '/products/china-boski-2-card.jpg'],
    name: 'China Boski — 12 Pound (AAA Grade)',
    category: 'Boski & Silk',
    fabric: 'Boski (fine cotton) — 12 pound, China',
    price: 3000,
    compareAtPrice: 3000, // same as price = no "was" price shown
    badge: 'AAA grade',
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
    colors: ['Boski Cream'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [10, 6, 4], // Boski Cream
    ],
  },
  {
    slug: 'original-china-silk-6-pound',
    images: ['/products/china-silk-1.jpg'],
    name: 'Original China Silk Bosky — 6 Pound',
    category: 'Boski & Silk',
    fabric: 'China silk Bosky — 6 pound',
    price: 2650,
    compareAtPrice: 3200,
    badge: 'Original',
    featured: true,
    short: 'Lustrous original China silk Bosky in 6 pound — the silky one.',
    description:
      'Original China silk Bosky with a visible glossy sheen and a feather-light 6 pound hand. It flows rather than stiffens — the fabric of choice for summer functions and anyone who likes a dressy shine without weight. 100% original China lot, not the local copy.',
    highlights: [
      'Original China silk — 6 pound',
      'Soft glossy sheen',
      'Feather light and cool',
      'Dressy enough for functions',
    ],
    care: 'Dry clean recommended. Cool iron on reverse.',
    colors: ['Ivory', 'Boski Cream', 'Powder Blue', 'Lilac'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [8, 6, 4],
      [9, 7, 5],
      [6, 4, 3],
      [5, 3, 2],
    ],
  },

  // ======================= COTTON SUITING =======================
  {
    slug: 'patal-cotton-pure',
    images: ['/products/patal-cotton-1.jpg'],
    name: 'Patal Cotton — 100% Pure',
    category: 'Cotton Suiting',
    fabric: 'Patal cotton (100% pure)',
    price: 2350,
    compareAtPrice: 2800,
    badge: 'Pure cotton',
    featured: true,
    short: 'Authentic 100% pure Patal cotton — affordable, breathable, honest fabric.',
    description:
      'Real Patal cotton — 100% pure, no blend, no shortcuts. A matte, breathable weave that softens with every wash and stays comfortable through Pakistani summers. At Rs 2,350 it is the honest everyday suit: office, market run, Friday prayers.',
    highlights: [
      '100% pure cotton — no blend',
      'Breathable summer weave',
      'Softens with every wash',
      'Only Rs 2,350',
    ],
    care: 'Machine wash warm, dry in shade, hot iron.',
    colors: ['Off White', 'Sand', 'Powder Blue', 'Sea Green', 'Peach'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7],
      [10, 8, 6],
      [9, 7, 5],
      [8, 6, 4],
      [7, 5, 3],
    ],
  },
  {
    slug: 'alpine-soft-cotton',
    name: 'Alpine Soft Cotton Suit',
    category: 'Cotton Suiting',
    fabric: 'Alpine soft cotton',
    price: 1899,
    compareAtPrice: 2400,
    badge: 'Soft touch',
    featured: false,
    short: 'Alpine soft cotton — the gentle, everyday weave at a friendly price.',
    description:
      'Alpine soft cotton lives up to its name: a gentle, smooth hand-feel with a clean matte finish. Light enough for daily wear, solid enough to hold a press all day. A great school-run, office and everyday fabric.',
    highlights: ['Soft smooth hand-feel', 'Light everyday weight', 'Holds a press', 'Great value at Rs 1,899'],
    care: 'Machine wash cold, dry in shade.',
    colors: ['Steel Grey', 'Indigo', 'Olive', 'Cream', 'Black'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [9, 7, 5],
      [10, 8, 6],
      [8, 6, 4],
      [11, 8, 6],
      [7, 5, 3],
    ],
  },
  {
    slug: 'premium-khaddar-suit',
    images: ['/products/premium-khaddar-1.jpg'],
    name: 'Premium Khaddar Winter Suit',
    category: 'Cotton Suiting',
    fabric: 'Khaddar (cotton)',
    price: 3950,
    compareAtPrice: 4600,
    badge: 'Winter pick',
    featured: false,
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
    category: 'Cotton Suiting',
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

  // ======================= WASH & WEAR =======================
  {
    slug: 'shahi-toyobo-wash-n-wear',
    name: 'Shahi Toyobo Wash & Wear',
    category: 'Wash & Wear',
    fabric: 'Toyobo wash & wear',
    price: 2150,
    compareAtPrice: 2700,
    badge: 'Shahi Toyobo',
    featured: true,
    short: 'Shahi Toyobo wash & wear — the premium crease-free classic.',
    description:
      'Shahi Toyobo is the premium grade of wash & wear — smoother, denser and more colour-fast than the standard market lot. It shakes out almost crease-free, needs barely any ironing and keeps its shade through the season. The suit for people who hate ironing.',
    highlights: [
      'Premium Toyobo grade',
      'Almost crease-free — barely needs ironing',
      'Colour-fast and shrink-resistant',
      'All-season weight',
    ],
    care: 'Machine wash, hang to dry, light iron if needed.',
    colors: ['Charcoal Grey', 'Navy Blue', 'Steel Grey', 'Black', 'Indigo'],
    sizes: ['2.5 m', '4 m', '4.5 m'],
    stock: [
      [12, 9, 7],
      [14, 10, 8],
      [10, 8, 6],
      [11, 8, 6],
      [8, 6, 4],
    ],
  },
  {
    slug: 'royal-wash-n-wear-unstitched',
    images: ['/products/royal-wash-n-wear-1.jpg', '/products/royal-wash-n-wear-2.jpg'],
    name: 'Royal Wash & Wear Unstitched Suit',
    category: 'Wash & Wear',
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

  // ======================= LADIES COLLECTION =======================
  {
    slug: 'lawn-3-piece-summer-suit',
    name: 'Lawn 3-Piece Summer Suit',
    category: 'Ladies Collection',
    fabric: 'Printed lawn (cotton)',
    price: 4290,
    compareAtPrice: 5100,
    badge: 'Summer',
    featured: false,
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
    category: 'Ladies Collection',
    fabric: 'Cambric cotton',
    price: 5850,
    compareAtPrice: 6800,
    badge: 'Featured',
    featured: false,
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

  // ======================= STITCHED =======================
  {
    slug: 'ready-to-wear-kurta',
    name: 'Ready to Wear Cotton Kurta',
    category: 'Stitched',
    fabric: 'Cotton blend',
    price: 2950,
    compareAtPrice: 3400,
    badge: 'Stitched',
    featured: false,
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
    category: 'Stitched',
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
    slug: 'kids-eid-suit',
    name: 'Kids Cotton Eid Suit',
    category: 'Stitched',
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

  // ======================= ACCESSORIES =======================
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
