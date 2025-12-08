import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
    subtitle: "Research Metadata Entry",
    description: "Store and organize structured research notes, metadata, and scholarly references in a centralized database.",
    icon: Database,
    href: "/research/sodhsanchay",
    gradient: "from-primary/20 via-primary/10 to-transparent",
    iconBg: "bg-primary/10",
    iconColor: "text-primary",
    borderColor: "hover:border-primary/30",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search across research entries with advanced filters and easy export to Excel/CSV.",
    icon: Search,
    href: "/research/sodhsandarbh",
    gradient: "from-burgundy/20 via-burgundy/10 to-transparent",
    iconBg: "bg-burgundy/10",
    iconColor: "text-burgundy",
    borderColor: "hover:border-burgundy/30",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Smart Search",
    description: "Search inside Jain texts like Google. Find exact pages matching your query with AI-powered transliteration.",
    icon: FileText,
    href: "/research/shabdasangraha",
    gradient: "from-sage/20 via-sage/10 to-transparent",
    iconBg: "bg-sage/10",
    iconColor: "text-sage",
    borderColor: "hover:border-sage/30",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Book Finder",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    gradient: "from-gold/20 via-gold/10 to-transparent",
    iconBg: "bg-gold/10",
    iconColor: "text-gold",
    borderColor: "hover:border-gold/30",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-10 lg:py-14 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute -top-40 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary animate-pulse" />
            <span className="text-muted-foreground font-medium">Jain Knowledge Research Ecosystem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Four Powerful{" "}
            <span className="text-gradient-gold">Research Tools</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            An integrated ecosystem designed for scholars, researchers, and seekers 
            to explore and preserve Jain knowledge.
          </p>
        </AnimatedContainer>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {researchTools.map((tool, index) => (
            <AnimatedContainer 
              key={tool.title}
              animation="fade-up"
              delay={index * 100}
            >
              <Card 
                variant="feature"
                className={`group relative overflow-hidden ${tool.borderColor} ripple-effect`}
              >
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <CardHeader className="relative">
                  <div className="flex items-start justify-between">
                    <div className={`w-14 h-14 rounded-xl ${tool.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:shadow-lg transition-all duration-300`}>
                      <tool.icon className={`h-7 w-7 ${tool.iconColor}`} />
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors duration-300">{tool.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-primary/80">
                    {tool.subtitle}
                  </CardDescription>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-muted-foreground mb-4">{tool.description}</p>
                  <Button variant="ghost" size="sm" asChild className="group/btn hover:bg-primary/10">
                    <Link to={tool.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </AnimatedContainer>
          ))}
        </div>

        {/* CTA */}
        <AnimatedContainer animation="fade-up" delay={500} className="text-center mt-12">
          <Button variant="hero" size="lg" asChild className="group">
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
