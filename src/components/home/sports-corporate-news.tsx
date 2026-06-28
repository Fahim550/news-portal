import Image from "next/image";
import Link from "next/link";
import { Circle, Globe } from "lucide-react";

export function SportsCorporateNews() {
  const sportsNews = {
    featured: {
      title: "মেসির বিশ্বরেকর্ডে জয় দিয়ে গ্রুপপর্ব শেষ করলো আর্জেন্টিনা",
      description: "থামছেই না লিওনেল মেসির জাদু। ২০২৬ বিশ্বকাপে এবার নিজের নামের পাশে যোগ করলেন আরেকটি অনন্য রেকর্ড। জর্ডনের বিপক্ষে...",
      image: "https://images.unsplash.com/photo-1518605368461-1ee7e53f1a07?q=80&w=600&auto=format&fit=crop"
    },
    list: [
      { title: "ভিনিসিয়ুসের জোড়া গোলে স্কটল্যান্ডকে উড়িয়ে গ্রুপসেরা ব্রাজিল", image: "https://images.unsplash.com/photo-1574629810360-7efbb1925695?q=80&w=300&auto=format&fit=crop" },
      { title: "বিশ্বকাপ চলাকালে ঢাবি ক্যাম্পাসে বহিরাগত প্রবেশে নিষেধাজ্ঞা", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=300&auto=format&fit=crop" }
    ]
  };

  const corporateNews = [
    { title: "বাজেটের মধ্যেই এলজি প্রযুক্তির চমক, বাজারে এলো লেনোভো আইডিয়াপ্যাড স্লিম ৫ সিরিজ", image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=200&auto=format&fit=crop" },
    { title: "ফ্রান্স-বাংলাদেশ চেম্বারের নতুন কমিটি গঠন", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=200&auto=format&fit=crop" },
    { title: "পাগলা মসজিদে রেকর্ড ১৫ কোটি ৯০ লাখ টাকা দান", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200&auto=format&fit=crop" },
    { title: "আইসিএসবির বার্ষিক সাধারণ সভা অনুষ্ঠিত", image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=200&auto=format&fit=crop" },
    { title: "প্রতিবন্ধী ব্যক্তিদের সঙ্গে আলোচনা করে আইন সংশোধন করা হবে: স্বাস্থ্য প্রতিমন্ত্রী", image: "https://images.unsplash.com/photo-1573164713714-d95e436ab8d6?q=80&w=200&auto=format&fit=crop" },
    { title: "চট্টগ্রাম মেট্রোপলিটন চেম্বারের বার্ষিক সাধারণ সভা অনুষ্ঠিত", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=200&auto=format&fit=crop" },
    { title: "লন্ডন স্টক এক্সচেঞ্জে বেক্সিমকো ফার্মাসিউটিক্যালসের জিডিআর লেনদেন পুনরায় শুরু", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop" },
    { title: "প্রাইম ব্যাংকের সঙ্গে বায়ো বিশ্ব ডেভেলপমেন্টের চুক্তি", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=200&auto=format&fit=crop" }
  ];

  const sidebarGrid = [
    { title: "প্রধানমন্ত্রীর কার্যালয়ে খাবারের বাজেট ৫ গুণ কমলো", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=200&auto=format&fit=crop" },
    { title: "চাঁদ থেকে পৃথিবীর দিকে ফিরে আসছে ৪ নভোচারী", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=200&auto=format&fit=crop" },
    { title: "পারফিউম ক্রয়ে বিশেষ ছাড় পাবেন প্রাইম ব্যাংকের গ্রাহকরা", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=200&auto=format&fit=crop" },
    { title: "বনশ্রীতে 'সুলতান ডাইন অ্যান্ড কাবাব রেস্টুরেন্ট'র জমকালো উদ্বোধন", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop" }
  ];

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
      
      {/* Left Main Area: (Approx 75%) */}
      <div className="lg:w-[75%] flex flex-col md:flex-row gap-6">
        
        {/* Sports Column (Approx 40% of 75%) */}
        <div className="md:w-[45%] flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <Circle className="w-4 h-4 text-[#042a59] fill-[#042a59]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">খেলাধুলা</h2>
            <div className="h-[1px] w-full bg-gray-200 ml-2" />
          </div>

          <Link href="#" className="group block mb-6">
             <div className="relative w-full aspect-[16/10] mb-3 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
                <Image 
                  src={sportsNews.featured.image} 
                  alt={sportsNews.featured.title} 
                  fill 
                  className="object-cover transition-transform duration-500 group-hover:scale-105" 
                />
             </div>
             <h3 className="text-[22px] font-bold text-[#042a59] mb-2 leading-tight group-hover:text-[#0b753a] transition-colors">
               {sportsNews.featured.title}
             </h3>
             <p className="text-gray-500 text-sm leading-relaxed">
               {sportsNews.featured.description}
             </p>
          </Link>

          <div className="grid grid-cols-2 gap-4">
            {sportsNews.list.map((item, idx) => (
              <Link href="#" key={idx} className="group flex flex-col">
                <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

        {/* Corporate News Column (Approx 60% of 75%) */}
        <div className="md:w-[55%] flex flex-col border-l border-gray-100 pl-0 md:pl-6">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-[#042a59]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">কর্পোরেট সংবাদ</h2>
            <div className="h-[1px] w-full bg-gray-200 ml-2" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-6">
            {corporateNews.map((news, idx) => (
              <Link href="#" key={idx} className="group flex gap-3 items-start p-3 border border-gray-100 rounded-sm hover:shadow-sm transition-shadow bg-gray-50/30">
                <div className="relative w-20 h-16 shrink-0 bg-gray-200 overflow-hidden rounded-sm border border-gray-100">
                   <Image 
                     src={news.image} 
                     alt={news.title} 
                     fill 
                     className="object-cover transition-transform duration-500 group-hover:scale-105" 
                   />
                </div>
                <h4 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                  {news.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>

      </div>

      {/* Right Column: Ads Sidebar (Approx 25%) */}
      <div className="lg:w-[25%] flex flex-col shrink-0">
        <div className="border border-gray-200 p-4 rounded-sm">
          <div className="flex items-center gap-2 mb-4">
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">টুকিটাকি</h2>
            <div className="h-[2px] w-full bg-gray-200 ml-2" />
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-6">
            {sidebarGrid.map((item, idx) => (
              <Link href="#" key={idx} className="group flex flex-col">
                <div className="relative w-full aspect-[4/3] mb-2 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-cover transition-transform duration-500 group-hover:scale-105" 
                  />
                </div>
                <h4 className="text-[15px] font-medium text-gray-800 leading-snug group-hover:text-[#0b753a] transition-colors">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
