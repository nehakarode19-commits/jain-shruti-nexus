import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Sparkles, GraduationCap, Image, BookMarked } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#FAF7F2]">
      {/* Subtle cross/star pattern background - OLD pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0L32 28L60 30L32 32L30 60L28 32L0 30L28 28L30 0Z' fill='%23c9a86c' fill-opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-6 order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-[#D4C5B0]">
              <Sparkles className="h-4 w-4 text-[#C9A227]" />
              <span className="text-sm font-medium text-[#7A6F5D]" style={{ fontFamily: 'Inter, sans-serif' }}>Preserving Ancient Wisdom</span>
            </div>

            {/* Hindi subtitle */}
            <p className="text-lg font-medium text-[#C9A227]" style={{ fontFamily: 'Inter, sans-serif' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#2D2A26]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Jain Knowledge &
              </h1>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight text-[#D4A03C]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Research Ecosystem
              </h1>
            </div>

            {/* Description */}
            <p className="text-base lg:text-lg max-w-xl leading-relaxed text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              <Button 
                size="lg" 
                className="text-white px-8 py-6 text-base font-medium rounded-lg shadow-md hover:shadow-lg transition-all bg-[#D4A03C] hover:bg-[#C49030]"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
                className="px-8 py-6 text-base font-medium rounded-lg bg-white hover:bg-gray-50 transition-all border-[#E5E0D5] text-[#2D2A26]"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-[#6B6B6B]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <BookOpen className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-[#6B6B6B]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <GraduationCap className="h-4 w-4" />
                <span className="font-medium">Scholars</span>
              </Link>
              <Link
                to="/gallery"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm text-[#6B6B6B]"
                style={{ fontFamily: 'Inter, sans-serif' }}
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
              <div className="relative rounded-2xl overflow-hidden shadow-xl p-5 bg-white">
                {/* Main Image */}
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm lg:max-w-md h-auto object-contain rounded-xl"
                />

                {/* Name Badge at bottom */}
                <div className="absolute -bottom-5 left-4 right-4 flex items-center gap-4 px-5 py-4 rounded-xl shadow-lg bg-white">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[#FFF8E7]">
                    <BookOpen className="h-6 w-6 text-[#D4A03C]" />
                  </div>
                  <div>
                    <p className="font-semibold text-base text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>Gurudev Muni Jambuvijayji</p>
                    <p className="text-sm text-[#8B8B8B]" style={{ fontFamily: 'Inter, sans-serif' }}>Maharaj Saheb (1923–2009)</p>
                  </div>
                </div>
              </div>

              {/* Floating Animated Icons */}
              {/* 100th Anniversary Logo - Top Right - No delay */}
              <div className="absolute -top-4 -right-4 animate-float">
                <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-xl bg-card shadow-soft overflow-hidden border border-primary/20">
                  <img 
                    src="https://siddhijambuparivar.com/wp-content/uploads/2019/07/MicrosoftTeams-image-26-370x400.png" 
                    alt="100th Anniversary Logo" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* GraduationCap Icon - Middle Right - delay-300 */}
              <div className="absolute top-1/2 -right-6 -translate-y-1/2 animate-float delay-300">
                <div className="w-14 h-14 rounded-xl bg-card shadow-soft flex items-center justify-center border border-primary/20">
                  <GraduationCap className="h-6 w-6 text-[#8B1A1A]" />
                </div>
              </div>

              {/* BookOpen Icon - Bottom Left - delay-500 */}
              <div className="absolute -bottom-4 -left-4 animate-float delay-500">
                <div className="w-14 h-14 rounded-xl bg-card shadow-soft flex items-center justify-center border border-primary/20">
                  <BookOpen className="h-7 w-7 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}