import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Library, Search, Users } from "lucide-react";

const stats = [
  { value: "10,000+", label: "Research Entries" },
  { value: "5,000+", label: "Manuscripts Indexed" },
  { value: "1,200+", label: "Scholars Connected" },
  { value: "50+", label: "Countries Reached" },
];

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-primary/5 via-background to-burgundy/5">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className="text-center animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <p className="font-display text-3xl sm:text-4xl font-bold text-primary mb-1">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: GraduationCap,
              title: "For Scholars",
              description: "Join our scholarly community and contribute to research",
              href: "/scholars",
              variant: "hero" as const,
            },
            {
              icon: Library,
              title: "Library Access",
              description: "Browse our extensive catalog of Jain literature",
              href: "/library",
              variant: "outline" as const,
            },
            {
              icon: Search,
              title: "AI Search",
              description: "Search inside texts with smart transliteration",
              href: "/research/shabdasangraha",
              variant: "outline" as const,
            },
            {
              icon: Users,
              title: "Join Community",
              description: "Attend events and connect with like-minded seekers",
              href: "/community",
              variant: "outline" as const,
            },
          ].map((item, index) => (
            <div 
              key={item.title}
              className="flex flex-col p-6 rounded-xl bg-card border border-border hover:border-primary/20 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${(index + 4) * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-4 flex-1">
                {item.description}
              </p>
              <Button variant={item.variant} size="sm" asChild className="w-full">
                <Link to={item.href}>
                  Get Started
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
