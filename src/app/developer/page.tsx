"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import ShaderLogo from "@/src/components/shader-logo";
import { InfiniteLogoSlider } from "@/src/components/infinite-logo-slider";

export default function DeveloperBase() {
  return (
    <>
      <CursorWorkbench width="90vw" height="90vh" marginTop={100} />
      <div style={{ height: "200vh" }}>
      </div>
      <ShaderLogo />
      <InfiniteLogoSlider/>
    </>
  );
}
