import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
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
  Building2
} from "lucide-react";

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
    avatar: null,
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
    avatar: null,
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
    avatar: null,
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
    avatar: null,
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
    avatar: null,
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
    avatar: null,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Research Access",
    description: "Access tools & databases",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Work with fellow scholars",
  },
  {
    icon: FileText,
    title: "Publications",
    description: "Share your work",
  },
  {
    icon: UserCheck,
    title: "Scholar Profile",
    description: "Verified researcher identity",
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
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6 animate-fade-up">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-primary">Scholar Portal</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Scholars & Researchers
            </h1>
            <p className="font-body text-muted-foreground animate-fade-up delay-200 max-w-2xl mx-auto">
              Join our global community of scholars dedicated to advancing Jain studies, 
              manuscript research, and the preservation of ancient wisdom through rigorous research.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8 animate-fade-up delay-300">
              <Button variant="hero" asChild>
                <Link to="/auth">
                  Join as Scholar
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/research">
                  Explore Research Tools
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Bar */}
      <section className="py-10 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex items-center gap-3 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">
                    {feature.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-xs">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholar Directory */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Featured Scholars
            </h2>
            <p className="font-body text-muted-foreground">
              Distinguished members of our research community
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-10 p-4 bg-secondary/20 rounded-xl border border-border">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Filter:</span>
            </div>
            <Select>
              <SelectTrigger className="w-[160px] h-9 text-sm">
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
              <SelectTrigger className="w-[140px] h-9 text-sm">
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
              <SelectTrigger className="w-[160px] h-9 text-sm">
                <SelectValue placeholder="Affiliation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="university">University</SelectItem>
                <SelectItem value="research-institute">Research Institute</SelectItem>
                <SelectItem value="independent">Independent</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Most Active</SelectItem>
                <SelectItem value="recent">Recently Updated</SelectItem>
                <SelectItem value="senior">Senior Scholars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Scholar Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {scholars.map((scholar, index) => (
              <Card 
                key={scholar.id}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-primary-foreground font-display text-lg font-bold shrink-0">
                      {scholar.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <CardTitle className="font-heading text-base mb-1 truncate">{scholar.name}</CardTitle>
                        <Badge 
                          variant="outline" 
                          className={`text-[10px] shrink-0 ${getBadgeStyle(scholar.badge)}`}
                        >
                          {getBadgeLabel(scholar.badge)}
                        </Badge>
                      </div>
                      <p className="font-body text-muted-foreground text-sm truncate">{scholar.affiliation}</p>
                      <div className="flex items-center gap-1 font-body text-muted-foreground text-xs mt-1">
                        <MapPin className="h-3 w-3" />
                        {scholar.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {scholar.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-2 py-3 border-t border-border">
                    <div className="text-center">
                      <p className="font-heading font-bold text-foreground text-sm">{scholar.publications}</p>
                      <p className="text-[10px] text-muted-foreground">Publications</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading font-bold text-foreground text-sm">{scholar.citations}</p>
                      <p className="text-[10px] text-muted-foreground">Citations</p>
                    </div>
                    <div className="text-center">
                      <p className="font-heading font-bold text-foreground text-sm">{scholar.manuscripts}</p>
                      <p className="text-[10px] text-muted-foreground">Manuscripts</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <span className="font-body text-muted-foreground text-sm">
                      {scholar.contributions} research entries
                    </span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Profile
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Scholar Highlights */}
      <section className="py-16 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
              Scholar Highlights
            </h2>
            <p className="font-body text-muted-foreground">
              Impact and reach of our research community
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {highlights.map((item, index) => (
              <Card 
                key={item.title} 
                variant="feature" 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-heading text-3xl font-bold text-primary mb-1">{item.value}</p>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="font-body text-muted-foreground text-sm">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Become a Scholar */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
              Why Become a Scholar?
            </h2>
            <p className="font-body text-muted-foreground">
              Join our network and unlock exclusive benefits
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {benefits.map((benefit, index) => (
              <div 
                key={benefit.title}
                className="flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 shadow-sm">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">
                    {benefit.title}
                  </h3>
                  <p className="font-body text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Become a Contributing Scholar
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-lg mx-auto">
            Apply to join our scholarly network. Get access to research tools, 
            contribute your work, and collaborate with fellow researchers.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/auth">
                Apply Now
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                <Mail className="h-4 w-4 mr-2" />
                Contact Us
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <Quote className="h-8 w-8 text-primary/30 mx-auto mb-4" />
            <blockquote className="font-body text-lg text-muted-foreground italic mb-4">
              "The pursuit of knowledge is the path to liberation."
            </blockquote>
            <p className="font-heading text-sm font-medium text-foreground">
              — Gurudev Muni Jambuvijayji
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Scholars;
