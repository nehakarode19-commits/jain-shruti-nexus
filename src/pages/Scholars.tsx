import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Globe, 
  ArrowRight,
  Mail,
  MapPin,
  FileText,
  Award,
  UserCheck,
  Quote,
  Scroll,
  Search,
  Building2,
  BookMarked,
  Library,
  Languages,
  History,
  Sparkles,
  Star,
  TrendingUp,
  ExternalLink
} from "lucide-react";

// Import scholar profile images
import scholarMale1 from "@/assets/scholars/scholar-male-1.jpg";
import scholarFemale1 from "@/assets/scholars/scholar-female-1.jpg";
import scholarMale2 from "@/assets/scholars/scholar-male-2.jpg";
import scholarMale3 from "@/assets/scholars/scholar-male-3.jpg";
import scholarFemale2 from "@/assets/scholars/scholar-female-2.jpg";
import scholarMale4 from "@/assets/scholars/scholar-male-4.jpg";

const scholars = [
  {
    id: 1,
    name: "Dr. Prabhakaran Jain",
    affiliation: "University of Mumbai",
    specialization: ["Agama Studies", "Prakrit Literature"],
    location: "Mumbai, India",
    country: "India",
    contributions: 45,
    publications: 28,
    citations: 156,
    manuscripts: 12,
    badge: "gold",
    avatar: scholarMale1,
  },
  {
    id: 2,
    name: "Prof. Sadhvi M.S.",
    affiliation: "Jain Research Institute",
    specialization: ["Philosophy", "Ethics"],
    location: "Ahmedabad, India",
    country: "India",
    contributions: 78,
    publications: 42,
    citations: 234,
    manuscripts: 18,
    badge: "gold",
    avatar: scholarFemale1,
  },
  {
    id: 3,
    name: "Dr. Robert Zydenbos",
    affiliation: "Ludwig Maximilian University",
    specialization: ["Comparative Religion", "Jain Studies"],
    location: "Munich, Germany",
    country: "Germany",
    contributions: 32,
    publications: 19,
    citations: 87,
    manuscripts: 5,
    badge: "blue",
    avatar: scholarMale2,
  },
  {
    id: 4,
    name: "Dr. Jayanti Lal Jain",
    affiliation: "BHU Varanasi",
    specialization: ["Manuscript Studies", "Sanskrit"],
    location: "Varanasi, India",
    country: "India",
    contributions: 56,
    publications: 31,
    citations: 178,
    manuscripts: 24,
    badge: "gold",
    avatar: scholarMale3,
  },
  {
    id: 5,
    name: "Dr. Ananya Sharma",
    affiliation: "SOAS University of London",
    specialization: ["Jain Philosophy", "Linguistics"],
    location: "London, UK",
    country: "UK",
    contributions: 23,
    publications: 15,
    citations: 62,
    manuscripts: 3,
    badge: "blue",
    avatar: scholarFemale2,
  },
  {
    id: 6,
    name: "Dr. Mahesh Patel",
    affiliation: "Gujarat University",
    specialization: ["History", "Manuscriptology"],
    location: "Ahmedabad, India",
    country: "India",
    contributions: 12,
    publications: 8,
    citations: 24,
    manuscripts: 6,
    badge: "gray",
    avatar: scholarMale4,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Research Access",
    description: "Access comprehensive databases, rare manuscripts, and advanced research tools designed for Jain scholarship.",
    href: "/research",
    cta: "Explore →",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Connect with fellow scholars worldwide, share insights, and collaborate on groundbreaking research projects.",
    href: "/scholars",
    cta: "Connect →",
  },
  {
    icon: FileText,
    title: "Publications",
    description: "Submit and publish your research papers, articles, and findings to reach a global academic audience.",
    href: "/articles",
    cta: "Publish →",
  },
  {
    icon: UserCheck,
    title: "Scholar Profile",
    description: "Build your verified researcher identity, showcase your work, and establish credibility in Jain studies.",
    href: "/auth",
    cta: "Get Verified →",
  },
];

const highlights = [
  {
    icon: FileText,
    title: "Publications",
    value: "250+",
    description: "Research papers, studies & articles",
  },
  {
    icon: Building2,
    title: "Collaborations",
    value: "45+",
    description: "Global university partnerships",
  },
  {
    icon: Scroll,
    title: "Research Domains",
    value: "12",
    description: "Philosophy, Agama, Prakrit, Manuscripts",
  },
  {
    icon: Globe,
    title: "Countries",
    value: "18",
    description: "Scholars from around the world",
  },
];

