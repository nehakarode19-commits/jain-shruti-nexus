import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight, Sparkles } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    description: "Store & organize your research notes with AI-suggested tags and related topics",
    icon: Database,
    href: "/research/sodhsanchay",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "SodhSandarbh",
    description: "Advanced search & export research entries across multiple languages",
    icon: Search,
    href: "/research/sodhsandarbh",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    title: "Śabdasaṅgraha",
    description: "AI-powered full-text PDF search with page-level indexing",
    icon: FileText,
    href: "/research/shabdasangraha",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    title: "Shastrasandarbha",
    description: "Find books across Archive.org, HathiTrust, and other digital libraries",
    icon: Globe,
    href: "/research/shastrasandarbha",
    gradient: "from-purple-500 to-pink-500",
  },
];

export function ResearchToolsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#E9EEF2] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-40 h-40 border border-[#4A6FA5]/20 rounded-full" />
        <div className="absolute top-40 right-40 w-60 h-60 border border-[#4A6FA5]/20 rounded-full" />
        <div className="absolute bottom-20 left-1/3 w-32 h-32 border border-[#4A6FA5]/20 rounded-full" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#4A6FA5]/10 border border-[#4A6FA5]/20 mb-4">
            <Sparkles className="h-4 w-4 text-[#4A6FA5]" />
            <span className="text-sm text-[#4A6FA5] font-medium">AI-Powered Research</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            Four Powerful Research Tools
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge with AI assistance.
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        {/* Tools - Card Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {researchTools.map((tool) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group p-6 rounded-2xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all"
            >
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg`}>
                <tool.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#2B3A4A] mb-3 group-hover:text-[#4A6FA5] transition-colors">
                {tool.title}
              </h3>
              <p className="text-sm text-[#555555] leading-relaxed mb-4">
                {tool.description}
              </p>
              <div className="flex items-center gap-1 text-[#4A6FA5] opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-sm font-medium">Explore</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            asChild
            className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
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
