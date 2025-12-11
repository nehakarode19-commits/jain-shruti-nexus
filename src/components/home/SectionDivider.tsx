export function SectionDivider({ variant = "default" }: { variant?: "default" | "wave" | "dots" }) {
  if (variant === "dots") {
    return (
      <div className="flex justify-center py-6">
        <div className="flex gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-primary/15" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/50" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/15" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center py-8">
      <div className="w-24 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}