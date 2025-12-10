import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image, Loader2 } from "lucide-react";
import { useGalleryFromDB } from "@/hooks/useContent";

import book1 from "@/assets/books/agam-02-sutrakrutang.png";
import book2 from "@/assets/books/agam-03-sthananga-new.png";

const fallbackImages = [
  { src: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg", alt: "Gurudev Photo 1" },
  { src: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/43-min.jpg", alt: "Gurudev Photo 2" },
  { src: book1, alt: "Agam Sutrakrutang" },
  { src: book2, alt: "Sthananga Sutra" },
];

export function GalleryPreview() {
  const { data: galleryItems = [], isLoading } = useGalleryFromDB();
  
  // Take first 4 items for preview, fallback to static images if empty
  const displayImages = galleryItems.length > 0
    ? galleryItems.slice(0, 4).map(item => ({ src: item.image_url, alt: item.title }))
    : fallbackImages;

  return (
    <section className="py-12 lg:py-16 bg-[#E9EEF2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">Visual Journey</p>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#2B3A4A]">
              Photo Gallery
            </h2>
          </div>
          <Button 
            variant="outline"
            asChild
            className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white w-fit"
          >
            <Link to="/gallery">
              View All Photos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {displayImages.map((image, index) => (
              <Link
                key={index}
                to="/gallery"
                className="group relative rounded-lg overflow-hidden shadow-md aspect-square"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-medium bg-[#2B3A4A]/60 px-2 py-1 rounded-full flex items-center gap-1">
                    <Image className="h-3 w-3" />
                    View
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
