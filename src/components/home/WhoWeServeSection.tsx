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
    description: "Access rare manuscripts and research tools for academic study of Jain philosophy.",
    href: "/research",
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings and spiritual wisdom from Gurudev's lifetime.",
    href: "/guruvani",
  },
  {
    icon: Library,
    title: "Librarians",
    description: "Comprehensive system for cataloging and preserving rare Jain manuscripts.",
    href: "/library",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events and gatherings celebrating Jain heritage.",
    href: "/community/events",
  },
];

export function WhoWeServeSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Who We Serve</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            For Every Knowledge Seeker
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Whether you're a researcher, student, librarian, or spiritual seeker, 
            Jambushrusti provides resources tailored to your journey.
          </p>
        </div>

        {/* Audience Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((audience) => (
            <Link 
              key={audience.title}
              to={audience.href}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <audience.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {audience.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {audience.description}
              </p>
              <span className="inline-flex items-center text-sm text-primary font-medium">
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
