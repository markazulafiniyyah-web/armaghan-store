import '@/app/globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppFab from '@/components/WhatsAppFab';
import JsonLd from '@/components/JsonLd';
import LiveSeo from '@/components/LiveSeo';
import { site } from '@/data/site';
import { SITE_ORIGIN, BASE_PATH, KEYWORDS, OG_IMAGE, absoluteUrl } from '@/lib/seo';
import { storeSchema, websiteSchema } from '@/lib/schema';

export const metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: `${site.name} — Kapra & Fabric Online in ${site.city}, Pakistan`,
    template: `%s | ${site.name}`,
  },
  description: site.tagline,
  applicationName: site.name,
  category: 'shopping',
  keywords: KEYWORDS.home,
  authors: [{ name: site.owner }],
  creator: site.owner,
  publisher: site.name,
  alternates: {
    canonical: absoluteUrl('/'),
    languages: { 'en-PK': absoluteUrl('/'), 'x-default': absoluteUrl('/') },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    title: `${site.name} — Kapra & Fabric Online in ${site.city}`,
    description: site.tagline,
    siteName: site.name,
    locale: 'en_PK',
    images: [
      { url: absoluteUrl(OG_IMAGE), width: 1200, height: 630, alt: `${site.name} — kapra & fabric, ${site.city}` },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Kapra & Fabric`,
    description: site.tagline,
    images: [absoluteUrl(OG_IMAGE)],
  },
  icons: {
    icon: [
      { url: `${BASE_PATH}/favicon.svg`, type: 'image/svg+xml' },
      { url: `${BASE_PATH}/icon-512.png`, sizes: '512x512', type: 'image/png' },
    ],
    apple: [{ url: `${BASE_PATH}/apple-touch-icon.png`, sizes: '180x180' }],
  },
  manifest: `${BASE_PATH}/site.webmanifest`,
  formatDetection: { telephone: true, address: true, email: true },
  // Search Console / Bing verification — set these two env vars in the Pages
  // workflow and the meta tags appear automatically.
  verification: {
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { other: { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport = {
  themeColor: '#123c34',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-PK">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
        <LiveSeo buildOrigin={SITE_ORIGIN} basePath={BASE_PATH} />
        <JsonLd id="ld-store" data={storeSchema()} />
        <JsonLd id="ld-website" data={websiteSchema()} />
      </body>
    </html>
  );
}
