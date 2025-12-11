import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2, Image } from "lucide-react";

const teachings = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access Gurudev's profound discourses and written works",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the lineage and contributions of disciples",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Visit the digital museum of Gurudev's legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          {/* Left Content Section */}
          <div className="space-y-5">
            <div>
              <p className="font-medium text-xs mb-2 tracking-wide" style={{ fontFamily: 'Inter, sans-serif', color: '#D4A03C' }}>
                About Gurudev
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024).
            </p>

            {/* Quote */}
            <div className="rounded-xl p-5 relative bg-white border-l-4 border-[#D4A03C]">
              <Quote className="absolute top-3 left-3 h-5 w-5 text-[#D4A03C]/30" />
              <blockquote className="italic text-[14px] leading-relaxed pl-6" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                "The pursuit of knowledge is the path to liberation. Decades of my 
                contemplations are compiled for seekers of righteousness."
              </blockquote>
              <p className="mt-2 text-xs font-medium pl-6" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8B8B' }}>
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                variant="outline"
                size="default" 
                className="h-10 px-5 text-sm border-[#2D2A26] text-[#2D2A26] bg-transparent hover:bg-[#2D2A26] hover:text-white"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/about/gurudev">
                  Read Full Biography
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="default" 
                className="h-10 px-5 text-sm border-[#E5E0D5] text-[#5A5650] bg-white hover:bg-gray-50"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/gallery">
                  <Image className="h-4 w-4 mr-2" />
                  Photo Gallery
                </Link>
              </Button>
            </div>

            {/* Bottom Links */}
            <div className="flex gap-6 pt-2">
              <Link 
                to="/about/parivar" 
                className="text-sm text-[#5A5650] hover:text-[#D4A03C] underline underline-offset-4 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Gurudev Parivar
              </Link>
              <Link 
                to="/about/gyan-kendra" 
                className="text-sm text-[#5A5650] hover:text-[#D4A03C] underline underline-offset-4 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Gyan Kendra
              </Link>
            </div>
          </div>

          {/* Right Section - Image Grid and Teaching Cards */}
          <div className="space-y-5">
            {/* Image Grid */}
            <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
              <div className="col-span-2 row-span-2">
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/87-min.jpg"
                  alt="Gurudev teaching"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/85-min.jpg"
                  alt="Gurudev with disciples"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Teaching Cards */}
            <div className="space-y-2">
              {teachings.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:shadow-md bg-white border border-[#E5E0D5]"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:opacity-80 transition-opacity bg-[#D4A03C]/10">
                    <item.icon className="h-4 w-4 text-[#D4A03C]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                      {item.title}
                    </h3>
                    <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all text-[#8B8B8B]" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
