import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight, MapPin, Clock, BookOpen, Newspaper } from "lucide-react";
import { useEventsFromDB, useBlogsFromDB } from "@/hooks/useContent";
import { format } from "date-fns";

const staticEvents = [
  {
    id: "1",
    title: "Saturday Pravachan",
    category: "Regular",
    event_date: null,
    time: "10:00 AM - 12:00 PM",
    location: "Online & In-Person",
    recurring: "Every Saturday"
  },
  {
    id: "2", 
    title: "Paryushan Mahaparva",
    category: "Festival",
    event_date: "2024-09-12",
    time: "Various Sessions",
    location: "Shantigram",
    dateRange: "September 12-19, 2024"
  },
  {
    id: "3",
    title: "Research Workshop",
    category: "Workshop",
    event_date: "2024-10-05",
    time: "2:00 PM - 5:00 PM",
    location: "Online"
  }
];

const staticInsights = [
  {
    id: "1",
    title: "Understanding Anekantavada in Modern Context",
    category: "Philosophy",
    date: "March 15, 2024",
    excerpt: "Exploring the Jain philosophy of multiple perspectives and its relevance today..."
  },
  {
    id: "2",
    title: "Preservation of Ancient Manuscripts",
    category: "Research",
    date: "March 10, 2024",
    excerpt: "Our ongoing efforts to digitize and preserve rare Jain texts..."
  }
];

const getCategoryColor = (category: string) => {
  switch (category?.toLowerCase()) {
    case 'regular':
      return 'bg-orange-100 text-orange-600';
    case 'festival':
      return 'bg-orange-100 text-orange-600';
    case 'workshop':
      return 'bg-green-100 text-green-600';
    case 'philosophy':
      return 'bg-orange-100 text-orange-600';
    case 'research':
      return 'bg-blue-100 text-blue-600';
    default:
      return 'bg-gray-100 text-gray-600';
  }
};

export function CommunitySection() {
  const { data: dbEvents = [] } = useEventsFromDB();
  const { data: dbBlogs = [] } = useBlogsFromDB();
  
  const displayEvents = dbEvents.length > 0 ? dbEvents.slice(0, 3).map(e => ({
    ...e,
    category: 'Event',
    time: '',
    recurring: undefined,
    dateRange: undefined
  })) : staticEvents;
  
  const displayInsights = dbBlogs.length > 0 ? dbBlogs.slice(0, 2).map(b => ({
    id: b.id,
    title: b.title,
    category: 'Blog',
    date: format(new Date(b.created_at), "MMMM d, yyyy"),
    excerpt: b.excerpt || ''
  })) : staticInsights;

  return (
    <section className="py-16 lg:py-20" style={{ backgroundColor: '#FAF7F2' }}>
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Upcoming Events Column */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5EFE6' }}>
                <Calendar className="w-5 h-5" style={{ color: '#C9A227' }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  Upcoming Events
                </h3>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                  Lectures, workshops, and gatherings
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {displayEvents.map((event: any) => (
                <Link
                  key={event.id}
                  to="/community/events"
                  className="group block rounded-xl p-4 transition-all duration-300 hover:shadow-md bg-white border border-[#E8E4DD]"
                >
                  <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium mb-2 ${getCategoryColor(event.category)}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                    {event.category}
                  </span>
                  <h4 className="font-semibold text-base mb-3 group-hover:opacity-80 transition-opacity" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                    {event.title}
                  </h4>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                      <Calendar className="h-4 w-4" style={{ color: '#A9A49C' }} />
                      <span>{event.recurring || event.dateRange || (event.event_date ? format(new Date(event.event_date), "MMMM d, yyyy") : 'TBA')}</span>
                    </div>
                    {event.time && (
                      <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                        <Clock className="h-4 w-4" style={{ color: '#A9A49C' }} />
                        <span>{event.time}</span>
                      </div>
                    )}
                    {event.location && (
                      <div className="flex items-center gap-2 text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                        <MapPin className="h-4 w-4" style={{ color: '#A9A49C' }} />
                        <span>{event.location}</span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-5">
              <Button 
                variant="outline"
                asChild
                className="rounded-lg px-5 py-2.5 text-sm font-medium border-[#E8E4DD] hover:bg-[#F5EFE6]"
                style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}
              >
                <Link to="/community/events" className="flex items-center gap-2">
                  View All Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Latest Insights Column */}
          <div>
            <div className="flex items-start gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: '#F5EFE6' }}>
                <BookOpen className="w-5 h-5" style={{ color: '#C9A227' }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-1" style={{ fontFamily: 'Playfair Display, serif', color: '#2D2A26' }}>
                  Latest Insights
                </h3>
                <p className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                  Articles, research updates, and news
                </p>
              </div>
            </div>
            
            <div className="space-y-3">
              {displayInsights.map((insight: any) => (
                <Link
                  key={insight.id}
                  to={`/community/blog/${insight.id}`}
                  className="group block rounded-xl p-4 transition-all duration-300 hover:shadow-md bg-white border border-[#E8E4DD]"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className={`inline-block px-2.5 py-1 rounded text-xs font-medium ${getCategoryColor(insight.category)}`} style={{ fontFamily: 'Inter, sans-serif' }}>
                      {insight.category}
                    </span>
                    <span className="text-sm" style={{ fontFamily: 'Inter, sans-serif', color: '#A9A49C' }}>
                      {insight.date}
                    </span>
                  </div>
                  <h4 className="font-semibold text-base mb-2 group-hover:opacity-80 transition-opacity" style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}>
                    {insight.title}
                  </h4>
                  <p className="text-sm line-clamp-2" style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}>
                    {insight.excerpt}
                  </p>
                </Link>
              ))}
            </div>

            <div className="mt-5 flex items-center gap-4">
              <Button 
                variant="outline"
                asChild
                className="rounded-lg px-5 py-2.5 text-sm font-medium border-[#E8E4DD] hover:bg-[#F5EFE6]"
                style={{ fontFamily: 'Inter, sans-serif', color: '#2D2A26' }}
              >
                <Link to="/community/blog" className="flex items-center gap-2">
                  Read Blog
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Link 
                to="/community/news" 
                className="flex items-center gap-2 text-sm font-medium hover:opacity-70 transition-opacity"
                style={{ fontFamily: 'Inter, sans-serif', color: '#8B8680' }}
              >
                <Newspaper className="h-4 w-4" />
                News
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
