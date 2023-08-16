import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
// const inter = Inter({ subsets: ['latin'] })
import ContactButtonPopup from '@/components/ContactButtonPopup'
import Footer from '@/components/Footer'

// Create metadata base
export const metadata: Metadata = {
  title: 'Be Fitness Frenzy',
  description: 'Shadcn UI is a React UI library that helps developers build fast and beautiful web applications.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>

      <body className={'inter.className bg-gradient-to-r to-background from-gray-900' }>
        {/* main. */}
        <Header />
        {children}
        <ContactButtonPopup />
        <Footer />

      </body>
    </html>
  )
}
