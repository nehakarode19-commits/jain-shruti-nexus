import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useGuruvaniById } from "@/hooks/useGuruvani";
import { useGuruvaniFromDB } from "@/hooks/useContent";
import { SocialShareButtons } from "@/components/social/SocialShareButtons";
import { 
  ArrowLeft, 
  BookOpen, 
  Mic, 
  FileText, 
  Lock,
  Calendar,
  Globe,
  Hash,
  Quote,
  ArrowRight,
  Loader2
} from "lucide-react";

const typeIcons: Record<string, typeof Mic> = {
  Discourse: Mic,
  "Written Work": BookOpen,
  Letter: FileText,
  Notes: FileText,
};

const GuruvaniDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { data: item, isLoading } = useGuruvaniById(id || "");
  const { data: allItems = [] } = useGuruvaniFromDB();
  
  // Get related items (same category, excluding current)
  const relatedItems = item 
    ? allItems.filter((i) => 
        i.category === item.category && 
        i.id !== item.id && 
        !i.is_restricted
      ).slice(0, 3)
    : [];

  if (isLoading) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground mt-4">Loading content...</p>
          </div>
        </section>
      </Layout>
    );
  }

  if (!item) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Mic className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-heading text-2xl font-bold text-foreground mb-4">
              Content Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The Guruvani content you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/guruvani">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Guruvani
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  const Icon = typeIcons[item.category || ""] || FileText;

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Guruvani", href: "/guruvani" },
          { label: item.title }
        ]}
      />

      {/* Hero with Quote */}
      <section className="py-8 bg-burgundy/5 border-b border-burgundy/10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Quote className="h-8 w-8 text-burgundy/30 mx-auto mb-3" />
            <blockquote className="font-heading text-lg italic text-foreground">
              "The lamp of knowledge dispels the darkness of ignorance."
            </blockquote>
          </div>
        </div>
      </section>

      {/* Content Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8 animate-fade-up">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-burgundy/10 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-burgundy" />
                </div>
                <Badge variant="secondary">{item.category || "Teaching"}</Badge>
                <Badge variant="outline">{item.source || "Gujarati"}</Badge>
                {item.is_restricted && (
                  <Badge variant="destructive" className="gap-1">
                    <Lock className="h-3 w-3" />
                    Restricted
                  </Badge>
                )}
              </div>
              
              <h1 className="font-heading text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {item.date && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(item.date).getFullYear()}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{item.source || "Gujarati"}</span>
                </div>
              </div>
            </div>

            {/* Image if available */}
            {item.image_url && (
              <div className="mb-8 rounded-2xl overflow-hidden animate-fade-up delay-100">
                <img 
                  src={item.image_url} 
                  alt={item.title}
                  className="w-full h-auto max-h-[400px] object-cover"
                />
              </div>
            )}

            {/* Content */}
            <div className="animate-fade-up delay-200">
              {item.is_restricted ? (
                <div className="p-8 rounded-2xl bg-secondary/50 border border-border text-center">
                  <Lock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">
                    Restricted Content
                  </h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    This content requires authentication to access. Scholars may request access through the Scholar Portal.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="hero" asChild>
                      <Link to="/auth">
                        Sign In to Access
                      </Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/scholars">
                        Scholar Portal
                      </Link>
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="prose prose-lg max-w-none">
                  <div className="p-8 rounded-2xl bg-secondary/30 border border-border">
                    {(item.content || "").split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-foreground leading-relaxed mb-4 last:mb-0 font-body text-base">
                        {paragraph}
                      </p>
                    ))}
                    {!item.content && (
                      <p className="text-muted-foreground italic">No content available for this item.</p>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Audio/Video if available */}
            {(item.audio_url || item.video_url) && !item.is_restricted && (
              <div className="mt-8 animate-fade-up delay-300">
                {item.video_url && (
                  <div className="rounded-2xl overflow-hidden">
                    <video 
                      controls 
                      className="w-full"
                      poster={item.image_url || undefined}
                    >
                      <source src={item.video_url} />
                    </video>
                  </div>
                )}
                {item.audio_url && !item.video_url && (
                  <audio controls className="w-full">
                    <source src={item.audio_url} />
                  </audio>
                )}
              </div>
            )}

            {/* Share Buttons */}
            {!item.is_restricted && (
              <div className="mt-8 pt-6 border-t border-border animate-fade-up delay-300">
                <SocialShareButtons 
                  title={item.title}
                  description={item.content?.substring(0, 200) || ''}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Related Content */}
      {relatedItems.length > 0 && (
        <section className="py-16 bg-gradient-spiritual relative overflow-hidden">
          <div className="absolute inset-0 lotus-pattern opacity-30" />
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-10">
              <span className="text-xs font-medium tracking-widest text-burgundy uppercase">
                Continue Reading
              </span>
              <h2 className="font-heading text-2xl lg:text-3xl font-bold text-foreground mt-2">
                Related Teachings
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedItems.map((relatedItem, index) => {
                const RelatedIcon = typeIcons[relatedItem.category || ""] || FileText;
                return (
                  <Link
                    key={relatedItem.id}
                    to={`/guruvani/${relatedItem.id}`}
                    className="group"
                  >
                    <Card 
                      variant="interactive" 
                      className="overflow-hidden h-full animate-fade-up bg-background/80 backdrop-blur-sm"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-lg bg-burgundy/10 flex items-center justify-center">
                            <RelatedIcon className="h-5 w-5 text-burgundy" />
                          </div>
                          <Badge variant="secondary" className="text-xs">
                            {relatedItem.source || "Gujarati"}
                          </Badge>
                        </div>
                        <h3 className="font-heading font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {relatedItem.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {relatedItem.category || "Teaching"} • {relatedItem.date ? new Date(relatedItem.date).getFullYear() : ""}
                        </p>
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
            Explore more sacred teachings from Gurudev
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="spiritual" asChild>
              <Link to="/guruvani">
                <Mic className="h-4 w-4 mr-2" />
                Browse All Guruvani
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/books">
                View Sacred Texts
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default GuruvaniDetails;
