"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

export function HeroSection() {
  const [activeTab, setActiveTab] = useState<"latest" | "popular">("latest")

  const featuredNews = {
    title: "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক",
    excerpt:
      "দেশের ব্যাংকিং খাতের ভিত মজবুত করা, অর্থনৈতিক প্রবৃদ্ধি পুনরুদ্ধার এবং কর্মসংস্থান সৃষ্টির লক্ষ্যে ৪৫ কোটি মার্কিন ডলার ঋণ দিচ্ছে...",
    image:
      "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=1200&auto=format&fit=crop",
  }

  const verticalNews = [
    {
      title: "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "পপুলার লাইফের লভ্যাংশ ঘোষণা",
      image:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const gridNews = [
    {
      title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে...",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে",
      image:
        "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "আকস্মিক 'স্পারসো' পরিদর্শনে প্রধানমন্ত্রী তারেক রহমান",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি",
      image:
        "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "ডিএমপির অভিযানে রাজধানীতে গ্রেফতার ৫৯",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে...",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে",
      image:
        "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "আকস্মিক 'স্পারসো' পরিদর্শনে প্রধানমন্ত্রী তারেক রহমান",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি",
      image:
        "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "ডিএমপির অভিযানে রাজধানীতে গ্রেফতার ৫৯",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const latestNews = [
    {
      title: "সিলেটে নতুন ডিসি নিয়োগ",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক",
      image:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সাবেক সিইসি হাবিবুল আউয়ালের জামিন প্রশ্নে হাইকোর্টের রুল",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি আইআরজিসির",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "ডিএমপির অভিযানে রাজধানীতে গ্রেফতার ৫৯",
      image:
        "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি চালুর দাবি সংসদে",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা",
      image:
        "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "চীনের সঙ্গে সমঝোতায় বাংলাদেশের নিউ মিডিয়ায় গুণগত পরিবর্তন আসবে: তথ্যমন্ত্রী",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "করাচিতে সেনা ক্যাম্পে সন্ত্রাসী হামলা, নিহত ৩ সেনাসহ ৬",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const popularNews = [
    {
      title: "পপুলার লাইফের লভ্যাংশ ঘোষণা",
      image:
        "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "আইসিএসবি'র বার্ষিক সাধারণ সভা অনুষ্ঠিত",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "লন্ডন স্টক এক্সচেঞ্জে বেক্সিমকো ফার্মাসিউটিক্যালসের জিডিআর লেনদেন পুনরায় শুরু",
      image:
        "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "১১৫ দিন আটকে থাকার পর দেশের পথে বিএসসির 'নর্ডিক পোলক্স'",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সাপ্তাহিক দর পতনের শীর্ষে বেক্সিমকো",
      image:
        "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সূচকের উত্থানে লেনদেন ১৩৭১ কোটি টাকা",
      image:
        "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop",
    },
    {
      title:
        "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "সিলেটে নতুন ডিসি নিয়োগ",
      image:
        "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const editorialNews = [
    {
      title: "সুবিধা-বঞ্চিতদের নিয়ে কাজ ও স্বাধীন বাংলাদেশ",
      image:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "চালু না হতেই বন্ধ রাকুয়ালীয়া চিকিৎসকের আস্থামাত্রাই",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop",
    },
    {
      title: "পটুয়াখালীতে বিএনপির গণসমাবেশ শুরুর আগেই হামলা",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop",
    },
  ]

  const activeNewsList = activeTab === "latest" ? latestNews : popularNews

  return (
    <>
      {/* Top Banners Section */}
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

      {/* Main Hero Layout */}
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-6">
        {/* Left Column (Top Layout + Full Width Grid) ~ 70% */}
        <div className="flex flex-col gap-6 lg:w-[70%]">
          {/* Top part of left column */}
          <div className="flex flex-col gap-2 md:flex-row">
            {/* Featured News */}
            <div className="flex flex-col md:w-[65%]">
              <Link href="#" className="group block pb-2">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-tl-sm rounded-tr-sm border border-gray-100 bg-gray-100">
                  <Image
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="rounded-br-lg rounded-bl-lg p-4 shadow-lg">
                  <h1 className="mb-3 text-2xl leading-tight font-bold text-black transition-colors group-hover:text-[#0b753a] md:text-[28px]">
                    {featuredNews.title}
                  </h1>
                  <p className="text-[15px] leading-relaxed font-semibold text-gray-900">
                    {featuredNews.excerpt}
                  </p>
                  <div className="mt-4 border-t border-gray-100 pt-2 text-right text-xs font-medium text-gray-800">
                    মঙ্গলবার, ১ ফেব্রুয়ারি, ২০২২{" "}
                    <span className="font-bold text-[#0b753a]">|</span>
                  </div>
                </div>
              </Link>
            </div>

            {/* Vertical Stacked News */}
            <div className="flex flex-col md:w-[35%] lg:pl-2">
              {gridNews.slice(0, 2).map((news, idx) => (
                <Link
                  href="#"
                  key={idx}
                  className="group flex flex-col pb-2 last:border-0 last:pb-0"
                >
                  <div className="relative aspect-[5/3] w-full overflow-hidden rounded-tl-sm rounded-tr-sm border border-gray-100 bg-gray-100">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between rounded-br-lg rounded-bl-lg p-3 px-3 shadow-lg">
                    <h2 className="text-[18px] leading-tight font-bold text-black transition-colors group-hover:text-[#0b753a]">
                      {news.title}
                    </h2>
                    <div className="mt-3 border-t border-gray-100 pt-1 text-right text-[11px] font-medium text-gray-800">
                      মঙ্গলবার, ১ ফেব্রুয়ারি, ২০২২{" "}
                      <span className="font-bold text-[#0b753a]">|</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Full Width Grid */}
          <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-6 md:grid-cols-3">
            {gridNews.slice(2).map((news, idx) => (
              <Link href="#" key={idx} className="group flex flex-col">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-tl-sm rounded-tr-sm border border-gray-100 bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between rounded-br-lg rounded-bl-lg p-3 px-3 shadow-lg">
                  <h3 className="line-clamp-3 text-[14px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                    {news.title}
                  </h3>
                  <div className="mt-2 border-t border-gray-100 pt-1 text-right text-[11px] font-medium text-gray-800">
                    মঙ্গলবার, ১ ফেব্রুয়ারি, ২০২২{" "}
                    <span className="font-bold text-[#0b753a]">|</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Right Column (Editorial + Tabs + Ad) ~ 30% */}
        <div className="flex shrink-0 flex-col gap-6 lg:w-[30%]">
          {/* Editorial Section */}
          <div className="flex flex-col overflow-hidden rounded-sm">
            <div className="bg-[#042a59] py-2 text-center text-lg font-bold text-white">
              সম্পাদকীয়
            </div>
            <div className="flex flex-col gap-2 bg-[#44aa8c] p-2">
              {editorialNews.map((news, idx) => (
                <Link
                  href="#"
                  key={idx}
                  className="group flex items-start gap-3 border-b border-dotted border-white/80 pb-4 last:border-0 last:pb-0"
                >
                  <div className="relative h-14 w-20 shrink-0 overflow-hidden rounded-sm border border-white/30">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-sm leading-snug font-medium text-white transition-colors group-hover:text-gray-200">
                    {news.title}
                  </h3>
                </Link>
              ))}
              <Link
                href="#"
                className="mt-2 text-right text-sm font-medium text-white/90 hover:text-white"
              >
                আরো সংবাদ &gt;
              </Link>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="flex flex-col overflow-hidden rounded-sm border border-gray-200 bg-white">
            <div className="flex border-b-2 border-[#042a59] text-[17px] font-bold">
              <button
                onClick={() => setActiveTab("latest")}
                className={`flex-1 py-3 transition-colors ${activeTab === "latest" ? "bg-[#042a59] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                সর্বশেষ সংবাদ
              </button>
              <button
                onClick={() => setActiveTab("popular")}
                className={`flex-1 py-3 transition-colors ${activeTab === "popular" ? "bg-[#042a59] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                জনপ্রিয় সংবাদ
              </button>
            </div>
            <div className="custom-scrollbar flex h-[400px] flex-col overflow-y-auto px-2">
              {activeNewsList.map((news, idx) => {
                const banglaDigits = [
                  "০",
                  "১",
                  "২",
                  "৩",
                  "৪",
                  "৫",
                  "৬",
                  "৭",
                  "৮",
                  "৯",
                ]
                const toBanglaNumber = (num: number) =>
                  num
                    .toString()
                    .split("")
                    .map((d) => banglaDigits[parseInt(d)])
                    .join("")

                return (
                  <Link
                    href="#"
                    key={idx}
                    className="group flex items-center gap-2 border-b border-dotted border-gray-300 py-3 last:border-0"
                  >
                    <div className="relative ml-3 h-[65px] w-[100px] shrink-0">
                      <Image
                        src={news.image}
                        alt={news.title}
                        fill
                        className="border border-gray-200 object-cover"
                      />
                      <span className="absolute top-1/2 -left-3 z-10 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black text-[13px] font-bold text-white shadow-sm">
                        {toBanglaNumber(idx + 1)}
                      </span>
                    </div>
                    <h3 className="text-[14px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                      {news.title}
                    </h3>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Old News Picker */}
          <div className="flex flex-col gap-2">
            <div className="rounded-sm bg-gray-200 px-4 py-2 font-bold text-gray-800">
              পুরাতন সংবাদ
            </div>
            <div className="flex">
              <input
                type="text"
                placeholder="তারিখ সিলেক্ট করুন"
                className="flex-1 rounded-l-sm border border-gray-300 px-3 py-2 text-sm focus:outline-none"
              />
              <button className="rounded-r-sm bg-[#042a59] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#031d3d]">
                খুঁজুন
              </button>
            </div>
          </div>

          {/* Facebook Wrapper */}
          <div className="flex flex-col gap-2">
            <div className="rounded-sm bg-gray-200 px-4 py-2 font-bold text-gray-800">
              ফেসবুকে আমরা
            </div>
            <div className="group relative flex h-[100px] w-full cursor-pointer items-center justify-center overflow-hidden rounded-sm bg-[#f48585] text-white">
              <div className="absolute inset-0 bg-black/10 transition-colors group-hover:bg-transparent" />
              <span className="z-10 text-xl font-black drop-shadow-md">
                WordCamp US 2026
              </span>
            </div>
          </div>

          {/* Ad Banner */}
          <div className="group relative flex aspect-[4/3] w-full cursor-pointer flex-col items-center justify-center rounded-sm bg-[#1b62a6] p-4 text-center">
            <div className="absolute inset-0 bg-white/10 transition-colors group-hover:bg-transparent" />
            <div className="relative z-10 flex flex-col items-center gap-4 text-white">
              <span className="text-2xl font-black tracking-wide uppercase">
                Advertise Your
                <br />
                Business Here!
              </span>
              <span className="text-sm font-medium opacity-80">
                250 x 250 px
              </span>
              <button className="mt-2 bg-[#e31837] px-6 py-2 font-bold text-white transition-colors hover:bg-red-700">
                CONTACT US NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
