import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";

const navigationItems = [
  { title: "Home", href: "/" },
  { title: "About", href: "/about" },
  { title: "Gallery", href: "/gallery" },
  { title: "Events", href: "/events" },
  { title: "Books", href: "/books" },
  { title: "Blogs", href: "/blogs" },
  { title: "Tribute & Article", href: "/tribute" },
  { title: "Contact", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full bg-background/98 backdrop-blur-sm border-b border-border/50">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <span className="font-display text-xl md:text-2xl font-semibold text-foreground leading-tight tracking-wide">
              Jambuvijayji Maharaj
            </span>
            <span className="text-xs text-muted-foreground tracking-widest uppercase">
              Memorial
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navigationItems.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "px-4 py-2 text-sm font-medium transition-colors hover:text-primary",
                location.pathname === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px]">
            <nav className="flex flex-col gap-2 mt-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "px-4 py-3 text-base font-medium rounded-lg transition-colors",
                    location.pathname === item.href
                      ? "text-primary bg-secondary"
                      : "text-foreground hover:bg-secondary"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}