import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Heart, Building, Award, Handshake } from "lucide-react";

const highlights = [
  {
    icon: Heart,
    title: "CSR Partner",
    description: "Supporting the preservation of India's rich cultural and spiritual heritage"
  },
  {
    icon: Building,
    title: "Infrastructure Support",
    description: "Contributing to the development of Gyan Kendra and research facilities"
  },
  {
    icon: Award,
    title: "Knowledge Preservation",
    description: "Funding digitization of rare manuscripts and ancient texts"
  },
  {
    icon: Handshake,
    title: "Community Development",
    description: "Enabling educational programs and community outreach initiatives"
  },
];

export function AdaniFoundation() {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-background to-secondary/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00529B]/10 border border-[#00529B]/20 text-sm mb-6">
              <Handshake className="h-4 w-4 text-[#00529B]" />
              <span className="text-muted-foreground">Our Valued Partner</span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Supported by <span className="text-[#00529B]">Adani Foundation</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We are proud to be supported by the Adani Foundation in our mission to preserve 
              and share the timeless wisdom of Jain philosophy with the world.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-5 gap-8 items-center mb-12">
            {/* Logo and Description */}
            <div className="lg:col-span-2 animate-fade-up">
              <Card variant="feature" className="overflow-hidden">
                <CardContent className="p-8 text-center">
                  {/* Adani Foundation Logo Placeholder */}
                  <div className="w-full max-w-[200px] mx-auto mb-6 p-4 bg-white rounded-xl shadow-soft">
                    <div className="text-2xl font-bold text-[#00529B]">
                      ADANI
                    </div>
                    <div className="text-sm text-[#00529B] font-medium">
                      Foundation
                    </div>
                    <div className="text-xs text-muted-foreground mt-1">
                      Growth with Goodness
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    The Adani Foundation, the CSR arm of Adani Group, is committed to sustainable 
                    development and enriching lives across communities. Their support enables us 
                    to preserve India's spiritual heritage.
                  </p>
                  <Button variant="outline" size="sm" asChild>
                    <a 
                      href="https://www.adanifoundation.org/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Adani Foundation
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Highlights Grid */}
            <div className="lg:col-span-3">
              <div className="grid sm:grid-cols-2 gap-4">
                {highlights.map((item, index) => (
                  <Card 
                    key={item.title}
                    variant="interactive"
                    className="animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-[#00529B]/10 flex items-center justify-center shrink-0">
                          <item.icon className="h-5 w-5 text-[#00529B]" />
                        </div>
                        <div>
                          <h3 className="font-display font-semibold text-foreground mb-1">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Quote/Message */}
          <Card variant="feature" className="animate-fade-up delay-300">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#00529B] to-[#003d75] flex items-center justify-center shrink-0">
                  <Heart className="h-8 w-8 text-white" />
                </div>
                <div className="text-center md:text-left">
                  <blockquote className="text-lg md:text-xl text-foreground font-display italic mb-2">
                    "Preserving cultural heritage is preserving our identity. We are honored to 
                    support the mission of Jambu-Shruti in safeguarding the wisdom of Jain philosophy 
                    for future generations."
                  </blockquote>
                  <cite className="text-sm text-muted-foreground not-italic">
                    — Adani Foundation, Growth with Goodness
                  </cite>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}