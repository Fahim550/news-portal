"use client"

import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Home, Menu } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import * as React from "react"
import Logo from "../../../public/images/logo.png"

interface SideMenuProps {
  variant?: "desktop" | "mobileTop"
}

export function SideMenu({ variant = "desktop" }: SideMenuProps) {
  const [open, setOpen] = React.useState(false)

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
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          variant === "desktop" ? (
            <button className="flex h-full items-center gap-1.5 px-3 font-semibold whitespace-nowrap text-white transition-colors hover:bg-white/10 md:px-5" />
          ) : (
            <button className="flex items-center justify-center p-2 text-gray-800 transition-colors hover:text-gray-600" />
          )
        }
      >
        {variant === "desktop" ? (
          <>
            <Menu className="h-[18px] w-[18px]" />
            <span className="hidden sm:inline">সব</span>
          </>
        ) : (
          <Menu className="h-8 w-8" strokeWidth={1.5} />
        )}
      </SheetTrigger>

      {/* Drawer opens from left */}
      <SheetContent side="left" className="w-[300px] bg-white p-0 sm:w-[350px]">
        <SheetHeader className="flex items-center justify-center border-b border-gray-100 p-4">
          <SheetTitle className="flex w-full justify-center">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="inline-flex transition-transform hover:scale-[1.02]"
            >
              <Image
                src={Logo}
                alt="News Portal"
                width={200}
                height={55}
                className="h-16 w-auto object-contain sm:w-[180px]"
                priority
              />
            </Link>
          </SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col overflow-y-auto">
          {/* Default links */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 border-b border-gray-100 px-6 py-4 font-bold text-[#042a59] transition-colors hover:bg-gray-50"
          >
            <Home className="h-5 w-5" />
            <span>প্রচ্ছদ</span>
          </Link>

          {/* Categories */}
          <nav className="flex flex-col">
            {navLinks.map((category) => (
              <div
                key={category.name}
                className="flex flex-col border-b border-gray-100"
              >
                <Link
                  href={category.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-6 py-3.5 font-semibold text-gray-800 transition-colors hover:bg-gray-50 hover:text-[#0b753a]"
                >
                  {category.name}
                </Link>
              </div>
            ))}
          </nav>

          <Separator className="my-2 opacity-50" />

          <nav className="mb-20 flex flex-col gap-4 px-6 py-4">
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-[#0b753a]"
            >
              আমাদের সম্পর্কে
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-[#0b753a]"
            >
              যোগাযোগ
            </Link>
            <Link
              href="/privacy"
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-gray-500 hover:text-[#0b753a]"
            >
              গোপনীয়তা নীতি
            </Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )
}
