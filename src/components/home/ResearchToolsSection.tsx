import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Database, Search, FileText, Globe, ArrowRight, Sparkles, Zap, Shield, Clock } from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Storage",
    description: "Store & organize your research notes with AI-suggested tags and related topics",
    icon: Database,
    href: "/research/sodhsanchay",
    gradient: "from-blue-500 to-cyan-500",
    features: ["AI tagging", "Cloud sync", "Export options"],
  },
  {
    title: "SodhSandarbh",
    subtitle: "Advanced Search",
    description: "Advanced search & export research entries across multiple languages",
    icon: Search,
    href: "/research/sodhsandarbh",
    gradient: "from-emerald-500 to-teal-500",
    features: ["Multi-language", "Filters", "Citations"],
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Search",
    description: "AI-powered full-text PDF search with page-level indexing",
    icon: FileText,
    href: "/research/shabdasangraha",
    gradient: "from-amber-500 to-orange-500",
    features: ["OCR support", "Page indexing", "Highlights"],
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Library",
    description: "Find books across Archive.org, HathiTrust, and other digital libraries",
    icon: Globe,
    href: "/research/shastrasandarbha",
    gradient: "from-purple-500 to-pink-500",
    features: ["5+ sources", "Aggregation", "Deduplication"],
  },
];

const platformBenefits = [
  { icon: Zap, text: "Lightning Fast" },
  { icon: Shield, text: "Secure & Private" },
  { icon: Clock, text: "24/7 Access" },
];

export function ResearchToolsSection() {
  return (
    <section className="py-24 lg:py-32 bg-[#E9EEF2] relative overflow-hidden">
      {/* Enhanced background pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute top-40 right-40 w-96 h-96 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute bottom-20 left-1/3 w-48 h-48 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gradient-to-br from-[#4A6FA5]/10 to-transparent rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#DCE3E7] shadow-sm mb-5">
            <Sparkles className="h-5 w-5 text-[#4A6FA5]" />
            <span className="text-sm text-[#2B3A4A] font-semibold">AI-Powered Research Ecosystem</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-5">
            Four Powerful Research Tools
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg mb-6">
            An integrated ecosystem for scholars and seekers to explore Jain knowledge with AI assistance.
          </p>
          
          {/* Platform Benefits */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {platformBenefits.map((benefit) => (
              <div 
                key={benefit.text}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 border border-[#DCE3E7]"
              >
                <benefit.icon className="h-4 w-4 text-[#4A6FA5]" />
                <span className="text-sm text-[#2B3A4A] font-medium">{benefit.text}</span>
              </div>
            ))}
          </div>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#4A6FA5] to-transparent mx-auto rounded-full" />
        </div>

        {/* Enhanced Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {researchTools.map((tool, index) => (
            <Link 
              key={tool.title}
              to={tool.href}
              className="group p-7 rounded-3xl bg-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5]/0 to-[#4A6FA5]/0 group-hover:from-[#4A6FA5]/5 group-hover:to-transparent transition-all duration-300" />
              
              <div className="relative">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform shadow-lg group-hover:shadow-xl`}>
                  <tool.icon className="h-8 w-8 text-white" />
                </div>
                
                <div className="mb-4">
                  <h3 className="font-heading text-xl font-bold text-[#2B3A4A] mb-1 group-hover:text-[#4A6FA5] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#4A6FA5] font-medium">{tool.subtitle}</p>
                </div>
                
                <p className="text-sm text-[#555555] leading-relaxed mb-5">
                  {tool.description}
                </p>
                
                {/* Feature Tags */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {tool.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-2.5 py-1 rounded-full bg-[#E9EEF2] text-xs text-[#555555] font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-1 text-[#4A6FA5] font-medium">
                  <span className="text-sm">Explore Tool</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="xl" 
            asChild
            className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white shadow-lg shadow-[#4A6FA5]/20 group"
          >
            <Link to="/research">
              Explore Research Hub
              <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
