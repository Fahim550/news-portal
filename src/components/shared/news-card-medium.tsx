import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { NewsArticle } from "@/types/news";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";

interface NewsCardMediumProps {
  article: NewsArticle;
  className?: string;
  imageAspectRatio?: "video" | "square" | "landscape";
}

export function NewsCardMedium({ 
  article, 
  className,
  imageAspectRatio = "video"
}: NewsCardMediumProps) {
  const aspectClasses = {
    video: "aspect-video",
    square: "aspect-square",
    landscape: "aspect-[4/3]"
  };

  return (
    <article className={cn("group flex flex-col gap-3", className)}>
      <div className={cn("relative w-full rounded-lg overflow-hidden bg-muted", aspectClasses[imageAspectRatio])}>
        <Link 
          href={`/news/${article.slug}`}
          className="absolute inset-0 z-0"
        >
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </Link>
        <div className="absolute top-2 left-2 z-10">
          <CategoryBadge category={article.category.name} slug={article.category.slug} />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="font-bold text-lg leading-tight line-clamp-2 text-foreground group-hover:text-primary transition-colors">
          <Link href={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {article.excerpt}
        </p>
        <div className="flex items-center justify-between mt-1 text-xs text-muted-foreground">
          <span className="font-medium hover:text-foreground transition-colors">
            <Link href={`/author/${article.author.slug}`}>By {article.author.name}</Link>
          </span>
          <span>{format(new Date(article.publishedAt), "MMM d, yyyy")}</span>
        </div>
      </div>
    </article>
  );
}
