import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2 } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

const highlights = [
  {
    icon: Scroll,
    title: "Guruvani",
    description: "Sacred discourses and teachings",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Spiritual lineage and disciples",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum of legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-[#E9EEF2]">
      <div className="container mx-auto px-4">
        {/* Section Header with decorative line */}
        <div className="text-center mb-14">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">About Gurudev</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-3">
            Muni Jambuvijayji Maharaj Saheb
          </h2>
          <p className="text-lg text-[#4A6FA5] mb-2">{gurudevBio.hindiName}</p>
          <p className="text-[#555555]">
            {gurudevBio.birthYear} – {gurudevBio.deathYear} • {gurudevBio.birthPlace}
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Image with decorative frame */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Decorative background frame */}
              <div className="absolute -inset-4 bg-[#4A6FA5]/10 rounded-3xl -rotate-3" />
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm h-auto object-cover"
                />
              </div>
              
              {/* Centenary logo badge */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white shadow-lg overflow-hidden border-4 border-[#E9EEF2]">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="Centenary Logo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-[#333333] text-lg leading-relaxed">
              {gurudevBio.shortBio}
            </p>

            {/* Quote */}
            <div className="bg-white rounded-xl p-6 border-l-4 border-[#4A6FA5] shadow-sm relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#4A6FA5]/10" />
              <blockquote className="text-[#2B3A4A] italic text-lg">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-3 text-sm text-[#555555] font-medium">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-3">
              {highlights.map((item) => (
                <Link 
                  key={item.title}
                  to={item.href}
                  className="group p-4 rounded-xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-md transition-all text-center"
                >
                  <div className="w-12 h-12 mx-auto rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center mb-3 group-hover:bg-[#4A6FA5]/20 transition-colors">
                    <item.icon className="h-6 w-6 text-[#4A6FA5]" />
                  </div>
                  <h3 className="font-semibold text-[#2B3A4A] text-sm">{item.title}</h3>
                  <p className="text-xs text-[#555555] mt-1">{item.description}</p>
                </Link>
              ))}
            </div>

            <Button 
              size="lg" 
              asChild
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
            >
              <Link to="/about/gurudev">
                Read Full Biography
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
