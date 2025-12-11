import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Library,
  ArrowRight,
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Researchers & Scholars",
    description: "Access rare manuscripts and research tools for academic study of Jain philosophy and ancient texts.",
    href: "/research",
    color: "bg-[#4A6FA5]",
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime of devotion and learning.",
    href: "/guruvani",
    color: "bg-[#E8A838]",
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts and books.",
    href: "/library",
    color: "bg-[#5B8C5A]",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating our rich Jain heritage together.",
    href: "/community/events",
    color: "bg-[#9B7BB8]",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#F8F5EF] to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-[#F4B400] font-semibold uppercase tracking-wider text-sm mb-4">
            For Every Seeker
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3557] mb-6">
            Who We Serve
          </h2>
          <p className="text-[#555555] text-lg leading-relaxed">
            Whether you're a researcher, student, librarian, or spiritual seeker, 
            Jambushrusti provides resources tailored to your journey of knowledge.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FA5] to-transparent mx-auto mt-8 rounded-full" />
        </div>

        {/* Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience, index) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group bg-white rounded-2xl border border-[#E5E0D8] hover:border-[#4A6FA5]/30 hover:shadow-xl transition-all duration-300 p-6"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${audience.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <audience.icon className="h-7 w-7 text-white" />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-[#1E3557] mb-3 group-hover:text-[#4A6FA5] transition-colors">
                {audience.title}
              </h3>
              
              <p className="text-sm text-[#555555] mb-5 leading-relaxed">
                {audience.description}
              </p>
              
              <span className="inline-flex items-center text-sm text-[#4A6FA5] font-medium">
                Explore
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-2 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
