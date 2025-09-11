"use client"

import { useEffect, useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Parallax, Pagination, EffectFade, Autoplay } from "swiper/modules"
import type { Swiper as SwiperType } from "swiper"
import Link from "next/link"

// Import Swiper styles
import "swiper/css"
import "swiper/css/parallax"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

const projects = [
  {
    id: 1,
    title: "AI Fitness Assistant",
    subtitle: "Machine Learning",
    description:
      "An AI Fitness Assistant that leverages state-of-the-art models to help users achieve their fitness goals through science-driven, deterministic algorithms, while remaining adaptable to each individual's needs.",
    gradient: "from-[#0F0F10] via-[#1a1a1b] to-[#0F0F10]",
    tech: ["TypeScript", "Python", "OpenAI API", "Next.js"],
    status: "In Progress",
    year: "2025",
  },
  {
    id: 2,
    title: "Portfolio Website",
    subtitle: "Web Development",
    description:
      "A minimalist portfolio website built with Next.js and Tailwind CSS, featuring smooth animations and responsive design to showcase professional work and projects.",
    gradient: "from-[#0F0F10] via-[#252526] to-[#0F0F10]",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Live",
    year: "2025",
  },
  {
    id: 3,
    title: "Data Analytics Dashboard",
    subtitle: "Full Stack",
    description:
      "A comprehensive analytics dashboard for business intelligence, featuring real-time data visualization and interactive charts built with modern web technologies.",
    gradient: "from-[#0F0F10] via-[#1f1f20] to-[#0F0F10]",
    tech: ["React", "Node.js", "PostgreSQL", "D3.js"],
    status: "Live",
    year: "2024",
  },
  {
    id: 4,
    title: "E-commerce Platform",
    subtitle: "Full Stack",
    description:
      "A modern e-commerce solution with payment integration, inventory management, and admin dashboard built for scalability and performance.",
    gradient: "from-[#0F0F10] via-[#2a2a2b] to-[#0F0F10]",
    tech: ["Next.js", "Stripe", "Prisma", "PostgreSQL"],
    status: "Live",
    year: "2024",
  },
]

export default function ProjectsPage() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0
        }
        return prev + 1
      })
    }, 50)

    return () => clearInterval(interval)
  }, [activeIndex])

  const handleSlideChange = (swiper: SwiperType) => {
    setActiveIndex(swiper.activeIndex)
    setProgress(0)
  }

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      {/* Back to home button */}
      <Link
        href="/"
        className="absolute top-8 left-8 z-30 group flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300"
      >
        <svg
          className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
        </svg>
        <span className="text-sm font-light tracking-wider uppercase">Back</span>
      </Link>

      <Swiper
        modules={[Parallax, Pagination, EffectFade, Autoplay]}
        parallax={true}
        effect="fade"
        fadeEffect={{
          crossFade: true,
        }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        speed={1200}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={handleSlideChange}
        className="h-full w-full"
        data-swiper-parallax="-23%"
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id} className="relative">
            {/* Background with gradient */}
            <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} data-swiper-parallax="-300" />

            <div className="absolute inset-0 bg-black/20" />

            <div className="absolute inset-0 opacity-5" data-swiper-parallax="-200">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gray-400 rounded-full blur-3xl animate-pulse" />
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gray-500 rounded-full blur-3xl animate-pulse delay-1000" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex items-center justify-center h-full px-8">
              <div className="text-center max-w-4xl">
                <div className="mb-4 opacity-70" data-swiper-parallax="-100">
                  <span className="text-white/60 text-lg font-light tracking-wider uppercase">{project.subtitle}</span>
                </div>

                <h1
                  className="text-6xl md:text-8xl font-light text-white mb-8 leading-tight"
                  data-swiper-parallax="-200"
                >
                  {project.title}
                </h1>

                <p
                  className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-2xl mx-auto mb-8"
                  data-swiper-parallax="-300"
                >
                  {project.description}
                </p>

                {/* Project details */}
                <div className="flex flex-col items-center gap-6" data-swiper-parallax="-400">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          project.status === "Live" ? "bg-green-500" : "bg-yellow-500"
                        }`}
                      />
                      <span className="text-white/60 text-sm font-light">{project.status}</span>
                    </div>
                    <span className="text-white/40">•</span>
                    <span className="text-white/60 text-sm font-light">{project.year}</span>
                  </div>

                  <div className="flex flex-wrap justify-center gap-2">
                    {project.tech.map((tech) => (
                      <span key={tech} className="px-3 py-1 text-xs text-white/60 border border-white/20 rounded-full">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Pagination with Progress Bar */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                swiperRef.current?.slideTo(index)
                setProgress(0)
              }}
              className={`relative group transition-all duration-300 ${
                index === activeIndex ? "scale-110" : "scale-100 hover:scale-105"
              }`}
            >
              {/* Dot */}
              <div
                className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                  index === activeIndex
                    ? "border-white bg-white"
                    : "border-white/40 bg-transparent hover:border-white/60"
                }`}
              />

              {/* Progress ring for active slide */}
              {index === activeIndex && (
                <div className="absolute inset-0 -m-2">
                  <svg className="w-7 h-7 transform -rotate-90" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="none" />
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="white"
                      strokeWidth="1"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 10}`}
                      strokeDashoffset={`${2 * Math.PI * 10 * (1 - progress / 100)}`}
                      className="transition-all duration-75 ease-linear"
                    />
                  </svg>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Slide counter */}
        <div className="text-center mt-4">
          <span className="text-white/60 text-sm font-light">
            {String(activeIndex + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={() => swiperRef.current?.slidePrev()}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 group"
        aria-label="Previous project"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </button>

      <button
        onClick={() => swiperRef.current?.slideNext()}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 group"
        aria-label="Next project"
      >
        <div className="w-12 h-12 border border-white/20 rounded-full flex items-center justify-center transition-all duration-300 hover:border-white/40 hover:bg-white/5">
          <svg
            className="w-5 h-5 text-white/60 group-hover:text-white transition-colors"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </button>
    </div>
  )
}
