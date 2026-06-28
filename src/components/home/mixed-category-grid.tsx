import Image from "next/image";
import Link from "next/link";
import { Laptop, BookOpen, MapPin, Grid } from "lucide-react";

export function MixedCategoryGrid() {
  const categories = [
    {
      title: "টেক",
      icon: <Laptop className="w-4 h-4 text-[#042a59]" />,
      featured: {
        title: "এসবই শসা ব্যবহার বাড়ছে গুগল, উষ্মেণ এশিয়ার শেয়ারবাজার",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "টপ গিয়ারের বিকাশে দীর্ঘমেয়াদি প্রস্তুতি সুবিধার মেয়াদ বৃদ্ধি", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=200&auto=format&fit=crop" },
        { title: "প্রতিটি মূল্যায়নের যে সেরা ৫টি ফিচার ঠিক নির্দেশক অ্যাপ প্রয়োজন", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=200&auto=format&fit=crop" },
        { title: "Snapdragon প্রিমিয়াম এবং সেরা ৩টি প্রসেসরের বিকল্পসমূহ", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=200&auto=format&fit=crop" },
        { title: "স্মার্টফোনের ভিডিও ডাউনলোডার অ্যাপ ও সাইট যা বিবেচনা করার মতো", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      title: "শিক্ষা",
      icon: <BookOpen className="w-4 h-4 text-[#042a59]" />,
      featured: {
        title: "বিশ্বকাপ চলাকালে ঢাবি ক্যাম্পাসে বহিরাগত প্রবেশে নিষেধাজ্ঞা",
        image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "২ বছরের মধ্যে সব সরকারি শিক্ষকের ভাতা পরিশোধ করা হবে: শিক্ষামন্ত্রী", image: "https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?q=80&w=200&auto=format&fit=crop" },
        { title: "স্কুল-কলেজে পরীক্ষার সময়সূচি পরিবর্তন", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=200&auto=format&fit=crop" },
        { title: "প্রাথমিকের নতুন সহকারী শিক্ষকদের পদায়ন হবে লটারিতে", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=200&auto=format&fit=crop" },
        { title: "৩ মাসের মধ্যে ৫০ হাজার শিক্ষক নিয়োগ দেওয়া হবে: শিক্ষামন্ত্রী", image: "https://images.unsplash.com/photo-1555421689-d68471e189f2?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      title: "সারাদেশ",
      icon: <MapPin className="w-4 h-4 text-[#042a59]" />,
      featured: {
        title: "বাস খাদে পড়ে ৫ জন নিহত, আহত ১০",
        image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "বিএসটিআই ঘড়ি কিনতে ঋণ নেবে ইস্টার্ন ব্যাংক", image: "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=200&auto=format&fit=crop" },
        { title: "বাংলাদেশে বিশ্বের ১ নম্বর ই-বাইক ব্র্যান্ড ইয়াডিয়ার স্কুটার আনলো রানার", image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=200&auto=format&fit=crop" },
        { title: "দেশীয় ব্র্যান্ডের এসি ও ফ্রিজ ঘাঁটি স্থাপন রেমন্ড", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=200&auto=format&fit=crop" },
        { title: "গ্রাহকের কাছে হুন্ডাই সিয়াম ৬' হস্তান্তর করলো বিএসটিআই বাংলাদেশ", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=200&auto=format&fit=crop" }
      ]
    },
    {
      title: "বিবিধ",
      icon: <Grid className="w-4 h-4 text-[#042a59]" />,
      featured: {
        title: "ফ্রান্স-বাংলাদেশ চেম্বারের নতুন কমিটি গঠন",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32b7?q=80&w=400&auto=format&fit=crop"
      },
      list: [
        { title: "টিএমএসএস'র পথচলার ৩ বছর আজ", image: "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=200&auto=format&fit=crop" },
        { title: "এশিয়াটিক ডিপিএস চালু করল 'এশিয়াটিক সার্কেল'", image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=200&auto=format&fit=crop" },
        { title: "বাংলাদেশ বেতারের পোশাকবিষয়ক নির্দেশনা বাতিল", image: "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=200&auto=format&fit=crop" },
        { title: "এএমই অর্থাগমে সার্টিফায়েড প্রফেশনাল ডিগ্রি লাভ মিজানুর রহমানের", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop" }
      ]
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
      {categories.map((cat, idx) => (
        <div key={idx} className="flex flex-col">
          
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4">
            {cat.icon}
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">{cat.title}</h2>
            <div className="h-[1px] w-full bg-gray-200 ml-2" />
          </div>

          {/* Featured News */}
          <Link href="#" className="group block mb-6">
            <div className="relative w-full aspect-[4/3] mb-3 overflow-hidden rounded-sm bg-gray-100 border border-gray-200">
               <Image 
                 src={cat.featured.image} 
                 alt={cat.featured.title} 
                 fill 
                 className="object-cover transition-transform duration-500 group-hover:scale-105" 
               />
            </div>
            <h3 className="text-xl font-bold text-[#042a59] leading-snug group-hover:text-[#0b753a] transition-colors">
              {cat.featured.title}
            </h3>
          </Link>

          {/* Further Categories Placeholder (To be added from dashboard) */}
          <div className="w-full h-12 mb-6 border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-xs text-gray-400 rounded-sm">
             [ আরও দেখুন (See More) Placeholder ]
          </div>

          {/* List Items */}
          <div className="flex flex-col gap-4 mt-auto">
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
  );
}
