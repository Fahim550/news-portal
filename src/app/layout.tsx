import { QueryProvider } from "@/components/providers/query-provider"
import { ThemeProvider } from "@/components/providers/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: {
    default: "News Portal | Latest Breaking News & Updates",
    template: "%s | News Portal",
  },
  description:
    "Get the latest breaking news, sports, entertainment, and technology updates from around the world. Stay informed with our real-time news coverage.",
  keywords: [
    "news",
    "breaking news",
    "latest news",
    "world news",
    "technology",
    "sports",
    "entertainment",
  ],
  authors: [{ name: "Md. Alamgir Hossain" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://newsportal.com",
    title: "News Portal | Latest Breaking News",
    description:
      "Your trusted source for the latest breaking news and in-depth reporting.",
    siteName: "News Portal",
  },
  twitter: {
    card: "summary_large_image",
    title: "News Portal | Latest Breaking News",
    description:
      "Your trusted source for the latest breaking news and in-depth reporting.",
    creator: "@newsportal",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${inter.className} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            disableTransitionOnChange
          >
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
