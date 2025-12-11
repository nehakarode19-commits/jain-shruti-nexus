import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight, Sparkles } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Metadata",
    description: "Store and organize your research notes, metadata, and scholarly references in a centralized and searchable repository.",
    icon: Database,
    href: "/research/sodhsanchay",
    iconBg: "linear-gradient(135deg, #C9A227 0%, #E3C075 100%)",
    accent: "#C9A227",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search and export features across research entries with advanced filters and cross-referencing.",
    icon: Search,
    href: "/research/sodhsandarbh",
    iconBg: "linear-gradient(135deg, #C9A227 0%, #E3C075 100%)",
    accent: "#C9A227",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "Search inside Jain PDFs and manuscripts using our AI-powered text extraction and discovery tools.",
    icon: FileText,
    href: "/research/shabdasangraha",
    iconBg: "linear-gradient(135deg, #C9A227 0%, #E3C075 100%)",
    accent: "#C9A227",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "External Sources",
    description: "AI-assisted search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    iconBg: "linear-gradient(135deg, #C9A227 0%, #E3C075 100%)",
    accent: "#C9A227",
  },
];

export function ResearchToolsSection() {
  return (
    <section 
      className="py-20 lg:py-28 relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(180deg, #FAF7F2 0%, #F5EFE6 50%, #FAF7F2 100%)'
      }}
    >
      {/* Decorative background elements */}
      <div className="absolute top-20 left-10 w-72 h-72 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.1) 0%, transparent 70%)' }} />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(201,162,39,0.08) 0%, transparent 70%)' }} />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-5"
            style={{ backgroundColor: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)' }}
          >
            <Sparkles className="h-4 w-4" style={{ color: '#C9A227' }} />
            <span className="text-sm font-medium" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
              Jain Knowledge Research Ecosystem
            </span>
          </div>
          
          <h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
          >
            AI-Powered{" "}
            <span style={{ 
              background: 'linear-gradient(135deg, #C6933A 0%, #E3C075 50%, #C6933A 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
              Research Tools
            </span>
          </h2>
          
          <p className="text-base lg:text-lg leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
        </div>

        {/* Tools Grid - 4 columns on large screens */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {researchTools.map((tool, index) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group relative rounded-2xl p-6 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl bg-white border border-[#E8E4DD]"
              style={{
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}
            >
              {/* Hover gradient overlay */}
              <div 
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  background: 'linear-gradient(135deg, rgba(201,162,39,0.05) 0%, transparent 100%)'
                }}
              />
              
              {/* Icon */}
              <div 
                className="relative w-14 h-14 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300 shadow-lg"
                style={{ background: tool.iconBg }}
              >
                <tool.icon className="h-7 w-7 text-white" />
              </div>
              
              {/* Content */}
              <div className="relative">
                <h3 
                  className="text-xl font-bold mb-1 group-hover:text-[#C9A227] transition-colors duration-300"
                  style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                >
                  {tool.title}
                </h3>
                <p 
                  className="text-sm font-semibold mb-3"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}
                >
                  {tool.subtitle}
                </p>
                
                <p 
                  className="text-sm leading-relaxed mb-5"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
                >
                  {tool.description}
                </p>
                
                <div 
                  className="flex items-center gap-1.5 font-semibold text-sm group-hover:gap-3 transition-all duration-300"
                  style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}
                >
                  <span>Learn More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            className="text-white px-8 py-6 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
            style={{ 
              fontFamily: 'Inter, sans-serif',
              background: 'linear-gradient(135deg, #C9A227 0%, #D4A03C 100%)'
            }}
            asChild
          >
            <Link to="/research">
              Explore Research Hub
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
