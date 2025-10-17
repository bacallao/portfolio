"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";

interface CursorWorkbenchProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function CursorWorkbench({ className, style }: CursorWorkbenchProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return;

      const stickyRect = stickyRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Calculate how much the sticky container has been scrolled through
      const scrollStart = containerRect.top;
      const scrollRange = containerRect.height - window.innerHeight;
      
      // Progress from 0 (animation start) to 1 (animation complete)
      const progress = Math.max(0, Math.min(1, -scrollStart / scrollRange));
      
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial call

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate transformations based on scroll progress
  const videoScale = 1 + (2.5 * (1 - scrollProgress)); // 3.5 -> 1

  // UI elements: start off-screen and move in
  const headerTranslateY = -100 * (1 - scrollProgress);
  const footerTranslateY = 100 * (1 - scrollProgress);
  const leftSidebarTranslateX = -100 * (1 - scrollProgress);
  const rightSidebarTranslateX = 100 * (1 - scrollProgress);
  const terminalTranslateY = 100 * (1 - scrollProgress);
  const elementsOpacity = scrollProgress;

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        height: '200vh', // Double viewport height to give scroll space for animation
        ...style
      }}
    >
      <div 
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          backgroundColor: 'black',
          overflow: 'hidden'
        }}
      >
      {/* Video layer */}
      <div className="absolute inset-0" style={{ zIndex: 0 }}>
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
      
      {/* UI layer */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
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

          {/* Center column */}
          <div className="flex min-w-0 flex-1 flex-col relative">
            {/* Terminal */}
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
      </div>
    </div>
  );
}


