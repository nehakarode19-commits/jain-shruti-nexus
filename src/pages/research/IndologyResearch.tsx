import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  Search, 
  Database, 
  Users, 
  FileText, 
  Globe, 
  Layers, 
  GitBranch,
  Brain,
  Microscope,
  Library,
  Network,
  BookMarked,
  Languages,
  Scroll,
  ArrowRight,
  CheckCircle,
  Sparkles,
  MessageSquare,
  GraduationCap,
  Building2
} from "lucide-react";

const manuscriptTools = [
  {
    icon: Microscope,
    title: "Paleographic Analysis",
    description: "Advanced tools for analyzing ancient scripts, dating manuscripts, and identifying scribal hands across Jain literature.",
    features: ["Script identification", "Dating estimation", "Comparative analysis"]
  },
  {
    icon: Layers,
    title: "Codicological Studies",
    description: "Comprehensive examination of physical manuscript features including materials, binding, and preservation state.",
    features: ["Material analysis", "Binding techniques", "Conservation assessment"]
  },
  {
    icon: Languages,
    title: "Linguistic Analysis",
    description: "Multi-language support for Sanskrit, Prakrit, Apabhramsha, and Gujarati text analysis with transliteration tools.",
    features: ["Transliteration", "Grammar parsing", "Etymology tracking"]
  },
  {
    icon: Brain,
    title: "AI-Powered OCR",
    description: "State-of-the-art optical character recognition trained on Jain manuscripts for accurate text extraction.",
    features: ["Handwriting recognition", "Damaged text recovery", "Batch processing"]
  }
];

const databases = [
  {
    icon: Library,
    title: "Jain Agam Database",
    description: "Complete searchable collection of canonical Jain texts with multiple commentaries and cross-references.",
    records: "45,000+ texts",
    link: "/research/shabdasangraha"
  },
  {
    icon: BookMarked,
    title: "Manuscript Catalog",
    description: "Detailed catalog of Jain manuscripts from collections across India and international repositories.",
    records: "12,000+ manuscripts",
    link: "/library"
  },
  {
    icon: FileText,
    title: "Research Archive",
    description: "Published research papers, dissertations, and articles on Jain philosophy, history, and literature.",
    records: "8,500+ papers",
    link: "/research/sodhsandarbh"
  },
  {
    icon: Globe,
    title: "Epigraphic Records",
    description: "Collection of Jain inscriptions from temples, caves, and archaeological sites with translations.",
    records: "3,200+ inscriptions",
    link: "/research/sodhsanchay"
  }
];

const collaborationOpportunities = [
  {
    icon: Users,
    title: "Research Partnerships",
    description: "Collaborate with international scholars and institutions on joint research projects in Jain studies.",
    cta: "Join Network",
    link: "/scholars"
  },
  {
    icon: Building2,
    title: "Institutional Collaboration",
    description: "Partner with universities, libraries, and museums for manuscript digitization and preservation projects.",
    cta: "Partner With Us",
    link: "/contact"
  },
  {
    icon: GraduationCap,
    title: "Academic Programs",
    description: "Participate in certificate courses, workshops, and seminars on Jain manuscripts and Indology.",
    cta: "Browse Courses",
    link: "/learning/courses"
  },
  {
    icon: MessageSquare,
    title: "Discussion Forum",
    description: "Engage with the scholarly community through academic discussions and peer review platforms.",
    cta: "Join Discussion",
    link: "/scholar/feed"
  }
];

const researchDomains = [
  { name: "Jain Philosophy (Darśana)", icon: "🕉️", papers: 2450 },
  { name: "Jain Logic (Nyāya)", icon: "⚖️", papers: 890 },
  { name: "Jain Literature (Sāhitya)", icon: "📜", papers: 1820 },
  { name: "Jain History & Archaeology", icon: "🏛️", papers: 1340 },
  { name: "Jain Art & Iconography", icon: "🎨", papers: 720 },
  { name: "Prakrit & Sanskrit Studies", icon: "📖", papers: 1560 },
  { name: "Comparative Religion", icon: "🔍", papers: 680 },
  { name: "Manuscript Studies", icon: "📚", papers: 1240 }
];

const institutions = [
  "L.D. Institute of Indology, Ahmedabad",
  "Bhandarkar Oriental Research Institute, Pune",
  "Oriental Research Institute, Mysore",
  "School of Oriental and African Studies, London",
  "Centre for Jain Studies, SOAS",
  "University of Chicago Divinity School",
  "Deccan College, Pune",
  "Asiatic Society of Mumbai"
];

