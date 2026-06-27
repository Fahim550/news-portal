import { cn } from "@/lib/utils";
import Link from "next/link";

interface CategoryBadgeProps {
  category: string;
  slug?: string;
  className?: string;
  variant?: "default" | "outline" | "secondary";
}

export function CategoryBadge({
  category,
  slug,
  className,
  variant = "default",
}: CategoryBadgeProps) {
  const baseClasses =
    "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/80 border-transparent",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border-transparent",
    outline: "text-foreground border border-input hover:bg-accent hover:text-accent-foreground",
  };

  const Component = slug ? Link : "span";
  const props = slug ? { href: `/category/${slug}` } : {};

  return (
    <Component
      className={cn(baseClasses, variants[variant], className)}
      {...props}
    >
      {category}
    </Component>
  );
}
