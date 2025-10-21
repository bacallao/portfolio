"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: string;
    description: string;
    content?: React.ReactNode | any;
  }[];
  contentClassName?: string;
}) => {
  const [activeCard, setActiveCard] = React.useState(0);
  const containerRef = useRef<any>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const cardLength = content.length;

  // Card visibility state
  const [isCardVisible, setIsCardVisible] = React.useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;

      // Check if container center area is in viewport
      // Card visible when container is being actively scrolled through
      const isContainerVisible = containerRect.top < viewportCenter && containerRect.bottom > viewportCenter;
      setIsCardVisible(isContainerVisible);

      if (!isContainerVisible) return;

      // Find which content section is closest to viewport center
      let closestIndex = 0;
      let closestDistance = Infinity;

      contentRefs.current.forEach((ref, index) => {
        if (!ref) return;
        
        const rect = ref.getBoundingClientRect();
        const elementCenter = rect.top + rect.height / 2;
        const distance = Math.abs(elementCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveCard(closestIndex);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [cardLength]);

  const backgroundColors = [
    "#0f172a", // slate-900
    "#000000", // black
    "#171717", // neutral-900
  ];
  const linearGradients = [
    "linear-gradient(to bottom right, #06b6d4, #10b981)", // cyan-500 to emerald-500
    "linear-gradient(to bottom right, #ec4899, #6366f1)", // pink-500 to indigo-500
    "linear-gradient(to bottom right, #f97316, #eab308)", // orange-500 to yellow-500
  ];

  const [backgroundGradient, setBackgroundGradient] = useState(
    linearGradients[0]
  );

  useEffect(() => {
    setBackgroundGradient(linearGradients[activeCard % linearGradients.length]);
  }, [activeCard]);

  return (
    <motion.div 
      ref={containerRef}
      animate={{
        backgroundColor: backgroundColors[activeCard % backgroundColors.length],
      }}
      className="w-full relative rounded-md"
    >
      {/* Add top spacing to delay content appearance until card is centered */}
      <div className="h-20" />
      
      <div className="max-w-7xl mx-auto px-4">
        <div className="max-w-2xl">
          {content.map((item, index) => (
            <div 
              key={item.title + index}
              ref={(el) => { contentRefs.current[index] = el; }}
              className="min-h-[60vh] flex flex-col justify-center py-10"
            >
              <motion.h2
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-2xl font-bold text-slate-100"
              >
                {item.title}
              </motion.h2>
              <motion.p
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                }}
                className="text-kg mt-4 max-w-sm text-slate-300"
              >
                {item.description}
              </motion.p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Add bottom spacing to keep content visible until card exits */}
      <div className="h-20" />
      
      {/* Card - stays fixed in center, only visibility changes */}
      {isCardVisible && (
        <div
          style={{ 
            background: backgroundGradient,
          }}
          className={cn(
            "fixed top-1/2 -translate-y-1/2 right-10 lg:right-20 xl:right-40 hidden h-60 w-80 overflow-hidden rounded-md bg-white lg:block",
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      )}
    </motion.div>
  );
};
