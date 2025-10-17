"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";

interface CursorWorkbenchProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export default function CursorWorkbench({ width = '90vw', height = '90vh', className }: CursorWorkbenchProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!stickyRef.current || !containerRef.current) return;

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

  // Container dimensions: transition from fullscreen to specified dimensions
  const containerWidth = scrollProgress === 1 ? width : '100vw';
  const containerHeight = scrollProgress === 1 ? height : '100vh';

  return (
    <div 
      ref={containerRef}
      className={className}
      style={{
        position: 'relative',
        // Ensure animation completes fully: 100vh for sticky element + 100vh of scroll distance
        minHeight: '200vh',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
    >
      <div 
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: containerWidth,
          height: containerHeight,
          margin: '0 auto',
          backgroundColor: 'black',
          overflow: 'hidden',
          transition: scrollProgress > 0.9 ? 'width 0.3s ease-out, height 0.3s ease-out' : 'none'
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


