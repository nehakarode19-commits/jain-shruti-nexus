import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { books, bookCategories } from "@/data/gurudevData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ExternalLink, BookOpen, Filter, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Books = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredBooks = books.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = 
      selectedCategory === "All" || 
      book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{books.length} Sacred Texts</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Books & <span className="text-gradient-gold">Publications</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore the scholarly works edited and published by Gurudev Muni Jambuvijayji Maharaj Saheb, 
              including critical editions of Jain Agamas, Sutras, and philosophical texts.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border sticky top-16 z-10">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search books by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap gap-2 items-center">
              <Filter className="h-4 w-4 text-muted-foreground" />
              {bookCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "hero" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Books Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-muted-foreground">
              Showing {filteredBooks.length} of {books.length} books
            </p>
            {selectedCategory !== "All" && (
              <Badge variant="secondary" className="gap-1">
                <Filter className="h-3 w-3" />
                {selectedCategory}
              </Badge>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {filteredBooks.map((book, index) => (
              <Link
                key={book.id}
                to={`/books/${book.id}`}
                className="group"
              >
                <Card 
                  variant="interactive" 
                  className="overflow-hidden h-full animate-fade-up"
                  style={{ animationDelay: `${(index % 12) * 50}ms` }}
                >
                  <div className="aspect-square bg-secondary/50 overflow-hidden relative">
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {book.category && (
                      <Badge 
                        variant="secondary" 
                        className="absolute top-2 left-2 text-[10px] bg-background/90 backdrop-blur-sm"
                      >
                        {book.category}
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-display font-semibold text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                      {book.title}
                    </h3>
                    {book.language && (
                      <div className="flex items-center gap-1 text-xs text-muted-foreground mb-2">
                        <Globe className="h-3 w-3" />
                        <span>{book.language}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-xs text-primary">
                      <ExternalLink className="h-3 w-3" />
                      <span>View Details</span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {filteredBooks.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                No books found
              </h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or filter criteria
              </p>
              <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Category Stats */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {bookCategories.filter(c => c !== "All").map((category) => {
              const count = books.filter(b => b.category === category).length;
              return (
                <Card 
                  key={category}
                  variant="interactive"
                  className="cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="p-4 text-center">
                    <p className="font-display font-semibold text-foreground">{category}</p>
                    <p className="text-sm text-muted-foreground">{count} books</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* External Link */}
      <section className="py-12 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Browse Complete Collection
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Visit the official Siddhi Jambu Parivar website to browse and access 
            the complete collection of Gurudev's published works.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <a
                href="https://siddhijambuparivar.com/shop/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Full Collection
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/library">
                Library Catalog
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Books;
