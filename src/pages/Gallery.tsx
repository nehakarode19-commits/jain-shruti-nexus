import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { galleryImages, videos } from "@/data/gurudevData";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Image, Video, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"photos" | "videos">("photos");

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };
  
  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === galleryImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Photo & Video <span className="text-gradient-gold">Gallery</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore rare photographs and videos of Gurudev Muni Jambuvijayji Maharaj Saheb, 
              capturing moments from his life of scholarship and spiritual dedication.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex justify-center gap-4">
            <Button
              variant={activeTab === "photos" ? "hero" : "outline"}
              onClick={() => setActiveTab("photos")}
              className="gap-2"
            >
              <Image className="h-4 w-4" />
              Photos ({galleryImages.length})
            </Button>
            <Button
              variant={activeTab === "videos" ? "hero" : "outline"}
              onClick={() => setActiveTab("videos")}
              className="gap-2"
            >
              <Video className="h-4 w-4" />
              Videos ({videos.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      {activeTab === "photos" && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden cursor-pointer group relative shadow-soft hover:shadow-elevated transition-all duration-300"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.thumb}
                    alt={image.alt || `Gurudev Jambuvijayji Maharaj - Photo ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="text-sm text-foreground font-medium">View</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Video Gallery */}
      {activeTab === "videos" && (
        <section className="py-12 lg:py-16 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {videos.map((video, index) => (
                <div
                  key={index}
                  className="rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-elevated transition-all duration-300"
                >
                  <div className="aspect-video bg-muted relative">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.url.split("v=")[1]}`}
                      title={video.title}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-1">
                      {video.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">{video.channel}</p>
                    <a
                      href={video.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
                    >
                      Watch on YouTube
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">
                More videos available on the official YouTube channel
              </p>
              <Button variant="outline" asChild>
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

      {/* Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={() => closeLightbox()}>
        <DialogContent className="max-w-5xl p-0 bg-background/95 backdrop-blur border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 bg-background/80"
              onClick={closeLightbox}
            >
              <X className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-background/80"
              onClick={goToPrevious}
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-background/80"
              onClick={goToNext}
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {selectedImage !== null && (
              <div className="flex items-center justify-center min-h-[60vh] p-8">
                <img
                  src={galleryImages[selectedImage].url}
                  alt={galleryImages[selectedImage].alt || `Gurudev Photo ${selectedImage + 1}`}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg"
                />
              </div>
            )}

            {selectedImage !== null && (
              <div className="text-center pb-4 text-muted-foreground text-sm">
                {selectedImage + 1} / {galleryImages.length}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CTA */}
      <section className="py-12 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Learn More About Gurudev
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/about/gurudev">Read Biography</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/guruvani">Explore Guruvani</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
