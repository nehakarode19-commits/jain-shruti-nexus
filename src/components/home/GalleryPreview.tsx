import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Images } from "lucide-react";
import { galleryImages } from "@/data/gurudevData";

// Using project book images as well for variety
import book1 from "@/assets/books/agam-02-sutrakrutang.png";
import book2 from "@/assets/books/agam-03-sthananga-new.png";
import book3 from "@/assets/books/agam-06-gnatadharma.png";
import book4 from "@/assets/books/dashvaikalik-sutra.jpg";
import book5 from "@/assets/books/dwadashanram-part1.png";
import book6 from "@/assets/books/hemchandra-shabdanushasanam.jpg";

const localGalleryImages = [
  { src: book1, alt: "Agam Sutrakrutang" },
  { src: book2, alt: "Sthananga Sutra" },
  { src: book3, alt: "Gnatadharma" },
  { src: book4, alt: "Dashvaikalik Sutra" },
  { src: book5, alt: "Dwadashanram" },
  { src: book6, alt: "Hemchandra Shabdanushasanam" },
];

export function GalleryPreview() {
  // Mix of gurudev images and book images for variety
  const mixedImages = [
    { src: galleryImages[0]?.thumb, alt: galleryImages[0]?.alt },
    { src: galleryImages[1]?.thumb, alt: galleryImages[1]?.alt },
    ...localGalleryImages.slice(0, 2),
    { src: galleryImages[2]?.thumb, alt: galleryImages[2]?.alt },
    { src: galleryImages[3]?.thumb, alt: galleryImages[3]?.alt },
  ];

  return (
    <section className="py-14 lg:py-20 bg-secondary/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Images className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="font-heading text-2xl font-bold text-foreground">Photo Gallery</h2>
              <p className="text-muted-foreground">Glimpses of Gurudev's legacy & literary works</p>
            </div>
          </div>
          <Button variant="outline" asChild>
            <Link to="/gallery">
              View All Photos
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>

        {/* Masonry-like grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {mixedImages.map((image, index) => (
            <Link
              key={index}
              to="/gallery"
              className={`rounded-xl overflow-hidden group relative ${
                index === 0 || index === 5 ? 'row-span-1' : ''
              }`}
            >
              <div className="aspect-square">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                <span className="text-white text-xs font-medium line-clamp-1">{image.alt}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
