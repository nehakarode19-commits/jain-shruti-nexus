import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, GraduationCap, Scroll, ArrowRight, Image, ChevronDown } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";
import { useCMSContent } from "@/hooks/useCMSContent";

export function HeroSection() {
  const cmsContent = useCMSContent();
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Using actual Gurudev images for hero backdrop
  const leftBackdropImage = "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg";
  const rightBackdropImage = "https://siddhijambuparivar.com/wp-content/uploads/2022/11/43-min.jpg";

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Hero Background with Gurudev images on sides - inspired by reference site */}
      <div className="absolute inset-0">
        {/* Base gradient - slate blue like reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#2B3A4A] via-[#3A4D5E] to-[#4A6070]" />
        
        {/* Left Gurudev image - faded */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url(${leftBackdropImage})` }}
        />
        
        {/* Right Gurudev image - faded */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-1/3 bg-cover bg-center opacity-30 mix-blend-luminosity"
          style={{ backgroundImage: `url(${rightBackdropImage})` }}
        />
        
        {/* Center gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2B3A4A]/90 via-[#3A4D5E]/70 to-[#2B3A4A]/90" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left">
            <div className="space-y-3">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
                {gurudevBio.hindiName}
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 font-medium">
                Gurudev Muni Jambuvijayji Maharaj Saheb
              </p>
              <p className="text-white/70">
                {gurudevBio.birthYear} – {gurudevBio.deathYear}
              </p>
            </div>

            <p className="font-body text-lg text-white/80 max-w-xl mx-auto lg:mx-0">
              {cmsContent.heroDescription}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Button 
                size="xl" 
                asChild 
                className="bg-[#4A6FA5] hover:bg-[#5A7FB5] text-white shadow-lg"
              >
                <Link to="/guruvani">
                  <Scroll className="h-5 w-5" />
                  Explore Guruvani
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild 
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/research">
                  <Search className="h-5 w-5" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 pt-4 justify-center lg:justify-start">
              {[
                { icon: BookOpen, label: "Library", href: "/library" },
                { icon: GraduationCap, label: "Scholars", href: "/scholars" },
                { icon: Image, label: "Photo Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 text-white/70 hover:text-white transition-all group"
                >
                  <item.icon className="h-4 w-4" />
                  <span className="font-medium">{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Visual - Gurudev's Photo */}
          <div className="relative flex justify-center">
            <div className="relative max-w-md">
              {/* Main Gurudev Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Jambuvijayji Maharaj Saheb in white robes sitting cross-legged"
                  className="w-full h-auto object-cover"
                />
              </div>

              {/* Centenary Logo - floating */}
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full shadow-xl overflow-hidden border-4 border-white/20 bg-white">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        >
          <span className="font-body text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
