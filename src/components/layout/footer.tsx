import { Separator } from "@/components/ui/separator"
import { CATEGORIES } from "@/lib/constants"
import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"
import { Logo } from "./logo"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-border mt-12 border-t pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <Logo />
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
              Your most trusted source for breaking news, in-depth analysis, and
              exclusive reports from around the globe. Stay informed, stay
              ahead.
            </p>
            <div className="mt-2 flex items-center gap-3">
              <SocialLink href="#" icon={<FaFacebook className="h-4 w-4" />} />
              <SocialLink href="#" icon={<FaTwitter className="h-4 w-4" />} />
              <SocialLink href="#" icon={<FaInstagram className="h-4 w-4" />} />
              <SocialLink href="#" icon={<FaYoutube className="h-4 w-4" />} />
              <SocialLink href="#" icon={<FaLinkedin className="h-4 w-4" />} />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-foreground mb-4 text-lg font-bold tracking-tight">
              Categories
            </h3>
            <ul className="flex flex-col gap-2.5">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/category/${cat.slug}`}
                    className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <div>
              hello div
            </div>
            <h3 className="text-foreground mb-4 text-lg font-bold tracking-tight">
              Quick Links
            </h3>
            <ul className="flex flex-col gap-2.5">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  Our Authors
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-muted-foreground hover:text-primary text-sm font-medium transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-foreground mb-4 text-lg font-bold tracking-tight">
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="text-muted-foreground flex items-start gap-3 text-sm">
                <MapPin className="text-primary h-5 w-5 shrink-0" />
                <span>
                  123 News Avenue, Media City
                  <br />
                  New York, NY 10001
                </span>
              </li>
              <li className="text-muted-foreground flex items-center gap-3 text-sm">
                <Phone className="text-primary h-5 w-5 shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-muted-foreground flex items-center gap-3 text-sm">
                <Mail className="text-primary h-5 w-5 shrink-0" />
                <span>editor@newsportal.com</span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="text-muted-foreground flex flex-col items-center justify-between gap-4 text-xs md:flex-row">
          <p>
            &copy; {currentYear} News Portal Enterprise CMS. All rights
            reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="/privacy"
              className="hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap"
              className="hover:text-primary transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialLink({ href, icon }: { href: string; icon: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full transition-colors"
    >
      {icon}
    </a>
  )
}
