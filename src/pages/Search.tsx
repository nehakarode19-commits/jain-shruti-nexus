import { Layout } from "@/components/layout/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search as SearchIcon, BookOpen, FileText, Users, Scroll } from "lucide-react";
import { useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");

  return (
    <Layout>
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Search Jambushrusti
            </h1>
            <p className="text-lg text-muted-foreground">
              Find books, manuscripts, research entries, and Guruvani across our entire ecosystem.
            </p>
          </div>

          {/* Search Input */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search for books, manuscripts, research, Guruvani..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-border focus:border-primary"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <Button 
                variant="hero" 
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Search Categories */}
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-xl font-semibold text-foreground mb-6 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="group cursor-pointer hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <BookOpen className="h-10 w-10 mx-auto mb-3 text-primary group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-foreground">Books</h3>
                  <p className="text-sm text-muted-foreground">Library catalog</p>
                </CardContent>
              </Card>
              <Card className="group cursor-pointer hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <FileText className="h-10 w-10 mx-auto mb-3 text-gold group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-foreground">Manuscripts</h3>
                  <p className="text-sm text-muted-foreground">Ancient texts</p>
                </CardContent>
              </Card>
              <Card className="group cursor-pointer hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Scroll className="h-10 w-10 mx-auto mb-3 text-sage group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-foreground">Guruvani</h3>
                  <p className="text-sm text-muted-foreground">Sacred teachings</p>
                </CardContent>
              </Card>
              <Card className="group cursor-pointer hover:shadow-soft transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Users className="h-10 w-10 mx-auto mb-3 text-secondary-foreground group-hover:scale-110 transition-transform" />
                  <h3 className="font-medium text-foreground">Research</h3>
                  <p className="text-sm text-muted-foreground">Scholarly works</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
