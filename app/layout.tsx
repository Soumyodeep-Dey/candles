import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display } from "next/font/google" // Updated fonts for elegant candle business
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context" // Added cart provider
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "Luminous Candles - Handcrafted Candles for Every Moment",
  description:
    "Discover our collection of premium handcrafted candles. From scented to decorative and seasonal collections.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <CartProvider>{children}</CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
