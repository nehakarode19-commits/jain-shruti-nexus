import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, ChevronDown, GraduationCap, Image, BookMarked, Mail } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";
import { useCMSContent } from "@/hooks/useCMSContent";

export function HeroSection() {
  const cmsContent = useCMSContent();
  
  const scrollToFeatures = () => {
    const featuresSection = document.querySelector('section:nth-of-type(2)');
    featuresSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-[#F8F5EF]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(30,53,87,0.03) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />
      
      {/* Soft gradient overlays */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(244,180,0,0.06)_0%,_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(74,111,165,0.04)_0%,_transparent_50%)]" />

      <div className="container mx-auto px-6 py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Content */}
          <div className="space-y-6 text-center lg:text-left order-2 lg:order-1">
            {/* Trust badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E0D8] shadow-sm animate-fade-up">
              <Sparkles className="h-4 w-4 text-[#F4B400]" />
              <span className="text-sm text-[#555555] font-medium">Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-[#1E3557]/70 text-base lg:text-lg font-medium animate-fade-up" style={{ animationDelay: '50ms' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            <div className="space-y-4 animate-fade-up" style={{ animationDelay: '100ms' }}>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-tight">
                <span className="text-[#1E3557]">Jain Knowledge &</span>
                <br />
                <span className="text-[#F4B400]">Research Ecosystem</span>
              </h1>
              <p className="text-base lg:text-lg text-[#555555] max-w-xl leading-relaxed">
                Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '200ms' }}>
              <Button 
                size="lg" 
                asChild 
                className="bg-[#F4B400] hover:bg-[#E5A800] text-[#1E3557] shadow-lg shadow-[#F4B400]/20 font-semibold px-8"
              >
                <Link to="/guruvani">
                  <BookMarked className="h-4 w-4 mr-2" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild 
                className="border-[#1E3557] text-[#1E3557] hover:bg-[#1E3557] hover:text-white bg-white px-8"
              >
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 lg:gap-8 pt-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: '300ms' }}>
              <Link
                to="/library"
                className="flex items-center gap-2 text-[#555555] hover:text-[#1E3557] transition-colors text-sm"
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 text-[#555555] hover:text-[#1E3557] transition-colors text-sm"
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 text-[#555555] hover:text-[#1E3557] transition-colors text-sm"
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2 animate-fade-up" style={{ animationDelay: '150ms' }}>
            <div className="relative">
              {/* Card frame with Gurudev image */}
              <div className="relative bg-white rounded-3xl p-4 shadow-xl border border-[#E5E0D8]">
                {/* Small floating icon - top left */}
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center border border-[#E5E0D8]">
                  <BookMarked className="h-4 w-4 text-[#1E3557]" />
                </div>
                
                {/* Small floating icon - right side */}
                <div className="absolute top-1/3 -right-4 w-10 h-10 bg-[#F4B400]/10 rounded-full shadow-md flex items-center justify-center border border-[#F4B400]/20">
                  <Mail className="h-4 w-4 text-[#F4B400]" />
                </div>

                {/* Main Gurudev Image */}
                <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#F8F5EF] to-white">
                  <img 
                    src={gurudevBio.mainImage}
                    alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                    className="w-full max-w-sm h-auto object-contain"
                  />
                </div>

                {/* Name Badge inside card */}
                <div className="text-center pt-4 pb-2">
                  <p className="text-[#1E3557] font-semibold text-lg">Gurudev Muni Jambuvijayji</p>
                  <p className="text-sm text-[#555555]">Maharaj Saheb (1923–2009)</p>
                </div>
              </div>

              {/* Centenary Logo Badge */}
              <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 rounded-full shadow-xl overflow-hidden border-4 border-white bg-white">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating book icon - bottom left */}
              <div className="absolute -bottom-2 -left-6 w-12 h-12 bg-[#F4B400] rounded-xl shadow-lg flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <button 
          onClick={scrollToFeatures}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-[#555555] hover:text-[#1E3557] transition-colors cursor-pointer group"
        >
          <span className="text-xs font-medium">Scroll to explore</span>
          <ChevronDown className="h-4 w-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