const benefits = [
  {
    icon: Scroll,
    title: "Access Rare Manuscripts",
    description: "Get exclusive access to rare manuscripts and research tools from our comprehensive database.",
  },
  {
    icon: Globe,
    title: "Global Collaboration",
    description: "Connect and collaborate with leading scholars and researchers from around the world.",
  },
  {
    icon: Award,
    title: "Get Featured & Published",
    description: "Showcase your research and get your work featured in our scholarly publications.",
  },
];

const researchDomains = [
  { icon: BookMarked, name: "Agama Studies", count: 45 },
  { icon: Sparkles, name: "Jain Philosophy", count: 38 },
  { icon: Languages, name: "Prakrit & Sanskrit", count: 32 },
  { icon: Scroll, name: "Manuscriptology", count: 28 },
  { icon: History, name: "Jain History", count: 24 },
  { icon: Library, name: "Tattvartha Sutra", count: 19 },
];

const featuredPublications = [
  {
    title: "The Doctrine of Karma in Jain Philosophy",
    author: "Dr. Prabhakaran Jain",
    journal: "Journal of Jain Studies",
    year: 2024,
    citations: 45,
  },
  {
    title: "Prakrit Manuscripts: A Digital Preservation Study",
    author: "Prof. Sadhvi M.S.",
    journal: "Indian Manuscript Studies",
    year: 2023,
    citations: 32,
  },
  {
    title: "Comparative Analysis of Jain and Buddhist Ethics",
    author: "Dr. Robert Zydenbos",
    journal: "Asian Philosophy Review",
    year: 2023,
    citations: 28,
  },
];

const getBadgeStyle = (badge: string) => {
  switch (badge) {
    case "gold":
      return "bg-amber-100 text-amber-700 border-amber-200";
    case "blue":
      return "bg-blue-100 text-blue-700 border-blue-200";
    default:
      return "bg-muted text-muted-foreground border-border";
  }
};

const getBadgeLabel = (badge: string) => {
  switch (badge) {
    case "gold":
      return "Senior Scholar";
    case "blue":
      return "Active Scholar";
    default:
      return "New Scholar";
  }
};

