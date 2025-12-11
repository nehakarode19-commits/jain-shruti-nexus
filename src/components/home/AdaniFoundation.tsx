import { ExternalLink, Award, Building2, Users, BookOpen, Quote } from "lucide-react";

const supporters = [
  { icon: Award, label: "CSR Partner", description: "Strategic partnership for heritage preservation" },
  { icon: Building2, label: "Infrastructure Support", description: "Building research facilities" },
  { icon: BookOpen, label: "Knowledge Preservation", description: "Digitizing sacred manuscripts" },
  { icon: Users, label: "Community Development", description: "Supporting scholars and researchers" },
];

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#FDF8F3' }}>
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <p className="font-semibold uppercase tracking-wider text-xs mb-3 font-body" style={{ color: '#E88A1A' }}>
            Our Supporters
          </p>
          
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3" style={{ color: '#1E3A5F' }}>
            Supported by <span style={{ color: '#E88A1A', textDecoration: 'underline', textDecorationColor: 'rgba(232, 138, 26, 0.3)', textUnderlineOffset: '4px' }}>Adani Foundation</span>
          </h2>
          
          <p className="text-[15px] leading-relaxed max-w-2xl mx-auto font-body" style={{ color: '#666666' }}>
            We are grateful for their generous support in preserving and promoting 
            Jain heritage, literature, and sacred knowledge for future generations.
          </p>
        </div>

        {/* Main Card */}
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl p-6 md:p-8 shadow-lg" style={{ backgroundColor: '#FFFFFF', border: '1px solid #E5E0D5' }}>
            {/* Logo and Description */}
            <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-xl flex items-center justify-center shadow-sm" style={{ backgroundColor: '#FDF8F3', border: '1px solid #E5E0D5' }}>
                  <div className="text-center">
                    <span className="font-heading text-xl font-bold block" style={{ color: '#1E3A5F' }}>ADANI</span>
                    <span className="text-[10px] font-body" style={{ color: '#666666' }}>FOUNDATION</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <p className="text-sm leading-relaxed font-body mb-3" style={{ color: '#666666' }}>
                  The Adani Foundation has been instrumental in supporting our mission to digitize, 
                  preserve, and share the rich heritage of Jain literature. Their commitment to 
                  knowledge preservation aligns perfectly with Gurudev's vision of making ancient wisdom accessible.
                </p>
                <a 
                  href="https://www.adanifoundation.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 font-medium text-sm transition-opacity hover:opacity-70 font-body"
                  style={{ color: '#E88A1A' }}
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
                  className="flex flex-col p-3.5 rounded-lg transition-colors"
                  style={{ backgroundColor: '#FDF8F3', border: '1px solid #E5E0D5' }}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-2.5" style={{ backgroundColor: 'rgba(232, 138, 26, 0.1)' }}>
                    <item.icon className="h-4 w-4" style={{ color: '#E88A1A' }} />
                  </div>
                  <h4 className="text-sm font-semibold mb-0.5 font-body" style={{ color: '#1E3A5F' }}>{item.label}</h4>
                  <p className="text-xs font-body" style={{ color: '#666666' }}>{item.description}</p>
                </div>
              ))}
            </div>

            {/* Quote */}
            <div className="rounded-lg p-4" style={{ backgroundColor: '#FDF8F3', borderLeft: '4px solid #E88A1A' }}>
              <div className="flex gap-3">
                <Quote className="h-5 w-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(232, 138, 26, 0.4)' }} />
                <div>
                  <p className="italic text-sm leading-relaxed font-body" style={{ color: '#1E3A5F' }}>
                    "Preserving cultural heritage is preserving our identity. We are honored to support the mission of Jambushrusti in safeguarding the wisdom of Jain philosophy for future generations."
                  </p>
                  <p className="text-xs mt-2 font-medium font-body" style={{ color: '#999999' }}>
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
