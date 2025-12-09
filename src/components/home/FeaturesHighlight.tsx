import { Link } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Globe, 
  Languages,
  ArrowRight,
  Sparkles
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Search ancient texts with smart transliteration across multiple scripts including Devanagari, Gujarati, and Roman.",
    color: "bg-blue-500",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access thousands of rare Jain manuscripts and scholarly works digitized for preservation and study.",
    color: "bg-emerald-500",
  },
  {
    icon: Languages,
    title: "Multi-Script Support",
    description: "Seamless transliteration between Devanagari, Gujarati, and Roman scripts for easy reading.",
    color: "bg-amber-500",
  },
  {
    icon: Globe,
    title: "Global Aggregation",
    description: "Find Jain texts from Archive.org, HathiTrust, and other repositories in one unified search.",
    color: "bg-purple-500",
  },
];

export function FeaturesHighlight() {
  return (
    <section className="py-20 lg:py-28 bg-[#2B3A4A] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#4A6FA5]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4A6FA5]/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-4">
            <Sparkles className="h-4 w-4 text-[#4A6FA5]" />
            <span className="text-sm text-white/80 font-medium">Platform Features</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Tools for Research & Discovery
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto text-lg">
            Combining technology with respect for ancient wisdom to provide 
            unprecedented access to Jain knowledge.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
            >
              <div className={`w-14 h-14 rounded-xl ${feature.color}/20 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`h-7 w-7 text-white`} />
              </div>
              <h3 className="font-heading text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-white/60 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/research"
            className="inline-flex items-center gap-2 text-[#4A6FA5] bg-white px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
          >
            Explore All Research Tools
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
