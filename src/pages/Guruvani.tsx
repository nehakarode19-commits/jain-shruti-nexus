import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
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
  Filter,
  ArrowRight,
  Quote
} from "lucide-react";

const guruvaniItems = [
  {
    id: 1,
    title: "On the Nature of Soul (Jiva)",
    type: "Discourse",
    language: "Gujarati",
    date: "1985",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true nature of the self...",
    tags: ["Philosophy", "Jiva", "Moksha"],
    restricted: false,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg",
  },
  {
    id: 2,
    title: "Commentary on Tattvartha Sutra",
    type: "Written Work",
    language: "Sanskrit",
    date: "1978",
    excerpt: "A comprehensive examination of reality as presented in the foundational Jain scripture by Umaswati...",
    tags: ["Agama", "Tattvartha", "Commentary"],
    restricted: false,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg",
  },
  {
    id: 3,
    title: "Guidance for Young Monks",
    type: "Letter",
    language: "Hindi",
    date: "1990",
    excerpt: "The path of a monk requires unwavering dedication to ahimsa, truthfulness, and self-discipline...",
    tags: ["Monkhood", "Guidance", "Discipline"],
    restricted: true,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/43-min.jpg",
  },
  {
    id: 4,
    title: "Pravachan on Anekantavada",
    type: "Discourse",
    language: "Gujarati",
    date: "1995",
    excerpt: "The doctrine of many-sidedness teaches us that truth can be perceived from multiple perspectives...",
    tags: ["Philosophy", "Anekanta", "Logic"],
    restricted: false,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/48-min.jpg",
  },
  {
    id: 5,
    title: "Notes on Manuscript Preservation",
    type: "Notes",
    language: "English",
    date: "2000",
    excerpt: "The preservation of ancient Jain manuscripts requires careful attention to material, environment, and documentation...",
    tags: ["Manuscripts", "Preservation", "Research"],
    restricted: true,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/111-min.jpg",
  },
  {
    id: 6,
    title: "On Samyak Darshan",
    type: "Discourse",
    language: "Gujarati",
    date: "1988",
    excerpt: "Right faith is the foundation of spiritual progress. Without samyak darshan, neither knowledge nor conduct can lead to liberation...",
    tags: ["Philosophy", "Samyak", "Faith"],
    restricted: false,
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/76-min.jpg",
  },
];

const typeIcons: Record<string, typeof Mic> = {
  Discourse: Mic,
  "Written Work": BookOpen,
  Letter: FileText,
  Notes: FileText,
};

const Guruvani = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredItems = guruvaniItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  const types = Array.from(new Set(guruvaniItems.map(item => item.type)));

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-burgundy/10 border border-burgundy/20 text-sm mb-6 animate-fade-up">
              <Scroll className="h-4 w-4 text-burgundy" />
              <span className="text-burgundy">Sacred Teachings</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Guruvani
            </h1>
            <p className="font-body text-lg text-muted-foreground animate-fade-up delay-200">
              Explore the profound discourses, written works, letters, and spiritual guidance 
              from Gurudev Muni Jambuvijayji Maharaj.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Quote */}
      <section className="py-8 bg-burgundy/5 border-y border-burgundy/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-8 w-8 text-burgundy/30 mx-auto mb-3" />
            <blockquote className="font-heading text-lg italic text-foreground">
              "The lamp of knowledge dispels the darkness of ignorance. Seek truth with humility and devotion."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search Guruvani..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2 flex-wrap">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              {types.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedType(type)}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Items Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Access Notice */}
          <div className="mb-8 p-4 rounded-xl bg-secondary/50 border border-border flex items-start gap-4">
            <Lock className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="font-body text-base text-foreground font-medium mb-1">
                Some content requires authentication
              </p>
              <p className="font-body text-base text-muted-foreground">
                Items marked with a lock icon require you to be logged in. Scholars may request access to restricted materials.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => {
              const Icon = typeIcons[item.type] || FileText;
              return (
                <Link 
                  key={item.id} 
                  to={item.restricted ? "/auth" : `/guruvani/${item.id}`}
                  className="group"
                >
                  <Card 
                    variant="interactive"
                    className="animate-fade-up h-full overflow-hidden"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Cover Image */}
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/30 relative">
                      <img 
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                        <Badge variant="secondary" className="text-xs bg-background/90 backdrop-blur-sm border-0">
                          <Icon className="h-3 w-3 mr-1" />
                          {item.type}
                        </Badge>
                        {item.restricted && (
                          <Badge variant="outline" className="text-xs bg-background/90 backdrop-blur-sm">
                            <Lock className="h-3 w-3 mr-1" />
                            Restricted
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">
                          {item.language}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{item.date}</span>
                      </div>
                      <CardTitle className="font-heading text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="font-body text-base text-muted-foreground line-clamp-2 mb-4">
                        {item.excerpt}
                      </p>
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="pt-3 border-t border-border">
                        {item.restricted ? (
                          <div className="flex items-center justify-center gap-2 font-body text-base text-muted-foreground">
                            <Lock className="h-3.5 w-3.5" />
                            <span>Sign In to Access</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center font-body text-base text-primary group-hover:underline">
                            Read More
                            <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Request Access CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
            Access Restricted Teachings
          </h2>
          <p className="font-body text-base text-muted-foreground mb-8 max-w-lg mx-auto">
            Scholars and dedicated seekers can request access to restricted Guruvani materials. 
            Create an account and apply through the Scholar Portal.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="spiritual" asChild>
              <Link to="/auth">
                Create Account
              </Link>
            </Button>
            <Button variant="outline" asChild>
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
