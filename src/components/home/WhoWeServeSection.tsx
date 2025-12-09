import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Search, 
  ArrowRight,
  Award,
  FileText,
  Library
} from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";

const audiences = [
  {
    icon: GraduationCap,
    title: "Researchers & PhD Scholars",
    description: "Access rare manuscripts, structured research tools, and comprehensive databases for academic study of Jain philosophy and texts.",
    features: ["AI-powered text search", "Citation tools", "Manuscript database", "Research metadata"],
    href: "/research",
    color: "primary",
    bgGradient: "from-primary/10 via-primary/5 to-transparent",
  },
  {
    icon: BookOpen,
    title: "Students & Seekers",
    description: "Explore sacred teachings, discourses, and spiritual wisdom from Gurudev Muni Jambuvijayji Maharaj Saheb.",
    features: ["Guruvani collection", "Sacred texts", "Learning resources", "Photo & video gallery"],
    href: "/guruvani",
    color: "burgundy",
    bgGradient: "from-burgundy/10 via-burgundy/5 to-transparent",
  },
  {
    icon: Library,
    title: "Librarians & Archivists",
    description: "Comprehensive library management system for cataloging, preserving, and managing rare Jain manuscripts and books.",
    features: ["Book cataloging", "Manuscript tracking", "Issue/receive workflow", "Digital preservation"],
    href: "/library",
    color: "sage",
    bgGradient: "from-sage/10 via-sage/5 to-transparent",
  },
  {
    icon: Users,
    title: "Jain Community",
    description: "Stay connected with events, news, and community gatherings celebrating Jain heritage and Gurudev's legacy.",
    features: ["Community events", "Blog & news", "Photo gallery", "Memorial programs"],
    href: "/community/events",
    color: "gold",
    bgGradient: "from-gold/10 via-gold/5 to-transparent",
  },
];

const colorClasses = {
  primary: {
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    featureBg: "bg-primary/10",
    featureText: "text-primary",
    border: "hover:border-primary/30",
  },
  burgundy: {
    iconBg: "bg-burgundy/15",
    iconColor: "text-burgundy",
    featureBg: "bg-burgundy/10",
    featureText: "text-burgundy",
    border: "hover:border-burgundy/30",
  },
  sage: {
    iconBg: "bg-sage/15",
    iconColor: "text-sage",
    featureBg: "bg-sage/10",
    featureText: "text-sage",
    border: "hover:border-sage/30",
  },
  gold: {
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
    featureBg: "bg-gold/10",
    featureText: "text-gold",
    border: "hover:border-gold/30",
  },
};

export function WhoWeServeSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-muted/30 via-background to-background relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground font-medium">Who We Serve</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Serving <span className="text-gradient-gold">Diverse</span> Knowledge Seekers
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you're a researcher, student, librarian, or spiritual seeker, Jambushrusti provides 
            specialized tools and resources tailored to your journey.
          </p>
        </AnimatedContainer>

        {/* Audience Cards */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {audiences.map((audience, index) => {
            const colors = colorClasses[audience.color as keyof typeof colorClasses];
            return (
              <AnimatedContainer
                key={audience.title}
                animation="fade-up"
                delay={index * 100}
              >
                <div className={`group relative h-full p-6 lg:p-8 rounded-2xl bg-card border border-border/50 ${colors.border} hover:shadow-elevated transition-all duration-500 overflow-hidden`}>
                  {/* Hover gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${audience.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                  
                  <div className="relative">
                    {/* Icon & Title */}
                    <div className="flex items-start gap-4 mb-4">
                      <div className={`w-14 h-14 rounded-xl ${colors.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <audience.icon className={`h-7 w-7 ${colors.iconColor}`} />
                      </div>
                      <div>
                        <h3 className="font-heading text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {audience.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {audience.description}
                        </p>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {audience.features.map((feature) => (
                        <span 
                          key={feature}
                          className={`px-3 py-1.5 rounded-full text-xs font-medium ${colors.featureBg} ${colors.featureText}`}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <Link 
                      to={audience.href}
                      className={`inline-flex items-center text-sm font-medium ${colors.iconColor} hover:underline`}
                    >
                      Explore Resources
                      <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>
      </div>
    </section>
  );
}
