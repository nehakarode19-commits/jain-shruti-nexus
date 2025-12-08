import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  Users, 
  Heart, 
  Scroll,
  BookOpen,
  GraduationCap,
  Star
} from "lucide-react";

const parivarMembers = [
  {
    name: "Pujya Muni Shri Namaskarvijayji Maharaj",
    role: "Beloved Disciple",
    description: "A devoted disciple who served Gurudev with unwavering dedication and continued his legacy of scholarship.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/101-min.jpg"
  },
  {
    name: "Pujya Muni Shri Purnarakshitvijayji Maharaj",
    role: "Spiritual Successor",
    description: "Carrying forward Gurudev's mission of preserving Jain scriptures and spreading spiritual knowledge.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/107-min.jpg"
  },
  {
    name: "Pujya Muni Shri Siddhisenvijayji Maharaj",
    role: "Scholar-Monk",
    description: "Dedicated to the study and propagation of Jain Agamas following Gurudev's scholarly traditions.",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg"
  },
];

const contributions = [
  {
    icon: BookOpen,
    title: "Manuscript Preservation",
    description: "Continuing the work of preserving and cataloging ancient Jain manuscripts across India"
  },
  {
    icon: GraduationCap,
    title: "Scholarly Training",
    description: "Training new generations of monks in Sanskrit, Prakrit, and Jain philosophy"
  },
  {
    icon: Scroll,
    title: "Publication Work",
    description: "Editing and publishing critical editions of Jain scriptures following Gurudev's methodology"
  },
  {
    icon: Users,
    title: "Community Outreach",
    description: "Conducting lectures, workshops, and spiritual discourses for the community"
  },
];

const GurudevParivar = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Spiritual Lineage</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Gurudev <span className="text-gradient-gold">Parivar</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              The disciples and spiritual successors of Gurudev Muni Jambuvijayji Maharaj Saheb, 
              continuing his legacy of scholarship, devotion, and service to Jain philosophy.
            </p>
          </div>
        </div>
      </section>

      {/* Lineage Introduction */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h2 className="font-display text-3xl font-bold text-foreground mb-6">
                  A Legacy of <span className="text-primary">Devotion</span>
                </h2>
                <p className="text-muted-foreground mb-4">
                  Gurudev Muni Jambuvijayji Maharaj Saheb's spiritual lineage continues through 
                  his devoted disciples who carry forward his mission of preserving and propagating 
                  Jain knowledge.
                </p>
                <p className="text-muted-foreground mb-6">
                  Each member of the Parivar has dedicated their life to the study of scriptures, 
                  service to the community, and the preservation of our ancient wisdom traditions.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {parivarMembers.slice(0, 3).map((member, i) => (
                      <div 
                        key={i} 
                        className="w-12 h-12 rounded-full border-2 border-background overflow-hidden"
                      >
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    Disciples continuing Gurudev's mission
                  </span>
                </div>
              </div>
              <div className="relative animate-fade-up delay-200">
                <div className="aspect-square rounded-2xl overflow-hidden shadow-elevated">
                  <img 
                    src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/107-min.jpg"
                    alt="Gurudev Parivar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center">
                  <Heart className="h-10 w-10 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parivar Members */}
      <section className="py-16 lg:py-20 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Members of the Parivar
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Distinguished monks who received their spiritual training and guidance from Gurudev
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {parivarMembers.map((member, index) => (
              <Card 
                key={member.name}
                variant="feature"
                className="overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="h-4 w-4 text-gold" />
                    <span className="text-sm text-primary font-medium">{member.role}</span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contributions */}
      <section className="py-16 lg:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold text-foreground mb-4">
              Continuing Gurudev's Mission
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The Parivar actively contributes to preserving and spreading Jain knowledge
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {contributions.map((item, index) => (
              <Card 
                key={item.title}
                variant="interactive"
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Learn More About Our Spiritual Heritage
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Explore Gurudev's life, teachings, and the Gyan Kendra dedicated to preserving his legacy
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/about/gurudev">
                Gurudev's Biography
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about/gyan-kendra">
                Visit Gyan Kendra
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GurudevParivar;