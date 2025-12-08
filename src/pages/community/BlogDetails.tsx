import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  Linkedin
} from "lucide-react";
import { blogPosts } from "@/data/gurudevData";

const BlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const post = blogPosts.find((p) => p.id === Number(id));
  
  // Get related posts (same category, excluding current)
  const relatedPosts = post 
    ? blogPosts.filter((p) => p.category === post.category && p.id !== post.id).slice(0, 3)
    : [];

  // If no related posts from same category, get other posts
  const displayRelated = relatedPosts.length > 0 
    ? relatedPosts 
    : blogPosts.filter((p) => p.id !== post?.id).slice(0, 3);

  if (!post) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
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

  // Generate full content based on the post
  const fullContent = `
${post.excerpt}

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
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/30 to-transparent" />
        </div>
      </section>

      {/* Article Content */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-up -mt-24 relative z-10">
              <Badge variant="default" className="mb-4">
                {post.category}
              </Badge>
              
              <h1 className="font-display text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-6">
                {post.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author}</p>
                    <p className="text-xs">Author</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Body */}
            <div className="prose prose-lg max-w-none animate-fade-up delay-100">
              {fullContent.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="font-display text-2xl font-bold text-foreground mt-8 mb-4">
                      {paragraph.replace('## ', '')}
                    </h2>
                  );
                }
                if (paragraph.startsWith('1. ') || paragraph.startsWith('2. ') || paragraph.startsWith('3. ')) {
                  return (
                    <div key={index} className="my-2">
                      <p className="text-foreground leading-relaxed" dangerouslySetInnerHTML={{ 
                        __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                      }} />
                    </div>
                  );
                }
                return (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-4">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Share Section */}
            <div className="mt-12 pt-8 border-t border-border animate-fade-up delay-200">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">Share this article:</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Facebook className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Twitter className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Linkedin className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" className="h-9 w-9">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <Badge variant="outline">{post.category}</Badge>
              </div>
            </div>

            {/* Author Box */}
            <div className="mt-8 p-6 rounded-2xl bg-secondary/50 border border-border animate-fade-up delay-300">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <User className="h-8 w-8 text-primary" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-foreground mb-1">
                    {post.author}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Contributing Author
                  </p>
                  <p className="text-sm text-muted-foreground">
                    A dedicated contributor to Jambu-Shruti, sharing insights on Jain philosophy, 
                    Gurudev's teachings, and the preservation of ancient wisdom.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {displayRelated.length > 0 && (
        <section className="py-16 bg-gradient-spiritual relative overflow-hidden">
          <div className="absolute inset-0 lotus-pattern opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <span className="text-xs font-medium tracking-widest text-primary uppercase">
                Continue Reading
              </span>
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                Related Articles
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {displayRelated.map((relatedPost, index) => (
                <Link
                  key={relatedPost.id}
                  to={`/community/blog/${relatedPost.id}`}
                  className="group"
                >
                  <Card 
                    variant="interactive" 
                    className="overflow-hidden h-full animate-fade-up bg-background/80 backdrop-blur-sm"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="aspect-[16/10] overflow-hidden">
                      <img 
                        src={relatedPost.image}
                        alt={relatedPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-display font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-2">
                        {relatedPost.readTime}
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
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Explore more articles and insights
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/community/blog">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Articles
              </Link>
            </Button>
            <Button variant="outline" asChild>
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
