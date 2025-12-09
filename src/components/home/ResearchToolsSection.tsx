import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    description: "Store and organize structured research notes and metadata.",
    icon: Database,
    href: "/research/sodhsanchay",
  },
  {
    title: "SodhSandarbh",
    description: "Powerful search with advanced filters and easy export.",
    icon: Search,
    href: "/research/sodhsandarbh",
  },
  {
    title: "Śabdasaṅgraha",
    description: "AI-powered full-text search inside Jain PDFs.",
    icon: FileText,
    href: "/research/shabdasangraha",
  },
  {
    title: "Shastrasandarbha",
    description: "Find Jain books across Archive.org, HathiTrust & more.",
    icon: Globe,
    href: "/research/shastrasandarbha",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Research Ecosystem</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Four Powerful Research Tools
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                {tool.description}
              </p>
              <span className="inline-flex items-center text-sm text-primary font-medium">
                Learn More
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild>
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
