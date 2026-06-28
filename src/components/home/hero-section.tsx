import Image from "next/image";
import Link from "next/link";
import { LineChart, Newspaper } from "lucide-react";

export function HeroSection() {
  const latestNews = [
    "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি",
    "সিলেটে নতুন ডিসি নিয়োগ",
    "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক",
    "সাবেক সিইসি হাবিবুল আউয়ালের জামিন প্রশ্নে হাইকোর্টের রুল",
    "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি আইআরজিসির",
    "ডিএমপির অভিযানে রাজধানীতে গ্রেফতার ৫৯",
    "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি চালুর দাবি সংসদে",
    "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা",
    "চীনের সঙ্গে সমঝোতায় বাংলাদেশের নিউ মিডিয়ায় গুণগত পরিবর্তন আসবে: তথ্যমন্ত্রী",
    "করাচিতে সেনা ক্যাম্পে সন্ত্রাসী হামলা, নিহত ৩ সেনাসহ ৬",
  ];

  const stockNews = [
    { title: "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
    { title: "সূচকের উত্থানে চলছে লেনদেন", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" },
    { title: "পপুলার লাইফের লভ্যাংশ ঘোষণা", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop" },
    { title: "আইসিএসবি'র বার্ষিক সাধারণ সভা অনুষ্ঠিত", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=400&auto=format&fit=crop" },
    { title: "লন্ডন স্টক এক্সচেঞ্জে বেক্সিমকো ফার্মাসিউটিক্যালসের জিডিআর লেনদেন পুনরায় শুরু", image: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop" },
    { title: "১১৫ দিন আটকে থাকার পর দেশের পথে বিএসসির 'নর্ডিক পোলক্স'", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop" },
    { title: "সাপ্তাহিক দর পতনের শীর্ষে বেক্সিমকো", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
  ];

  const gridNews = [
    { title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি...", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে", image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop" },
    { title: "রামপুরায় মানবতাবিরোধী অপরাধের মামলায় ডিএমপির সাবেক...", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
    { title: "আকস্মিক 'স্পারসো' পরিদর্শনে প্রধানমন্ত্রী তারেক রহমান", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <>
      {/* Top Banners Section (Placeholders for Dashboard Ads) */}
      <div className="flex flex-col md:flex-row gap-4 lg:gap-8 mb-8 justify-center container mx-auto px-4">
        <div className="w-full md:w-[320px] h-[80px] bg-indigo-900 rounded-sm flex items-center justify-center text-white/50 text-sm border border-indigo-950 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <span className="relative z-10">Banner Ad (Left)</span>
        </div>
        <div className="w-full md:w-[320px] h-[80px] bg-[#ffdb00] rounded-sm flex items-center justify-center text-yellow-900 text-sm border border-yellow-500 overflow-hidden">
          Banner Ad (Middle)
        </div>
        <div className="w-full md:w-[320px] h-[80px] bg-[#e31837] rounded-sm flex items-center justify-center text-white text-sm font-bold border border-red-700 overflow-hidden">
          GPH ispat (Banner Ad)
        </div>
      </div>

      {/* Main 3 Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Column: Featured & Grid (Approx 55%) */}
        <div className="lg:w-[55%] flex flex-col gap-6">
          {/* Featured News */}
          <Link href="#" className="group block border-b border-gray-200 pb-6">
            <div className="relative w-full aspect-[16/10] mb-4 overflow-hidden border border-gray-100 rounded-sm bg-gray-100">
               <Image 
                 src="https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop" 
                 alt="World Bank" 
                 fill 
                 className="object-cover transition-transform duration-500 group-hover:scale-105" 
               />
            </div>
            <h1 className="text-2xl md:text-[28px] font-bold text-[#042a59] mb-3 group-hover:text-[#0b753a] transition-colors leading-tight">
              ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক
            </h1>
            <p className="text-gray-600 text-[15px] leading-relaxed">
              দেশের ব্যাংকিং খাতের ভিত মজবুত করা, অর্থনৈতিক প্রবৃদ্ধি পুনরুদ্ধার এবং কর্মসংস্থান সৃষ্টির লক্ষ্যে ৪৫ কোটি মার্কিন...
            </p>
          </Link>

          {/* 2x2 Grid Below Featured */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6">
             {gridNews.map((news, idx) => (
               <Link href="#" key={idx} className="flex gap-3 group items-start border-b border-gray-100 pb-4 md:border-0 md:pb-0">
                  <div className="relative w-28 h-[76px] shrink-0 bg-gray-100 overflow-hidden border border-gray-200 rounded-sm">
                     <Image 
                       src={news.image} 
                       alt={news.title} 
                       fill 
                       className="object-cover transition-transform duration-500 group-hover:scale-105" 
                     />
                  </div>
                  <h3 className="font-medium text-[15px] text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                    {news.title}
                  </h3>
               </Link>
             ))}
          </div>
        </div>

        {/* Middle Column: সর্বশেষ (Approx 20%) */}
        <div className="lg:w-[20%] flex flex-col border border-gray-200 rounded-sm bg-white overflow-hidden shrink-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-gray-200/60 bg-gray-50/50">
            <Newspaper className="w-5 h-5 text-gray-400" strokeWidth={1.5} />
            <span className="font-bold text-[17px] text-gray-800">সর্বশেষ</span>
          </div>
          <div className="flex flex-col px-4">
            {latestNews.map((title, idx) => (
              <Link href="#" key={idx} className="py-3.5 border-b border-gray-100 last:border-0 group">
                <h3 className="text-[15px] font-medium text-gray-800 group-hover:text-[#0b753a] transition-colors leading-snug">
                  {title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: পুঁজিবাজার সর্বশেষ (Approx 25%) */}
        <div className="lg:w-[25%] flex flex-col border border-gray-200 rounded-sm bg-white overflow-hidden shrink-0">
          <div className="flex items-center gap-2 px-4 py-3 border-b-2 border-[#b83b3b]/20 bg-gray-50/50">
            <LineChart className="w-5 h-5 text-[#b83b3b]" strokeWidth={1.5} />
            <span className="font-bold text-[17px] text-[#b83b3b]">পুঁজিবাজার সর্বশেষ</span>
          </div>
          <div className="flex flex-col px-4">
            {stockNews.map((news, idx) => (
              <Link href="#" key={idx} className="py-3.5 border-b border-gray-100 last:border-0 group flex gap-3 items-center">
                <div className="relative w-20 h-14 shrink-0 bg-gray-100 overflow-hidden border border-gray-200 rounded-sm">
                   <Image 
                     src={news.image} 
                     alt={news.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105" 
                   />
                </div>
                <h3 className="text-[15px] font-medium text-gray-800 group-hover:text-[#0b753a] transition-colors leading-snug">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
