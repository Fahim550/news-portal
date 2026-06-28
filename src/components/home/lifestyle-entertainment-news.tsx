import Image from "next/image";
import Link from "next/link";
import { Coffee, Film, Mic } from "lucide-react";

export function LifestyleEntertainmentNews() {
  const categories = [
    {
      title: "লাইফস্টাইল",
      icon: <Coffee className="w-4 h-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "রাজধানীর ইফতারবাজারে 'ক্লপ'র নতুন আউটলেট চালু",
        image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "মেডিটেশন কেন করবেন?", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=200&auto=format&fit=crop" },
        { title: "বিকাশে ঘরে বসেই হচ্ছে মেট্রোরেলের কার্ড রিচার্জ", image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=200&auto=format&fit=crop" },
        { title: "সরাসরি কৃষক থেকে আনা সবজি বাজার থেকে কমে স্বপ্নে", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=200&auto=format&fit=crop" },
        { title: "সিটি ব্যাংক উদযাপন করছে 'অ্যামেক্স মেম্বার উইক'", image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      title: "বিনোদন",
      icon: <Film className="w-4 h-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "সালমান শাহর লাশ উত্তোলনের আদেশ বাতিল",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "অভিনেত্রী কারিনা কায়সারের মরদেহ ঢাকায় পৌঁছেছে", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop" },
        { title: "কারিনা কায়সার আর নেই", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop" },
        { title: "কণ্ঠশিল্পী আশা ভোঁসলে মারা গেছেন", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=200&auto=format&fit=crop" },
        { title: "মদের মামলায় খালাস পেলেন আসিফ আকবর", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      title: "সাক্ষাৎকার",
      icon: <Mic className="w-4 h-4 text-[#042a59]" />,
      color: "#042a59",
      featured: {
        title: "একই বাজেট, দুই বাস্তবতা: বাড়তি করের চাপে করদাতা!",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "ক্ষতির বাজেটের নতুন ভাবনা: বাড়তি কর নয়, অপচয় ও দুর্নীতি রোধ করুন", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" },
        { title: "অন্তর্বর্তী সরকারের অধ্যাদেশগুলো সংসদে প্রাসঙ্গিকতার পরীক্ষা: মিতুল ভৌমিক", image: "https://images.unsplash.com/flag-bd?q=80&w=200&auto=format&fit=crop" }, // Placeholder
        { title: "মুক্তবাজার অর্থনীতিতে নন-ট্যারিফ বীমার ভূমিকা", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop" },
        { title: "ফিনটেক থেকে বৈশ্বিক বিনিয়োগ: শাহ কামালের পথচলায় নতুন সম্ভাবনার দিগন্ত", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=200&auto=format&fit=crop" }
      ]
    }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      
      {/* Left Main Area: 3 Columns (Approx 75%) */}
      <div className="lg:w-[75%] grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => (
          <div key={idx} className="flex flex-col">
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-4">
              {cat.icon}
              <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">{cat.title}</h2>
              <div className="h-[1px] w-full bg-gray-200 ml-2" />
            </div>

            {/* Featured Image with Overlay Text */}
            <Link href="#" className="group relative w-full aspect-[4/3] mb-4 overflow-hidden rounded-sm bg-gray-100 block">
              <Image 
                src={cat.featured.image} 
                alt={cat.featured.title} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-3">
                <h3 className="text-white font-medium text-[15px] leading-snug group-hover:text-gray-200 transition-colors">
                  {cat.featured.title}
                </h3>
              </div>
            </Link>

            {/* List Items */}
            <div className="flex flex-col gap-4">
              {cat.list.map((item, itemIdx) => (
                <Link href="#" key={itemIdx} className="group flex gap-3 items-center pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="relative w-20 h-[52px] shrink-0 bg-gray-100 overflow-hidden border border-gray-200 rounded-sm">
                     <Image 
                       src={item.image} 
                       alt={item.title} 
                       fill 
                       className="object-cover transition-transform duration-500 group-hover:scale-105" 
                     />
                  </div>
                  <h3 className="text-[15px] font-medium text-gray-800 group-hover:text-[#0b753a] transition-colors leading-snug">
                    {item.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Right Column: Ads Sidebar (Approx 25%) */}
      <div className="lg:w-[25%] flex flex-col gap-4 shrink-0">
        
        {/* Ad 1: CVO Petrochemical */}
        <div className="w-full bg-[#4a4a4a] text-white p-4 flex flex-col items-center justify-center text-center border border-gray-300 rounded-sm">
           <span className="text-xl font-black mb-1">আমরা শোকাহত</span>
           <span className="text-[10px] leading-tight opacity-80">সিভিও পেট্রোকেমিক্যাল রিফাইনারি লিমিটেড-এর...</span>
           <span className="text-xs font-bold mt-2">CVO Petrochemical Refinery PLC</span>
        </div>

        {/* Ad 2 & 3: Southeast Bank PLC */}
        <div className="w-full border border-blue-200 rounded-sm overflow-hidden flex flex-col">
           <div className="bg-white p-2 flex items-center justify-center font-bold text-blue-900 text-sm gap-2">
             <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">S</div>
             Southeast Bank PLC.
           </div>
           <div className="bg-[#0072ce] text-white text-[11px] font-bold text-center py-1.5">
             Price Sensitive Information
           </div>
        </div>
        <div className="w-full border border-blue-200 rounded-sm overflow-hidden flex flex-col">
           <div className="bg-white p-2 flex items-center justify-center font-bold text-blue-900 text-sm gap-2">
             <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs">S</div>
             Southeast Bank PLC.
           </div>
           <div className="bg-[#0072ce] text-white text-[11px] font-bold text-center py-1.5">
             Price Sensitive Information
           </div>
        </div>

        {/* Ad 4: IFIC AGM Notice */}
        <div className="w-full bg-white border border-gray-200 rounded-sm p-3 flex items-center justify-between">
           <div className="flex items-center gap-2 font-black text-green-700 text-xl tracking-tighter">
             <div className="w-6 h-6 bg-green-600 rotate-45"></div> IFIC
           </div>
           <div className="text-sm font-bold text-gray-800 text-right leading-tight">
             AGM <br/> Notice
           </div>
        </div>

      </div>

    </div>
  );
}
