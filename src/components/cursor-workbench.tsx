"use client";

import React from "react";
import { cn } from "@/src/lib/utils";
import EditorHeader from "@/src/components/editor-header";
import { FileExplorerSidebar } from "@/src/components/file-explorer-sidebar";
import CursorSidebar from "@/src/components/cursor-sidebar";
import { CursorTerminal } from "@/src/components/cursor-terminal";
import EditorFooter from "@/src/components/editor-footer";

type CursorWorkbenchProps = {
  /** Additional classes applied to the scaling wrapper (not the inner layout). */
  className?: string;
  /** Size classes for the inner workbench layout (e.g. width/height). Defaults to a desktop-like frame. */
  containerClassName?: string;
  /** Starting scale when the page first loads (zoomed-in). 1 means no zoom. */
  initialScale?: number;
  /** How far the user must scroll for the zoom to complete, in vh units. */
  scrollDistanceVh?: number;
};

export default function CursorWorkbench({
  className,
  containerClassName,
  initialScale = 1.8,
  scrollDistanceVh = 180,
}: CursorWorkbenchProps) {
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function clamp(v: number, min: number, max: number) {
      return Math.max(min, Math.min(max, v));
    }
    let raf = 0;
    const onScroll = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = wrapperRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = typeof window !== "undefined" ? window.innerHeight : 1;
        const total = rect.height - vh;
        if (total <= 0) {
          setProgress(1);
          return;
        }
        const p = clamp((-rect.top) / total, 0, 1);
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      if (raf) cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Ease-out cubic for a natural deceleration
  const eased = 1 - Math.pow(1 - progress, 3);
  const scale = initialScale - (initialScale - 1) * eased;

  return (
    <div ref={wrapperRef} style={{ height: `${scrollDistanceVh}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-black">
        <div className="flex h-screen w-screen items-center justify-center">
          <div
            className={cn("origin-center", className)}
            style={{ transform: `scale(${scale})`, willChange: "transform" }}
          >
            <WorkbenchContent
              className={
                containerClassName ??
                // Default desktop-like frame; parent may override via containerClassName
                "w-[1200px] h-[740px]"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function WorkbenchContent({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full w-full flex-col bg-background", className)}>
      {/* Header */}
      <EditorHeader />

      {/* Middle row: left sidebar, center content (video + terminal), right sidebar */}
      <div className="flex flex-1 min-h-0">
        {/* Left sidebar (contained between header and footer) */}
        <CursorSidebar className="hidden lg:flex" />

        {/* Center column: video fills available space above terminal */}
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="relative flex-1 min-h-0">
            <video
              aria-label="Background editor video"
              className="absolute inset-0 h-full w-full object-cover"
              src="/videos/video.mov"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
          <div className="shrink-0">
            <CursorTerminal />
          </div>
        </div>

        {/* Right sidebar (contained between header and footer) */}
        <FileExplorerSidebar className="hidden lg:flex" />
      </div>

      {/* Footer */}
      <EditorFooter />
    </div>
  );
}


