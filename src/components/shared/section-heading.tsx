import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SectionHeadingProps {
  title: string;
  link?: string;
  className?: string;
}

export function SectionHeading({ title, link, className }: SectionHeadingProps) {
  return (
    <div className={cn("flex items-center justify-between border-b-2 border-primary mb-6 pb-2", className)}>
      <h2 className="text-2xl font-bold tracking-tight relative">
        {title}
        <span className="absolute -bottom-[10px] left-0 w-1/2 h-[4px] bg-primary rounded-t-md" />
      </h2>
      
      {link && (
        <Link 
          href={link}
          className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
        >
          View All
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  );
}
