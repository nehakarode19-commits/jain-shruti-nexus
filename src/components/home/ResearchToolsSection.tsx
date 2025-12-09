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
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <p className="text-primary font-medium mb-2">Research Ecosystem</p>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-2">
            Four Powerful AI Research Tools
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge.
          </p>
        </div>

        {/* Tools - Single Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group flex items-center gap-3 px-5 py-3 rounded-full bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all"
            >
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <tool.icon className="h-4 w-4 text-primary" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-muted-foreground hidden sm:block max-w-[180px]">
                  {tool.description}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="sm" asChild>
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
