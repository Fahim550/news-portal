import Image from "next/image"
import Link from "next/link"
import { PlayCircle } from "lucide-react"

export function LiveNewsBanner() {
  const liveVideos = [
    {
      title: "LIVE | ছাত্র-জনতার গণঅভ্যুত্থান",
      image: "https://images.unsplash.com/photo-1579532537598-459ecdaf39cc?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "LIVE | প্রধান উপদেষ্টার জাতির উদ্দেশ্যে ভাষণ",
      image: "https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=400&auto=format&fit=crop"
    },
    {
      title: "LIVE | বন্যা পরিস্থিতি ও সার্বিক অবস্থা",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=400&auto=format&fit=crop"
    }
  ]

  return (
    <div className="w-full bg-[#111111] my-8 rounded-sm overflow-hidden flex flex-col md:flex-row shadow-lg">
      
      {/* Left LIVE Box */}
      <div className="w-full md:w-[25%] lg:w-[20%] bg-[#b83b3b] p-6 flex flex-col items-center justify-center text-white relative shrink-0">
         <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-transparent border-r-[40px] border-r-[#111111] md:block hidden"></div>
         
         <div className="flex flex-col items-center gap-2">
           {/* Diamond or Play Icon */}
           <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mb-2 animate-pulse">
             <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
               <div className="w-4 h-4 bg-[#b83b3b] rotate-45"></div>
             </div>
           </div>
           
           <h2 className="text-3xl font-black tracking-widest uppercase drop-shadow-md">LIVE</h2>
           <p className="text-sm font-medium text-white/80 mt-1">সরাসরি সম্প্রচার</p>
         </div>
      </div>

      {/* Right Video Thumbnails */}
      <div className="w-full md:w-[75%] lg:w-[80%] p-4 lg:p-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {liveVideos.map((video, idx) => (
          <Link href="#" key={idx} className="group relative w-full aspect-video rounded-sm overflow-hidden border border-gray-800 bg-gray-900">
            <Image 
              src={video.image} 
              alt={video.title} 
              fill 
              className="object-cover opacity-60 group-hover:opacity-90 transition-opacity duration-300"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <PlayCircle className="w-12 h-12 text-white/80 group-hover:text-white group-hover:scale-110 transition-all duration-300 drop-shadow-lg" strokeWidth={1} />
            </div>
            {/* Title Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent">
              <h3 className="text-white text-sm font-medium line-clamp-2 leading-snug">
                {video.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}
