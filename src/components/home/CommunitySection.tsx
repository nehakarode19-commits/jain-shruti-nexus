import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MapPin, BookOpen } from "lucide-react";

import eventImage1 from "@/assets/books/guruvani-1.jpg";
import eventImage2 from "@/assets/books/guruvani-2.jpg";
import blogImage1 from "@/assets/books/agam-02-sutrakrutang.png";
import blogImage2 from "@/assets/books/agam-06-gnatadharma.png";

const upcomingEvents = [
  {
    title: "13th Annual Memorial Day",
    date: "November 20, 2024",
    location: "Muni Jambuvijay Research Center",
    type: "Memorial",
    image: eventImage1,
    description: "Join us to honor Gurudev's legacy and teachings"
  },
  {
    title: "Grand Upadhan Tap",
    date: "Dec 18, 2024 - Feb 5, 2025",
    location: "Research Center",
    type: "Religious",
    image: eventImage2,
    description: "A sacred period of spiritual practice and devotion"
  },
];

const latestPosts = [
  {
    title: "The Significance of Jain Agamas",
    excerpt: "Discover why these ancient scriptures hold timeless wisdom for modern life and spiritual growth.",
    date: "December 1, 2024",
    category: "Philosophy",
    image: blogImage1
  },
  {
    title: "Gurudev's Contribution to Preservation",
    excerpt: "Learn how Muni Jambuvijayji dedicated his life to preserving rare Jain manuscripts.",
    date: "November 25, 2024",
    category: "History",
    image: blogImage2
  },
];

export function CommunitySection() {
  return (
    <section className="py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 space-y-16">
        {/* Events Section */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Calendar className="h-4 w-4" />
              Upcoming Events
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Join Our Community Gatherings
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Participate in lectures, workshops, and spiritual events that bring our community together
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingEvents.map((event) => (
              <div 
                key={event.title}
                className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                    {event.type}
                  </span>
                  <h3 className="font-semibold text-foreground mt-2 group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{event.description}</p>
                  <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {event.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {event.location}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/community/events">
                View All Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Blog Section */}
        <div>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 text-sage text-sm font-medium mb-4">
              <BookOpen className="h-4 w-4" />
              Latest Insights
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">
              Explore Our Articles & Research
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dive into articles about Jain philosophy, history, and Gurudev's teachings
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {latestPosts.map((post) => (
              <div 
                key={post.title}
                className="flex gap-4 p-5 rounded-2xl bg-card border border-border hover:border-sage/30 hover:shadow-lg transition-all group"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-24 h-24 rounded-xl object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-sage/10 text-sage font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-foreground mt-2 group-hover:text-sage transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button variant="outline" asChild>
              <Link to="/community/blog">
                Read More Articles
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
