import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  BookOpen,
  Tag,
  Clock
} from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Significance of Jain Agamas in Modern Times",
    excerpt: "Exploring how the ancient Jain scriptures remain relevant and guide us in contemporary life...",
    author: "Dr. Pravin Mehta",
    date: "December 1, 2024",
    readTime: "5 min read",
    category: "Philosophy",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/43-min.jpg"
  },
  {
    id: 2,
    title: "Gurudev's Contribution to Manuscript Preservation",
    excerpt: "A detailed look at how Muni Jambuvijayji Maharaj Saheb revolutionized the preservation of Jain texts...",
    author: "Scholar Hemant Shah",
    date: "November 25, 2024",
    readTime: "8 min read",
    category: "History",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/99-min.jpg"
  },
  {
    id: 3,
    title: "Understanding Prakrit: The Language of Jain Scriptures",
    excerpt: "An introduction to Prakrit language and its importance in studying original Jain texts...",
    author: "Prof. Nalini Joshi",
    date: "November 18, 2024",
    readTime: "6 min read",
    category: "Education",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/111-min.jpg"
  },
  {
    id: 4,
    title: "The Art of Jain Manuscript Illustration",
    excerpt: "Discover the beautiful artistic traditions preserved in illuminated Jain manuscripts...",
    author: "Dr. Anjali Desai",
    date: "November 10, 2024",
    readTime: "7 min read",
    category: "Art & Culture",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/107-min.jpg"
  },
  {
    id: 5,
    title: "Janm Shatabdi Mahotsav: Celebrating 100 Years",
    excerpt: "Highlights from the centenary celebrations of Gurudev's birth and their lasting impact...",
    author: "Jambu Parivar",
    date: "October 28, 2024",
    readTime: "4 min read",
    category: "Events",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/101-min.jpg"
  },
  {
    id: 6,
    title: "Digital Preservation of Ancient Wisdom",
    excerpt: "How technology is helping preserve and share Jain knowledge for future generations...",
    author: "Tech Team",
    date: "October 15, 2024",
    readTime: "5 min read",
    category: "Technology",
    image: "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"
  },
];

const categories = ["All", "Philosophy", "History", "Education", "Art & Culture", "Events", "Technology"];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/80 border border-primary/20 text-sm mb-6">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Insights & Articles</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Blog & <span className="text-gradient-gold">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Explore articles, research insights, and stories about Jain philosophy, 
              Gurudev's teachings, and the preservation of ancient wisdom.
            </p>
          </div>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-8 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
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
              {categories.map((category) => (
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
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <Card 
                key={post.id}
                variant="interactive"
                className="overflow-hidden group animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img 
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <User className="h-3 w-3" />
                      <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>{post.date}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
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

          {filteredPosts.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Subscribe to receive the latest articles and insights about Jain philosophy and research
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input placeholder="Enter your email" type="email" />
            <Button variant="hero">Subscribe</Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;