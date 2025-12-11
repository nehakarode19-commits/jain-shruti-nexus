import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Quote } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-gradient-to-br from-[#1E3557] via-[#1E3A5F] to-[#152744]">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />

      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Trust badge - orange background */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E88A1A]/20 border border-[#E88A1A]/40">
              <Sparkles className="h-3.5 w-3.5 text-[#F4B400]" />
              <span className="text-xs text-[#F4B400] font-medium">Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-white/80 text-sm font-medium">
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="font-heading text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.15]">
                <span className="text-white">Jain Knowledge &</span>
                <br />
                <span className="text-[#E88A1A]">Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-sm text-white/70 max-w-md leading-relaxed">
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                size="default" 
                asChild 
                className="bg-[#E88A1A] hover:bg-[#D47A10] text-white font-medium px-5 h-10 text-sm rounded-lg"
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
                className="border-white/40 text-white hover:bg-white/10 bg-transparent font-medium px-5 h-10 text-sm rounded-lg"
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
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
              >
                <BookOpen className="h-3.5 w-3.5" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
              >
                <GraduationCap className="h-3.5 w-3.5" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors text-xs"
              >
                <Image className="h-3.5 w-3.5" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>

            {/* Quote section */}
            <div className="pt-4 max-w-md">
              <div className="flex gap-3 p-3 bg-white/10 rounded-xl border border-white/20">
                <div className="flex-shrink-0 w-8 h-8 bg-[#E88A1A]/20 rounded-full flex items-center justify-center">
                  <Quote className="h-3.5 w-3.5 text-[#E88A1A]" />
                </div>
                <div>
                  <p className="text-xs text-white/80 leading-relaxed italic">
                    "The pursuit of knowledge is the path to liberation. Through study and contemplation, we understand the essence of existence."
                  </p>
                  <p className="text-[10px] text-white/50 mt-1">— Gurudev Muni Jambuvijayji</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Centenary Logo Badge - top right */}
              <div className="absolute -top-2 right-4 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg overflow-hidden border-2 border-[#E88A1A] bg-white z-10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative bg-gradient-to-b from-[#F8F5EF] to-[#EDE8DE] rounded-2xl overflow-hidden">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-xs lg:max-w-sm h-auto object-contain"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white px-4 py-2 rounded-lg shadow-md text-center min-w-[200px]">
                <p className="text-[#1E3A5F] font-semibold text-sm">Gurudev Muni Jambuvijayji</p>
                <p className="text-[10px] text-[#666666]">Maharaj Saheb (1923–2009)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
