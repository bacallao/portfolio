"use client"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/40 bg-black" style={{ borderBottomWidth: "1px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left group: Brand + primary navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-sm bg-blue-600 text-white text-sm font-bold">MB</span>
            <span className="text-white font-semibold tracking-tight text-lg">Manuel</span>
            <span className="sr-only">Home</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-base text-white/90 font-semibold">
            <Link href="#platform" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="#resources" className="hover:text-white transition-colors">Resources</Link>
            <Link href="#enterprise" className="hover:text-white transition-colors">Enterprise</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
          </nav>
        </div>

        {/* Right group: Secondary link + primary CTA */}
        <div className="flex items-center gap-6">
          <Link href="/contact" className="text-base text-white/90 hover:text-white transition-colors font-semibold">Contact Sales</Link>
          <Link
            href="/developer"
            className="inline-flex h-10 items-center rounded-sm bg-blue-600 px-5 text-base font-semibold text-white shadow-sm hover:bg-blue-500 transition-colors"
          >
            View dashboard
          </Link>
        </div>
      </div>
    </header>
  )
}

