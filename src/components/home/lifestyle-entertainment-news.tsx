import { createClient } from "@/lib/supabase/server"
import { Coffee, Film, Mic } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export async function LifestyleEntertainmentNews() {
  const mockCategories = [
    {
      title: "লাইফস্টাইল",
      slug: "lifestyle",
      icon: <Coffee className="h-4 w-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "রাজধানীর ইফতারবাজারে 'ক্লপ'র নতুন আউটলেট চালু",
        image:
          "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop",
      },
      list: [
        {
          title: "মেডিটেশন কেন করবেন?",
          image:
            "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "বিকাশে ঘরে বসেই হচ্ছে মেট্রোরেলের কার্ড রিচার্জ",
          image:
            "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "সরাসরি কৃষক থেকে আনা সবজি বাজার থেকে কমে স্বপ্নে",
          image:
            "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "সিটি ব্যাংক উদযাপন করছে 'অ্যামেক্স মেম্বার উইক'",
          image:
            "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&auto=format&fit=crop",
        },
      ],
    },
    {
      title: "বিনোদন",
      slug: "entertainment",
      icon: <Film className="h-4 w-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "সালমান শাহর লাশ উত্তোলনের আদেশ বাতিল",
        image:
          "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop",
      },
      list: [
        {
          title: "অভিনেত্রী কারিনা কায়সারের মরদেহ ঢাকায় পৌঁছেছে",
          image:
            "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "কারিনা কায়সার আর নেই",
          image:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "কণ্ঠশিল্পী আশা ভোঁসলে মারা গেছেন",
          image:
            "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop",
        },
        {
          title: "মদের মামলায় খালাস পেলেন আসিফ আকবর",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop",
        },
      ],
    },
    {
      title: "সাক্ষাৎকার",
      slug: "interview",
      icon: <Mic className="h-4 w-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "একই বাজেট, দুই বাস্তবতা: বাড়তি করের চাপে করদাতা!",
        image:
          "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop",
      },
      list: [
        {
          title:
            "ক্ষতির বাজেটের নতুন ভাবনা: বাড়তি কর নয়, অপচয় ও দুর্নীতি রোধ করুন",
          image:
            "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop",
        },
        {
          title:
            "অন্তর্বর্তী সরকারের অধ্যাদেশগুলো সংসদে প্রাসঙ্গিকতার পরীক্ষা: মিতুল ভৌমিক",
          image:
            "https://images.unsplash.com/flag-bd?q=80&w=200&auto=format&fit=crop",
        }, // Placeholder
        {
          title: "মুক্তবাজার অর্থনীতিতে নন-ট্যারিফ বীমার ভূমিকা",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
        },
        {
          title:
            "ফিনটেক থেকে বৈশ্বিক বিনিয়োগ: শাহ কামালের পথচলায় নতুন সম্ভাবনার দিগন্ত",
          image:
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop",
        },
      ],
    },
  ]

  const supabase = await createClient()

  const categories = await Promise.all(
    mockCategories.map(async (mockCat) => {
      const { data: category } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", mockCat.slug)
        .single()

      if (!category) return mockCat

      const { data: dbNews } = await supabase
        .from("news")
        .select("id, title, featured_image, is_featured")
        .eq("category_id", category.id)
        .eq("status", "published")
        .order("published_at", { ascending: false })
        .limit(5)

      if (!dbNews || dbNews.length === 0) return mockCat

      const featuredDbNews = dbNews.find((n) => n.is_featured) || dbNews[0]
      const listNews = dbNews
        .filter((n) => n.id !== featuredDbNews?.id)
        .slice(0, 4)

      return {
        ...mockCat,
        featured: {
          title: featuredDbNews.title,
          image: featuredDbNews.featured_image || mockCat.featured.image,
        },
        list:
          listNews.length > 0
            ? listNews.map((n) => ({
                title: n.title,
                image: n.featured_image || mockCat.list[0].image,
              }))
            : mockCat.list,
      }
    })
  )

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      {/* Left Main Area: 3 Columns (Approx 75%) */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:w-[75%]">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col">
            {/* Section Header */}
            <div className="mb-4 flex items-center gap-2">
              {cat.icon}
              <h2 className="text-xl font-bold whitespace-nowrap text-[#042a59] md:text-2xl">
                {cat.title}
              </h2>
              <div className="ml-2 h-[1px] w-full bg-gray-200" />
            </div>

            {/* Featured Image with Overlay Text */}
            <Link
              href="#"
              className="group relative mb-4 block aspect-[4/3] w-full overflow-hidden rounded-sm bg-gray-100"
            >
              <Image
                src={cat.featured.image}
                alt={cat.featured.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-3">
                <h3 className="text-[15px] leading-snug font-medium text-white transition-colors group-hover:text-gray-200">
                  {cat.featured.title}
                </h3>
              </div>
            </Link>

            {/* List Items */}
            <div className="flex flex-col gap-4">
              {cat.list.map((item, itemIdx) => (
                <Link
                  href="#"
                  key={itemIdx}
                  className="group flex items-center gap-3 border-b border-gray-100 pb-4 last:border-0 last:pb-0"
                >
                  <div className="relative h-[52px] w-20 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="text-[15px] leading-snug font-medium text-gray-800 transition-colors group-hover:text-[#0b753a]">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Ads Sidebar (Approx 25%) */}
      <div className="flex shrink-0 flex-col gap-4 lg:w-[25%]">
        {/* Ad 1: CVO Petrochemical */}
        <div className="flex w-full flex-col items-center justify-center rounded-sm border border-gray-300 bg-[#4a4a4a] p-4 text-center text-white">
          <span className="mb-1 text-xl font-black">আমরা শোকাহত</span>
          <span className="text-[10px] leading-tight opacity-80">
            সিভিও পেট্রোকেমিক্যাল রিফাইনারি লিমিটেড-এর...
          </span>
          <span className="mt-2 text-xs font-bold">
            CVO Petrochemical Refinery PLC
          </span>
        </div>

        {/* Ad 2 & 3: Southeast Bank PLC */}
        <div className="flex w-full flex-col overflow-hidden rounded-sm border border-blue-200">
          <div className="flex items-center justify-center gap-2 bg-white p-2 text-sm font-bold text-blue-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              S
            </div>
            Southeast Bank PLC.
          </div>
          <div className="bg-[#0072ce] py-1.5 text-center text-[11px] font-bold text-white">
            Price Sensitive Information
          </div>
        </div>
        <div className="flex w-full flex-col overflow-hidden rounded-sm border border-blue-200">
          <div className="flex items-center justify-center gap-2 bg-white p-2 text-sm font-bold text-blue-900">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600 text-xs text-white">
              S
            </div>
            Southeast Bank PLC.
          </div>
          <div className="bg-[#0072ce] py-1.5 text-center text-[11px] font-bold text-white">
            Price Sensitive Information
          </div>
        </div>

        {/* Ad 4: IFIC AGM Notice */}
        <div className="flex w-full items-center justify-between rounded-sm border border-gray-200 bg-white p-3">
          <div className="flex items-center gap-2 text-xl font-black tracking-tighter text-green-700">
            <div className="h-6 w-6 rotate-45 bg-green-600"></div> IFIC
          </div>
          <div className="text-right text-sm leading-tight font-bold text-gray-800">
            AGM <br /> Notice
          </div>
        </div>
      </div>
    </div>
  )
}
