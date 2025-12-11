import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Metadata",
    description: "Store and organize your research notes, metadata, and scholarly references in a centralized and searchable repository.",
    icon: Database,
    href: "/research/sodhsanchay",
    iconBg: "bg-[#1E3A5F]",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search and export features across research entries with advanced filters and cross-referencing.",
    icon: Search,
    href: "/research/sodhsandarbh",
    iconBg: "bg-[#4A7C59]",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "Search inside Jain PDFs and manuscripts using our AI-powered text extraction and discovery tools.",
    icon: FileText,
    href: "/research/shabdasangraha",
    iconBg: "bg-primary",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "External Sources",
    description: "AI-assisted search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "bg-burgundy",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3 font-body text-primary">
            AI-Powered Research Ecosystem
          </p>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4 text-foreground">
            Four Powerful Research Tools
          </h2>
          
          <p className="text-[15px] leading-relaxed font-body text-muted-foreground">
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group rounded-xl border text-card-foreground transition-all duration-300 bg-card/80 border-primary/10 hover:border-primary/30 shadow-sm hover:shadow-md hover:-translate-y-1 p-5"
            >
              <div 
                className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${tool.iconBg} group-hover:scale-110 transition-transform`}
              >
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="mb-3">
                <h3 className="font-display text-xl font-semibold tracking-tight mb-0.5 text-foreground group-hover:text-primary transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm font-medium font-body text-primary">{tool.subtitle}</p>
              </div>
              
              <p className="text-sm leading-relaxed mb-4 font-body text-muted-foreground">
                {tool.description}
              </p>
              
              <div className="inline-flex items-center gap-2 text-sm font-medium h-9 rounded-md px-3 hover:bg-secondary transition-colors font-body text-foreground">
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
            className="bg-primary text-primary-foreground px-7 h-11 text-sm font-medium rounded-lg shadow-md hover:bg-primary/90 transition-all font-body"
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
