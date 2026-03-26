import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://babafemi.codes'),
  title: 'Babafemi Adojutelegan — Senior Software Engineer',
  description:
    'Senior Software Engineer specializing in mobile and full stack development.',
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
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Babafemi Adojutelegan — Senior Software Engineer',
    description: 'Engineering Experiences. Shipping Solutions.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={jetbrainsMono.variable}>
      <body>{children}</body>
    </html>
  )
}
