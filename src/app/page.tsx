"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import GridTech from "@/src/components/grid-tech";
import FeatureCards from "@/src/components/feature-cards";
import InlineDropdownHeader from "@/src/components/inline-dropdown-header";

export default function DeveloperBase() {
  return (
    <div className="bg-black">
      <CursorWorkbench width="90vw" height="90vh" marginTop={200} />
      <FeatureCards />
      <GridTech></GridTech>
      <InlineDropdownHeader></InlineDropdownHeader>
      <div style={{ height: "200vh" }}></div>
    </div>
  );
}
