import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  amplitude?: "sm" | "md" | "lg";
}

export function FloatingElement({
  children,
  className,
  delay = 0,
  duration = 6,
  amplitude = "md",
}: FloatingElementProps) {
  const amplitudeMap = {
    sm: "6px",
    md: "12px",
    lg: "20px",
  };

  return (
    <div
      className={cn("animate-float", className)}
      style={{
        animationDelay: `${delay}s`,
        animationDuration: `${duration}s`,
        "--float-amplitude": amplitudeMap[amplitude],
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

interface GlowOrbProps {
  className?: string;
  color?: "primary" | "gold" | "burgundy" | "sage";
  size?: "sm" | "md" | "lg" | "xl";
  blur?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
}

export function GlowOrb({
  className,
  color = "primary",
  size = "md",
  blur = "lg",
  animate = true,
}: GlowOrbProps) {
  const colorMap = {
    primary: "bg-primary/10",
    gold: "bg-gold/10",
    burgundy: "bg-burgundy/10",
    sage: "bg-sage/10",
  };

  const sizeMap = {
    sm: "w-32 h-32",
    md: "w-64 h-64",
    lg: "w-96 h-96",
    xl: "w-[500px] h-[500px]",
  };

  const blurMap = {
    sm: "blur-2xl",
    md: "blur-3xl",
    lg: "blur-[100px]",
    xl: "blur-[150px]",
  };

  return (
    <div
      className={cn(
        "absolute rounded-full pointer-events-none",
        colorMap[color],
        sizeMap[size],
        blurMap[blur],
        animate && "animate-pulse-soft",
        className
      )}
    />
  );
}

interface BackgroundParticlesProps {
  count?: number;
  className?: string;
}

export function BackgroundParticles({ count = 20, className }: BackgroundParticlesProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 bg-primary/20 rounded-full animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 4}s`,
          }}
        />
      ))}
    </div>
  );
}

interface GradientMeshProps {
  className?: string;
}

export function GradientMesh({ className }: GradientMeshProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-radial from-primary/5 to-transparent" />
      <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-radial from-gold/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-radial from-burgundy/5 to-transparent" />
    </div>
  );
}
