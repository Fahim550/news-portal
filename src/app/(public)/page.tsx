import { HeroSection } from "@/components/home/hero-section";
import { NationalInternationalNews } from "@/components/home/national-international-news";
import { LifestyleEntertainmentNews } from "@/components/home/lifestyle-entertainment-news";
import { SportsCorporateNews } from "@/components/home/sports-corporate-news";
import { MixedCategoryGrid } from "@/components/home/mixed-category-grid";
import { GalleryEnvironmentSection } from "@/components/home/gallery-environment-section";
import { CorporateNotices } from "@/components/home/corporate-notices";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-12">
      <HeroSection />
      <NationalInternationalNews />
      <LifestyleEntertainmentNews />
      
      {/* 2 Promotion Banner Placeholders between Third and Fourth Section */}
      <div className="flex flex-col md:flex-row gap-6 lg:gap-8">
        <div className="w-full md:w-1/2 h-[120px] bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center">
             <span className="text-xl md:text-2xl font-black text-gray-800 drop-shadow-sm tracking-tight">Promotion Card 1</span>
             <span className="text-sm text-gray-500 mt-1 font-medium">Dashboard Ad Space</span>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 h-[120px] bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center">
             <span className="text-xl md:text-2xl font-black text-gray-800 drop-shadow-sm tracking-tight">Promotion Card 2</span>
             <span className="text-sm text-gray-500 mt-1 font-medium">Dashboard Ad Space</span>
          </div>
        </div>
      </div>

      <SportsCorporateNews />
      <MixedCategoryGrid />
      <GalleryEnvironmentSection />
      
      {/* Corporate Notices / Promotions Grid */}
      <CorporateNotices />
    </div>
  );
}
