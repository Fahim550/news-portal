"use client"

import Image from "next/image"
import { MapPin, Search } from "lucide-react"

export function DistrictNewsMap() {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-sm overflow-hidden flex flex-col my-8">
      
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-gray-50/50">
        <div className="flex items-center gap-2">
          <MapPin className="text-[#0b753a] w-5 h-5" />
          <h2 className="text-xl font-bold text-gray-800">আপনার জেলার খবর</h2>
        </div>
      </div>

      <div className="flex flex-col md:flex-row p-6 gap-8">
        {/* Map Image Side */}
        <div className="flex-1 flex justify-center items-center relative min-h-[300px] bg-green-50/30 rounded-lg border border-green-100">
           {/* We use a descriptive placeholder for the map to avoid large SVG bloat in the mock */}
           <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Bangladesh_map_with_districts.svg/800px-Bangladesh_map_with_districts.svg.png')] bg-contain bg-center bg-no-repeat opacity-80 mix-blend-multiply" />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-[350px] shrink-0 flex flex-col justify-center gap-6">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-[#e31837] mb-1">সারা দেশের খবর</h3>
            <p className="text-sm text-gray-500">আপনার নিজস্ব এলাকার সর্বশেষ সংবাদ জানতে জেলা নির্বাচন করুন</p>
          </div>

          <div className="flex flex-col gap-4">
            <select className="w-full border border-gray-300 rounded-sm px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-[#0b753a] focus:ring-1 focus:ring-[#0b753a]">
              <option value="">বিভাগ নির্বাচন করুন</option>
              <option value="dhaka">ঢাকা</option>
              <option value="chittagong">চট্টগ্রাম</option>
              <option value="sylhet">সিলেট</option>
              <option value="rajshahi">রাজশাহী</option>
              <option value="khulna">খুলনা</option>
              <option value="barisal">বরিশাল</option>
              <option value="rangpur">রংপুর</option>
              <option value="mymensingh">ময়মনসিংহ</option>
            </select>
            
            <select className="w-full border border-gray-300 rounded-sm px-4 py-3 text-gray-700 bg-white focus:outline-none focus:border-[#0b753a] focus:ring-1 focus:ring-[#0b753a]" disabled>
              <option value="">জেলা নির্বাচন করুন</option>
            </select>

            <button className="w-full bg-[#0b753a] hover:bg-[#095c2e] text-white font-bold py-3 px-4 rounded-sm transition-colors flex items-center justify-center gap-2 mt-2 shadow-sm">
              <Search className="w-5 h-5" />
              <span>খুঁজুন</span>
            </button>
          </div>
        </div>
      </div>
      
    </div>
  )
}
