"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";

export default function DeveloperBase() {
  return <>
  <CursorWorkbench width="90vw" height="90vh" />
  <div style={{ height: "100vh" }}>
    {/* Additional content goes here */}
  </div>
  </>
}
