import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Libre_Baskerville } from 'next/font/google';
import { ManifestLoader } from '@/components/ManifestLoader';
import { GoogleAnalytics } from '@next/third-parties/google';
import { siteConfig } from '@/config/site';
import "../globals.css";

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre',
  weight: ['400', '700'],
  display: 'swap',
});

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'A Beat Beyond - Digital Transformation Engineered',
  description: 'A Beat Beyond is your Advisor that comes aboard to transform your company into an agile and profitable ship in the digital ocean.',
};

export default async function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Explicitly load English messages for the /en locale
  const messages = await getMessages({locale: 'en'});

  return (
    <html lang="en" className={`scroll-smooth ${libreBaskerville.variable}`}>
      <body className="bg-slate-50 text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <ManifestLoader />
          <div id="root">{children}</div>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
      </body>
    </html>
  );
}