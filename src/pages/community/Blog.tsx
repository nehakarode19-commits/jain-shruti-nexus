import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { useBlogsFromDB } from "@/hooks/useContent";
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
  Loader2
} from "lucide-react";
import { format } from "date-fns";

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
      {/* Hero Section - Clean and Professional */}
      <section className="py-16 lg:py-20 bg-[#E9EEF2]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">
              Our Blog
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-[#2B3A4A] mb-6">
              Blogs & Articles
            </h1>
            <p className="text-lg text-[#555555] mb-4">
              Explore articles, tributes, and stories about Gurudev Muni Jambuvijayji Maharaj, 
              his teachings, and his invaluable contributions to Jain scholarship.
            </p>
            <div className="w-20 h-1 bg-[#4A6FA5] mx-auto rounded-full" />
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 bg-white border-b border-[#DCE3E7]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between max-w-5xl mx-auto">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#555555]" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-[#DCE3E7] focus:border-[#4A6FA5]"
              />
            </div>
            <p className="text-sm text-[#555555]">
              {filteredPosts.length} articles found
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12 lg:py-16 bg-white">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
            </div>
          ) : (
            <>
              {/* Blog Cards - 3 Column Grid like Reference */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {filteredPosts.map((post, index) => (
                  <article 
                    key={post.id}
                    className="group bg-white rounded-xl overflow-hidden border border-[#DCE3E7] hover:shadow-xl hover:border-[#4A6FA5] transition-all duration-300"
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
                      <h2 className="font-heading text-xl font-bold text-[#2B3A4A] mb-3 line-clamp-2 group-hover:text-[#4A6FA5] transition-colors">
                        {post.title}
                      </h2>
                      
                      <p className="text-[#555555] text-sm leading-relaxed mb-5 line-clamp-4">
                        {post.excerpt}
                      </p>

                      {/* Read More Button */}
                      <Button 
                        variant="outline"
                        asChild
                        className="border-[#4A6FA5] text-[#4A6FA5] hover:bg-[#4A6FA5] hover:text-white"
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
                  <BookOpen className="h-16 w-16 text-[#DCE3E7] mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-[#2B3A4A] mb-2">
                    No articles found
                  </h3>
                  <p className="text-[#555555] mb-4">
                    Try adjusting your search criteria
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setSearchQuery("")}
                    className="border-[#4A6FA5] text-[#4A6FA5]"
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
      <section className="py-16 bg-[#2B3A4A]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Stay Updated
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Subscribe to receive the latest articles and insights about Jain philosophy, 
            Gurudev's teachings, and research updates.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input 
              placeholder="Enter your email" 
              type="email" 
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
            <Button className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Blog;
