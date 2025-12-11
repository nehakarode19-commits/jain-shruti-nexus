import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, BookOpen, FileText, Image, Users, Building2 } from "lucide-react";
import { gurudevBio } from "@/data/gurudevData";

const quickLinks = [
  { icon: BookOpen, label: "Books", href: "/books" },
  { icon: FileText, label: "Biography", href: "/about/gurudev" },
  { icon: Image, label: "Photo Gallery", href: "/gallery" },
];

const teachings = [
  {
    icon: Scroll,
    title: "Sacred Teachings",
    description: "Access sacred discourses and spiritual guidance",
    href: "/guruvani",
  },
  {
    icon: Users,
    title: "Gurudev Parivar",
    description: "Explore the lineage and spiritual family",
    href: "/about/parivar",
  },
  {
    icon: Building2,
    title: "Gyan Kendra",
    description: "Digital museum of Gurudev's legacy",
    href: "/about/gyan-kendra",
  },
];

export function AboutPreview() {
  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-background to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Content Section - Takes 3 columns */}
          <div className="lg:col-span-3 space-y-6">
            <div>
              <p className="text-orange font-semibold uppercase tracking-wider text-sm mb-4">
                About Gurudev
              </p>
              <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed">
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024). He was born into a devoutly religious family.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-background rounded-2xl p-6 border-l-4 border-orange relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-orange/20" />
              <blockquote className="text-primary italic text-lg leading-relaxed">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-3 text-sm text-muted-foreground font-medium">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white"
                asChild
              >
                <Link to="/about/gurudev">
                  Read More
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline"
                size="lg" 
                className="border-primary/30 text-primary hover:bg-primary/5"
                asChild
              >
                <Link to="/about/gurudev#timeline">
                  View Timeline
                </Link>
              </Button>
            </div>
          </div>

          {/* Image and Teachings Section - Takes 2 columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                className="w-full h-auto object-cover"
              />
              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
            </div>

            {/* Teaching Cards */}
            <div className="space-y-3">
              {teachings.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group flex items-center gap-4 bg-background rounded-xl p-4 hover:shadow-lg border border-transparent hover:border-border transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <item.icon className="h-6 w-6 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-base font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
