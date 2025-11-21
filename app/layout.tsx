import type { Metadata } from 'next'
import { Inter, Outfit } from 'next/font/google'
import "./globals.css"

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const outfit = Outfit({ 
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'A Beat Beyond | Digital Transformation Engineered',
  description: 'A Beat Beyond è l\'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell\'oceano digitale. Specializzati in Digital Transformation.',
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
  openGraph: {
    title: 'A Beat Beyond | Digital Transformation Engineered',
    description: 'A Beat Beyond è l\'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell\'oceano digitale.',
    type: 'website',
    locale: 'it_IT',
    url: 'https://www.abeatbeyond.com',
    siteName: 'A Beat Beyond',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Beat Beyond | Digital Transformation Engineered',
    description: 'A Beat Beyond è l\'Advisor che sale a bordo per trasformare la tua azienda in una nave stabile, agile e profittevole dell\'oceano digitale.',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  other: {
    'theme-color': '#0f172a',
  },
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it" className={`scroll-smooth ${inter.variable} ${outfit.variable}`}>
      <body className="bg-slate-50 text-slate-900">
        <div id="root">{children}</div>
      </body>
    </html>
  )
}
