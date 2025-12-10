import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useBlogsFromDB } from "@/hooks/useContent";
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock,
  BookOpen,
  ArrowRight,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const BlogDetails = () => {
  const { id } = useParams();
  const { data: blogPosts = [], isLoading } = useBlogsFromDB();
  
  const post = blogPosts.find((p) => p.id === id);
  
  // Get related posts (excluding current)
  const relatedPosts = post 
    ? blogPosts.filter((p) => p.id !== post.id).slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <Layout>
        <section className="py-20 bg-[#E9EEF2]">
          <div className="container mx-auto px-4 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#4A6FA5]" />
          </div>
        </section>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <section className="py-20 bg-[#E9EEF2]">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="h-16 w-16 text-[#DCE3E7] mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-[#2B3A4A] mb-4">
              Article Not Found
            </h1>
            <p className="text-[#555555] mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button 
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
              asChild
            >
              <Link to="/community/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Format date
  const formattedDate = post.created_at 
    ? format(new Date(post.created_at), 'MMMM d, yyyy')
    : 'Unknown date';

  // Generate full content based on the post
  const fullContent = post.content || `
${post.excerpt || ''}

In the rich tapestry of Jain philosophy and tradition, we find countless teachings that remain profoundly relevant today. This exploration delves deep into the subject matter, drawing from the wisdom of Gurudev Muni Jambuvijayji Maharaj Saheb and the timeless principles preserved in ancient texts.

## Understanding the Context

The teachings and traditions we examine here are rooted in millennia of spiritual practice and scholarly pursuit. Gurudev dedicated his life to preserving and sharing this knowledge, making it accessible to seekers across generations.

The meticulous preservation of manuscripts, the careful interpretation of ancient texts, and the practical application of philosophical principles all contribute to our understanding of this vast spiritual heritage.

## Key Insights

1. **Ahimsa (Non-violence)**: At the heart of Jain philosophy lies the principle of non-violence in thought, word, and deed. This extends to all living beings and forms the foundation of ethical conduct.

2. **Anekantavada (Many-sidedness)**: This doctrine teaches us that reality can be perceived from multiple perspectives, encouraging intellectual humility and respectful dialogue.

3. **Aparigraha (Non-attachment)**: The teaching of non-attachment guides practitioners toward spiritual freedom by reducing material desires and possessions.

## Relevance Today

In our modern world, these ancient teachings offer guidance for navigating complex ethical questions, building harmonious communities, and pursuing personal spiritual growth. The work of scholars like Gurudev ensures that this wisdom remains alive and accessible.

## Conclusion

As we continue to study and apply these teachings, we honor the legacy of great teachers while finding new meaning and application in our contemporary lives. The journey of understanding is ongoing, inviting each generation to discover these timeless truths anew.
  `.trim();

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Blog", href: "/community/blog" },
          { label: post.title }
        ]}
      />

      {/* Hero Image */}
      <section className="relative">
        <div className="aspect-[21/9] max-h-[400px] overflow-hidden">
          <img 
            src={post.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#E9EEF2]/90 via-[#E9EEF2]/30 to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16 bg-[#E9EEF2]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-up -mt-24 relative z-10">
              <Badge className="mb-4 bg-[#4A6FA5] text-white">
                Blog
              </Badge>
              
              <h1 className="font-heading text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2B3A4A] mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-[#555555] pb-6 border-b border-[#DCE3E7]">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-[#4A6FA5]/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-[#4A6FA5]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#2B3A4A]">{post.author || 'Jambushrusti Team'}</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{formattedDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>5 min read</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none animate-fade-up delay-100 bg-white p-8 rounded-xl shadow-sm">
              {fullContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-heading text-2xl font-bold text-[#2B3A4A] mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                  return (
                    <div key={index} className="my-2">
                      <p className="text-[#333333] leading-relaxed" dangerouslySetInnerHTML={{ 
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} />
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-[#555555] leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-[#DCE3E7] animate-fade-up delay-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[#555555]">Share this article:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9 border-[#DCE3E7]">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-[#DCE3E7]">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-[#DCE3E7]">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9 border-[#DCE3E7]">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 p-6 rounded-2xl bg-white border border-[#DCE3E7] animate-fade-up delay-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-[#4A6FA5]/10 flex items-center justify-center shrink-0">
                  <User className="h-8 w-8 text-[#4A6FA5]" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-[#2B3A4A] mb-1">
                    {post.author || 'Jambushrusti Team'}
                  </h3>
                  <p className="text-sm text-[#555555] mb-3">
                    Contributing Author
                  </p>
                  <p className="text-sm text-[#555555]">
                    A dedicated contributor to Jambushrusti, sharing insights on Jain philosophy, 
                    Gurudev's teachings, and the preservation of ancient wisdom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <span className="text-xs font-medium tracking-widest text-[#4A6FA5] uppercase">
                Continue Reading
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-[#2B3A4A] mt-2">
                Related Articles
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/community/blog/${relatedPost.id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full border border-[#DCE3E7] hover:shadow-lg hover:border-[#4A6FA5] transition-all duration-300">
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={relatedPost.cover_image || "https://siddhijambuparivar.com/wp-content/uploads/2022/11/96-min.jpg"}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-heading font-medium text-[#2B3A4A] group-hover:text-[#4A6FA5] transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-[#555555] mt-2">
                        {relatedPost.created_at 
                          ? format(new Date(relatedPost.created_at), 'MMM d, yyyy')
                          : '5 min read'
                        }
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-12 bg-[#2B3A4A]">
        <div className="container mx-auto px-4 text-center">
          <p className="text-white/70 mb-4">
            Explore more articles and insights
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              className="bg-[#4A6FA5] hover:bg-[#3A5F95] text-white"
              asChild
            >
              <Link to="/community/blog">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Articles
              </Link>
            </Button>
            <Button 
              variant="outline" 
              className="border-white/20 text-white hover:bg-white/10"
              asChild
            >
              <Link to="/guruvani">
                Explore Guruvani
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BlogDetails;
