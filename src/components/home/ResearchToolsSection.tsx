import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight, Sparkles } from "lucide-react";

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
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-primary/5 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-orange/10 rounded-full" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-orange" />
            <span className="text-sm text-muted-foreground font-medium">AI-Powered Research Ecosystem</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Four Powerful Research Tools
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid - 2x2 on larger screens */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-12">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group bg-card rounded-2xl p-6 border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${tool.iconBg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <tool.icon className="h-7 w-7 text-white" />
              </div>
              
              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-primary mb-1 group-hover:text-primary/80 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-orange font-medium">{tool.subtitle}</p>
              </div>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-1 text-primary font-medium text-sm">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="bg-orange hover:bg-orange/90 text-white px-8 py-3 text-base font-medium rounded-lg"
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
