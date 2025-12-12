import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AnimatedContainer } from "@/components/ui/animated-container";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, MapPin, BookOpen, Award, ArrowLeft, Mail, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import scholarMale1 from "@/assets/scholars/scholar-male-1.jpg";
import scholarMale2 from "@/assets/scholars/scholar-male-2.jpg";
import scholarMale3 from "@/assets/scholars/scholar-male-3.jpg";
import scholarMale4 from "@/assets/scholars/scholar-male-4.jpg";
import scholarFemale1 from "@/assets/scholars/scholar-female-1.jpg";
import scholarFemale2 from "@/assets/scholars/scholar-female-2.jpg";

// Scholar data
const scholars = [
  {
    id: "1",
    name: "Dr. Prabhakaran Jain",
    avatar: scholarMale1,
    expertise: ["Agama Studies", "Prakrit Literature"],
    category: "Senior Scholar",
    affiliation: "University of Mumbai",
    country: "India",
    publications: 28,
    citations: 156,
    manuscripts: 12,
    entries: 45,
  },
  {
    id: "2",
    name: "Prof. Sadhvi M.S.",
    avatar: scholarFemale1,
    expertise: ["Philosophy", "Ethics"],
    category: "Senior Scholar",
    affiliation: "Jain Research Institute",
    country: "India",
    publications: 42,
    citations: 234,
    manuscripts: 18,
    entries: 78,
  },
  {
    id: "3",
    name: "Dr. Robert Zydenbos",
    avatar: scholarMale2,
    expertise: ["Comparative Religion", "Jain Studies"],
    category: "Active Scholar",
    affiliation: "Ludwig Maximilian University",
    country: "Germany",
    publications: 19,
    citations: 87,
    manuscripts: 5,
    entries: 32,
  },
  {
    id: "4",
    name: "Dr. Jayanti Lal Jain",
    avatar: scholarMale3,
    expertise: ["Manuscript Studies", "Sanskrit"],
    category: "Senior Scholar",
    affiliation: "BHU Varanasi",
    country: "India",
    publications: 31,
    citations: 178,
    manuscripts: 24,
    entries: 56,
  },
  {
    id: "5",
    name: "Dr. Ananya Sharma",
    avatar: scholarFemale2,
    expertise: ["Jain Philosophy", "Linguistics"],
    category: "Active Scholar",
    affiliation: "SOAS University of London",
    country: "UK",
    publications: 15,
    citations: 62,
    manuscripts: 3,
    entries: 23,
  },
  {
    id: "6",
    name: "Dr. Mahesh Patel",
    avatar: scholarMale4,
    expertise: ["History", "Manuscriptology"],
    category: "New Scholar",
    affiliation: "Gujarat University",
    country: "India",
    publications: 8,
    citations: 24,
    manuscripts: 6,
    entries: 12,
  },
];

const categories = ["All", "Senior Scholar", "Active Scholar", "New Scholar"];
const expertiseAreas = ["All", "Jain Philosophy", "Sanskrit", "Manuscript Studies", "Prakrit Literature", "Agama Studies", "Philosophy", "Ethics", "History"];
const countries = ["All", "India", "UK", "USA", "Germany"];

