"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  const technologyRows = [
    ["PostgreSQL", "React", "Next.js", "TypeScript", "Python"],
    ["Node.js", "Prisma", "Flask", "Ollama", "LangChain"],
    ["Hugging Face", "TensorFlow", "Docker", "AWS", "Git"],
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <div
        className="fixed right-[100px] top-1/2 -translate-y-1/2 w-1/3 h-2/3 bg-cover bg-center bg-no-repeat z-0 hidden lg:block"
        style={{
          backgroundImage: "url(/images/ascii-building.png)",
          maskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 70%, transparent 100%)",
        }}
      />

      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "projects", "thoughts", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16 relative z-10 text-center lg:text-left">
        <header
          id="intro"
          ref={(el) => {
            sectionsRef.current[0] = el
          }}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">
                  PORTFOLIO / {new Date().getFullYear()}
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Manuel
                  <br />
                  <span className="text-muted-foreground">Bacallao</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md mx-auto lg:mx-0">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-left">
                  Software Engineer building intelligent systems at the intersection of
                  <span className="text-foreground"> machine learning</span>,
                  <span className="text-foreground"> generative AI</span>, and
                  <span className="text-foreground"> human creativity</span>.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>United States / Remote</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end items-center lg:items-start space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Software Engineer</div>
                  <div className="text-muted-foreground">@ Appluex</div>
                  <div className="text-xs text-muted-foreground">2024 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="space-y-3">
                  {technologyRows.map((row, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="relative overflow-hidden w-full max-w-[260px] sm:max-w-[300px] mx-auto"
                      style={{
                        maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                        WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
                      }}
                    >
                      <div
                        className={`flex gap-2 w-[200%] ${rowIndex % 2 === 0 ? "animate-scroll-left" : "animate-scroll-right"}`}
                      >
                        {[...row, ...row].map((skill, index) => (
                          <span
                            key={`${skill}-${index}`}
                            className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300 flex-shrink-0"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => {
            sectionsRef.current[1] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full max-w-xl lg:max-w-full mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2019 — {new Date().getFullYear()}</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2024",
                  role: "Software Engineer",
                  company: "Directable",
                  description:
                    "Joined Directable as a Software Engineer, contributing to the development of a platform that enables businesses to create ads in an integrated editor and stream them in real time across distributed TVs and screens.",
                  tech: ["C# & TypeScript", "Next.js", "ASP.NET Core"],
                },
                {
                  year: "2024",
                  role: "Software Developer",
                  company: "Georgia Tech’s Lab of Interactive Computing ",
                  description:
                    "Utilized Python and its NetworkX graph structure library to develop efficient algorithms to optimize resource flow in a simulation in which a natural disaster strikes a city. Developed the graphical user interface on PyGame to allow the users to visualize the results",
                  tech: ["Python", "NumPy", "Pandas", "TensorFlow"],
                },
                {
                  year: "2023",
                  role: "University Project",
                  company: "Avangenio",
                  description:
                    "Collaborated with a team to design an AI project integrating mathematical modeling and machine learning techniques. Applied linear algebra, probability, and optimization to develop algorithms and present analytical findings.",
                  tech: ["Python", "NumPy", "Pandas", "TensorFlow"],
                },
              ].map((job, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {job.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div className="flex flex-row lg:flex-col gap-4 items-center justify-center">
                      <h3 className="text-lg sm:text-xl font-medium">{job.role}</h3>
                      <div className="text-muted-foreground">{job.company}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 text-justify lg:text-left">{job.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 justify-center lg:justify-end mt-2 lg:mt-0">
                    {job.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          id="projects"
          ref={(el) => {
            sectionsRef.current[2] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 w-full max-w-xl lg:max-w-full mx-auto lg:mx-0">
              <h2 className="text-3xl sm:text-4xl font-light">Projects</h2>
              <div className="text-sm text-muted-foreground font-mono">PERSONAL WORK</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  title: "AI Fitness Assistant",
                  description:
                    "An AI Fitness Assistant that leverages state-of-the-art models to help users achieve their fitness goals through science-driven, deterministic algorithms, while remaining adaptable to each individual's needs.",
                  tech: ["TypeScript", "Python", "OpenAI API", "Next.JS"],
                  status: "In Progress",
                },
              ].map((project, index) => (
                <div
                  key={index}
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 cursor-pointer"
                >
                  <div className="lg:col-span-2 text-center lg:text-left">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {project.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3 w-full max-w-lg mx-auto lg:mx-0">
                    <div className="flex flex-row lg:flex-col gap-4 items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-medium">{project.title}</h3>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            project.status === "Live" ? "bg-green-500" : "bg-yellow-500"
                          }`}
                        ></div>
                        <span className="text-sm text-muted-foreground">{project.status}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg mx-auto lg:mx-0 text-justify">{project.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 justify-center lg:justify-end mt-2 lg:mt-0">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Link
            href="/projects"
            className="inline-block text-foreground font-sans text-xs uppercase tracking-wider relative group/link"
          >
            Learn More
            <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover/link:w-full"></span>
          </Link>
        </section>

        <section
          id="thoughts"
          ref={(el) => {
            sectionsRef.current[3] = el
          }}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <h2 className="text-3xl sm:text-4xl font-light">Recent Thoughts</h2>

            <div className="grid gap-6 sm:gap-8 lg:grid-cols-2 justify-items-center lg:justify-items-stretch">
              {[
                {
                  title: "The Future of Web Development",
                  excerpt: "Exploring how AI and automation are reshaping the way we build for the web.",
                  date: "Dec 2024",
                  readTime: "5 min",
                },
                {
                  title: "Design Systems at Scale",
                  excerpt: "Lessons learned from building and maintaining design systems across multiple products.",
                  date: "Nov 2024",
                  readTime: "8 min",
                },
                {
                  title: "Performance-First Development",
                  excerpt: "Why performance should be a first-class citizen in your development workflow.",
                  date: "Oct 2024",
                  readTime: "6 min",
                },
                {
                  title: "The Art of Code Review",
                  excerpt: "Building better software through thoughtful and constructive code reviews.",
                  date: "Sep 2024",
                  readTime: "4 min",
                },
              ].map((post, index) => (
                <article
                  key={index}
                  className="group w-full max-w-md lg:max-w-none p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-mono">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                      {post.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed">{post.excerpt}</p>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                      <span>Read more</span>
                      <svg
                        className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="connect"
          ref={(el) => {
            sectionsRef.current[4] = el
          }}
          className="py-20 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 justify-items-center lg:justify-items-start">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed text-left lg:text-justify w-full max-w-md">
                  Always interested in new opportunities, collaborations, and conversations about technology and design.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:bacallao2024@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                    aria-label="Send email to bacallao2024@gmail.com"
                  >
                    <span className="text-base sm:text-lg">bacallao2024@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <h3 className="text-sm text-muted-foreground font-mono">ELSEWHERE</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 justify-items-center">
                {[
                  { name: "GitHub", handle: "@bacallao", url: "https://github.com/bacallao" },
                  { name: "v0.dev", handle: "@bacallao", url: "https://v0.app/@bacallao" },
                  {
                    name: "LinkedIn",
                    handle: "@manuel-bacallaop",
                    url: "https://www.linkedin.com/in/manuel-bacallaop/",
                  },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm w-full max-w-sm"
                    aria-label={`Visit ${social.name} profile (opens in new tab)`}
                  >
                    <div className="space-y-2 text-center sm:text-left">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Manuel Bacallao. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with v0.dev</div>
            </div>
          </div>
        </footer>
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
