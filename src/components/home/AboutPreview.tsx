import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, BookOpen, FileText, Image } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

const quickLinks = [
  { icon: BookOpen, label: "Biography", href: "/about/gurudev" },
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
    icon: FileText,
    title: "Curated Prakarans",
    description: "Explore curated prakarans and sacred texts",
    href: "/books",
  },
  {
    icon: BookOpen,
    title: "Gyan Kendra",
    description: "Digital museum of Gurudev's legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#F8F5EF] to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Section */}
          <div className="relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                className="w-full h-auto object-cover"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E3557]/30 to-transparent" />
            </div>
            
            {/* Centenary badge */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-white shadow-xl overflow-hidden border-4 border-[#F8F5EF]">
              <img 
                src={gurudevBio.centenaryLogo}
                alt="Centenary"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="space-y-8">
            <div>
              <p className="text-[#F4B400] font-semibold uppercase tracking-wider text-sm mb-3">
                About Gurudev
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3557] mb-2">
                Muni Jambuvijayji Maharaj Saheb
              </h2>
              <p className="text-[#4A6FA5] text-lg">
                {gurudevBio.hindiName}
              </p>
              <p className="text-[#555555] mt-2">
                {gurudevBio.birthYear} – {gurudevBio.deathYear} • {gurudevBio.birthPlace}
              </p>
            </div>

            <p className="text-[#555555] text-lg leading-relaxed">
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024). He was born into a devoutly religious family.
            </p>

            {/* Quote */}
            <div className="bg-[#F8F5EF] rounded-2xl p-6 border-l-4 border-[#F4B400] relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-[#F4B400]/20" />
              <blockquote className="text-[#1E3557] italic text-lg leading-relaxed">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-3 text-sm text-[#555555] font-medium">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE3E7] text-[#555555] hover:border-[#4A6FA5] hover:text-[#4A6FA5] transition-colors text-sm font-medium"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Teaching Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {teachings.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group bg-[#F8F5EF] rounded-2xl p-6 hover:shadow-lg hover:bg-white border border-transparent hover:border-[#E5E0D8] transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center mb-4 group-hover:bg-[#4A6FA5] transition-colors">
                <item.icon className="h-6 w-6 text-[#4A6FA5] group-hover:text-white transition-colors" />
              </div>
              <h3 className="font-heading text-lg font-bold text-[#1E3557] mb-2 group-hover:text-[#4A6FA5] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#555555] mb-3">
                {item.description}
              </p>
              <span className="text-sm text-[#4A6FA5] font-medium inline-flex items-center gap-1">
                Learn More
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            asChild
            className="bg-[#1E3557] hover:bg-[#2B4A6B] text-white"
          >
            <Link to="/about/gurudev">
              Read Full Biography
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
