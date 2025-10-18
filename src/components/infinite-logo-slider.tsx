"use client"

interface InfiniteLogoSliderProps {
  width?: string
  height?: string
  scrollProgress?: number
}

export function InfiniteLogoSlider({ width, height, scrollProgress = 1 }: InfiniteLogoSliderProps = {}) {
  // Array of tech logos - using Simple Icons CDN
  const logos = [
    { name: "Shadcn UI", slug: "shadcnui" },
    { name: "GitHub", slug: "github" },
    { name: "LangChain", slug: "langchain" },
    { name: "React", slug: "react" },
    { name: "Python", slug: "python" },
    { name: "Flask", slug: "flask" },
    { name: "Odoo", slug: "odoo" },
    { name: "Salesforce", slug: "salesforce" },
    { name: "Zoho", slug: "zoho" },
    { name: "Prisma", slug: "prisma" },
    { name: "Ollama", slug: "ollama" },
    { name: "Hugging Face", slug: "huggingface" },
    { name: "Google Cloud", slug: "googlecloud" },
    { name: "Docker", slug: "docker" },
    { name: "PostgreSQL", slug: "postgresql" },
    { name: "Vercel", slug: "vercel" },
    { name: "Anthropic", slug: "anthropic" },
    { name: "Hostinger", slug: "hostinger" },
  ]

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  // Set default width and height
  const containerWidth = width || "100%"
  const containerHeight = height || "auto"

  // Dynamically scale logo size and spacing based on scroll progress
  // Start at fullscreen size (progress = 0), end smaller when descaled (progress = 1)
  const logoHeightStart = 40 // px - fullscreen (h-10)
  const logoHeightEnd = 28 // px - final size (h-7)
  const logoHeight = logoHeightStart + (logoHeightEnd - logoHeightStart) * scrollProgress

  const paddingYStart = 20 // px - fullscreen (py-12)
  const paddingYEnd = 10 // px - final size (py-4)
  const paddingY = paddingYStart + (paddingYEnd - paddingYStart) * scrollProgress

  const spacingXStart = 32 // px - fullscreen (mx-8)
  const spacingXEnd = 24 // px - final size (mx-6)
  const spacingX = spacingXStart + (spacingXEnd - spacingXStart) * scrollProgress

  // Helper to get SVG icon CDN url for color mode
  function getLogoUrl(slug: string, mode: "dark" | "colored") {
    // For dark mode: use white color for visibility on dark background
    // For colored: use default brand colors
    if (mode === "dark") {
      return `https://cdn.simpleicons.org/${slug}/white`
    } else {
      return `https://cdn.simpleicons.org/${slug}`
    }
  }
  
  return (
    <div 
      className="w-full overflow-hidden"
      style={{ 
        paddingTop: `${paddingY}px`,
        paddingBottom: `${paddingY}px`
      }}
    >
      {/* Scrolling container */}
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
        {duplicatedLogos.map((logo, index) => (
          <div 
            key={`${logo.name}-${index}`} 
            className="flex-shrink-0 flex items-center justify-center group"
            style={{ 
              marginLeft: `${spacingX}px`, 
              marginRight: `${spacingX}px` 
            }}
          >
            {/* Darkmode logo visible by default, fades out on hover */}
            <img
              src={getLogoUrl(logo.slug, "dark")}
              alt={logo.name}
              className="w-auto object-contain opacity-80 grayscale group-hover:opacity-0 group-hover:grayscale-0 absolute"
              style={{ 
                height: `${logoHeight}px`, 
                position: "absolute",
                transition: "opacity 300ms, filter 300ms"
              }}
            />
            {/* Colored logo visible on hover */}
            <img
              src={getLogoUrl(logo.slug, "colored")}
              alt={logo.name}
              className="w-auto object-contain opacity-0 grayscale-0 group-hover:opacity-100 group-hover:grayscale-0 relative"
              style={{ 
                height: `${logoHeight}px`, 
                position: "relative",
                transition: "opacity 300ms, filter 300ms"
              }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
