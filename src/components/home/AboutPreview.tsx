import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2, BookOpen, Award, Heart } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

const highlights = [
  {
    icon: Scroll,
    title: "Guruvani",
    description: "Sacred discourses and teachings for spiritual growth",
    href: "/guruvani",
    stat: "200+",
    statLabel: "Teachings",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Spiritual lineage and devoted disciples",
    href: "/about/parivar",
    stat: "100+",
    statLabel: "Disciples",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum preserving sacred legacy",
    href: "/about/gyan-kendra",
    stat: "1000+",
    statLabel: "Artifacts",
  },
];

const achievements = [
  { icon: BookOpen, text: "Edited 40+ Jain Agamas" },
  { icon: Award, text: "Padma Shri Awardee" },
  { icon: Heart, text: "Dedicated 70+ Years" },
];

export function AboutPreview() {
  return (
    <section className="py-24 lg:py-32 bg-[#E9EEF2] relative overflow-hidden">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-40 left-20 w-80 h-80 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute bottom-20 right-40 w-60 h-60 border border-[#4A6FA5]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">About Gurudev</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-3">
            Muni Jambuvijayji Maharaj Saheb
          </h2>
          <p className="text-xl text-[#4A6FA5] mb-2">{gurudevBio.hindiName}</p>
          <p className="text-[#555555]">
            {gurudevBio.birthYear} – {gurudevBio.deathYear} • {gurudevBio.birthPlace}
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FA5] to-transparent mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Image with enhanced decorative frame */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative">
              {/* Multiple decorative layers for depth */}
              <div className="absolute -inset-6 bg-gradient-to-br from-[#4A6FA5]/20 to-transparent rounded-[2rem] -rotate-3" />
              <div className="absolute -inset-3 bg-white/50 rounded-3xl -rotate-1 shadow-xl" />
              
              <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-[#4A6FA5]/10">
                <img
                  src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full max-w-sm h-auto object-cover"
                />
                {/* Subtle overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/20 to-transparent" />
              </div>
              
              {/* Centenary logo badge - enhanced */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-white shadow-2xl overflow-hidden border-4 border-[#E9EEF2] ring-4 ring-[#4A6FA5]/10">
                <img 
                  src={gurudevBio.centenaryLogo}
                  alt="Centenary Logo"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Achievement badge */}
              <div className="absolute -top-4 -left-4 px-4 py-2 rounded-xl bg-[#4A6FA5] text-white shadow-lg">
                <p className="text-sm font-semibold">Centenary Year</p>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-8">
            <p className="text-[#333333] text-lg leading-relaxed">
              {gurudevBio.shortBio}
            </p>

            {/* Achievement Pills */}
            <div className="flex flex-wrap gap-3">
              {achievements.map((achievement) => (
                <div 
                  key={achievement.text}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE3E7] shadow-sm"
                >
                  <achievement.icon className="h-4 w-4 text-[#4A6FA5]" />
                  <span className="text-sm text-[#2B3A4A] font-medium">{achievement.text}</span>
                </div>
              ))}
            </div>

            {/* Enhanced Quote */}
            <div className="bg-white rounded-2xl p-8 border-l-4 border-[#4A6FA5] shadow-lg relative overflow-hidden group hover:shadow-xl transition-shadow">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#4A6FA5]/5 rounded-full -translate-y-1/2 translate-x-1/2" />
              <Quote className="absolute top-6 right-6 h-10 w-10 text-[#4A6FA5]/10 group-hover:text-[#4A6FA5]/20 transition-colors" />
              <blockquote className="text-[#2B3A4A] italic text-xl leading-relaxed relative">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-4 text-sm text-[#555555] font-medium">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* Enhanced Highlights Cards */}
            <div className="grid grid-cols-3 gap-4">
              {highlights.map((item) => (
                <Link 
                  key={item.title}
                  to={item.href}
                  className="group p-5 rounded-2xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all duration-300 text-center relative overflow-hidden"
                >
                  {/* Hover glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5]/0 to-[#4A6FA5]/0 group-hover:from-[#4A6FA5]/5 group-hover:to-transparent transition-all duration-300" />
                  
                  <div className="relative">
                    <div className="w-14 h-14 mx-auto rounded-2xl bg-[#4A6FA5]/10 flex items-center justify-center mb-3 group-hover:bg-[#4A6FA5] group-hover:scale-110 transition-all duration-300">
                      <item.icon className="h-7 w-7 text-[#4A6FA5] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-semibold text-[#2B3A4A] text-sm mb-1">{item.title}</h3>
                    <p className="text-xs text-[#555555] mb-3 line-clamp-2">{item.description}</p>
                    <div className="pt-3 border-t border-[#DCE3E7]">
                      <p className="text-lg font-bold text-[#4A6FA5]">{item.stat}</p>
                      <p className="text-xs text-[#555555]">{item.statLabel}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <Button 
              size="lg" 
              asChild
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white shadow-lg shadow-[#4A6FA5]/20 group"
            >
              <Link to="/about/gurudev">
                Read Full Biography
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
