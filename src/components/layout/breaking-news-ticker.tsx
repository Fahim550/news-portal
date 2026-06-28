"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MOCK_BREAKING_NEWS = [
  { id: 1, title: "কোভিড, নন-কোভিড দুই সেবাই চলবে মুগদা হাসপাতালে", slug: "covid-non-covid-mugda" },
  { id: 2, title: "বিশ্বের ট্রাভেল ও পর্যটনকে হাতের মুঠোয় এনেছে ওটিএ", slug: "world-travel-tourism-ota" },
  { id: 3, title: "কমেছে সড়ক বেড়েছে মামলা, কমেনি দুর্ভোগ", slug: "road-accidents-cases-sufferings" },
];

export function BreakingNewsTicker() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="container mx-auto">
        <div className="flex items-center h-[52px]">
          {/* Label */}
          <div className="flex items-center justify-center bg-[#0b753a] text-white px-4 py-1.5 font-bold text-[15px] whitespace-nowrap shrink-0 ml-4 lg:ml-0 mr-4">
            সংবাদ শিরোনাম
          </div>
          
          {/* Ticker Container */}
          <div 
            className="flex-1 overflow-hidden relative flex items-center h-full"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div 
              className={cn(
                "flex whitespace-nowrap animate-ticker items-center",
                isHovered && "paused"
              )}
            >
              {[...MOCK_BREAKING_NEWS, ...MOCK_BREAKING_NEWS, ...MOCK_BREAKING_NEWS].map((news, i) => (
                <div key={`${news.id}-${i}`} className="inline-flex items-center group mr-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-600 mr-2 flex-shrink-0" />
                  <Link 
                    href={`/news/${news.slug}`} 
                    className="text-[15px] font-medium text-gray-800 group-hover:text-[#0b753a] transition-colors"
                  >
                    {news.title}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
