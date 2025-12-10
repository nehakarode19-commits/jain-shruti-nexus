import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, ScrollText, Image, ArrowRight, Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

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
  { icon: BookOpen, value: 5000, suffix: "+", label: "Digital Texts", description: "Sacred scriptures digitized" },
  { icon: ScrollText, value: 1200, suffix: "+", label: "Manuscripts", description: "Rare documents preserved" },
  { icon: Users, value: 10000, suffix: "+", label: "Scholars", description: "Researchers worldwide" },
  { icon: Image, value: 3000, suffix: "+", label: "Photos", description: "Historical archive" },
];

const testimonials = [
  {
    quote: "Jambushrusti has transformed how I access ancient Jain texts. The research tools are invaluable for my doctoral work.",
    author: "Dr. Priya Sharma",
    role: "Jain Philosophy Researcher",
    institution: "University of Mumbai",
    rating: 5,
  },
  {
    quote: "As a librarian, the manuscript cataloging system has helped us preserve rare documents that were previously inaccessible.",
    author: "Shri Mahendra Jain",
    role: "Chief Librarian",
    institution: "Jain Vidya Sansthan",
    rating: 5,
  },
  {
    quote: "The Guruvani collection has been a spiritual blessing. Gurudev's teachings continue to guide our community.",
    author: "Sadhvi Prabhavati",
    role: "Spiritual Leader",
    institution: "Jain Sangh, Ahmedabad",
    rating: 5,
  },
];

export function CTASection() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const nextTestimonial = () => {
    setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-rotate testimonials
  useEffect(() => {
    const timer = setInterval(nextTestimonial, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 right-20 w-96 h-96 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute bottom-40 left-40 w-64 h-64 border border-[#4A6FA5]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="group text-center p-8 rounded-3xl bg-gradient-to-br from-[#E9EEF2] to-white border border-[#DCE3E7] hover:border-[#4A6FA5] hover:shadow-xl transition-all duration-300 relative overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#4A6FA5]/0 to-[#4A6FA5]/0 group-hover:from-[#4A6FA5]/5 group-hover:to-transparent transition-all duration-300" />
              
              <div className="relative">
                <div className="w-16 h-16 mx-auto rounded-2xl bg-[#4A6FA5]/10 flex items-center justify-center mb-4 group-hover:bg-[#4A6FA5] group-hover:scale-110 transition-all duration-300">
                  <stat.icon className="h-8 w-8 text-[#4A6FA5] group-hover:text-white transition-colors" />
                </div>
                <div className="font-heading text-4xl md:text-5xl font-bold text-[#2B3A4A] mb-2">
                  <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-[#2B3A4A] font-semibold mb-1">{stat.label}</p>
                <p className="text-sm text-[#555555]">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">Testimonials</p>
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#2B3A4A] mb-4">
              What Our Community Says
            </h3>
            <div className="w-20 h-1 bg-[#4A6FA5] mx-auto rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Testimonial Card */}
            <div className="bg-gradient-to-br from-[#E9EEF2] to-white rounded-3xl p-8 md:p-12 border border-[#DCE3E7] shadow-lg relative overflow-hidden">
              {/* Decorative quote */}
              <Quote className="absolute top-6 right-6 h-20 w-20 text-[#4A6FA5]/5" />
              
              {/* Rating */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <blockquote className="text-xl md:text-2xl text-[#2B3A4A] text-center italic leading-relaxed mb-8">
                "{testimonials[activeTestimonial].quote}"
              </blockquote>
              
              <div className="text-center">
                <p className="font-semibold text-[#2B3A4A] text-lg">{testimonials[activeTestimonial].author}</p>
                <p className="text-[#555555]">{testimonials[activeTestimonial].role}</p>
                <p className="text-sm text-[#4A6FA5]">{testimonials[activeTestimonial].institution}</p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-center items-center gap-4 mt-8">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={prevTestimonial}
                className="rounded-full border-[#DCE3E7] hover:border-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === activeTestimonial 
                        ? 'bg-[#4A6FA5] w-8' 
                        : 'bg-[#DCE3E7] hover:bg-[#4A6FA5]/50'
                    }`}
                  />
                ))}
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={nextTestimonial}
                className="rounded-full border-[#DCE3E7] hover:border-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Box */}
        <div className="rounded-[2rem] bg-gradient-to-br from-[#2B3A4A] to-[#1F2E3A] p-10 md:p-16 text-center relative overflow-hidden">
          {/* Multiple decorative elements for depth */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-[#4A6FA5]/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#4A6FA5]/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
          <div className="absolute top-1/2 left-1/4 w-32 h-32 border border-white/5 rounded-full" />
          <div className="absolute bottom-1/4 right-1/3 w-48 h-48 border border-white/5 rounded-full" />
          
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
              <Star className="h-4 w-4 text-amber-400" />
              <span className="text-sm text-white/80">Join Our Growing Community</span>
            </div>
            
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Begin Your Journey of Knowledge
            </h2>
            <p className="text-white/70 max-w-2xl mx-auto mb-10 text-lg">
              Join thousands of scholars, seekers, and community members in preserving 
              and exploring the profound wisdom of Jain philosophy through Gurudev's teachings.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="xl" 
                asChild
                className="bg-[#4A6FA5] hover:bg-[#5A7FB5] text-white shadow-lg shadow-[#4A6FA5]/30 group"
              >
                <Link to="/about/gurudev">
                  Learn About Gurudev
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="xl" 
                asChild
                className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
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
