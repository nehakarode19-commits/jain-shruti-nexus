import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Scroll, ArrowRight, BookOpen, Mic, FileText, Calendar } from "lucide-react";

// Using project images for guruvani
import guruvaniImg1 from "@/assets/books/guruvani-1.jpg";
import guruvaniImg2 from "@/assets/books/guruvani-2.jpg";
import guruvaniImg3 from "@/assets/books/guruvani-3.jpg";

const guruvaniItems = [
  {
    type: "Discourse",
    icon: Mic,
    title: "आत्माનો સ્વરૂપ",
    subtitle: "On the Nature of Soul",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true self and attains liberation from the cycle of birth and death.",
    category: "Sacred Teaching",
    date: "1985",
    image: guruvaniImg1,
  },
  {
    type: "Written Work",
    icon: FileText,
    title: "તત્ત્વાર્થ સૂત્ર ભાષ્ય",
    subtitle: "Commentary on Tattvartha Sutra",
    excerpt: "A comprehensive examination of reality as presented in Jain scripture. This commentary illuminates the seven fundamental truths (tattvas) that form the basis of Jain philosophy and practice.",
    category: "Scholarly Work",
    date: "1972",
    image: guruvaniImg2,
  },
  {
    type: "Letter",
    icon: BookOpen,
    title: "સાધકોને માર્ગદર્શન",
    subtitle: "Guidance for Seekers",
    excerpt: "The path of spiritual progress requires discipline and devotion. A seeker must cultivate right faith, right knowledge, and right conduct while practicing non-violence and truthfulness.",
    category: "Personal Guidance",
    date: "1990",
    image: guruvaniImg3,
  },
];

export function GuruvaniPreview() {
  return (
    <section className="py-16 lg:py-24 bg-background relative">
      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
      
      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Scroll className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Sacred Teachings</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
            Guruvani
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore the profound discourses and spiritual guidance from Gurudev Muni Jambuvijayji.
          </p>
        </div>

        {/* Preview Cards with Images */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {guruvaniItems.map((item) => (
            <Link 
              key={item.title}
              to="/guruvani"
              className="group rounded-2xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all overflow-hidden"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden relative">
                <img 
                  src={item.image} 
                  alt={item.subtitle}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-card/90 backdrop-blur-sm text-xs font-medium text-primary border border-primary/20">
                    {item.category}
                  </span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>{item.type}</span>
                    <span>•</span>
                    <Calendar className="h-3 w-3" />
                    <span>{item.date}</span>
                  </div>
                </div>
                
                <h3 className="font-heading font-semibold text-foreground mb-1 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  {item.subtitle}
                </p>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                  {item.excerpt}
                </p>
                
                <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button variant="outline" size="lg" asChild className="border-primary/30 text-primary hover:bg-primary/10">
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
