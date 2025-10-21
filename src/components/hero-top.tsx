"use client";

import { GrainGradient } from '@paper-design/shaders-react';
import Link from 'next/link';
import React, { useState, useEffect } from "react";

export default function HeroTop() {
  const [dimensions, setDimensions] = useState({
    width: 1920,
    height: 1080
  });

  useEffect(() => {
    // Set initial dimensions on mount
    setDimensions({
      width: window.innerWidth,
      height: window.innerHeight
    });

    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ position: "relative", height: "100%", width: "100%", overflow: "hidden" }}>
      {/* Gradient Background */}
      <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0 }}>
        <GrainGradient
          width={dimensions.width}
          height={dimensions.height}
          colors={["#154D71", "#1C6EA4", "#d7cbc6"]}
          colorBack="#000a0f"
          softness={0.7}
          intensity={0.15}
          noise={0.5}
          shape="ripple"
          speed={0.90}
        />
      </div>

      {/* Content */}
      <div style={{
        position: "relative",
        zIndex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        padding: "2rem"
      }}>
        <h1 style={{
          fontSize: "3.5rem",
          fontWeight: "bold",
          marginBottom: "1.5rem",
          color: "#ffffff",
          textAlign: "center",
          lineHeight: "1.2"
        }}>
          Where talent <br /> drives performance
        </h1>
        
        <p style={{
          fontSize: "1.25rem",
          color: "#d7cbc6",
          textAlign: "center",
          marginBottom: "2rem",
          maxWidth: "600px"
        }}>
          Helping you take your ideas to life. With the power of new AI era.
        </p>

        <div style={{ display: "flex", gap: "1rem" }}>
          <Link href="/projects" style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: "#ffffff",
            color: "#000a0f",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
            position: "relative",
            zIndex: 10
          }}>
            Projects
          </Link>
          
          <Link href="/contact" style={{
            padding: "0.75rem 2rem",
            fontSize: "1rem",
            fontWeight: "600",
            backgroundColor: "transparent",
            color: "#ffffff",
            border: "2px solid #ffffff",
            borderRadius: "8px",
            cursor: "pointer",
            textDecoration: "none",
            display: "inline-block",
            position: "relative",
            zIndex: 10
          }}>
            Contact
          </Link>
        </div>
      </div>
    </div>
  );
}

