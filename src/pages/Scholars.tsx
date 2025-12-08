import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  Globe, 
  ArrowRight,
  Mail,
  MapPin
} from "lucide-react";

const scholars = [
  {
    id: 1,
    name: "Dr. Prabhakaran Jain",
    affiliation: "University of Mumbai",
    specialization: ["Agama Studies", "Prakrit Literature"],
    location: "Mumbai, India",
    contributions: 45,
    avatar: null,
  },
  {
    id: 2,
    name: "Prof. Sadhvi M.S.",
    affiliation: "Jain Research Institute",
    specialization: ["Philosophy", "Ethics"],
    location: "Ahmedabad, India",
    contributions: 78,
    avatar: null,
  },
  {
    id: 3,
    name: "Dr. Robert Zydenbos",
    affiliation: "Ludwig Maximilian University",
    specialization: ["Comparative Religion", "Jain Studies"],
    location: "Munich, Germany",
    contributions: 32,
    avatar: null,
  },
  {
    id: 4,
    name: "Dr. Jayanti Lal Jain",
    affiliation: "BHU Varanasi",
    specialization: ["Manuscript Studies", "Sanskrit"],
    location: "Varanasi, India",
    contributions: 56,
    avatar: null,
  },
];

const features = [
  {
    icon: BookOpen,
    title: "Research Access",
    description: "Access research tools and contribute to SodhSanchay database",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Connect with fellow scholars and participate in research projects",
  },
  {
    icon: Globe,
    title: "Publications",
    description: "Share your work and get it featured in our research repository",
  },
];

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
            <p className="font-body text-muted-foreground animate-fade-up delay-200">
              Join our community of scholars dedicated to advancing Jain studies 
              and preserving ancient wisdom through rigorous research.
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

      {/* Scholar Benefits */}
      <section className="py-12 bg-secondary/30 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={feature.title}
                className="flex items-start gap-4 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {feature.title}
                  </h3>
                  <p className="font-body text-muted-foreground">
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
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Featured Scholars
            </h2>
            <p className="font-body text-muted-foreground">
              Distinguished members of our research community
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {scholars.map((scholar, index) => (
              <Card 
                key={scholar.id}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-primary-foreground font-display text-xl font-bold">
                      {scholar.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1">
                      <CardTitle className="font-heading text-lg mb-1">{scholar.name}</CardTitle>
                      <p className="font-body text-muted-foreground">{scholar.affiliation}</p>
                      <div className="flex items-center gap-1 font-body text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {scholar.location}
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {scholar.specialization.map((spec) => (
                      <Badge key={spec} variant="secondary" className="text-xs">
                        {spec}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-muted-foreground">
                      {scholar.contributions} research entries
                    </span>
                    <Button variant="ghost" size="sm">
                      View Profile
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
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
            Apply to join our scholarly community. Get access to research tools, 
            contribute to the knowledge base, and connect with fellow researchers.
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
    </Layout>
  );
};

export default Scholars;
