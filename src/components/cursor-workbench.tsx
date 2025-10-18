"use client";

import React, { useEffect, useRef, useState } from "react";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";
import HeroTop from "@/src/components/hero-top";
import { InfiniteLogoSlider } from "@/src/components/infinite-logo-slider";

interface CursorWorkbenchProps {
  width?: string | number;
  height?: string | number;
  marginTop?: string | number;
  className?: string;
}

export default function CursorWorkbench({ width = '90vw', height = '90vh', marginTop = 0, className }: CursorWorkbenchProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.play();
        setIsVideoPlaying(true);
      }
    }
  };

  // Sidebar spacers: 0px at fullscreen, 280px when animation completes
  const sidebarSpacerWidth = 280 * scrollProgress;

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
        className="absolute inset-0 flex"
        style={{
          zIndex: 0
        }}
      >
        {/* Left sidebar spacer - animated from 0 to 280px - hidden on smaller screens */}
        <div 
          className="hidden lg:block shrink-0" 
          style={{ width: `${sidebarSpacerWidth}px` }}
        />
        
        {/* Center content - Hero and Video */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Hero Top Section - 50% height */}
          <div style={{ height: '50%', overflow: 'hidden' }}>
            <HeroTop />
          </div>

          {/* Video Section - 50% height */}
          <div style={{ height: '50%', overflow: 'hidden', position: 'relative' }}>
            <video
              ref={videoRef}
              aria-label="Background editor video"
              className="w-full h-full object-cover"
              src="/videos/video.mov"
              autoPlay
              loop
              muted
              playsInline
            />
            {/* Play/Pause Button - Top Right */}
            <button
              onClick={toggleVideo}
              className="absolute top-4 right-4 bg-white hover:bg-gray-100 text-black rounded p-2 transition-all duration-200 shadow-lg"
              style={{ zIndex: 10 }}
              aria-label={isVideoPlaying ? "Pause video" : "Play video"}
            >
              {isVideoPlaying ? (
                // Pause Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                // Play Icon
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            {/* Infinite Logo Slider overlay on video */}
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0,
                zIndex: 1,
                pointerEvents: 'auto'
              }}
            >
              <InfiniteLogoSlider scrollProgress={scrollProgress} />
            </div>
          </div>
        </div>

        {/* Right sidebar spacer - animated from 0 to 280px - hidden on smaller screens */}
        <div 
          className="hidden lg:block shrink-0" 
          style={{ width: `${sidebarSpacerWidth}px` }}
        />
      </div>
      
      {/* UI layer (overlays both hero and video) */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 2, pointerEvents: 'none' }}>
        {/* Header */}
        <div 
          style={{
            transform: `translateY(${headerTranslateY}%)`,
            opacity: 1,
            transition: 'none',
            pointerEvents: 'auto'
          }}
        >
          <EditorHeader />
        </div>

        {/* Middle row: left sidebar, center content, right sidebar */}
        <div className="flex flex-1 min-h-0 overflow-hidden" style={{ pointerEvents: 'none' }}>
          {/* Left sidebar */}
          <div
            style={{
              transform: `translateX(${leftSidebarTranslateX}%)`,
              opacity: 1,
              transition: 'none',
              pointerEvents: 'auto'
            }}
            className="hidden lg:flex"
          >
            <CursorSidebar className="flex" />
          </div>

          {/* Center column */}
          <div className="flex min-w-0 flex-1 flex-col relative" style={{ pointerEvents: 'none' }}>
            {/* Terminal */}
            <div 
              className="mt-auto shrink-0 relative"
              style={{
                transform: `translateY(${terminalTranslateY}%)`,
                opacity: 1,
                transition: 'none',
                zIndex: 1,
                pointerEvents: 'auto'
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
              transition: 'none',
              pointerEvents: 'auto'
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
            transition: 'none',
            pointerEvents: 'auto'
          }}
        >
          <EditorFooter />
        </div>
      </div>
      </div>
    </div>
  );
}