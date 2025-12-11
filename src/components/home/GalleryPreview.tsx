import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image, Loader2, Eye, Camera } from "lucide-react";
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
  
  const displayImages = galleryItems.length > 0
    ? galleryItems.slice(0, 4).map(item => ({ src: item.image_url, alt: item.title }))
    : fallbackImages;

  return (
    <section className="py-24 lg:py-32 bg-[#F8F5EF] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-20 w-48 h-48 border border-[#4A6FA5]/5 rounded-full" />
      <div className="absolute bottom-10 right-20 w-36 h-36 border border-[#F4B400]/10 rounded-full" />

      <div className="container mx-auto px-6 relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E5E0D8] shadow-sm mb-4">
              <Camera className="h-4 w-4 text-[#F4B400]" />
              <span className="text-sm text-[#555555] font-medium">Visual Archive</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#1E3557] mb-3">
              Photo Gallery
            </h2>
            <p className="text-[#555555] max-w-lg">
              Rare and historic photographs from Gurudev's life, teachings, and spiritual journey
            </p>
          </div>
          <Button 
            variant="outline"
            asChild
            className="border-[#1E3557] text-[#1E3557] hover:bg-[#1E3557] hover:text-white w-fit"
          >
            <Link to="/gallery">
              View Full Gallery
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {displayImages.map((image, index) => (
              <Link
                key={index}
                to="/gallery"
                className="group relative rounded-2xl overflow-hidden shadow-lg aspect-square ring-1 ring-[#E5E0D8] hover:ring-[#4A6FA5] transition-all duration-300 hover:shadow-2xl"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E3557]/90 via-[#1E3557]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-end pb-6">
                  <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mb-3">
                    <Eye className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-white text-sm font-medium px-4 text-center line-clamp-2">
                    {image.alt}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Photo count */}
        <div className="flex justify-center mt-10">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E5E0D8] shadow-sm">
            <Image className="h-4 w-4 text-[#4A6FA5]" />
            <span className="text-sm text-[#555555]">
              <span className="font-semibold text-[#1E3557]">{galleryItems.length > 0 ? galleryItems.length : '100'}+</span> photos in collection
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
