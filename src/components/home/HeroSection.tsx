import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked, Camera } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Subtle cross/diamond pattern background */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 0L22 18L40 20L22 22L20 40L18 22L0 20L18 18L20 0Z' fill='%23C4B89B' fill-opacity='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'rgba(255,255,255,0.5)', border: '1px solid #D4C5B0' }}>
              <Sparkles className="h-4 w-4" style={{ color: '#C9A227' }} />
              <span className="text-sm font-medium" style={{ color: '#7A6F5D', fontFamily: 'Inter, sans-serif' }}>Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-lg font-medium" style={{ color: '#C9A227', fontFamily: 'Inter, sans-serif' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" style={{ color: '#2D2A26', fontFamily: 'Playfair Display, serif' }}>
                Jain Knowledge &
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight" style={{ color: '#D4A03C', fontFamily: 'Playfair Display, serif' }}>
                Research Ecosystem
              </h1>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg max-w-xl leading-relaxed" style={{ color: '#5A5650', fontFamily: 'Inter, sans-serif' }}>
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="text-white px-8 py-6 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                style={{ backgroundColor: '#D4A03C', fontFamily: 'Inter, sans-serif' }}
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
                className="px-8 py-6 text-base font-medium rounded-lg bg-white hover:bg-gray-50 transition-all"
                style={{ borderColor: '#E5E0D5', color: '#2D2A26', fontFamily: 'Inter, sans-serif' }}
                asChild 
              >
                <Link to="/research">
                  <Search className="h-5 w-5 mr-2" />
                  Research Tools
                </Link>
              </Button>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-8 pt-4">
              <Link
                to="/library"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ color: '#6B6B6B', fontFamily: 'Inter, sans-serif' }}
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
              <div className="relative rounded-2xl overflow-hidden shadow-xl p-5" style={{ backgroundColor: '#FFFFFF' }}>
                {/* Centenary Logo Badge */}
                <div className="absolute top-3 right-3 w-20 h-20 lg:w-24 lg:h-24 rounded-full shadow-lg overflow-hidden z-10" style={{ backgroundColor: '#0D9488', border: '4px solid #FFFFFF' }}>
                  <img 
                    src={gurudevBio.centenaryLogo}
                    alt="100th Anniversary"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Camera/Gallery icon on right */}
                <div className="absolute right-[-24px] top-1/2 -translate-y-1/2 w-12 h-12 rounded-full shadow-md flex items-center justify-center z-10" style={{ backgroundColor: '#FFFFFF' }}>
                  <Camera className="h-5 w-5" style={{ color: '#D4A03C' }} />
                </div>

                {/* Main Image */}
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-xl"
                />

                {/* Name Badge at bottom */}
                <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-4 px-5 py-4 rounded-xl shadow-lg" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#FFF8E7' }}>
                    <BookOpen className="h-6 w-6" style={{ color: '#D4A03C' }} />
                  </div>
                  <div>
                    <p className="font-semibold text-base" style={{ color: '#2D2A26', fontFamily: 'Inter, sans-serif' }}>Gurudev Muni Jambuvijayji</p>
                    <p className="text-sm" style={{ color: '#8B8B8B', fontFamily: 'Inter, sans-serif' }}>Maharaj Saheb (1923–2009)</p>
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
