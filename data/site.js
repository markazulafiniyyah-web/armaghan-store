// ---------------------------------------------------------------------------
// SITE SETTINGS  —  edit this file first.
// ---------------------------------------------------------------------------

export const site = {
  name: 'Armaghan Store',
  tagline: 'Premium kapra & fabric, honest prices, delivered across Pakistan.',
  owner: 'Qari Ali Husnain Aslam',

  // WhatsApp: digits only, with country code, no "+" and no spaces.
  whatsappNumber: '923274934992',
  phoneDisplay: '+92 327 4934992',

  email: 'hello@armaghanstore.pk', // TODO: replace with your real email
  addressLine: 'Main Bazaar',
  city: 'Vihari',
  region: 'Punjab',
  country: 'Pakistan',
  hours: 'Monday–Saturday, 10:00 am – 9:00 pm (PKT)',

  currency: 'PKR',
  deliveryFee: 250,
  freeDeliveryOver: 5000,
  deliveryNote: 'Delivery in 2–5 working days across Pakistan. Cash on Delivery available.',

  // ---------------------------------------------------------------------------
  // BULK DISCOUNTS — applied automatically in the cart on the number of pieces
  // in one order. Change the numbers here and the whole site follows.
  // ---------------------------------------------------------------------------
  bulkTiers: [
    { qty: 2, percent: 5 },
    { qty: 4, percent: 10 },
    { qty: 6, percent: 15 },
  ],
  bulkFinePrint: 'Discount applies to the pieces in one order — suits, suit pieces, kurtas or accessories.',
  wholesaleNote:
    'Ordering more than 6 pieces, or buying for a shop? Contact us to get clothes at wholesale rates.',

  // Refund policy numbers (used across the site + policy page)
  refundCutPercent: 20,
  refundWindowDays: 7,
  damagedReportHours: 48,
  refundProcessing: '7–10 working days',

  social: {
    facebook: '', // TODO: paste your page links
    instagram: '',
    tiktok: '',
  },
};

// Named colour swatches. Add any new colour name you use in your data here;
// if a name is missing the site picks a stable fallback colour automatically.
export const COLOR_HEX = {
  'Navy Blue': '#1f2b5b',
  'Charcoal Grey': '#36454f',
  'Beige': '#d8c7a8',
  'Off White': '#f3efe6',
  'Boski Cream': '#f0e8d6',
  'Maroon': '#7c1f38',
  'Bottle Green': '#0f4d3a',
  'Sky Blue': '#8ec5e8',
  'Black': '#15161a',
  'Brown': '#6b4a2f',
  'Dusty Rose': '#c98b8b',
  'Mustard': '#d9a326',
  'Lilac': '#b9a7d6',
  'Teal': '#1f6f78',
  'Rust': '#a8452a',
  'Cream': '#efe3cd',
  'Powder Blue': '#bcd2e8',
};
