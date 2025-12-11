import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Search, Library, ScrollText, Users, Heart } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

// Lotus SVG component
const LotusIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C12 2 9 6 9 10C9 12 10 14 12 14C14 14 15 12 15 10C15 6 12 2 12 2Z" />
    <path d="M6 8C6 8 2 10 2 14C2 16 4 18 6 18C8 18 10 16 10 14C10 10 6 8 6 8Z" opacity="0.7" />
    <path d="M18 8C18 8 22 10 22 14C22 16 20 18 18 18C16 18 14 16 14 14C14 10 18 8 18 8Z" opacity="0.7" />
    <path d="M12 14C12 14 8 16 8 20C8 21 9 22 12 22C15 22 16 21 16 20C16 16 12 14 12 14Z" opacity="0.5" />
  </svg>
);

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
      {/* Lotus pattern background */}
      <div 
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 10C40 10 35 20 35 30C35 35 37 40 40 40C43 40 45 35 45 30C45 20 40 10 40 10Z' fill='%23C9A227'/%3E%3Cpath d='M25 20C25 20 15 25 15 35C15 40 20 45 25 45C30 45 35 40 35 35C35 25 25 20 25 20Z' fill='%23C9A227' opacity='0.6'/%3E%3Cpath d='M55 20C55 20 65 25 65 35C65 40 60 45 55 45C50 45 45 40 45 35C45 25 55 20 55 20Z' fill='%23C9A227' opacity='0.6'/%3E%3Cpath d='M40 40C40 40 30 50 30 60C30 65 35 70 40 70C45 70 50 65 50 60C50 50 40 40 40 40Z' fill='%23C9A227' opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      />
      
      {/* Soft gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(250,247,242,0.9) 0%, rgba(245,239,230,0.95) 50%, rgba(250,247,242,0.9) 100%)'
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-16 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-5 order-2 lg:order-1">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
              style={{ backgroundColor: 'rgba(255,255,255,0.6)', borderColor: '#E5DFD4' }}
            >
              <LotusIcon className="h-4 w-4 text-[#C9A227]" />
              <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#7A6F5D' }}>
                Preserving Ancient Wisdom
              </span>
            </div>

            {/* Sanskrit subtitle */}
            <p className="text-base font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#C6933A' }}>
              आगमप्रज्ञ पू. मुनिराज श्री जम्बू विजयजी महाराज साहेब
            </p>

            {/* Main Title */}
            <div className="space-y-0">
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  color: '#2D2A26'
                }}
              >
                Jain Knowledge &
              </h1>
              <h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight"
                style={{ 
                  fontFamily: 'Playfair Display, serif',
                  background: 'linear-gradient(135deg, #C6933A 0%, #E3C075 50%, #C6933A 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}
              >
                Research Ecosystem
              </h1>
            </div>

            {/* Description */}
            <p 
              className="text-base lg:text-lg max-w-lg leading-relaxed"
              style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
            >
              Explore the profound teachings of Gurudev Muni Jambuvijayji Maharaj Saheb (1923–2009). Discover sacred texts, research tools, and a community dedicated to preserving Jain philosophy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                size="lg" 
                className="text-white px-6 py-5 text-sm font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  background: 'linear-gradient(135deg, #D4A03C 0%, #C6933A 100%)'
                }}
                asChild 
              >
                <Link to="/guruvani">
                  <LotusIcon className="h-4 w-4 mr-2" />
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="px-6 py-5 text-sm font-medium rounded-lg transition-all"
                style={{ 
                  fontFamily: 'Inter, sans-serif',
                  backgroundColor: 'white',
                  borderColor: '#E5E0D5',
                  color: '#2D2A26'
                }}
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
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
              >
                <Library className="h-4 w-4" />
                <span className="font-medium">Library</span>
              </Link>
              <Link
                to="/books"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
              >
                <ScrollText className="h-4 w-4" />
                <span className="font-medium">Manuscripts</span>
              </Link>
              <Link
                to="/scholars"
                className="flex items-center gap-2 hover:opacity-70 transition-opacity text-sm"
                style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
              >
                <Users className="h-4 w-4" />
                <span className="font-medium">Multi-Scholars</span>
              </Link>
            </div>
          </div>

          {/* Hero Visual */}
          <div className="relative flex justify-center order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Card */}
              <div 
                className="relative rounded-2xl overflow-hidden shadow-xl p-4"
                style={{ backgroundColor: 'white' }}
              >
                {/* Main Image */}
                <img 
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-xs lg:max-w-sm h-auto object-contain rounded-xl"
                />

                {/* Caption at bottom of image */}
                <div className="text-center pt-3 pb-1">
                  <p 
                    className="font-semibold text-sm"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}
                  >
                    Gurudev Muni Jambuvijayji
                  </p>
                  <p 
                    className="text-xs"
                    style={{ fontFamily: 'Inter, sans-serif', color: '#9B9B9B' }}
                  >
                    Maharaj Saheb (1923–2009)
                  </p>
                </div>
              </div>

              {/* Floating Lotus Icon - Top Right */}
              <div className="absolute -top-3 -right-3 animate-float">
                <div 
                  className="w-14 h-14 lg:w-16 lg:h-16 rounded-full shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FDF8EC', border: '2px solid #F5EFE0' }}
                >
                  <LotusIcon className="h-7 w-7 lg:h-8 lg:w-8 text-[#C9A227]" />
                </div>
              </div>

              {/* Floating Book Icon - Bottom Left */}
              <div className="absolute -bottom-2 -left-3 animate-float delay-500">
                <div 
                  className="w-12 h-12 rounded-full shadow-lg flex items-center justify-center"
                  style={{ backgroundColor: '#FDF8EC', border: '2px solid #F5EFE0' }}
                >
                  <BookOpen className="h-5 w-5 text-[#C9A227]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
