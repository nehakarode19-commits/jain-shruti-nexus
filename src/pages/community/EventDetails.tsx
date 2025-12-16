import { Layout } from "@/components/layout/Layout";
import { useParams, Link } from "react-router-dom";
import { useEventsFromDB } from "@/hooks/useContent";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  MapPin,
  ArrowLeft,
  ExternalLink,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const EventDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { data: events = [], isLoading } = useEventsFromDB();
  
  const event = events.find(e => e.id === id);

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!event) {
    return (
      <Layout>
        <div className="min-h-screen flex flex-col items-center justify-center py-16">
          <Calendar className="h-16 w-16 text-muted-foreground/30 mb-4" />
          <h2 className="font-heading text-2xl font-bold text-foreground mb-2">Event Not Found</h2>
          <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist.</p>
          <Button variant="hero" asChild>
            <Link to="/community/events">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Events
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Breadcrumb */}
      <section className="py-4 bg-secondary/30">
        <div className="container mx-auto px-4">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link to="/community/events" className="hover:text-primary transition-colors">Events</Link>
            <span>/</span>
            <span className="text-foreground">{event.title}</span>
          </nav>
        </div>
      </section>

      {/* Event Details */}
      <section className="py-12 lg:py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Button variant="ghost" asChild className="mb-6">
              <Link to="/community/events">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Events
              </Link>
            </Button>

            <Card variant="feature" className="overflow-hidden">
              {event.image_url && (
                <div className="w-full h-64 md:h-96">
                  <img
                    src={event.image_url}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardContent className="p-6 md:p-8">
                <Badge variant="default" className="mb-4">Event</Badge>
                <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">
                  {event.title}
                </h1>
                
                <div className="flex flex-wrap gap-6 mb-6">
                  {event.event_date && (
                    <div className="flex items-center gap-2 text-foreground">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span className="font-medium">
                        {format(new Date(event.event_date), "MMMM d, yyyy")}
                      </span>
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-5 w-5" />
                      <span>{event.location}</span>
                    </div>
                  )}
                </div>

                <div className="prose prose-lg max-w-none">
                  <p className="font-body text-base text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-border">
                  <Button variant="hero" asChild>
                    <a 
                      href="https://siddhijambuparivar.com/events-list/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      View on Official Website
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default EventDetails;
