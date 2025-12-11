import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ScrollText, Image, ArrowRight, GraduationCap, Search, Globe } from "lucide-react";

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
  { value: 10000, suffix: "+", label: "Books & Articles" },
  { value: 5000, suffix: "+", label: "Rare Manuscripts" },
  { value: 1200, suffix: "+", label: "Digital Texts" },
  { value: 50, suffix: "+", label: "Years of Research" },
];

const ctaCards = [
  {
    icon: GraduationCap,
    title: "For Scholars",
    description: "Join our scholarly community with full access to research tools and rare manuscripts",
    href: "/scholars",
    cta: "Join the Hub",
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
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle decorative elements */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-[#4A6FA5]/5 rounded-full" />
      <div className="absolute bottom-40 left-40 w-48 h-48 border border-[#F4B400]/10 rounded-full" />

      <div className="container mx-auto px-6 relative">
        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 md:p-8 rounded-2xl bg-[#F8F5EF] border border-[#E5E0D8]"
            >
              <div className="font-heading text-4xl md:text-5xl font-bold text-[#1E3557] mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#555555] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {ctaCards.map((card, index) => (
            <Link
              key={card.title}
              to={card.href}
              className={`group rounded-2xl p-6 transition-all duration-300 ${
                card.primary
                  ? "bg-[#1E3557] text-white hover:bg-[#2B4A6B]"
                  : "bg-[#F8F5EF] border border-[#E5E0D8] hover:border-[#4A6FA5]/30 hover:shadow-lg"
              }`}
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
                card.primary
                  ? "bg-white/10"
                  : "bg-[#4A6FA5]/10 group-hover:bg-[#4A6FA5] transition-colors"
              }`}>
                <card.icon className={`h-6 w-6 ${
                  card.primary
                    ? "text-white"
                    : "text-[#4A6FA5] group-hover:text-white transition-colors"
                }`} />
              </div>
              
              <h3 className={`font-heading text-lg font-bold mb-2 ${
                card.primary ? "text-white" : "text-[#1E3557]"
              }`}>
                {card.title}
              </h3>
              
              <p className={`text-sm mb-4 leading-relaxed ${
                card.primary ? "text-white/80" : "text-[#555555]"
              }`}>
                {card.description}
              </p>
              
              <span className={`inline-flex items-center gap-1 text-sm font-medium ${
                card.primary ? "text-[#F4B400]" : "text-[#4A6FA5]"
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
