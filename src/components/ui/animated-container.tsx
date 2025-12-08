import { ReactNode, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedContainerProps {
  children: ReactNode;
  className?: string;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right" | "scale-in" | "blur-in";
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export function AnimatedContainer({
  children,
  className,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: AnimatedContainerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once && ref.current) {
            observer.unobserve(ref.current);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, once]);

  const animationClasses = {
    "fade-up": isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
    "fade-in": isVisible ? "opacity-100" : "opacity-0",
    "slide-left": isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8",
    "slide-right": isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8",
    "scale-in": isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95",
    "blur-in": isVisible ? "opacity-100 blur-0" : "opacity-0 blur-sm",
  };

  return (
    <div
      ref={ref}
      className={cn(
        "transition-all ease-smooth",
        animationClasses[animation],
        className
      )}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function StaggerContainer({
  children,
  className,
  staggerDelay = 75,
}: StaggerContainerProps) {
  return (
    <div className={cn("stagger-animation", className)} style={{ "--stagger-delay": `${staggerDelay}ms` } as React.CSSProperties}>
      {children}
    </div>
  );
}
