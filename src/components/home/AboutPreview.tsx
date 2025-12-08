import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2, Image } from "lucide-react";
import { gurudevBio, galleryImages } from "@/data/gurudevData";

const highlights = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access Guruvani - profound discourses and written works",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the lineage and contributions of disciples",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum preserving Gurudev's legacy",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-spiritual">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div>
              <p className="text-primary font-medium mb-2">About Gurudev</p>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Muni Jambuvijayji Maharaj Saheb
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {gurudevBio.shortBio}
              </p>
            </div>

            {/* Quote */}
            <div className="relative bg-card rounded-xl p-6 border border-primary/10 shadow-soft">
              <Quote className="absolute top-4 left-4 h-8 w-8 text-primary/20" />
              <blockquote className="pl-8 italic text-foreground">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-3 pl-8 text-sm text-muted-foreground">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="subtle" size="lg" asChild>
                <Link to="/about/gurudev">
                  Read Full Biography
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/gallery">
                  <Image className="h-4 w-4 mr-2" />
                  Photo Gallery
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Side - Photo + Highlights */}
          <div className="space-y-6">
            {/* Photo Grid Preview */}
            <div className="grid grid-cols-3 gap-2 mb-6">
              {galleryImages.slice(0, 3).map((image, index) => (
                <Link 
                  key={index}
                  to="/gallery"
                  className="aspect-square rounded-xl overflow-hidden group shadow-soft hover:shadow-elevated transition-all"
                >
                  <img
                    src={image.thumb}
                    alt={image.alt || `Gurudev Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </Link>
              ))}
            </div>

            {/* Highlights */}
            {highlights.map((item, index) => (
              <div 
                key={item.title}
                className="group flex gap-4 p-4 rounded-xl bg-card/50 hover:bg-card border border-transparent hover:border-primary/10 transition-all duration-300 animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="pt-4 flex flex-wrap gap-4">
              <Button variant="outline" asChild>
                <Link to="/about/parivar">Gurudev Parivar</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/about/gyan-kendra">Gyan Kendra</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
