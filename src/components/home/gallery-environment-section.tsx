import Image from "next/image";
import Link from "next/link";
import { Globe } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export async function GalleryEnvironmentSection() {
  const mockEnvNews = [
    { title: "শিগগির স্থগিত হতে পারে পাহাড়ের অবৈধ ফার্মেসিগুলোর ব্যবসা", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn4xYjeNR3q2Qau3h5OWaSm-YPkJ04rycwkUG-g9dwGA&s=10" },
    { title: "আবহাওয়ার খবর", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop" }
  ];

  const supabase = await createClient();
  const { data: envCat } = await supabase.from("categories").select("id").eq("slug", "environment").single();
  let envDbNews: any = null;
  if (envCat) {
    const { data } = await supabase.from("news").select("title, featured_image").eq("category_id", envCat.id).eq("status", "published").order("published_at", { ascending: false }).limit(2);
    envDbNews = data;
  }
  
  const environmentNews = envDbNews && envDbNews.length >= 2 ? envDbNews.map((n: any) => ({
    title: n.title,
    image: n.featured_image || mockEnvNews[0].image
  })) : mockEnvNews;

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mt-6">
      
      {/* Left Area: Photo Gallery (Approx 75%) */}
      <div className="lg:w-[75%] flex flex-col">
        {/* Section Header */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 bg-[#c74c2c]" />
          <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">ফটো গ্যালারি</h2>
        </div>

        {/* Big Gallery Image */}
        <div className="relative w-full aspect-[16/9] md:aspect-[16/7] xl:aspect-[2/1] overflow-hidden border border-gray-200">
           <Image 
             src="https://assets.bucketlistly.blog/sites/5adf778b6eabcc00190b75b1/assets/6075182186d092000b192cee/best-free-travel-images-image-2.jpg" 
             alt="Photo Gallery" 
             fill 
             className="object-cover" 
           />
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-gray-300"></div>
           <div className="w-2 h-2 rounded-full bg-[#c74c2c]"></div>
        </div>
      </div>

      {/* Right Area: Environment (Approx 25%) */}
      <div className="lg:w-[25%] flex flex-col shrink-0">
        
        <div className="border border-gray-200 p-4 rounded-sm">
          {/* Section Header */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-3 h-3 bg-[#c74c2c]" />
            <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">পরিবেশ ও প্রতিবেশ</h2>
          </div>

          <div className="flex flex-col gap-4">
            
            <Link href="#" className="group block relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
              <Image 
                src={environmentNews[0]?.image} 
                alt="Environment News 1" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-3">
                <h3 className="text-white font-medium text-[15px] leading-snug group-hover:text-gray-200 transition-colors">
                  {environmentNews[0]?.title}
                </h3>
              </div>
            </Link>

            <Link href="#" className="group block relative w-full aspect-[4/3] overflow-hidden rounded-sm border border-gray-200 bg-gray-100">
              <Image 
                src={environmentNews[1]?.image} 
                alt="Environment News 2" 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-3 flex flex-col items-center text-center">
                <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center mb-2 bg-black/40">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-white font-medium text-[15px] leading-snug group-hover:text-gray-200 transition-colors">
                  {environmentNews[1]?.title}
                </h3>
              </div>
            </Link>

          </div>
        </div>

      </div>

    </div>
  );
}
