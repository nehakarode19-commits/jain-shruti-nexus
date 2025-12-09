import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2 } from "lucide-react";
import { gurudevBio, galleryImages } from "@/data/gurudevData";

const highlights = [
  {
    icon: Scroll,
    title: "Guruvani",
    description: "Sacred discourses and teachings",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Spiritual lineage and disciples",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum of legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-primary font-medium mb-2">About Gurudev</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
            Muni Jambuvijayji Maharaj Saheb
          </h2>
          <p className="text-lg text-primary/80 mt-2">{gurudevBio.hindiName}</p>
          <p className="text-muted-foreground mt-1">
            {gurudevBio.birthYear} – {gurudevBio.deathYear} • {gurudevBio.birthPlace}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Image - Smaller */}
          <div className="flex justify-center lg:justify-start">
            <div className="relative max-w-xs">
              <div className="rounded-2xl overflow-hidden shadow-elevated">
                <img
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full h-auto object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -bottom-3 -right-3 w-24 h-24 bg-primary/10 rounded-full -z-10" />
              <div className="absolute -top-3 -left-3 w-16 h-16 border-2 border-primary/20 rounded-full -z-10" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-6">
            <p className="text-muted-foreground text-lg leading-relaxed">
              {gurudevBio.shortBio}
            </p>

            {/* Quote */}
            <div className="bg-card rounded-xl p-6 border border-border/50 relative">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/10" />
              <blockquote className="pl-6 text-foreground italic">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-3 pl-6 text-sm text-muted-foreground">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-3 gap-3">
              {highlights.map((item) => (
                <Link 
                  key={item.title}
                  to={item.href}
                  className="group p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all text-center"
                >
                  <div className="w-10 h-10 mx-auto rounded-lg bg-primary/10 flex items-center justify-center mb-2 group-hover:bg-primary/20 transition-colors">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
                </Link>
              ))}
            </div>

            <Button variant="hero" size="lg" asChild>
              <Link to="/about/gurudev">
                Read Full Biography
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
