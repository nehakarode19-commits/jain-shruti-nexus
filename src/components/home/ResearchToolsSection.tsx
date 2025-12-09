import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight, Sparkles } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    description: "Store & organize research notes",
    icon: Database,
    href: "/research/sodhsanchay",
  },
  {
    title: "SodhSandarbh",
    description: "Advanced search & export",
    icon: Search,
    href: "/research/sodhsandarbh",
  },
  {
    title: "Śabdasaṅgraha",
    description: "AI full-text PDF search",
    icon: FileText,
    href: "/research/shabdasangraha",
  },
  {
    title: "Shastrasandarbha",
    description: "Find books across archives",
    icon: Globe,
    href: "/research/shastrasandarbha",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-primary/5 to-secondary/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-primary/5 rounded-full blur-2xl" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">AI-Powered Research</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
            Four Powerful Research Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge with AI assistance.
          </p>
        </div>

        {/* Tools - Grid Layout for better visibility */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-elevated transition-all text-center"
            >
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {tool.description}
              </p>
              <div className="mt-4 flex items-center justify-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="hero" size="lg" asChild>
            <Link to="/research">
              Explore Research Hub
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
