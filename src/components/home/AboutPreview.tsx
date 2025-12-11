import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Scroll, Users, Building2, Image } from "lucide-react";

const teachings = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access Guruvani - profound discourses and written works",
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
    title: "Jnan Kendra",
    description: "Digital museum preserving Gurudev's legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-[#FAF7F2] to-[#F5F0E8]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left Content Section */}
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium mb-3 tracking-wide text-[#D4A03C]" style={{ fontFamily: 'Inter, sans-serif' }}>
                About Gurudev
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-[#2D2A26] leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-[15px] leading-relaxed text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharajsaheb, was a monk belonging to the Tapa Gaccha order of 
              Shwetambar sect of Jainism. Jambuvijayji was born as Chunilal Bhogilal 
              Joitram in 1923 in town of Mandal, Gujarat. His father's name was Bhogilal 
              Mohanlal Joitram (1895–1959) and his mother's name was Aniben Popatlal 
              (1894–1995). He was born into a deeply religious family.
            </p>

            {/* Quote */}
            <div className="rounded-xl p-6 bg-white/80 backdrop-blur-sm shadow-sm">
              <div className="flex gap-4">
                <div className="text-4xl font-serif text-[#D4A03C] leading-none">"</div>
                <div>
                  <p className="italic text-[15px] leading-relaxed text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    The pursuit of knowledge is the path to liberation. Through study and 
                    contemplation, we illuminate the darkness of ignorance."
                  </p>
                  <p className="mt-3 text-sm font-medium text-[#8B8B8B]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    — Gurudev Muni Jambuvijayji
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline"
                size="lg" 
                className="h-12 px-6 text-sm border-[#D5D0C5] text-[#2D2A26] bg-white hover:bg-[#2D2A26] hover:text-white hover:border-[#2D2A26] rounded-full transition-all"
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
                size="lg" 
                className="h-12 px-6 text-sm border-[#D5D0C5] text-[#5A5650] bg-white hover:bg-gray-50 rounded-full"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/gallery">
                  <Image className="h-4 w-4 mr-2" />
                  Photo Gallery
                </Link>
              </Button>
            </div>

            {/* Bottom Pill Links */}
            <div className="flex gap-3 pt-2">
              <Link 
                to="/about/parivar" 
                className="px-5 py-2.5 text-sm text-[#5A5650] bg-white border border-[#E5E0D5] rounded-full hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Gurudev Parivar
              </Link>
              <Link 
                to="/about/gyan-kendra" 
                className="px-5 py-2.5 text-sm text-[#5A5650] bg-white border border-[#E5E0D5] rounded-full hover:bg-gray-50 transition-colors"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                Jnan Kendra
              </Link>
            </div>
          </div>

          {/* Right Section - Image Grid and Teaching Cards */}
          <div className="space-y-5">
            {/* Image Grid - 3 images in a row */}
            <div className="grid grid-cols-3 gap-3">
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                className="w-full h-52 object-cover object-top rounded-xl"
              />
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/3-min.jpg"
                alt="Gurudev teaching"
                className="w-full h-52 object-cover object-center rounded-xl"
              />
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/38-min.jpg"
                alt="Gurudev with disciples"
                className="w-full h-52 object-cover object-top rounded-xl"
              />
            </div>

            {/* Teaching Cards */}
            <div className="space-y-3">
              {teachings.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link
                    key={item.title}
                    to={item.href}
                    className="group flex items-center gap-4 rounded-xl p-4 transition-all duration-300 hover:shadow-md bg-white/80 backdrop-blur-sm border border-[#E5E0D5]/50"
                  >
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center bg-[#FAF7F2]">
                      <IconComponent className="h-5 w-5 text-[#D4A03C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-semibold text-[#2D2A26]" style={{ fontFamily: 'Playfair Display, serif' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.description}
                      </p>
                    </div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-all text-[#C4C4C4] flex-shrink-0" />
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
