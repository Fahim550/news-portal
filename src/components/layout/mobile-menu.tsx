"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "./logo";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/constants";

export function MobileMenu() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={
        <Button variant="ghost" size="icon" className="md:hidden" />
      }>
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[350px] pr-0">
        <SheetHeader className="pr-6">
          <SheetTitle className="text-left">
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full mt-6 pr-6 pb-20 overflow-y-auto">
          <nav className="flex flex-col gap-4">
            {CATEGORIES.map((category) => (
              <div key={category.slug} className="flex flex-col gap-2">
                <Link
                  href={`/category/${category.slug}`}
                  onClick={() => setOpen(false)}
                  className="font-semibold text-lg hover:text-primary transition-colors"
                >
                  {category.name}
                </Link>
                {category.subcategories && (
                  <div className="flex flex-col gap-2 pl-4 border-l-2 border-muted">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/category/${category.slug}/${sub.slug}`}
                        onClick={() => setOpen(false)}
                        className="text-muted-foreground hover:text-primary transition-colors text-sm"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <Separator className="my-6" />
          <nav className="flex flex-col gap-3">
            <Link href="/about" onClick={() => setOpen(false)} className="text-sm font-medium">About Us</Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="text-sm font-medium">Contact</Link>
            <Link href="/privacy" onClick={() => setOpen(false)} className="text-sm font-medium">Privacy Policy</Link>
            <Link href="/terms" onClick={() => setOpen(false)} className="text-sm font-medium">Terms of Service</Link>
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  );
}
