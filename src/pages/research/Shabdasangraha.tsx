import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
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
  FileText,
  Search,
  Upload,
  BookOpen,
  ArrowLeft,
  Filter,
  Download,
  ExternalLink,
  FileUp,
  Tag,
  Languages,
  FolderOpen,
  Eye,
  Sparkles,
} from "lucide-react";

// Sample PDF books
const sampleBooks = [
  {
    id: 1,
    title: "Ācārāṅga Sūtra",
    publishTitle: "Ancient Jain Scriptures Vol. 1",
    author: "Traditional",
    publisher: "Jain Vishva Bharati",
    category: "Agama",
    language: "Prakrit",
    year: "1985",
    pages: 342,
    tags: ["Agamas", "Canonical", "Ethics"],
  },
  {
    id: 2,
    title: "Tattvartha Sutra",
    publishTitle: "Philosophy of Reality",
    author: "Ācārya Umāsvāti",
    publisher: "Jainology Department",
    category: "Philosophy",
    language: "Sanskrit",
    year: "1992",
    pages: 186,
    tags: ["Philosophy", "Metaphysics", "Tattvas"],
  },
  {
    id: 3,
    title: "Kalpa Sūtra",
    publishTitle: "Lives of Jinas",
    author: "Bhadrabāhu",
    publisher: "Prakrit Text Society",
    category: "Biography",
    language: "Prakrit",
    year: "1988",
    pages: 156,
    tags: ["Biography", "Mahāvīra", "Jinas"],
  },
];

// Sample search results
const sampleSearchResults = [
  {
    id: 1,
    bookTitle: "Ācārāṅga Sūtra",
    pageNumber: 45,
    snippet: "...आचार्य ने कहा कि **अहिंसा** परम धर्म है। जो प्राणी मात्र की रक्षा करता है, वही सच्चा साधु है...",
    matchedTerm: "अहिंसा",
    relevance: 95,
  },
  {
    id: 2,
    bookTitle: "Tattvartha Sutra",
    pageNumber: 23,
    snippet: "...सम्यग्दर्शन-ज्ञान-चारित्राणि मोक्षमार्गः। The path to liberation consists of right faith, right knowledge, and right conduct...",
    matchedTerm: "मोक्षमार्गः",
    relevance: 88,
  },
  {
    id: 3,
    bookTitle: "Kalpa Sūtra",
    pageNumber: 78,
    snippet: "...भगवान महावीर ने कहा - 'जीवन में **करुणा** और **क्षमा** का अभ्यास करो'...",
    matchedTerm: "करुणा",
    relevance: 82,
  },
  {
    id: 4,
    bookTitle: "Ācārāṅga Sūtra",
    pageNumber: 112,
    snippet: "...सभी जीवों के प्रति **दया** भाव रखना चाहिए। यह जैन धर्म का मूल सिद्धांत है...",
    matchedTerm: "दया",
    relevance: 79,
  },
];

const categories = ["Agama", "Philosophy", "Biography", "Commentary", "History", "Literature"];
const languages = ["Prakrit", "Sanskrit", "Hindi", "Gujarati", "English"];

