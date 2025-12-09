import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, Users, Building2, Image, BookOpen, Award, Calendar } from "lucide-react";
import { gurudevBio, galleryImages } from "@/data/gurudevData";
import { AnimatedContainer } from "@/components/ui/animated-container";

const achievements = [
  {
    icon: BookOpen,
    value: "45+",
    label: "Published Works",
    description: "Agamas & scholarly texts",
  },
  {
    icon: Scroll,
    value: "5000+",
    label: "Manuscripts",
    description: "Preserved & cataloged",
  },
  {
    icon: Award,
    value: "86",
    label: "Years of Service",
    description: "Dedicated to Jain wisdom",
  },
  {
    icon: Users,
    value: "100+",
    label: "Disciples",
    description: "Continuing the legacy",
  },
];

const highlights = [
  {
    icon: Scroll,
    title: "Sacred Teachings (Guruvani)",
    description: "Access profound discourses and written works from Gurudev's lifetime of spiritual study",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the spiritual lineage and contributions of dedicated disciples",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Jambuji Gyan Kendra",
    description: "Digital museum preserving Gurudev's legacy for future generations",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-spiritual relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
            <Award className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground font-medium">About Gurudev</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Muni <span className="text-gradient-gold">Jambuvijayji</span> Maharaj Saheb
          </h2>
          <p className="font-body text-lg text-primary mb-2">{gurudevBio.hindiName}</p>
          <p className="font-body text-muted-foreground flex items-center justify-center gap-2">
            <Calendar className="h-4 w-4" />
            {gurudevBio.birthYear} – {gurudevBio.deathYear} • {gurudevBio.birthPlace}
          </p>
        </AnimatedContainer>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-14">
          {/* Left - Image & Gallery */}
          <AnimatedContainer animation="fade-up" delay={100}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative rounded-2xl overflow-hidden shadow-elevated group mb-6">
                <img
                  src={gurudevBio.mainImage}
                  alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="font-heading text-xl font-semibold text-foreground">
                    आगमप्रज्ञ (Agam Pragya)
                  </p>
                  <p className="text-muted-foreground text-sm">
                    Master of Jain Canonical Literature
                  </p>
                </div>
              </div>

              {/* Gallery Preview */}
              <div className="grid grid-cols-4 gap-2">
                {galleryImages.slice(0, 4).map((image, index) => (
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
              <div className="mt-4 text-center">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/gallery">
                    <Image className="h-4 w-4 mr-2" />
                    View Full Gallery
                  </Link>
                </Button>
              </div>
            </div>
          </AnimatedContainer>

          {/* Right - Bio & Details */}
          <div className="space-y-8">
            {/* Bio */}
            <AnimatedContainer animation="fade-up" delay={200}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed">
                {gurudevBio.shortBio}
              </p>
            </AnimatedContainer>

            {/* Quote */}
            <AnimatedContainer animation="fade-up" delay={300}>
              <div className="relative bg-card rounded-2xl p-6 border border-primary/10 shadow-soft">
                <Quote className="absolute top-4 left-4 h-10 w-10 text-primary/10" />
                <blockquote className="font-body text-lg pl-8 italic text-foreground leading-relaxed">
                  "The pursuit of knowledge is the path to liberation. Through study 
                  and contemplation, we illuminate the darkness of ignorance."
                </blockquote>
                <p className="mt-4 pl-8 font-body text-muted-foreground flex items-center gap-2">
                  <span className="w-8 h-px bg-primary/30" />
                  Gurudev Muni Jambuvijayji
                </p>
              </div>
            </AnimatedContainer>

            {/* Achievements */}
            <AnimatedContainer animation="fade-up" delay={400}>
              <div className="grid grid-cols-2 gap-4">
                {achievements.map((item, index) => (
                  <div 
                    key={item.label}
                    className="p-4 rounded-xl bg-card/50 border border-border/50 hover:border-primary/20 hover:shadow-soft transition-all"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="font-heading text-2xl font-bold text-primary">{item.value}</span>
                    </div>
                    <p className="font-heading font-semibold text-foreground text-sm">{item.label}</p>
                    <p className="font-body text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </AnimatedContainer>

            {/* CTA */}
            <AnimatedContainer animation="fade-up" delay={500}>
              <div className="flex flex-wrap gap-4">
                <Button variant="hero" size="lg" asChild className="group">
                  <Link to="/about/gurudev">
                    Read Full Biography
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </AnimatedContainer>
          </div>
        </div>

        {/* Highlights Cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((item, index) => (
            <AnimatedContainer 
              key={item.title}
              animation="fade-up"
              delay={600 + index * 100}
            >
              <Link to={item.href} className="group block h-full">
                <div className="h-full p-6 rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-heading font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <span>Explore</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
