import { ExternalLink, Award, Building2, Users, BookOpen, Quote } from "lucide-react";

const supporters = [
  { icon: Award, label: "CSR Partner", description: "Strategic partnership for heritage preservation" },
  { icon: Building2, label: "Infrastructure Support", description: "Building research facilities" },
  { icon: BookOpen, label: "Knowledge Preservation", description: "Digitizing sacred manuscripts" },
  { icon: Users, label: "Community Development", description: "Supporting scholars and researchers" },
];

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-20 bg-[#FAF7F2]">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
            Our Supporters
          </p>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
            Supported by <span className="text-[#C9A227] underline decoration-[#C9A227]/30 underline-offset-4">Adani Foundation</span>
          </h2>
          
          <p className="text-[15px] leading-relaxed max-w-2xl mx-auto" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
            We are grateful for their generous support in preserving and promoting 
            Jain heritage, literature, and sacred knowledge for future generations.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 md:p-8 shadow-lg bg-white border border-[#E5E0D5]">
            {/* Logo and Description */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-sm bg-[#FAF7F2] border border-[#E5E0D5]">
                  <div className="text-center">
                    <span className="text-xl font-bold block text-[#2D2A26]" style={{ fontFamily: 'Playfair Display, serif' }}>ADANI</span>
                    <span className="text-[10px] text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>FOUNDATION</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm leading-relaxed mb-3 text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>
                  The Adani Foundation has been instrumental in supporting our mission to digitize, 
                  preserve, and share the rich heritage of Jain literature. Their commitment to 
                  knowledge preservation aligns perfectly with Gurudev's vision of making ancient wisdom accessible.
                </p>
                <a 
                  href="https://www.adanifoundation.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-sm transition-opacity hover:opacity-70 text-[#C9A227]"
                  style={{ fontFamily: 'Inter, sans-serif' }}
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
                  className="flex flex-col p-3.5 rounded-lg transition-colors bg-[#FAF7F2] border border-[#E5E0D5]"
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5 bg-[#C9A227]/10">
                    <item.icon className="h-4 w-4 text-[#C9A227]" />
                  </div>
                  <h4 className="text-sm font-semibold mb-0.5 text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.label}</h4>
                  <p className="text-xs text-[#5A5650]" style={{ fontFamily: 'Inter, sans-serif' }}>{item.description}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-lg p-4 bg-[#FAF7F2] border-l-4 border-[#C9A227]">
              <div className="flex gap-3">
                <Quote className="h-5 w-5 flex-shrink-0 mt-0.5 text-[#C9A227]/40" />
                <div>
                  <p className="italic text-sm leading-relaxed text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>
                    "Preserving cultural heritage is preserving our identity. We are honored to support the mission of Jambushrusti in safeguarding the wisdom of Jain philosophy for future generations."
                  </p>
                  <p className="text-xs mt-2 font-medium text-[#8B8B8B]" style={{ fontFamily: 'Inter, sans-serif' }}>
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
