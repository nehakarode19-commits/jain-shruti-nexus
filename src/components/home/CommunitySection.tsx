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
    <section className="py-20 lg:py-28 bg-[#2B3A4A]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Events Section */}
          <div>
            <div className="mb-8">
              <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">Stay Connected</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Upcoming Events
              </h2>
              <p className="text-white/70">
                Join us in celebrating Gurudev's legacy through community gatherings.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {upcomingEvents.map((event, index) => (
                <Link
                  key={index}
                  to="/community/events"
                  className="group flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded bg-[#4A6FA5]/30 text-[#4A6FA5] text-xs font-medium mb-2">
                      {event.type}
                    </span>
                    <h3 className="font-semibold text-white group-hover:text-[#4A6FA5] transition-colors line-clamp-1">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-white/60">
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
                </Link>
              ))}
            </div>

            <Button 
              variant="outline" 
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
              <Link to="/community/events">
                View All Events
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          {/* Blog Section */}
          <div>
            <div className="mb-8">
              <p className="text-[#4A6FA5] font-semibold mb-2 uppercase tracking-wider text-sm">From Our Blog</p>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Latest Insights
              </h2>
              <p className="text-white/70">
                Articles and reflections on Gurudev's teachings and Jain philosophy.
              </p>
            </div>

            <div className="space-y-4 mb-6">
              {latestPosts.map((post, index) => (
                <Link
                  key={index}
                  to="/community/blog"
                  className="group flex gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all"
                >
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-0.5 rounded bg-[#4A6FA5]/30 text-[#4A6FA5] text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-white/50">{post.date}</span>
                    </div>
                    <h3 className="font-semibold text-white group-hover:text-[#4A6FA5] transition-colors line-clamp-1">
                      {post.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-1 mt-1">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>

            <Button 
              variant="outline" 
              asChild
              className="border-white/30 text-white hover:bg-white/10"
            >
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
