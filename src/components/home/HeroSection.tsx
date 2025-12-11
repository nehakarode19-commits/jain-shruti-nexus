import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";
import { useCMSContent } from "@/hooks/useCMSContent";

export function HeroSection() {
  const cmsContent = useCMSContent();
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-[#F8F5EF] via-[#FDF9F3] to-[#F5F0E8]">
      {/* Soft gradient overlay for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,180,0,0.08)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(74,111,165,0.05)_0%,_transparent_50%)]" />
      
      {/* Subtle decorative circles */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-[#4A6FA5]/5 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#F4B400]/10 rounded-full" />

      <div className="container mx-auto px-6 py-24 lg:py-32 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left order-2 lg:order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/80 backdrop-blur-sm border border-[#DCE3E7] shadow-sm animate-fade-up">
              <Sparkles className="h-4 w-4 text-[#F4B400]" />
              <span className="text-sm text-[#555555] font-medium">Preserving Jain Heritage & Knowledge</span>
            </div>

            <div className="space-y-3 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <p className="text-[#F4B400] font-semibold uppercase tracking-wider text-sm">
                Jain Knowledge & Research Ecosystem
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#1E3557] leading-tight">
                Jain Knowledge &<br />
                <span className="text-[#4A6FA5]">Research Ecosystem</span>
              </h1>
              <p className="text-lg text-[#555555] max-w-lg">
                Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and timeless wisdom of Jain philosophy.
              </p>
            </div>

            <p className="font-body text-[#555555] max-w-xl mx-auto lg:mx-0 animate-fade-up leading-relaxed" style={{ animationDelay: '200ms' }}>
              {cmsContent.heroDescription}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Button 
                size="xl" 
                asChild 
                className="bg-[#F4B400] hover:bg-[#E5A800] text-[#1E3557] shadow-lg shadow-[#F4B400]/20 group font-semibold"
              >
                <Link to="/guruvani">
                  Explore Guruvani
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild 
                className="border-[#1E3557] text-[#1E3557] hover:bg-[#1E3557] hover:text-white"
              >
                <Link to="/research">
                  <Search className="h-5 w-5 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-8 pt-6 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '400ms' }}>
              {[
                { icon: BookOpen, label: "Library", href: "/library" },
                { label: "Scholars", href: "/scholars" },
                { label: "Gallery", href: "/gallery" },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="flex items-center gap-2 text-[#555555] hover:text-[#1E3557] transition-all group text-sm"
                >
                  <span className="font-medium">{item.label}</span>
                  <ArrowRight className="h-3 w-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '200ms' }}>
            <div className="relative">
              {/* Soft glow behind image */}
              <div className="absolute -inset-8 bg-[#F4B400]/10 rounded-full blur-3xl" />
              
              {/* Main Gurudev Image */}
              <div className="relative">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
                />
              </div>

              {/* Centenary Logo Badge */}
              <div className="absolute -top-2 -right-2 w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl overflow-hidden border-4 border-white bg-white">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-6 py-3 rounded-xl shadow-lg border border-[#DCE3E7] text-center">
                <p className="text-[#1E3557] font-semibold text-sm">Gurudev Muni Jambuvijayji</p>
                <p className="text-xs text-[#555555]">Centenary Celebrations</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555555] hover:text-[#1E3557] transition-colors cursor-pointer group"
        >
          <span className="font-body text-sm font-medium">Scroll to explore</span>
          <ChevronDown className="h-5 w-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
