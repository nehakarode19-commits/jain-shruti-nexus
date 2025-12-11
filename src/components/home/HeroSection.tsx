import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Quote } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.04) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/15 border border-accent/30">
              <Sparkles className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs text-accent-foreground font-medium">Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-muted-foreground text-sm font-medium">
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15]">
                <span className="text-primary">Jain Knowledge &</span>
                <br />
                <span className="text-orange">Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                size="default" 
                variant="orange"
                asChild 
              >
                <Link to="/guruvani">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="default" 
                asChild 
              >
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-5 pt-3">
              <Link
                to="/library"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors text-xs"
              >
                <Image className="h-3.5 w-3.5" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>

            {/* Quote section */}
            <div className="pt-4 max-w-md">
              <div className="flex gap-3 p-3 bg-card/60 rounded-xl border border-border">
                <div className="flex-shrink-0 w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center">
                  <Quote className="h-3.5 w-3.5 text-orange" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-relaxed italic">
                    "The pursuit of knowledge is the path to liberation. Through study and contemplation, we understand the essence of existence."
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 mt-1">— Gurudev Muni Jambuvijayji</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Centenary Logo Badge - top right */}
              <div className="absolute -top-2 right-4 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg overflow-hidden border-2 border-card bg-card z-10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-warm rounded-2xl overflow-hidden">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-xs lg:max-w-sm h-auto object-contain"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-card px-4 py-2 rounded-lg shadow-md border border-border text-center min-w-[200px]">
                <p className="text-primary font-semibold text-sm">Gurudev Muni Jambuvijayji</p>
                <p className="text-[10px] text-muted-foreground">Maharaj Saheb (1923–2009)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
