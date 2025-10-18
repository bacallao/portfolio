"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";
import HeroTop from "@/src/components/hero-top";

interface CursorWorkbenchProps {
  width?: string | number;
  height?: string | number;
  marginTop?: string | number;
  className?: string;
}

export default function CursorWorkbench({ width = '90vw', height = '90vh', marginTop = 0, className }: CursorWorkbenchProps) {
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

  // UI elements: start off-screen and move in
  const headerTranslateY = -100 * (1 - scrollProgress);
  const footerTranslateY = 100 * (1 - scrollProgress);
  const leftSidebarTranslateX = -100 * (1 - scrollProgress);
  const rightSidebarTranslateX = 100 * (1 - scrollProgress);
  const terminalTranslateY = 100 * (1 - scrollProgress);
  const elementsOpacity = scrollProgress;

  // Container dimensions: smoothly transition from fullscreen to specified dimensions
  const getInterpolatedValue = (start: string | number, end: string | number) => {
    // Parse viewport units
    const parseValue = (val: string | number): { value: number; unit: string } => {
      if (typeof val === 'number') return { value: val, unit: 'px' };
      const match = String(val).match(/^([\d.]+)(.*)$/);
      return match ? { value: parseFloat(match[1]), unit: match[2] } : { value: 0, unit: '' };
    };
    
    const startParsed = parseValue(start);
    const endParsed = parseValue(end);
    
    // Interpolate the numeric value
    const interpolated = startParsed.value + (endParsed.value - startParsed.value) * scrollProgress;
    return `${interpolated}${endParsed.unit || startParsed.unit}`;
  };

  const containerWidth = getInterpolatedValue('100vw', width);
  const containerHeight = getInterpolatedValue('100vh', height);
  const containerMarginTop = typeof marginTop === 'number' 
    ? marginTop * scrollProgress 
    : getInterpolatedValue(0, marginTop);

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
          top: containerMarginTop,
          width: containerWidth,
          height: containerHeight,
          marginLeft: 'auto',
          marginRight: 'auto',
          backgroundColor: 'black',
          overflow: 'hidden',
          transition: 'none'
        }}
      >
      {/* Background Content Layer */}
      <div 
        className="absolute inset-0"
        style={{
          zIndex: 0,
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Hero Top Section - 50% height */}
        <div style={{ height: '50%', overflow: 'hidden' }}>
          <HeroTop />
        </div>

        {/* Video Section - 50% height */}
        <div style={{ height: '50%', overflow: 'hidden' }}>
          <video
            aria-label="Background editor video"
            className="w-full h-full object-cover"
            src="/videos/video.mov"
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </div>
      
      {/* UI layer (overlays both hero and video) */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 1 }}>
        {/* Header */}
        <div 
          style={{
            transform: `translateY(${headerTranslateY}%)`,
            opacity: 1,
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
              opacity: 1,
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
                opacity: 1,
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
              opacity: 1,
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
            opacity: 1,
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