import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, GraduationCap, Scroll, Sparkles, ArrowRight, Image, ChevronDown } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";
import { FloatingElement, GlowOrb } from "@/components/ui/floating-elements";

export function HeroSection() {
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center bg-gradient-hero">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <GlowOrb color="primary" size="lg" className="-top-40 -right-40" />
        <GlowOrb color="burgundy" size="md" className="-bottom-40 -left-40" />
        <GlowOrb color="gold" size="xl" className="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-50" />
        
        {/* Animated gradient mesh */}
        <div className="absolute inset-0 animated-gradient opacity-30" />
        
        {/* Lotus pattern overlay */}
        <div className="absolute inset-0 lotus-pattern opacity-50" />
        
        {/* Floating particles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-24 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm animate-fade-up"
              style={{ animationDelay: "0ms" }}
            >
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-muted-foreground font-medium">Preserving Ancient Wisdom</span>
            </div>

            <div className="space-y-4">
              <p 
                className="text-primary font-display text-lg animate-fade-up"
                style={{ animationDelay: "100ms" }}
              >
                {gurudevBio.hindiName}
              </p>
              <h1 
                className="font-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight animate-fade-up"
                style={{ animationDelay: "200ms" }}
              >
                Jain Knowledge &{" "}
                <span className="text-gradient-gold relative">
                  Research Ecosystem
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-gold to-primary opacity-50 rounded-full" />
                </span>
              </h1>
              <p 
                className="text-lg text-muted-foreground max-w-lg animate-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb ({gurudevBio.birthYear}–{gurudevBio.deathYear}). 
                Discover sacred texts, research tools, and a community dedicated 
                to preserving Jain philosophy.
              </p>
            </div>

            <div 
              className="flex flex-wrap gap-4 animate-fade-up"
              style={{ animationDelay: "400ms" }}
            >
              <Button variant="hero" size="xl" asChild className="group shadow-glow">
                <Link to="/guruvani">
                  <Scroll className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  Explore Guruvani
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="glass" size="xl" asChild className="group">
                <Link to="/research">
                  <Search className="h-5 w-5" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div 
              className="flex flex-wrap gap-6 pt-4 animate-fade-up"
              style={{ animationDelay: "500ms" }}
            >
              {[
                { icon: BookOpen, label: "Library", href: "/library" },
                { icon: GraduationCap, label: "Scholars", href: "/scholars" },
                { icon: Image, label: "Photo Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-all group px-3 py-2 rounded-lg hover:bg-primary/5"
                >
                  <item.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Visual - Gurudev's Photo */}
          <div 
            className="relative animate-fade-up lg:animate-slide-left"
            style={{ animationDelay: "300ms" }}
          >
            <div className="relative max-w-lg mx-auto">
              {/* Decorative animated rings */}
              <div className="absolute -inset-4 rounded-3xl border border-primary/10 animate-pulse" />
              <div className="absolute -inset-8 rounded-3xl border border-gold/10 animate-pulse" style={{ animationDelay: "0.5s" }} />
              <div className="absolute -inset-12 rounded-3xl border border-primary/5 animate-pulse" style={{ animationDelay: "1s" }} />
              
              {/* Gurudev's Image with glass effect */}
              <div className="relative rounded-3xl glass-premium overflow-hidden shadow-elevated group">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Jambuvijayji Maharaj Saheb in white robes sitting cross-legged"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                {/* Overlay with name */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/70 to-transparent p-6">
                  <h3 className="font-display text-xl font-semibold text-foreground">
                    Gurudev Muni Jambuvijayji
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Maharaj Saheb ({gurudevBio.birthYear}–{gurudevBio.deathYear})
                  </p>
                </div>
              </div>

              {/* Centenary Logo */}
              <FloatingElement delay={0} className="absolute -top-6 -right-6">
                <div className="w-28 h-28 rounded-full glass-premium shadow-elevated overflow-hidden border-2 border-gold/30 hover:scale-110 transition-transform cursor-pointer">
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary Logo"
                    className="w-full h-full object-cover"
                  />
                </div>
              </FloatingElement>

              {/* Floating elements */}
              <FloatingElement delay={0.5} className="absolute -bottom-6 -left-6">
                <div className="w-16 h-16 rounded-2xl glass-glow flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
              </FloatingElement>
              <FloatingElement delay={1} className="absolute top-1/2 -right-8">
                <div className="w-14 h-14 rounded-2xl glass-glow flex items-center justify-center hover:scale-110 transition-transform cursor-pointer">
                  <GraduationCap className="h-7 w-7 text-burgundy" />
                </div>
              </FloatingElement>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors animate-bounce-soft cursor-pointer"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ChevronDown className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}
