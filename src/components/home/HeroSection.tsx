import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Quote, ArrowRight } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-background">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary) / 0.03) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
              <Sparkles className="h-4 w-4 text-orange" />
              <span className="text-sm text-orange font-medium">Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-muted-foreground text-base font-medium">
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-2">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1]">
                <span className="text-primary">Jain Knowledge &</span>
                <br />
                <span className="text-orange">Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base text-muted-foreground max-w-lg leading-relaxed">
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="bg-orange hover:bg-orange/90 text-white px-6 py-3 text-base font-medium rounded-lg"
                asChild 
              >
                <Link to="/guruvani">
                  <BookMarked className="h-5 w-5 mr-2" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-primary/30 text-primary hover:bg-primary/5 px-6 py-3 text-base font-medium rounded-lg"
                asChild 
              >
                <Link to="/research">
                  <Search className="h-5 w-5 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 pt-4">
              <Link
                to="/library"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm"
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>

            {/* Quote section */}
            <div className="pt-6 max-w-lg">
              <div className="flex gap-4 p-4 bg-card rounded-xl border border-border">
                <div className="flex-shrink-0 w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic">
                    "The pursuit of knowledge is the path to liberation. Through study and contemplation, we understand the essence of existence."
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2 font-medium">— Gurudev Muni Jambuvijayji</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Centenary Logo Badge - top right */}
              <div className="absolute -top-4 right-0 lg:right-4 w-16 h-16 lg:w-20 lg:h-20 rounded-full shadow-lg overflow-hidden border-2 border-card bg-card z-10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-b from-orange/5 to-orange/10 rounded-3xl overflow-hidden p-4">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-card px-6 py-3 rounded-xl shadow-lg border border-border text-center min-w-[240px]">
                <p className="text-primary font-semibold text-base">Gurudev Muni Jambuvijayji</p>
                <p className="text-xs text-muted-foreground mt-1">Maharaj Saheb (1923–2009)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