export default function IndologyResearch() {
  return (
    <Layout>
      <SEO
        title="Jain Indology Research | Muni Jambuvijayaji Research Center"
        description="Explore advanced manuscript analysis tools, cross-reference databases, and collaboration opportunities in Jain Indology research at Muni Jambuvijayaji Research Center."
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-b from-secondary/50 to-background overflow-hidden">
        <div className="absolute inset-0 bg-[url('/pattern-jain.svg')] opacity-5" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="w-3 h-3 mr-1" />
              Jain Indology Research Hub
            </Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Advancing Jain <span className="text-primary">Indological Studies</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              Discover cutting-edge tools for manuscript analysis, access comprehensive cross-reference databases, 
              and connect with the global community of Jain scholars and researchers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/research">
                  <Search className="w-5 h-5 mr-2" />
                  Explore Research Tools
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/scholars">
                  <Users className="w-5 h-5 mr-2" />
                  Join Scholar Network
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Manuscript Analysis Tools */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Manuscript Analysis Tools
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              State-of-the-art digital tools designed specifically for analyzing, preserving, and studying Jain manuscripts and texts.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {manuscriptTools.map((tool, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30">
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <div>
                      <CardTitle className="text-xl mb-2">{tool.title}</CardTitle>
                      <CardDescription className="text-base">{tool.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {tool.features.map((feature, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Cross-Reference Databases */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Cross-Reference Databases
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access interconnected databases covering canonical texts, manuscripts, research papers, and epigraphic records.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {databases.map((db, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 text-center">
                <CardHeader>
                  <div className="mx-auto p-4 rounded-full bg-primary/10 text-primary mb-4 w-fit group-hover:scale-110 transition-transform">
                    <db.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="text-lg">{db.title}</CardTitle>
                  <Badge className="mx-auto bg-gold/20 text-gold-foreground border-gold/30">
                    {db.records}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">{db.description}</p>
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link to={db.link}>
                      Access Database
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Research Domains */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Research Domains
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore diverse areas of Jain Indological research with thousands of scholarly contributions.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {researchDomains.map((domain, index) => (
              <Card key={index} className="p-4 hover:shadow-md transition-all cursor-pointer hover:border-primary/30 group">
                <div className="text-center">
                  <span className="text-3xl mb-2 block">{domain.icon}</span>
                  <h3 className="font-medium text-sm mb-1 group-hover:text-primary transition-colors">{domain.name}</h3>
                  <p className="text-xs text-muted-foreground">{domain.papers.toLocaleString()} papers</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Collaboration Opportunities */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Collaboration Opportunities
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Connect with the global scholarly community and contribute to the advancement of Jain Indological research.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {collaborationOpportunities.map((opp, index) => (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="mx-auto p-4 rounded-full bg-primary/10 text-primary mb-4 w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <opp.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-lg">{opp.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{opp.description}</p>
                  <Button size="sm" asChild className="w-full">
                    <Link to={opp.link}>
                      {opp.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Institutions */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Partner Institutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Collaborating with leading academic institutions and research centers worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {institutions.map((institution, index) => (
              <div key={index} className="p-4 bg-secondary/50 rounded-lg text-center hover:bg-secondary transition-colors">
                <Building2 className="w-6 h-6 mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">{institution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Research Methodology
              </h2>
              <p className="text-muted-foreground">
                Our integrated approach to Jain Indological research combines traditional scholarship with modern technology.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">01</div>
                <h3 className="font-semibold mb-2">Discovery & Acquisition</h3>
                <p className="text-sm text-muted-foreground">
                  Systematic identification and cataloging of manuscripts from repositories worldwide.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">02</div>
                <h3 className="font-semibold mb-2">Digitization & Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  High-resolution scanning, OCR processing, and multi-layered textual analysis.
                </p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">03</div>
                <h3 className="font-semibold mb-2">Publication & Access</h3>
                <p className="text-sm text-muted-foreground">
                  Open access publication and integration into searchable databases for scholars.
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-6">
            Begin Your Research Journey
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Access world-class resources, connect with leading scholars, and contribute to the preservation 
            and advancement of Jain knowledge and heritage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link to="/scholar/login">
                <GraduationCap className="w-5 h-5 mr-2" />
                Register as Scholar
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" asChild>
              <Link to="/contact">
                Contact Research Team
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
