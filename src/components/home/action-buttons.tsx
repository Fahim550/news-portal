import Link from "next/link"
import { BookOpen, Newspaper } from "lucide-react"

export function ActionButtons() {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* E-Paper Button */}
      <Link 
        href="#" 
        className="flex-1 flex items-center justify-center gap-3 bg-[#c9b999] hover:bg-[#bba882] text-[#2c2c2c] py-4 px-6 rounded-sm transition-colors shadow-sm"
      >
        <Newspaper className="w-6 h-6" strokeWidth={1.5} />
        <span className="text-xl font-bold tracking-wide">ই-পেপার</span>
      </Link>
      
      {/* Archive / Magazine Button */}
      <Link 
        href="#" 
        className="flex-1 flex items-center justify-center gap-3 bg-[#c9b999] hover:bg-[#bba882] text-[#2c2c2c] py-4 px-6 rounded-sm transition-colors shadow-sm"
      >
        <BookOpen className="w-6 h-6" strokeWidth={1.5} />
        <span className="text-xl font-bold tracking-wide">ম্যাগাজিন</span>
      </Link>
    </div>
  )
}
