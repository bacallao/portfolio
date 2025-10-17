"use client";

import React from "react";
import CursorWorkbench from "@/src/components/cursor-workbench";

export default function DeveloperBase() {
  return <>
  <CursorWorkbench className="w-[90vw] h-[90vh]"/>
  <div style={{ height: "200vh" }} />
  </>
}
