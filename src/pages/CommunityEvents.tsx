import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users,
  ArrowRight,
  Video,
  ExternalLink
} from "lucide-react";
import { events } from "@/data/gurudevData";

// Combined events - imported + additional scheduled events
const allEvents = [
  // Imported events from siddhijambuparivar.com
  ...events.map(e => ({
    id: e.id,
    title: e.titleEn || e.title,
    titleOriginal: e.title,
    type: e.type,
    date: e.date,
    time: "Various Sessions",
    location: "Muni Jambuvijay Research Center",
    speaker: "Community Event",
    description: `${e.titleEn || e.title} - Join us for this important community event.`,
    isOnline: false,
    image: e.image,
    link: e.link,
  })),
  // Additional scheduled events
  {
    id: 101,
    title: "Saturday Pravachan",
    titleOriginal: "शनिवारी प्रवचन",
    type: "Regular",
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Online & Shantigram",
    speaker: "Various Scholars",
    description: "Weekly discourse on Jain philosophy and spiritual teachings. Open to all seekers.",
    isOnline: true,
  },
  {
    id: 102,
    title: "Paryushan Mahaparva 2024",
    titleOriginal: "पर्युषण महापर्व २०२४",
    type: "Festival",
    date: "September 12-19, 2024",
    time: "Various Sessions",
    location: "Muni Jambuvijay Research Center, Shantigram",
    speaker: "Multiple Speakers",
    description: "Annual festival of forgiveness and spiritual introspection with special lectures, prayers, and community gatherings.",
    isOnline: false,
  },
  {
    id: 103,
    title: "Research Methodology Workshop",
    titleOriginal: "शोध कार्यशाला",
    type: "Workshop",
    date: "October 5, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Online",
    speaker: "Dr. Prabhakaran Jain",
    description: "Learn best practices for Jain textual research, manuscript analysis, and digital preservation techniques.",
    isOnline: true,
  },
  {
    id: 104,
    title: "Introduction to Prakrit Language",
    titleOriginal: "प्राकृत भाषा परिचय",
    type: "Course",
    date: "Starting November 1, 2024",
    time: "6:00 PM - 7:30 PM (Weekends)",
    location: "Online",
    speaker: "Prof. Jayanti Lal Jain",
    description: "8-week introductory course on Prakrit language for reading Jain canonical texts.",
    isOnline: true,
  },
  {
    id: 105,
    title: "Manuscript Exhibition",
    titleOriginal: "हस्तलिखित प्रदर्शनी",
    type: "Exhibition",
    date: "December 15-20, 2024",
    time: "10:00 AM - 6:00 PM",
    location: "Gyan Kendra, Shantigram",
    speaker: "Curated Exhibition",
    description: "Rare manuscript display featuring illuminated Jain texts and historical documents from the center's collection.",
    isOnline: false,
  },
];

const CommunityEvents = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 lg:py-20 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm mb-6 animate-fade-up">
              <Calendar className="h-4 w-4 text-primary" />
              <span className="text-primary">{allEvents.length} Events</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Events & <span className="text-gradient-gold">Workshops</span>
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-200">
              Join our lectures, workshops, festivals, and community gatherings 
              dedicated to learning and spiritual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Events from siddhijambuparivar.com */}
      <section className="py-12 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-8">
            Featured Events
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {events.map((event, index) => (
              <Card 
                key={event.id}
                variant="interactive"
                className="overflow-hidden animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {event.image && (
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.titleEn || event.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <CardContent className="p-6">
                  <Badge variant="default" className="mb-3">{event.type}</Badge>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">
                    {event.titleEn}
                  </h3>
                  <p className="text-sm text-primary mb-3">{event.title}</p>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{event.date}</span>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href={event.link} target="_blank" rel="noopener noreferrer">
                      Learn More
                      <ExternalLink className="h-3 w-3 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* All Events List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="font-display text-2xl font-bold text-foreground text-center mb-12">
            Upcoming & Scheduled Events
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            {allEvents.filter(e => e.id >= 100).map((event, index) => (
              <Card 
                key={event.id}
                variant="feature"
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <Badge variant="default">{event.type}</Badge>
                        {event.isOnline && (
                          <Badge variant="secondary" className="gap-1">
                            <Video className="h-3 w-3" />
                            Online
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      {event.titleOriginal && (
                        <p className="text-sm text-primary mt-1">{event.titleOriginal}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{event.description}</p>
                  <div className="grid sm:grid-cols-2 gap-4 mb-6">
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{event.time}</span>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{event.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{event.speaker}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="hero" size="sm">
                      Register Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                    <Button variant="outline" size="sm">
                      Learn More
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
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
