import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

export function GalleryEnvironmentSection() {
  const photos = [
    { title: "বন্যা পরিস্থিতি", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop" },
    { title: "শীতের সকাল", image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop" },
    { title: "গ্রাম বাংলার দৃশ্য", image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop" },
    { title: "নৌকা বাইচ", image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop" },
  ]

  return (
    <div className="w-full bg-[#1a1a1a] my-10 p-6 md:p-8 rounded-sm">
      <div className="flex items-center gap-2 mb-6 border-b border-gray-700 pb-2">
        <Camera className="w-6 h-6 text-white" />
        <h2 className="text-2xl font-bold text-white">ফটো গ্যালারী</h2>
      </div>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Main Photo */}
        <Link href="#" className="lg:w-[65%] group relative block overflow-hidden rounded-sm aspect-[16/10] md:aspect-video">
          <Image 
            src={photos[0].image} 
            alt={photos[0].title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full p-6">
             <div className="bg-[#b83b3b] text-white text-xs font-bold px-2 py-1 inline-block mb-3 rounded-sm">
               Latest Photo
             </div>
             <h3 className="text-white text-xl md:text-3xl font-bold leading-tight group-hover:text-gray-300 transition-colors">
               {photos[0].title}
             </h3>
          </div>
        </Link>

        {/* Small Photos Grid */}
        <div className="lg:w-[35%] grid grid-cols-2 lg:grid-cols-1 gap-4">
          {photos.slice(1).map((photo, idx) => (
            <Link href="#" key={idx} className="group relative block overflow-hidden rounded-sm aspect-[4/3] lg:aspect-[16/7]">
              <Image 
                src={photo.image} 
                alt={photo.title} 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 w-full p-4">
                <Camera className="w-4 h-4 text-white/80 mb-2" />
                <h3 className="text-white text-sm font-medium leading-snug group-hover:text-gray-300 transition-colors">
                  {photo.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
