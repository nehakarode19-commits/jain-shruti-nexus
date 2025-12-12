import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useArticlesFromDB } from "@/hooks/useContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Search, 
  FileText, 
  User, 
  ArrowRight,
  ExternalLink,
  ScrollText,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const Articles = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: articles = [], isLoading } = useArticlesFromDB();

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (article.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

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
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <ScrollText className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">{articles.length} Articles</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Articles & Tributes
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Scholarly articles, heartfelt tributes, and important documents 
              celebrating the legacy of Gurudev Muni Jambuvijayji Maharaj Saheb.
            </p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-muted-foreground">
                  Showing {filteredArticles.length} articles
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <Link
                    key={article.id}
                    to={`/articles/${article.id}`}
                    className="group"
                  >
                    <Card 
                      variant="interactive"
                      className="overflow-hidden h-full animate-fade-up"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <img 
                          src={article.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-2 mb-3">
                          {article.category && <Badge variant="default">{article.category}</Badge>}
                        </div>
                        <h3 className="font-heading text-lg font-semibold text-foreground mb-1 group-hover:text-primary transition-colors line-clamp-2">
                          {article.title}
                        </h3>
                        <p className="font-body text-base text-muted-foreground mb-3 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 font-body text-base text-muted-foreground">
                            <User className="h-3 w-3" />
                            <span>{article.author || "Research Team"}</span>
                          </div>
                          <span className="font-body text-base text-primary flex items-center gap-1">
                            Read More
                            <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>

              {filteredArticles.length === 0 && (
                <div className="text-center py-16">
                  <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    No articles found
                  </h3>
                  <p className="font-body text-base text-muted-foreground mb-4">
                    Try adjusting your search criteria
                  </p>
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* External Link */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-foreground mb-4">
            More Content Available
          </h2>
          <p className="font-body text-base text-muted-foreground mb-6 max-w-lg mx-auto">
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
          <h2 className="font-heading text-2xl font-bold text-foreground mb-4">
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
