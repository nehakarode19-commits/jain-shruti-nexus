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
    <section className="py-16 lg:py-20 bg-card">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <p className="text-orange font-semibold uppercase tracking-wider text-xs mb-3 font-body">
            Sacred Teachings
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-4">
            Guruvani
          </h2>
          
          <p className="text-muted-foreground text-[15px] leading-relaxed font-body">
            Explore the profound discourses, teachings, and spiritual guidance from Gurudev Muni 
            Jambuvijayji Maharaj's lifetime of devotion.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
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
                    className="group bg-background border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-orange/30 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image_url || fallbackImages[index % fallbackImages.length]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.is_restricted && (
                        <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-card/90 flex items-center justify-center">
                          <Lock className="h-3.5 w-3.5 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2.5">
                        <span className="px-2.5 py-1 rounded-full bg-orange/10 text-orange text-xs font-medium font-body">
                          {item.category || "Teaching"}
                        </span>
                      </div>
                      <h3 className="font-heading text-base font-semibold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed font-body">
                        {item.content || "Explore this sacred teaching from Gurudev's collection of wisdom and spiritual guidance."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground font-body">No Guruvani items available yet.</p>
              </div>
            )}
          </>
        )}

        {/* Newsletter Signup */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-background rounded-xl p-5 border border-border flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
              <Mail className="h-5 w-5 text-orange" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-primary font-semibold text-sm mb-0.5 font-body">
                Subscribe to receive updates
              </p>
              <p className="text-xs text-muted-foreground font-body">
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
                className="bg-orange hover:bg-orange/90 text-white h-9 px-4"
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
            className="border-border text-primary hover:bg-primary/5 h-10 px-6 text-sm font-body"
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
