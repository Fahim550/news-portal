import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export async function NationalInternationalNews() {
  const mockNationalNews = [
    { title: "বাজেটে মানবসম্পদ উন্নয়ন ও অবকাঠামো খাতকে সর্বোচ্চ গুরুত্ব দেওয়া হয়েছে: রবিউল আলম", image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=400&auto=format&fit=crop" },
    { title: "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop" },
    { title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি চালুর দাবি সংসদে", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "চীনের সঙ্গে সমঝোতায় বাংলাদেশের নিউ মিডিয়ায় গুণগত পরিবর্তন আসবে: তথ্যমন্ত্রী", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
    { title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে", image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop" },
    { title: "পদ্মা ব্যারেজ হলে ১৬৩ উপজেলা উপকৃত হবে: পানিসম্পদ প্রতিমন্ত্রী", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop" },
    { title: "ভিটামিন 'এ' প্লাস ক্যাম্পেইন শুরু", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop" },
    { title: "আকস্মিক 'স্পারসো' পরিদর্শনে প্রধানমন্ত্রী তারেক রহমান", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop" },
    { title: "নিয়ন্ত্রণ ও সুশাসনের অভাবে বীমাসহ আর্থিক খাতের নিয়ন্ত্রক সংস্থাগুলোর প্রতি আস্থা কমেছে: তিতুমীর", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=400&auto=format&fit=crop" },
  ];

  const mockInternationalNews = [
    { title: "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি", image: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop" },
    { title: "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি আইআরজিসির", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop" },
    { title: "করাচিতে সেনা ক্যাম্পে সন্ত্রাসী হামলা, নিহত ৩ সেনাসহ ৬", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
    { title: "যুক্তরাষ্ট্র যৌক্তিক অবস্থান ধরে না রাখলে ইরানের কোনো অস্তিত্ব থাকবে না: ট্রাম্প", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" },
    { title: "ভেনিজুয়েলায় ভয়াবহ ভূমিকম্পে নিহত বেড়ে ১৫৩০, নিখোঁজ ৩৯ হাজার", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "ইসরায়েল-লেবানন শান্তিচুক্তির প্রতিবাদে বৈরুতে বিক্ষোভ, গৃহযুদ্ধের আশঙ্কা হিজবুল্লাহর", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop" },
    { title: "মার্কিন হামলাকে শান্তি চুক্তির স্পষ্ট লঙ্ঘন বলল ইরান", image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop" },
  ];

  const supabase = await createClient();

  // 1. Fetch National Category ID
  const { data: nationalCat } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", "national")
    .single();

  let nationalDbNews: any = null;
  if (nationalCat) {
    const { data } = await supabase
      .from("news")
      .select("title, featured_image")
      .eq("category_id", nationalCat.id)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(9);
    nationalDbNews = data;
  }

  const nationalNews = nationalDbNews && nationalDbNews.length > 0 
    ? nationalDbNews.map((n: any) => ({
        title: n.title,
        image: n.featured_image || "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=400&auto=format&fit=crop"
      }))
    : mockNationalNews;

  // 2. Fetch International Category ID
  const { data: internationalCat } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", "international")
    .single();

  let internationalDbNews: any = null;
  if (internationalCat) {
    const { data } = await supabase
      .from("news")
      .select("title, featured_image")
      .eq("category_id", internationalCat.id)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(7);
    internationalDbNews = data;
  }

  const internationalNews = internationalDbNews && internationalDbNews.length > 0 
    ? internationalDbNews.map((n: any) => ({
        title: n.title,
        image: n.featured_image || "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop"
      }))
    : mockInternationalNews;

  return (
    <>
      {/* Top Single Banner Promotion */}
      <div className="w-full mb-8">
        <div className="w-full h-[120px] bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-sm flex items-center justify-center overflow-hidden relative group cursor-pointer">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=1200&auto=format&fit=crop')] opacity-10 bg-cover bg-center" />
          <div className="relative z-10 flex flex-col items-center">
             <span className="text-xl md:text-3xl font-black text-gray-800 drop-shadow-sm tracking-tight">Full Width Promotion Banner</span>
             <span className="text-sm text-gray-500 mt-1 font-medium">Dashboard Controlled Ad Space</span>
          </div>
        </div>
      </div>

      {/* Main 3 Column Layout */}
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        
        {/* Left Column: জাতীয় (Approx 55%) */}
        <div className="lg:w-[55%] flex flex-col">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">জাতীয়</h2>
            <div className="h-[2px] w-full bg-gray-200 relative">
               <div className="absolute left-0 top-0 h-full w-12 bg-[#0b753a]" />
            </div>
          </div>

          {/* 3-Column Grid of Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-5 gap-y-8">
            {nationalNews.map((news, idx) => (
              <Link href="#" key={idx} className="flex flex-col group">
                <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden border border-gray-200 rounded-sm bg-gray-100">
                  <Image 
                    src={news.image} 
                    alt={news.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h3 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Column: আন্তর্জাতিক (Approx 20%) */}
        <div className="lg:w-[20%] flex flex-col shrink-0">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">আন্তর্জাতিক</h2>
            <div className="h-[2px] w-full bg-gray-200 relative">
               <div className="absolute left-0 top-0 h-full w-12 bg-[#0b753a]" />
            </div>
          </div>

          <div className="flex flex-col gap-5">
            {internationalNews.map((news, idx) => (
              <Link href="#" key={idx} className="group flex gap-3 items-start pb-5 border-b border-gray-100 last:border-0 last:pb-0">
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

        {/* Right Column: Ads Sidebar (Approx 25%) */}
        <div className="lg:w-[25%] flex flex-col gap-4 shrink-0">
          {/* Small Bank Ads Stack */}
          <div className="flex flex-col gap-4 border border-gray-100 p-4 bg-gray-50/50 rounded-sm">
            {[
              { name: "SIBL Securities Limited", color: "bg-green-700" },
              { name: "Bank Asia Securities Ltd", color: "bg-blue-700" },
              { name: "EBL Securities Ltd.", color: "bg-[#0b1f52]" },
              { name: "Shahjalal Islami Bank Sec.", color: "bg-[#0a3161]" },
              { name: "AIBL Capital Market", color: "bg-[#009ee3]" },
              { name: "ICB Securities", color: "bg-green-800" }
            ].map((ad, idx) => (
               <div key={idx} className="w-full bg-white border border-gray-200 shadow-sm rounded-md flex flex-col overflow-hidden">
                 <div className="h-14 md:h-16 flex items-center justify-center p-3 text-sm md:text-base font-bold text-gray-800 bg-white text-center">
                    {ad.name}
                 </div>
                 <div className={`${ad.color} text-white text-xs md:text-sm text-center py-2.5 font-medium`}>
                    বিও একাউন্ট নবায়ন সংক্রান্ত জরুরি বিজ্ঞপ্তি
                 </div>
               </div>
            ))}
          </div>

          {/* Certificate Placeholder 1 */}
          <div className="w-full aspect-square bg-gradient-to-br from-amber-50 to-orange-100 border-2 border-dashed border-orange-300 rounded-sm flex flex-col items-center justify-center text-center p-4 relative group cursor-pointer">
             <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors" />
             <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-16 h-16 rounded-full bg-orange-200 flex items-center justify-center border-4 border-white shadow-sm">
                 <span className="text-orange-600 font-bold text-2xl">🏆</span>
               </div>
               <span className="text-orange-800 font-black text-lg">Certificate</span>
               <span className="text-xs font-bold text-orange-600/80 uppercase tracking-wider">Dashboard Controlled</span>
             </div>
          </div>

          {/* Certificate Placeholder 2 */}
          {/* <div className="w-full aspect-square bg-gradient-to-br from-blue-50 to-indigo-100 border-2 border-dashed border-indigo-300 rounded-sm flex flex-col items-center justify-center text-white p-4 relative group cursor-pointer">
             <div className="absolute inset-0 bg-white/40 group-hover:bg-transparent transition-colors" />
             <div className="relative z-10 flex flex-col items-center gap-2">
               <div className="w-16 h-16 rounded-full bg-indigo-200 flex items-center justify-center border-4 border-white shadow-sm">
                 <span className="text-indigo-600 font-bold text-2xl">🏅</span>
               </div>
               <span className="text-indigo-800 font-black text-lg">Award / Certificate</span>
               <span className="text-xs font-bold text-indigo-600/80 uppercase tracking-wider">Dashboard Controlled</span>
             </div>
          </div> */}
        </div>

      </div>
    </>
  );
}
