import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe, FileText, GraduationCap } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { value: 10000, suffix: "+", label: "Research Entries", icon: FileText },
  { value: 5000, suffix: "+", label: "Manuscripts", icon: BookOpen },
  { value: 1200, suffix: "+", label: "Scholars", icon: GraduationCap },
  { value: 50, suffix: "+", label: "Countries", icon: Globe },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
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
      const progress = Math.min((timestamp - startTime) / 2000, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isVisible, value]);

  return <span id={`counter-${value}`}>{count.toLocaleString()}{suffix}</span>;
}

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary/5">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {stats.map((stat) => (
            <div 
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-card border border-border/50"
            >
              <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="font-heading text-3xl md:text-4xl font-bold text-primary mb-1">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="text-center max-w-2xl mx-auto p-8 rounded-2xl bg-card border border-border/50">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
            Ready to Begin Your Journey?
          </h2>
          <p className="text-muted-foreground mb-6">
            Explore sacred texts, connect with scholars, and discover the profound wisdom of Jain philosophy.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="lg" asChild>
              <Link to="/about">
                Learn About Our Mission
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
