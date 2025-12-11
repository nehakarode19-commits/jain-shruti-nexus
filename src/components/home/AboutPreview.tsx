import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scroll, Users, Building2, Camera } from "lucide-react";

const teachings = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access Gurudev's profound discourses and written works",
    href: "/guruvani",
    bgColor: "bg-[#D4A03C]/10",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the lineage and contributions of disciples",
    href: "/about/parivar",
    bgColor: "bg-[#D4A03C]/10",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Visit the digital museum of Gurudev's legacy",
    href: "/about/gyan-kendra",
    bgColor: "bg-[#D4A03C]/10",
  },
];

export function AboutPreview() {
  return (
    <section className="py-14 lg:py-16 bg-[#FAF7F2]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Left Content Section */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium mb-2 tracking-wide text-[#D4A03C]" style={{ fontFamily: 'Inter, sans-serif' }}>
                About Gurudev
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-[#2D2A26]" style={{ fontFamily: 'Playfair Display, serif' }}>
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024). He was born into a deeply religious family.
            </p>

            {/* Quote */}
            <div className="rounded-lg p-4 bg-white border-l-4 border-[#D4A03C]">
              <p className="italic text-sm leading-relaxed text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>
                "The pursuit of knowledge is the path to liberation. Decades of my 
                contemplations are compiled for seekers of righteousness."
              </p>
              <p className="mt-2 text-xs font-medium text-[#8B8B8B]" style={{ fontFamily: 'Inter, sans-serif' }}>
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-1">
              <Button 
                variant="outline"
                size="sm" 
                className="h-9 px-4 text-sm border-[#2D2A26] text-[#2D2A26] bg-transparent hover:bg-[#2D2A26] hover:text-white rounded-md"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/about/gurudev">
                  Read Full Biography
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="sm" 
                className="h-9 px-4 text-sm border-[#E5E0D5] text-[#5A5650] bg-white hover:bg-gray-50 rounded-md"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/gallery">
                  <Camera className="h-3.5 w-3.5 mr-1.5" />
                  Photo Gallery
                </Link>
              </Button>
            </div>

            {/* Bottom Links */}
            <div className="flex gap-6 pt-1">
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
          <div className="space-y-4">
            {/* Image Grid - 3 images layout */}
            <div className="grid grid-cols-3 gap-2">
              <div className="col-span-2 row-span-2">
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full h-48 md:h-56 object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/87-min.jpg"
                  alt="Gurudev teaching"
                  className="w-full h-[5.75rem] md:h-[6.75rem] object-cover rounded-lg"
                />
              </div>
              <div>
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/85-min.jpg"
                  alt="Gurudev with disciples"
                  className="w-full h-[5.75rem] md:h-[6.75rem] object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Teaching Cards */}
            <div className="space-y-2">
              {teachings.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="group flex items-center gap-3 rounded-lg p-3 transition-all duration-300 hover:shadow-md bg-white border border-[#E5E0D5]"
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.bgColor}`}>
                      <IconComponent className="h-4 w-4 text-[#D4A03C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-semibold text-[#2D2A26]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#5A5650] truncate" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-all text-[#8B8B8B] flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
