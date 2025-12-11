import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MapPin, Loader2, Clock, Sparkles } from "lucide-react";
import { useEventsFromDB, useBlogsFromDB } from "@/hooks/useContent";
import { format } from "date-fns";

import eventImage1 from "@/assets/books/guruvani-1.jpg";
import eventImage2 from "@/assets/books/guruvani-2.jpg";
import blogImage1 from "@/assets/books/agam-02-sutrakrutang.png";
import blogImage2 from "@/assets/books/agam-06-gnatadharma.png";

const fallbackEventImages = [eventImage1, eventImage2];
const fallbackBlogImages = [blogImage1, blogImage2];

export function CommunitySection() {
  const { data: events = [], isLoading: eventsLoading } = useEventsFromDB();
  const { data: blogs = [], isLoading: blogsLoading } = useBlogsFromDB();
  
  const displayEvents = events.slice(0, 3);
  const displayBlogs = blogs.slice(0, 2);

  return (
    <section className="py-20 lg:py-28 bg-card relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-background to-transparent rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Events Column */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-3">
                  <Sparkles className="h-3 w-3 text-orange" />
                  <span className="text-xs text-muted-foreground font-medium">Events</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                  Upcoming Events
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-primary hover:text-primary/80"
              >
                <Link to="/community/events">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {eventsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {displayEvents.map((event, index) => (
                  <Link
                    key={event.id}
                    to="/community/events"
                    className="group flex gap-4 bg-background rounded-xl p-4 border border-transparent hover:border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden">
                      <img
                        src={event.image_url || fallbackEventImages[index % fallbackEventImages.length]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full bg-orange/10 text-orange text-xs font-medium mb-2">
                        Event
                      </span>
                      <h4 className="font-semibold text-primary mb-1 group-hover:text-primary/80 transition-colors line-clamp-1">
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        {event.event_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-orange" />
                            {format(new Date(event.event_date), "MMM d, yyyy")}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-orange" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                
                {displayEvents.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground bg-background rounded-xl">
                    No upcoming events scheduled.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Insights Column */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-background border border-border mb-3">
                  <Sparkles className="h-3 w-3 text-orange" />
                  <span className="text-xs text-muted-foreground font-medium">Insights</span>
                </div>
                <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary">
                  Latest Insights
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-primary hover:text-primary/80"
              >
                <Link to="/community/blog">
                  Read All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {blogsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
              </div>
            ) : (
              <div className="space-y-4">
                {displayBlogs.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/community/blog/${post.id}`}
                    className="group block bg-background rounded-xl overflow-hidden border border-transparent hover:border-border hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex gap-4 p-4">
                      <div className="flex-shrink-0 w-24 h-20 rounded-lg overflow-hidden">
                        <img
                          src={post.cover_image || fallbackBlogImages[index % fallbackBlogImages.length]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            Blog
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {format(new Date(post.created_at), "MMM d")}
                          </span>
                        </div>
                        <h4 className="font-semibold text-primary mb-1 group-hover:text-primary/80 transition-colors line-clamp-2">
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {displayBlogs.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground bg-background rounded-xl">
                    No blog posts available yet.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
