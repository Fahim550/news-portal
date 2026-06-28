import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function CategoryArchivePage({
  params,
}: {
  params: { slug: string }
}) {
  // Decode the slug to get a readable category name
  const rawCategoryName = decodeURIComponent(params.slug)
  // Capitalize the first letter if it's english, or just use as is for Bengali
  const categoryName = "অর্থনীতি" // Mocking as 'অর্থনীতি' for this specific UI

  // Mock Data for News Grid
  const gridNews = Array(15)
    .fill(null)
    .map((_, i) => ({
      id: i,
      title:
        i % 2 === 0
          ? "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে..."
          : "অসদাচরণ ও প্রতারণায় জড়িত থাকার অভিযোগে ব্যবস্থা...",
      image: `https://images.unsplash.com/photo-${1550000000000 + i * 10000}?q=80&w=400&auto=format&fit=crop`,
    }))

  // Mock Data for Recent News (সাম্প্রতিক)
  const recentNews = [
    {
      title: "অসদাচরণ ও প্রতারণায় জড়িত থাকার অভিযোগে বাজেটের সমালোচনা...",
      image:
        "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=150&auto=format&fit=crop",
    },
    {
      title: "ইসরায়েলের কাছ থেকে যুদ্ধাস্ত্র কিনেছে সৌদি আরব ও কাতার",
      image:
        "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=150&auto=format&fit=crop",
    },
    {
      title: "ডিএমপি কমিশনারের সাথে ব্রিটিশ হাইকমিশনারের সাক্ষাৎ",
      image:
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=150&auto=format&fit=crop",
    },
    {
      title: "ভারী বৃষ্টি হতে পারে যেসব অঞ্চলে",
      image:
        "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=150&auto=format&fit=crop",
    },
    {
      title:
        "এভিয়েশন সম্পর্কিত উদ্যোগে ট্যুর গাইড টেকনিক অ্যান্ড অপারেশন বিষয়ক কর্মশালা",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=150&auto=format&fit=crop",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-6 md:py-10">
      <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
        {/* Left Column (Main Content) - Approx 72% */}
        <div className="flex flex-col lg:w-[72%]">
          {/* Category Header */}
          <div className="mb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className="rounded-sm bg-gray-500 px-2 py-0.5 text-xs font-semibold text-white">
                নিউজ: শ্রেণী
              </span>
            </div>
            <h1 className="mb-4 border-b-2 border-gray-800 pb-2 text-3xl font-bold text-gray-800 md:text-4xl">
              {categoryName}
            </h1>
            <p className="text-sm font-medium text-gray-600">
              অর্থনীতির সর্বশেষ খবর জানুন। দেশী ও বিদেশী অর্থনীতির খবর এক সাথে।
            </p>
          </div>

          {/* Grid Layout */}
          <div className="mb-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
            {gridNews.map((news) => (
              <Link
                href="#"
                key={news.id}
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden border border-gray-200 bg-gray-100">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-[17px] leading-snug font-bold text-gray-800 transition-colors group-hover:text-[#b83b3b]">
                  {news.title}
                </h3>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center gap-1.5 border-t border-gray-200 pt-6 text-sm font-medium">
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center border border-[#b83b3b] bg-white text-[#b83b3b] hover:bg-gray-50"
            >
              1
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            >
              2
            </Link>
            <Link
              href="#"
              className="flex h-8 w-8 items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            >
              3
            </Link>
            <span className="flex h-8 w-8 items-center justify-center text-gray-500">
              ...
            </span>
            <Link
              href="#"
              className="flex h-8 w-10 items-center justify-center border border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
            >
              297
            </Link>
            <Link
              href="#"
              className="flex h-8 items-center justify-center gap-1 border border-gray-300 bg-white px-3 text-gray-600 hover:bg-gray-50"
            >
              পরবর্তী <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Right Column (Sidebar) - Approx 28% */}
        <div className="mt-8 flex shrink-0 flex-col gap-6 lg:mt-0 lg:w-[28%]">
          {/* Ad Banners */}
          <div className="flex w-full flex-col gap-6">
            <div className="relative aspect-square w-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop"
                alt="Ad 1"
                fill
                className="object-cover"
              />
              <span className="absolute top-2 right-2 rounded-sm bg-black/50 px-1 text-[10px] text-white">
                Ad
              </span>
            </div>

            <div className="relative h-24 w-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1557682250-33bd709cbe85?q=80&w=400&auto=format&fit=crop"
                alt="Ad 2"
                fill
                className="object-cover"
              />
              <span className="absolute top-2 right-2 rounded-sm bg-black/50 px-1 text-[10px] text-white">
                Ad
              </span>
            </div>

            <div className="relative aspect-[3/4] w-full overflow-hidden border border-gray-200 bg-gray-100">
              <Image
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=400&auto=format&fit=crop"
                alt="Ad 3"
                fill
                className="object-cover"
              />
              <span className="absolute top-2 right-2 rounded-sm bg-black/50 px-1 text-[10px] text-white">
                Ad
              </span>
            </div>
          </div>

          {/* সাম্প্রতিক (Recent News) */}
          <div className="mt-4 flex flex-col border border-gray-200 bg-white">
            <div className="flex items-center gap-2 border-b border-gray-200 px-4 py-3">
              <div className="h-3 w-3 shrink-0 bg-black"></div>
              <span className="text-[17px] font-bold text-gray-800">
                সাম্প্রতিক
              </span>
            </div>
            <div className="flex flex-col gap-4 p-4">
              {recentNews.map((news, idx) => (
                <Link
                  href="#"
                  key={idx}
                  className="group flex items-start gap-3"
                >
                  <div className="relative h-[56px] w-20 shrink-0 overflow-hidden border border-gray-200 bg-gray-100">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="line-clamp-3 text-[14px] leading-snug font-medium text-gray-600 transition-colors group-hover:text-[#b83b3b]">
                    {news.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