const Shabdasangraha = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("search");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("keyword");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<typeof sampleSearchResults>([]);
  const [showResults, setShowResults] = useState(false);

  // Upload form state
  const [uploadForm, setUploadForm] = useState({
    title: "",
    publishTitle: "",
    author: "",
    publisher: "",
    category: "",
    language: "",
    year: "",
    tags: "",
  });

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Enter Search Query",
        description: "Please enter a keyword or phrase to search.",
        variant: "destructive",
      });
      return;
    }

    setIsSearching(true);
    setShowResults(true);
    setSearchResults([]);

    // Simulate AI-powered search delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    setSearchResults(sampleSearchResults);
    setIsSearching(false);

    toast({
      title: `${sampleSearchResults.length} Results Found`,
      description: "Search completed across all PDFs.",
    });
  };

  const handleUpload = () => {
    if (!uploadForm.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for the PDF.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "PDF Uploaded",
      description: "Your PDF has been uploaded and will be indexed shortly.",
    });

    setUploadForm({
      title: "",
      publishTitle: "",
      author: "",
      publisher: "",
      category: "",
      language: "",
      year: "",
      tags: "",
    });
  };

  const handleOpenPDF = (bookTitle: string, pageNumber: number) => {
    toast({
      title: "Opening PDF",
      description: `Opening ${bookTitle} at page ${pageNumber}...`,
    });
  };

  const handleDownloadPages = () => {
    toast({
      title: "Download Started",
      description: "Matched pages are being prepared for download.",
    });
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
            <div className="w-16 h-16 rounded-2xl bg-sage/10 flex items-center justify-center">
              <FileText className="h-8 w-8 text-sage" />
            </div>
            <div>
              <h1 className="font-poppins text-3xl font-bold text-foreground">Śabdasaṅgraha</h1>
              <p className="text-muted-foreground font-poppins">Smart PDF Search Engine</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl font-poppins">
            Search inside Jain texts like Google. Find exact pages matching your query with AI-powered transliteration support.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="bg-secondary/50 p-1">
              <TabsTrigger value="search" className="font-poppins flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search
              </TabsTrigger>
              <TabsTrigger value="upload" className="font-poppins flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </TabsTrigger>
              <TabsTrigger value="browse" className="font-poppins flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                Browse
              </TabsTrigger>
            </TabsList>

            {/* Search Tab */}
            <TabsContent value="search" className="space-y-8">
              <Card className="shadow-soft">
                <CardContent className="p-8">
                  {/* Search Bar */}
                  <div className="max-w-3xl mx-auto space-y-6">
                    <div className="text-center mb-8">
                      <h2 className="font-poppins text-2xl font-semibold text-foreground mb-2">
                        Search Inside PDFs
                      </h2>
                      <p className="font-poppins text-muted-foreground">
                        Enter keywords in English, Hindi, or Gujarati with transliteration support
                      </p>
                    </div>

                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground" />
                      <Input
                        placeholder="अहिंसा परमो धर्म... or ahimsa paramo dharma..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 h-14 text-lg font-poppins rounded-2xl border-2 focus:border-primary"
                        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                      />
                    </div>

                    {/* Search Options */}
                    <div className="flex flex-wrap items-center justify-center gap-4">
                      <Select value={searchType} onValueChange={setSearchType}>
                        <SelectTrigger className="w-44 font-poppins">
                          <SelectValue placeholder="Search type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="keyword" className="font-poppins">Keyword Search</SelectItem>
                          <SelectItem value="natural" className="font-poppins">Natural Language</SelectItem>
                          <SelectItem value="transliteration" className="font-poppins">Transliteration</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                        <SelectTrigger className="w-36 font-poppins">
                          <SelectValue placeholder="Category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="font-poppins">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                        <SelectTrigger className="w-36 font-poppins">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang} className="font-poppins">{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Button 
                        variant="hero" 
                        onClick={handleSearch}
                        disabled={isSearching}
                        className="font-poppins px-8"
                      >
                        {isSearching ? (
                          <>
                            <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                            Searching...
                          </>
                        ) : (
                          <>
                            <Search className="h-4 w-4 mr-2" />
                            Search PDFs
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Search Results */}
              {showResults && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <p className="font-poppins text-muted-foreground">
                      {isSearching ? (
                        "Searching..."
                      ) : (
                        <>
                          <span className="text-foreground font-semibold">{searchResults.length}</span> results found across PDFs
                        </>
                      )}
                    </p>
                    {!isSearching && searchResults.length > 0 && (
                      <Button 
                        variant="outline" 
                        onClick={handleDownloadPages}
                        className="font-poppins"
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download Matched Pages
                      </Button>
                    )}
                  </div>

                  {isSearching ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <Card key={i} className="shadow-soft">
                          <CardContent className="p-6">
                            <div className="space-y-3">
                              <Skeleton className="h-6 w-48" />
                              <Skeleton className="h-4 w-32" />
                              <Skeleton className="h-16 w-full" />
                              <Skeleton className="h-8 w-24" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {searchResults.map((result) => (
                        <Card 
                          key={result.id} 
                          className="shadow-soft hover:shadow-elevated transition-all duration-300"
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <BookOpen className="h-5 w-5 text-primary" />
                                  <h3 className="font-poppins font-semibold text-lg text-foreground">
                                    {result.bookTitle}
                                  </h3>
                                  <Badge variant="secondary" className="font-poppins">
                                    Page {result.pageNumber}
                                  </Badge>
                                  <Badge 
                                    variant="outline" 
                                    className="font-poppins text-xs bg-sage/10 text-sage border-sage/30"
                                  >
                                    {result.relevance}% match
                                  </Badge>
                                </div>
                                <div className="bg-secondary/30 rounded-xl p-4 mb-4">
                                  <p className="font-poppins text-foreground leading-relaxed">
                                    {result.snippet}
                                  </p>
                                </div>
                                <div className="flex items-center gap-3">
                                  <Badge variant="outline" className="font-poppins text-xs">
                                    <Tag className="h-3 w-3 mr-1" />
                                    {result.matchedTerm}
                                  </Badge>
                                </div>
                              </div>
                              <Button 
                                variant="outline" 
                                onClick={() => handleOpenPDF(result.bookTitle, result.pageNumber)}
                                className="font-poppins shrink-0"
                              >
                                <Eye className="h-4 w-4 mr-2" />
                                Open PDF
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </TabsContent>

            {/* Upload Tab */}
            <TabsContent value="upload">
              <Card className="shadow-soft max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-poppins flex items-center gap-2">
                    <FileUp className="h-5 w-5 text-primary" />
                    Upload New PDF
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary/50 transition-colors cursor-pointer">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="font-poppins font-medium text-foreground mb-1">
                      Drop your PDF here or click to browse
                    </p>
                    <p className="font-poppins text-sm text-muted-foreground">
                      Maximum file size: 50MB
                    </p>
                  </div>

                  {/* Metadata Form */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-poppins">Title *</Label>
                      <Input
                        placeholder="Book title"
                        value={uploadForm.title}
                        onChange={(e) => setUploadForm({ ...uploadForm, title: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Publish Title</Label>
                      <Input
                        placeholder="Publication title"
                        value={uploadForm.publishTitle}
                        onChange={(e) => setUploadForm({ ...uploadForm, publishTitle: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-poppins">Author</Label>
                      <Input
                        placeholder="Author name"
                        value={uploadForm.author}
                        onChange={(e) => setUploadForm({ ...uploadForm, author: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Publisher</Label>
                      <Input
                        placeholder="Publisher name"
                        value={uploadForm.publisher}
                        onChange={(e) => setUploadForm({ ...uploadForm, publisher: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label className="font-poppins">Category</Label>
                      <Select 
                        value={uploadForm.category} 
                        onValueChange={(v) => setUploadForm({ ...uploadForm, category: v })}
                      >
                        <SelectTrigger className="font-poppins">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="font-poppins">{cat}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Language</Label>
                      <Select 
                        value={uploadForm.language} 
                        onValueChange={(v) => setUploadForm({ ...uploadForm, language: v })}
                      >
                        <SelectTrigger className="font-poppins">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang} value={lang} className="font-poppins">{lang}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Year</Label>
                      <Input
                        placeholder="Publication year"
                        value={uploadForm.year}
                        onChange={(e) => setUploadForm({ ...uploadForm, year: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins">Tags</Label>
                    <Input
                      placeholder="Enter tags separated by commas"
                      value={uploadForm.tags}
                      onChange={(e) => setUploadForm({ ...uploadForm, tags: e.target.value })}
                      className="font-poppins"
                    />
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadForm({
                        title: "",
                        publishTitle: "",
                        author: "",
                        publisher: "",
                        category: "",
                        language: "",
                        year: "",
                        tags: "",
                      })}
                      className="font-poppins"
                    >
                      Reset
                    </Button>
                    <Button variant="hero" onClick={handleUpload} className="font-poppins">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload PDF
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Browse Tab */}
            <TabsContent value="browse">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sampleBooks.map((book) => (
                  <Card 
                    key={book.id} 
                    className="shadow-soft hover:shadow-elevated transition-all duration-300 group"
                  >
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-poppins font-semibold text-lg text-foreground mb-1">
                        {book.title}
                      </h3>
                      <p className="font-poppins text-sm text-muted-foreground mb-3">
                        {book.author}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="font-poppins text-xs">
                          <Languages className="h-3 w-3 mr-1" />
                          {book.language}
                        </Badge>
                        <Badge variant="outline" className="font-poppins text-xs">
                          <FolderOpen className="h-3 w-3 mr-1" />
                          {book.category}
                        </Badge>
                        <Badge variant="outline" className="font-poppins text-xs">
                          {book.pages} pages
                        </Badge>
                      </div>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {book.tags.map((tag) => (
                          <Badge key={tag} variant="secondary" className="font-poppins text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full font-poppins"
                        onClick={() => handleOpenPDF(book.title, 1)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        View PDF
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default Shabdasangraha;
