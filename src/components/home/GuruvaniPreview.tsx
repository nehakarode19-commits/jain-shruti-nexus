import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, FileText, BookOpen, Loader2, Lock, Mail, Send } from "lucide-react";
import { useGuruvaniFromDB } from "@/hooks/useContent";
import { Input } from "@/components/ui/input";

import guruvaniImg1 from "@/assets/books/guruvani-1.jpg";
import guruvaniImg2 from "@/assets/books/guruvani-2.jpg";
import guruvaniImg3 from "@/assets/books/guruvani-3.jpg";

const typeIcons: Record<string, typeof Mic> = {
  Discourse: Mic,
  "Written Work": FileText,
  Letter: BookOpen,
  Notes: FileText,
};

const fallbackImages = [guruvaniImg1, guruvaniImg2, guruvaniImg3];

export function GuruvaniPreview() {
  const { data: guruvaniItems = [], isLoading } = useGuruvaniFromDB();
  
  const displayItems = guruvaniItems.slice(0, 3);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
            Sacred Teachings
          </p>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
            Guruvani
          </h2>
          
          <p className="text-[15px] leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
            Explore the profound discourses, teachings, and spiritual guidance from Gurudev Muni 
            Jambuvijayaji Maharaj's lifetime of devotion.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#2D2A26]" />
          </div>
        ) : (
          <>
            {/* Guruvani Cards */}
            <div className="grid md:grid-cols-3 gap-5 mb-10 max-w-5xl mx-auto">
              {displayItems.map((item, index) => {
                const Icon = typeIcons[item.category || ""] || FileText;
                return (
                  <Link
                    key={item.id}
                    to={item.is_restricted ? "/auth" : `/guruvani/${item.id}`}
                    className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg bg-[#FAF7F2] border border-[#E5E0D5]"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image_url || fallbackImages[index % fallbackImages.length]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.is_restricted && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center bg-white/90">
                          <Lock className="h-3.5 w-3.5 text-[#5A5650]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-[#C9A227]/10 text-[#C9A227]" style={{ fontFamily: 'Inter, sans-serif' }}>
                          {item.category || "Teaching"}
                        </span>
                      </div>
                      <h3 className="text-base font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm line-clamp-2 leading-relaxed" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                        {item.content || "Explore this sacred teaching from Gurudev's collection of wisdom and spiritual guidance."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-10">
                <p style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>No Guruvani items available yet.</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4 bg-[#FAF7F2] border border-[#E5E0D5]">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-[#C9A227]/10">
              <Mail className="h-5 w-5 text-[#C9A227]" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="font-semibold text-sm mb-0.5" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                Subscribe to receive updates
              </p>
              <p className="text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                Get notified when new teachings are published
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-9 min-w-[180px] text-sm"
                style={{ fontFamily: 'Inter, sans-serif' }}
              />
              <Button className="text-white h-9 px-4 bg-[#D4A03C] hover:bg-[#C49030]">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            className="h-10 px-6 text-sm border-[#E5E0D5] text-[#2D2A26] bg-white hover:bg-gray-50"
            style={{ fontFamily: 'Inter, sans-serif' }}
            asChild
          >
            <Link to="/guruvani">
              Explore All Teachings
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
