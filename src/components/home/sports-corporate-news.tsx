import Image from "next/image";
import Link from "next/link";

export function SportsCorporateNews() {
  const sportsNews = {
    featured: {
      title: "মেসির বিশ্বরেকর্ডে জয় দিয়ে গ্রুপপর্ব শেষ করলো আর্জেন্টিনা",
      description: "থামছেই না লিওনেল মেসির জাদু। ২০২৬ বিশ্বকাপে এবার নিজের নামের পাশে যোগ করলেন আরেকটি অনন্য রেকর্ড...",
      image: "https://images.unsplash.com/photo-1518605368461-1ee7e53f1a07?q=80&w=600&auto=format&fit=crop"
    },
    list: [
      { title: "ভিনিসিয়ুসের জোড়া গোলে স্কটল্যান্ডকে উড়িয়ে গ্রুপসেরা ব্রাজিল", image: "https://images.unsplash.com/photo-1574629810360-7efbb1925695?q=80&w=300&auto=format&fit=crop" },
      { title: "বিশ্বকাপ চলাকালে ঢাবি ক্যাম্পাসে বহিরাগত প্রবেশে নিষেধাজ্ঞা", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=300&auto=format&fit=crop" },
      { title: "বার্সেলোনা ছাড়ছেন লেভানডভস্কি?", image: "https://images.unsplash.com/photo-1574629810360-7efbb1925695?q=80&w=300&auto=format&fit=crop" },
      { title: "তামিম ইকবালের অবসর ভেঙে ফেরার ইঙ্গিত", image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?q=80&w=300&auto=format&fit=crop" }
    ]
  };

  const corporateNews = {
    featured: {
      title: "বাজেটের মধ্যেই এলজি প্রযুক্তির চমক, বাজারে এলো লেনোভো আইডিয়াপ্যাড",
      description: "নতুন মডেলের ল্যাপটপ বাজারে এনেছে লেনোভো। সাধারণ মানুষের ক্রয়ক্ষমতার কথা মাথায় রেখে এই নতুন সংস্করণ...",
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop"
    },
    list: [
      { title: "ফ্রান্স-বাংলাদেশ চেম্বারের নতুন কমিটি গঠন", image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=200&auto=format&fit=crop" },
      { title: "পাগলা মসজিদে রেকর্ড ১৫ কোটি ৯০ লাখ টাকা দান", image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=200&auto=format&fit=crop" },
      { title: "আইসিএসবির বার্ষিক সাধারণ সভা অনুষ্ঠিত", image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=200&auto=format&fit=crop" },
      { title: "লন্ডন স্টক এক্সচেঞ্জে বেক্সিমকো ফার্মাসিউটিক্যালসের জিডিআর লেনদেন পুনরায় শুরু", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop" },
    ]
  };

  return (
    <div className="flex flex-col gap-10">
      
      {/* 2 Column Section: Sports and Corporate */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sports News */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <h2 className="bg-[#b83b3b] text-white text-xl font-bold px-4 py-1.5 rounded-t-sm inline-block">
              খেলাধুলা
            </h2>
            <div className="flex-1 h-[2px] bg-[#b83b3b]" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Featured Sports */}
            <Link href="#" className="flex-1 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-100 mb-3">
                <Image
                  src={sportsNews.featured.image}
                  alt={sportsNews.featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#b83b3b] mb-2 leading-tight">
                {sportsNews.featured.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {sportsNews.featured.description}
              </p>
            </Link>
            
            {/* List Sports */}
            <div className="md:w-[250px] lg:w-[220px] xl:w-[250px] shrink-0 flex flex-col gap-4">
              {sportsNews.list.map((news, idx) => (
                <Link href="#" key={idx} className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100 hidden sm:block">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-[14px] font-medium text-gray-800 group-hover:text-[#b83b3b] leading-snug">
                    {news.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Corporate News */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <h2 className="bg-[#0b753a] text-white text-xl font-bold px-4 py-1.5 rounded-t-sm inline-block">
              কর্পোরেট সংবাদ
            </h2>
            <div className="flex-1 h-[2px] bg-[#0b753a]" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Featured Corporate */}
            <Link href="#" className="flex-1 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-100 mb-3">
                <Image
                  src={corporateNews.featured.image}
                  alt={corporateNews.featured.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#0b753a] mb-2 leading-tight">
                {corporateNews.featured.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {corporateNews.featured.description}
              </p>
            </Link>
            
            {/* List Corporate */}
            <div className="md:w-[250px] lg:w-[220px] xl:w-[250px] shrink-0 flex flex-col gap-4">
              {corporateNews.list.map((news, idx) => (
                <Link href="#" key={idx} className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100 hidden sm:block">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-[14px] font-medium text-gray-800 group-hover:text-[#0b753a] leading-snug">
                    {news.title}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
