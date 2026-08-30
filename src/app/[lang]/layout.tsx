import type { Metadata } from 'next';
import { Inter, Cairo } from 'next/font/google';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppButton } from '@/components/common/WhatsAppButton';
import { GlobalRadioPlayer } from '@/components/common/GlobalRadioPlayer';
import { RadioProvider } from '@/context/RadioContext';
import '@/app/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });
const cairo = Cairo({ subsets: ['arabic'], variable: '--font-arabic' });

export const metadata: Metadata = {
  metadataBase: new URL('https://magica-group.com'),
  title: {
    default: 'Magica Zone | Where Children Become Leaders',
    template: '%s | Magica Zone',
  },
  description:
    'Premier youth leadership academy, experiential summer camps, STEM robotics, teamwork activities, and smart supplies in Cairo, Egypt.',
  keywords: [
    'Magica Zone',
    'Magica Camp',
    'Youth Leadership Cairo',
    'Team Building Activities Egypt',
    'Kids STEM Workshops',
    'Maadi Summer Camp',
    'معسكرات ماجيكا',
    'أنشطة بناء الفرق',
    'أكاديمية ماجيكا للشباب',
  ],
  authors: [{ name: 'Magica Group', url: 'https://magica-group.com' }],
  creator: 'Magica Group',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://magica-group.com',
    siteName: 'Magica Zone',
    title: 'Magica Zone | Where Children Become Leaders',
    description:
      'Empowering the next generation with financial literacy, leadership, STEM, and life preparation.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Magica Zone Brand Banner',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Magica Zone | Where Children Become Leaders',
    description: 'Youth leadership, camps, STEM innovation, and team building experiences.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRtl = params.lang === 'ar';

  // Structured Data Schema for Google Search
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'Magica Zone',
    alternateName: 'Magica Group',
    url: 'https://magica-group.com',
    logo: 'https://magica-group.com/logo.png',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+20-10-37377505',
      contactType: 'customer service',
      areaServed: 'EG',
      availableLanguage: ['Arabic', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Next to Roots Nursery, Victoria Square',
      addressLocality: 'Maadi',
      addressRegion: 'Cairo',
      addressCountry: 'EG',
    },
    sameAs: [
      'https://maps.app.goo.gl/1cfvtbm6tDbjApL48',
    ],
  };

  return (
    <html lang={params.lang} dir={isRtl ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${isRtl ? cairo.className : inter.className} min-h-screen flex flex-col bg-[#FFFAF0] text-gray-900 antialiased`}>
        <RadioProvider>
          <Header lang={params.lang} />
          <div className="flex-1">{children}</div>
          <Footer lang={params.lang} />
          <GlobalRadioPlayer lang={params.lang} />
          <WhatsAppButton lang={params.lang} />
        </RadioProvider>
      </body>
    </html>
  );
}