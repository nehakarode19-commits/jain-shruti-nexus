import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { SimilarItems } from "@/components/ui/similar-items";
import { articles } from "@/data/gurudevData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  FileText, 
  User, 
  Globe, 
  Tag,
  Calendar,
  BookOpen
} from "lucide-react";

const ArticleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const article = articles.find((a) => a.id === Number(id));
  
  // Get similar articles (same category, excluding current)
  const similarArticles = article 
    ? articles.filter((a) => a.category === article.category && a.id !== article.id).slice(0, 4)
    : [];

  if (!article) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <FileText className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Article Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/articles">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Articles
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Articles", href: "/articles" },
          { label: article.titleEn }
        ]}
      />

      {/* Article Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Article Image */}
            <div className="relative group">
              <div className="aspect-[4/3] max-w-lg mx-auto lg:mx-0 bg-secondary/30 rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={article.image}
                  alt={article.titleEn}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            {/* Article Info */}
            <div className="space-y-6 animate-fade-up">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="default">{article.category}</Badge>
                  <Badge variant="outline" className="gap-1">
                    <Globe className="h-3 w-3" />
                    {article.language}
                  </Badge>
                </div>
                
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-2">
                  {article.titleEn}
                </h1>
                
                <p className="text-lg text-primary font-medium mb-4">
                  {article.title}
                </p>
                
                <div className="flex items-center gap-3 text-muted-foreground">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm">
                    <span className="font-medium text-foreground">Author:</span> {article.author}
                  </span>
                </div>
              </div>

              {/* Download Button */}
              <Button variant="hero" size="lg" className="w-full sm:w-auto">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Category:</span>
                  <Badge variant="secondary">{article.category}</Badge>
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
            About this Article
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {article.excerpt}
          </p>
          <p className="text-muted-foreground leading-relaxed max-w-3xl mt-4">
            This {article.category.toLowerCase()} by {article.author} explores important aspects 
            of Gurudev Muni Jambuvijayji Maharaj Saheb's life and contributions. Originally written 
            in {article.language}, this work provides valuable insights into Jain philosophy and 
            the preservation of ancient wisdom.
          </p>
        </div>
      </section>

      {/* Similar Articles */}
      <SimilarItems
        title="Similar Articles"
        subtitle="Read More"
        items={similarArticles.map(a => ({
          id: a.id,
          title: a.titleEn,
          image: a.image,
          category: a.category,
          subtitle: a.author
        }))}
        basePath="/articles"
      />

      {/* CTA Section */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Explore more scholarly articles and tributes
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/articles">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Articles
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/books">
                View Books
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetails;
