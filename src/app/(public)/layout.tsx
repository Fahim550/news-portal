import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BreakingNewsTicker } from "@/components/layout/breaking-news-ticker";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div>
        hello
      </div>
      <BreakingNewsTicker />
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
