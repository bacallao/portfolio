"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import { InfiniteLogoSlider } from "@/src/components/infinite-logo-slider";

export default function DeveloperBase() {
  return (
    <>
      <CursorWorkbench width="90vw" height="90vh" marginTop={100} />
      <div style={{ height: "200vh" }}>
      </div>
      <InfiniteLogoSlider/>

      <img src="/images/editor.png" alt="Logo" />
    </>
  );
}
