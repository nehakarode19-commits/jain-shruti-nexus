import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, Clock, MapPin, BookOpen } from "lucide-react";

const upcomingEvents = [
  {
    title: "13th Annual Memorial Day",
    date: "November 20, 2024",
    time: "Various Sessions",
    location: "Muni Jambuvijay Research Center",
    type: "Memorial",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop"
  },
  {
    title: "Grand Upadhan Tap",
    date: "Dec 18, 2024 - Feb 5, 2025",
    time: "Various Sessions",
    location: "Research Center",
    type: "Religious",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=250&fit=crop"
  },
];

const latestPosts = [
  {
    title: "The Significance of Jain Agamas",
    excerpt: "Exploring how ancient scriptures remain relevant in contemporary life.",
    date: "December 1, 2024",
    category: "Philosophy",
    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop"
  },
  {
    title: "Gurudev's Contribution to Preservation",
    excerpt: "How Muni Jambuvijayji revolutionized preservation of Jain texts.",
    date: "November 25, 2024",
    category: "History",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=250&fit=crop"
  },
];

export function CommunitySection() {
  return (
    <section className="py-12 lg:py-16 bg-secondary/30">
      <div className="container mx-auto px-4 space-y-12">
        {/* Events */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">Upcoming Events</h2>
                <p className="text-sm text-muted-foreground">Lectures, workshops & gatherings</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/community/events">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {upcomingEvents.map((event) => (
              <div 
                key={event.title}
                className="p-4 rounded-xl bg-card border border-border/50 hover:border-primary/30 hover:shadow-soft transition-all"
              >
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-32 rounded-lg object-cover mb-3"
                />
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {event.type}
                </span>
                <h3 className="font-semibold text-foreground mt-2 line-clamp-1">{event.title}</h3>
                <div className="mt-2 space-y-1 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span className="line-clamp-1">{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Blog */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sage/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-sage" />
              </div>
              <div>
                <h2 className="font-heading text-xl font-bold text-foreground">Latest Insights</h2>
                <p className="text-sm text-muted-foreground">Articles & research updates</p>
              </div>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/community/blog">
                Read Blog
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {latestPosts.map((post) => (
              <div 
                key={post.title}
                className="p-4 rounded-xl bg-card border border-border/50 hover:border-sage/30 hover:shadow-soft transition-all"
              >
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-32 rounded-lg object-cover mb-3"
                />
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-1 rounded-full bg-sage/10 text-sage font-medium">
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.date}</span>
                </div>
                <h3 className="font-semibold text-foreground mt-2 line-clamp-1">{post.title}</h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
