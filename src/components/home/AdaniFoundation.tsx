import { Heart, ExternalLink, Award, Building2, Users } from "lucide-react";

const supporters = [
  { icon: Award, label: "Official Partner" },
  { icon: Building2, label: "Heritage Preservation" },
  { icon: Users, label: "Community Support" },
];

export function AdaniFoundation() {
  return (
    <section className="py-20 lg:py-24 bg-gradient-to-br from-[#E9EEF2] to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 right-20 w-40 h-40 border border-[#4A6FA5]/10 rounded-full" />
        <div className="absolute bottom-10 left-20 w-32 h-32 border border-[#4A6FA5]/10 rounded-full" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-[#DCE3E7] relative overflow-hidden">
            {/* Background accent */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#4A6FA5]/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative flex flex-col lg:flex-row items-center gap-8">
              {/* Icon with glow */}
              <div className="relative flex-shrink-0">
                <div className="absolute inset-0 bg-[#4A6FA5]/20 rounded-full blur-xl scale-150" />
                <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[#4A6FA5] to-[#3A5F95] flex items-center justify-center shadow-lg">
                  <Heart className="h-12 w-12 text-white" />
                </div>
              </div>
              
              <div className="flex-1 text-center lg:text-left">
                <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">Proudly Supported By</p>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-[#2B3A4A] mb-4">
                  Adani Foundation
                </h3>
                <p className="text-[#555555] text-lg mb-6 max-w-xl">
                  We are deeply grateful for the generous support from Adani Foundation 
                  in preserving and promoting Jain heritage, literature, and sacred knowledge.
                </p>
                
                {/* Support categories */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-6">
                  {supporters.map((item) => (
                    <div 
                      key={item.label}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E9EEF2] border border-[#DCE3E7]"
                    >
                      <item.icon className="h-4 w-4 text-[#4A6FA5]" />
                      <span className="text-sm text-[#2B3A4A] font-medium">{item.label}</span>
                    </div>
                  ))}
                </div>
                
                <a 
                  href="https://www.adanifoundation.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#4A6FA5] text-white font-medium hover:bg-[#3A5F95] transition-all shadow-lg shadow-[#4A6FA5]/20 group"
                >
                  Visit Adani Foundation
                  <ExternalLink className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
