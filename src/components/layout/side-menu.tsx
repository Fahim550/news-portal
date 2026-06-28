"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, Home, ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";

interface SideMenuProps {
  variant?: "desktop" | "mobileTop";
}

export function SideMenu({ variant = "desktop" }: SideMenuProps) {
  const [open, setOpen] = React.useState(false);

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
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        {variant === "desktop" ? (
          <button className="flex items-center gap-1.5 h-full px-3 md:px-5 font-semibold hover:bg-white/10 transition-colors whitespace-nowrap text-white">
            <Menu className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">সব</span>
          </button>
        ) : (
          <button className="flex items-center justify-center p-2 text-gray-800 hover:text-gray-600 transition-colors">
            <Menu className="h-8 w-8" strokeWidth={1.5} />
          </button>
        )}
      </SheetTrigger>
      
      {/* Drawer opens from left */}
      <SheetContent side="left" className="w-[300px] sm:w-[350px] p-0 bg-white">
        <SheetHeader className="p-4 border-b border-gray-100 flex items-center justify-center">
          <SheetTitle className="text-left w-full flex justify-center">
            <Logo className="w-[200px] h-[60px]" />
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full overflow-y-auto">
          {/* Default links */}
          <Link 
            href="/" 
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 px-6 py-4 text-[#042a59] font-bold border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <Home className="h-5 w-5" />
            <span>প্রচ্ছদ</span>
          </Link>

          {/* Categories */}
          <nav className="flex flex-col">
            {navLinks.map((category) => (
              <div key={category.name} className="flex flex-col border-b border-gray-100">
                <Link
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-6 py-3.5 font-semibold text-gray-800 hover:text-[#0b753a] hover:bg-gray-50 transition-colors"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </nav>
          
          <Separator className="my-2 opacity-50" />
          
          <nav className="flex flex-col px-6 py-4 gap-4 mb-20">
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-500 hover:text-[#0b753a]">আমাদের সম্পর্কে</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-500 hover:text-[#0b753a]">যোগাযোগ</Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="text-sm font-medium text-gray-500 hover:text-[#0b753a]">গোপনীয়তা নীতি</Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
