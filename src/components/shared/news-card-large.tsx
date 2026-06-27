import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { NewsArticle } from "@/types/news";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "./category-badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface NewsCardLargeProps {
  article: NewsArticle;
  className?: string;
  isOverlay?: boolean; // If true, text is on top of the image
}

export function NewsCardLarge({ 
  article, 
  className,
  isOverlay = false
}: NewsCardLargeProps) {
  if (isOverlay) {
    return (
      <article className={cn("group relative w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden", className)}>
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1200px) 100vw, 800px"
          priority
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        
        <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
          <div className="mb-4">
            <CategoryBadge category={article.category.name} slug={article.category.slug} />
          </div>
          <h2 className="font-black text-2xl md:text-3xl lg:text-4xl leading-tight text-white mb-3 hover:underline decoration-white/50">
            <Link href={`/news/${article.slug}`}>
              {article.title}
            </Link>
          </h2>
          <p className="text-gray-200 text-sm md:text-base line-clamp-2 max-w-3xl mb-6">
            {article.excerpt}
          </p>
          
          <div className="flex items-center gap-3 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Avatar className="w-6 h-6 border border-white/20">
                <AvatarImage src={article.author.avatar} alt={article.author.name} />
                <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <Link href={`/author/${article.author.slug}`} className="font-medium hover:text-white transition-colors">
                {article.author.name}
              </Link>
            </div>
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>{format(new Date(article.publishedAt), "MMMM d, yyyy")}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className={cn("group flex flex-col lg:flex-row gap-6", className)}>
      <Link 
        href={`/news/${article.slug}`} 
        className="relative w-full lg:w-[60%] aspect-video lg:aspect-[16/10] rounded-xl overflow-hidden bg-muted shrink-0"
      >
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 60vw"
          priority
        />
      </Link>
      <div className="flex flex-col justify-center flex-1">
        <div className="mb-3">
          <CategoryBadge category={article.category.name} slug={article.category.slug} variant="secondary" />
        </div>
        <h2 className="font-extrabold text-2xl md:text-3xl leading-tight text-foreground mb-4 group-hover:text-primary transition-colors">
          <Link href={`/news/${article.slug}`}>
            {article.title}
          </Link>
        </h2>
        <p className="text-muted-foreground text-base mb-6 line-clamp-3">
          {article.excerpt}
        </p>
        <div className="flex items-center gap-4 text-sm mt-auto">
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarImage src={article.author.avatar} alt={article.author.name} />
              <AvatarFallback>{article.author.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Link href={`/author/${article.author.slug}`} className="font-semibold text-foreground hover:text-primary transition-colors">
                {article.author.name}
              </Link>
              <span className="text-xs text-muted-foreground">{format(new Date(article.publishedAt), "MMM d, yyyy")}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
