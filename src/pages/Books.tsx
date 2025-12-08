import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, ExternalLink, Grid, List, Search } from "lucide-react";

const books = [
  {
    id: 1,
    title: "Acharang Sutra (Critical Edition)",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1976,
    description: "Critical edition of the first Jain Agam, the Acharang Sutra, with detailed commentary.",
    pdfUrl: "#",
  },
  {
    id: 2,
    title: "Bhagavati Sutra Vol. 1-4",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1978,
    description: "Complete critical edition of the Bhagavati Sutra with textual analysis.",
    pdfUrl: "#",
  },
  {
    id: 3,
    title: "Jain Encyclopedia Vol. 1",
    author: "Jambuvijayji",
    category: "Encyclopedia",
    language: "Hindi",
    year: 1985,
    description: "Comprehensive encyclopedia of Jain terms, concepts, and philosophy.",
    pdfUrl: "#",
  },
  {
    id: 4,
    title: "Prakrit Grammar",
    author: "Jambuvijayji",
    category: "Grammar",
    language: "Sanskrit",
    year: 1970,
    description: "Detailed grammar of Prakrit language for scholarly study.",
    pdfUrl: "#",
  },
  {
    id: 5,
    title: "Tattvartha Sutra Commentary",
    author: "Ed. by Jambuvijayji",
    category: "Philosophy",
    language: "Sanskrit",
    year: 1982,
    description: "Annotated commentary on the foundational Jain philosophical text.",
    pdfUrl: "#",
  },
  {
    id: 6,
    title: "Kalpa Sutra Edition",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1975,
    description: "Critical edition of the Kalpa Sutra with historical notes.",
    pdfUrl: "#",
  },
  {
    id: 7,
    title: "Jain Manuscript Catalog Vol. 1",
    author: "Jambuvijayji",
    category: "Catalog",
    language: "English",
    year: 1988,
    description: "Systematic catalog of Jain manuscripts collected from various regions.",
    pdfUrl: "#",
  },
  {
    id: 8,
    title: "Upasakdasha Sutra",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1977,
    description: "Critical edition with detailed footnotes and variant readings.",
    pdfUrl: "#",
  },
  {
    id: 9,
    title: "Jain Philosophy: An Introduction",
    author: "Jambuvijayji",
    category: "Philosophy",
    language: "Hindi",
    year: 1990,
    description: "Accessible introduction to Jain philosophy for general readers.",
    pdfUrl: "#",
  },
  {
    id: 10,
    title: "Sthananga Sutra",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1979,
    description: "Critical edition of the Sthananga Sutra with comprehensive notes.",
    pdfUrl: "#",
  },
  {
    id: 11,
    title: "Jain Literary History",
    author: "Jambuvijayji",
    category: "History",
    language: "Hindi",
    year: 1992,
    description: "Survey of Jain literature from ancient to modern times.",
    pdfUrl: "#",
  },
  {
    id: 12,
    title: "Dashavaikalika Sutra",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1974,
    description: "Critical edition with parallel Sanskrit translation.",
    pdfUrl: "#",
  },
  {
    id: 13,
    title: "Jain Iconography",
    author: "Jambuvijayji",
    category: "Art",
    language: "English",
    year: 1995,
    description: "Study of Jain art and iconographic traditions.",
    pdfUrl: "#",
  },
  {
    id: 14,
    title: "Samavayanga Sutra",
    author: "Ed. by Jambuvijayji",
    category: "Agam",
    language: "Prakrit",
    year: 1980,
    description: "Critical edition with textual apparatus.",
    pdfUrl: "#",
  },
  {
    id: 15,
    title: "Selected Letters & Writings",
    author: "Jambuvijayji",
    category: "Collection",
    language: "Hindi",
    year: 2005,
    description: "Collection of personal letters and writings of Gurudev.",
    pdfUrl: "#",
  },
];

const categories = ["All", "Agam", "Philosophy", "Encyclopedia", "Grammar", "History", "Catalog", "Art", "Collection"];

export default function Books() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || book.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Books & Publications
            </h1>
            <div className="section-divider" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Scholarly works and critical editions by Gurudev
            </p>
          </div>
        </div>
      </section>

      {/* Books Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-8">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search books..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Books Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
                  <div className="aspect-[3/4] bg-secondary flex items-center justify-center">
                    <div className="text-center p-4">
                      <div className="w-20 h-28 mx-auto bg-primary/10 rounded flex items-center justify-center mb-2">
                        <span className="font-display text-4xl text-primary">📖</span>
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-4 space-y-3">
                    <div>
                      <p className="text-xs text-primary font-medium uppercase tracking-wide">
                        {book.category} • {book.year}
                      </p>
                      <h3 className="font-display text-lg font-medium text-foreground line-clamp-2 mt-1">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">{book.author}</p>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {book.description}
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      asChild
                    >
                      <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-6 flex flex-col md:flex-row gap-4 items-start">
                    <div className="w-16 h-20 bg-secondary rounded flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-2xl text-primary">📖</span>
                    </div>
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap gap-2 text-xs">
                        <span className="text-primary font-medium uppercase tracking-wide">
                          {book.category}
                        </span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{book.language}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">{book.year}</span>
                      </div>
                      <h3 className="font-display text-xl font-medium text-foreground">
                        {book.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{book.author}</p>
                      <p className="text-muted-foreground">{book.description}</p>
                    </div>
                    <Button variant="outline" asChild className="flex-shrink-0">
                      <a href={book.pdfUrl} target="_blank" rel="noopener noreferrer">
                        <Download className="w-4 h-4 mr-2" />
                        PDF
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books found matching your search.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}