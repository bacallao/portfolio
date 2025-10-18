"use client"

interface InfiniteLogoSliderProps {
  width?: string
  height?: string
}

export function InfiniteLogoSlider({ width, height }: InfiniteLogoSliderProps = {}) {
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
      className="relative overflow-hidden py-12"
      style={{ width: containerWidth, height: containerHeight }}
    >
      {/* Scrolling container */}
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center group">
            {/* Darkmode logo visible by default, fades out on hover */}
            <img
              src={getLogoUrl(logo.slug, "dark")}
              alt={logo.name}
              className="h-12 w-auto object-contain opacity-80 transition-all duration-300 grayscale group-hover:opacity-0 group-hover:grayscale-0 absolute"
              style={{ position: "absolute" }}
            />
            {/* Colored logo visible on hover */}
            <img
              src={getLogoUrl(logo.slug, "colored")}
              alt={logo.name}
              className="h-12 w-auto object-contain opacity-0 transition-all duration-300 grayscale-0 group-hover:opacity-100 group-hover:grayscale-0 relative"
              style={{ position: "relative" }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
