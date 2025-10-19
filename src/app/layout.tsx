import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import { SiteHeader } from "@/src/components/site-header"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Manuel Bacallao - Software Engineer",
  description: "Software Engineer building intelligent systems at the intersection of machine learning, generative AI, and human creativity.",
  generator: "Next.js",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">
        <SiteHeader />
        <div className="bg-black">{children}</div>
      </body>
    </html>
  )
}
