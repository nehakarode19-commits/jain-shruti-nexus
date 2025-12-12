import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { 
  Database, 
  Search, 
  FileText, 
  Globe, 
  ArrowRight, 
  Sparkles,
  CheckCircle,
  Users
} from "lucide-react";

const tools = [
  {
    id: "sodhsanchay",
    title: "SodhSanchay",
    subtitle: "Research Metadata Entry",
    description: "A centralized database to store structured research notes, metadata, and scholarly references. Perfect for organizing your research journey.",
    icon: Database,
    href: "/research/sodhsanchay",
    borderColor: "border-l-blue-500",
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
    subtitleColor: "text-blue-600",
    buttonBg: "bg-primary hover:bg-primary/90",
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
    borderColor: "border-l-orange-500",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-600",
    subtitleColor: "text-orange-600",
    buttonBg: "bg-primary hover:bg-primary/90",
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
    borderColor: "border-l-emerald-500",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-600",
    subtitleColor: "text-emerald-600",
    buttonBg: "bg-primary hover:bg-primary/90",
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
    borderColor: "border-l-purple-500",
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    subtitleColor: "text-purple-600",
    buttonBg: "bg-primary hover:bg-primary/90",
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
      {/* Tools Section */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container-wide mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-10">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Research Tools
            </Badge>
            <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Deep Research
            </h1>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto text-lg">
              Each tool is designed to work seamlessly together, creating a comprehensive research ecosystem.
            </p>
          </div>

          {/* Tools Grid - 2x2 with left border accent */}
          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className={`group bg-card rounded-2xl border-l-4 ${tool.borderColor} shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="p-6 lg:p-8">
                  {/* Header with Icon */}
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`shrink-0 w-12 h-12 rounded-xl ${tool.iconBg} flex items-center justify-center`}>
                      <tool.icon className={`h-6 w-6 ${tool.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-heading text-xl font-bold text-foreground">
                        {tool.title}
                      </h3>
                      <p className={`font-body text-base font-medium ${tool.subtitleColor}`}>
                        {tool.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="font-body text-muted-foreground text-base leading-relaxed mb-5">
                    {tool.description}
                  </p>

                  {/* Features - 2 columns */}
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {tool.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 font-body text-base text-muted-foreground">
                        <CheckCircle className={`h-4 w-4 shrink-0 ${tool.iconColor}`} />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Button 
                    asChild
                    className={`w-full ${tool.buttonBg} text-primary-foreground rounded-lg`}
                  >
                    <Link to={tool.href}>
                      Open {tool.title}
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 lg:py-16 bg-secondary/30">
        <div className="container-wide mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              How It Works
            </h2>
            <p className="font-body text-base text-muted-foreground">
              A seamless research workflow from start to finish
            </p>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 lg:gap-10">
            {[
              { icon: Database, label: "Store", desc: "Organize your research", bg: "bg-blue-500" },
              { icon: Search, label: "Search", desc: "Find & export data", bg: "bg-orange-500" },
              { icon: FileText, label: "Explore", desc: "Search inside PDFs", bg: "bg-emerald-500" },
              { icon: Globe, label: "Discover", desc: "Global book search", bg: "bg-purple-500" },
            ].map((item, index) => (
              <div key={item.label} className="flex items-center gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`w-14 h-14 rounded-full ${item.bg} flex items-center justify-center mb-3 shadow-md`}>
                    <item.icon className="h-6 w-6 text-white" />
                  </div>
                  <p className="font-heading font-semibold text-foreground">{item.label}</p>
                  <p className="font-body text-base text-muted-foreground">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="h-5 w-5 text-muted-foreground/40 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container-wide mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-5 bg-white/10 border-white/20 text-white">
            <Users className="h-3.5 w-3.5 mr-2" />
            Join Our Community
          </Badge>

          <h2 className="font-heading text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="font-body text-base text-white/80 mb-8 max-w-lg mx-auto">
            Join our scholarly community and get access to all research tools. Registered scholars can also contribute to the research database.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-primary hover:bg-white/90 rounded-lg font-semibold"
            >
              <Link to="/auth">
                Create Account
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="border-white text-white hover:bg-white/10 rounded-lg"
            >
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
