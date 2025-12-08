import { Link } from "react-router-dom";
import { Scroll, Mail, MapPin, Phone, ExternalLink } from "lucide-react";

const footerLinks = {
  about: [
    { title: "About Jambushrusti", href: "/about" },
    { title: "Gurudev Muni Jambuvijayji", href: "/about/gurudev" },
    { title: "Gurudev Parivar", href: "/about/parivar" },
    { title: "Jambuji Gyan Kendra", href: "/about/gyan-kendra" },
  ],
  research: [
    { title: "Research Hub", href: "/research" },
    { title: "SodhSanchay", href: "/research/sodhsanchay" },
    { title: "SodhSandarbh", href: "/research/sodhsandarbh" },
    { title: "Śabdasaṅgraha", href: "/research/shabdasangraha" },
    { title: "Shastrasandarbha", href: "/research/shastrasandarbha" },
  ],
  community: [
    { title: "Events & Workshops", href: "/community/events" },
    { title: "Blog & Insights", href: "/community/blog" },
    { title: "News", href: "/community/news" },
    { title: "Scholar Portal", href: "/scholars" },
    { title: "Library", href: "/library" },
  ],
  legal: [
    { title: "Privacy Policy", href: "/privacy" },
    { title: "Terms of Service", href: "/terms" },
    { title: "Contact Us", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate border-t border-white/10">
      <div className="container mx-auto px-4 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-gold shadow-soft">
                <Scroll className="h-5 w-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold text-white">
                  Jambushrusti
                </span>
                <span className="text-xs text-white/60">
                  Jain Knowledge Ecosystem
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/70 max-w-sm mb-6">
              Preserving and sharing the timeless wisdom of Jain philosophy through 
              Gurudev Muni Jambuvijayji's teachings, research tools, and scholarly resources.
            </p>
            <div className="space-y-2 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Muni Jambuvijay Research Center, Shantigram</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <a href="mailto:contact@jambushrusti.org" className="hover:text-primary transition-colors">
                  contact@jambushrusti.org
                </a>
              </div>
            </div>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">About</h4>
            <ul className="space-y-2">
              {footerLinks.about.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Research Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Research</h4>
            <ul className="space-y-2">
              {footerLinks.research.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Community</h4>
            <ul className="space-y-2">
              {footerLinks.community.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-sm text-white/60 hover:text-primary transition-colors"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Jambushrusti. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {footerLinks.legal.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-xs text-white/50 hover:text-primary transition-colors"
              >
                {link.title}
              </Link>
            ))}
            <Link
              to="/admin"
              className="text-xs text-white/30 hover:text-white/50 transition-colors"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
