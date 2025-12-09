import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, BookOpen, ScrollText, Search } from "lucide-react";

export function FeatureHighlightSection() {
  const features = [
    "Access to 10,000+ digitized manuscripts",
    "AI-powered transliteration search",
    "Secure preservation of rare texts",
  ];

  return (
    <section className="py-16 lg:py-20 bg-[#E9EEF2]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Illustration Side */}
          <div className="relative">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              {/* Decorative illustration elements */}
              <div className="relative h-80 flex items-center justify-center">
                {/* Background decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-48 h-48 rounded-full bg-[#4A6FA5]/5 absolute"></div>
                  <div className="w-64 h-64 rounded-full bg-[#4A6FA5]/5 absolute"></div>
                </div>
                
                {/* Main icon composition */}
                <div className="relative z-10 flex items-center gap-6">
                  <div className="bg-[#4A6FA5] rounded-2xl p-6 shadow-xl transform -rotate-6">
                    <BookOpen className="h-12 w-12 text-white" />
                  </div>
                  <div className="bg-amber-500 rounded-2xl p-6 shadow-xl transform rotate-3">
                    <ScrollText className="h-12 w-12 text-white" />
                  </div>
                  <div className="bg-emerald-500 rounded-2xl p-6 shadow-xl transform -rotate-3">
                    <Search className="h-12 w-12 text-white" />
                  </div>
                </div>
                
                {/* Decorative dots */}
                <div className="absolute top-8 right-12 w-3 h-3 rounded-full bg-[#4A6FA5]"></div>
                <div className="absolute bottom-12 left-8 w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="absolute top-16 left-16 w-2 h-2 rounded-full bg-emerald-500"></div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#4A6FA5]/10 text-[#4A6FA5] text-sm font-medium mb-4">
              Digital Library
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#2B3A4A] mb-4">
              Explore Our Digital Collection
            </h2>
            <p className="text-[#555555] text-lg mb-6 leading-relaxed">
              Discover the comprehensive digital library preserving centuries of Jain wisdom. 
              Our platform provides scholars and seekers with unprecedented access to rare manuscripts, 
              ancient scriptures, and scholarly research materials.
            </p>

            {/* Feature List */}
            <ul className="space-y-3 mb-8">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="h-5 w-5 text-[#4A6FA5] flex-shrink-0" />
                  <span className="text-[#333333]">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              size="lg"
              asChild
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
            >
              <Link to="/library">
                Explore Library
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
