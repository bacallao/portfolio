"use client";

import React, { useState } from "react";
import { BarChart3, Bell, ChevronDown, Shield, Sparkles, Users, Zap } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollFeatureShowcase, FeatureSection } from "./scroll-feature-showcase";

const serviceOptions = [
  { id: "marketing", label: "Marketing teams" },
  { id: "design", label: "Design teams" },
  { id: "engineering", label: "Engineering teams" },
  { id: "agencies", label: "Agencies" },
];

export default function InlineDropdownHeader() {
  const [selectedOption, setSelectedOption] = useState(serviceOptions[0]); // Default to Marketing teams
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: (typeof serviceOptions)[0]) => {
    setSelectedOption(option);
  };

  const featureSections: FeatureSection[] = [
    {
      id: "section-1",
      title: "Overflowing with useful features",
      description:
        "Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.",
      defaultImage: "/v0/purple-credit-cards-stacked.jpg",
      elements: [
        {
          id: "feature-1",
          icon: <Bell className="h-5 w-5" />,
          title: "Share team inboxes",
          description:
            "Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.",
          image: "/v0/inbox-notification-interface-purple.jpg", // Has specific image
          link: "#",
        },
        {
          id: "feature-2",
          icon: <Zap className="h-5 w-5" />,
          title: "Deliver instant answers",
          description:
            "An all-in-one customer service platform that helps you balance everything your customers need to be happy.",
          image: "/v0/chat-support-interface-purple.jpg", // Has specific image
          link: "#",
        },
        {
          id: "feature-3",
          icon: <BarChart3 className="h-5 w-5" />,
          title: "Manage your team with reports",
          description:
            "Measure what matters with Untitled's easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.",
          image: "/v0/analytics-dashboard-purple-charts.jpg", // Has specific image
          link: "#",
        },
      ],
    },
    {
      id: "section-2",
      title: "Advanced collaboration tools",
      description:
        "Work together seamlessly with powerful collaboration features designed for modern teams.",
      defaultImage: "/v0/blue-collaboration-workspace.jpg",
      elements: [
        {
          id: "feature-4",
          icon: <Users className="h-5 w-5" />,
          title: "Team collaboration",
          description:
            "Real-time collaboration tools that keep your team in sync and productive.",
          image: "/v0/team-video-call-interface-blue.jpg", // Has specific image
          link: "#",
        },
        {
          id: "feature-5",
          icon: <Shield className="h-5 w-5" />,
          title: "Enterprise security",
          description:
            "Bank-level security with advanced encryption and compliance certifications.",
          // No image property - will use section's defaultImage
          link: "#",
        },
        {
          id: "feature-6",
          icon: <Sparkles className="h-5 w-5" />,
          title: "AI-powered insights",
          description:
            "Get intelligent recommendations and insights powered by advanced AI.",
          image: "/v0/ai-neural-network-blue.png", // Has specific image
          link: "#",
        },
      ],
    },
  ];

  return (
    <section className="w-full bg-black">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-wrap items-center gap-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[0.8]" style={{ fontFamily: '"WF Visual Sans", sans-serif' }}>
            {/* Pre-text */}
            <span>Everything</span>

            {/* Dropdown Component */}
            <DropdownMenu onOpenChange={setIsOpen}>
              <DropdownMenuTrigger asChild>
                <button
                  className={cn(
                    "relative px-4 py-3 rounded-md transition-all duration-300 flex items-center justify-center gap-3",
                    "bg-black border border-zinc-800",
                    "hover:bg-zinc-900 hover:border-zinc-700",
                    "focus:outline-none focus:ring-0"
                  )}
                >
                  {/* Display lowercase */}
                  <span className="text-white lowercase leading-[0.8]">
                    {selectedOption.label}
                  </span>
                  <ChevronDown
                    className={cn(
                      "w-6 h-6 md:w-7 md:h-7 text-white transition-transform duration-300 shrink-0",
                      isOpen && "rotate-180"
                    )}
                  />
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className={cn(
                  "bg-black border border-zinc-800",
                  "shadow-2xl shadow-black/50",
                  "p-0 rounded-md overflow-hidden"
                )}
                align="start"
              >
                {serviceOptions.map((option) => (
                  <DropdownMenuItem
                    key={option.id}
                    onClick={() => handleOptionClick(option)}
                    className={cn(
                      "px-4 py-3 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold cursor-pointer leading-[0.8]",
                      "transition-all duration-200 rounded-none",
                      "focus:bg-transparent focus:text-white",
                      selectedOption.id === option.id
                        ? "text-blue-500 bg-blue-950/50"
                        : "text-white bg-black hover:bg-blue-950/50 hover:!text-white"
                    )}
                  >
                    {/* Display capitalized */}
                    {option.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Post-text - forces line break */}
            <span className="w-full leading-tight">love about Metrica</span>
          </div>
        </div>
      </div>
      <ScrollFeatureShowcase sections={featureSections} />
    </section>
  );
}
