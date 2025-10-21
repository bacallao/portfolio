"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import GridTech from "@/src/components/grid-tech";
import FeatureCards from "@/src/components/feature-cards";

export default function DeveloperBase() {
  return (
    <div className="bg-black">
      <CursorWorkbench width="90vw" height="90vh" marginTop={200} />
      <FeatureCards />
      <GridTech></GridTech>
      <div style={{ height: "200vh" }}></div>
    </div>
  );
}
