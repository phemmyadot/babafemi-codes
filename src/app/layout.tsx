import type { Metadata } from 'next'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import { NavBar } from '@/components/layout/NavBar'
import { Footer } from '@/components/layout/Footer'
import './globals.css'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://babafemi.codes'),
  title: 'Babafemi Adojutelegan — Senior Software Engineer',
  description:
    'Senior Software Engineer specializing in mobile and full stack development. Building production-grade applications at Telus Digital.',
  keywords: [
    'Senior Software Engineer',
    'Mobile Developer',
    'React Native',
    'Full Stack',
    'TypeScript',
    'Babafemi Adojutelegan',
  ],
  authors: [{ name: 'Babafemi Adojutelegan' }],
  openGraph: {
    title: 'Babafemi Adojutelegan — Senior Software Engineer',
    description:
      'Engineering Experiences. Shipping Solutions. Senior Software Engineer specializing in mobile and full stack development.',
    url: 'https://babafemi.codes',
    siteName: 'babafemi.codes',
    images: [
      {
        url: '/assets/ogImage.png',
        width: 1200,
        height: 630,
        alt: 'Babafemi Adojutelegan — Senior Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babafemi Adojutelegan — Senior Software Engineer',
    description: 'Engineering Experiences. Shipping Solutions.',
    images: ['/assets/ogImage.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <NavBar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
