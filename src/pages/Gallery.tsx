import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { galleryImages, videos } from "@/data/gurudevData";
import { useGalleryFromDB } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Image, Video, ExternalLink, ChevronLeft, ChevronRight, Loader2, Camera, Film, ArrowRight, Grid3X3, LayoutGrid, User, Crown, Building2, Building } from "lucide-react";
import { Link } from "react-router-dom";

const GALLERY_DIVISIONS = [
  { value: 'gurudev', label: 'Gurudev Muni Jambuvijayaji', icon: User },
  { value: 'legacy', label: 'Legacy', icon: Crown },
  { value: 'mjrc', label: 'MJRC', icon: Building2 },
  { value: 'temple', label: 'Adani Shantigram Jain Temple', icon: Building },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");
  const [activeDivision, setActiveDivision] = useState<string>("gurudev");
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("grid");
  
  const { data: dbGallery = [], isLoading } = useGalleryFromDB();
  
  // Filter images by division
  const allImages = dbGallery.length > 0 
    ? dbGallery.map(img => ({ 
        url: img.image_url, 
        thumb: img.image_url, 
        alt: img.title, 
        category: img.category,
        division: (img as any).category_division || 'gurudev'
      }))
    : galleryImages.map(img => ({ ...img, division: 'gurudev' }));

  const displayImages = allImages.filter(img => img.division === activeDivision);
  const allDisplayImages = allImages; // For lightbox navigation

  const openLightbox = (index: number) => {
    // Find the actual index in the filtered array
    const filteredIndex = displayImages.indexOf(displayImages[index]);
    setSelectedImage(filteredIndex);
  };
  
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === "ArrowLeft") goToPrevious();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "Escape") closeLightbox();
  };

  const getDivisionCount = (division: string) => {
    return allImages.filter(img => img.division === division).length;
  };

  return (
    <Layout>
      <SEO 
        title="Photo & Video Gallery"
        description="Explore rare photographs and videos of Gurudev Muni Jambuvijayji Maharaj Saheb, capturing moments from his life of scholarship and spiritual dedication."
      />
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: 'white', border: '1px solid #E8E4DD', color: '#D2811D' }}
            >
              <Camera className="h-4 w-4" />
              Visual Archive
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              Photo & Video Gallery
            </h1>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
              Explore rare photographs and videos of Gurudev Muni Jambuvijayji Maharaj Saheb, 
              capturing moments from his life of scholarship and spiritual dedication.
            </p>
            
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Button 
                onClick={() => setActiveTab("photos")}
                style={activeTab === "photos" 
                  ? { backgroundColor: '#D2811D', color: 'white' }
                  : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
                }
              >
                <Image className="h-4 w-4 mr-2" />
                View Photos
              </Button>
              <Button 
                onClick={() => setActiveTab("videos")}
                style={activeTab === "videos" 
                  ? { backgroundColor: '#D2811D', color: 'white' }
                  : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
                }
              >
                <Video className="h-4 w-4 mr-2" />
                Watch Videos
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery Division Tabs */}
      {activeTab === "photos" && (
        <section className="py-6" style={{ backgroundColor: 'white', borderBottom: '1px solid #E8E4DD' }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              {GALLERY_DIVISIONS.map((division) => {
                const Icon = division.icon;
                const count = getDivisionCount(division.value);
                return (
                  <Button
                    key={division.value}
                    onClick={() => setActiveDivision(division.value)}
                    className="gap-2"
                    style={activeDivision === division.value 
                      ? { backgroundColor: '#D2811D', color: 'white' }
                      : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
                    }
                  >
                    <Icon className="h-4 w-4" />
                    {division.label}
                    <span 
                      className="ml-1 text-xs px-2 py-0.5 rounded-full"
                      style={{ 
                        backgroundColor: activeDivision === division.value ? 'rgba(255,255,255,0.2)' : 'rgba(210,129,29,0.1)',
                        color: activeDivision === division.value ? 'white' : '#D2811D'
                      }}
                    >
                      {count}
                    </span>
                  </Button>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Feature Highlights */}
      <section className="py-12" style={{ backgroundColor: 'white', borderBottom: '1px solid #E8E4DD' }}>
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(210,129,29,0.1)' }}
              >
                <Camera className="h-6 w-6" style={{ color: '#D2811D' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>Rare Photographs</h3>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                  {allImages.length}+ photos from Gurudev's life and teachings
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(210,129,29,0.1)' }}
              >
                <Film className="h-6 w-6" style={{ color: '#D2811D' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>Video Collection</h3>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                  {videos.length}+ videos of discourses and events
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: 'rgba(210,129,29,0.1)' }}
              >
                <LayoutGrid className="h-6 w-6" style={{ color: '#D2811D' }} />
              </div>
              <div>
                <h3 className="font-semibold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>High Quality</h3>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                  View in full resolution with lightbox
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {activeTab === "photos" && (
        <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAF7F2' }}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  {GALLERY_DIVISIONS.find(d => d.value === activeDivision)?.label || 'Photo Collection'}
                </h2>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                  Showing {displayImages.length} photos from the {GALLERY_DIVISIONS.find(d => d.value === activeDivision)?.label.toLowerCase()} collection
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  style={viewMode === "grid" 
                    ? { backgroundColor: '#D2811D', color: 'white', border: '1px solid #D2811D' }
                    : { backgroundColor: 'white', border: '1px solid #E8E4DD', color: '#2D2A26' }
                  }
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewMode("masonry")}
                  style={viewMode === "masonry" 
                    ? { backgroundColor: '#D2811D', color: 'white', border: '1px solid #D2811D' }
                    : { backgroundColor: 'white', border: '1px solid #E8E4DD', color: '#2D2A26' }
                  }
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="h-10 w-10 animate-spin" style={{ color: '#D2811D' }} />
              </div>
            ) : displayImages.length === 0 ? (
              <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid #E8E4DD' }}>
                <Camera className="h-16 w-16 mx-auto mb-4" style={{ color: '#6B6764' }} />
                <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  No Photos Available
                </h3>
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                  Photos for this category will be added soon.
                </p>
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
                      rounded-xl overflow-hidden cursor-pointer group relative shadow-sm hover:shadow-xl transition-all duration-300
                    `}
                    style={{ backgroundColor: 'white' }}
                    onClick={() => openLightbox(index)}
                  >
                    <img
                      src={image.thumb || image.url}
                      alt={image.alt || `Photo ${index + 1}`}
                      className={`
                        w-full object-cover group-hover:scale-105 transition-transform duration-500
                        ${viewMode === "grid" ? "h-full" : "h-auto"}
                      `}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div 
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4"
                      style={{ background: 'linear-gradient(to top, rgba(45,42,38,0.8), transparent)' }}
                    >
                      <span 
                        className="text-white text-sm font-medium px-4 py-2 rounded-full flex items-center gap-2"
                        style={{ backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)' }}
                      >
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
        <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAF7F2' }}>
          <div className="container mx-auto px-4">
            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                Video Collection
              </h2>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                {videos.length} videos from official channels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {videos.map((video, index) => (
                <div
                  key={video.id}
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="aspect-video relative" style={{ backgroundColor: '#2D2A26' }}>
                    <iframe
                      src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-5">
                    <h3 
                      className="font-semibold mb-2 line-clamp-2 group-hover:opacity-80 transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                    >
                      {video.title}
                    </h3>
                    <p className="text-sm mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>{video.channel}</p>
                    {video.description && (
                      <p className="text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                        {video.description}
                      </p>
                    )}
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                      style={{ color: '#D2811D' }}
                    >
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 p-8 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid #E8E4DD' }}>
              <p className="mb-4" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                More videos available on the official YouTube channel
              </p>
              <Button 
                asChild
                style={{ backgroundColor: '#D2811D', color: 'white' }}
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
      <section className="py-6" style={{ backgroundColor: 'white', borderTop: '1px solid #E8E4DD' }}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
            All photos and videos are sourced from{" "}
            <a 
              href="https://siddhijambuparivar.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:underline font-medium"
              style={{ color: '#D2811D' }}
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
          className="max-w-6xl p-0 backdrop-blur-xl border-none"
          style={{ backgroundColor: 'rgba(45,42,38,0.98)' }}
          onKeyDown={handleKeyDown}
        >
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {selectedImage !== null && displayImages[selectedImage] && (
              <div className="flex items-center justify-center min-h-[60vh] p-8">
                <img
                  src={displayImages[selectedImage].url}
                  alt={displayImages[selectedImage].alt || `Photo ${selectedImage + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder.svg';
                  }}
                />
              </div>
            )}

            {selectedImage !== null && displayImages[selectedImage] && (
              <div className="text-center pb-6">
                <p className="text-sm mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
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
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#2D2A26' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Explore More of Gurudev's Legacy
            </h2>
            <p className="text-white/70 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Discover the vast collection of Gurudev's teachings, books, and spiritual wisdom.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                style={{ backgroundColor: '#D2811D', color: 'white' }}
              >
                <Link to="/about/gurudev">
                  About Gurudev
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/books">
                  View Books Collection
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/live-telecast">
                  Live Telecasts
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