import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from 'next/font/google'
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "XO Development | Locust Protocol DEX API",
  description: "XO Development offers Locust Protocol - a unified DEX aggregation API for multi-chain swaps, wallet management, AI assistance, and DeFi data. Try free for 7 days.",
  generator: "XO Development",
  metadataBase: new URL(process.env.NEXT_PUBLIC_API_URL || 'https://xo-development.com'),
  openGraph: {
    title: "XO Development | Locust Protocol DEX API",
    description: "Unified DEX aggregation API for multi-chain swaps, wallet management, and DeFi data. Try Locust Protocol free for 7 days.",
    images: [
      {
        url: "/xo-logo.png",
        width: 1200,
        height: 630,
        alt: "XO Development Logo",
      },
    ],
    siteName: "XO Development",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "XO Development | Locust Protocol DEX API",
    description: "Unified DEX aggregation API for multi-chain swaps, wallet management, and DeFi data. Try Locust Protocol free for 7 days.",
    images: ["/xo-logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased ${_geist.className}`}>
        {children}
        {/* <Analytics /> */}
      </body>
    </html>
  )
}
