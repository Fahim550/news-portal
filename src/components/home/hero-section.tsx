import { LineChart, Newspaper } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import executiveImage from "../../../public/images/executive.png"
import { createClient } from "@/lib/supabase/server"

export async function HeroSection() {
  const mockLatestNews = [
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
  ]

  const mockStockNews = [
    {
      title: "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সূচকের উত্থানে চলছে লেনদেন",
      image:
        "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "পপুলার লাইফের লভ্যাংশ ঘোষণা",
      image:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "আইসিএসবি'র বার্ষিক সাধারণ সভা অনুষ্ঠিত",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "লন্ডন স্টক এক্সচেঞ্জে বেক্সিমকো ফার্মাসিউটিক্যালসের জিডিআর লেনদেন পুনরায় শুরু",
      image:
        "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "১১৫ দিন আটকে থাকার পর দেশের পথে বিএসসির 'নর্ডিক পোলক্স'",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সাপ্তাহিক দর পতনের শীর্ষে বেক্সিমকো",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const mockGridNews = [
    {
      title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি...",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে",
      image:
        "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "রামপুরায় মানবতাবিরোধী অপরাধের মামলায় ডিএমপির সাবেক...",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "আকস্মিক 'স্পারসো' পরিদর্শনে প্রধানমন্ত্রী তারেক রহমান",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const supabase = await createClient()

  // 1. Fetch Latest News
  const { data: latestDbNews } = await supabase
    .from("news")
    .select("title")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(10)

  const latestNews = latestDbNews && latestDbNews.length > 0 
    ? latestDbNews.map(n => n.title) 
    : mockLatestNews

  // 2. Fetch Featured / Grid News
  const { data: featuredDbNews } = await supabase
    .from("news")
    .select("title, summary, featured_image, is_featured")
    .eq("status", "published")
    .order("published_at", { ascending: false })
    .limit(10)

  const mainFeatured = featuredDbNews?.find(n => n.is_featured) || featuredDbNews?.[0]
  
  const featuredArticle = mainFeatured ? {
    title: mainFeatured.title,
    excerpt: mainFeatured.summary || "",
    image: mainFeatured.featured_image || "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop"
  } : {
    title: "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক",
    excerpt: "দেশের ব্যাংকিং খাতের ভিত মজবুত করা, অর্থনৈতিক প্রবৃদ্ধি পুনরুদ্ধার এবং কর্মসংস্থান সৃষ্টির লক্ষ্যে ৪৫ কোটি মার্কিন...",
    image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop"
  }

  const gridNews = featuredDbNews && featuredDbNews.length > 1
    ? featuredDbNews.filter(n => n.title !== mainFeatured?.title).slice(0, 4).map(n => ({
        title: n.title,
        image: n.featured_image || "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop"
      }))
    : mockGridNews

  // 3. Fetch Stock News
  const { data: stockCategory } = await supabase
    .from("categories")
    .select("id")
    .eq("slug", "stock")
    .single()

  let stockDbNews: any = null
  if (stockCategory) {
    const { data } = await supabase
      .from("news")
      .select("title, featured_image")
      .eq("category_id", stockCategory.id)
      .eq("status", "published")
      .order("published_at", { ascending: false })
      .limit(7)
    stockDbNews = data
  }

  const stockNews = stockDbNews && stockDbNews.length > 0
    ? stockDbNews.map((n: any) => ({
        title: n.title,
        image: n.featured_image || "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop"
      }))
    : mockStockNews

  return (
    <>
      {/* Top Banners Section (Placeholders for Dashboard Ads) */}
      <div className="container mx-auto mb-8 flex flex-col justify-center gap-4 px-4 md:flex-row lg:gap-8">
        <div className="relative flex h-[80px] w-full items-center justify-center overflow-hidden rounded-sm border border-indigo-950 bg-indigo-900 text-sm text-white/50 md:w-[320px]">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
          <span className="relative z-10">Banner Ad (Left)</span>
        </div>
        <div className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-sm border border-yellow-500 bg-[#ffdb00] text-sm text-yellow-900 md:w-[320px]">
          Banner Ad (Middle)
        </div>
        <div className="flex h-[80px] w-full items-center justify-center overflow-hidden rounded-sm border border-red-700 bg-[#e31837] text-sm font-bold text-white md:w-[320px]">
          GPH ispat (Banner Ad)
        </div>
      </div>

      {/* Main 3 Column Layout */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left Column: Featured & Grid (Approx 55%) */}
        <div className="flex flex-col gap-6 lg:w-[55%]">
          {/* Featured News */}
          <Link href="#" className="group block border-b border-gray-200 pb-6">
            <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-100">
              <Image
                src={featuredArticle.image}
                alt={featuredArticle.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <h1 className="mb-3 text-2xl leading-tight font-bold text-[#042a59] transition-colors group-hover:text-[#0b753a] md:text-[28px]">
              {featuredArticle.title}
            </h1>
            <p className="text-[15px] leading-relaxed text-gray-600">
              {featuredArticle.excerpt}
            </p>
          </Link>

          {/* 2x2 Grid Below Featured */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-2">
            {gridNews.map((news, idx) => (
              <Link
                href="#"
                key={idx}
                className="group flex items-start gap-3 border-b border-gray-100 pb-4 md:border-0 md:pb-0"
              >
                <div className="relative h-[76px] w-28 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[15px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Middle Column: সর্বশেষ (Approx 20%) */}
        <div className="flex shrink-0 flex-col overflow-hidden rounded-sm border border-gray-200 bg-white lg:w-[20%]">
          <div className="flex items-center gap-2 border-b-2 border-gray-200/60 bg-gray-50/50 px-4 py-3">
            <Newspaper className="h-5 w-5 text-gray-400" strokeWidth={1.5} />
            <span className="text-[17px] font-bold text-gray-800">সর্বশেষ</span>
          </div>
          <div className="flex flex-col px-4">
            {latestNews.map((title, idx) => (
              <Link
                href="#"
                key={idx}
                className="group border-b border-gray-100 py-3.5 last:border-0"
              >
                <h3 className="text-[15px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                  {title}
                </h3>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column: পুঁজিবাজার সর্বশেষ & Editor (Approx 25%) */}
        <div className="flex shrink-0 flex-col gap-6 lg:w-[25%]">
          <div className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b-2 border-[#b83b3b]/20 bg-gray-50/50 px-4 py-3">
              <LineChart className="h-5 w-5 text-[#b83b3b]" strokeWidth={1.5} />
              <span className="text-[17px] font-bold text-[#b83b3b]">
                পুঁজিবাজার সর্বশেষ
              </span>
            </div>
            <div className="flex flex-col px-4">
              {stockNews.map((news, idx) => (
                <Link
                  href="#"
                  key={idx}
                  className="group flex items-center gap-3 border-b border-gray-100 py-3.5 last:border-0"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[15px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                    {news.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>

          {/* Editor Section */}
          <div className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white">
            {/* <div className="flex items-center justify-center gap-2 border-b-2 border-[#0b753a]/20 bg-[#0b753a]/5 px-4 py-3">
              <span className="text-[17px] font-bold text-[#0b753a]">
                আমাদের সম্পাদক
              </span>
            </div> */}
            <div className="flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-white to-gray-50/50 px-6 py-4 text-center">
              <div className="relative h-36 w-36 overflow-hidden rounded-xl border-4 border-white shadow-md ring-1 ring-gray-100">
                <Image
                  src={executiveImage}
                  alt="Editor"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-gray-800">
                  মোঃ আলমগীর হোসেন
                </h3>
                <p className="text-[15px] font-medium text-[#0b753a]">
                  সম্পাদক
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
