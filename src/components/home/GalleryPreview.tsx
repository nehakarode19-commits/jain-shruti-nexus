import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Image } from "lucide-react";
import { galleryImages } from "@/data/gurudevData";

// Using project book images as well for variety
import book1 from "@/assets/books/agam-02-sutrakrutang.png";
import book2 from "@/assets/books/agam-03-sthananga-new.png";
import book3 from "@/assets/books/agam-06-gnatadharma.png";
import book4 from "@/assets/books/dashvaikalik-sutra.jpg";

export function GalleryPreview() {
  // Mix of gurudev images and book images for variety
  const mixedImages = [
    { src: galleryImages[0]?.thumb, alt: galleryImages[0]?.alt },
    { src: galleryImages[1]?.thumb, alt: galleryImages[1]?.alt },
    { src: book1, alt: "Agam Sutrakrutang" },
    { src: book2, alt: "Sthananga Sutra" },
    { src: galleryImages[2]?.thumb, alt: galleryImages[2]?.alt },
    { src: galleryImages[3]?.thumb, alt: galleryImages[3]?.alt },
  ];

  return (
    <section className="py-20 lg:py-28 bg-[#E9EEF2]">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">Visual Journey</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            Photo Gallery
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            A visual chronicle of Gurudev's life, teachings, and interactions 
            with the Jain community over the decades.
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10">
          {mixedImages.map((image, index) => (
            <Link
              key={index}
              to="/gallery"
              className={`group relative rounded-xl overflow-hidden shadow-lg ${
                index === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover aspect-square group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                <span className="text-white text-sm font-medium bg-[#2B3A4A]/60 px-3 py-1 rounded-full flex items-center gap-1">
                  <Image className="h-3 w-3" />
                  View Gallery
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            size="lg" 
            asChild
            className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
          >
            <Link to="/gallery">
              View All Photos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
