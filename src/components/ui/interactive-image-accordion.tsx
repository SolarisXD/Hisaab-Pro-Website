"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

export interface AccordionImage {
  id: string | number;
  title: string;
  desc?: string;
  imageUrl: string;
}

interface InteractiveImageAccordionProps {
  items: AccordionImage[];
  className?: string;
}

export function InteractiveImageAccordion({ items, className }: InteractiveImageAccordionProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={cn("flex flex-row items-center justify-center gap-2 sm:gap-3 lg:gap-4 w-full", className)}>
      {items.map((item, index) => {
        const isActive = index === activeIndex;
        return (
          <div
            key={item.id}
            className={cn(
              "relative h-[200px] sm:h-[260px] md:h-[340px] lg:h-[420px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-700 ease-in-out shrink-0 bg-[#626262]",
              isActive ? "w-[320px] sm:w-[440px] md:w-[580px] lg:w-[720px]" : "w-[40px] sm:w-[50px] md:w-[70px] lg:w-[80px]"
            )}
            onMouseEnter={() => setActiveIndex(index)}
            onClick={() => setActiveIndex(index)}
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden">
              <img
                src={item.imageUrl}
                alt={item.title}
                className={cn(
                  "w-full h-full object-cover object-left-top transition-opacity duration-700",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            </div>
            
            <div 
              className={cn(
                "absolute inset-0 transition-colors duration-500 pointer-events-none",
                isActive ? "bg-black/10 dark:bg-black/30" : "bg-transparent"
              )}
            />
            
            {/* Inactive Rotated Title */}
            <span
              className={cn(
                "absolute text-white font-semibold whitespace-nowrap transition-all duration-500 ease-in-out transform origin-center pointer-events-none",
                isActive
                  ? "opacity-0 scale-95 bottom-6 left-1/2 -translate-x-1/2 rotate-0"
                  : "text-xs sm:text-sm bottom-24 left-1/2 -translate-x-1/2 -rotate-90 opacity-70"
              )}
            >
              {item.title}
            </span>

            {/* Active Info Panel */}
            <div
              className={cn(
                "absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 p-3 sm:p-4 rounded-xl backdrop-blur-md bg-black/50 border border-white/10 transition-all duration-500 ease-in-out transform pointer-events-none",
                isActive
                  ? "translate-y-0 opacity-100 delay-200"
                  : "translate-y-8 opacity-0"
              )}
            >
              <h4 className="text-white font-bold text-sm sm:text-base lg:text-lg tracking-tight">
                {item.title}
              </h4>
              {item.desc && (
                <p className="text-white/80 text-xs sm:text-sm mt-1 hidden sm:block">
                  {item.desc}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
