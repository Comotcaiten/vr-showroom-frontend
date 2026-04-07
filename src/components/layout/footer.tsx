import Link from "next/link";
import { Zap } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Changelog", href: "/changelog" },
    { label: "Roadmap", href: "/roadmap" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
    { label: "Cookies", href: "/cookies" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-2">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-lg group w-fit"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <Zap className="h-4 w-4" />
              </span>
              <span>MyBrand</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed max-w-xs">
              Building something remarkable. Fast, reliable, and crafted with
              care.
            </p>
            {/* Social links */}
            <div className="mt-5 flex items-center gap-2"></div>
          </div>

          {/* Link columns */}
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-sm font-semibold text-foreground mb-3">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom section */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MyBrand. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Made with ❤️ by the team
          </p>
        </div>
      </div>
    </footer>
  );
}
