"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import HeroTop from "@/src/components/hero-top";

export default function DeveloperBase() {
  return (
    <>
      <CursorWorkbench width="90vw" height="90vh" marginTop={100} />
      <HeroTop />
    </>
  );
}
