import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, MapPin, BookOpen, Newspaper } from "lucide-react";
import { events, blogPosts } from "@/data/gurudevData";

export function CommunitySection() {
  // Get first 3 events
  const upcomingEvents = [
    ...events.slice(0, 2).map(e => ({
      title: e.titleEn || e.title,
      date: e.date,
      time: "Various Sessions",
      location: "Muni Jambuvijay Research Center",
      type: e.type,
    })),
    {
      title: "Saturday Pravachan",
      date: "Every Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Online & In-Person",
      type: "Regular",
    },
  ];

  // Get first 2 blog posts
  const latestPosts = blogPosts.slice(0, 2).map(post => ({
    title: post.title,
    excerpt: post.excerpt,
    date: post.date,
    category: post.category,
  }));

  return (
    <section className="py-16 lg:py-24 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Events */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Upcoming Events
                </h2>
                <p className="text-sm text-muted-foreground">
                  Lectures, workshops, and gatherings
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <Card 
                  key={event.title}
                  variant="default"
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-display font-semibold text-foreground mb-2">
                          {event.title}
                        </h3>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6">
              <Button variant="outline" asChild>
                <Link to="/community/events">
                  View All Events
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Blog / News */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-sage" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground">
                  Latest Insights
                </h2>
                <p className="text-sm text-muted-foreground">
                  Articles, research updates, and news
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {latestPosts.map((post, index) => (
                <Card 
                  key={post.title}
                  variant="interactive"
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-sage/10 text-sage font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-muted-foreground">{post.date}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex gap-3">
              <Button variant="outline" asChild>
                <Link to="/community/blog">
                  Read Blog
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/community/news">
                  <Newspaper className="h-4 w-4 mr-2" />
                  News
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
