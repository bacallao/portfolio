"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  image: string;
  gradient?: string;
}

function FeatureCard({ title, description, image, gradient }: FeatureCardProps) {
  return (
    <div className="group relative h-[600px] rounded-2xl overflow-hidden cursor-pointer">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Gradient Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/80",
            gradient
          )}
        />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex flex-col justify-end p-8">
        {/* Heading - moves up on hover */}
        <h3 
          className="text-2xl font-semibold text-white mb-4 transition-all duration-500 group-hover:-translate-y-4 pr-16"
        >
          {title}
        </h3>

        {/* Description - slides up and fades in on hover */}
        <div 
          className="overflow-hidden transition-all duration-500 max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 pr-16"
        >
          <p className="text-white/90 text-base leading-relaxed transform translate-y-4 transition-transform duration-500 group-hover:translate-y-0">
            {description}
          </p>
        </div>

        {/* Plus/Minus Button */}
        <button 
          className="absolute bottom-8 right-8 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white text-xl transition-all duration-300 group-hover:scale-110 leading-none group-hover:bg-[#1C6EA4] group-hover:border-[#1C6EA4]"
          aria-label={`Learn more about ${title}`}
        >
          <span className="translate-y-[-1px] group-hover:hidden">+</span>
          <span className="translate-y-[-1px] hidden group-hover:inline-block">−</span>
        </button>
      </div>
    </div>
  );
}

export default function FeatureCards() {
  const cards: FeatureCardProps[] = [
    {
      title: "Build powerful brand experiences",
      description: "Create stunning, responsive websites that captivate your audience and bring your brand vision to life with cutting-edge design tools.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
      gradient: "bg-gradient-to-b from-blue-900/40 via-blue-800/50 to-black/80"
    },
    {
      title: "Manage content that converts, at scale",
      description: "Streamline your content workflow with powerful management tools designed to help you create, organize, and deliver compelling content efficiently.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    },
    {
      title: "Optimize for conversion with AI",
      description: "Leverage artificial intelligence to analyze user behavior, personalize experiences, and maximize your conversion rates with data-driven insights.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
      gradient: "bg-gradient-to-b from-purple-900/40 via-purple-800/50 to-black/80"
    }
  ];

  return (
    <section className="w-full py-20 px-4 bg-black">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-4 leading-tight">
          The website experience for high-<br />performing brands
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {cards.map((card, index) => (
            <FeatureCard
              key={index}
              title={card.title}
              description={card.description}
              image={card.image}
              gradient={card.gradient}
            />
          ))}
        </div>

        {/* Bottom Text Section */}
        <div className="mt-20 max-w-3xl mx-auto">
          <p className="text-white text-2xl md:text-3xl leading-relaxed mb-8">
            With the advent of AI, your brand has never mattered more. A good-looking site isn't enough; to stay relevant, you need dynamic digital experiences that resonate with humans and are readable by bots. You need State of the Art AI website experiences.
          </p>
          <a 
            href="#" 
            className="inline-block text-white text-lg font-semibold transition-all duration-300 no-underline hover:no-underline group"
          >
            Discover the power of ai{" "}
            <ArrowRight
              className="w-4 h-4 inline-block ml-1 transition-transform duration-300 group-hover:translate-x-[3px] group-hover:translate-y-[-3px]"
              style={{ transform: "rotate(-45deg)" }}
            />
          </a>
        </div>
      </div>
    </section>
  );
}

