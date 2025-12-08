import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  ArrowLeft, 
  BookOpen, 
  Mic, 
  FileText, 
  Lock,
  Calendar,
  Globe,
  Tag,
  Hash,
  Quote,
  ArrowRight,
  Share2
} from "lucide-react";

const guruvaniItems = [
  {
    id: 1,
    title: "On the Nature of Soul (Jiva)",
    type: "Discourse",
    language: "Gujarati",
    date: "1985",
    excerpt: "The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true nature of the self...",
    fullContent: `The soul is eternal, ever-conscious, and inherently pure. Through right knowledge and conduct, one realizes the true nature of the self.

In the Jain tradition, the Jiva (soul) is understood as a living, conscious entity that is distinct from the body it inhabits. Every living being, from the smallest microorganism to the most evolved human, possesses a soul with infinite potential.

The soul in its pure state possesses four infinite qualities:
1. Ananta Jnana (Infinite Knowledge)
2. Ananta Darshana (Infinite Perception)
3. Ananta Sukha (Infinite Bliss)
4. Ananta Virya (Infinite Energy)

However, due to the accumulation of karmic particles, these qualities become obscured. The path to liberation involves purifying the soul through right faith, right knowledge, and right conduct.

As seekers, we must understand that the soul is neither created nor destroyed. It is beginningless and endless. Our current state of bondage is not our true nature but a temporary condition that can be overcome through spiritual practice and self-realization.`,
    tags: ["Philosophy", "Jiva", "Moksha"],
    restricted: false,
  },
  {
    id: 2,
    title: "Commentary on Tattvartha Sutra",
    type: "Written Work",
    language: "Sanskrit",
    date: "1978",
    excerpt: "A comprehensive examination of reality as presented in the foundational Jain scripture by Umaswati...",
    fullContent: `A comprehensive examination of reality as presented in the foundational Jain scripture by Umaswati.

The Tattvartha Sutra, composed by Acharya Umaswati around the 2nd century CE, stands as the most authoritative and systematic exposition of Jain philosophy. This commentary aims to make its profound teachings accessible to modern seekers.

The text begins with the famous aphorism: "Samyag-darśana-jñāna-cāritrāṇi mokṣamārgaḥ" - Right faith, right knowledge, and right conduct together constitute the path to liberation.

The seven realities (tattvas) form the foundation of Jain metaphysics:
1. Jiva (Soul)
2. Ajiva (Non-soul)
3. Asrava (Influx of karma)
4. Bandha (Bondage)
5. Samvara (Stoppage)
6. Nirjara (Shedding)
7. Moksha (Liberation)

Understanding these seven categories provides a complete framework for comprehending the nature of existence and the path to spiritual freedom. Each category is interrelated, forming a coherent system that explains both the bondage of the soul and its potential for liberation.`,
    tags: ["Agama", "Tattvartha", "Commentary"],
    restricted: false,
  },
  {
    id: 3,
    title: "Guidance for Young Monks",
    type: "Letter",
    language: "Hindi",
    date: "1990",
    excerpt: "The path of a monk requires unwavering dedication to ahimsa, truthfulness, and self-discipline...",
    fullContent: `The path of a monk requires unwavering dedication to ahimsa, truthfulness, and self-discipline.

[This content is restricted and requires authentication to access. Scholars may request access through the Scholar Portal.]`,
    tags: ["Monkhood", "Guidance", "Discipline"],
    restricted: true,
  },
  {
    id: 4,
    title: "Pravachan on Anekantavada",
    type: "Discourse",
    language: "Gujarati",
    date: "1995",
    excerpt: "The doctrine of many-sidedness teaches us that truth can be perceived from multiple perspectives...",
    fullContent: `The doctrine of many-sidedness teaches us that truth can be perceived from multiple perspectives.

Anekantavada, often translated as "non-absolutism" or "many-sidedness," is one of the most significant contributions of Jain philosophy to human thought. It teaches us that reality is complex and multifaceted, and no single perspective can capture the complete truth.

This doctrine has three aspects:
1. Anekanta - The nature of reality as having multiple aspects
2. Syadvada - The doctrine of conditional predication
3. Nayavada - The doctrine of standpoints

Consider a simple example: When we look at an elephant, a blind person touching its trunk might describe it as a pipe, another touching its leg might describe it as a pillar, and yet another touching its ear might describe it as a fan. Each perspective is partially true, but none captures the complete reality.

In our daily lives, Anekantavada teaches us:
- To be humble in our assertions
- To respect differing viewpoints
- To seek comprehensive understanding
- To avoid dogmatism and extremism

This philosophical framework promotes tolerance, intellectual humility, and a spirit of open inquiry that remains profoundly relevant in our diverse world.`,
    tags: ["Philosophy", "Anekanta", "Logic"],
    restricted: false,
  },
  {
    id: 5,
    title: "Notes on Manuscript Preservation",
    type: "Notes",
    language: "English",
    date: "2000",
    excerpt: "The preservation of ancient Jain manuscripts requires careful attention to material, environment, and documentation...",
    fullContent: `The preservation of ancient Jain manuscripts requires careful attention to material, environment, and documentation.

[This content is restricted and requires authentication to access. Scholars may request access through the Scholar Portal.]`,
    tags: ["Manuscripts", "Preservation", "Research"],
    restricted: true,
  },
  {
    id: 6,
    title: "On Samyak Darshan",
    type: "Discourse",
    language: "Gujarati",
    date: "1988",
    excerpt: "Right faith is the foundation of spiritual progress. Without samyak darshan, neither knowledge nor conduct can lead to liberation...",
    fullContent: `Right faith is the foundation of spiritual progress. Without samyak darshan, neither knowledge nor conduct can lead to liberation.

Samyak Darshan, or right faith, is the first and most essential component of the path to liberation. It is the unwavering belief in the true nature of reality as expounded by the Tirthankaras.

The characteristics of right faith include:
1. Nishkankita - Freedom from doubt
2. Nihshankita - Freedom from worldly desires
3. Nirvichikitsa - Freedom from disgust
4. Amudha-dristi - Freedom from confusion
5. Upabrimhana - Strengthening others' faith
6. Sthitikarana - Steadiness in faith
7. Vatsalya - Affection for fellow seekers
8. Prabhavana - Glorification of the path

Without right faith, our knowledge remains mere information, and our conduct becomes empty ritual. Right faith transforms our entire approach to spiritual practice, infusing it with conviction and purpose.

The development of right faith often begins with spiritual inquiry, exposure to true teachings, and association with enlightened beings. It deepens through reflection, meditation, and the gradual dissolution of karmas that obscure our innate wisdom.`,
    tags: ["Philosophy", "Samyak", "Faith"],
    restricted: false,
  },
];

