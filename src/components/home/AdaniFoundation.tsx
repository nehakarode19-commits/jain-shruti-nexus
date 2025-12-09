import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Building, Award, Handshake } from "lucide-react";

const highlights = [
  { icon: Heart, title: "CSR Partner", description: "Supporting cultural heritage preservation" },
  { icon: Building, title: "Infrastructure", description: "Gyan Kendra development" },
  { icon: Award, title: "Knowledge", description: "Manuscript digitization funding" },
  { icon: Handshake, title: "Community", description: "Educational programs support" },
];

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00529B]/10 border border-[#00529B]/20 mb-4">
              <Handshake className="h-4 w-4 text-[#00529B]" />
              <span className="text-sm text-muted-foreground">Our Valued Partner</span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Supported by <span className="text-[#00529B]">Adani Foundation</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are proud to be supported by the Adani Foundation in our mission to preserve 
              and share the timeless wisdom of Jain philosophy.
            </p>
          </div>

          {/* Content Grid */}
          <div className="grid md:grid-cols-5 gap-6 items-center">
            {/* Logo */}
            <div className="md:col-span-2 text-center">
              <div className="inline-block p-6 rounded-2xl bg-card border border-border/50">
                <div className="w-40 mx-auto p-4 bg-white rounded-xl shadow-soft mb-4">
                  <div className="text-2xl font-bold text-[#00529B]">ADANI</div>
                  <div className="text-sm text-[#00529B] font-medium">Foundation</div>
                  <div className="text-xs text-muted-foreground mt-1">Growth with Goodness</div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.adanifoundation.org/" target="_blank" rel="noopener noreferrer">
                    Visit Website
                    <ExternalLink className="h-3 w-3 ml-2" />
                  </a>
                </Button>
              </div>
            </div>

            {/* Highlights */}
            <div className="md:col-span-3 grid grid-cols-2 gap-4">
              {highlights.map((item) => (
                <div 
                  key={item.title}
                  className="p-4 rounded-xl bg-card border border-border/50 hover:border-[#00529B]/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#00529B]/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-[#00529B]" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}