import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, MapPin, BookOpen, Newspaper } from "lucide-react";
import { events, blogPosts } from "@/data/gurudevData";

export function CommunitySection() {
  // Get first 3 events with images
  const upcomingEvents = [
    {
      title: events[0]?.titleEn || events[0]?.title || "13th Annual Memorial Day of Shri Jambuvijayji M.Sa.",
      date: events[0]?.date || "November 20, 2024",
      time: "Various Sessions",
      location: "Muni Jambuvijay Research Center",
      type: "Memorial",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&q=80"
    },
    {
      title: events[1]?.titleEn || events[1]?.title || "Grand Upadhan Tap",
      date: events[1]?.date || "December 18, 2024 - February 5, 2025",
      time: "Various Sessions",
      location: "Muni Jambuvijay Research Center",
      type: "Religious",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop&q=80"
    },
    {
      title: "Saturday Pravachan",
      date: "Every Saturday",
      time: "10:00 AM - 12:00 PM",
      location: "Online & In-Person",
      type: "Regular",
      image: "https://images.unsplash.com/photo-1606567595334-d39972c85dfd?w=400&h=250&fit=crop&q=80"
    },
  ];

  // Get first 2 blog posts with images
  const latestPosts = [
    {
      title: blogPosts[0]?.title || "The Significance of Jain Agamas in Modern Times",
      excerpt: blogPosts[0]?.excerpt || "Exploring how the ancient Jain scriptures remain relevant and guide us in contemporary life.",
      date: blogPosts[0]?.date || "December 1, 2024",
      category: blogPosts[0]?.category || "Philosophy",
      image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&q=80"
    },
    {
      title: blogPosts[1]?.title || "Gurudev's Contribution to Manuscript Preservation",
      excerpt: blogPosts[1]?.excerpt || "A detailed look at how Muni Jambuvijayji Maharaj Saheb revolutionized the preservation of Jain texts.",
      date: blogPosts[1]?.date || "November 25, 2024",
      category: blogPosts[1]?.category || "History",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop&q=80"
    },
  ];

  return (
    <section className="py-14 lg:py-20 bg-gradient-warm">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Events */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shadow-sm">
                <Calendar className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Upcoming Events
                </h2>
                <p className="font-body text-base text-muted-foreground">
                  Lectures, workshops, and gatherings
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {upcomingEvents.map((event, index) => (
                <Card 
                  key={event.title}
                  variant="interactive"
                  className="overflow-hidden animate-fade-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-0">
                      {/* Event Image */}
                      <div className="w-32 h-32 sm:w-40 sm:h-36 flex-shrink-0 overflow-hidden">
                        <img 
                          src={event.image} 
                          alt={event.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Event Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-body text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-semibold uppercase tracking-wide">
                            {event.type}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {event.title}
                        </h3>
                        <div className="space-y-1 font-body text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-3.5 w-3.5 text-primary/60" />
                            <span>{event.date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-3.5 w-3.5 text-primary/60" />
                            <span>{event.time}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="h-3.5 w-3.5 text-primary/60" />
                            <span className="line-clamp-1">{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="spiritual" asChild className="group">
                <Link to="/community/events">
                  View All Events
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Blog / News */}
          <div>
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center shadow-sm">
                <BookOpen className="h-6 w-6 text-sage" />
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-foreground">
                  Latest Insights
                </h2>
                <p className="font-body text-base text-muted-foreground">
                  Articles, research updates, and news
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {latestPosts.map((post, index) => (
                <Card 
                  key={post.title}
                  variant="interactive"
                  className="overflow-hidden animate-fade-up group"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardContent className="p-0">
                    <div className="flex gap-0">
                      {/* Post Image */}
                      <div className="w-32 h-32 sm:w-40 sm:h-36 flex-shrink-0 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      
                      {/* Post Content */}
                      <div className="flex-1 p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-body text-xs px-2.5 py-1 rounded-full bg-sage/10 text-sage font-semibold uppercase tracking-wide">
                            {post.category}
                          </span>
                          <span className="font-body text-xs text-muted-foreground">{post.date}</span>
                        </div>
                        <h3 className="font-heading font-semibold text-foreground mb-2 line-clamp-2 group-hover:text-sage transition-colors">
                          {post.title}
                        </h3>
                        <p className="font-body text-sm text-muted-foreground line-clamp-2">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button variant="spiritual" asChild className="group">
                <Link to="/community/blog">
                  Read Blog
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
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
