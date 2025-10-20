"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";
import GridTech from "@/src/components/grid-tech";

export default function DeveloperBase() {
  return (
    <div className="bg-black">
      <CursorWorkbench width="90vw" height="90vh" marginTop={100} />
      <div style={{ height: "200vh" }}>
        <GridTech></GridTech>
      </div>

    </div>
  );
}
