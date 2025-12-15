import { Link } from "react-router-dom";
import { Scroll, Mail, MapPin, Phone } from "lucide-react";
import { SocialLinks } from "@/components/social/SocialLinks";

const quickLinks = [
  { title: "About Us", href: "/about" },
  { title: "Research", href: "/research" },
  { title: "Library", href: "/library" },
  { title: "Guruvani", href: "/guruvani" },
  { title: "Scholars", href: "/scholars" },
  { title: "Contact Us", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="bg-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-14 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          
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
                <span className="font-body text-sm text-background/60">
                  Jain Knowledge Ecosystem
                </span>
              </div>
            </Link>
            
            <p className="font-body text-background/70 leading-relaxed text-sm max-w-sm">
              Preserving and sharing the timeless wisdom of Jain philosophy through 
              Gurudev Muni Jambuvijayji's teachings, research tools, and scholarly resources.
            </p>

            {/* Social Links - Horizontal */}
            <div className="flex items-center gap-3 pt-2">
              <SocialLinks className="[&_a]:bg-primary/20 [&_a]:border-primary/30 [&_a:hover]:bg-primary [&_a:hover]:border-primary [&_svg]:text-background" />
            </div>
          </div>

          {/* Center Column - Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-6 text-base uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-4">
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

          {/* Right Column - Address */}
          <div>
            <h4 className="font-heading font-semibold text-background mb-6 text-base uppercase tracking-wide">
              Address
            </h4>
            <div className="space-y-5">
              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-background/80" />
                </div>
                <div className="font-body text-sm text-background/70 leading-relaxed">
                  <p>Muni Jambuvijayji Gyan Mandir,</p>
                  <p>Near Adani Shantigram Jain Temple,</p>
                  <p>Adani Shantigram Township,</p>
                  <p>Ahmedabad 382 421</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center shrink-0">
                  <Mail className="h-5 w-5 text-background/80" />
                </div>
                <a 
                  href="mailto:contact@jambushrusti.org" 
                  className="font-body text-sm text-background/70 hover:text-primary transition-colors"
                >
                  contact@jambushrusti.org
                </a>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full border border-background/20 flex items-center justify-center shrink-0">
                  <Phone className="h-5 w-5 text-background/80" />
                </div>
                <div className="font-body text-sm text-background/70 space-y-1">
                  <p>Contact: <a href="tel:+919825044911" className="hover:text-primary transition-colors">+91-98250 44911</a></p>
                  <p>Office: Mon - Sat: 10:00 AM - 6:00 PM</p>
                  <p>Visiting: Mon - Sat: 10:45 AM - 5:15 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-background/10">
        <div className="container mx-auto px-4 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-sm">
              <Link
                to="/privacy"
                className="font-body text-background/60 hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="font-body text-background/60 hover:text-primary transition-colors"
              >
                Terms and Conditions
              </Link>
            </div>
            <p className="font-body text-sm text-background/60 text-center sm:text-right">
              Copyright © {new Date().getFullYear()} Jambushrusti
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
