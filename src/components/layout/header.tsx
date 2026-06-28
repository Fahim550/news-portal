import Link from "next/link";
import { Home, Menu, Search, MapPin, Calendar } from "lucide-react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaRss } from "react-icons/fa";
import { Logo } from "./logo";
import { BreakingNewsTicker } from "./breaking-news-ticker";
import { SideMenu } from "./side-menu";

export function Header() {
  const navLinks = [
    { name: "জাতীয়", href: "/national" },
    { name: "অর্থনীতি", href: "#" },
    { name: "ব্যবসা", href: "/business" },
    { name: "বিনিয়োগ", href: "/investment" },
    { name: "আন্তর্জাতিক", href: "#" },
    { name: "রাজনীতি", href: "#" },
    { name: "অপরাধ ও দুর্নীতি", href: "#" },
    { name: "খেলাধুলা", href: "#" },
    { name: "বিনোদন", href: "#" },
    { name: "তথ্যপ্রযুক্তি", href: "#" },
  ];
  return (
    <>
      <header className="w-full bg-white flex flex-col">
      {/* Top Section: Logo, Date, Socials */}
      <div className="container mx-auto px-4 py-2 md:py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Logo */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Center: Date & Time */}
        <div className="flex flex-col items-center justify-center text-[15px] md:text-[18px] text-gray-600 font-medium">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#0b753a]" />
              <span>ঢাকা</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-[#0b753a]" />
              <span>রবিবার, ২৮ জুন, ২০২৬</span>
            </div>
          </div>
          {/* <div className="mt-1 text-gray-500">
            ১০ আষাঢ় ১৪৩৩ বঙ্গাব্দ
          </div> */}
        </div>

        {/* Right: Social Icons */}
        <div className="flex items-center gap-2">
          <Link href="https://www.facebook.com/greensoulit/" className="w-8 h-8 rounded-full bg-[#3b5998] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <FaFacebookF className="w-4 h-4" />
          </Link>
          <Link href="https://www.facebook.com/greensoulit/" className="w-8 h-8 rounded-full bg-[#bd081c] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <FaTwitter className="w-4 h-4" />
          </Link>
          <Link href="https://www.facebook.com/greensoulit/" className="w-8 h-8 rounded-full bg-[#007bb5] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <FaLinkedinIn className="w-4 h-4" />
          </Link>
          <Link href="https://www.facebook.com/greensoulit/" className="w-8 h-8 rounded-full bg-[#e4405f] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <FaInstagram className="w-4 h-4" />
          </Link>
          <Link href="https://www.facebook.com/greensoulit/" className="w-8 h-8 rounded-full bg-[#f26522] flex items-center justify-center text-white hover:opacity-90 transition-opacity">
            <FaRss className="w-4 h-4" />
          </Link>
        </div>
      </div>
      </header>

      {/* Sticky Navigation Section */}
      <div className="sticky top-0 z-50 w-full shadow-md bg-[#042a59] text-white transition-all duration-300">
        <div className="container mx-auto">
          <div className="flex h-[60px] md:h-[48px] items-center justify-between text-[14px] md:text-[15px]">
            {/* Mobile Left: Logo */}
            <div className="flex md:hidden items-center h-full pl-3 py-2">
              <div className="bg-white h-full px-3 rounded-md flex items-center justify-center shadow-sm">
                <Logo src="/logo1.png" className="w-[140px] h-[38px]" />
              </div>
            </div>

            {/* Desktop Left: Links */}
            <nav className="hidden md:flex items-center h-full overflow-x-auto no-scrollbar">
              <Link 
                href="/" 
                className="flex items-center gap-1.5 h-full bg-[#031d3f] px-4 md:px-5 font-semibold hover:bg-[#031d3f]/80 transition-colors"
              >
                <Home className="h-[15px] w-[15px]" />
                <span>প্রচ্ছদ</span>
              </Link>
              
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  href={link.href} 
                  className="h-full flex items-center px-3 md:px-4 font-semibold hover:text-gray-200 hover:bg-white/5 transition-colors whitespace-nowrap"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
            
            {/* Right section: Menu & Search */}
            <div className="flex items-center h-full shrink-0">
              <SideMenu />
              
              <div className="h-4 w-px bg-white/30 mx-1 md:mx-2 hidden md:block"></div>
              
              <button className="text-[11px] font-bold bg-white text-[#042a59] px-2 py-0.5 rounded-sm hover:bg-gray-100 mx-1 md:mx-2 hidden md:block">
                ENG
              </button>
              
              <div className="h-4 w-px bg-white/30 mx-1 md:mx-2 hidden md:block"></div>
              
              <button className="h-full px-3 md:px-5 hover:bg-white/10 transition-colors flex items-center justify-center">
                <Search className="h-[16px] w-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker (Non-Sticky) */}
      <BreakingNewsTicker />
    </>
  );
}
