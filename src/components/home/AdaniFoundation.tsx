import { Heart, ExternalLink, Award, Building2, Users, BookOpen, Quote, Sparkles } from "lucide-react";

const supporters = [
  { icon: Award, label: "CSR Partner", description: "Strategic partnership for heritage preservation" },
  { icon: Building2, label: "Infrastructure Support", description: "Building research facilities" },
  { icon: BookOpen, label: "Knowledge Preservation", description: "Digitizing sacred manuscripts" },
  { icon: Users, label: "Community Development", description: "Supporting scholars and researchers" },
];

export function AdaniFoundation() {
  return (
    <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-20 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute bottom-10 left-20 w-32 h-32 border border-primary/10 rounded-full" />
      </div>

      <div className="container mx-auto px-6 relative">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-card border border-border mb-6">
            <Sparkles className="h-4 w-4 text-orange" />
            <span className="text-sm text-muted-foreground font-medium">Our Supporters</span>
          </div>
          
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary mb-4">
            Supported by <span className="text-orange">Adani Foundation</span>
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed max-w-2xl mx-auto">
            We are grateful for the Adani Foundation's generous support in preserving and promoting 
            Jain heritage, literature, and sacred knowledge for future generations.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-card rounded-3xl p-8 md:p-10 shadow-xl border border-border relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-orange/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative">
              {/* Logo and Description */}
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center">
                    <span className="font-heading text-xl font-bold text-primary">ADANI</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 text-center">Foundation</p>
                </div>
                
                <div className="flex-1">
                  <p className="text-muted-foreground text-base leading-relaxed">
                    The Adani Foundation has been instrumental in supporting our mission to digitize, 
                    preserve, and share the rich heritage of Jain literature. Their commitment to 
                    knowledge preservation aligns perfectly with Gurudev's vision.
                  </p>
                  <a 
                    href="https://www.adanifoundation.org/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-orange hover:text-orange/80 font-medium text-sm mt-4 transition-colors"
                  >
                    Visit Adani Foundation
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              </div>
              
              {/* Support categories */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {supporters.map((item) => (
                  <div 
                    key={item.label}
                    className="flex flex-col p-4 rounded-xl bg-background border border-border"
                  >
                    <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center mb-3">
                      <item.icon className="h-5 w-5 text-orange" />
                    </div>
                    <h4 className="text-sm font-semibold text-primary mb-1">{item.label}</h4>
                    <p className="text-xs text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Quote */}
              <div className="bg-background rounded-xl p-5 border-l-4 border-orange">
                <div className="flex gap-4">
                  <Quote className="h-6 w-6 text-orange/40 flex-shrink-0" />
                  <div>
                    <p className="text-primary italic leading-relaxed">
                      "Preserving cultural heritage is preserving our identity. We are honored to support the mission of Jambu-
                      Shruti in safeguarding the wisdom of Jain philosophy for future generations."
                    </p>
                    <p className="text-sm text-muted-foreground mt-3 font-medium">
                      — Adani Foundation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
