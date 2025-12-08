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
  Video
} from "lucide-react";

const events = [
  {
    id: 1,
    title: "Saturday Pravachan",
    type: "Regular",
    date: "Every Saturday",
    time: "10:00 AM - 12:00 PM",
    location: "Online & Shantigram",
    speaker: "Various Scholars",
    description: "Weekly discourse on Jain philosophy and spiritual teachings. Open to all seekers.",
    isOnline: true,
  },
  {
    id: 2,
    title: "Paryushan Mahaparva 2024",
    type: "Festival",
    date: "September 12-19, 2024",
    time: "Various Sessions",
    location: "Muni Jambuvijay Research Center, Shantigram",
    speaker: "Multiple Speakers",
    description: "Annual festival of forgiveness and spiritual introspection with special lectures, prayers, and community gatherings.",
    isOnline: false,
  },
  {
    id: 3,
    title: "Research Methodology Workshop",
    type: "Workshop",
    date: "October 5, 2024",
    time: "2:00 PM - 5:00 PM",
    location: "Online",
    speaker: "Dr. Prabhakaran Jain",
    description: "Learn best practices for Jain textual research, manuscript analysis, and digital preservation techniques.",
    isOnline: true,
  },
  {
    id: 4,
    title: "Introduction to Prakrit Language",
    type: "Course",
    date: "Starting November 1, 2024",
    time: "6:00 PM - 7:30 PM (Weekends)",
    location: "Online",
    speaker: "Prof. Jayanti Lal Jain",
    description: "8-week introductory course on Prakrit language for reading Jain canonical texts.",
    isOnline: true,
  },
  {
    id: 5,
    title: "Manuscript Exhibition",
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
              <span className="text-primary">Community</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-foreground mb-6 animate-fade-up delay-100">
              Events & Workshops
            </h1>
            <p className="text-lg text-muted-foreground animate-fade-up delay-200">
              Join our lectures, workshops, festivals, and community gatherings 
              dedicated to learning and spiritual growth.
            </p>
          </div>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 lg:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            {events.map((event, index) => (
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
