import { Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, User, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    slug: "understanding-jain-philosophy",
    title: "Understanding the Core Principles of Jain Philosophy",
    excerpt: "An exploration of the fundamental tenets of Jainism - Ahimsa, Anekantavada, and Aparigraha - and their relevance in contemporary life.",
    author: "Editorial Team",
    date: "2024-02-15",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    slug: "manuscript-preservation-legacy",
    title: "The Legacy of Manuscript Preservation",
    excerpt: "How Gurudev's tireless efforts saved thousands of ancient texts from obscurity and made them accessible to scholars worldwide.",
    author: "Dr. Sharma",
    date: "2024-02-01",
    category: "Legacy",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    slug: "prakrit-language-importance",
    title: "The Importance of Prakrit in Jain Literature",
    excerpt: "Understanding why Prakrit remains central to Jain scriptural tradition and how Gurudev championed its study.",
    author: "Prof. Mehta",
    date: "2024-01-20",
    category: "Language",
    image: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    slug: "agam-scriptures-guide",
    title: "A Beginner's Guide to Jain Agam Scriptures",
    excerpt: "Introduction to the canonical texts of Jainism, their structure, and significance in spiritual practice.",
    author: "Sadhvi Pramukha",
    date: "2024-01-10",
    category: "Education",
    image: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    slug: "jain-temples-india",
    title: "Sacred Jain Temples of India",
    excerpt: "A journey through the architectural marvels and spiritual sanctuaries that embody Jain devotion across India.",
    author: "Editorial Team",
    date: "2023-12-28",
    category: "Heritage",
    image: "https://images.unsplash.com/photo-1564507592333-c60657eea523?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    slug: "ahimsa-modern-world",
    title: "Ahimsa in the Modern World",
    excerpt: "Exploring how the Jain principle of non-violence can address contemporary challenges from environmental ethics to social justice.",
    author: "Dr. Jain",
    date: "2023-12-15",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop",
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Blogs() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Blogs & Insights
            </h1>
            <div className="section-divider" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Articles on Jain philosophy, heritage, and Gurudev's teachings
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-elevated transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="text-primary font-medium">{post.category}</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(post.date)}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-1">
                      <User className="w-3.5 h-3.5" />
                      {post.author}
                    </span>
                    <Link
                      to={`/blogs/${post.slug}`}
                      className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
                    >
                      Read More
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-12">
            <Button variant="outline" size="lg">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}