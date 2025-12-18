import type { Metadata } from 'next'
import { Libre_Baskerville } from 'next/font/google'
import "./globals.css"
import { siteConfig } from '@/config/site'
import { ManifestLoader } from '@/components/ManifestLoader'
import { GoogleAnalytics } from '@next/third-parties/google'
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

const libreBaskerville = Libre_Baskerville({
  subsets: ['latin'],
  variable: '--font-libre',
  weight: ['400', '700'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.author }],
  creator: siteConfig.author,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: siteConfig.ogType,
    locale: siteConfig.locale,
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} - Digital Transformation`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#0f172a',
  },
}
 
export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Explicitly load Italian messages for the root layout to avoid ambiguity
  // or rely on defaultLocale 'it' from routing.ts
  const messages = await getMessages(); 

  return (
    <html lang="it" className={`scroll-smooth ${libreBaskerville.variable}`}>
      <body className="bg-slate-50 text-slate-900">
        <NextIntlClientProvider messages={messages}>
          <ManifestLoader />
          <div id="root">{children}</div>
        </NextIntlClientProvider>
        <GoogleAnalytics gaId={siteConfig.googleAnalyticsId} />
      </body>
    </html>
  )
}
