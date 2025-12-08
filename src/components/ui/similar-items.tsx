import { CompactCard } from "@/components/ui/content-card";

interface SimilarItem {
  id: string | number;
  title: string;
  image: string;
  category?: string;
  subtitle?: string;
}

interface SimilarItemsProps {
  title?: string;
  subtitle?: string;
  items: SimilarItem[];
  basePath: string;
  maxItems?: number;
}

export function SimilarItems({ 
  title = "Similar Items", 
  subtitle,
  items, 
  basePath,
  maxItems = 4 
}: SimilarItemsProps) {
  if (items.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-spiritual relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 lotus-pattern opacity-30" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-10">
          {subtitle && (
            <span className="text-xs font-medium tracking-widest text-primary uppercase">
              {subtitle}
            </span>
          )}
          <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
            {title}
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {items.slice(0, maxItems).map((item, index) => (
            <CompactCard
              key={item.id}
              href={`${basePath}/${item.id}`}
              image={item.image}
              title={item.title}
              subtitle={item.subtitle}
              badge={item.category}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
