import { Link } from "react-router-dom";
import { Scroll, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLinks } from "@/components/social/SocialLinks";

const quickLinks = [
  { title: "About Jambushrusti", href: "/about" },
  { title: "Gurudev Muni Jambuvijayji", href: "/about/gurudev" },
  { title: "Research Hub", href: "/research" },
  { title: "Library Catalog", href: "/library" },
  { title: "Guruvani", href: "/guruvani" },
  { title: "Books Collection", href: "/books" },
  { title: "Scholar Portal", href: "/scholars" },
];

const resourceLinks = [
  { title: "SodhSanchay", href: "/research/sodhsanchay" },
  { title: "SodhSandarbh", href: "/research/sodhsandarbh" },
  { title: "Śabdasaṅgraha", href: "/research/shabdasangraha" },
  { title: "Articles", href: "/articles" },
  { title: "Events & Workshops", href: "/community/events" },
  { title: "Blog & Insights", href: "/community/blog" },
  { title: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
          
          {/* Left Column - Logo, Description & Social */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-lg">
                <Scroll className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-background">
                  Jambushrusti
                </span>
                <span className="font-body text-sm text-background/70">
                  Jain Knowledge Ecosystem
                </span>
              </div>
            </Link>
            
            <p className="font-body text-background/80 leading-relaxed text-sm">
              Preserving and sharing the timeless wisdom of Jain philosophy through 
              Gurudev Muni Jambuvijayji's teachings, research tools, and scholarly resources.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-start gap-3 text-background/80">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Muni Jambuvijayji Gyan Mandir, Adani Shantigram, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:contact@jambushrusti.org" className="hover:text-primary transition-colors">
                  contact@jambushrusti.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-background/80">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+919825044911" className="hover:text-primary transition-colors">
                  +91-98250 44911
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="font-body text-sm text-background/60 mb-3">Follow Us</p>
              <SocialLinks className="[&_a]:bg-background/10 [&_a]:border-background/20 [&_a:hover]:bg-primary [&_a:hover]:border-primary [&_svg]:text-background" />
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div className="lg:text-center">
            <h4 className="font-heading font-semibold text-background mb-6 text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column - Resources & Newsletter */}
          <div className="space-y-8">
            <div>
              <h4 className="font-heading font-semibold text-background mb-6 text-lg">Resources</h4>
              <ul className="space-y-3">
                {resourceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="p-5 rounded-xl bg-background/10 border border-background/20">
              <h5 className="font-heading font-semibold text-background mb-2">Stay Updated</h5>
              <p className="font-body text-xs text-background/60 mb-4">
                Subscribe for updates on events & research
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="h-10 text-sm bg-background/10 border-background/30 text-background placeholder:text-background/50 focus:border-primary"
                />
                <Button size="sm" className="h-10 px-4 bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/20">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-background/60 text-center sm:text-left">
              © {new Date().getFullYear()} Jambushrusti. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy"
                className="font-body text-background/60 hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <span className="text-background/30">|</span>
              <Link
                to="/terms"
                className="font-body text-background/60 hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <span className="text-background/30">|</span>
              <Link
                to="/admin"
                className="font-body text-background/40 hover:text-background/60 transition-colors"
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
