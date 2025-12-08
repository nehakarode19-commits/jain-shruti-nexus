import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, GraduationCap, Scroll, Sparkles, ArrowRight } from "lucide-react";

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
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Jain Knowledge &{" "}
                <span className="text-gradient-gold">Research Ecosystem</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                Explore the profound teachings of Gurudev Muni Jambuvijayji. 
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
                { icon: Sparkles, label: "AI Search", href: "/research/shabdasangraha" },
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

          {/* Hero Visual */}
          <div className="relative animate-fade-up delay-200">
            <div className="relative aspect-square max-w-lg mx-auto">
              {/* Decorative rings */}
              <div className="absolute inset-0 rounded-full border border-primary/10 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-gold/20" />
              <div className="absolute inset-8 rounded-full border border-primary/10" />
              
              {/* Central image placeholder */}
              <div className="absolute inset-12 rounded-full bg-gradient-to-br from-secondary via-card to-cream shadow-elevated overflow-hidden flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-glow">
                    <Scroll className="h-12 w-12 text-primary-foreground" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    Gurudev Muni
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Jambuvijayji Maharaj
                  </p>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute top-8 right-8 animate-float">
                <div className="w-16 h-16 rounded-xl bg-card shadow-soft flex items-center justify-center border border-primary/20">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-12 left-4 animate-float delay-300">
                <div className="w-14 h-14 rounded-xl bg-card shadow-soft flex items-center justify-center border border-burgundy/20">
                  <GraduationCap className="h-7 w-7 text-burgundy" />
                </div>
              </div>
              <div className="absolute bottom-24 right-0 animate-float delay-500">
                <div className="w-12 h-12 rounded-xl bg-card shadow-soft flex items-center justify-center border border-gold/30">
                  <Sparkles className="h-6 w-6 text-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
