import { Heart, ExternalLink } from "lucide-react";

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-20 bg-[#E9EEF2]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
          <div className="w-16 h-16 rounded-full bg-[#4A6FA5]/10 flex items-center justify-center flex-shrink-0">
            <Heart className="h-8 w-8 text-[#4A6FA5]" />
          </div>
          <div>
            <p className="text-[#555555] mb-1 text-sm uppercase tracking-wider font-medium">Supported By</p>
            <h3 className="font-heading text-xl md:text-2xl font-bold text-[#2B3A4A] mb-2">
              Adani Foundation
            </h3>
            <p className="text-[#555555] max-w-xl">
              We are grateful for the generous support from Adani Foundation 
              in preserving and promoting Jain heritage and knowledge.
            </p>
          </div>
          <a 
            href="https://www.adanifoundation.org/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#4A6FA5] text-white font-medium hover:bg-[#3A5F95] transition-colors flex-shrink-0"
          >
            Visit Website
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
