export function CorporateNotices() {
  // Dummy data to simulate the banners shown in the screenshot.
  // These will be replaced by dynamic data from the dashboard later.
  const notices = Array.from({ length: 15 }).map((_, idx) => {
    const types = [
      { text: "Price Sensitive Information", color: "bg-[#005baa]" }, // Blue
      { text: "Financial Statements", color: "bg-[#0b753a]" }, // Green
      { text: "AGM Notice", color: "bg-[#38529a]" }, // Indigo
      { text: "Annual General Meeting", color: "bg-[#e5007d]" }, // Pink
      { text: "Price Sensitive Disclosure", color: "bg-[#275a28]" }, // Dark Green
      { text: "Price Sensitive Information", color: "bg-[#e31837]" }, // Red
      { text: "PSI (Q1) 2026", color: "bg-[#0092c8]" }, // Light Blue
      { text: "AGM Notice", color: "bg-[#812990]" }, // Purple
    ];
    
    const type = types[idx % types.length];

    return {
      id: idx,
      logoText: `Company ${idx + 1}`,
      noticeText: type.text,
      color: type.color,
    };
  });

  return (
    <div className="mt-8 mb-12 border-t border-gray-200 pt-8">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl md:text-2xl font-bold text-[#042a59] whitespace-nowrap">কর্পোরেট বিজ্ঞপ্তি ও নোটিশ</h2>
        <div className="h-[1px] w-full bg-gray-200 ml-2" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {notices.map((notice) => (
          <div 
            key={notice.id} 
            className="group flex h-14 md:h-[60px] border border-gray-200 bg-white rounded-sm overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
            title="Dashboard Controlled Banner Space"
          >
            {/* Left side: Company Logo Placeholder */}
            <div className="flex-[3] flex items-center justify-center p-2 bg-white relative">
              <span className="text-xs md:text-sm font-bold text-gray-500 text-center leading-tight">
                {notice.logoText}
              </span>
              <div className="absolute inset-0 bg-gray-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-[10px] text-gray-400">Placeholder</span>
              </div>
            </div>
            
            {/* Right side: Notice Type */}
            <div className={`flex-[2] ${notice.color} p-1.5 flex items-center justify-center`}>
              <span className="text-white text-[9px] md:text-[10px] font-bold text-center leading-tight drop-shadow-sm">
                {notice.noticeText}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
