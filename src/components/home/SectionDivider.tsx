export function SectionDivider({ variant = "default" }: { variant?: "default" | "wave" | "dots" }) {
  if (variant === "wave") {
    return (
      <div className="relative h-16 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="absolute bottom-0 w-full h-16 text-[#F8F5EF]"
          fill="currentColor"
        >
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.14,118.92,148.22,95.21,321.39,56.44Z" />
        </svg>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex justify-center py-8">
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-[#4A6FA5]/20" />
          <div className="w-2 h-2 rounded-full bg-[#4A6FA5]/40" />
          <div className="w-2 h-2 rounded-full bg-[#4A6FA5]" />
          <div className="w-2 h-2 rounded-full bg-[#4A6FA5]/40" />
          <div className="w-2 h-2 rounded-full bg-[#4A6FA5]/20" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-12">
      <div className="w-32 h-px bg-gradient-to-r from-transparent via-[#4A6FA5]/30 to-transparent" />
    </div>
  );
}
