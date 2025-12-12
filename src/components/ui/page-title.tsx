import React from "react";

interface PageTitleProps {
  label: string;
  title: string;
  subtitle?: string;
}

export function PageTitle({ label, title, subtitle }: PageTitleProps) {
  return (
    <div className="text-center py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Label */}
        <span className="text-primary font-medium tracking-wider uppercase text-sm md:text-base">
          {label}
        </span>
        
        {/* Title with hand-drawn bracket decoration */}
        <div className="relative inline-block mt-3">
          {/* SVG curved bracket decoration */}
          <svg
            className="absolute -left-8 -right-8 -top-4 -bottom-4 w-[calc(100%+64px)] h-[calc(100%+32px)] pointer-events-none"
            viewBox="0 0 400 100"
            preserveAspectRatio="none"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M30 50 Q30 15, 80 12 L320 12 Q370 15, 370 50 Q370 85, 320 88 L80 88 Q30 85, 30 50"
              stroke="#F4B400"
              strokeWidth="3"
              strokeLinecap="round"
              fill="none"
              className="animate-draw"
              style={{
                strokeDasharray: 1000,
                strokeDashoffset: 0,
              }}
            />
          </svg>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground relative z-10 px-4">
            {title}
          </h1>
        </div>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="mt-6 text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
        
        {/* Orange line decoration */}
        <div className="mt-6 w-16 h-1 bg-primary mx-auto rounded-full" />
      </div>
    </div>
  );
}
