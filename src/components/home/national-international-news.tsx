import Image from "next/image";
import Link from "next/link";

export function NationalInternationalNews() {
  const nationalNews = [
    { title: "বাজেটে মানবসম্পদ উন্নয়ন ও অবকাঠামো খাতকে সর্বোচ্চ গুরুত্ব দেওয়া হয়েছে: রবিউল আলম", excerpt: "আসন্ন বাজেটে শিক্ষা, স্বাস্থ্য ও অবকাঠামো উন্নয়নে সর্বাধিক বরাদ্দ রাখা হয়েছে বলে জানিয়েছেন সংশ্লিষ্টরা...", image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?q=80&w=600&auto=format&fit=crop" },
    { title: "ব্যাংক খাত সংস্কারে বাংলাদেশকে ৪৫ কোটি ডলার ঋণ দিচ্ছে বিশ্বব্যাংক", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop" },
    { title: "সুদভিত্তিক অর্থনীতির কবর রচনা করে জাকাতভিত্তিক অর্থনীতি চালুর দাবি সংসদে", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
    { title: "চীনের সঙ্গে সমঝোতায় বাংলাদেশের নিউ মিডিয়ায় গুণগত পরিবর্তন আসবে: তথ্যমন্ত্রী", image: "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop" },
    { title: "১০০০ ও ৫০০ টাকার নোট বাতিলের প্রস্তাব সংসদে", image: "https://images.unsplash.com/photo-1621981386829-9b458a2cddde?q=80&w=400&auto=format&fit=crop" },
  ];

  const internationalNews = [
    { title: "হরমুজ প্রণালি ইরানের নিয়ন্ত্রণে থাকবে: আরাঘচি", excerpt: "ইরানের পররাষ্ট্রমন্ত্রী বলেছেন, হরমুজ প্রণালির নিরাপত্তা নিশ্চিত করতে ইরান সব সময় প্রস্তুত এবং এর নিয়ন্ত্রণ তাদের হাতেই থাকবে...", image: "https://images.unsplash.com/photo-1560415755-bd80d06eda60?q=80&w=600&auto=format&fit=crop" },
    { title: "কিম ঘাঁটিগুলোকে 'নরকে পরিণত' করার হুঁশিয়ারি আইআরজিসির", image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c15b07?q=80&w=400&auto=format&fit=crop" },
    { title: "করাচিতে সেনা ক্যাম্পে সন্ত্রাসী হামলা, নিহত ৩ সেনাসহ ৬", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=400&auto=format&fit=crop" },
    { title: "যুক্তরাষ্ট্র যৌক্তিক অবস্থান ধরে না রাখলে ইরানের কোনো অস্তিত্ব থাকবে না: ট্রাম্প", image: "https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=400&auto=format&fit=crop" },
    { title: "ভেনিজুয়েলায় ভয়াবহ ভূমিকম্পে নিহত বেড়ে ১৫৩০, নিখোঁজ ৩৯ হাজার", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=400&auto=format&fit=crop" },
  ];

  return (
    <div className="flex flex-col gap-10">
      
      {/* 2 Column Section: National and International */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* National News */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <h2 className="bg-[#0b753a] text-white text-xl font-bold px-4 py-1.5 rounded-t-sm inline-block">
              জাতীয়
            </h2>
            <div className="flex-1 h-[2px] bg-[#0b753a]" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Featured National */}
            <Link href="#" className="flex-1 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-100 mb-3">
                <Image
                  src={nationalNews[0].image}
                  alt={nationalNews[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#0b753a] mb-2 leading-tight">
                {nationalNews[0].title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {nationalNews[0].excerpt}
              </p>
            </Link>
            
            {/* List National */}
            <div className="md:w-[250px] lg:w-[220px] xl:w-[250px] shrink-0 flex flex-col gap-4">
              {nationalNews.slice(1).map((news, idx) => (
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

        {/* International News */}
        <div className="flex-1 flex flex-col">
          <div className="flex items-center mb-6">
            <h2 className="bg-[#042a59] text-white text-xl font-bold px-4 py-1.5 rounded-t-sm inline-block">
              আন্তর্জাতিক
            </h2>
            <div className="flex-1 h-[2px] bg-[#042a59]" />
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Featured International */}
            <Link href="#" className="flex-1 group">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gray-100 bg-gray-100 mb-3">
                <Image
                  src={internationalNews[0].image}
                  alt={internationalNews[0].title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-800 group-hover:text-[#042a59] mb-2 leading-tight">
                {internationalNews[0].title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2">
                {internationalNews[0].excerpt}
              </p>
            </Link>
            
            {/* List International */}
            <div className="md:w-[250px] lg:w-[220px] xl:w-[250px] shrink-0 flex flex-col gap-4">
              {internationalNews.slice(1).map((news, idx) => (
                <Link href="#" key={idx} className="group flex gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                  <div className="relative w-24 h-16 shrink-0 overflow-hidden rounded-sm border border-gray-200 bg-gray-100 hidden sm:block">
                    <Image
                      src={news.image}
                      alt={news.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <h4 className="text-[14px] font-medium text-gray-800 group-hover:text-[#042a59] leading-snug">
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
