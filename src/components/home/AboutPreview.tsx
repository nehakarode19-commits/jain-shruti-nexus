import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, BookOpen, FileText, Image, Users, Building2 } from "lucide-react";

const quickLinks = [
  { icon: BookOpen, label: "Books", href: "/books" },
  { icon: FileText, label: "Biography", href: "/about/gurudev" },
  { icon: Image, label: "Photo Gallery", href: "/gallery" },
];

const teachings = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access sacred discourses and spiritual guidance",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the lineage and spiritual family",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum of Gurudev's legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Content Section */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
                About Gurudev
              </p>
              <h2 className="text-3xl md:text-4xl font-bold mb-5" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024). He was born into a devoutly religious family.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors hover:opacity-70 bg-white border border-[#D4C5B0]"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-xl p-5 relative bg-white border-l-4 border-[#C9A227]">
              <Quote className="absolute top-4 right-4 h-7 w-7 text-[#C9A227]/20" />
              <blockquote className="italic text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-2.5 text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8B8B' }}>
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="lg" 
                className="text-white h-10 px-5 text-sm bg-[#D4A03C] hover:bg-[#C49030]"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/about/gurudev">
                  Read Biography
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="h-10 px-5 text-sm border-[#E5E0D5] text-[#2D2A26] bg-white hover:bg-gray-50"
                style={{ fontFamily: 'Inter, sans-serif' }}
                asChild
              >
                <Link to="/gallery">
                  Photo Gallery
                </Link>
              </Button>
            </div>
          </div>

          {/* Image and Teachings Section */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Teaching Cards */}
            <div className="space-y-2.5">
              {teachings.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group flex items-center gap-3.5 rounded-lg p-3.5 transition-all duration-300 hover:shadow-md bg-white border border-[#E5E0D5]"
                >
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center group-hover:opacity-80 transition-opacity bg-[#C9A227]/10">
                    <item.icon className="h-5 w-5 text-[#C9A227]" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold transition-colors" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
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
