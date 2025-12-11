import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { BookOpen, Users, Search, ArrowRight, GraduationCap } from "lucide-react";

// Animated counter component
const AnimatedCounter = ({ target, suffix = "" }: { target: number; suffix?: string }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCount(target);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [isVisible, target]);

  return <div ref={ref}>{count.toLocaleString()}{suffix}</div>;
};

const stats = [
  { value: 10000, suffix: "+", label: "For Scholars", description: "Join our scholarly community with full access to research tools" },
  { value: 5000, suffix: "+", label: "Library Access", description: "Explore thousands of digitized texts and ancient manuscripts" },
  { value: 1200, suffix: "+", label: "AI Search", description: "Use our AI-powered search across Jain literature worldwide" },
  { value: 50, suffix: "+", label: "Join Community", description: "Connect with scholars, researchers, and seekers globally" },
];

const ctaCards = [
  {
    icon: GraduationCap,
    title: "For Scholars",
    description: "Join our scholarly community with full access to research tools and rare manuscripts",
    href: "/scholars",
    cta: "Join Now",
    primary: true,
  },
  {
    icon: BookOpen,
    title: "Library Access",
    description: "Explore thousands of digitized texts and ancient manuscripts",
    href: "/library",
    cta: "Visit Library",
  },
  {
    icon: Search,
    title: "AI Search",
    description: "Use our AI-powered search across Jain literature worldwide",
    href: "/research",
    cta: "Start Search",
  },
  {
    icon: Users,
    title: "Join Community",
    description: "Connect with scholars, researchers, and seekers globally",
    href: "/community/events",
    cta: "Get Involved",
  },
];

export function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-6">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-5 md:p-6 rounded-xl bg-background border border-border"
            >
              <div className="font-heading text-3xl md:text-4xl font-bold text-orange mb-1.5">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-primary text-sm font-semibold mb-1 font-body">{stat.label}</p>
              <p className="text-muted-foreground text-xs font-body hidden md:block">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ctaCards.map((card) => (
            <Link
              key={card.title}
              to={card.href}
              className={`group rounded-xl p-5 transition-all duration-300 ${
                card.primary
                  ? "bg-orange text-white hover:bg-orange/90"
                  : "bg-background border border-border hover:border-orange/30 hover:shadow-md"
              }`}
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3.5 ${
                card.primary
                  ? "bg-white/20"
                  : "bg-orange/10 group-hover:bg-orange transition-colors"
              }`}>
                <card.icon className={`h-5 w-5 ${
                  card.primary
                    ? "text-white"
                    : "text-orange group-hover:text-white transition-colors"
                }`} />
              </div>
              
              <h3 className={`font-heading text-base font-semibold mb-1.5 ${
                card.primary ? "text-white" : "text-primary"
              }`}>
                {card.title}
              </h3>
              
              <p className={`text-sm mb-3 leading-relaxed font-body ${
                card.primary ? "text-white/80" : "text-muted-foreground"
              }`}>
                {card.description}
              </p>
              
              <span className={`inline-flex items-center gap-1 text-sm font-medium font-body ${
                card.primary ? "text-white" : "text-orange"
              }`}>
                {card.cta}
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
