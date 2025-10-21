"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/src/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StickyScroll } from "./sticky-scroll";

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

  const content = [
    {
      title: "Collaborative Editing",
      description:
        "Work together in real time with your team, clients, and stakeholders. Collaborate on documents, share ideas, and make decisions quickly. With our platform, you can streamline your workflow and increase productivity.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
          Collaborative Editing
        </div>
      ),
    },
    {
      title: "Real time changes",
      description:
        "See changes as they happen. With our platform, you can track every modification in real time. No more confusion about the latest version of your project. Say goodbye to the chaos of version control and embrace the simplicity of real-time updates.",
      content: (
        <div className="flex h-full w-full items-center justify-center text-white">
          <img
            src="/linear.webp"
            width={300}
            height={300}
            className="h-full w-full object-cover"
            alt="linear board demo"
          />
        </div>
      ),
    },
    {
      title: "Version control",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--orange-500),var(--yellow-500))] text-white">
          Version control
        </div>
      ),
    },
    {
      title: "Running out of content",
      description:
        "Experience real-time updates and never stress about version control again. Our platform ensures that you're always working on the most recent version of your project, eliminating the need for constant manual updates. Stay in the loop, keep your team aligned, and maintain the flow of your work without any interruptions.",
      content: (
        <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(to_bottom_right,var(--cyan-500),var(--emerald-500))] text-white">
          Running out of content
        </div>
      ),
    },
  ];

  return (
    <section className="w-full bg-black">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="flex flex-col items-start justify-center">
          <div className="flex flex-wrap items-center gap-4 text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-[0.8]">
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

            <br />

            {/* Post-text */}
            <span className="leading-tight">love about Metrica</span>
          </div>
        </div>
      </div>
      
      {/* Sticky Scroll Section - flows naturally with page scroll */}
      <StickyScroll content={content} />
    </section>
  );
}
