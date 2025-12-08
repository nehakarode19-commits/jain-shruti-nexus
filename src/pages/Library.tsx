import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Library as LibraryIcon, 
  Search, 
  BookOpen, 
  Scroll as ScrollIcon,
  Filter,
  MapPin,
  Calendar,
  User,
  Info
} from "lucide-react";

const catalogItems = [
  {
    id: 1,
    type: "Book",
    title: "Āgama Prakāśa",
    author: "Muni Jambuvijayji",
    year: "1985",
    language: "Sanskrit",
    category: "Agama Studies",
    available: true,
    location: "Rack A-12",
  },
  {
    id: 2,
    type: "Book",
    title: "Jain Darshan ka Itihas",
    author: "Dr. Nathmal Tatia",
    year: "1972",
    language: "Hindi",
    category: "Philosophy",
    available: true,
    location: "Rack B-05",
  },
  {
    id: 3,
    type: "Manuscript",
    title: "Kalpasutra (Illustrated)",
    author: "Traditional",
    year: "15th Century",
    language: "Prakrit",
    category: "Scripture",
    available: false,
    location: "Special Collection",
  },
  {
    id: 4,
    type: "Book",
    title: "Tattvartha Sutra with Bhashya",
    author: "Umaswati",
    year: "1990",
    language: "Sanskrit",
    category: "Philosophy",
    available: true,
    location: "Rack A-03",
  },
  {
    id: 5,
    type: "Manuscript",
    title: "Bhaktamara Stotra",
    author: "Acharya Manatunga",
    year: "8th Century",
    language: "Sanskrit",
    category: "Devotional",
    available: false,
    location: "Special Collection",
  },
  {
    id: 6,
    type: "Book",
    title: "Jain Ethics and Morality",
    author: "Dr. Padmanabh Jaini",
    year: "1998",
    language: "English",
    category: "Ethics",
    available: true,
    location: "Rack C-08",
  },
];

const Library = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const filteredItems = catalogItems.filter((item) => {
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = !selectedType || item.type === selectedType;
    return matchesSearch && matchesType;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 border border-sage/20 text-sm mb-6 animate-fade-up">
              <LibraryIcon className="h-4 w-4 text-sage" />
              <span className="text-sage">Muni Jambuvijay Research Center</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Library Catalog
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-200">
              Browse our extensive collection of Jain books, manuscripts, and scholarly resources. 
              Located at Shantigram.
            </p>
          </div>
        </div>
      </section>

      {/* Info Banner */}
      <section className="py-4 bg-secondary/50 border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Info className="h-4 w-4" />
            <span>This is a view-only catalog. For library access, please contact the librarian.</span>
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
                placeholder="Search by title, author, or category..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedType === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(null)}
              >
                All
              </Button>
              <Button
                variant={selectedType === "Book" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("Book")}
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Books
              </Button>
              <Button
                variant={selectedType === "Manuscript" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType("Manuscript")}
              >
                <ScrollIcon className="h-4 w-4 mr-2" />
                Manuscripts
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item, index) => (
              <Card 
                key={item.id}
                variant="default"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge 
                      variant={item.type === "Book" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {item.type === "Book" ? (
                        <BookOpen className="h-3 w-3 mr-1" />
                      ) : (
                        <ScrollIcon className="h-3 w-3 mr-1" />
                      )}
                      {item.type}
                    </Badge>
                    <Badge 
                      variant={item.available ? "outline" : "secondary"}
                      className={`text-xs ${item.available ? "text-sage border-sage" : ""}`}
                    >
                      {item.available ? "Available" : "Reference Only"}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{item.title}</CardTitle>
                  <div className="text-xs text-muted-foreground">
                    {item.category}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3.5 w-3.5" />
                      <span>{item.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{item.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      <span>{item.location}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <Badge variant="outline" className="text-xs">
                      {item.language}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No items found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Visit Our Library
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Located at Muni Jambuvijay Research Center, Shantigram. 
            Contact us to schedule a visit or inquire about specific materials.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <a href="/contact">Contact Library</a>
            </Button>
            <Button variant="outline">
              <MapPin className="h-4 w-4 mr-2" />
              Get Directions
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Library;
