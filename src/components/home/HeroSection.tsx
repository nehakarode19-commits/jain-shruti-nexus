import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Award } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-hero">
      {/* Lotus Pattern Background */}
      <div 
        className="absolute inset-0 bg-lotus-pattern bg-[length:340px] bg-repeat opacity-[0.04]"
      />

      {/* Floating animated elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-2 h-2 bg-primary/30 rounded-full animate-float" style={{ animationDelay: '0s', animationDuration: '6s' }} />
        <div className="absolute top-[40%] left-[5%] w-1.5 h-1.5 bg-primary/20 rounded-full animate-float" style={{ animationDelay: '1s', animationDuration: '8s' }} />
        <div className="absolute top-[60%] left-[15%] w-1 h-1 bg-gold-light/30 rounded-full animate-float" style={{ animationDelay: '2s', animationDuration: '7s' }} />
        <div className="absolute top-[30%] right-[8%] w-2 h-2 bg-primary/25 rounded-full animate-float" style={{ animationDelay: '0.5s', animationDuration: '5s' }} />
        <div className="absolute top-[70%] right-[12%] w-1.5 h-1.5 bg-gold-light/20 rounded-full animate-float" style={{ animationDelay: '1.5s', animationDuration: '9s' }} />
      </div>
      
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Badge Chip */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/60 border border-primary/20 text-sm animate-fade-up"
              style={{ animationDelay: '0ms' }}
            >
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-medium text-muted-foreground font-body">Preserving Ancient Wisdom</span>
            </div>

            {/* Sanskrit Line */}
            <p 
              className="text-lg font-medium text-primary font-body animate-fade-up"
              style={{ animationDelay: '100ms' }}
            >
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main H1 Title */}
            <div 
              className="space-y-1 animate-fade-up"
              style={{ animationDelay: '200ms' }}
            >
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Jain Knowledge &
              </h1>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-transparent bg-gradient-gold bg-clip-text">
                Research Ecosystem
              </h1>
            </div>

            {/* Sub Paragraph */}
            <p 
              className="text-lg text-muted-foreground max-w-lg font-body animate-fade-up"
              style={{ animationDelay: '300ms' }}
            >
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div 
              className="flex flex-wrap gap-4 pt-2 animate-fade-up"
              style={{ animationDelay: '400ms' }}
            >
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground h-14 px-10 rounded-xl shadow-md hover:shadow-lg hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300 font-body"
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
                className="border border-border bg-transparent h-14 rounded-xl px-10 hover:bg-white/60 transition-all duration-300 font-body"
                asChild 
              >
                <Link to="/research">
                  <Search className="h-5 w-5 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Mini Footer Links */}
            <div 
              className="flex flex-wrap gap-8 pt-4 animate-fade-up"
              style={{ animationDelay: '500ms' }}
            >
              <Link
                to="/library"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-muted-foreground font-body"
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-muted-foreground font-body"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-muted-foreground font-body"
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>
          </div>

          {/* Right Column - Portrait Card */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Floating decorative icons */}
              <div 
                className="absolute -top-4 -right-4 w-16 h-16 rounded-full bg-teal-600 shadow-elevated flex items-center justify-center z-20 animate-float"
                style={{ animationDelay: '200ms' }}
              >
                <span className="text-white font-bold text-xs text-center leading-tight font-body">100<br/>Years</span>
              </div>
              
              <div 
                className="absolute top-1/4 -left-6 w-12 h-12 rounded-xl bg-card shadow-soft flex items-center justify-center z-20 animate-float"
                style={{ animationDelay: '300ms' }}
              >
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              
              <div 
                className="absolute bottom-1/3 -right-6 w-12 h-12 rounded-xl bg-card shadow-soft flex items-center justify-center z-20 animate-float"
                style={{ animationDelay: '500ms' }}
              >
                <GraduationCap className="h-5 w-5 text-primary" />
              </div>

              {/* Main Portrait Card */}
              <div className="relative rounded-2xl bg-gradient-to-br from-white/60 via-card to-cream shadow-elevated overflow-hidden border-[1.5px] border-gold/20 p-5">
                {/* Centenary Logo Badge */}
                <div className="absolute top-3 right-3 w-20 h-20 lg:w-24 lg:h-24 rounded-full shadow-lg overflow-hidden z-10 bg-teal-600 border-4 border-white">
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Main Image */}
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-xl"
                />

                {/* Bottom Overlay with Info */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent p-6">
                  <div className="flex items-center gap-4 px-4 py-3 rounded-xl shadow-soft bg-card">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gold/10">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-base text-foreground font-body">Gurudev Muni Jambuvijayji</p>
                      <p className="text-sm text-muted-foreground font-body">Maharaj Saheb (1923–2009)</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}