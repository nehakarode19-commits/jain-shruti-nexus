import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, GraduationCap, Library, Search, Users } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Research Entries" },
  { value: 5000, suffix: "+", label: "Manuscripts Indexed" },
  { value: 1200, suffix: "+", label: "Scholars Connected" },
  { value: 50, suffix: "+", label: "Countries Reached" },
];

function AnimatedCounter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById(`counter-${value}`);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [isVisible, value, duration]);

  return (
    <span id={`counter-${value}`}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const ctaCards = [
  {
    icon: GraduationCap,
    title: "For Scholars",
    description: "Join our scholarly community and contribute to research",
    href: "/scholars",
    variant: "hero" as const,
    gradient: "from-primary/10 to-transparent",
  },
  {
    icon: Library,
    title: "Library Access",
    description: "Browse our extensive catalog of Jain literature",
    href: "/library",
    variant: "outline" as const,
    gradient: "from-gold/10 to-transparent",
  },
  {
    icon: Search,
    title: "AI Search",
    description: "Search inside texts with smart transliteration",
    href: "/research/shabdasangraha",
    variant: "outline" as const,
    gradient: "from-sage/10 to-transparent",
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Attend events and connect with like-minded seekers",
    href: "/community",
    variant: "outline" as const,
    gradient: "from-burgundy/10 to-transparent",
  },
];

export function CTASection() {
  return (
    <section className="py-10 lg:py-14 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 animated-gradient" />
      <div className="absolute inset-0 bg-background/80" />
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-burgundy/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />

      <div className="container mx-auto px-4 relative">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <AnimatedContainer 
              key={stat.label}
              animation="scale-in"
              delay={index * 100}
              className="text-center glass-card p-6 rounded-2xl hover:shadow-elevated transition-shadow duration-300"
            >
              <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
            </AnimatedContainer>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ctaCards.map((item, index) => (
            <AnimatedContainer
              key={item.title}
              animation="fade-up"
              delay={(index + 4) * 100}
            >
              <div className={`group flex flex-col p-6 rounded-2xl glass-card border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-300 h-full relative overflow-hidden`}>
                {/* Hover gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {item.description}
                  </p>
                  <Button variant={item.variant} size="sm" asChild className="w-full group/btn">
                    <Link to={item.href}>
                      Get Started
                      <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
