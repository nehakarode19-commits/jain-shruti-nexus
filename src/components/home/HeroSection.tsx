import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, GraduationCap, Scroll, ArrowRight, Image, ChevronDown, Star, Shield, Sparkles } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";
import { useCMSContent } from "@/hooks/useCMSContent";

export function HeroSection() {
  const cmsContent = useCMSContent();
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const leftBackdropImage = "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg";
  const rightBackdropImage = "https://siddhijambuparivar.com/wp-content/uploads/2022/11/43-min.jpg";

  const keyBenefits = [
    { icon: Scroll, text: "Sacred Guruvani" },
    { icon: BookOpen, text: "5000+ Digital Texts" },
    { icon: Shield, text: "Authentic Sources" },
  ];

  return (
    <section className="relative overflow-hidden min-h-[95vh] flex items-center">
      {/* Multi-layer Background for Depth */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#1F2E3A] via-[#2B3A4A] to-[#3A4D5E]" />
        
        {/* Radial glow overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(74,111,165,0.3)_0%,_transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(74,111,165,0.2)_0%,_transparent_50%)]" />
        
        {/* Left Gurudev image - with blur for depth */}
        <div 
          className="absolute left-0 top-0 bottom-0 w-2/5 bg-cover bg-center opacity-20 mix-blend-luminosity blur-[1px]"
          style={{ backgroundImage: `url(${leftBackdropImage})` }}
        />
        
        {/* Right Gurudev image - with blur for depth */}
        <div 
          className="absolute right-0 top-0 bottom-0 w-2/5 bg-cover bg-center opacity-20 mix-blend-luminosity blur-[1px]"
          style={{ backgroundImage: `url(${rightBackdropImage})` }}
        />
        
        {/* Center gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1F2E3A]/95 via-[#2B3A4A]/80 to-[#1F2E3A]/95" />
        
        {/* Floating decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 border border-white/5 rounded-full animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-40 right-20 w-48 h-48 border border-white/5 rounded-full animate-pulse" style={{ animationDuration: '6s' }} />
        <div className="absolute top-1/2 left-10 w-32 h-32 bg-[#4A6FA5]/5 rounded-full blur-2xl" />
        <div className="absolute top-1/3 right-1/4 w-40 h-40 bg-[#4A6FA5]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 animate-fade-up">
              <Sparkles className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-white/80">Preserving 2500+ Years of Jain Wisdom</span>
            </div>

            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight">
                {gurudevBio.hindiName}
              </h1>
              <p className="text-xl sm:text-2xl text-white/90 font-medium">
                Gurudev Muni Jambuvijayji Maharaj Saheb
              </p>
              <p className="text-white/60">
                {gurudevBio.birthYear} – {gurudevBio.deathYear}
              </p>
            </div>

            <p className="font-body text-lg text-white/75 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: '200ms' }}>
              {cmsContent.heroDescription}
            </p>

            {/* Key Benefits Pills */}
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '300ms' }}>
              {keyBenefits.map((benefit, index) => (
                <div 
                  key={benefit.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10"
                >
                  <benefit.icon className="h-4 w-4 text-[#4A6FA5]" />
                  <span className="text-sm text-white/80">{benefit.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              <Button 
                size="xl" 
                asChild 
                className="bg-[#4A6FA5] hover:bg-[#5A7FB5] text-white shadow-lg shadow-[#4A6FA5]/20 group"
              >
                <Link to="/guruvani">
                  <Scroll className="h-5 w-5" />
                  Explore Guruvani
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild 
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
              >
                <Link to="/research">
                  <Search className="h-5 w-5" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-8 pt-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '500ms' }}>
              {[
                { icon: BookOpen, label: "Library", href: "/library" },
                { icon: GraduationCap, label: "Scholars", href: "/scholars" },
                { icon: Image, label: "Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 text-white/60 hover:text-white transition-all group"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <item.icon className="h-4 w-4" />
                  </div>
                  <span className="font-medium">{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Visual - Enhanced with depth */}
          <div className="relative flex justify-center animate-fade-up" style={{ animationDelay: '300ms' }}>
            <div className="relative max-w-md">
              {/* Glow effect behind image */}
              <div className="absolute -inset-8 bg-[#4A6FA5]/20 rounded-[3rem] blur-3xl" />
              
              {/* Main Gurudev Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/30 ring-1 ring-white/10">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Jambuvijayji Maharaj Saheb in white robes sitting cross-legged"
                  className="w-full h-auto object-cover"
                />
                {/* Subtle gradient overlay on image */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/30 to-transparent" />
              </div>

              {/* Centenary Logo - with enhanced styling */}
              <div className="absolute -top-4 -right-4 w-28 h-28 rounded-full shadow-xl overflow-hidden border-4 border-white/20 bg-white ring-4 ring-white/10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating stat badge */}
              <div className="absolute -bottom-4 -left-4 px-5 py-3 rounded-2xl bg-white shadow-xl border border-[#DCE3E7]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center">
                    <Star className="h-5 w-5 text-[#4A6FA5]" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-[#2B3A4A]">50+</p>
                    <p className="text-xs text-[#555555]">Years of Research</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer group"
        >
          <span className="font-body text-sm font-medium">Scroll to explore</span>
          <div className="w-6 h-10 rounded-full border-2 border-current flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-current rounded-full animate-bounce" />
          </div>
        </button>
      </div>
    </section>
  );
}
