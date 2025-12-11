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
    iconBg: "#2D2A26",
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
    iconBg: "#C9A227",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "External Sources",
    description: "AI-assisted search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "#8B1A1A",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
            AI-Powered Research Ecosystem
          </p>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
            Four Powerful Research Tools
          </h2>
          
          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-4xl mx-auto mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group rounded-xl p-5 transition-all duration-300 hover:shadow-lg bg-[#FAF7F2] border border-[#E5E0D5]"
            >
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-105 transition-transform shadow-md"
                style={{ backgroundColor: tool.iconBg }}
              >
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              
              <div className="mb-3">
                <h3 className="text-lg font-semibold mb-0.5 group-hover:opacity-80 transition-opacity" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  {tool.title}
                </h3>
                <p className="text-xs font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>{tool.subtitle}</p>
              </div>
              
              <p className="text-sm leading-relaxed mb-4" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                {tool.description}
              </p>
              
              <div className="flex items-center gap-1 font-medium text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
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
            className="text-white px-7 h-11 text-sm font-medium rounded-lg shadow-md bg-[#D4A03C] hover:bg-[#C49030]"
            style={{ fontFamily: 'Inter, sans-serif' }}
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
