import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scroll, ArrowRight, BookOpen, Mic, FileText } from "lucide-react";

const guruvaniItems = [
  {
    type: "Discourse",
    icon: Mic,
    title: "On the Nature of Soul",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure...",
    category: "Sacred Teaching",
  },
  {
    type: "Written Work",
    icon: FileText,
    title: "Commentary on Tattvartha Sutra",
    excerpt: "A comprehensive examination of reality as presented in Jain scripture...",
    category: "Scholarly Work",
  },
  {
    type: "Letter",
    icon: BookOpen,
    title: "Guidance for Seekers",
    excerpt: "The path of spiritual progress requires discipline and devotion...",
    category: "Personal Guidance",
  },
];

export function GuruvaniPreview() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/10 border border-burgundy/20 mb-4">
            <Scroll className="h-4 w-4 text-burgundy" />
            <span className="text-sm text-burgundy font-medium">Sacred Teachings</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Guruvani
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the profound discourses and spiritual guidance from Gurudev Muni Jambuvijayji.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {guruvaniItems.map((item) => (
            <div 
              key={item.title}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-burgundy/30 hover:shadow-soft transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-burgundy" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{item.type}</p>
                  <p className="text-sm text-burgundy font-medium">{item.category}</p>
                </div>
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {item.excerpt}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild className="border-burgundy/30 text-burgundy hover:bg-burgundy/10">
            <Link to="/guruvani">
              Browse All Guruvani
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
