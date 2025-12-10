import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Library,
  ArrowRight,
  CheckCircle2,
  Sparkles
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Researchers & Scholars",
    description: "Access rare manuscripts and research tools for academic study of Jain philosophy and ancient texts.",
    href: "/research",
    color: "bg-blue-500/10",
    iconColor: "text-blue-600",
    hoverBg: "group-hover:bg-blue-500",
    benefits: ["AI-powered search", "Citation export", "Collaboration tools"],
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime of devotion and learning.",
    href: "/guruvani",
    color: "bg-amber-500/10",
    iconColor: "text-amber-600",
    hoverBg: "group-hover:bg-amber-500",
    benefits: ["Audio discourses", "Study guides", "Daily wisdom"],
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts and books.",
    href: "/library",
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-500",
    benefits: ["Inventory management", "Digital cataloging", "Preservation tools"],
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating our rich Jain heritage together.",
    href: "/community/events",
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
    hoverBg: "group-hover:bg-purple-500",
    benefits: ["Event calendar", "Community news", "Photo galleries"],
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-[#4A6FA5]/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-[#4A6FA5]/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A6FA5]/10 border border-[#4A6FA5]/20 mb-4">
            <Sparkles className="h-4 w-4 text-[#4A6FA5]" />
            <span className="text-sm text-[#4A6FA5] font-medium">Tailored for Everyone</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            For Every Knowledge Seeker
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            Whether you're a researcher, student, librarian, or spiritual seeker, 
            Jambushrusti provides resources tailored to your journey.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FA5] to-transparent mx-auto mt-6 rounded-full" />
        </div>

        {/* Enhanced Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group rounded-3xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-2xl transition-all duration-300 p-7 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5]/0 to-[#4A6FA5]/0 group-hover:from-[#4A6FA5]/5 group-hover:to-transparent transition-all duration-300" />
              
              <div className="relative">
                {/* Icon Container */}
                <div className={`w-16 h-16 rounded-2xl ${audience.color} ${audience.hoverBg} flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                  <audience.icon className={`h-8 w-8 ${audience.iconColor} group-hover:text-white transition-colors`} />
                </div>
                
                <h3 className="font-heading text-xl font-semibold text-[#2B3A4A] mb-3 group-hover:text-[#4A6FA5] transition-colors">
                  {audience.title}
                </h3>
                <p className="text-sm text-[#555555] mb-5 leading-relaxed">
                  {audience.description}
                </p>
                
                {/* Benefits List */}
                <div className="space-y-2 mb-5 border-t border-[#DCE3E7] pt-4">
                  {audience.benefits.map((benefit) => (
                    <div key={benefit} className="flex items-center gap-2 text-sm text-[#555555]">
                      <CheckCircle2 className="h-4 w-4 text-[#4A6FA5] flex-shrink-0" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <span className="inline-flex items-center text-sm text-[#4A6FA5] font-medium group-hover:underline">
                  Explore Now
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-2 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
