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

  return (
    <div 
      className="relative overflow-hidden py-12"
      style={{ width: containerWidth, height: containerHeight }}
    >
      {/* Blur gradient overlays */}
      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      {/* Scrolling container */}
      <div className="flex animate-infinite-scroll hover:[animation-play-state:paused]">
        {duplicatedLogos.map((logo, index) => (
          <div key={`${logo.name}-${index}`} className="flex-shrink-0 mx-8 flex items-center justify-center group">
            <img
              src={`https://cdn.simpleicons.org/${logo.slug}`}
              alt={logo.name}
              className="h-12 w-auto object-contain opacity-70 hover:opacity-100 transition-all duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  )
}
