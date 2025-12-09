import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Search, 
  FileText, 
  Globe, 
  ArrowRight,
  Sparkles 
} from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";

const researchTools = [
  {
    title: "SodhSanchay",
    description: "Store and organize structured research notes and metadata.",
    icon: Database,
    href: "/research/sodhsanchay",
    gradient: "from-primary/20 to-primary/5",
    iconBg: "bg-primary/15",
    iconColor: "text-primary",
    hoverBorder: "group-hover:border-primary/40",
  },
  {
    title: "SodhSandarbh",
    description: "Powerful search with advanced filters and easy export.",
    icon: Search,
    href: "/research/sodhsandarbh",
    gradient: "from-burgundy/20 to-burgundy/5",
    iconBg: "bg-burgundy/15",
    iconColor: "text-burgundy",
    hoverBorder: "group-hover:border-burgundy/40",
  },
  {
    title: "Śabdasaṅgraha",
    description: "AI-powered full-text search inside Jain PDFs.",
    icon: FileText,
    href: "/research/shabdasangraha",
    gradient: "from-sage/20 to-sage/5",
    iconBg: "bg-sage/15",
    iconColor: "text-sage",
    hoverBorder: "group-hover:border-sage/40",
  },
  {
    title: "Shastrasandarbha",
    description: "Find Jain books across Archive.org, HathiTrust & more.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    gradient: "from-gold/20 to-gold/5",
    iconBg: "bg-gold/15",
    iconColor: "text-gold",
    hoverBorder: "group-hover:border-gold/40",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-32 left-1/3 w-72 h-72 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 right-1/3 w-72 h-72 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center max-w-2xl mx-auto mb-12 lg:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Research Ecosystem</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Four Powerful Research Tools
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge.
          </p>
        </AnimatedContainer>

        {/* Tools Grid - 4 cards in a row on desktop */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
          {researchTools.map((tool, index) => (
            <AnimatedContainer 
              key={tool.title}
              animation="fade-up"
              delay={index * 80}
            >
              <Link to={tool.href} className="block h-full">
                <div 
                  className={`group relative h-full p-6 rounded-2xl bg-card border border-border/60 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${tool.hoverBorder}`}
                >
                  {/* Gradient background on hover */}
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                  
                  <div className="relative flex flex-col h-full">
                    {/* Icon */}
                    <div className={`w-14 h-14 rounded-xl ${tool.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className={`h-7 w-7 ${tool.iconColor}`} />
                    </div>
                    
                    {/* Content */}
                    <h3 className="font-heading text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {tool.title}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground mb-5 flex-grow leading-relaxed">
                      {tool.description}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-sm font-medium text-primary opacity-80 group-hover:opacity-100 transition-opacity">
                      <span>Learn More</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>

        {/* CTA Button */}
        <AnimatedContainer animation="fade-up" delay={400} className="text-center mt-10">
          <Button variant="outline" size="lg" asChild className="group border-primary/30 hover:bg-primary/10 hover:border-primary/50">
            <Link to="/research">
              Explore Research Hub
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </AnimatedContainer>
      </div>
    </section>
  );
}
