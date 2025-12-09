import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe, FileText, GraduationCap, Sparkles } from "lucide-react";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Research Entries", icon: FileText },
  { value: 5000, suffix: "+", label: "Manuscripts Indexed", icon: BookOpen },
  { value: 1200, suffix: "+", label: "Scholars Connected", icon: GraduationCap },
  { value: 50, suffix: "+", label: "Countries Reached", icon: Globe },
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

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute inset-0 lotus-pattern opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Section Header */}
        <AnimatedContainer animation="fade-up" className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground font-medium">Our Impact</span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Preserving <span className="text-gradient-gold">Ancient Wisdom</span> for Generations
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join a global community dedicated to preserving and sharing the timeless teachings of Jain philosophy.
          </p>
        </AnimatedContainer>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-14">
          {stats.map((stat, index) => (
            <AnimatedContainer 
              key={stat.label}
              animation="scale-in"
              delay={index * 100}
              className="group"
            >
              <div className="relative p-6 md:p-8 rounded-2xl bg-card/80 backdrop-blur-sm border border-border/50 hover:border-primary/30 hover:shadow-elevated transition-all duration-500 text-center overflow-hidden">
                {/* Hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative">
                  <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="font-body text-sm md:text-base text-muted-foreground font-medium">{stat.label}</p>
                </div>
              </div>
            </AnimatedContainer>
          ))}
        </div>

        {/* Bottom CTA */}
        <AnimatedContainer animation="fade-up" delay={500} className="text-center">
          <div className="max-w-2xl mx-auto p-8 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              Ready to Begin Your Journey?
            </h3>
            <p className="text-muted-foreground mb-6">
              Explore sacred texts, connect with scholars, and discover the profound wisdom of Jain philosophy.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild className="group shadow-glow w-full sm:w-auto">
                <Link to="/about">
                  Learn About Our Mission
                  <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button variant="outline" size="xl" asChild className="w-full sm:w-auto">
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </AnimatedContainer>
      </div>
    </section>
  );
}
