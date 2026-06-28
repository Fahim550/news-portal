import { Calendar, Home, MapPin, Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaRss,
  FaTwitter,
} from "react-icons/fa"
import { BreakingNewsTicker } from "./breaking-news-ticker"
import { Logo } from "./logo"
import { SideMenu } from "./side-menu"

export function Header() {
  const navLinks = [
    { name: "জাতীয়", href: "/national" },
    { name: "অর্থনীতি", href: "/archives/category/economics" },
    { name: "ব্যবসা", href: "/business" },
    { name: "বিনিয়োগ", href: "/investment" },
    { name: "আন্তর্জাতিক", href: "/archives/category/international" },
    { name: "রাজনীতি", href: "/archives/category/politics" },
    { name: "অপরাধ ও দুর্নীতি", href: "/archives/category/crime" },
    { name: "খেলাধুলা", href: "/archives/category/sports" },
    { name: "বিনোদন", href: "/archives/category/entertainment" },
    { name: "তথ্যপ্রযুক্তি", href: "/archives/category/technology" },
  ]
  return (
    <>
      <header className="flex w-full flex-col bg-white">
        {/* Top Section: Logo, Date, Socials */}
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-2 md:flex-row md:py-3">
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            {/* <Logo /> */}
            <Image
              src={Logo}
              alt="Logo"
              width={220}
              height={60}
              className="h-12 w-auto md:h-[55px]"
              priority
            />
          </div>

          {/* Center: Date & Time */}
          <div className="flex flex-col items-center justify-center text-[15px] font-medium text-gray-600 md:text-[18px]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-[#0b753a]" />
                <span>ঢাকা</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4 text-[#0b753a]" />
                <span>রবিবার, ২৮ জুন, ২০২৬</span>
              </div>
            </div>
            {/* <div className="mt-1 text-gray-500">
            ১০ আষাঢ় ১৪৩৩ বঙ্গাব্দ
          </div> */}
          </div>

          {/* Right: Social Icons */}
          <div className="flex items-center gap-2">
            <Link
              href="https://www.facebook.com/greensoulit/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#3b5998] text-white transition-opacity hover:opacity-90"
            >
              <FaFacebookF className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/greensoulit/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#bd081c] text-white transition-opacity hover:opacity-90"
            >
              <FaTwitter className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/greensoulit/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#007bb5] text-white transition-opacity hover:opacity-90"
            >
              <FaLinkedinIn className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/greensoulit/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e4405f] text-white transition-opacity hover:opacity-90"
            >
              <FaInstagram className="h-4 w-4" />
            </Link>
            <Link
              href="https://www.facebook.com/greensoulit/"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f26522] text-white transition-opacity hover:opacity-90"
            >
              <FaRss className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* Sticky Navigation Section */}
      <div className="sticky top-0 z-50 w-full bg-[#042a59] text-white shadow-md transition-all duration-300">
        <div className="container mx-auto">
          <div className="flex h-[60px] items-center justify-between text-[14px] md:h-[48px] md:text-[15px]">
            {/* Mobile Left: Logo */}
            <div className="flex h-full items-center py-2 pl-3 md:hidden">
              <div className="flex h-full items-center justify-center rounded-md bg-white px-3 py-1 shadow-sm">
                <Image
                  src={Logo}
                  alt="Logo"
                  width={140}
                  height={36}
                  className="h-7 w-auto object-contain"
                  priority
                />
              </div>
            </div>

            {/* Desktop Left: Links */}
            <nav className="no-scrollbar hidden h-full items-center overflow-x-auto md:flex">
              <Link
                href="/"
                className="flex h-full items-center gap-1.5 bg-[#031d3f] px-4 font-semibold transition-colors hover:bg-[#031d3f]/80 md:px-5"
              >
                <Home className="h-[15px] w-[15px]" />
                <span>প্রচ্ছদ</span>
              </Link>

              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="flex h-full items-center px-3 font-semibold whitespace-nowrap transition-colors hover:bg-white/5 hover:text-gray-200 md:px-4"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right section: Menu & Search */}
            <div className="flex h-full shrink-0 items-center">
              <SideMenu />

              <div className="mx-1 hidden h-4 w-px bg-white/30 md:mx-2 md:block"></div>

              <button className="mx-1 hidden rounded-sm bg-white px-2 py-0.5 text-[11px] font-bold text-[#042a59] hover:bg-gray-100 md:mx-2 md:block">
                ENG
              </button>

              <div className="mx-1 hidden h-4 w-px bg-white/30 md:mx-2 md:block"></div>

              <button className="flex h-full items-center justify-center px-3 transition-colors hover:bg-white/10 md:px-5">
                <Search className="h-[16px] w-[16px]" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Breaking News Ticker (Non-Sticky) */}
      <BreakingNewsTicker />
    </>
  )
}
