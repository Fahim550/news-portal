"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const MOCK_BREAKING_NEWS = [
  { id: 1, title: "Global Markets Rally As Tech Stocks Surge To New All-Time Highs", slug: "markets-rally" },
  { id: 2, title: "Major Scientific Breakthrough in Renewable Energy announced today", slug: "renewable-energy" },
  { id: 3, title: "International Summit Concludes With Historic Climate Agreement", slug: "climate-agreement" },
  { id: 4, title: "New AI Model Demonstrates Unprecedented Reasoning Capabilities", slug: "new-ai-model" },
];

export function BreakingNewsTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Animation logic can be done with CSS or Framer Motion. 
  // We'll use simple CSS animation for the ticker for best performance.

  return (
    <div className="flex items-stretch h-10 border-b border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 bg-destructive text-destructive-foreground px-4 py-1 font-bold text-sm z-10 shadow-[4px_0_12px_rgba(0,0,0,0.1)]">
        <Zap className="w-4 h-4 fill-current animate-pulse" />
        <span className="hidden sm:inline-block tracking-wider uppercase text-xs">Breaking</span>
      </div>
      
      <div 
        className="flex-1 overflow-hidden relative flex items-center"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* We use two identical lists to create a seamless infinite scroll effect */}
        <div 
          className={cn(
            "flex whitespace-nowrap animate-ticker",
            isHovered && "paused"
          )}
        >
          {[...MOCK_BREAKING_NEWS, ...MOCK_BREAKING_NEWS].map((news, i) => (
            <div key={`${news.id}-${i}`} className="inline-flex items-center">
              <Link 
                href={`/news/${news.slug}`} 
                className="text-sm font-medium hover:text-primary transition-colors px-6"
              >
                {news.title}
              </Link>
              <span className="w-1.5 h-1.5 rounded-full bg-primary/40 inline-block" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
