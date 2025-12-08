import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  BookOpen, 
  Scroll as ScrollIcon,
  User, 
  Calendar,
  MapPin,
  Globe,
  Tag,
  Hash,
  Info,
  Mail
} from "lucide-react";

// Import book cover images
import agam02Cover from "@/assets/books/agam-02-sutrakrutang.png";
import agam03Cover from "@/assets/books/agam-03-sthananga-01.png";
import agam06Cover from "@/assets/books/agam-06-gnatadharma.png";
import dwadashanramPart1 from "@/assets/books/dwadashanram-part1.png";
import dwadashanramPart2 from "@/assets/books/dwadashanram-part2.png";
import guruvani1Cover from "@/assets/books/guruvani-1.jpg";

const catalogItems = [
  {
    id: 1,
    type: "Book",
    title: "Āgama Prakāśa",
    author: "Muni Jambuvijayji",
    year: "1985",
    language: "Sanskrit",
    category: "Agama Studies",
    available: true,
    location: "Rack A-12",
    description: "A comprehensive scholarly work illuminating the profound teachings of the Jain Agamas. This text provides detailed analysis and interpretation of ancient Jain scriptures, making them accessible to modern readers while preserving their spiritual essence.",
    publisher: "Shri Mahavira Jaina Vidyalaya",
    pages: 450,
    image: agam02Cover,
  },
  {
    id: 2,
    type: "Book",
    title: "Jain Darshan ka Itihas",
    author: "Dr. Nathmal Tatia",
    year: "1972",
    language: "Hindi",
    category: "Philosophy",
    available: true,
    location: "Rack B-05",
    description: "A historical exploration of Jain philosophy tracing its development through the centuries. This work examines the evolution of Jain thought and its contributions to Indian philosophical traditions.",
    publisher: "Jain Vishva Bharati",
    pages: 380,
    image: agam03Cover,
  },
  {
    id: 3,
    type: "Manuscript",
    title: "Kalpasutra (Illustrated)",
    author: "Traditional",
    year: "15th Century",
    language: "Prakrit",
    category: "Scripture",
    available: false,
    location: "Special Collection",
    description: "An exquisitely illustrated manuscript of the Kalpasutra, one of the most important Jain texts. This rare 15th-century copy features traditional Jain miniature paintings depicting the lives of the Tirthankaras.",
    publisher: "Traditional Manuscript",
    pages: 120,
    image: dwadashanramPart1,
  },
  {
    id: 4,
    type: "Book",
    title: "Tattvartha Sutra with Bhashya",
    author: "Umaswati",
    year: "1990",
    language: "Sanskrit",
    category: "Philosophy",
    available: true,
    location: "Rack A-03",
    description: "The foundational text of Jain philosophy with detailed commentary. Umaswati's masterwork presents the seven tattvas (realities) in a systematic manner, serving as the basis for understanding Jain metaphysics.",
    publisher: "Shri Mahavira Jaina Vidyalaya",
    pages: 520,
    image: agam06Cover,
  },
  {
    id: 5,
    type: "Manuscript",
    title: "Bhaktamara Stotra",
    author: "Acharya Manatunga",
    year: "8th Century",
    language: "Sanskrit",
    category: "Devotional",
    available: false,
    location: "Special Collection",
    description: "A rare manuscript of the beloved devotional hymn composed by Acharya Manatunga. This stotra, consisting of 48 verses, is considered one of the most powerful Jain prayers and is recited daily by devotees worldwide.",
    publisher: "Traditional Manuscript",
    pages: 28,
    image: dwadashanramPart2,
  },
  {
    id: 6,
    type: "Book",
    title: "Jain Ethics and Morality",
    author: "Dr. Padmanabh Jaini",
    year: "1998",
    language: "English",
    category: "Ethics",
    available: true,
    location: "Rack C-08",
    description: "A scholarly examination of Jain ethical principles and their application in modern life. This work explores the five great vows, the concept of ahimsa, and how Jain moral philosophy remains relevant today.",
    publisher: "Motilal Banarsidass",
    pages: 290,
    image: guruvani1Cover,
  },
];

const LibraryItemDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = catalogItems.find((i) => i.id === Number(id));
  
  // Get similar items (same type or category, excluding current)
  const similarItems = item 
    ? catalogItems.filter((i) => (i.type === item.type || i.category === item.category) && i.id !== item.id).slice(0, 3)
    : [];

  if (!item) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Item Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The item you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/library">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Library
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const ItemIcon = item.type === "Book" ? BookOpen : ScrollIcon;

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Library", href: "/library" },
          { label: item.title }
        ]}
      />

      {/* Item Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Item Visual */}
            <div className="relative group">
              <div className="aspect-[4/5] max-w-md mx-auto lg:mx-0 bg-secondary/30 rounded-2xl overflow-hidden shadow-elegant">
                <img 
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Availability Badge */}
              <Badge 
                className={`absolute top-4 right-4 ${item.available ? "bg-sage text-white" : "bg-muted text-muted-foreground"}`}
              >
                {item.available ? "Available" : "Reference Only"}
              </Badge>
            </div>

            {/* Item Info */}
            <div className="space-y-6 animate-fade-up">
              <div>
                <Badge variant="outline" className="mb-3">
                  <ItemIcon className="h-3 w-3 mr-1" />
                  {item.type}
                </Badge>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {item.title}
                </h1>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium text-foreground">Author:</span> {item.author}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium text-foreground">Year:</span> {item.year}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium text-foreground">Location:</span> {item.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact Button */}
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <Link to="/contact">
                  <Mail className="h-4 w-4 mr-2" />
                  Contact Librarian
                </Link>
              </Button>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{item.category}</Badge>
                </div>
                
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Language:</span>
                  <Badge variant="outline">{item.language}</Badge>
                </div>

                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Catalog ID:</span>
                  <span className="text-sm font-medium text-foreground">{item.id}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Description */}
      <section className="py-10 bg-secondary/20">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-xl font-bold text-primary mb-4">
            Description
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {item.description}
          </p>
          
          {/* Additional Info */}
          <div className="mt-6 pt-6 border-t border-border grid sm:grid-cols-2 gap-4 max-w-lg">
            <div>
              <span className="text-sm text-muted-foreground">Publisher:</span>
              <p className="text-sm font-medium text-foreground">{item.publisher}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Pages:</span>
              <p className="text-sm font-medium text-foreground">{item.pages}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Info Notice */}
      <section className="py-6 bg-background border-y border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-secondary/50">
            <Info className="h-5 w-5 text-muted-foreground shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-foreground font-medium mb-1">
                Physical Library Access Only
              </p>
              <p className="text-sm text-muted-foreground">
                This item is available at our physical library. Please contact the librarian to schedule a visit or request access.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Items */}
      {similarItems.length > 0 && (
        <section className="py-16 bg-gradient-spiritual relative overflow-hidden">
          <div className="absolute inset-0 lotus-pattern opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <span className="text-xs font-medium tracking-widest text-primary uppercase">
                Explore More
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                Similar Items
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {similarItems.map((similarItem, index) => {
                const SimilarIcon = similarItem.type === "Book" ? BookOpen : ScrollIcon;
                return (
                  <Link
                    key={similarItem.id}
                    to={`/library/${similarItem.id}`}
                    className="group"
                  >
                    <Card 
                      variant="interactive" 
                      className="overflow-hidden h-full animate-fade-up bg-background/80 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <SimilarIcon className="h-5 w-5 text-primary" />
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {similarItem.type}
                          </Badge>
                        </div>
                        <h3 className="font-display font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                          {similarItem.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1">{similarItem.author}</p>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Explore our complete collection of books and manuscripts
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/library">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Library Catalog
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/contact">
                Contact Librarian
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default LibraryItemDetails;
