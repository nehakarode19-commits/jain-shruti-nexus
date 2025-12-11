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
    iconBg: "#1E3A5F",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search and export features across research entries with advanced filters and cross-referencing.",
    icon: Search,
    href: "/research/sodhsandarbh",
    iconBg: "#4A7C59",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "Search inside Jain PDFs and manuscripts using our AI-powered text extraction and discovery tools.",
    icon: FileText,
    href: "/research/shabdasangraha",
    iconBg: "#E88A1A",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "External Sources",
    description: "AI-assisted search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "#8B4A5E",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3 font-body" style={{ color: '#E88A1A' }}>
            AI-Powered Research Ecosystem
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1E3A5F' }}>
            Four Powerful Research Tools
          </h2>
          
          <p className="text-[15px] leading-relaxed font-body" style={{ color: '#666666' }}>
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group rounded-xl p-5 transition-all duration-300 hover:shadow-lg"
              style={{ backgroundColor: '#FDF8F3', border: '1px solid #E5E0D5' }}
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md"
                style={{ backgroundColor: tool.iconBg }}
              >
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="mb-3">
                <h3 className="font-heading text-lg font-semibold mb-0.5 group-hover:opacity-80 transition-opacity" style={{ color: '#1E3A5F' }}>
                  {tool.title}
                </h3>
                <p className="text-xs font-medium font-body" style={{ color: '#E88A1A' }}>{tool.subtitle}</p>
              </div>
              
              <p className="text-sm leading-relaxed mb-4 font-body" style={{ color: '#666666' }}>
                {tool.description}
              </p>
              
              <div className="flex items-center gap-1 font-medium text-sm font-body" style={{ color: '#1E3A5F' }}>
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
            className="text-white px-7 h-11 text-sm font-medium rounded-lg shadow-md font-body"
            style={{ backgroundColor: '#E88A1A' }}
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
