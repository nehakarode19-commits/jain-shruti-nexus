import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";
import {
  Globe,
  Search,
  ArrowLeft,
  ExternalLink,
  Sparkles,
  BookOpen,
  Library,
  RefreshCw,
  Lightbulb,
} from "lucide-react";

// Source badges with colors
const sources = {
  "Archive.org": { color: "bg-blue-500/10 text-blue-600 border-blue-500/30", icon: "🏛️" },
  "HathiTrust": { color: "bg-purple-500/10 text-purple-600 border-purple-500/30", icon: "📚" },
  "JSTOR": { color: "bg-green-500/10 text-green-600 border-green-500/30", icon: "📖" },
  "Jain eLibrary": { color: "bg-gold/10 text-gold border-gold/30", icon: "🕉️" },
  "Google Books": { color: "bg-red-500/10 text-red-600 border-red-500/30", icon: "📕" },
};

// Sample AI search results
const sampleResults = [
  {
    id: 1,
    title: "Ācārāṅga Sūtra - The First Canonical Scripture",
    snippet: "The oldest surviving Jain Agama text, containing the teachings of Lord Mahāvīra on ethical conduct and the path of liberation. This critical edition includes Sanskrit commentary.",
    source: "Archive.org" as keyof typeof sources,
    year: "1916",
    author: "Hermann Jacobi (Trans.)",
    link: "https://archive.org/details/acarangasutra",
  },
  {
    id: 2,
    title: "Tattvartha Sutra with Sarvarthasiddhi Commentary",
    snippet: "Umāsvāti's foundational philosophical treatise on Jain metaphysics, accompanied by Pūjyapāda's comprehensive commentary explaining the nature of reality and path to moksha.",
    source: "HathiTrust" as keyof typeof sources,
    year: "1994",
    author: "S.A. Jain (Ed.)",
    link: "https://hathitrust.org",
  },
  {
    id: 3,
    title: "Jain Cosmology and the Universe",
    snippet: "A scholarly analysis of Jain cosmological concepts including lokākāśa, the structure of the universe, and the nature of time cycles as described in canonical literature.",
    source: "JSTOR" as keyof typeof sources,
    year: "2008",
    author: "Dr. John E. Cort",
    link: "https://jstor.org",
  },
  {
    id: 4,
    title: "Complete Works of Gurudev Muni Jambuvijayji Maharaj Saheb",
    snippet: "Comprehensive collection of scholarly works, edited manuscripts, and research notes by the revered Gurudev Muni Jambuvijayji Maharaj Saheb, pioneer in Jain manuscript preservation.",
    source: "Jain eLibrary" as keyof typeof sources,
    year: "2015",
    author: "Jain Vishva Bharati",
    link: "https://jainelibrary.org",
  },
  {
    id: 5,
    title: "The Doctrine of Karma in Jainism",
    snippet: "Detailed exploration of karma theory in Jain philosophy, covering the eight types of karma, their bondage, and the path to complete karmic elimination.",
    source: "Google Books" as keyof typeof sources,
    year: "2002",
    author: "Dr. Padmanabh S. Jaini",
    link: "https://books.google.com",
  },
];

const searchSuggestions = [
  "Ācārāṅga Sūtra translation",
  "Jain philosophy karma",
  "Mahāvīra teachings",
  "Tattvartha Sutra commentary",
  "Jain meditation practices",
  "Digambara texts",
];

