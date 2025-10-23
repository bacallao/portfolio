"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { cn } from "@/src/lib/utils"
import Image from "next/image"

export interface FeatureElement {
  id: string
  icon?: React.ReactNode
  title: string
  description: string
  image?: string // Optional - if not provided, uses section's default image
  link?: string
}

export interface FeatureSection {
  id: string
  title: string
  description: string
  defaultImage: string // Fallback image for the section
  elements: FeatureElement[]
}

export interface ScrollFeatureShowcaseProps {
  sections: FeatureSection[]
  stickyTopOffset?: string // e.g., "top-20"
  imageHeight?: string // e.g., "h-[600px]"
}

export function ScrollFeatureShowcase({
  sections,
  stickyTopOffset = "top-20",
  imageHeight = "h-[600px]",
}: ScrollFeatureShowcaseProps) {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || "")
  const [hoveredElement, setHoveredElement] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState<string>(sections[0]?.defaultImage || "")
  const [imageOpacity, setImageOpacity] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  useEffect(() => {
    let newImage = ""
    
    if (hoveredElement) {
      // Find the hovered element across all sections
      for (const section of sections) {
        const element = section.elements.find((e) => e.id === hoveredElement)
        if (element) {
          // Use element's image if available, otherwise use section's default
          newImage = element.image || section.defaultImage
          break
        }
      }
    } else {
      // Use default image for active section
      const section = sections.find((s) => s.id === activeSection)
      if (section) {
        newImage = section.defaultImage
      }
    }

    if (newImage && newImage !== currentImage) {
      // Fade out
      setImageOpacity(0)
      
      // Wait for fade out, then change image and fade in
      setTimeout(() => {
        setCurrentImage(newImage)
        // Small delay to ensure image is loaded before fading in
        setTimeout(() => {
          setImageOpacity(1)
        }, 25)
      }, 200) // Fade out duration
    }
  }, [hoveredElement, activeSection, sections, currentImage])

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    sections.forEach((section) => {
      const element = sectionRefs.current[section.id]
      if (!element) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveSection(section.id)
            }
          })
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-20% 0px -20% 0px",
        },
      )

      observer.observe(element)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [sections])

  return (
    <div ref={containerRef} className="relative bg-black">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left side - Scrolling content */}
          <div className="space-y-32 py-20">
            {sections.map((section) => (
              <div
                key={section.id}
                ref={(el) => {
                  sectionRefs.current[section.id] = el
                }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-bold tracking-tight text-white">{section.title}</h2>
                  <p className="text-lg text-zinc-400 max-w-xl">{section.description}</p>
                </div>

                <div className="space-y-8">
                  {section.elements.map((element) => (
                    <div
                      key={element.id}
                      onMouseEnter={() => setHoveredElement(element.id)}
                      onMouseLeave={() => setHoveredElement(null)}
                      className={cn(
                        "group cursor-pointer rounded-lg p-6 transition-all duration-200",
                        "hover:bg-zinc-900/50 border border-transparent hover:border-zinc-800",
                        hoveredElement === element.id && "bg-zinc-900/50 border-zinc-800",
                      )}
                    >
                      <div className="flex gap-4">
                        {element.icon && (
                          <div className="flex-shrink-0">
                            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 text-zinc-400">
                              {element.icon}
                            </div>
                          </div>
                        )}
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold text-white">{element.title}</h3>
                          <p className="text-zinc-400">{element.description}</p>
                          {element.link && (
                            <a
                              href={element.link}
                              className="inline-flex items-center gap-2 text-sm font-medium text-zinc-300 hover:text-white hover:underline"
                            >
                              Learn more
                              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right side - Sticky image */}
          <div className="relative hidden lg:block">
            <div className={cn("sticky flex items-center justify-center", stickyTopOffset, imageHeight)}>
              <div className="relative w-full h-full overflow-hidden p-4">
                <Image
                  src={currentImage || "/images/editor.png"}
                  width={600}
                  height={400}
                  alt="Feature visualization"
                  className="w-full h-full object-cover rounded-lg transition-opacity duration-200 ease-in-out"
                  style={{ opacity: imageOpacity }}
                  key={currentImage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

