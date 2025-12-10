import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image, Loader2, Camera, Eye } from "lucide-react";
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
    <section className="py-16 lg:py-20 bg-[#E9EEF2] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-20 w-48 h-48 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute bottom-10 right-20 w-36 h-36 border border-[#4A6FA5]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#4A6FA5]/10 border border-[#4A6FA5]/20 mb-3">
              <Camera className="h-3.5 w-3.5 text-[#4A6FA5]" />
              <span className="text-xs text-[#4A6FA5] font-medium">Visual Archive</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-[#2B3A4A] mb-2">
              Photo Gallery
            </h2>
            <p className="text-[#555555]">Rare photographs from Gurudev's life and teachings</p>
          </div>
          <Button 
            variant="outline"
            asChild
            className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white w-fit group"
          >
            <Link to="/gallery">
              View All Photos
              <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayImages.map((image, index) => (
              <Link
                key={index}
                to="/gallery"
                className="group relative rounded-2xl overflow-hidden shadow-lg aspect-square ring-1 ring-[#DCE3E7] hover:ring-[#4A6FA5] transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                {/* Enhanced hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/90 via-[#2B3A4A]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Eye className="h-6 w-6 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium px-4 text-center line-clamp-2">
                    {image.alt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Photo count indicator */}
        <div className="flex justify-center mt-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE3E7]">
            <Image className="h-4 w-4 text-[#4A6FA5]" />
            <span className="text-sm text-[#555555]">
              <span className="font-semibold text-[#2B3A4A]">{galleryItems.length > 0 ? galleryItems.length : '100'}+</span> photos in collection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
