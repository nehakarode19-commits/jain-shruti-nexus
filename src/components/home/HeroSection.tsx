import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Camera } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Subtle cross/diamond pattern background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z' fill='%23D4C5B0' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-8 py-10 lg:py-14 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full" style={{ backgroundColor: 'transparent', border: '1px solid #D4C5B0' }}>
              <Sparkles className="h-4 w-4" style={{ color: '#C9A227' }} />
              <span className="text-sm font-medium font-body" style={{ color: '#8B7355' }}>Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-base font-medium font-body" style={{ color: '#C9A227' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-0">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight">
                <span style={{ color: '#2D2D2D' }}>Jain Knowledge &</span>
                <br />
                <span style={{ color: '#D4A03C' }}>Research Ecosystem</span>
              </h1>
            </div>

            {/* Description */}
            <p className="text-base max-w-lg leading-relaxed font-body" style={{ color: '#6B6B6B' }}>
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="lg" 
                className="text-white px-8 h-12 text-sm font-medium rounded-lg font-body"
                style={{ backgroundColor: '#D4A03C' }}
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
                className="px-8 h-12 text-sm font-medium rounded-lg font-body bg-white"
                style={{ borderColor: '#E5E0D5', color: '#2D2D2D' }}
                asChild 
              >
                <Link to="/research">
                  <Search className="h-4 w-4 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-6 pt-3">
              <Link
                to="/library"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#6B6B6B' }}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#6B6B6B' }}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm font-body"
                style={{ color: '#6B6B6B' }}
              >
                <Image className="h-4 w-4" />
                <span className="font-medium">Photo Gallery</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-xl p-4" style={{ backgroundColor: '#FFFFFF' }}>
                {/* Centenary Logo Badge */}
                <div className="absolute top-4 right-4 w-16 h-16 lg:w-20 lg:h-20 rounded-full shadow-lg overflow-hidden z-10" style={{ backgroundColor: '#0D9488', border: '3px solid #FFFFFF' }}>
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Camera/Gallery icon on right */}
                <div className="absolute right-[-20px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full shadow-md flex items-center justify-center z-10" style={{ backgroundColor: '#FFFFFF' }}>
                  <Camera className="h-4 w-4" style={{ color: '#D4A03C' }} />
                </div>

                {/* Main Image */}
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-xl"
                />

                {/* Name Badge at bottom */}
                <div className="absolute -bottom-4 left-4 right-4 flex items-center gap-3 px-4 py-3 rounded-xl shadow-md" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF8E7' }}>
                    <BookOpen className="h-5 w-5" style={{ color: '#D4A03C' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm font-body" style={{ color: '#2D2D2D' }}>Gurudev Muni Jambuvijayji</p>
                    <p className="text-xs font-body" style={{ color: '#8B8B8B' }}>Maharaj Saheb (1923–2009)</p>
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