const Shastrasandarbha = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<typeof sampleResults>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    setIsSearching(true);
    setHasSearched(true);
    setResults([]);

    // Simulate AI search with loading animation
    await new Promise(resolve => setTimeout(resolve, 1500));

    setResults(sampleResults);
    setIsSearching(false);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setTimeout(() => handleSearch(), 100);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-24 bg-gradient-hero lotus-pattern min-h-[50vh] flex items-center">
        <div className="container mx-auto px-4">
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </Link>

          <div className="max-w-3xl mx-auto text-center">
            {/* Icon */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-gold to-primary mx-auto mb-6 flex items-center justify-center shadow-glow animate-float">
              <Globe className="h-10 w-10 text-primary-foreground" />
            </div>

            <h1 className="font-poppins text-4xl sm:text-5xl font-bold text-foreground mb-4 animate-fade-up">
              Shastrasandarbha
            </h1>
            <p className="font-poppins text-xl text-muted-foreground mb-8 animate-fade-up delay-100">
              AI-powered search across global digital libraries
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto animate-fade-up delay-200">
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                <Input
                  placeholder="Search for any Jain book..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-14 pr-32 h-16 text-lg font-poppins rounded-2xl border-2 shadow-elevated focus:shadow-glow focus:border-primary transition-all"
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button
                  variant="hero"
                  onClick={handleSearch}
                  disabled={isSearching || !searchQuery.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 font-poppins px-6 rounded-xl"
                >
                  {isSearching ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Searching...
                    </>
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>

              {/* Source Badges */}
              <div className="flex flex-wrap justify-center gap-2 mt-4">
                {Object.entries(sources).map(([name, { color, icon }]) => (
                  <Badge 
                    key={name} 
                    variant="outline" 
                    className={`font-poppins text-xs ${color}`}
                  >
                    <span className="mr-1">{icon}</span>
                    {name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Search Suggestions */}
            {!hasSearched && (
              <div className="mt-12 animate-fade-up delay-300">
                <p className="font-poppins text-sm text-muted-foreground mb-4 flex items-center justify-center gap-2">
                  <Lightbulb className="h-4 w-4" />
                  Try searching for:
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {searchSuggestions.map((suggestion) => (
                    <Button
                      key={suggestion}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="font-poppins text-sm rounded-full hover:bg-primary/10 hover:border-primary"
                    >
                      {suggestion}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {hasSearched && (
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                {isSearching ? (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary animate-spin" />
                    </div>
                    <p className="font-poppins text-muted-foreground">
                      AI is searching across multiple sources...
                    </p>
                  </div>
                ) : (
                  <p className="font-poppins text-muted-foreground">
                    Found <span className="text-foreground font-semibold">{results.length}</span> results for "{searchQuery}"
                  </p>
                )}
              </div>
              {!isSearching && results.length > 0 && (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleSearch}
                  className="font-poppins"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              )}
            </div>

            {/* Loading Skeletons */}
            {isSearching && (
              <div className="space-y-6">
                {[1, 2, 3, 4].map((i) => (
                  <Card key={i} className="shadow-soft overflow-hidden">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Skeleton className="w-12 h-12 rounded-xl shrink-0" />
                        <div className="flex-1 space-y-3">
                          <Skeleton className="h-6 w-3/4" />
                          <Skeleton className="h-4 w-1/4" />
                          <Skeleton className="h-16 w-full" />
                          <div className="flex gap-2">
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-20" />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Results List */}
            {!isSearching && results.length > 0 && (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Card 
                    key={result.id} 
                    className="shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden animate-fade-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center shrink-0 text-2xl">
                          {sources[result.source].icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-poppins font-semibold text-lg text-foreground line-clamp-2">
                              {result.title}
                            </h3>
                          </div>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge 
                              variant="outline" 
                              className={`font-poppins text-xs ${sources[result.source].color}`}
                            >
                              {result.source}
                            </Badge>
                            <span className="text-sm text-muted-foreground font-poppins">
                              {result.year}
                            </span>
                            <span className="text-sm text-muted-foreground font-poppins">
                              • {result.author}
                            </span>
                          </div>
                          <p className="font-poppins text-muted-foreground text-sm mb-4 line-clamp-3">
                            {result.snippet}
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="font-poppins"
                          >
                            <a href={result.link} target="_blank" rel="noopener noreferrer">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              View on {result.source}
                            </a>
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* No Results */}
            {!isSearching && results.length === 0 && hasSearched && (
              <Card className="shadow-soft">
                <CardContent className="p-12 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-poppins text-xl font-semibold text-foreground mb-2">
                    No Results Found
                  </h3>
                  <p className="font-poppins text-muted-foreground mb-6 max-w-md mx-auto">
                    We couldn't find any books matching your search. Try refining your query or using different keywords.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2">
                    {searchSuggestions.slice(0, 3).map((suggestion) => (
                      <Button
                        key={suggestion}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="font-poppins"
                      >
                        Try: {suggestion}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
      )}

      {/* Features Section */}
      {!hasSearched && (
        <section className="py-16 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-poppins text-2xl font-bold text-center text-foreground mb-8">
                Powered by AI, Connected to Global Libraries
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    icon: Sparkles,
                    title: "AI-Powered Search",
                    description: "Our AI understands your query and finds the most relevant Jain texts across multiple sources.",
                  },
                  {
                    icon: Library,
                    title: "Multiple Sources",
                    description: "Search Archive.org, HathiTrust, JSTOR, Google Books, and Jain eLibrary simultaneously.",
                  },
                  {
                    icon: BookOpen,
                    title: "Direct Access",
                    description: "Get direct links to read and download books from their original sources.",
                  },
                ].map((feature) => (
                  <Card key={feature.title} className="shadow-soft text-center">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-poppins font-semibold text-foreground mb-2">
                        {feature.title}
                      </h3>
                      <p className="font-poppins text-sm text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default Shastrasandarbha;
