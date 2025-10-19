"use client"

import Link from "next/link"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-primary">MB</span>
          <span className="sr-only">Home</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link href="/developer" className="hover:text-primary transition-colors">Developer</Link>
          <Link href="/projects" className="hover:text-primary transition-colors">Projects</Link>
          <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="inline-flex h-9 items-center rounded-md bg-primary px-3 text-sm font-medium text-primary-foreground shadow hover:opacity-90 transition">Contact</Link>
        </div>
      </div>
    </header>
  )
}


