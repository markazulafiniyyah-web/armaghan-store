import CartView from '@/components/CartView';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  path: '/cart/',
  title: 'Your Cart',
  description:
    'Review your pieces, see your bulk discount, add your delivery details and send the whole order to Armaghan Store on WhatsApp.',
  noindex: true, // a cart page should never appear in search results
});

export default function CartPage() {
  return (
    <div className="container">
      <CartView />
    </div>
  );
}
