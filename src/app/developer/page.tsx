"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";

export default function DeveloperBase() {
  return (
    <>
      <CursorWorkbench width="90vw" height="90vh" marginTop={100} />
      <div style={{ height: "200vh" }}>
      </div>
    </>
  );
}
