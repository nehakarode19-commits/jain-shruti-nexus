import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Search,
  ArrowLeft,
  FileText,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  X,
  Calendar,
  User,
  Tag,
  BookOpen,
  Sparkles,
} from "lucide-react";

// Sample search results
const sampleResults = [
  {
    id: 1,
    title: "Ācārāṅga Sūtra - Historical Analysis",
    description: "A comprehensive analysis of the oldest surviving Jain scripture, exploring its linguistic patterns and philosophical depth. This study examines the historical context and evolution of the text.",
    author: "Dr. Padmanabh Jaini",
    publishedIn: "Journal of Jain Studies",
    year: "2018",
    source: "Academic Journal",
    tags: ["Ācārāṅga", "Agamas", "Jain Philosophy", "Historical"],
    matchedKeywords: ["Ācārāṅga", "historical"],
  },
  {
    id: 2,
    title: "Tattvartha Sutra Commentary",
    description: "Modern interpretation of Umāsvāti's foundational text on Jain metaphysics and ethics. Explores the seven tattvas and their significance.",
    author: "Dr. John Cort",
    publishedIn: "Harvard Oriental Series",
    year: "2020",
    source: "Book",
    tags: ["Tattvartha", "Philosophy", "Metaphysics"],
    matchedKeywords: ["Tattvartha", "metaphysics"],
  },
  {
    id: 3,
    title: "Mahāvīra's Teachings on Ahimsa",
    description: "An exploration of non-violence principles in Jain tradition as taught by Lord Mahāvīra. Discusses practical applications in modern life.",
    author: "Prof. Sagarmal Jain",
    publishedIn: "Parshwanath Vidyapith",
    year: "2015",
    source: "Research Paper",
    tags: ["Ahimsa", "Mahāvīra", "Ethics", "Non-violence"],
    matchedKeywords: ["Ahimsa", "Mahāvīra"],
  },
  {
    id: 4,
    title: "Prakrit Language Evolution in Jain Texts",
    description: "Linguistic study of Prakrit variations found in early Jain canonical literature. Traces the development from Ardhamagadhi to later forms.",
    author: "Dr. Nalini Balbir",
    publishedIn: "Indo-Iranian Journal",
    year: "2019",
    source: "Academic Journal",
    tags: ["Prakrit", "Linguistics", "Canonical Literature"],
    matchedKeywords: ["Prakrit", "Jain"],
  },
  {
    id: 5,
    title: "Digambara and Śvetāmbara: A Comparative Study",
    description: "Analysis of doctrinal and practical differences between the two major Jain traditions. Includes historical origins of the schism.",
    author: "Dr. Paul Dundas",
    publishedIn: "Cambridge University Press",
    year: "2017",
    source: "Book",
    tags: ["Digambara", "Śvetāmbara", "Traditions", "History"],
    matchedKeywords: ["Digambara", "Śvetāmbara"],
  },
];

const filterCategories = {
  sources: ["Academic Journal", "Book", "Research Paper", "Manuscript", "Thesis"],
  years: ["2024", "2023", "2022", "2021", "2020", "2019", "2018", "2017", "2016", "2015"],
  tags: ["Jain Philosophy", "Agamas", "Mahāvīra", "Ahimsa", "Karma", "Moksha", "Tattvartha", "Ācārāṅga", "Manuscripts", "Sanskrit", "Prakrit", "Digambara", "Śvetāmbara"],
};

