import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Play, X } from "lucide-react";

// Sample gallery images - in production, these would come from a CMS
const galleryImages = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  src: `https://images.unsplash.com/photo-${1500000000000 + i * 1000}?w=400&h=300&fit=crop`,
  alt: `Gallery image ${i + 1}`,
  category: i % 4 === 0 ? "events" : i % 3 === 0 ? "manuscripts" : "portraits",
}));

const videoLinks = [
  {
    id: 1,
    title: "Discourse on Jain Philosophy",
    thumbnail: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=225&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Life and Legacy Documentary",
    thumbnail: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=225&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Manuscript Preservation Work",
    thumbnail: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=225&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Padma Shri Award Ceremony",
    thumbnail: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=400&h=225&fit=crop",
    youtubeId: "dQw4w9WgXcQ",
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Gallery
            </h1>
            <div className="section-divider" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Photos and videos from the life and work of Gurudev
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="photos" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-secondary">
                <TabsTrigger value="photos" className="px-8">Photos</TabsTrigger>
                <TabsTrigger value="videos" className="px-8">Videos</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="photos">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {galleryImages.map((image) => (
                  <Dialog key={image.id}>
                    <DialogTrigger asChild>
                      <div 
                        className="aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-90 transition-opacity shadow-card hover:shadow-elevated"
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop";
                          }}
                        />
                      </div>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-auto rounded-lg"
                        onError={(e) => {
                          e.currentTarget.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop";
                        }}
                      />
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos">
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {videoLinks.map((video) => (
                  <Card key={video.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
                    <a
                      href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <div className="relative aspect-video bg-muted">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-foreground/30 flex items-center justify-center group-hover:bg-foreground/40 transition-colors">
                          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center">
                            <Play className="w-6 h-6 text-primary-foreground ml-1" />
                          </div>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-display text-lg font-medium text-foreground line-clamp-2">
                          {video.title}
                        </h3>
                      </CardContent>
                    </a>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}