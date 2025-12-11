import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Quote, ArrowRight } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center bg-background overflow-hidden">
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange/10 border border-orange/20">
              <Sparkles className="h-4 w-4 text-orange" />
              <span className="text-sm text-orange font-medium font-body">Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-muted-foreground text-sm font-body">
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.15] tracking-tight">
                <span className="text-primary">Jain Knowledge &</span>
                <br />
                <span className="text-orange">Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[15px] text-muted-foreground max-w-lg leading-relaxed font-body">
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                size="lg" 
                className="bg-orange hover:bg-orange/90 text-white px-6 h-11 text-sm font-medium rounded-lg shadow-md font-body"
                asChild 
              >
                <Link to="/guruvani">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border text-primary hover:bg-primary/5 px-6 h-11 text-sm font-medium rounded-lg font-body"
                asChild 
              >
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-5 pt-2">
              <Link
                to="/library"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors text-sm font-body"
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>

            {/* Quote section */}
            <div className="pt-4 max-w-md">
              <div className="flex gap-4 p-4 bg-card rounded-xl border border-border shadow-sm">
                <div className="flex-shrink-0 w-10 h-10 bg-orange/10 rounded-full flex items-center justify-center">
                  <Quote className="h-4 w-4 text-orange" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed italic font-body">
                    "The pursuit of knowledge is the path to liberation. Through study and contemplation, we understand the essence of existence."
                  </p>
                  <p className="text-xs text-muted-foreground/70 mt-2 font-medium font-body">— Gurudev Muni Jambuvijayji</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Centenary Logo Badge */}
              <div className="absolute -top-2 right-2 lg:right-6 w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg overflow-hidden border-2 border-card bg-card z-10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative rounded-2xl overflow-hidden p-4">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-xs lg:max-w-sm h-auto object-contain"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 bg-card px-5 py-2.5 rounded-xl shadow-md border border-border text-center min-w-[220px]">
                <p className="text-primary font-semibold text-sm font-body">Gurudev Muni Jambuvijayji</p>
                <p className="text-xs text-muted-foreground mt-0.5 font-body">Maharaj Saheb (1923–2009)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
