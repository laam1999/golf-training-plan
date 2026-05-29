import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.golfgains.app'),
  title: 'GolfGains | A 12-week golf practice plan built around your game',
  description: 'Get a specific, drill-by-drill 12-week golf practice plan built around your clubs, weak spots, and schedule. Free, no signup — email or print it and start this week.',
  applicationName: 'GolfGains',
  keywords: ['golf practice plan', 'AI golf coach', 'golf training plan', 'lower your handicap', 'golf drills'],
  authors: [{ name: 'Luis Acosta' }],
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    siteName: 'GolfGains',
    url: 'https://www.golfgains.app',
    title: 'GolfGains | A 12-week golf practice plan built around your game',
    description: 'A specific, drill-by-drill 12-week golf practice plan built around your clubs, weak spots, and schedule. Free, no signup.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GolfGains | Your 12-week golf practice plan',
    description: 'A specific, drill-by-drill 12-week golf practice plan built around your clubs, weak spots, and schedule. Free, no signup.',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#0a1a12',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
