import { useState } from "react";
import { Link } from "react-router-dom";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, MessageSquare, Mail, MapPin, BookOpen, Award } from "lucide-react";
import { MessageDialog } from "@/components/scholar/MessageDialog";
import { EmailDialog } from "@/components/scholar/EmailDialog";

// Mock scholar data
const scholars = [
  {
    id: "1",
    name: "Dr. Rajesh Sharma",
    avatar: "/src/assets/scholars/scholar-male-1.jpg",
    expertise: ["Jain Philosophy", "Sanskrit Studies"],
    category: "Senior Scholar",
    affiliation: "Gujarat University",
    country: "India",
    publications: 45,
    citations: 320,
    email: "r.sharma@gu.edu",
  },
  {
    id: "2",
    name: "Prof. Meera Patel",
    avatar: "/src/assets/scholars/scholar-female-1.jpg",
    expertise: ["Manuscript Studies", "Prakrit Literature"],
    category: "Active Scholar",
    affiliation: "SOAS London",
    country: "UK",
    publications: 32,
    citations: 210,
    email: "m.patel@soas.ac.uk",
  },
  {
    id: "3",
    name: "Dr. Amit Jain",
    avatar: "/src/assets/scholars/scholar-male-2.jpg",
    expertise: ["Jain Ethics", "Comparative Religion"],
    category: "Senior Scholar",
    affiliation: "JNU Delhi",
    country: "India",
    publications: 58,
    citations: 450,
    email: "a.jain@jnu.ac.in",
  },
  {
    id: "4",
    name: "Dr. Sunita Devi",
    avatar: "/src/assets/scholars/scholar-female-2.jpg",
    expertise: ["Art History", "Jain Iconography"],
    category: "Active Scholar",
    affiliation: "Banaras Hindu University",
    country: "India",
    publications: 28,
    citations: 180,
    email: "s.devi@bhu.ac.in",
  },
  {
    id: "5",
    name: "Prof. Vikram Singh",
    avatar: "/src/assets/scholars/scholar-male-3.jpg",
    expertise: ["Ancient Languages", "Agama Studies"],
    category: "Senior Scholar",
    affiliation: "Mumbai University",
    country: "India",
    publications: 67,
    citations: 520,
    email: "v.singh@mu.edu",
  },
  {
    id: "6",
    name: "Dr. Priya Mehta",
    avatar: "/src/assets/scholars/scholar-male-4.jpg",
    expertise: ["Digital Humanities", "Text Digitization"],
    category: "New Scholar",
    affiliation: "IIT Bombay",
    country: "India",
    publications: 12,
    citations: 65,
    email: "p.mehta@iitb.ac.in",
  },
];

const categories = ["All", "Senior Scholar", "Active Scholar", "New Scholar"];
const expertiseAreas = ["All", "Jain Philosophy", "Sanskrit Studies", "Manuscript Studies", "Prakrit Literature", "Agama Studies", "Art History"];
const countries = ["All", "India", "UK", "USA", "Germany"];

export default function ScholarDirectory() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedExpertise, setSelectedExpertise] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All");
  
  // Dialog states
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [emailDialogOpen, setEmailDialogOpen] = useState(false);
  const [selectedScholar, setSelectedScholar] = useState<typeof scholars[0] | null>(null);

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
      case "Senior Scholar": return "bg-gold/10 text-gold border-gold/30";
      case "Active Scholar": return "bg-blue-500/10 text-blue-500 border-blue-500/30";
      case "New Scholar": return "bg-green-500/10 text-green-500 border-green-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleMessage = (scholar: typeof scholars[0]) => {
    setSelectedScholar(scholar);
    setMessageDialogOpen(true);
  };

  const handleEmail = (scholar: typeof scholars[0]) => {
    setSelectedScholar(scholar);
    setEmailDialogOpen(true);
  };

  return (
    <ScholarLayout title="Scholar Directory">
      <div className="space-y-6">
        {/* Search and Filters */}
        <Card>
          <CardContent className="p-4">
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

        {/* Results Count */}
        <div className="flex items-center justify-between">
          <p className="text-muted-foreground">
            Showing <span className="font-semibold text-foreground">{filteredScholars.length}</span> scholars
          </p>
        </div>

        {/* Scholar Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredScholars.map((scholar) => (
            <Card key={scholar.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-16 w-16 border-2 border-border">
                    <AvatarImage src={scholar.avatar} alt={scholar.name} />
                    <AvatarFallback className="bg-primary/10 text-primary text-lg font-semibold">
                      {scholar.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link 
                      to={`/scholar/profile/${scholar.id}`}
                      className="font-semibold text-lg text-foreground truncate hover:text-primary transition-colors block"
                    >
                      {scholar.name}
                    </Link>
                    <p className="text-sm text-muted-foreground truncate">{scholar.affiliation}</p>
                    <Badge variant="outline" className={`mt-2 ${getCategoryColor(scholar.category)}`}>
                      {scholar.category}
                    </Badge>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {scholar.expertise.map((exp) => (
                    <Badge key={exp} variant="secondary" className="text-xs">
                      {exp}
                    </Badge>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {scholar.country}
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    {scholar.publications} papers
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {scholar.citations} citations
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleMessage(scholar)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1"
                    onClick={() => handleEmail(scholar)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredScholars.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="font-semibold text-lg mb-2">No scholars found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Dialogs */}
      <MessageDialog 
        open={messageDialogOpen} 
        onOpenChange={setMessageDialogOpen}
        scholar={selectedScholar}
      />
      <EmailDialog 
        open={emailDialogOpen} 
        onOpenChange={setEmailDialogOpen}
        scholar={selectedScholar}
      />
    </ScholarLayout>
  );
}
