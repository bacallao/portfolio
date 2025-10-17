"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";

export default function DeveloperBase() {
  return (
    <div className="flex w-full flex-col items-center">
      {/* Demonstrate parent-controlled sizing via containerClassName */}
      <CursorWorkbench
        // Outer wrapper classes (affect the scaling element)
        className="rounded-xl shadow-2xl"
        // Inner workbench size: parent can set any width/height here
        containerClassName="w-[1100px] h-[680px]"
        // How zoomed-in to start; larger = more dramatic zoom
        initialScale={1.9}
        // How far to scroll for full zoom-out completion
        scrollDistanceVh={200}
      />

      {/* Extra spacer content to allow continued scrolling after the effect */}
      <div className="h-[120vh] w-full" />
    </div>
  );
}
