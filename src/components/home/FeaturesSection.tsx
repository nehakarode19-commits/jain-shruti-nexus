import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Database, 
  Search, 
  FileText, 
  Globe, 
  ArrowRight,
  Sparkles 
} from "lucide-react";

const researchTools = [
  {
    title: "SodhSanchay",
    subtitle: "Research Metadata Entry",
    description: "Store and organize structured research notes, metadata, and scholarly references in a centralized database.",
    icon: Database,
    href: "/research/sodhsanchay",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "SodhSandarbh",
    subtitle: "Search & Export",
    description: "Powerful search across research entries with advanced filters and easy export to Excel/CSV.",
    icon: Search,
    href: "/research/sodhsandarbh",
    color: "text-burgundy",
    bgColor: "bg-burgundy/10",
  },
  {
    title: "Śabdasaṅgraha",
    subtitle: "PDF Smart Search",
    description: "Search inside Jain texts like Google. Find exact pages matching your query with AI-powered transliteration.",
    icon: FileText,
    href: "/research/shabdasangraha",
    color: "text-sage",
    bgColor: "bg-sage/10",
  },
  {
    title: "Shastrasandarbha",
    subtitle: "Global Book Finder",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, and more to find Jain books worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    color: "text-gold",
    bgColor: "bg-gold/10",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 lg:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Jain Knowledge Research Ecosystem</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Four Powerful Research Tools
          </h2>
          <p className="text-muted-foreground text-lg">
            An integrated ecosystem designed for scholars, researchers, and seekers 
            to explore and preserve Jain knowledge.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {researchTools.map((tool, index) => (
            <Card 
              key={tool.title} 
              variant="feature"
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className={`w-14 h-14 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <tool.icon className={`h-7 w-7 ${tool.color}`} />
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                </div>
                <CardTitle className="text-xl">{tool.title}</CardTitle>
                <CardDescription className="text-sm font-medium text-primary">
                  {tool.subtitle}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{tool.description}</p>
                <Button variant="ghost" size="sm" asChild className="group/btn">
                  <Link to={tool.href}>
                    Learn More
                    <ArrowRight className="h-4 w-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Button variant="hero" size="lg" asChild>
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
