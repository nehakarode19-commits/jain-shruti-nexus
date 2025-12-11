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
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3 font-body" style={{ color: '#E88A1A' }}>
            Sacred Teachings
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4" style={{ color: '#1E3A5F' }}>
            Guruvani
          </h2>
          
          <p className="text-[15px] leading-relaxed font-body" style={{ color: '#666666' }}>
            Explore the profound discourses, teachings, and spiritual guidance from Gurudev Muni 
            Jambuvijayji Maharaj's lifetime of devotion.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#1E3A5F' }} />
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
                    className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                    style={{ backgroundColor: '#FDF8F3', border: '1px solid #E5E0D5' }}
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image_url || fallbackImages[index % fallbackImages.length]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.is_restricted && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(255,255,255,0.9)' }}>
                          <Lock className="h-3.5 w-3.5" style={{ color: '#666666' }} />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-1 rounded-full text-xs font-medium font-body" style={{ backgroundColor: 'rgba(232, 138, 26, 0.1)', color: '#E88A1A' }}>
                          {item.category || "Teaching"}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2" style={{ color: '#1E3A5F' }}>
                        {item.title}
                      </h3>
                      <p className="text-sm line-clamp-2 leading-relaxed font-body" style={{ color: '#666666' }}>
                        {item.content || "Explore this sacred teaching from Gurudev's collection of wisdom and spiritual guidance."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-10">
                <p className="font-body" style={{ color: '#666666' }}>No Guruvani items available yet.</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="rounded-xl p-5 flex flex-col sm:flex-row items-center gap-4" style={{ backgroundColor: '#FDF8F3', border: '1px solid #E5E0D5' }}>
            <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'rgba(232, 138, 26, 0.1)' }}>
              <Mail className="h-5 w-5" style={{ color: '#E88A1A' }} />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="font-semibold text-sm mb-0.5 font-body" style={{ color: '#1E3A5F' }}>
                Subscribe to receive updates
              </p>
              <p className="text-xs font-body" style={{ color: '#666666' }}>
                Get notified when new teachings are published
              </p>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Input 
                type="email" 
                placeholder="Enter your email" 
                className="h-9 min-w-[180px] text-sm font-body"
              />
              <Button 
                className="text-white h-9 px-4"
                style={{ backgroundColor: '#E88A1A' }}
              >
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
            className="h-10 px-6 text-sm font-body"
            style={{ borderColor: '#E5E0D5', color: '#1E3A5F' }}
            asChild
          >
            <Link to="/guruvani">
              Type to Explore
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
