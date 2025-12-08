import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User, Share2 } from "lucide-react";

// Sample blog data - in production would come from CMS/API
const blogData: Record<string, {
  title: string;
  author: string;
  date: string;
  category: string;
  image: string;
  content: string[];
}> = {
  "understanding-jain-philosophy": {
    title: "Understanding the Core Principles of Jain Philosophy",
    author: "Editorial Team",
    date: "2024-02-15",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&h=600&fit=crop",
    content: [
      "Jainism, one of the oldest religions in the world, offers profound insights into the nature of reality, consciousness, and ethical living. At its core are three fundamental principles that have guided practitioners for millennia.",
      "**Ahimsa (Non-Violence)**: The most well-known Jain principle, Ahimsa goes far beyond simply not harming others physically. It encompasses non-violence in thought, word, and deed. Jain monks and nuns take extreme precautions to avoid harming even the smallest creatures, reflecting the deep respect for all forms of life.",
      "**Anekantavada (Non-Absolutism)**: This principle acknowledges that truth and reality are complex and can be perceived differently from different perspectives. It teaches us intellectual humility and openness to multiple viewpoints, a teaching remarkably relevant in today's polarized world.",
      "**Aparigraha (Non-Possessiveness)**: This principle encourages us to limit our attachments to material possessions and to practice generosity. In a world driven by consumerism, Aparigraha offers a path to contentment and freedom from the endless cycle of desire.",
      "Pujya Acharya Shri Jambuvijayji Maharaj Saheb dedicated his life to studying, preserving, and teaching these principles. His scholarly work on the Jain Agamas made these ancient teachings accessible to modern readers, ensuring their wisdom continues to guide seekers of truth.",
    ],
  },
};

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogData[slug] : null;

  if (!post) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h1 className="font-display text-3xl font-semibold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist.
            </p>
            <Button asChild>
              <Link to="/blogs">Back to Blogs</Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-16 md:py-24">
        <div className="absolute inset-0">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/blogs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blogs
            </Link>
          </Button>
          <div className="max-w-3xl">
            <span className="text-primary font-medium">{post.category}</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mt-2 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(post.date)}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-lg max-w-none">
              {post.content.map((paragraph, index) => (
                <p key={index} className="text-foreground leading-relaxed mb-6">
                  {paragraph.startsWith("**") ? (
                    <>
                      <strong className="text-foreground">
                        {paragraph.match(/\*\*(.*?)\*\*/)?.[1]}
                      </strong>
                      {paragraph.replace(/\*\*.*?\*\*/, "")}
                    </>
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </article>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
              <span className="text-muted-foreground">Share this article</span>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>

            {/* Related */}
            <div className="mt-12">
              <h3 className="font-display text-2xl font-semibold text-foreground mb-6">
                Continue Reading
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <span className="text-xs text-primary font-medium">Philosophy</span>
                    <h4 className="font-display text-lg font-medium text-foreground mt-2">
                      Ahimsa in the Modern World
                    </h4>
                    <Link to="/blogs" className="text-sm text-primary hover:underline mt-2 inline-block">
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-elevated transition-shadow">
                  <CardContent className="p-4">
                    <span className="text-xs text-primary font-medium">Legacy</span>
                    <h4 className="font-display text-lg font-medium text-foreground mt-2">
                      The Legacy of Manuscript Preservation
                    </h4>
                    <Link to="/blogs" className="text-sm text-primary hover:underline mt-2 inline-block">
                      Read More →
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}