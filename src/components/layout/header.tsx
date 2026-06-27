import { Logo } from "./logo";
import { MegaMenu } from "./mega-menu";
import { MobileMenu } from "./mobile-menu";
import { SearchModal } from "./search-modal";
import { ThemeSwitcher } from "./theme-switcher";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <MobileMenu />
          <Logo />
        </div>
        
        <div className="flex items-center justify-end flex-1 gap-2 md:gap-6">
          <MegaMenu />
          
          <div className="flex items-center gap-1 md:gap-2 border-l pl-2 md:pl-6 ml-2 md:ml-0">
            <SearchModal />
            <ThemeSwitcher />
            <Button variant="ghost" size="icon" asChild className="rounded-full w-9 h-9">
              <Link href="/login">
                <User className="h-[1.2rem] w-[1.2rem]" />
                <span className="sr-only">Sign In</span>
              </Link>
            </Button>
            <Button asChild className="hidden lg:flex rounded-full px-6 font-semibold" size="sm">
              <Link href="/subscribe">Subscribe</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
