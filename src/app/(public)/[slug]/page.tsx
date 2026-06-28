import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  // Mock Data
  const featuredArticle = {
    title: "৪৭তম বিসিএসের চূড়ান্ত ফল প্রকাশ",
    excerpt: "৪৭তম বিসিএস পরীক্ষার চূড়ান্ত ফল প্রকাশ করেছে সরকারি কর্ম কমিশন-পিএসসি। চাকরিতে নিয়োগের জন্য মনোনয়ন পেয়েছেন মোট ১...",
    image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=800&auto=format&fit=crop"
  };

  const sideArticles = [
    { title: "ঘামের উপসর্গে আরও চার শিশুর মৃত্যু", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
    { title: "বাজেটে মানবসম্পদ উন্নয়ন ও অবকাঠামো খাতকে সর্বোচ্চ গুরুত্ব", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
    { title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি...", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" }
  ];

  const subCategoryArticles = [
    { title: "রাজধানীতে কার্যক্রম নিষিদ্ধ আ.লীগের ২৬ নেতাকর্মী গ্রেফতার", image: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop" },
    { title: "সারাদেশে বিক্ষোভের ডাক এনসিপির", image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop" },
    { title: "মামুনুল হককে নিয়ে সংসদে দেওয়া বক্তব্য এক্সপাঞ্জ করলেন স্পিকার", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop" },
    { title: "সংসদ সদস্যদের ফ্লাটে ওয়াশিং মেশিন ও ওভেন চাইলেন জামায়াত এমপি", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
    { title: "জিয়াউর রহমানের কর্ম ও আদর্শ নিয়ে উচ্চমানের গবেষণার আহ্বান মির্জা ফখরুলের", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=400&auto=format&fit=crop" },
    { title: "বাজেটকে ঋণনির্ভর, উচ্চাভিলাষী ও অবাস্তবায়নযোগ্য বলল জামায়াত", image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=400&auto=format&fit=crop" }
  ];

  const recentNews = [
    { title: "রবি, ইআরএফ ও ব্রিটিশ কাউন্সিলের উদ্যোগে সাংবাদিকদের যোগাযোগ দক্ষতা উন্নয়ন", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
    { title: "টিউলিপের বিরুদ্ধে অভিযোগ গঠনের শুনানি সেপ্টেম্বরে", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "আয়াতুল্লাহ আলী খামেনির শেষ যাত্রায় যোগ দিতে পারেন ২ কোটির বেশি মানুষ", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
    { title: "ওষুধের চাহিদা মেটাতে সিটাসি ফার্মার সঙ্গে স্কয়ারের চুক্তি", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" }
  ];

  // Capitalize title based on slug for now
  const categoryTitle = slug === "national" ? "জাতীয়" : 
                        slug === "investment" ? "বিনিয়োগ" :
                        slug === "sports" ? "খেলাধুলা" : 
                        slug === "international" ? "আন্তর্জাতিক" : "ক্যাটাগরি";

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-4 md:py-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-gray-500 mb-6 font-medium">
          <Link href="/" className="flex items-center gap-1 hover:text-[#0b753a] transition-colors">
            <Home className="w-3.5 h-3.5" />
            <span>প্রচ্ছদ</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#c74c2c]">{categoryTitle}</span>
        </nav>

        {/* Main 2 Column Layout */}
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Column: 70% */}
          <div className="lg:w-[70%] flex flex-col">
            
            {/* Category Title */}
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-[#c74c2c] whitespace-nowrap">{categoryTitle}</h1>
              <div className="h-[2px] w-full bg-gray-200" />
            </div>

            {/* Featured Section */}
            <div className="flex flex-col md:flex-row gap-6 mb-10">
              {/* Left Featured (Approx 60%) */}
              <div className="md:w-[60%] flex flex-col group cursor-pointer">
                <div className="relative w-full aspect-[16/9] mb-4 overflow-hidden border border-gray-200">
                  <Image 
                    src={featuredArticle.image}
                    alt={featuredArticle.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-[#0b753a] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 text-[15px] leading-relaxed">
                  {featuredArticle.excerpt}
                </p>
              </div>

              {/* Right List Items (Approx 40%) */}
              <div className="md:w-[40%] flex flex-col gap-4">
                {sideArticles.map((article, idx) => (
                  <Link href="#" key={idx} className="flex gap-3 group border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                    <div className="relative w-24 h-16 shrink-0 overflow-hidden border border-gray-200">
                      <Image 
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

            {/* Subcategory Section (Politics) */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-6">
                <h2 className="text-xl font-bold text-[#c74c2c] whitespace-nowrap">রাজনীতি</h2>
                <div className="h-[2px] w-full bg-gray-200" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                {subCategoryArticles.map((article, idx) => (
                  <Link href="#" key={idx} className="flex gap-3 items-center group border border-gray-100 p-2 hover:shadow-sm transition-shadow bg-gray-50/50">
                    <div className="relative w-20 h-14 shrink-0 overflow-hidden border border-gray-200">
                      <Image 
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="text-[14px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                      {article.title}
                    </h3>
                  </Link>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: 30% */}
          <div className="lg:w-[30%] flex flex-col">
            
            {/* Sidebar Title - Most Read */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-[#c74c2c]" />
              <h2 className="text-xl font-bold text-gray-600 whitespace-nowrap">{categoryTitle} সর্বাধিক পঠিত</h2>
              <div className="h-[1px] w-full bg-gray-200" />
            </div>
            
            {/* Some placeholder space for Most Read (Ads or list) */}
            <div className="h-32 bg-gray-50 border border-gray-200 flex items-center justify-center mb-10 text-gray-400 text-sm font-medium">
              সর্বাধিক পঠিত তালিকা
            </div>

            {/* Sidebar Title - Recent News */}
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 bg-[#c74c2c]" />
              <h2 className="text-xl font-bold text-[#c74c2c] whitespace-nowrap">সাম্প্রতিক খবর</h2>
              <div className="h-[1px] w-full bg-gray-200" />
            </div>

            {/* 2x2 Grid for Recent News */}
            <div className="grid grid-cols-2 gap-4">
              {recentNews.map((news, idx) => (
                <Link href="#" key={idx} className="flex flex-col group border border-gray-100 bg-white">
                  <div className="relative w-full aspect-[4/3] overflow-hidden border-b border-gray-100">
                    <Image 
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-2">
                    <h3 className="text-[13px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                      {news.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
