import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBlogsFromDB } from "@/hooks/useContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { 
  Search, 
  ArrowRight, 
  BookOpen,
  Loader2
} from "lucide-react";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: blogPosts = [], isLoading } = useBlogsFromDB();

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="py-16 lg:py-20 lotus-pattern" style={{ backgroundColor: '#FAF7F2' }}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p 
              className="font-semibold mb-3 uppercase tracking-wider text-sm"
              style={{ color: '#C9A227', fontFamily: 'Inter, sans-serif' }}
            >
              Our Blog
            </p>
            <h1 
              className="text-4xl sm:text-5xl font-bold mb-6"
              style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
            >
              Blogs & Articles
            </h1>
            <p className="text-lg mb-4" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
              Explore articles, tributes, and stories about Gurudev Muni Jambuvijayji Maharaj, 
              his teachings, and his invaluable contributions to Jain scholarship.
            </p>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: '#C9A227' }} />
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6" style={{ backgroundColor: 'white', borderBottom: '1px solid #E8E4DD' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4" style={{ color: '#6B6764' }} />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
                style={{ borderColor: '#E8E4DD' }}
              />
            </div>
            <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
              {filteredPosts.length} articles found
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16" style={{ backgroundColor: 'white' }}>
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" style={{ color: '#C9A227' }} />
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id}
                    className="group rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    style={{ backgroundColor: 'white', border: '1px solid #E8E4DD' }}
                  >
                    {/* Image */}
                    <div className="aspect-[4/3] overflow-hidden">
                      <img 
                        src={post.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h2 
                        className="text-xl font-bold mb-3 line-clamp-2 group-hover:opacity-80 transition-colors"
                        style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                      >
                        {post.title}
                      </h2>
                      
                      <p 
                        className="text-sm leading-relaxed mb-5 line-clamp-4"
                        style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}
                      >
                        {post.excerpt}
                      </p>

                      {/* Read More Button */}
                      <Button 
                        variant="outline"
                        asChild
                        className="hover:text-white"
                        style={{ borderColor: '#C9A227', color: '#C9A227' }}
                      >
                        <Link to={`/community/blog/${post.id}`}>
                          Read More
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </article>
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="text-center py-16 max-w-md mx-auto">
                  <BookOpen className="h-16 w-16 mx-auto mb-4" style={{ color: '#E8E4DD' }} />
                  <h3 
                    className="text-xl font-semibold mb-2"
                    style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}
                  >
                    No articles found
                  </h3>
                  <p className="mb-4" style={{ fontFamily: 'Inter, sans-serif', color: '#6B6764' }}>
                    Try adjusting your search criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    style={{ borderColor: '#C9A227', color: '#C9A227' }}
                  >
                    Clear Search
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16" style={{ backgroundColor: '#2D2A26' }}>
        <div className="container mx-auto px-4 text-center">
          <h2 
            className="text-2xl md:text-3xl font-bold text-white mb-4"
            style={{ fontFamily: 'Playfair Display, serif' }}
          >
            Stay Updated
          </h2>
          <p className="mb-8 max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Subscribe to receive the latest articles and insights about Jain philosophy, 
            Gurudev's teachings, and research updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              type="email" 
              className="text-white"
              style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)' }}
            />
            <Button style={{ backgroundColor: '#C9A227', color: 'white' }}>
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
