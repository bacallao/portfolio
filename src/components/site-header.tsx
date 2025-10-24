"use client"

import Link from "next/link"
import Image from "next/image"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/20 bg-black" style={{ borderBottomWidth: "1px" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-[3.9rem] flex items-center justify-between">
        {/* Left group: Brand + primary navigation */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-3">
            <Image 
              src="/images/logo.svg" 
              alt="Metrica Logo" 
              width={28} 
              height={28}
              className="h-7 w-7 object-contain"
              style={{ filter: 'brightness(0) saturate(100%) invert(38%) sepia(99%) saturate(2529%) hue-rotate(216deg) brightness(96%) contrast(90%)' }}
            />
            <span
              className="text-white font-semibold text-lg"
              style={{
                fontFamily: '"BBH Sans Hegarty", sans-serif',
                letterSpacing: "0.02em"
              }}
            >
              Metrica
            </span>
            <span className="sr-only">Home</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-base text-white/90 font-semibold">
            <Link href="#platform" className="hover:text-white transition-colors">Platform</Link>
            <Link href="#solutions" className="hover:text-white transition-colors">Solutions</Link>
            <Link href="/developer" className="hover:text-white transition-colors">Portfolio</Link>
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

