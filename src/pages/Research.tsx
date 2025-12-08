import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
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
  BookOpen,
  Users,
  Layers,
  Lightbulb
} from "lucide-react";

const tools = [
  {
    id: "sodhsanchay",
    title: "SodhSanchay",
    subtitle: "Research Metadata Entry",
    description: "A centralized database to store structured research notes, metadata, and scholarly references. Perfect for organizing your research journey.",
    icon: Database,
    href: "/research/sodhsanchay",
    gradient: "from-blue-500 to-indigo-600",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
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
    gradient: "from-orange-500 to-red-500",
    lightBg: "bg-orange-50",
    iconColor: "text-orange-600",
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
    gradient: "from-emerald-500 to-teal-600",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
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
    gradient: "from-purple-500 to-pink-500",
    lightBg: "bg-purple-50",
    iconColor: "text-purple-600",
    features: [
      "Multi-source aggregation",
      "AI result ranking",
      "Duplicate removal",
      "Direct external links",
    ],
  },
];

const stats = [
  { icon: BookOpen, value: "10,000+", label: "Research Entries" },
  { icon: FileText, value: "5,000+", label: "Indexed PDFs" },
  { icon: Users, value: "500+", label: "Active Scholars" },
  { icon: Layers, value: "50+", label: "Digital Libraries" },
];

const Research = () => {
  return (
    <Layout>
      {/* Hero Section - Modern gradient with floating elements */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate via-slate-dark to-slate" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-gold rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge 
              variant="outline" 
              className="mb-6 bg-white/10 border-white/20 text-white backdrop-blur-sm animate-fade-up"
            >
              <Sparkles className="h-3.5 w-3.5 mr-2" />
              Jain Knowledge Research Ecosystem
            </Badge>
            
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-up delay-100">
              Research Hub
            </h1>
            
            <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto animate-fade-up delay-200">
              Four integrated tools designed for scholars, researchers, and seekers 
              to explore, organize, and discover Jain knowledge like never before.
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto animate-fade-up delay-300">
              {stats.map((stat) => (
                <div 
                  key={stat.label} 
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/10"
                >
                  <stat.icon className="h-5 w-5 text-gold mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                  <p className="text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Wave decoration */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto fill-background">
            <path d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z" />
          </svg>
        </div>
      </section>

      {/* Tools Grid - Bento-style cards */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              <Lightbulb className="h-3.5 w-3.5 mr-2" />
              Research Tools
            </Badge>
            <h2 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Powerful Tools for Deep Research
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Each tool is designed to work seamlessly together, creating a comprehensive research ecosystem.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {tools.map((tool, index) => (
              <Card 
                key={tool.id}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-500 animate-fade-up bg-card"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient top bar */}
                <div className={`h-2 bg-gradient-to-r ${tool.gradient}`} />
                
                <CardContent className="p-8">
                  <div className="flex items-start gap-5">
                    {/* Icon */}
                    <div className={`shrink-0 w-16 h-16 rounded-2xl ${tool.lightBg} flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300`}>
                      <tool.icon className={`h-8 w-8 ${tool.iconColor}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
                        {tool.title}
                      </h3>
                      <p className={`text-sm font-medium ${tool.iconColor} mb-3`}>
                        {tool.subtitle}
                      </p>
                      <p className="text-sm text-muted-foreground mb-5 line-clamp-2">
                        {tool.description}
                      </p>
                      
                      {/* Features */}
                      <div className="grid grid-cols-2 gap-2 mb-6">
                        {tool.features.map((feature) => (
                          <div key={feature} className="flex items-center gap-2 text-xs text-muted-foreground">
                            <CheckCircle className={`h-3.5 w-3.5 shrink-0 ${tool.iconColor}`} />
                            <span className="truncate">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* CTA Button */}
                      <Button 
                        asChild
                        className={`w-full bg-gradient-to-r ${tool.gradient} hover:opacity-90 text-white border-0`}
                      >
                        <Link to={tool.href}>
                          Open {tool.title}
                          <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works - Visual flow */}
      <section className="py-16 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground">
              A seamless research workflow from start to finish
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-4 lg:gap-8">
            {[
              { icon: Database, label: "Store", desc: "Organize your research", color: "from-blue-500 to-indigo-600" },
              { icon: Search, label: "Search", desc: "Find & export data", color: "from-orange-500 to-red-500" },
              { icon: FileText, label: "Explore", desc: "Search inside PDFs", color: "from-emerald-500 to-teal-600" },
              { icon: Globe, label: "Discover", desc: "Global book search", color: "from-purple-500 to-pink-500" },
            ].map((item, index) => (
              <div 
                key={item.label}
                className="flex items-center gap-4"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center mb-3 shadow-lg`}>
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <p className="font-semibold text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                {index < 3 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground/50 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate via-slate-dark to-slate relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-20 w-64 h-64 bg-gold rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge variant="outline" className="mb-6 bg-white/10 border-white/20 text-white">
            <Users className="h-3.5 w-3.5 mr-2" />
            Join Our Community
          </Badge>
          
          <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
            Ready to Start Your Research?
          </h2>
          <p className="text-white/70 mb-10 max-w-lg mx-auto">
            Join our scholarly community and get access to all research tools. 
            Registered scholars can also contribute to the research database.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              size="lg" 
              asChild
              className="bg-white text-slate hover:bg-white/90"
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
              className="border-white/30 text-white hover:bg-white/10"
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
