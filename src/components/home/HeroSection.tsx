import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Quote, ArrowRight, ChevronDown } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: '#FDF8F3' }}>
      {/* Decorative curved shape */}
      <div 
        className="absolute right-0 top-0 bottom-0 w-[60%] hidden lg:block"
        style={{
          background: 'linear-gradient(145deg, #F5EBE0 0%, #EDE4D9 50%, #E8DFD4 100%)',
          borderRadius: '0 0 0 50%',
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-4 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(232, 138, 26, 0.1)', border: '1px solid rgba(232, 138, 26, 0.2)' }}>
              <Sparkles className="h-4 w-4" style={{ color: '#E88A1A' }} />
              <span className="text-sm font-medium font-body" style={{ color: '#E88A1A' }}>Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-sm font-body" style={{ color: '#666666' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-0">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.25rem] font-bold leading-[1.1] tracking-tight">
                <span style={{ color: '#1E3A5F' }}>Jain Knowledge &</span>
                <br />
                <span style={{ color: '#E88A1A' }}>Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-[15px] max-w-lg leading-relaxed font-body" style={{ color: '#666666' }}>
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                size="lg" 
                className="text-white px-6 h-11 text-sm font-medium rounded-lg shadow-md font-body"
                style={{ backgroundColor: '#E88A1A' }}
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
                className="px-6 h-11 text-sm font-medium rounded-lg font-body"
                style={{ borderColor: '#E5E0D5', color: '#1E3A5F' }}
                asChild 
              >
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-5 pt-1">
              <Link
                to="/library"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#666666' }}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#666666' }}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#666666' }}
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>

            {/* Quote section */}
            <div className="pt-3 max-w-md">
              <div className="flex gap-4 p-4 rounded-xl shadow-sm" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E0D5' }}>
                <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 138, 26, 0.1)' }}>
                  <Quote className="h-4 w-4" style={{ color: '#E88A1A' }} />
                </div>
                <div>
                  <p className="text-sm leading-relaxed italic font-body" style={{ color: '#666666' }}>
                    "The pursuit of knowledge is the path to liberation. Through study and contemplation, we understand the essence of existence."
                  </p>
                  <p className="text-xs mt-2 font-medium font-body" style={{ color: '#999999' }}>— Gurudev Muni Jambuvijayji</p>
                </div>
              </div>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Centenary Logo Badge */}
              <div className="absolute -top-2 right-4 lg:right-8 w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg overflow-hidden border-2 z-10" style={{ borderColor: '#FFFFFF', backgroundColor: '#FFFFFF' }}>
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="100th Anniversary"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Main Image Container */}
              <div className="relative p-4">
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-xs lg:max-w-sm h-auto object-contain"
                />
              </div>

              {/* Name Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl shadow-md text-center min-w-[220px]" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E0D5' }}>
                <p className="font-semibold text-sm font-body" style={{ color: '#1E3A5F' }}>Gurudev Muni Jambuvijayji</p>
                <p className="text-xs mt-0.5 font-body" style={{ color: '#999999' }}>Maharaj Saheb (1923–2009)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2">
          <ChevronDown className="h-5 w-5 animate-bounce" style={{ color: '#CCCCCC' }} />
        </div>
      </div>
    </section>
  );
}
