import { useParams, Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { PageBreadcrumb } from "@/components/ui/page-breadcrumb";
import { SimilarItems } from "@/components/ui/similar-items";
import { books } from "@/data/gurudevData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Download, 
  ExternalLink, 
  BookOpen, 
  User, 
  Building2, 
  Globe, 
  Tag,
  Hash,
  Search
} from "lucide-react";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const book = books.find((b) => b.id === Number(id));
  
  // Get similar books (same category, excluding current)
  const similarBooks = book 
    ? books.filter((b) => b.category === book.category && b.id !== book.id).slice(0, 4)
    : [];

  if (!book) {
    return (
      <Layout>
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <BookOpen className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
            <h1 className="font-display text-2xl font-bold text-foreground mb-4">
              Book Not Found
            </h1>
            <p className="text-muted-foreground mb-6">
              The book you're looking for doesn't exist or has been removed.
            </p>
            <Button variant="hero" asChild>
              <Link to="/books">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Books
              </Link>
            </Button>
          </div>
        </section>
      </Layout>
    );
  }

  // Publisher default
  const publisher = "Shri Mahavira Jaina Vidyalaya";
  const author = "Muni Jambuvijayji";

  return (
    <Layout>
      {/* Breadcrumb */}
      <PageBreadcrumb 
        items={[
          { label: "Books", href: "/books" },
          { label: book.title }
        ]}
      />

      {/* Book Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Book Cover */}
            <div className="relative group">
              <div className="aspect-square max-w-md mx-auto lg:mx-0 bg-secondary/30 rounded-2xl overflow-hidden shadow-elegant">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Zoom icon overlay */}
              <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                <Search className="h-5 w-5 text-foreground" />
              </div>
            </div>

            {/* Book Info */}
            <div className="space-y-6 animate-fade-up">
              <div>
                <h1 className="font-display text-3xl lg:text-4xl font-bold text-foreground mb-4">
                  {book.title}
                </h1>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <User className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium text-foreground">Author:</span> {author}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Building2 className="h-4 w-4 text-primary" />
                    <span className="text-sm">
                      <span className="font-medium text-foreground">Publisher:</span> {publisher}
                    </span>
                  </div>
                </div>
              </div>

              {/* Download Button */}
              <Button variant="hero" size="lg" asChild className="w-full sm:w-auto">
                <a href={book.link} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </a>
              </Button>

              {/* Meta Info */}
              <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                {book.category && (
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Category:</span>
                    <Badge variant="secondary">{book.category}</Badge>
                  </div>
                )}
                
                {book.language && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Language:</span>
                    <Badge variant="outline">{book.language}</Badge>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Product ID:</span>
                  <span className="text-sm font-medium text-foreground">{book.id}</span>
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
            Description
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-3xl">
            {book.title} - A scholarly work edited and published under the guidance of 
            Gurudev Muni Jambuvijayji Maharaj Saheb. This text is part of the invaluable 
            collection of Jain scriptures preserved and made accessible through the 
            tireless efforts of Shri Mahavira Jaina Vidyalaya.
          </p>
        </div>
      </section>

      {/* Similar Products */}
      <SimilarItems
        title="Similar Books"
        subtitle="Explore More"
        items={similarBooks.map(b => ({
          id: b.id,
          title: b.title,
          image: b.image,
          category: b.category
        }))}
        basePath="/books"
      />

      {/* CTA Section */}
      <section className="py-12 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground mb-4">
            Explore more sacred texts from Gurudev's collection
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="hero" asChild>
              <Link to="/books">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse All Books
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <a
                href="https://siddhijambuparivar.com/shop/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Full Collection
                <ExternalLink className="h-4 w-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default BookDetails;
