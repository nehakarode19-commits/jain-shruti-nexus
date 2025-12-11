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
    color: "bg-[#4A6FA5]",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Advanced Search",
    description: "Powerful search and export capabilities for research entries across multiple languages with transliteration support.",
    icon: Search,
    href: "/research/sodhsandarbh",
    color: "bg-[#5B8C5A]",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "Deep-search AI that lets you explore Jain literature pages matching your query with AI-powered extraction.",
    icon: FileText,
    href: "/research/shabdasangraha",
    color: "bg-[#E8A838]",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Library",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    color: "bg-[#9B7BB8]",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#F8F5EF] relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 left-10 w-64 h-64 border border-[#4A6FA5]/5 rounded-full" />
      <div className="absolute bottom-20 right-10 w-48 h-48 border border-[#F4B400]/10 rounded-full" />
      
      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DCE3E7] shadow-sm mb-6">
            <Sparkles className="h-4 w-4 text-[#F4B400]" />
            <span className="text-sm text-[#555555] font-medium">AI-Powered Research Ecosystem</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#1E3557] mb-6">
            Four Powerful Research Tools
          </h2>
          
          <p className="text-[#555555] text-lg leading-relaxed">
            An integrated ecosystem designed for scholars, researchers, and seekers to explore centuries of Jain knowledge with modern AI-powered assistance.
          </p>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FA5] to-transparent mx-auto mt-8 rounded-full" />
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {researchTools.map((tool, index) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group bg-white rounded-2xl p-6 border border-[#E5E0D8] hover:border-[#4A6FA5]/30 hover:shadow-xl transition-all duration-300"
            >
              <div className={`w-14 h-14 rounded-xl ${tool.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <tool.icon className="h-7 w-7 text-white" />
              </div>
              
              <div className="mb-4">
                <h3 className="font-heading text-xl font-bold text-[#1E3557] mb-1 group-hover:text-[#4A6FA5] transition-colors">
                  {tool.title}
                </h3>
                <p className="text-sm text-[#F4B400] font-medium">{tool.subtitle}</p>
              </div>
              
              <p className="text-sm text-[#555555] leading-relaxed mb-5">
                {tool.description}
              </p>
              
              <div className="flex items-center gap-1 text-[#4A6FA5] font-medium text-sm">
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
            asChild
            className="bg-[#F4B400] hover:bg-[#E5A800] text-[#1E3557] shadow-lg shadow-[#F4B400]/20 font-semibold"
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
