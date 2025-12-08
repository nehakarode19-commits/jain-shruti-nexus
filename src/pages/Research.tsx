import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Database, 
  Search, 
  FileText, 
  Globe, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Zap
} from "lucide-react";

const tools = [
  {
    id: "sodhsanchay",
    title: "SodhSanchay",
    subtitle: "Research Metadata Entry",
    description: "A centralized database to store structured research notes, metadata, and scholarly references. Perfect for organizing your research journey.",
    icon: Database,
    href: "/research/sodhsanchay",
    color: "text-primary",
    bgColor: "bg-primary/10",
    features: [
      "Structured metadata entry",
      "Tag-based organization",
      "Link to books & manuscripts",
      "AI-powered tag suggestions",
    ],
  },
  {
    id: "sodhsandarbh",
    title: "SodhSandarbh",
    subtitle: "Search & Export Research",
    description: "Powerful search across all research entries with advanced filters, Boolean logic, and easy export to Excel/CSV for offline analysis.",
    icon: Search,
    href: "/research/sodhsandarbh",
    color: "text-burgundy",
    bgColor: "bg-burgundy/10",
    features: [
      "Advanced search filters",
      "Boolean search (AND, OR, NOT)",
      "Export to Excel/CSV",
      "Linked entry viewing",
    ],
  },
  {
    id: "shabdasangraha",
    title: "Śabdasaṅgraha",
    subtitle: "Smart PDF Search Engine",
    description: "Search inside Jain texts like Google. Find exact pages matching your query with AI-powered transliteration support for multi-language searches.",
    icon: FileText,
    href: "/research/shabdasangraha",
    color: "text-sage",
    bgColor: "bg-sage/10",
    features: [
      "Full-text PDF search",
      "Page-level results",
      "Transliteration support",
      "Multi-language queries",
    ],
  },
  {
    id: "shastrasandarbha",
    title: "Shastrasandarbha",
    subtitle: "AI Global Book Finder",
    description: "AI-powered search across Archive.org, HathiTrust, JSTOR, Jain eLibrary, and more. Find Jain books from digital libraries worldwide.",
    icon: Globe,
    href: "/research/shastrasandarbha",
    color: "text-gold",
    bgColor: "bg-gold/10",
    features: [
      "Multi-source aggregation",
      "AI result ranking",
      "Duplicate removal",
      "Direct external links",
    ],
  },
];

const Research = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-primary/20 text-sm mb-6 animate-fade-up">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Jain Knowledge Research Ecosystem</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Research Hub
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-200">
              Four integrated tools designed for scholars, researchers, and seekers 
              to explore, organize, and discover Jain knowledge like never before.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 text-center">
            {[
              { icon: Database, label: "Store", desc: "Organize research" },
              { icon: Search, label: "Search", desc: "Find & export" },
              { icon: FileText, label: "Explore", desc: "Inside PDFs" },
              { icon: Globe, label: "Discover", desc: "Global books" },
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center gap-6 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-2">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground hidden md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            {tools.map((tool, index) => (
              <Card 
                key={tool.id}
                variant="feature"
                className="overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="grid lg:grid-cols-2 gap-0">
                  <CardHeader className="p-8">
                    <div className={`w-16 h-16 rounded-2xl ${tool.bgColor} flex items-center justify-center mb-4`}>
                      <tool.icon className={`h-8 w-8 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-2xl mb-1">{tool.title}</CardTitle>
                    <CardDescription className="text-primary font-medium mb-4">
                      {tool.subtitle}
                    </CardDescription>
                    <p className="text-muted-foreground mb-6">
                      {tool.description}
                    </p>
                    <Button variant="hero" asChild>
                      <Link to={tool.href}>
                        Open {tool.title}
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Link>
                    </Button>
                  </CardHeader>
                  <CardContent className="p-8 bg-secondary/30">
                    <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-primary" />
                      Key Features
                    </h4>
                    <ul className="space-y-3">
                      {tool.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                          <CheckCircle className="h-4 w-4 text-sage shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Join our scholarly community and get access to all research tools. 
            Registered scholars can also contribute to the research database.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/auth">
                Create Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/scholars">
                Scholar Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Research;
