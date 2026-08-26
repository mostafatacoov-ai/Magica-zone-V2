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
  title: 'Magica Zone | Team Building & Camp Experiences',
  description: 'Interactive team building activities, youth camps, and corporate events.',
};

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'ar' }];
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const isRtl = params.lang === 'ar';

  return (
    <html lang={params.lang} dir={isRtl ? 'rtl' : 'ltr'}>
      <body className={`${isRtl ? cairo.className : inter.className} min-h-screen flex flex-col bg-gray-50 text-gray-900 antialiased`}>
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