export default function ScholarsDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");

  const filteredScholars = scholars.filter((scholar) => {
    const matchesSearch = scholar.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      scholar.expertise.some(e => e.toLowerCase().includes(searchQuery.toLowerCase())) ||
      scholar.affiliation.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || scholar.category === selectedCategory;
    const matchesExpertise = selectedExpertise === "All" || scholar.expertise.includes(selectedExpertise);
    const matchesCountry = selectedCountry === "All" || scholar.country === selectedCountry;

    return matchesSearch && matchesCategory && matchesExpertise && matchesCountry;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Senior Scholar": return "bg-primary/10 text-primary border-primary/30";
      case "Active Scholar": return "bg-blue-500/10 text-blue-600 border-blue-500/30";
      case "New Scholar": return "bg-muted text-muted-foreground border-border";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lotus-pattern bg-secondary/50">
        <div className="container mx-auto px-4">
          <AnimatedContainer animation="fade-in" className="max-w-3xl mx-auto text-center">
            <Link 
              to="/scholars" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Scholars
            </Link>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Scholar Directory
            </h1>
            <p className="font-body text-lg text-muted-foreground">
              Browse our complete directory of scholars and researchers in Jain studies
            </p>
          </AnimatedContainer>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          {/* Search and Filters */}
          <AnimatedContainer animation="fade-in" delay={100}>
            <Card className="mb-8 border-border/50">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, expertise, or affiliation..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-wrap gap-3">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="w-[160px]">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map(cat => (
                          <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedExpertise} onValueChange={setSelectedExpertise}>
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Expertise" />
                      </SelectTrigger>
                      <SelectContent>
                        {expertiseAreas.map(exp => (
                          <SelectItem key={exp} value={exp}>{exp}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Country" />
                      </SelectTrigger>
                      <SelectContent>
                        {countries.map(country => (
                          <SelectItem key={country} value={country}>{country}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>

          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-muted-foreground font-body">
              Showing <span className="font-semibold text-foreground">{filteredScholars.length}</span> scholars
            </p>
          </div>

          {/* Scholar Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredScholars.map((scholar, index) => (
              <AnimatedContainer key={scholar.id} animation="fade-up" delay={index * 50}>
                <Card className="hover:shadow-lg transition-all duration-300 border-border/50 h-full">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-14 w-14 border-2 border-border">
                        <AvatarImage src={scholar.avatar} alt={scholar.name} />
                        <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                          {scholar.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-heading font-semibold text-lg text-foreground truncate">{scholar.name}</h3>
                        <p className="text-sm text-muted-foreground truncate">{scholar.affiliation}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <MapPin className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{scholar.country}</span>
                        </div>
                      </div>
                    </div>

                    {/* Badge */}
                    <Badge variant="outline" className={`mb-4 ${getCategoryColor(scholar.category)}`}>
                      {scholar.category}
                    </Badge>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {scholar.expertise.map((exp) => (
                        <Badge key={exp} variant="secondary" className="text-xs font-normal">
                          {exp}
                        </Badge>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-2 text-center border-t border-border pt-4 mb-4">
                      <div>
                        <div className="font-heading font-bold text-foreground">{scholar.publications}</div>
                        <div className="text-xs text-muted-foreground">Publications</div>
                      </div>
                      <div>
                        <div className="font-heading font-bold text-foreground">{scholar.citations}</div>
                        <div className="text-xs text-muted-foreground">Citations</div>
                      </div>
                      <div>
                        <div className="font-heading font-bold text-foreground">{scholar.manuscripts}</div>
                        <div className="text-xs text-muted-foreground">Manuscripts</div>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{scholar.entries} entries</span>
                      <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                        View Profile
                        <ArrowLeft className="h-4 w-4 ml-1 rotate-180" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </AnimatedContainer>
            ))}
          </div>

          {filteredScholars.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-lg mb-2">No scholars found</h3>
              <p className="text-muted-foreground font-body">Try adjusting your search or filters</p>
            </div>
          )}

          {/* Become a Scholar CTA */}
          <AnimatedContainer animation="fade-in" delay={300} className="mt-12">
            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-8 text-center">
                <h2 className="font-heading text-2xl font-bold text-foreground mb-3">
                  Join Our Scholar Network
                </h2>
                <p className="font-body text-muted-foreground mb-6 max-w-lg mx-auto">
                  Apply to become a contributing scholar and gain access to exclusive research tools and collaboration opportunities.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button asChild>
                    <Link to="/auth">
                      <FileText className="h-4 w-4 mr-2" />
                      Apply Now
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to="/contact">
                      <Mail className="h-4 w-4 mr-2" />
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </AnimatedContainer>
        </div>
      </section>
    </Layout>
  );
}
