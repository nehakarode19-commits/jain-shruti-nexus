import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Download, FileText, Quote, User } from "lucide-react";

const tributes = [
  {
    id: 1,
    author: "Dr. Padmanabh S. Jaini",
    title: "Professor Emeritus, UC Berkeley",
    content: "Jambuvijayji was not merely a scholar; he was a living repository of Jain learning. His dedication to manuscript preservation has ensured that generations to come will have access to the wisdom of ancient Jain masters.",
  },
  {
    id: 2,
    author: "Shri Amit Shah",
    title: "Home Minister of India",
    content: "Gurudev's contribution to Jain literature and manuscript preservation is unparalleled. His scholarly works will continue to guide seekers of truth for centuries.",
  },
  {
    id: 3,
    author: "Dr. John E. Cort",
    title: "Professor, Denison University",
    content: "Meeting Jambuvijayji was a transformative experience. His encyclopedic knowledge combined with profound humility made him one of the greatest scholars I have ever encountered.",
  },
  {
    id: 4,
    author: "Acharya Tulsi",
    title: "Jain Spiritual Leader",
    content: "His seva to the Jain Agamas is matchless. Future scholars will always be indebted to his critical editions and meticulous textual analysis.",
  },
];

const articles = [
  {
    id: 1,
    title: "A Life Dedicated to Jain Scholarship",
    author: "Prof. Muni Jambuvijay Research Foundation",
    source: "Souvenir Publication, 2009",
    description: "Comprehensive biographical article tracing Gurudev's scholarly journey.",
  },
  {
    id: 2,
    title: "The Manuscript Hunter of India",
    author: "Times of India",
    source: "Newspaper Article, 1995",
    description: "Feature article on Gurudev's manuscript collection expeditions across India.",
  },
  {
    id: 3,
    title: "Preserving the Voice of the Tirthankaras",
    author: "Dr. Anupam Jain",
    source: "Academic Journal, 2010",
    description: "Analysis of Gurudev's contribution to Jain Agam scholarship.",
  },
];

const documents = [
  {
    id: 1,
    title: "Memorial Souvenir 2021",
    description: "Centenary celebration souvenir with tributes and memories",
    pdfUrl: "#",
    size: "15.2 MB",
  },
  {
    id: 2,
    title: "Complete Bibliography",
    description: "Comprehensive list of all works by and about Gurudev",
    pdfUrl: "#",
    size: "2.4 MB",
  },
  {
    id: 3,
    title: "Photo Collection",
    description: "Historical photographs from various life events",
    pdfUrl: "#",
    size: "45.8 MB",
  },
  {
    id: 4,
    title: "Discourse Transcripts Vol. 1",
    description: "Transcribed teachings and discourses in Hindi",
    pdfUrl: "#",
    size: "8.6 MB",
  },
];

export default function Tribute() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Tribute & Articles
            </h1>
            <div className="section-divider" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Remembrances, scholarly articles, and archival documents
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Tributes & Articles - 2 columns */}
            <div className="lg:col-span-2 space-y-12">
              {/* Tributes */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  Tributes from Scholars & Leaders
                </h2>
                <div className="space-y-6">
                  {tributes.map((tribute) => (
                    <Card key={tribute.id} className="hover:shadow-elevated transition-shadow">
                      <CardContent className="p-6">
                        <Quote className="w-8 h-8 text-primary/30 mb-4" />
                        <p className="text-foreground italic leading-relaxed mb-4">
                          "{tribute.content}"
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                            <User className="w-5 h-5 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{tribute.author}</p>
                            <p className="text-sm text-muted-foreground">{tribute.title}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Articles */}
              <div>
                <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
                  Featured Articles
                </h2>
                <div className="space-y-4">
                  {articles.map((article) => (
                    <Card key={article.id} className="hover:shadow-elevated transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex gap-4">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="w-6 h-6 text-primary" />
                          </div>
                          <div className="space-y-1">
                            <h3 className="font-display text-lg font-medium text-foreground">
                              {article.title}
                            </h3>
                            <p className="text-sm text-primary">{article.author}</p>
                            <p className="text-sm text-muted-foreground">{article.source}</p>
                            <p className="text-muted-foreground mt-2">{article.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Documents Sidebar */}
            <div>
              <div className="sticky top-24">
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  Documents & Downloads
                </h2>
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <Card key={doc.id} className="hover:shadow-elevated transition-shadow">
                      <CardContent className="p-4">
                        <h3 className="font-medium text-foreground mb-1">{doc.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{doc.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">{doc.size}</span>
                          <Button variant="outline" size="sm" asChild>
                            <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-4 h-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}