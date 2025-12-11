import { ExternalLink, Award, Building2, Users, BookOpen, Quote } from "lucide-react";

const supporters = [
  { icon: Award, label: "CSR Partner", description: "Strategic partnership for heritage preservation" },
  { icon: Building2, label: "Infrastructure Support", description: "Building research facilities" },
  { icon: BookOpen, label: "Knowledge Preservation", description: "Digitizing sacred manuscripts" },
  { icon: Users, label: "Community Development", description: "Supporting scholars and researchers" },
];

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="text-orange font-semibold uppercase tracking-wider text-xs mb-3 font-body">
            Our Supporters
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary mb-3">
            Supported by <span className="text-orange">Adani Foundation</span>
          </h2>
          
          <p className="text-muted-foreground text-[15px] leading-relaxed max-w-2xl mx-auto font-body">
            We are grateful for the Adani Foundation's generous support in preserving and promoting 
            Jain heritage, literature, and sacred knowledge for future generations.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl p-6 md:p-8 shadow-lg border border-border">
            {/* Logo and Description */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-xl bg-background border border-border flex items-center justify-center">
                  <span className="font-heading text-lg font-bold text-primary">ADANI</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1.5 text-center font-body">Foundation</p>
              </div>
              
              <div className="flex-1">
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  The Adani Foundation has been instrumental in supporting our mission to digitize, 
                  preserve, and share the rich heritage of Jain literature. Their commitment to 
                  knowledge preservation aligns perfectly with Gurudev's vision.
                </p>
                <a 
                  href="https://www.adanifoundation.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-orange hover:text-orange/80 font-medium text-sm mt-3 transition-colors font-body"
                >
                  Visit Adani Foundation
                  <ExternalLink className="h-4 w-4" />
                </a>
              </div>
            </div>
            
            {/* Support categories */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {supporters.map((item) => (
                <div 
                  key={item.label}
                  className="flex flex-col p-3.5 rounded-lg bg-background border border-border"
                >
                  <div className="w-9 h-9 rounded-lg bg-orange/10 flex items-center justify-center mb-2.5">
                    <item.icon className="h-4 w-4 text-orange" />
                  </div>
                  <h4 className="text-sm font-semibold text-primary mb-0.5 font-body">{item.label}</h4>
                  <p className="text-xs text-muted-foreground font-body">{item.description}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="bg-background rounded-lg p-4 border-l-4 border-orange">
              <div className="flex gap-3">
                <Quote className="h-5 w-5 text-orange/40 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-primary italic text-sm leading-relaxed font-body">
                    "Preserving cultural heritage is preserving our identity. We are honored to support the mission of Jambu-
                    Shruti in safeguarding the wisdom of Jain philosophy for future generations."
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 font-medium font-body">
                    — Adani Foundation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
