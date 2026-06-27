import { MOCK_ARTICLES } from "@/lib/mock-data";
import { NewsCardLarge } from "@/components/shared/news-card-large";
import { NewsCardMedium } from "@/components/shared/news-card-medium";
import { NewsCardSmall } from "@/components/shared/news-card-small";
import { SectionHeading } from "@/components/shared/section-heading";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

export default function Home() {
  const featuredArticle = MOCK_ARTICLES[0];
  const topStories = MOCK_ARTICLES.slice(1, 4);
  const technologyNews = MOCK_ARTICLES.filter(a => a.category.slug === "technology");
  const otherNews = MOCK_ARTICLES.slice(2, 6);

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10">
      
      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col gap-12">
        
        {/* Editor's Pick / Hero Section */}
        <section>
          <SectionHeading title="Editor's Pick" />
          <NewsCardLarge article={featuredArticle} isOverlay />
        </section>

        {/* Top Stories Grid */}
        <section>
          <SectionHeading title="Top Stories" link="/top-stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topStories.map(article => (
              <NewsCardMedium key={article.id} article={article} />
            ))}
          </div>
        </section>

        {/* Technology Section */}
        <section>
          <SectionHeading title="Technology" link="/category/technology" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="lg:col-span-1">
              {technologyNews[0] && (
                <NewsCardMedium article={technologyNews[0]} imageAspectRatio="landscape" />
              )}
            </div>
            <div className="flex flex-col gap-6 lg:col-span-1">
              {technologyNews.slice(1).map(article => (
                <NewsCardSmall key={article.id} article={article} />
              ))}
              {/* Fallback if not enough tech news in mock */}
              {otherNews.slice(0, 3).map(article => (
                <NewsCardSmall key={article.id} article={article} />
              ))}
            </div>
          </div>
        </section>

      </div>

      {/* Sidebar Area */}
      <aside className="w-full lg:w-[350px] shrink-0 flex flex-col gap-10">
        
        {/* Newsletter Widget */}
        <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-lg">Daily Briefing</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-6">
            Get the most important news of the day delivered straight to your inbox.
          </p>
          <form className="flex flex-col gap-3">
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="button" className="w-full">
              Subscribe
            </Button>
          </form>
        </div>

        {/* Trending / Most Read */}
        <div>
          <SectionHeading title="Trending Now" />
          <div className="flex flex-col gap-6">
            {MOCK_ARTICLES.slice(0, 5).map((article, index) => (
              <div key={article.id} className="flex gap-4 items-start group">
                <span className="text-4xl font-black text-muted-foreground/30 group-hover:text-primary transition-colors leading-none shrink-0 w-8">
                  {index + 1}
                </span>
                <NewsCardSmall article={article} showImage={false} className="flex-1" />
              </div>
            ))}
          </div>
        </div>

        {/* Sticky Ad Placeholder */}
        <div className="sticky top-24 w-full aspect-square bg-muted border border-border flex items-center justify-center flex-col gap-2 rounded-lg text-muted-foreground">
          <span className="text-xs uppercase tracking-widest font-semibold">Advertisement</span>
          <span className="text-sm">300 x 300</span>
        </div>
      </aside>

    </div>
  );
}
