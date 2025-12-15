import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useCMSContent } from "@/hooks/useCMSContent";
import { 
  ArrowRight, 
  BookOpen, 
  Users, 
  Building2, 
  Lightbulb, 
  Target, 
  Heart,
  Scroll
} from "lucide-react";

const visionItems = [
  {
    icon: Lightbulb,
    title: "Preserve",
    description: "Safeguard ancient Jain texts, manuscripts, and teachings for future generations",
  },
  {
    icon: Target,
    title: "Research",
    description: "Enable scholars worldwide to explore, study, and contribute to Jain knowledge",
  },
  {
    icon: Heart,
    title: "Connect",
    description: "Build a global community united by the pursuit of spiritual wisdom",
  },
];

const sections = [
  {
    icon: Scroll,
    title: "Gurudev Muni Jambuvijayaji Maharaj Saheb",
    description: "Explore the life, teachings, and legacy of the revered Jain saint and scholar",
    href: "/about/gurudev",
  },
  {
    icon: Users,
    title: "Legacy of Pujyapad Muni Jambuvijayaji Maharaj",
    description: "Learn about the lineage, disciples, and their contributions",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Muni Jambuvijayaji Research Center",
    description: "Visit our digital museum preserving Gurudev's creations and works",
    href: "/about/gyan-kendra",
  },
];

const About = () => {
  const cmsContent = useCMSContent();

  return (
    <Layout>
      <SEO 
        title="About"
        description="Learn about Jambushrusti - a comprehensive digital ecosystem dedicated to preserving and sharing the teachings of Gurudev Muni Jambuvijayaji Maharaj Saheb."
      />
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up">
              {cmsContent.aboutTitle}
            </h1>
            <p className="font-body text-muted-foreground animate-fade-up delay-100">
              {cmsContent.aboutDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Our Vision & Mission
            </h2>
            <p className="font-body text-muted-foreground max-w-2xl mx-auto">
              To create the world's most comprehensive and accessible platform for 
              Jain scholarship and spiritual exploration.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {visionItems.map((item, index) => (
              <div 
                key={item.title}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 lg:py-24 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              What Jambushrusti Offers
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { title: "Guruvani Collection", desc: "Sacred discourses and teachings" },
              { title: "Research Ecosystem", desc: "Four integrated research tools" },
              { title: "Digital Library", desc: "Extensive catalog of Jain literature" },
              { title: "Scholar Portal", desc: "Community for researchers" },
              { title: "AI-Powered Search", desc: "Search inside PDFs and books" },
              { title: "Events & Workshops", desc: "Regular lectures and gatherings" },
            ].map((item, index) => (
              <Card 
                key={item.title}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <BookOpen className="h-6 w-6 text-primary mb-3" />
                  <h3 className="font-heading font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="font-body text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Sections */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-foreground mb-4">
              Explore More
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {sections.map((section, index) => (
              <Card 
                key={section.title}
                variant="interactive"
                className="group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="font-heading text-lg">{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-muted-foreground mb-4">
                    {section.description}
                  </p>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={section.href}>
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founding & Trust Info */}
      <section className="py-12 lg:py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="bg-card rounded-2xl p-8 shadow-elegant border border-border">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Founded By */}
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Heart className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-heading text-sm uppercase tracking-wider text-primary font-semibold">
                      Founded by
                    </p>
                  </div>
                  <p className="font-body text-foreground font-medium mb-1">
                    Srimati Shantaben Shantilal Bhudarmal Adani Family
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    Muni Jambuvijayaji Gyankendra<br />
                    (Muni Jambuvijayaji Research Centre)
                  </p>
                </div>
                
                {/* Run By */}
                <div className="text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Building2 className="h-4 w-4 text-primary" />
                    </div>
                    <p className="font-heading text-sm uppercase tracking-wider text-primary font-semibold">
                      Run by
                    </p>
                  </div>
                  <p className="font-body text-foreground font-medium mb-1">
                    Sri Siddhi-Bhuvan-Manohar Jain Trust
                  </p>
                  <p className="font-body text-muted-foreground text-sm">
                    (Regd. No. 3402) Ahmedabad
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
