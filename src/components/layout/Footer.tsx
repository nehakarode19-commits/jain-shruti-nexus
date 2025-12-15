import { Link } from "react-router-dom";
import { Scroll, Mail, MapPin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SocialLinks } from "@/components/social/SocialLinks";

const footerLinks = {
  about: [
    { title: "About Jambushrusti", href: "/about" },
    { title: "Gurudev Muni Jambuvijayji", href: "/about/gurudev" },
    { title: "Legacy of Pujyapad Muni Jambuvijayaji Maharaj", href: "/about/parivar" },
    { title: "Muni Jambuvijayaji Research Center", href: "/about/gyan-kendra" },
    { title: "Photo Gallery", href: "/gallery" },
  ],
  research: [
    { title: "Research Hub", href: "/research" },
    { title: "SodhSanchay", href: "/research/sodhsanchay" },
    { title: "SodhSandarbh", href: "/research/sodhsandarbh" },
    { title: "Śabdasaṅgraha", href: "/research/shabdasangraha" },
    { title: "Shastrasandarbha", href: "/research/shastrasandarbha" },
  ],
  resources: [
    { title: "Library Catalog", href: "/library" },
    { title: "Guruvani", href: "/guruvani" },
    { title: "Books Collection", href: "/books" },
    { title: "Articles", href: "/articles" },
    { title: "Scholar Portal", href: "/scholars" },
  ],
  community: [
    { title: "Events & Workshops", href: "/community/events" },
    { title: "Blog & Insights", href: "/community/blog" },
    { title: "News Updates", href: "/community/news" },
    { title: "Visitor Feedback", href: "/feedback" },
    { title: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-gradient-to-b from-background to-secondary/30 border-t border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Left Column - Logo, Description & Social */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-gold shadow-soft">
                <Scroll className="h-6 w-6 text-primary-foreground" />
              </div>
              <div className="flex flex-col">
                <span className="font-heading text-xl font-bold text-foreground">
                  Jambushrusti
                </span>
                <span className="font-body text-sm text-muted-foreground">
                  Jain Knowledge Ecosystem
                </span>
              </div>
            </Link>
            
            <p className="font-body text-muted-foreground leading-relaxed text-sm">
              Preserving and sharing the timeless wisdom of Jain philosophy through 
              Gurudev Muni Jambuvijayji's teachings, research tools, and scholarly resources.
            </p>

            {/* Contact Info */}
            <div className="space-y-3 font-body text-sm">
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                <span>Muni Jambuvijayji Gyan Mandir, Adani Shantigram, Ahmedabad</span>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Mail className="h-4 w-4 text-primary shrink-0" />
                <a href="mailto:contact@jambushrusti.org" className="hover:text-primary transition-colors">
                  contact@jambushrusti.org
                </a>
              </div>
              <div className="flex items-center gap-3 text-muted-foreground">
                <Phone className="h-4 w-4 text-primary shrink-0" />
                <a href="tel:+919825044911" className="hover:text-primary transition-colors">
                  +91-98250 44911
                </a>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2">
              <p className="font-body text-sm text-muted-foreground mb-3">Follow Us</p>
              <SocialLinks />
            </div>
          </div>

          {/* Link Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* About */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-5">About</h4>
              <ul className="space-y-3">
                {footerLinks.about.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Research */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-5">Research</h4>
              <ul className="space-y-3">
                {footerLinks.research.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-5">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Community */}
            <div>
              <h4 className="font-heading font-semibold text-foreground mb-5">Community</h4>
              <ul className="space-y-3">
                {footerLinks.community.map((link) => (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Newsletter */}
              <div className="mt-6 p-4 rounded-xl bg-card border border-border">
                <h5 className="font-heading font-semibold text-foreground mb-2 text-sm">Newsletter</h5>
                <p className="font-body text-xs text-muted-foreground mb-3">
                  Get updates on events & research
                </p>
                <div className="flex gap-2">
                  <Input 
                    type="email" 
                    placeholder="Your email" 
                    className="h-9 text-sm"
                  />
                  <Button size="sm" className="h-9 px-3">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border bg-secondary/20">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-body text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} Jambushrusti. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy"
                className="font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy
              </Link>
              <span className="text-border">|</span>
              <Link
                to="/terms"
                className="font-body text-muted-foreground hover:text-primary transition-colors"
              >
                Terms
              </Link>
              <span className="text-border">|</span>
              <Link
                to="/admin"
                className="font-body text-muted-foreground/50 hover:text-muted-foreground transition-colors"
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
