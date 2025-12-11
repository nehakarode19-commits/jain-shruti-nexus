import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mic, FileText, BookOpen, Loader2, Sparkles, Lock } from "lucide-react";
import { useGuruvaniFromDB } from "@/hooks/useContent";

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
    <section className="py-24 lg:py-32 bg-card relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-background to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-background border border-border mb-6">
            <Sparkles className="h-4 w-4 text-accent" />
            <span className="text-sm text-muted-foreground font-medium">Sacred Teachings</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-6">
            Guruvani
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed">
            Explore the profound discourses, teachings, and spiritual guidance from Gurudev Muni 
            Jambuvijayji Maharaj's lifetime of devotion.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {/* Guruvani Cards */}
            <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-5xl mx-auto">
              {displayItems.map((item, index) => {
                const Icon = typeIcons[item.category || ""] || FileText;
                return (
                  <Link
                    key={item.id}
                    to={item.is_restricted ? "/auth" : `/guruvani/${item.id}`}
                    className="group bg-card border border-border rounded-2xl overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300"
                  >
                    <div className="aspect-[4/3] overflow-hidden relative">
                      <img
                        src={item.image_url || fallbackImages[index % fallbackImages.length]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {item.is_restricted && (
                        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-card/90 flex items-center justify-center">
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                          {item.category || "Teaching"}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg font-bold text-primary mb-2 group-hover:text-primary/80 transition-colors line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {item.content || "Explore this sacred teaching from Gurudev's collection of wisdom and spiritual guidance."}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No Guruvani items available yet.</p>
              </div>
            )}
          </>
        )}

        {/* Access Notice */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-background rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
              <Lock className="h-6 w-6 text-accent" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-primary font-semibold mb-1">
                Some Guruvani content is restricted
              </p>
              <p className="text-sm text-muted-foreground">
                Sign in or register as a Scholar to request access to Gurudev's teachings
              </p>
            </div>
            <Link 
              to="/auth"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-accent-foreground font-medium text-sm hover:bg-accent/90 transition-colors"
            >
              Sign In / Register
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            size="lg"
            asChild
          >
            <Link to="/guruvani">
              Browse All Guruvani
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
