import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scroll, ArrowRight, BookOpen, Mic, FileText, Lock } from "lucide-react";

const guruvaniItems = [
  {
    type: "Discourse",
    icon: Mic,
    title: "On the Nature of Soul",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct...",
    date: "Sacred Teaching",
  },
  {
    type: "Written Work",
    icon: FileText,
    title: "Commentary on Tattvartha Sutra",
    excerpt: "A comprehensive examination of reality as presented in the foundational Jain scripture...",
    date: "Scholarly Work",
  },
  {
    type: "Letter",
    icon: BookOpen,
    title: "Guidance for Seekers",
    excerpt: "The path of spiritual progress requires discipline, devotion, and unwavering commitment...",
    date: "Personal Guidance",
  },
];

export function GuruvaniPreview() {
  return (
    <section className="py-10 lg:py-14 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/10 border border-burgundy/20 font-body text-base mb-6">
            <Scroll className="h-4 w-4 text-burgundy" />
            <span className="text-burgundy">Sacred Teachings</span>
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Guruvani
          </h2>
          <p className="font-body text-lg text-muted-foreground">
            Explore the profound discourses, written works, and spiritual guidance 
            from Gurudev Muni Jambuvijayji.
          </p>
        </div>

        {/* Preview Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {guruvaniItems.map((item, index) => (
            <Card 
              key={item.title}
              variant="interactive"
              className="animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center">
                    <item.icon className="h-5 w-5 text-burgundy" />
                  </div>
                  <div>
                    <p className="font-body text-base text-muted-foreground">{item.type}</p>
                    <p className="font-body text-base text-primary font-medium">{item.date}</p>
                  </div>
                </div>
                <h3 className="font-heading font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-base text-muted-foreground line-clamp-2">
                  {item.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Access Notice */}
        <div className="max-w-2xl mx-auto">
          <div className="flex items-start gap-4 p-6 rounded-xl bg-secondary/50 border border-border">
            <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-body text-base text-foreground font-medium mb-1">
                Restricted Content Available
              </p>
              <p className="font-body text-base text-muted-foreground mb-4">
                Some Guruvani materials require authentication and approval. 
                Scholars and registered users can request access to restricted teachings.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button variant="spiritual" size="sm" asChild>
                  <Link to="/guruvani">
                    Browse Guruvani
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/auth">
                    Sign In / Register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