const Scholars = () => {
  return (
    <Layout>
      {/* Enhanced Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        <div className="container mx-auto px-4 relative">
          <AnimatedContainer animation="fade-up" className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-primary font-medium">Scholar Portal</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Scholars & Researchers
            </h1>
            <p className="font-body text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              Join our global community of scholars dedicated to advancing Jain studies, 
              manuscript research, and the preservation of ancient wisdom.
            </p>
            <p className="font-body text-muted-foreground max-w-xl mx-auto mb-8">
              Connect with leading researchers, access rare manuscripts, and contribute to 
              the scholarly understanding of Jain philosophy and literature.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="hero" size="lg" asChild className="shadow-elevated">
                <Link to="/auth">
                  <GraduationCap className="h-5 w-5 mr-2" />
                  Join as Scholar
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/research">
                  <Search className="h-5 w-5 mr-2" />
                  Explore Research Tools
                </Link>
              </Button>
            </div>
          </AnimatedContainer>
        </div>
      </section>

      {/* Core Scholar Tools */}
      <section className="py-14 lg:py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-2">
              Core Scholar Tools
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Everything you need to advance your research in Jain studies
            </p>
          </AnimatedContainer>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <AnimatedContainer 
                key={feature.title}
                animation="fade-up"
                delay={index * 100}
              >
                <Link to={feature.href}>
                  <Card className="h-full bg-card border border-border/50 shadow-md hover:shadow-lg hover:-translate-y-1 transition-all duration-300 rounded-2xl overflow-hidden group cursor-pointer">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors">
                        <feature.icon className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-body text-muted-foreground text-sm leading-relaxed mb-4 line-clamp-3">
                        {feature.description}
                      </p>
                      <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                        {feature.cta}
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Scholar Directory */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-10">
            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Featured Scholars
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Distinguished members of our research community making significant contributions to Jain studies
            </p>
          </AnimatedContainer>

          {/* Smart Filters */}
          <AnimatedContainer animation="fade-up" delay={100}>
            <Card variant="flat" className="mb-10">
              <CardContent className="p-4">
                <div className="flex flex-wrap items-center justify-center gap-3">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Search className="h-4 w-4" />
                    <span className="text-sm font-medium">Filter:</span>
                  </div>
                  <Select>
                    <SelectTrigger className="w-[160px] h-10 bg-background">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="agama">Agama</SelectItem>
                      <SelectItem value="philosophy">Philosophy</SelectItem>
                      <SelectItem value="manuscriptology">Manuscriptology</SelectItem>
                      <SelectItem value="linguistics">Linguistics</SelectItem>
                      <SelectItem value="history">History</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[140px] h-10 bg-background">
                      <SelectValue placeholder="Country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="india">India</SelectItem>
                      <SelectItem value="germany">Germany</SelectItem>
                      <SelectItem value="uk">UK</SelectItem>
                      <SelectItem value="usa">USA</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[160px] h-10 bg-background">
                      <SelectValue placeholder="Affiliation" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="university">University</SelectItem>
                      <SelectItem value="research-institute">Research Institute</SelectItem>
                      <SelectItem value="independent">Independent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[180px] h-10 bg-background">
                      <SelectValue placeholder="Sort By" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Most Active</SelectItem>
                      <SelectItem value="recent">Recently Updated</SelectItem>
                      <SelectItem value="senior">Senior Scholars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Scholar Cards with Photos */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {scholars.map((scholar, index) => (
              <AnimatedContainer 
                key={scholar.id}
                animation="fade-up"
                delay={index * 100}
              >
                <Card 
                  variant="feature"
                  className="h-full group hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start gap-4">
                      <div className="relative shrink-0">
                        <img 
                          src={scholar.avatar} 
                          alt={scholar.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-primary/20 group-hover:border-primary/40 transition-colors"
                        />
                        <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center ${
                          scholar.badge === 'gold' ? 'bg-amber-500' : scholar.badge === 'blue' ? 'bg-blue-500' : 'bg-muted-foreground'
                        }`}>
                          <Star className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <CardTitle className="font-heading text-base truncate group-hover:text-primary transition-colors">
                            {scholar.name}
                          </CardTitle>
                        </div>
                        <p className="font-body text-muted-foreground text-sm truncate">{scholar.affiliation}</p>
                        <div className="flex items-center gap-1 text-muted-foreground text-xs mt-1">
                          <MapPin className="h-3 w-3" />
                          {scholar.country}
                        </div>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`text-xs w-fit mt-2 ${getBadgeStyle(scholar.badge)}`}
                    >
                      {getBadgeLabel(scholar.badge)}
                    </Badge>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {scholar.specialization.map((spec) => (
                        <Badge key={spec} variant="secondary" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                    
                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-border mb-3">
                      <div className="text-center">
                        <p className="font-heading font-bold text-foreground">{scholar.publications}</p>
                        <p className="text-[11px] text-muted-foreground">Publications</p>
                      </div>
                      <div className="text-center border-x border-border">
                        <p className="font-heading font-bold text-foreground">{scholar.citations}</p>
                        <p className="text-[11px] text-muted-foreground">Citations</p>
                      </div>
                      <div className="text-center">
                        <p className="font-heading font-bold text-foreground">{scholar.manuscripts}</p>
                        <p className="text-[11px] text-muted-foreground">Manuscripts</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-body text-muted-foreground text-sm">
                        {scholar.contributions} entries
                      </span>
                      <Button variant="ghost" size="sm" className="text-xs group-hover:text-primary">
                        View Profile
                        <ArrowRight className="h-3 w-3 ml-1 group-hover:translate-x-0.5 transition-transform" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>

          <AnimatedContainer animation="fade-up" delay={600} className="text-center mt-10">
            <Button variant="outline" size="lg" asChild>
              <Link to="/scholars/directory">
                View All Scholars
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </AnimatedContainer>
        </div>
      </section>

      {/* Scholar Highlights Stats Row */}
      <section className="py-16 bg-gradient-spiritual border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Scholar Highlights
            </h2>
            <p className="font-body text-muted-foreground">
              Impact and reach of our global research community
            </p>
          </AnimatedContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {highlights.map((item, index) => (
              <AnimatedContainer 
                key={item.title}
                animation="scale-in"
                delay={index * 100}
              >
                <Card 
                  variant="glass" 
                  className="text-center h-full hover:shadow-elevated hover:-translate-y-1 transition-all duration-300"
                >
                  <CardContent className="pt-6 pb-5">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 shadow-sm">
                      <item.icon className="h-7 w-7 text-primary" />
                    </div>
                    <p className="font-heading text-3xl lg:text-4xl font-bold text-primary mb-1">{item.value}</p>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{item.title}</h3>
                    <p className="font-body text-muted-foreground text-sm">{item.description}</p>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Why Become a Scholar - Cards */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-12">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Why Become a Scholar?
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Join our network and unlock exclusive benefits for your research journey
            </p>
          </AnimatedContainer>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <AnimatedContainer 
                key={benefit.title}
                animation="fade-up"
                delay={index * 150}
              >
                <Card variant="feature" className="h-full text-center hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-8 pb-6">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5 shadow-sm">
                      <benefit.icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold text-foreground mb-3">
                      {benefit.title}
                    </h3>
                    <p className="font-body text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Top Research Domains Grid */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Top Research Domains
            </h2>
            <p className="font-body text-muted-foreground">
              Explore the key areas of Jain scholarship and research
            </p>
          </AnimatedContainer>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-6xl mx-auto">
            {researchDomains.map((domain, index) => (
              <AnimatedContainer 
                key={domain.name}
                animation="scale-in"
                delay={index * 75}
              >
                <Card 
                  variant="interactive" 
                  className="text-center cursor-pointer group"
                >
                  <CardContent className="py-5 px-3">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <domain.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="font-heading font-medium text-foreground text-sm mb-1 group-hover:text-primary transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {domain.count} publications
                    </p>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Publications Section */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-up" className="text-center mb-10">
            <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-3">
              Featured Publications
            </h2>
            <p className="font-body text-muted-foreground max-w-lg mx-auto">
              Recent notable research contributions from our scholarly community
            </p>
          </AnimatedContainer>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {featuredPublications.map((pub, index) => (
              <AnimatedContainer 
                key={pub.title}
                animation="fade-up"
                delay={index * 100}
              >
                <Card variant="feature" className="h-full group hover:shadow-elevated hover:-translate-y-1 transition-all duration-300">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs text-muted-foreground">{pub.journal}</p>
                        <p className="text-xs text-muted-foreground">{pub.year}</p>
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {pub.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{pub.author}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <TrendingUp className="h-4 w-4" />
                        <span>{pub.citations} citations</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-xs">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Read
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>
        </div>
      </section>

      {/* Upgraded Become a Scholar CTA */}
      <section className="py-16 lg:py-20 bg-gradient-spiritual border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <AnimatedContainer animation="fade-up">
              <Card variant="elevated" className="overflow-hidden">
                <CardContent className="p-8 lg:p-12 text-center relative">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary" />
                  
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>
                  
                  <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mb-4">
                    Become a Contributing Scholar
                  </h2>
                  
                  <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">
                    Apply to join our scholarly network. Get access to research tools, 
                    contribute your work, and collaborate with fellow researchers worldwide.
                  </p>

                  {/* Quote */}
                  <div className="bg-secondary/50 rounded-xl p-5 mb-8 max-w-md mx-auto">
                    <Quote className="h-6 w-6 text-primary/40 mx-auto mb-2" />
                    <p className="font-body text-muted-foreground italic text-sm">
                      "Knowledge shared is knowledge multiplied."
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="hero" size="lg" asChild className="shadow-elevated">
                      <Link to="/auth">
                        Apply Now
                        <ArrowRight className="h-5 w-5 ml-2" />
                      </Link>
                    </Button>
                    <Button variant="outline" size="lg" asChild>
                      <Link to="/contact">
                        <Mail className="h-5 w-5 mr-2" />
                        Contact Us
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </AnimatedContainer>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-14 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-in" className="max-w-2xl mx-auto text-center">
            <div className="h-px w-16 bg-primary/30 mx-auto mb-6" />
            <Quote className="h-10 w-10 text-primary/20 mx-auto mb-4" />
            <blockquote className="font-body text-xl text-muted-foreground italic mb-4">
              "The pursuit of knowledge is the path to liberation."
            </blockquote>
            <p className="font-heading text-sm font-semibold text-foreground">
              — Gurudev Muni Jambuvijayji
            </p>
            <div className="h-px w-16 bg-primary/30 mx-auto mt-6" />
          </AnimatedContainer>
        </div>
      </section>
    </Layout>
  );
};

export default Scholars;
