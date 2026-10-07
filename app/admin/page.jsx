import AdminStock from '@/components/AdminStock';

export const metadata = {
  title: 'Stock counter (shop use)',
  description: 'Private stock-count page for Armaghan Store. Not linked from the shop.',
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminPage() {
  return (
    <div className="container">
      <AdminStock />
    </div>
  );
}