const typeIcons: Record<string, typeof Mic> = {
  Discourse: Mic,
  "Written Work": BookOpen,
  Letter: FileText,
  Notes: FileText,
};

const GuruvaniDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const item = guruvaniItems.find((i) => i.id === Number(id));
  
  // Get related items (same type or tag, excluding current)
  const relatedItems = item 
    ? guruvaniItems.filter((i) => 
        (i.type === item.type || i.tags.some(tag => item.tags.includes(tag))) && 
        i.id !== item.id && 
        !i.restricted
      ).slice(0, 3)
    : [];

  if (!item) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <Mic className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
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

  const Icon = typeIcons[item.type] || FileText;

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
            <blockquote className="font-display text-lg italic text-foreground">
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
                <Badge variant="secondary">{item.type}</Badge>
                <Badge variant="outline">{item.language}</Badge>
                {item.restricted && (
                  <Badge variant="destructive" className="gap-1">
                    <Lock className="h-3 w-3" />
                    Restricted
                  </Badge>
                )}
              </div>
              
              <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {item.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>{item.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{item.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4" />
                  <span>ID: {item.id}</span>
                </div>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8 animate-fade-up delay-100">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="text-sm">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
            </div>

            {/* Content */}
            <div className="animate-fade-up delay-200">
              {item.restricted ? (
                <div className="p-8 rounded-2xl bg-secondary/50 border border-border text-center">
                  <Lock className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-display text-xl font-bold text-foreground mb-2">
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
                    {item.fullContent.split('\n\n').map((paragraph, index) => (
                      <p key={index} className="text-foreground leading-relaxed mb-4 last:mb-0">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Share Button */}
            {!item.restricted && (
              <div className="mt-8 flex justify-end animate-fade-up delay-300">
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
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
              <h2 className="font-display text-2xl lg:text-3xl font-bold text-foreground mt-2">
                Related Teachings
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {relatedItems.map((relatedItem, index) => {
                const RelatedIcon = typeIcons[relatedItem.type] || FileText;
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
                            {relatedItem.language}
                          </Badge>
                        </div>
                        <h3 className="font-display font-medium text-foreground group-hover:text-primary transition-colors line-clamp-2 mb-2">
                          {relatedItem.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {relatedItem.type} • {relatedItem.date}
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
