import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ScrollText, Image, ArrowRight } from "lucide-react";

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
  { icon: BookOpen, value: 5000, suffix: "+", label: "Digital Texts" },
  { icon: ScrollText, value: 1200, suffix: "+", label: "Manuscripts" },
  { icon: Users, value: 10000, suffix: "+", label: "Scholars" },
  { icon: Image, value: 3000, suffix: "+", label: "Photos" },
];

export function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="text-center p-6 rounded-2xl bg-[#E9EEF2] border border-[#DCE3E7]"
            >
              <div className="w-14 h-14 mx-auto rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center mb-4">
                <stat.icon className="h-7 w-7 text-[#4A6FA5]" />
              </div>
              <div className="font-heading text-3xl md:text-4xl font-bold text-[#2B3A4A] mb-1">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-[#555555] font-medium">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="rounded-3xl bg-[#2B3A4A] p-8 md:p-12 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#4A6FA5]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-[#4A6FA5]/10 rounded-full blur-2xl translate-x-1/2 translate-y-1/2" />
          
          <div className="relative">
            <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
              Begin Your Journey of Knowledge
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-8 text-lg">
              Join thousands of scholars, seekers, and community members in preserving 
              and exploring the profound wisdom of Jain philosophy through Gurudev's teachings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                asChild
                className="bg-[#4A6FA5] hover:bg-[#5A7FB5] text-white"
              >
                <Link to="/about/gurudev">
                  Learn About Gurudev
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
