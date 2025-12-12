import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useGuruvaniFromDB } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Scroll, 
  Search, 
  BookOpen, 
  Mic, 
  FileText, 
  Lock, 
  ArrowRight,
  Quote,
  Loader2
} from "lucide-react";

const typeIcons: Record<string, typeof Mic> = {
  Discourse: Mic,
  "Written Work": BookOpen,
  Letter: FileText,
  Notes: FileText,
};

const Guruvani = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const { data: guruvaniItems = [], isLoading } = useGuruvaniFromDB();

  const filteredItems = guruvaniItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.content || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.category === selectedType;
    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(guruvaniItems.map(item => item.category).filter(Boolean)));

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 relative overflow-hidden" style={{ backgroundColor: '#FAF7F2' }}>
        {/* Diamond Pattern Background */}
        <div className="absolute inset-0 pointer-events-none" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A227' fill-opacity='0.08'%3E%3Cpath d='M30 0l4 4-4 4-4-4 4-4zm0 52l4 4-4 4-4-4 4-4zM4 26l4 4-4 4-4-4 4-4zm52 0l4 4-4 4-4-4 4-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm mb-6"
              style={{ backgroundColor: 'rgba(201,162,39,0.1)', border: '1px solid rgba(201,162,39,0.2)' }}
            >
              <Scroll className="h-4 w-4" style={{ color: '#C9A227' }} />
              <span style={{ color: '#C9A227', fontFamily: 'Inter, sans-serif' }}>Sacred Teachings</span>
            </div>
            <h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              Guruvani
            </h1>
            <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764', fontSize: '1.125rem' }}>
              Explore the profound discourses, written works, letters, and spiritual guidance 
              from Gurudev Muni Jambuvijayji Maharaj.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-8" style={{ backgroundColor: 'rgba(201,162,39,0.05)', borderTop: '1px solid rgba(201,162,39,0.1)', borderBottom: '1px solid rgba(201,162,39,0.1)' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-8 w-8 mx-auto mb-3" style={{ color: 'rgba(201,162,39,0.3)' }} />
            <blockquote 
              className="text-lg italic"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              "The lamp of knowledge dispels the darkness of ignorance. Seek truth with humility and devotion."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 sticky top-16 z-40" style={{ backgroundColor: '#FAF7F2', borderBottom: '1px solid #E8E4DD' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#6B6764' }} />
              <Input
                placeholder="Search Guruvani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ borderColor: '#E8E4DD' }}
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                size="sm"
                onClick={() => setSelectedType(null)}
                style={selectedType === null 
                  ? { backgroundColor: '#C9A227', color: 'white' }
                  : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
                }
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  size="sm"
                  onClick={() => setSelectedType(type || null)}
                  style={selectedType === type 
                    ? { backgroundColor: '#C9A227', color: 'white' }
                    : { backgroundColor: 'white', color: '#2D2A26', border: '1px solid #E8E4DD' }
                  }
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C9A227' }} />
            </div>
          ) : (
            <>
              {/* Access Notice */}
              <div 
                className="mb-8 p-4 rounded-xl flex items-start gap-4"
                style={{ backgroundColor: 'rgba(201,162,39,0.05)', border: '1px solid #E8E4DD' }}
              >
                <Lock className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#6B6764' }} />
                <div>
                  <p className="font-medium mb-1" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                    Some content requires authentication
                  </p>
                  <p style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                    Items marked with a lock icon require you to be logged in. Scholars may request access to restricted materials.
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item, index) => {
                  const Icon = typeIcons[item.category || ""] || FileText;
                  const isRestricted = item.is_restricted;
                  return (
                    <Link 
                      key={item.id} 
                      to={isRestricted ? "/auth" : `/guruvani/${item.id}`}
                      className="group"
                    >
                      <div 
                        className="rounded-xl overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                        style={{ backgroundColor: 'white', border: '1px solid #E8E4DD' }}
                      >
                        {/* Cover Image */}
                        <div className="aspect-[4/3] overflow-hidden relative" style={{ backgroundColor: '#F5EFE6' }}>
                          <img 
                            src={item.image_url || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                            <Badge 
                              className="text-xs border-0"
                              style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#2D2A26' }}
                            >
                              <Icon className="h-3 w-3 mr-1" />
                              {item.category || "Discourse"}
                            </Badge>
                            {isRestricted && (
                              <Badge 
                                className="text-xs"
                                style={{ backgroundColor: 'rgba(255,255,255,0.9)', color: '#6B6764' }}
                              >
                                <Lock className="h-3 w-3 mr-1" />
                                Restricted
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge 
                              variant="outline" 
                              className="text-xs"
                              style={{ borderColor: '#E8E4DD', color: '#6B6764' }}
                            >
                              {item.source || "Gujarati"}
                            </Badge>
                            <span className="text-xs" style={{ color: '#6B6764' }}>
                              {item.date ? new Date(item.date).getFullYear() : ""}
                            </span>
                          </div>
                          <h3 
                            className="text-lg font-semibold mb-2 line-clamp-2 group-hover:opacity-80 transition-opacity"
                            style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                          >
                            {item.title}
                          </h3>
                          <p 
                            className="text-sm line-clamp-2 mb-4"
                            style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
                          >
                            {item.content}
                          </p>
                          <div className="pt-3" style={{ borderTop: '1px solid #E8E4DD' }}>
                            {isRestricted ? (
                              <div className="flex items-center justify-center gap-2 text-sm" style={{ color: '#6B6764' }}>
                                <Lock className="h-3.5 w-3.5" />
                                <span>Sign In to Access</span>
                              </div>
                            ) : (
                              <div 
                                className="flex items-center justify-center text-sm font-medium group-hover:underline"
                                style={{ color: '#C9A227' }}
                              >
                                Read More
                                <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {filteredItems.length === 0 && (
                <div className="text-center py-12">
                  <p style={{ color: '#6B6764' }}>No items found matching your search.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Request Access CTA */}
      <section className="py-16" style={{ backgroundColor: '#F5EFE6' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 
            className="text-2xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
          >
            Access Restricted Teachings
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
            Scholars and dedicated seekers can request access to restricted Guruvani materials. 
            Create an account and apply through the Scholar Portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              asChild
              style={{ backgroundColor: '#C9A227', color: 'white' }}
            >
              <Link to="/auth">
                Create Account
              </Link>
            </Button>
            <Button 
              variant="outline" 
              asChild
              style={{ borderColor: '#E8E4DD', color: '#2D2A26' }}
            >
              <Link to="/scholars">
                Scholar Portal
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Guruvani;
