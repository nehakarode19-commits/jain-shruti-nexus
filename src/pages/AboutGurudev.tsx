import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  ArrowRight, 
  BookOpen, 
  Globe, 
  Award, 
  Quote,
  Scroll,
  Calendar
} from "lucide-react";

const milestones = [
  { year: "1923", event: "Birth and early life" },
  { year: "1946", event: "Initiation into monkhood (Diksha)" },
  { year: "1960s", event: "Began extensive manuscript research" },
  { year: "1970s", event: "Published critical editions of Agamas" },
  { year: "1980s", event: "International recognition for scholarly work" },
  { year: "2000s", event: "Continued teaching and research" },
];

const achievements = [
  {
    icon: BookOpen,
    title: "Scholarly Works",
    description: "Authored and edited over 50 critical editions of Jain Agamas and philosophical texts",
  },
  {
    icon: Globe,
    title: "Languages Mastered",
    description: "Proficient in Sanskrit, Prakrit, Ardhamagadhi, Gujarati, Hindi, and other classical languages",
  },
  {
    icon: Award,
    title: "Manuscript Preservation",
    description: "Catalogued and preserved thousands of rare Jain manuscripts across India",
  },
];

const AboutGurudev = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/about" 
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
            >
              ← Back to About
            </Link>
            
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-up">
                <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
                  Gurudev Muni Jambuvijayji Maharaj
                </h1>
                <p className="text-lg text-muted-foreground mb-6">
                  A towering figure in Jain scholarship, Gurudev dedicated his life to preserving 
                  and propagating the profound wisdom of Jain philosophy. His contributions to 
                  manuscript research and textual criticism remain unparalleled.
                </p>
                <Button variant="spiritual" asChild>
                  <Link to="/guruvani">
                    Explore Guruvani
                    <Scroll className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Image placeholder */}
              <div className="animate-fade-up delay-200">
                <div className="aspect-[4/5] rounded-2xl bg-gradient-to-br from-secondary via-card to-cream shadow-elevated overflow-hidden flex items-center justify-center">
                  <div className="text-center p-8">
                    <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center shadow-glow">
                      <Scroll className="h-16 w-16 text-primary-foreground" />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-foreground mb-2">
                      Gurudev Muni
                    </h3>
                    <p className="text-muted-foreground">
                      Jambuvijayji Maharaj
                    </p>
                    <p className="text-sm text-muted-foreground mt-2">
                      (1923 - 2009)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="py-12 bg-burgundy/5">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-10 w-10 text-burgundy/30 mx-auto mb-4" />
            <blockquote className="font-display text-xl sm:text-2xl italic text-foreground mb-4">
              "True knowledge illuminates the path of liberation. Through rigorous study 
              and unwavering devotion, one attains the wisdom that transcends worldly bonds."
            </blockquote>
            <p className="text-muted-foreground">— Gurudev Muni Jambuvijayji</p>
          </div>
        </div>
      </section>

      {/* Life Journey */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
            Life Journey
          </h2>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border" />

              {milestones.map((milestone, index) => (
                <div 
                  key={milestone.year}
                  className="relative pl-20 pb-8 animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="absolute left-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                    <Calendar className="h-4 w-4" />
                  </div>
                  <Card variant="default">
                    <CardContent className="p-4">
                      <p className="text-sm font-medium text-primary mb-1">{milestone.year}</p>
                      <p className="text-foreground">{milestone.event}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 lg:py-24 bg-gradient-spiritual">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-3xl font-bold text-foreground text-center mb-12">
            Contributions & Achievements
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {achievements.map((item, index) => (
              <Card 
                key={item.title}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {item.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Continue Exploring
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/about/parivar">
                Gurudev Parivar
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/about/jnan-kendra">
                Jnan Kendra
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/guruvani">
                Access Guruvani
                <Scroll className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default AboutGurudev;
