import '@/styles/globals.scss'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })


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
      <body className={inter.className}>{children}</body>
    </html>
  )
}
