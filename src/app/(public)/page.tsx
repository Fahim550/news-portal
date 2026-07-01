import { HeroSection } from "@/components/home/hero-section";
import { LiveNewsBanner } from "@/components/home/live-news-banner";
import { ActionButtons } from "@/components/home/action-buttons";
import { NationalInternationalNews } from "@/components/home/national-international-news";
import { DistrictNewsMap } from "@/components/home/district-news-map";
import { SportsCorporateNews } from "@/components/home/sports-corporate-news";
import { GalleryEnvironmentSection } from "@/components/home/gallery-environment-section";
import { EntertainmentCarousel } from "@/components/home/entertainment-carousel";
import { LifestyleEntertainmentNews } from "@/components/home/lifestyle-entertainment-news";
import { MixedCategoryGrid } from "@/components/home/mixed-category-grid";
import { CorporateNotices } from "@/components/home/corporate-notices";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 flex flex-col gap-6">
      
      {/* 1. Top Layout: Hero Section (Featured + Grids + Latest Tabs) */}
      <HeroSection />
      
      {/* 2. Top Promotional Banner */}
      <div className="w-full my-4">
        <div className="w-full h-[120px] bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden relative group cursor-pointer shadow-sm">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center">
             <span className="text-xl md:text-3xl font-black text-gray-800 drop-shadow-sm tracking-tight">Full Width Promotion Banner</span>
             <span className="text-sm text-gray-500 mt-1 font-medium">Dashboard Controlled Ad Space</span>
          </div>
        </div>
      </div>

      {/* 3. Live News TV Banner */}
      <LiveNewsBanner />

      {/* 4. Action Buttons (E-Paper etc) */}
      <ActionButtons />

      {/* 5. National & International Category Block */}
      <NationalInternationalNews />

      {/* 6. Lifestyle & Entertainment Block */}
      <LifestyleEntertainmentNews />

      {/* 7. Bangladesh Map District Selection Block */}
      <DistrictNewsMap />

      {/* 8. Sports & Corporate News Block */}
      <SportsCorporateNews />
      
      {/* 9. Mixed Category Grid Block */}
      <MixedCategoryGrid />

      {/* 10. Photo Gallery (Dark Theme) */}
      <GalleryEnvironmentSection />

      {/* 11. Bottom Movie Carousel */}
      <EntertainmentCarousel />

      {/* 12. Corporate Notices */}
      <CorporateNotices />
      
    </div>
  );
}
