import { Layout } from "@/components/layout/Layout";
import { useEventsFromDB } from "@/hooks/useContent";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  MapPin,
  ArrowRight,
  ExternalLink,
  Loader2
} from "lucide-react";
import { format } from "date-fns";

const CommunityEvents = () => {
  const { data: events = [], isLoading } = useEventsFromDB();

  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6 animate-fade-up">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-primary">{events.length} Events</span>
            </div>
            <h1 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Events & Workshops
            </h1>
            <p className="font-body text-lg text-muted-foreground animate-fade-up delay-200">
              Join our lectures, workshops, festivals, and community gatherings 
              dedicated to learning and spiritual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="max-w-4xl mx-auto space-y-6">
              {events.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="h-16 w-16 text-muted-foreground/30 mx-auto mb-4" />
                  <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                    No events scheduled
                  </h3>
                  <p className="font-body text-muted-foreground">
                    Check back soon for upcoming events!
                  </p>
                </div>
              ) : (
                events.map((event, index) => (
                  <Card 
                    key={event.id}
                    variant="feature"
                    className="animate-fade-up overflow-hidden"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="flex flex-col md:flex-row">
                      {event.image_url && (
                        <div className="md:w-1/3">
                          <img
                            src={event.image_url}
                            alt={event.title}
                            className="w-full h-48 md:h-full object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <CardHeader>
                          <div className="flex flex-wrap items-start justify-between gap-4">
                            <div>
                              <Badge variant="default" className="mb-2">Event</Badge>
                              <CardTitle className="text-xl">{event.title}</CardTitle>
                            </div>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <p className="font-body text-base text-muted-foreground mb-4">{event.description}</p>
                          <div className="grid sm:grid-cols-2 gap-4 mb-6">
                            <div className="space-y-2 font-body text-base">
                              {event.event_date && (
                                <div className="flex items-center gap-2 text-foreground">
                                  <Calendar className="h-4 w-4 text-primary" />
                                  <span>{format(new Date(event.event_date), "MMMM d, yyyy")}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-2 font-body text-base">
                              {event.location && (
                                <div className="flex items-center gap-2 text-muted-foreground">
                                  <MapPin className="h-4 w-4" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-3">
                            <Button variant="hero" size="sm" asChild>
                              <Link to={`/community/events/${event.id}`}>
                                Learn More
                                <ArrowRight className="h-4 w-4 ml-2" />
                              </Link>
                            </Button>
                          </div>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          )}
        </div>
      </section>

      {/* External Link */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            View More Events
          </h2>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Visit the official Siddhi Jambu Parivar website for complete event listings and details.
          </p>
          <Button variant="outline" asChild>
            <a 
              href="https://siddhijambuparivar.com/events-list/" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              View All Events
              <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className="py-16 bg-gradient-spiritual">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for updates on upcoming events, 
            research publications, and community news.
          </p>
          <Button variant="hero">
            Subscribe to Newsletter
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityEvents;
