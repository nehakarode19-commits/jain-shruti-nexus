import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  BookOpen, 
  Languages, 
  Globe,
  ArrowRight,
  Sparkles
} from "lucide-react";

const libraryTools = [
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Search ancient texts with smart transliteration across multiple scripts including Devanagari, Gujarati, and Roman.",
    iconBg: "bg-[#4A6FA5]",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access thousands of rare Jain manuscripts and scholarly works digitized for preservation and study.",
    iconBg: "bg-transparent",
  },
  {
    icon: Languages,
    title: "Multi-Script Support",
    description: "Seamless transliteration between Devanagari, Gujarati, and Roman scripts for easy reading.",
    iconBg: "bg-amber-600",
  },
  {
    icon: Globe,
    title: "Global Aggregation",
    description: "Find Jain texts from Archive.org, HathiTrust, and other repositories in one unified search.",
    iconBg: "bg-transparent",
  },
];

export function LibraryToolsSection() {
  return (
    <section className="py-16 lg:py-20 bg-[#2B3A4A]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium mb-4">
            <Sparkles className="h-4 w-4" />
            Platform Features
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tools for Research & Discovery
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Combining technology with respect for ancient wisdom to provide 
            unprecedented access to Jain knowledge.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
          {libraryTools.map((tool) => (
            <div
              key={tool.title}
              className="group p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center mb-5`}>
                <tool.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-white mb-3">
                {tool.title}
              </h3>
              <p className="text-sm text-white/60 leading-relaxed">
                {tool.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            asChild
            className="border-white/30 text-white hover:bg-white/10"
          >
            <Link to="/research">
              Explore All Research Tools
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
