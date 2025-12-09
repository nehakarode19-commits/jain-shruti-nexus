import { Link } from "react-router-dom";
import { 
  Search, 
  BookOpen, 
  Globe, 
  Languages,
  ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "AI-Powered Search",
    description: "Search ancient texts with smart transliteration across multiple scripts.",
  },
  {
    icon: BookOpen,
    title: "Digital Library",
    description: "Access thousands of rare Jain manuscripts and scholarly works.",
  },
  {
    icon: Languages,
    title: "Multi-Script Support",
    description: "Seamless transliteration between Devanagari, Gujarati, and Roman.",
  },
  {
    icon: Globe,
    title: "Global Aggregation",
    description: "Find Jain texts from Archive.org, HathiTrust, and other repositories.",
  },
];

export function FeaturesHighlight() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">Platform Features</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Tools for Research & Discovery
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Combining technology with respect for ancient wisdom to provide 
            unprecedented access to Jain knowledge.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {features.map((feature) => (
            <div 
              key={feature.title}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/20 hover:shadow-soft transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link 
            to="/research"
            className="inline-flex items-center text-primary font-medium hover:underline"
          >
            Explore All Research Tools
            <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
