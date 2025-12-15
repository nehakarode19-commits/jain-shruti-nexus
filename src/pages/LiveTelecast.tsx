import { Layout } from "@/components/layout/Layout";
import { useLiveTelecastsFromDB } from "@/hooks/useContent";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Radio, Video, Calendar, Building2, Globe, ExternalLink, Loader2, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

const LiveTelecast = () => {
  const { data: telecasts = [], isLoading } = useLiveTelecastsFromDB();
  const [activeTab, setActiveTab] = useState<"mjrc" | "outside">("mjrc");

  const mjrcTelecasts = telecasts.filter(t => t.source_type === 'mjrc');
  const outsideTelecasts = telecasts.filter(t => t.source_type === 'outside');
  const currentTelecasts = activeTab === 'mjrc' ? mjrcTelecasts : outsideTelecasts;
  const liveTelecasts = telecasts.filter(t => t.is_live);

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-28 overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
              style={{ backgroundColor: 'white', border: '1px solid #E8E4DD', color: '#D2811D' }}
            >
              <Radio className="h-4 w-4" />
              Live Broadcasts
            </div>
            
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              Live Telecast & Events
            </h1>
            
            <p className="text-lg mb-8 max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
              Watch live events, discourses, and broadcasts from MJRC and external sources. 
              Stay connected with the spiritual community through our live streaming platform.
            </p>

            {liveTelecasts.length > 0 && (
              <div 
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full animate-pulse"
                style={{ backgroundColor: '#DC2626', color: 'white' }}
              >
                <Radio className="h-4 w-4" />
                {liveTelecasts.length} Live Now
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="py-6" style={{ backgroundColor: 'white', borderBottom: '1px solid #E8E4DD' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button 
              onClick={() => setActiveTab("mjrc")}
              className="gap-2"
              style={activeTab === "mjrc" 
                ? { backgroundColor: '#D2811D', color: 'white' }
                : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
              }
            >
              <Building2 className="h-4 w-4" />
              From MJRC ({mjrcTelecasts.length})
            </Button>
            <Button 
              onClick={() => setActiveTab("outside")}
              className="gap-2"
              style={activeTab === "outside" 
                ? { backgroundColor: '#D2811D', color: 'white' }
                : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
              }
            >
              <Globe className="h-4 w-4" />
              From Outside of MJRC ({outsideTelecasts.length})
            </Button>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
              {activeTab === 'mjrc' ? 'From MJRC' : 'From Outside of MJRC'}
            </h2>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
              {activeTab === 'mjrc' 
                ? 'Live events and broadcasts from Muni Jambuvijayaji Research Center'
                : 'External broadcasts and events from partner organizations'
              }
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-10 w-10 animate-spin" style={{ color: '#D2811D' }} />
            </div>
          ) : currentTelecasts.length === 0 ? (
            <div className="text-center py-20 rounded-2xl" style={{ backgroundColor: 'white', border: '1px solid #E8E4DD' }}>
              <Video className="h-16 w-16 mx-auto mb-4" style={{ color: '#6B6764' }} />
              <h3 className="text-xl font-semibold mb-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                No Telecasts Available
              </h3>
              <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                Check back later for upcoming live events and broadcasts.
              </p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentTelecasts.map((telecast) => (
                <div
                  key={telecast.id}
                  className="rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group"
                  style={{ backgroundColor: 'white' }}
                >
                  <div className="aspect-video relative" style={{ backgroundColor: '#2D2A26' }}>
                    {telecast.thumbnail_url ? (
                      <img
                        src={telecast.thumbnail_url}
                        alt={telecast.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="h-16 w-16 text-white/40" />
                      </div>
                    )}
                    
                    {/* Live Badge */}
                    {telecast.is_live && (
                      <div className="absolute top-4 left-4">
                        <Badge className="text-sm animate-pulse" style={{ backgroundColor: '#DC2626' }}>
                          <Radio className="h-3 w-3 mr-1" />
                          LIVE
                        </Badge>
                      </div>
                    )}
                    
                    {/* Play Button Overlay */}
                    {telecast.stream_url && (
                      <div 
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ background: 'linear-gradient(to top, rgba(45,42,38,0.8), transparent)' }}
                      >
                        <div 
                          className="w-16 h-16 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: '#D2811D' }}
                        >
                          <Play className="h-8 w-8 text-white ml-1" />
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <h3 
                      className="font-semibold mb-2 line-clamp-2 group-hover:opacity-80 transition-colors"
                      style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                    >
                      {telecast.title}
                    </h3>
                    
                    {telecast.event_date && (
                      <p className="text-sm mb-2 flex items-center gap-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                        <Calendar className="h-4 w-4" />
                        {new Date(telecast.event_date).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'long',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                    )}
                    
                    {telecast.description && (
                      <p className="text-sm mb-4 line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                        {telecast.description}
                      </p>
                    )}
                    
                    {telecast.stream_url && (
                      <a
                        href={telecast.stream_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
                        style={{ color: '#D2811D' }}
                      >
                        {telecast.is_live ? 'Watch Live' : 'Watch Now'}
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 lg:py-20" style={{ backgroundColor: '#2D2A26' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
              Stay Connected with Our Community
            </h2>
            <p className="text-white/70 mb-8" style={{ fontFamily: 'Inter, sans-serif' }}>
              Subscribe to our newsletter to get notified about upcoming live events and broadcasts.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                asChild
                style={{ backgroundColor: '#D2811D', color: 'white' }}
              >
                <Link to="/community/events">
                  View All Events
                </Link>
              </Button>
              <Button 
                asChild
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link to="/contact">
                  Contact Us
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LiveTelecast;