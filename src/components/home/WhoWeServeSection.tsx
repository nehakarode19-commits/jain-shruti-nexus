import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Library,
  ArrowRight
} from "lucide-react";

const audiences = [
  {
    icon: GraduationCap,
    title: "Researchers & Scholars",
    description: "Access rare manuscripts and research tools for academic study of Jain philosophy and ancient texts.",
    href: "/research",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg",
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime of devotion and learning.",
    href: "/guruvani",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/37-min.jpg",
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts and books.",
    href: "/library",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/90-min.jpg",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating our rich Jain heritage together.",
    href: "/community/events",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/101-min.jpg",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
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

        {/* Audience Cards with images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group rounded-2xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Image */}
              <div className="h-40 overflow-hidden">
                <img 
                  src={audience.image}
                  alt={audience.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="w-12 h-12 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center mb-4 group-hover:bg-[#4A6FA5] transition-colors">
                  <audience.icon className="h-6 w-6 text-[#4A6FA5] group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-heading text-lg font-semibold text-[#2B3A4A] mb-2 group-hover:text-[#4A6FA5] transition-colors">
                  {audience.title}
                </h3>
                <p className="text-sm text-[#555555] mb-4 line-clamp-3">
                  {audience.description}
                </p>
                <span className="inline-flex items-center text-sm text-[#4A6FA5] font-medium">
                  Explore
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
