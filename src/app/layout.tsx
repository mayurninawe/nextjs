import './globals.css'
import type { Metadata, ResolvingMetadata } from 'next'
import clsx from 'clsx'
import { Nunito, Nunito_Sans } from 'next/font/google'
import { createClient } from '@/prismicio'
import { Client } from '@prismicio/client'
import Header from '@/components/header'

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
  display: 'swap',
})

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
})


export async function generateMetadata(): Promise<Metadata> {

  const client = createClient();
  const settings = await client.getSingle("settings")
 
  return {
    title: settings.data.site_title || "flowrise fallback",
    description: settings.data.meta_description || "flowrise metadata description.",
    openGraph: {
      images: [settings.data.og_image.url || ""] 
    },
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx(nunito.variable, nunitoSans.variable)}>
      <body>
        <Header />
        {children}
        <footer>Footer</footer>
        </body>
    </html>
  )
}
