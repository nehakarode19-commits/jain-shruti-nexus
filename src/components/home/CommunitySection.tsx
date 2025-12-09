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
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <p className="text-[#4A6FA5] font-semibold mb-3 uppercase tracking-wider text-sm">Stay Connected</p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-[#2B3A4A] mb-4">
            Community & Insights
          </h2>
          <p className="text-[#555555] max-w-2xl mx-auto text-lg">
            Stay updated with events and explore articles on Gurudev's teachings.
          </p>
          <div className="w-20 h-1 bg-[#4A6FA5] mx-auto mt-5 rounded-full" />
        </div>

        {/* Vertical Stacked Layout */}
        <div className="max-w-5xl mx-auto space-y-10">
          {/* Events Row */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold text-[#2B3A4A]">Upcoming Events</h3>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-[#4A6FA5] hover:text-[#3A5F95]"
              >
                <Link to="/community/events">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {upcomingEvents.map((event, index) => (
                <Link
                  key={index}
                  to="/community/events"
                  className="group bg-white border border-[#DCE3E7] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#4A6FA5] transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <span className="inline-block px-3 py-1 rounded-full bg-[#4A6FA5]/10 text-[#4A6FA5] text-xs font-medium mb-3">
                      {event.type}
                    </span>
                    <h4 className="font-semibold text-[#2B3A4A] text-lg mb-2 group-hover:text-[#4A6FA5] transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-sm text-[#555555] mb-3 line-clamp-2">
                      {event.description}
                    </p>
                    <div className="flex flex-wrap gap-4 text-xs text-[#555555]">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5 text-[#4A6FA5]" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-[#4A6FA5]" />
                        {event.location}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Insights Row */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-bold text-[#2B3A4A]">Latest Insights</h3>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-[#4A6FA5] hover:text-[#3A5F95]"
              >
                <Link to="/community/blog">
                  Read All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {latestPosts.map((post, index) => (
                <Link
                  key={index}
                  to="/community/blog"
                  className="group bg-white border border-[#DCE3E7] rounded-xl overflow-hidden hover:shadow-lg hover:border-[#4A6FA5] transition-all"
                >
                  <div className="aspect-[16/9] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-3 py-1 rounded-full bg-[#4A6FA5]/10 text-[#4A6FA5] text-xs font-medium">
                        {post.category}
                      </span>
                      <span className="text-xs text-[#555555]">{post.date}</span>
                    </div>
                    <h4 className="font-semibold text-[#2B3A4A] text-lg mb-2 group-hover:text-[#4A6FA5] transition-colors">
                      {post.title}
                    </h4>
                    <p className="text-sm text-[#555555] line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
