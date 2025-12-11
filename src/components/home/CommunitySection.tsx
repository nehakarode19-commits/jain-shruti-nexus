import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MapPin, Loader2 } from "lucide-react";
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
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
          {/* Events Column */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold uppercase tracking-wider text-xs mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
                  Events
                </p>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  Upcoming Events
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-sm hover:opacity-70 text-[#2D2A26]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Link to="/community/events">
                  View All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {eventsLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-[#2D2A26]" />
              </div>
            ) : (
              <div className="space-y-3">
                {displayEvents.map((event, index) => (
                  <Link
                    key={event.id}
                    to="/community/events"
                    className="group flex gap-3.5 rounded-lg p-3.5 transition-all duration-300 hover:shadow-md bg-[#FAF7F2] border border-[#E5E0D5]"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg overflow-hidden">
                      <img
                        src={event.image_url || fallbackEventImages[index % fallbackEventImages.length]}
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block px-2 py-0.5 rounded-full text-xs font-medium mb-1.5 bg-[#C9A227]/10 text-[#C9A227]" style={{ fontFamily: 'Inter, sans-serif' }}>
                        Event
                      </span>
                      <h4 className="font-semibold text-sm mb-1 group-hover:opacity-80 transition-opacity line-clamp-1" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                        {event.title}
                      </h4>
                      <div className="flex flex-wrap gap-3 text-xs" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                        {event.event_date && (
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-[#C9A227]" />
                            {format(new Date(event.event_date), "MMM d, yyyy")}
                          </span>
                        )}
                        {event.location && (
                          <span className="flex items-center gap-1">
                            <MapPin className="h-3 w-3 text-[#C9A227]" />
                            {event.location}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
                
                {displayEvents.length === 0 && (
                  <div className="text-center py-6 rounded-lg text-sm bg-[#FAF7F2] border border-[#E5E0D5]" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
                    No upcoming events scheduled.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Insights Column */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="font-semibold uppercase tracking-wider text-xs mb-2" style={{ fontFamily: 'Inter, sans-serif', color: '#C9A227' }}>
                  Insights
                </p>
                <h3 className="text-2xl md:text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  Latest Insights
                </h3>
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="text-sm hover:opacity-70 text-[#2D2A26]"
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <Link to="/community/blog">
                  Read All
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </Button>
            </div>
            
            {blogsLoading ? (
              <div className="flex items-center justify-center py-10">
                <Loader2 className="h-6 w-6 animate-spin text-[#2D2A26]" />
              </div>
            ) : (
              <div className="space-y-3">
                {displayBlogs.map((post, index) => (
                  <Link
                    key={post.id}
                    to={`/community/blog/${post.id}`}
                    className="group block rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md bg-[#FAF7F2] border border-[#E5E0D5]"
                  >
                    <div className="flex gap-3.5 p-3.5">
                      <div className="flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden">
                        <img
                          src={post.cover_image || fallbackBlogImages[index % fallbackBlogImages.length]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-[#2D2A26]/10 text-[#2D2A26]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            Blog
                          </span>
                          <span className="text-xs text-[#8B8B8B]" style={{ fontFamily: 'Inter, sans-serif' }}>
                            {format(new Date(post.created_at), "MMM d")}
                          </span>
                        </div>
                        <h4 className="font-semibold text-sm mb-1 group-hover:opacity-80 transition-opacity line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                          {post.title}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))}
                
                {displayBlogs.length === 0 && (
                  <div className="text-center py-6 rounded-lg text-sm bg-[#FAF7F2] border border-[#E5E0D5]" style={{ fontFamily: 'Inter, sans-serif', color: '#5A5650' }}>
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
