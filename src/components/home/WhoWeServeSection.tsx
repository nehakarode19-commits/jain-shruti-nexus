import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Library,
  ArrowRight,
  ScrollText,
  Lightbulb,
  BookMarked,
  Heart
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
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime of devotion and learning.",
    href: "/guruvani",
    color: "bg-amber-500/10",
    iconColor: "text-amber-600",
    hoverBg: "group-hover:bg-amber-500",
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts and books.",
    href: "/library",
    color: "bg-emerald-500/10",
    iconColor: "text-emerald-600",
    hoverBg: "group-hover:bg-emerald-500",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating our rich Jain heritage together.",
    href: "/community/events",
    color: "bg-purple-500/10",
    iconColor: "text-purple-600",
    hoverBg: "group-hover:bg-purple-500",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">Who We Serve</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            For Every Knowledge Seeker
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            Whether you're a researcher, student, librarian, or spiritual seeker, 
            Jambushrusti provides resources tailored to your journey.
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        {/* Audience Cards with Icons Only */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group rounded-2xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all duration-300 p-6 text-center"
            >
              {/* Icon Container */}
              <div className={`w-16 h-16 rounded-2xl ${audience.color} ${audience.hoverBg} flex items-center justify-center mx-auto mb-5 transition-all duration-300`}>
                <audience.icon className={`h-8 w-8 ${audience.iconColor} group-hover:text-white transition-colors`} />
              </div>
              
              <h3 className="font-heading text-lg font-semibold text-[#2B3A4A] mb-3 group-hover:text-[#4A6FA5] transition-colors">
                {audience.title}
              </h3>
              <p className="text-sm text-[#555555] mb-4 line-clamp-3">
                {audience.description}
              </p>
              <span className="inline-flex items-center text-sm text-[#4A6FA5] font-medium">
                Explore
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
