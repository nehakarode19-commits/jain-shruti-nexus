import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Images } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop",
    alt: "Gurudev teaching",
  },
  {
    src: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop",
    alt: "Research Center",
  },
  {
    src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=200&fit=crop",
    alt: "Ancient manuscripts",
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=300&h=200&fit=crop",
    alt: "Library collection",
  },
  {
    src: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=300&h=200&fit=crop",
    alt: "Scholarly work",
  },
  {
    src: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=300&h=200&fit=crop",
    alt: "Book preservation",
  },
];

export function GalleryPreview() {
  return (
    <section className="py-12 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Images className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground">Photo Gallery</h2>
              <p className="text-sm text-muted-foreground">Glimpses of Gurudev's legacy</p>
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/gallery">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {galleryImages.map((image, index) => (
            <Link
              key={index}
              to="/gallery"
              className="aspect-square rounded-xl overflow-hidden group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
