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
    colorClass: "bg-primary",
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime of devotion and learning.",
    href: "/guruvani",
    colorClass: "bg-accent",
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts and books.",
    href: "/library",
    colorClass: "bg-sage",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating our rich Jain heritage together.",
    href: "/community/events",
    colorClass: "bg-burgundy",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-background to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-accent font-semibold uppercase tracking-wider text-sm mb-4">
            For Every Seeker
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Who We Serve
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Whether you're a researcher, student, librarian, or spiritual seeker, 
            Jambushrusti provides resources tailored to your journey of knowledge.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mt-8 rounded-full" />
        </div>

        {/* Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group bg-card rounded-2xl border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300 p-6"
            >
              {/* Icon */}
              <div className={`w-14 h-14 rounded-xl ${audience.colorClass} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <audience.icon className="h-7 w-7 text-primary-foreground" />
              </div>
              
              <h3 className="font-heading text-xl font-bold text-primary mb-3 group-hover:text-primary/80 transition-colors">
                {audience.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {audience.description}
              </p>
              
              <span className="inline-flex items-center text-sm text-primary font-medium">
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