const SodhSandarbh = () => {
  const { toast } = useToast();
  const [keyword, setKeyword] = useState("");
  const [titleSearch, setTitleSearch] = useState("");
  const [exactPhrase, setExactPhrase] = useState("");
  const [excludeWords, setExcludeWords] = useState("");
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [booleanOperator, setBooleanOperator] = useState("AND");
  const [selectedSources, setSelectedSources] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [results, setResults] = useState(sampleResults);
  const [expandedResults, setExpandedResults] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(true);

  const handleSearch = async () => {
    setIsSearching(true);
    // Simulate search delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Filter results based on search criteria (mock implementation)
    let filtered = sampleResults;
    
    if (keyword) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(keyword.toLowerCase()) ||
        r.description.toLowerCase().includes(keyword.toLowerCase())
      );
    }
    
    if (titleSearch) {
      filtered = filtered.filter(r => 
        r.title.toLowerCase().includes(titleSearch.toLowerCase())
      );
    }
    
    if (selectedSources.length > 0) {
      filtered = filtered.filter(r => selectedSources.includes(r.source));
    }
    
    if (selectedTags.length > 0) {
      if (booleanOperator === "AND") {
        filtered = filtered.filter(r => 
          selectedTags.every(tag => r.tags.includes(tag))
        );
      } else {
        filtered = filtered.filter(r => 
          selectedTags.some(tag => r.tags.includes(tag))
        );
      }
    }
    
    setResults(filtered);
    setIsSearching(false);
    
    toast({
      title: `${filtered.length} Results Found`,
      description: "Search completed successfully.",
    });
  };

  const toggleExpand = (id: number) => {
    setExpandedResults(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your results will be exported to Excel format.",
    });
  };

  const clearFilters = () => {
    setKeyword("");
    setTitleSearch("");
    setExactPhrase("");
    setExcludeWords("");
    setYearFrom("");
    setYearTo("");
    setSelectedSources([]);
    setSelectedTags([]);
    setBooleanOperator("AND");
    setResults(sampleResults);
  };

  const highlightKeywords = (text: string, keywords: string[]) => {
    let result = text;
    keywords.forEach(kw => {
      const regex = new RegExp(`(${kw})`, 'gi');
      result = result.replace(regex, '<mark class="bg-gold/30 px-0.5 rounded">$1</mark>');
    });
    return <span dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-burgundy/10 flex items-center justify-center">
              <Search className="h-8 w-8 text-burgundy" />
            </div>
            <div>
              <h1 className="font-poppins text-3xl font-bold text-foreground">SodhSandarbh</h1>
              <p className="text-muted-foreground font-poppins">Search & Export Research</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl font-poppins">
            Powerful search across all research entries with advanced filters, Boolean logic, and easy export.
          </p>
        </div>
      </section>

      {/* Search Interface */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 shadow-soft">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-poppins text-lg flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      Filters
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={clearFilters}
                      className="font-poppins text-xs"
                    >
                      Clear All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Boolean Operator */}
                  <div className="space-y-2">
                    <Label className="font-poppins text-sm">Search Mode</Label>
                    <Select value={booleanOperator} onValueChange={setBooleanOperator}>
                      <SelectTrigger className="font-poppins">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="AND" className="font-poppins">AND - All terms</SelectItem>
                        <SelectItem value="OR" className="font-poppins">OR - Any term</SelectItem>
                        <SelectItem value="NOT" className="font-poppins">NOT - Exclude</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Year Range */}
                  <div className="space-y-2">
                    <Label className="font-poppins text-sm flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      Year Range
                    </Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        placeholder="From"
                        value={yearFrom}
                        onChange={(e) => setYearFrom(e.target.value)}
                        className="font-poppins text-sm"
                      />
                      <Input
                        placeholder="To"
                        value={yearTo}
                        onChange={(e) => setYearTo(e.target.value)}
                        className="font-poppins text-sm"
                      />
                    </div>
                  </div>

                  {/* Source Type */}
                  <Collapsible open={filtersOpen} onOpenChange={setFiltersOpen}>
                    <CollapsibleTrigger className="flex items-center justify-between w-full">
                      <Label className="font-poppins text-sm flex items-center gap-2 cursor-pointer">
                        <BookOpen className="h-3 w-3" />
                        Source Type
                      </Label>
                      {filtersOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="pt-2 space-y-2">
                      {filterCategories.sources.map((source) => (
                        <div key={source} className="flex items-center space-x-2">
                          <Checkbox
                            id={source}
                            checked={selectedSources.includes(source)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedSources([...selectedSources, source]);
                              } else {
                                setSelectedSources(selectedSources.filter(s => s !== source));
                              }
                            }}
                          />
                          <label
                            htmlFor={source}
                            className="text-sm font-poppins text-muted-foreground cursor-pointer"
                          >
                            {source}
                          </label>
                        </div>
                      ))}
                    </CollapsibleContent>
                  </Collapsible>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="font-poppins text-sm flex items-center gap-2">
                      <Tag className="h-3 w-3" />
                      Tags
                    </Label>
                    <div className="flex flex-wrap gap-1.5">
                      {filterCategories.tags.slice(0, 8).map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags.includes(tag) ? "default" : "outline"}
                          className="font-poppins text-xs cursor-pointer transition-all hover:scale-105"
                          onClick={() => {
                            if (selectedTags.includes(tag)) {
                              setSelectedTags(selectedTags.filter(t => t !== tag));
                            } else {
                              setSelectedTags([...selectedTags, tag]);
                            }
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search Results */}
            <div className="lg:col-span-3 space-y-6">
              {/* Search Bar */}
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* Main Search */}
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        placeholder="Search by keyword..."
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                        className="pl-12 h-12 text-lg font-poppins"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>

                    {/* Advanced Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="font-poppins text-sm">Title Contains</Label>
                        <Input
                          placeholder="Search in title..."
                          value={titleSearch}
                          onChange={(e) => setTitleSearch(e.target.value)}
                          className="font-poppins"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="font-poppins text-sm">Exact Phrase</Label>
                        <Input
                          placeholder='"exact phrase"'
                          value={exactPhrase}
                          onChange={(e) => setExactPhrase(e.target.value)}
                          className="font-poppins"
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-2 flex-1 mr-4">
                        <Label className="font-poppins text-sm">Exclude Words</Label>
                        <Input
                          placeholder="Words to exclude..."
                          value={excludeWords}
                          onChange={(e) => setExcludeWords(e.target.value)}
                          className="font-poppins"
                        />
                      </div>
                      <Button 
                        variant="hero" 
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="font-poppins h-10 mt-6"
                      >
                        {isSearching ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Search
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Results Header */}
              <div className="flex items-center justify-between">
                <p className="font-poppins text-muted-foreground">
                  <span className="text-foreground font-semibold">{results.length}</span> results found
                </p>
                <Button 
                  variant="outline" 
                  onClick={handleExport}
                  className="font-poppins"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export to Excel
                </Button>
              </div>

              {/* Results List */}
              <div className="space-y-4">
                {results.map((result) => (
                  <Card 
                    key={result.id} 
                    className="shadow-soft hover:shadow-elevated transition-all duration-300 overflow-hidden"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <FileText className="h-4 w-4 text-primary" />
                            <Badge variant="secondary" className="font-poppins text-xs">
                              {result.source}
                            </Badge>
                            <Badge variant="outline" className="font-poppins text-xs">
                              {result.year}
                            </Badge>
                          </div>
                          <h3 className="font-poppins font-semibold text-lg text-foreground mb-2">
                            {highlightKeywords(result.title, result.matchedKeywords)}
                          </h3>
                          <p className="font-poppins text-sm text-muted-foreground flex items-center gap-2 mb-3">
                            <User className="h-3 w-3" />
                            {result.author} • {result.publishedIn}
                          </p>
                          
                          <Collapsible open={expandedResults.includes(result.id)}>
                            <p className="font-poppins text-sm text-muted-foreground line-clamp-2">
                              {highlightKeywords(result.description, result.matchedKeywords)}
                            </p>
                            <CollapsibleContent className="pt-4 space-y-4">
                              <p className="font-poppins text-sm text-muted-foreground">
                                {result.description}
                              </p>
                              <div className="flex flex-wrap gap-2">
                                {result.tags.map((tag) => (
                                  <Badge 
                                    key={tag} 
                                    variant="secondary" 
                                    className="font-poppins text-xs"
                                  >
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </CollapsibleContent>
                            <CollapsibleTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="font-poppins mt-3 text-primary"
                                onClick={() => toggleExpand(result.id)}
                              >
                                {expandedResults.includes(result.id) ? (
                                  <>
                                    Show Less <ChevronUp className="h-4 w-4 ml-1" />
                                  </>
                                ) : (
                                  <>
                                    Show More <ChevronDown className="h-4 w-4 ml-1" />
                                  </>
                                )}
                              </Button>
                            </CollapsibleTrigger>
                          </Collapsible>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {results.length === 0 && (
                  <Card className="shadow-soft">
                    <CardContent className="p-12 text-center">
                      <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                      <h3 className="font-poppins text-lg font-semibold text-foreground mb-2">
                        No Results Found
                      </h3>
                      <p className="font-poppins text-muted-foreground">
                        Try adjusting your search terms or filters.
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default SodhSandarbh;
