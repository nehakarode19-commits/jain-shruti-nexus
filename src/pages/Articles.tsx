import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { 
  Search, 
  FileText, 
  User, 
  Globe,
  ArrowRight,
  Download,
  ExternalLink,
  ScrollText,
  BookOpen
} from "lucide-react";
import { articles, documents, articleCategories } from "@/data/gurudevData";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.titleEn.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <ScrollText className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Tributes & Articles</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Articles & <span className="text-gradient-gold">Tributes</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Scholarly articles, heartfelt tributes, and important documents 
              celebrating the legacy of Gurudev Muni Jambuvijayji Maharaj Saheb.
            </p>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="articles" className="gap-2">
                <FileText className="h-4 w-4" />
                Articles ({articles.length})
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Documents ({documents.length})
              </TabsTrigger>
            </TabsList>

            {/* Articles Tab */}
            <TabsContent value="articles" className="mt-8">
              {/* Search and Filter */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                <div className="relative w-full md:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex flex-wrap gap-2">
                  {articleCategories.map((category) => (
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

              {/* Articles Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {filteredArticles.map((article, index) => (
                  <Card 
                    key={article.id}
                    variant="interactive"
                    className="overflow-hidden group animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="grid md:grid-cols-3 h-full">
                      <div className="aspect-square md:aspect-auto overflow-hidden">
                        <img 
                          src={article.image}
                          alt={article.titleEn}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="md:col-span-2 p-6 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant="default">{article.category}</Badge>
                          <Badge variant="outline" className="gap-1">
                            <Globe className="h-3 w-3" />
                            {article.language}
                          </Badge>
                        </div>
                        <h3 className="font-display text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                          {article.titleEn}
                        </h3>
                        <p className="text-sm text-primary mb-2">{article.title}</p>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <User className="h-3 w-3" />
                          <span>{article.author}</span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                    No articles found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search or filter criteria
                  </p>
                  <Button variant="outline" onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents" className="mt-8">
              <div className="max-w-3xl mx-auto">
                <div className="space-y-4">
                  {documents.map((doc, index) => (
                    <Card 
                      key={doc.id}
                      variant="feature"
                      className="animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="secondary">{doc.type}</Badge>
                              <Badge variant="outline" className="gap-1">
                                <Globe className="h-3 w-3" />
                                {doc.language}
                              </Badge>
                            </div>
                            <h3 className="font-display text-lg font-semibold text-foreground mb-1">
                              {doc.title}
                            </h3>
                            <p className="text-sm text-primary mb-2">{doc.titleHindi}</p>
                            <p className="text-sm text-muted-foreground mb-4">
                              {doc.description}
                            </p>
                            <Button variant="outline" size="sm" className="gap-2">
                              <Download className="h-4 w-4" />
                              Download PDF
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* External Link */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            More Content Available
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Visit the official Siddhi Jambu Parivar website for additional articles and documents.
          </p>
          <Button variant="outline" asChild>
            <a 
              href="https://siddhijambuparivar.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              Visit Official Website
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Explore More
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/books">Browse Books</Link>
            </Button>
            <Button variant="hero" asChild>
              <Link to="/about/gurudev">
                About Gurudev
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/community/blog">Read Blog</Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Articles;
