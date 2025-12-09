import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { galleryImages, videos } from "@/data/gurudevData";
import { useGalleryFromDB } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Image, Video, ExternalLink, ChevronLeft, ChevronRight, Loader2, Camera, Film, ArrowRight, Grid3X3, LayoutGrid } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  
  const { data: dbGallery = [], isLoading } = useGalleryFromDB();
  
  // Use DB data if available, otherwise fall back to static
  const displayImages = dbGallery.length > 0 
    ? dbGallery.map(img => ({ url: img.image_url, thumb: img.image_url, alt: img.title, category: img.category }))
    : galleryImages;

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? displayImages.length - 1 : selectedImage - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === displayImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  return (
    <Layout>
      {/* Hero Section - Clean design like reference */}
      <section className="relative py-20 lg:py-28 bg-[#E9EEF2] overflow-hidden">
        {/* Subtle pattern background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-20 w-40 h-40 border border-[#4A6FA5]/10 rounded-full" />
          <div className="absolute top-40 right-40 w-60 h-60 border border-[#4A6FA5]/10 rounded-full" />
          <div className="absolute bottom-20 left-1/3 w-32 h-32 border border-[#4A6FA5]/10 rounded-full" />
          <div className="absolute bottom-40 right-20 w-24 h-24 border border-[#4A6FA5]/10 rounded-full" />
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#DCE3E7] text-sm text-[#4A6FA5] font-medium mb-6">
              <Camera className="h-4 w-4" />
              Visual Archive
            </div>
            
            <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-[#2B3A4A] mb-6">
              Photo & Video Gallery
            </h1>
            
            <p className="text-lg text-[#555555] mb-8 max-w-2xl mx-auto">
              Explore rare photographs and videos of Gurudev Muni Jambuvijayji Maharaj Saheb, 
              capturing moments from his life of scholarship and spiritual dedication.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                onClick={() => setActiveTab("photos")}
                className={activeTab === "photos" 
                  ? "bg-[#4A6FA5] hover:bg-[#3A5F95] text-white" 
                  : "bg-white text-[#2B3A4A] border border-[#DCE3E7] hover:border-[#4A6FA5]"
                }
              >
                <Image className="h-4 w-4 mr-2" />
                View Photos
              </Button>
              <Button 
                onClick={() => setActiveTab("videos")}
                variant="outline"
                className={activeTab === "videos" 
                  ? "bg-[#4A6FA5] hover:bg-[#3A5F95] text-white border-[#4A6FA5]" 
                  : "border-[#DCE3E7] text-[#2B3A4A] hover:border-[#4A6FA5]"
                }
              >
                <Video className="h-4 w-4 mr-2" />
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-12 bg-white border-b border-[#DCE3E7]">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center flex-shrink-0">
                <Camera className="h-6 w-6 text-[#4A6FA5]" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#2B3A4A] mb-1">Rare Photographs</h3>
                <p className="text-sm text-[#555555]">
                  {displayImages.length}+ photos from Gurudev's life and teachings
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center flex-shrink-0">
                <Film className="h-6 w-6 text-[#4A6FA5]" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#2B3A4A] mb-1">Video Collection</h3>
                <p className="text-sm text-[#555555]">
                  {videos.length}+ videos of discourses and events
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#4A6FA5]/10 flex items-center justify-center flex-shrink-0">
                <LayoutGrid className="h-6 w-6 text-[#4A6FA5]" />
              </div>
              <div>
                <h3 className="font-heading font-semibold text-[#2B3A4A] mb-1">High Quality</h3>
                <p className="text-sm text-[#555555]">
                  View in full resolution with lightbox
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {activeTab === "photos" && (
        <section className="py-16 lg:py-20 bg-[#E9EEF2]">
          <div className="container mx-auto px-4">
            {/* Gallery Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="font-heading text-2xl font-bold text-[#2B3A4A] mb-1">
                  Photo Collection
                </h2>
                <p className="text-[#555555]">
                  Showing {displayImages.length} photos from the official archive
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#4A6FA5] text-white border-[#4A6FA5]" : "border-[#DCE3E7]"}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                  className={viewMode === "masonry" ? "bg-[#4A6FA5] text-white border-[#4A6FA5]" : "border-[#DCE3E7]"}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin text-[#4A6FA5]" />
              </div>
            ) : (
              <div className={
                viewMode === "grid" 
                  ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
                  : "columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 space-y-4"
              }>
                {displayImages.map((image, index) => (
                  <div
                    key={index}
                    className={`
                      ${viewMode === "grid" ? "aspect-square" : "break-inside-avoid mb-4"}
                      rounded-xl overflow-hidden cursor-pointer group relative bg-white shadow-sm hover:shadow-xl transition-all duration-300
                    `}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.thumb || image.url}
                      alt={image.alt || `Gurudev Jambuvijayji Maharaj - Photo ${index + 1}`}
                      className={`
                        w-full object-cover group-hover:scale-105 transition-transform duration-500
                        ${viewMode === "grid" ? "h-full" : "h-auto"}
                      `}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B3A4A]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                      <span className="text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2">
                        <Image className="h-4 w-4" />
                        View Photo
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Video Gallery */}
      {activeTab === "videos" && (
        <section className="py-16 lg:py-20 bg-[#E9EEF2]">
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-bold text-[#2B3A4A] mb-1">
                Video Collection
              </h2>
              <p className="text-[#555555]">
                {videos.length} videos from official channels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
                >
                  <div className="aspect-video bg-[#2B3A4A] relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-heading font-semibold text-[#2B3A4A] mb-2 line-clamp-2 group-hover:text-[#4A6FA5] transition-colors">
                      {video.title}
                    </h3>
                    <p className="text-sm text-[#555555] mb-3">{video.channel}</p>
                    {video.description && (
                      <p className="text-sm text-[#555555] mb-4 line-clamp-2">
                        {video.description}
                      </p>
                    )}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-[#4A6FA5] font-medium hover:underline"
                    >
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 p-8 rounded-2xl bg-white border border-[#DCE3E7]">
              <p className="text-[#555555] mb-4">
                More videos available on the official YouTube channel
              </p>
              <Button 
                asChild
                className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
              >
                <a
                  href="https://www.youtube.com/@JambuParivar"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit YouTube Channel
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Source Attribution */}
      <section className="py-6 bg-white border-t border-[#DCE3E7]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-[#555555]">
            All photos and videos are sourced from{" "}
            <a 
              href="https://siddhijambuparivar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#4A6FA5] hover:underline font-medium"
            >
              siddhijambuparivar.com
            </a>
            {" "}and official YouTube channels.
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent 
          className="max-w-6xl p-0 bg-[#2B3A4A]/98 backdrop-blur-xl border-none"
          onKeyDown={handleKeyDown}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <div className="flex items-center justify-center min-h-[60vh] p-8">
                <img
                  src={displayImages[selectedImage].url}
                  alt={displayImages[selectedImage].alt || `Gurudev Photo ${selectedImage + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}

            {selectedImage !== null && (
              <div className="text-center pb-6">
                <p className="text-white/60 text-sm mb-2">
                  {selectedImage + 1} / {displayImages.length}
                </p>
                {displayImages[selectedImage].alt && (
                  <p className="text-white max-w-xl mx-auto px-4">
                    {displayImages[selectedImage].alt}
                  </p>
                )}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA Section */}
      <section className="py-16 lg:py-20 bg-[#2B3A4A]">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
              Explore More of Gurudev's Legacy
            </h2>
            <p className="text-white/70 mb-8">
              Dive deeper into the life, teachings, and scholarly contributions of 
              Gurudev Muni Jambuvijayji Maharaj Saheb.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                className="bg-[#4A6FA5] hover:bg-[#5A7FB5] text-white"
              >
                <Link to="/about/gurudev">
                  Read Biography
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/guruvani">
                  Explore Guruvani
                </Link>
              </Button>
              <Button 
                variant="outline" 
                asChild
                className="border-white/30 text-white hover:bg-white/10"
              >
                <Link to="/books">
                  View Books
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
