import React from "react";
import { Heatmap } from '@paper-design/shaders-react';

export default function ShaderLogo() {
  return (
    <Heatmap
      width={1280}
      height={720}
      image="/images/logo.svg"
      colors={["#9b8046", "#ffffff"]}
      colorBack="#000000"
      contour={0.5}
      angle={0}
      noise={0.75}
      innerGlow={0.5}
      outerGlow={0.5}
      speed={0.5}
      scale={0.75}
    />
  );
} 
