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
  description: 'A Beat Beyond is a...',
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
