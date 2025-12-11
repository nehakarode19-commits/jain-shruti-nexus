import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Storage",
    description: "Store and organize your research notes, metadata, and scholarly references in a centralized cloud-based repository.",
    icon: Database,
    href: "/research/sodhsanchay",
    iconBg: "bg-primary",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Advanced Search",
    description: "Powerful search and export capabilities for research entries across multiple languages with transliteration support.",
    icon: Search,
    href: "/research/sodhsandarbh",
    iconBg: "bg-sage",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "Deep-search AI that lets you explore Jain literature pages matching your query with AI-powered extraction.",
    icon: FileText,
    href: "/research/shabdasangraha",
    iconBg: "bg-orange",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Library",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "bg-burgundy",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="text-orange font-semibold uppercase tracking-wider text-xs mb-3 font-body">
            AI-Powered Research Ecosystem
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Four Powerful Research Tools
          </h2>
          
          <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group bg-card rounded-xl p-5 border border-border hover:border-orange/30 hover:shadow-lg transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-lg ${tool.iconBg} flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md`}>
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="mb-3">
                <h3 className="font-heading text-lg font-semibold text-primary mb-0.5 group-hover:text-primary/80 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-xs text-orange font-medium font-body">{tool.subtitle}</p>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 font-body">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-1 text-primary font-medium text-sm font-body">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-orange hover:bg-orange/90 text-white px-7 h-11 text-sm font-medium rounded-lg shadow-md font-body"
            asChild
          >
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
