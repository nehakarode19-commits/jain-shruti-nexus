import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Metadata Entry",
    description: "Store and organize structured research notes, metadata, and scholarly references in a centralized database.",
    icon: Database,
    href: "/research/sodhsanchay",
    iconBg: "#4A7C59",
    subtitleColor: "#4A7C59",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search across research entries with advanced filters and easy export to Excel/CSV.",
    icon: Search,
    href: "/research/sodhsandarbh",
    iconBg: "#8B4A5E",
    subtitleColor: "#8B4A5E",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Smart Search",
    description: "Search inside Jain texts like Google. Find exact pages matching your query with AI-powered transliteration.",
    icon: FileText,
    href: "/research/shabdasangraha",
    iconBg: "#C9A227",
    subtitleColor: "#C9A227",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Book Finder",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "#B8336A",
    subtitleColor: "#B8336A",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
            Four Powerful Research Tools
          </h2>
          
          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
            An integrated ecosystem designed for scholars, researchers, and seekers to explore and preserve Jain knowledge.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 gap-5 max-w-5xl mx-auto mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group rounded-xl p-6 transition-all duration-300 hover:shadow-lg bg-white border border-[#E5E0D5]"
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-5"
                style={{ backgroundColor: `${tool.iconBg}15` }}
              >
                <tool.icon className="h-6 w-6" style={{ color: tool.iconBg }} />
              </div>
              
              {/* Title and Subtitle */}
              <div className="mb-4">
                <h3 className="text-xl font-bold mb-1 group-hover:opacity-80 transition-opacity" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  {tool.title}
                </h3>
                <p className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: tool.subtitleColor }}>
                  {tool.subtitle}
                </p>
              </div>
              
              {/* Description */}
              <p className="text-sm leading-relaxed mb-5" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                {tool.description}
              </p>
              
              {/* Learn More Link */}
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
            className="text-white px-8 h-12 text-sm font-medium rounded-full shadow-md bg-[#D4A03C] hover:bg-[#C49030]"
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
