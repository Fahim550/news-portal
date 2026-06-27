import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  isDark?: boolean;
}

export function Logo({ className, isDark }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 group", className)}>
      <div className="bg-primary text-primary-foreground font-black text-2xl px-3 py-1 rounded-sm tracking-tighter">
        NP
      </div>
      <div className="flex flex-col">
        <span className="font-black text-xl leading-none tracking-tight uppercase">
          News Portal
        </span>
        <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold mt-0.5">
          Enterprise CMS
        </span>
      </div>
    </Link>
  );
}
