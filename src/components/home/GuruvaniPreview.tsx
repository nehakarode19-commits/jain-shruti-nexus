import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Mic, FileText, Loader2 } from "lucide-react";
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
  
  // Take first 3 items for preview
  const displayItems = guruvaniItems.slice(0, 3);

  return (
    <section className="py-14 lg:py-18 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">Sacred Teachings</p>
          <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-[#2B3A4A] mb-3">
            Guruvani
          </h2>
          <p className="text-[#555555] max-w-xl mx-auto">
            Wisdom from Gurudev Muni Jambuvijayji Maharaj's teachings and writings.
          </p>
          <div className="w-16 h-1 bg-[#4A6FA5] mx-auto mt-4 rounded-full" />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
          </div>
        ) : (
          <>
            {/* Compact Grid */}
            <div className="grid md:grid-cols-3 gap-5 mb-8 max-w-5xl mx-auto">
              {displayItems.map((item, index) => {
                const Icon = typeIcons[item.category || ""] || FileText;
                return (
                  <Link
                    key={item.id}
                    to={`/guruvani/${item.id}`}
                    className="group bg-white border border-[#DCE3E7] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#4A6FA5] transition-all"
                  >
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={item.image_url || fallbackImages[index % fallbackImages.length]}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 rounded-full bg-[#4A6FA5]/10 text-[#4A6FA5] text-xs font-medium">
                          {item.category || "Teaching"}
                        </span>
                        <span className="text-xs text-[#555555]">
                          {item.date ? new Date(item.date).getFullYear() : ""}
                        </span>
                      </div>
                      <h3 className="font-semibold text-[#2B3A4A] mb-1 group-hover:text-[#4A6FA5] transition-colors line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#555555] line-clamp-2">
                        {item.content}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            {displayItems.length === 0 && (
              <div className="text-center py-8">
                <p className="text-[#555555]">No Guruvani items available yet.</p>
              </div>
            )}
          </>
        )}

        {/* CTA */}
        <div className="text-center">
          <Button 
            variant="outline"
            asChild
            className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white"
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
