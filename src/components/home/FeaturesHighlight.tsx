import { Link } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  FileText, 
  Users, 
  Globe, 
  Shield, 
  Sparkles,
  ArrowRight,
  Languages,
  Database
} from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";

const features = [
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Search inside ancient texts with smart transliteration. Type in English, find results in Gujarati, Hindi, and Sanskrit.",
    color: "primary",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access thousands of rare Jain manuscripts, books, and scholarly works digitized for preservation.",
    color: "burgundy",
  },
  {
    icon: Languages,
    title: "Multi-Script Support",
    description: "Seamless transliteration between Devanagari, Gujarati, and Roman scripts for all research tools.",
    color: "sage",
  },
  {
    icon: Database,
    title: "Research Database",
    description: "Structured metadata storage for academic research with citation tools and export capabilities.",
    color: "gold",
  },
  {
    icon: Globe,
    title: "Global Aggregation",
    description: "Find Jain texts from Archive.org, HathiTrust, JSTOR, and other digital repositories in one place.",
    color: "primary",
  },
  {
    icon: Shield,
    title: "Secure Access Control",
    description: "Role-based permissions for scholars, researchers, and librarians with content protection.",
    color: "burgundy",
  },
];

const colorClasses = {
  primary: {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "group-hover:border-primary/30",
  },
  burgundy: {
    bg: "bg-burgundy/10",
    text: "text-burgundy",
    border: "group-hover:border-burgundy/30",
  },
  sage: {
    bg: "bg-sage/10",
    text: "text-sage",
    border: "group-hover:border-sage/30",
  },
  gold: {
    bg: "bg-gold/10",
    text: "text-gold",
    border: "group-hover:border-gold/30",
  },
};

export function FeaturesHighlight() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 lotus-pattern opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground font-medium">Platform Features</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Powerful Tools for <span className="text-gradient-gold">Research & Discovery</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Jambushrusti combines cutting-edge technology with deep respect for ancient wisdom, 
            providing researchers and seekers with unprecedented access to Jain knowledge.
          </p>
        </AnimatedContainer>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const colors = colorClasses[feature.color as keyof typeof colorClasses];
            return (
              <AnimatedContainer
                key={feature.title}
                animation="fade-up"
                delay={index * 80}
              >
                <div className={`group h-full p-6 rounded-2xl bg-card border border-border/50 ${colors.border} hover:shadow-elevated transition-all duration-300`}>
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-6 w-6 ${colors.text}`} />
                  </div>
                  <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </AnimatedContainer>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <AnimatedContainer animation="fade-up" delay={600} className="text-center mt-12">
          <Link 
            to="/research"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
          >
            Explore All Research Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedContainer>
      </div>
    </section>
  );
}
