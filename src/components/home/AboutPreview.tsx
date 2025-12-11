import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Quote, Scroll, BookOpen, FileText, Image, Users, Building2 } from "lucide-react";

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
    <section className="py-16 lg:py-20 bg-card relative overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Content Section */}
          <div className="lg:col-span-3 space-y-5">
            <div>
              <p className="text-orange font-semibold uppercase tracking-wider text-xs mb-3 font-body">
                About Gurudev
              </p>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-5">
                Muni Jambuvijayji Maharaj Saheb
              </h2>
            </div>

            <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
              Jambuvijayji Maharaj Saheb (1923–2009), also known as Muni Jambuvijayji 
              Maharaj Saheb, was a Jain ascetic belonging to the Tapa Gaccha order of 
              Shvetambara sect of Jainism. Jambuvijayji dedicated his life to Prakrit 
              Grantha Prakashan where his scholars have been studying and researching 
              for decades (1965–2024). He was born into a devoutly religious family.
            </p>

            {/* Quick Links */}
            <div className="flex flex-wrap gap-2.5">
              {quickLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background border border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors text-sm font-medium font-body"
                >
                  <link.icon className="h-4 w-4" />
                  {link.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-background rounded-xl p-5 border-l-4 border-orange relative">
              <Quote className="absolute top-4 right-4 h-7 w-7 text-orange/20" />
              <blockquote className="text-primary italic text-[15px] leading-relaxed font-body">
                "The pursuit of knowledge is the path to liberation. Through study 
                and contemplation, we illuminate the darkness of ignorance."
              </blockquote>
              <p className="mt-2.5 text-xs text-muted-foreground font-medium font-body">
                — Gurudev Muni Jambuvijayji
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white h-10 px-5 text-sm font-body"
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
                className="border-border text-primary hover:bg-primary/5 h-10 px-5 text-sm font-body"
                asChild
              >
                <Link to="/about/gurudev#timeline">
                  View Timeline
                </Link>
              </Button>
            </div>
          </div>

          {/* Image and Teachings Section */}
          <div className="lg:col-span-2 space-y-5">
            {/* Image */}
            <div className="relative rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
                alt="Gurudev Muni Jambuvijayji Maharaj Saheb"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
            </div>

            {/* Teaching Cards */}
            <div className="space-y-2.5">
              {teachings.map((item) => (
                <Link
                  key={item.title}
                  to={item.href}
                  className="group flex items-center gap-3.5 bg-background rounded-lg p-3.5 hover:shadow-md border border-transparent hover:border-border transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                    <item.icon className="h-5 w-5 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-heading text-sm font-semibold text-primary group-hover:text-primary/80 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body">
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