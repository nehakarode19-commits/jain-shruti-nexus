import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, GraduationCap, Scroll, Sparkles, ArrowRight, Image } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-hero lotus-pattern">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-burgundy/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Preserving Ancient Wisdom</span>
            </div>

            <div className="space-y-4">
              <p className="text-primary font-display text-lg">
                {gurudevBio.hindiName}
              </p>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Jain Knowledge &{" "}
                <span className="text-gradient-gold">Research Ecosystem</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb ({gurudevBio.birthYear}–{gurudevBio.deathYear}). 
                Discover sacred texts, research tools, and a community dedicated 
                to preserving Jain philosophy.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/guruvani">
                  <Scroll className="h-5 w-5" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild>
                <Link to="/research">
                  <Search className="h-5 w-5" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 pt-4">
              {[
                { icon: BookOpen, label: "Library", href: "/library" },
                { icon: GraduationCap, label: "Scholars", href: "/scholars" },
                { icon: Image, label: "Photo Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Visual - Gurudev's Photo */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute -inset-4 rounded-2xl border border-primary/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-2xl border border-gold/20" />
              
              {/* Gurudev's Image */}
              <div className="relative rounded-2xl bg-gradient-to-br from-secondary via-card to-cream shadow-elevated overflow-hidden">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Jambuvijayji Maharaj Saheb in white robes sitting cross-legged"
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Gurudev Muni Jambuvijayji
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Maharaj Saheb ({gurudevBio.birthYear}–{gurudevBio.deathYear})
                  </p>
                </div>
              </div>

              {/* Centenary Logo */}
              <div className="absolute -top-4 -right-4 animate-float">
                <div className="w-24 h-24 rounded-full bg-card shadow-soft overflow-hidden border-2 border-gold/30">
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -bottom-4 -left-4 animate-float delay-300">
                <div className="w-14 h-14 rounded-xl bg-card shadow-soft flex items-center justify-center border border-primary/20">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-6 animate-float delay-500">
                <div className="w-12 h-12 rounded-xl bg-card shadow-soft flex items-center justify-center border border-burgundy/20">
                  <GraduationCap className="h-6 w-6 text-burgundy" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
