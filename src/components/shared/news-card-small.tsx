import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { NewsArticle } from "@/types/news";
import { cn } from "@/lib/utils";

interface NewsCardSmallProps {
  article: NewsArticle;
  className?: string;
  showImage?: boolean;
}

export function NewsCardSmall({ article, className, showImage = true }: NewsCardSmallProps) {
  return (
    <article className={cn("group flex gap-4 items-start", className)}>
      {showImage && (
        <Link 
          href={`/news/${article.slug}`} 
          className="relative w-24 h-24 shrink-0 rounded-md overflow-hidden bg-muted"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="96px"
          />
        </Link>
      )}
      <div className="flex flex-col gap-1.5 flex-1 min-w-0">
        <Link 
          href={`/category/${article.category.slug}`}
          className="text-[10px] font-bold uppercase tracking-wider text-primary hover:underline w-fit"
        >
          {article.category.name}
        </Link>
        <h3 className="font-bold text-sm leading-tight line-clamp-3 text-foreground group-hover:text-primary transition-colors">
          <Link href={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatDistanceToNow(new Date(article.publishedAt), { addSuffix: true })}
          </span>
        </div>
      </div>
    </article>
  );
}
