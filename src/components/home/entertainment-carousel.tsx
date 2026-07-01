import Image from "next/image"
import Link from "next/link"
import { PlayCircle, Film } from "lucide-react"

export function EntertainmentCarousel() {
  const posters = [
    { title: "তুফান", image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=400&auto=format&fit=crop" },
    { title: "সুড়ঙ্গ", image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=400&auto=format&fit=crop" },
    { title: "প্রিয়তমা", image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop" },
    { title: "হাওয়া", image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=400&auto=format&fit=crop" },
    { title: "পরাণ", image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?q=80&w=400&auto=format&fit=crop" }
  ]

  return (
    <div className="flex flex-col gap-6 my-10">
      
      {/* Header */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <Film className="w-6 h-6 text-[#042a59]" />
        <h2 className="text-2xl font-bold text-[#042a59]">বিনোদন</h2>
      </div>

      {/* Carousel Container */}
      <div className="flex gap-4 overflow-x-auto pb-4 snap-x hide-scrollbar">
        {posters.map((poster, idx) => (
          <Link href="#" key={idx} className="group relative w-[180px] md:w-[220px] aspect-[2/3] shrink-0 rounded-sm overflow-hidden bg-gray-900 snap-center shadow-md">
            <Image 
              src={poster.image} 
              alt={poster.title} 
              fill 
              className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
            />
            {/* Play Overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
               <PlayCircle className="w-12 h-12 text-white/90 drop-shadow-lg" strokeWidth={1.5} />
            </div>
            {/* Title */}
            <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black via-black/50 to-transparent">
              <h3 className="text-white font-bold text-center text-lg">{poster.title}</h3>
            </div>
          </Link>
        ))}
      </div>
      
    </div>
  )
}
