"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";

/**
 * CursorWorkbench composes the existing Cursor-like subcomponents into a single layout
 * and places the provided video as a full-bleed background. It does not modify the
 * subcomponents themselves; only positional wrappers and z-indexing are applied.
 * 
 * Features scroll-based zoom effect: video starts fullscreen and zooms out as user scrolls.
 */
export default function CursorWorkbench() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      // Calculate progress (0 to 1) over the first portion of scroll
      // Zoom out completes in the first 50% of total scroll
      const progress = Math.min(scrollTop / (scrollHeight * 0.5), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate transformations based on scroll progress
  // Video: starts at scale(3.5) to cover full viewport from center column, zooms out to scale(1)
  const videoScale = 1 + (2.5 * (1 - scrollProgress)); // 3.5 -> 1

  // UI elements: start off-screen and move in
  const headerTranslateY = -100 * (1 - scrollProgress); // -100% -> 0%
  const footerTranslateY = 100 * (1 - scrollProgress); // 100% -> 0%
  const leftSidebarTranslateX = -100 * (1 - scrollProgress); // -100% -> 0%
  const rightSidebarTranslateX = 100 * (1 - scrollProgress); // 100% -> 0%
  const terminalTranslateY = 100 * (1 - scrollProgress); // 100% -> 0%
  const elementsOpacity = scrollProgress; // 0 -> 1

  return (
    <>
      {/* Spacer to enable scrolling */}
      <div style={{ height: "200vh" }} />
      
      {/* Full-screen video layer - positioned to fill entire viewport */}
      <div 
        className="fixed inset-0"
        style={{ 
          zIndex: 0,
          backgroundColor: 'black',
          pointerEvents: 'none'
        }}
      >
        <video
          aria-label="Background editor video"
          className="w-full h-full object-cover"
          style={{
            transform: `scale(${videoScale})`,
            transformOrigin: 'center center',
            transition: 'none'
          }}
          src="/videos/video.mov"
          autoPlay
          loop
          muted
          playsInline
        />
      </div>
      
      {/* UI layer with video background */}
      <div 
        ref={containerRef}
        className="fixed inset-0 flex flex-col"
        style={{ zIndex: 1 }}
      >
        {/* Header */}
        <div 
          style={{
            transform: `translateY(${headerTranslateY}%)`,
            opacity: elementsOpacity,
            transition: 'none'
          }}
        >
          <EditorHeader />
        </div>

        {/* Middle row: left sidebar, center content, right sidebar */}
        <div className="flex flex-1 min-h-0 overflow-hidden">
          {/* Left sidebar */}
          <div
            style={{
              transform: `translateX(${leftSidebarTranslateX}%)`,
              opacity: elementsOpacity,
              transition: 'none'
            }}
            className="hidden lg:flex"
          >
            <CursorSidebar className="flex" />
          </div>

          {/* Center column: transparent space for video, with terminal at bottom */}
          <div className="flex min-w-0 flex-1 flex-col relative">
            {/* Terminal - positioned at bottom */}
            <div 
              className="mt-auto shrink-0 relative"
              style={{
                transform: `translateY(${terminalTranslateY}%)`,
                opacity: elementsOpacity,
                transition: 'none',
                zIndex: 1
              }}
            >
              <CursorTerminal />
            </div>
          </div>

          {/* Right sidebar */}
          <div
            style={{
              transform: `translateX(${rightSidebarTranslateX}%)`,
              opacity: elementsOpacity,
              transition: 'none'
            }}
            className="hidden lg:flex"
          >
            <FileExplorerSidebar className="flex" />
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            transform: `translateY(${footerTranslateY}%)`,
            opacity: elementsOpacity,
            transition: 'none'
          }}
        >
          <EditorFooter />
        </div>
      </div>
    </>
  );
}


