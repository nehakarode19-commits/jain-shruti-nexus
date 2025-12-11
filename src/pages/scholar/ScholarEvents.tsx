import { useState } from "react";
import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Video, 
  ExternalLink,
  CalendarPlus,
  Bell
} from "lucide-react";

// Mock events data
const events = [
  {
    id: "1",
    title: "Jain Manuscript Preservation Workshop",
    description: "Learn traditional and modern techniques for preserving ancient Jain manuscripts. Hands-on session with experts.",
    date: "December 15, 2025",
    time: "10:00 AM - 4:00 PM IST",
    location: "Gujarat University, Ahmedabad",
    type: "workshop",
    isOnline: false,
    attendees: 45,
    maxAttendees: 50,
    registered: true,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=400",
  },
  {
    id: "2",
    title: "Research Methodology Webinar",
    description: "Advanced research methodologies for Jain studies. Topics include digital humanities, textual analysis, and interdisciplinary approaches.",
    date: "December 20, 2025",
    time: "3:00 PM - 5:00 PM IST",
    location: "Online (Zoom)",
    type: "webinar",
    isOnline: true,
    attendees: 156,
    maxAttendees: 500,
    registered: false,
    image: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=400",
  },
  {
    id: "3",
    title: "Annual Jain Scholars Conference 2026",
    description: "The premier gathering of Jain scholars worldwide. Present papers, network, and discuss latest research.",
    date: "January 5-7, 2026",
    time: "9:00 AM onwards",
    location: "India International Centre, New Delhi",
    type: "conference",
    isOnline: false,
    attendees: 234,
    maxAttendees: 300,
    registered: true,
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400",
  },
  {
    id: "4",
    title: "Sanskrit Reading Circle",
    description: "Weekly gathering to read and discuss classical Jain texts in Sanskrit. All levels welcome.",
    date: "Every Saturday",
    time: "11:00 AM - 1:00 PM IST",
    location: "Online (Google Meet)",
    type: "regular",
    isOnline: true,
    attendees: 28,
    maxAttendees: 30,
    registered: false,
    image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
  },
];

const pastEvents = [
  {
    id: "p1",
    title: "Jain Philosophy Symposium",
    date: "November 10, 2025",
    type: "symposium",
    recording: true,
  },
  {
    id: "p2",
    title: "Introduction to Prakrit Language",
    date: "October 25, 2025",
    type: "workshop",
    recording: true,
  },
];

export default function ScholarEvents() {
  const [selectedTab, setSelectedTab] = useState("upcoming");

  const getTypeBadge = (type: string) => {
    const colors: Record<string, string> = {
      workshop: "bg-blue-500/10 text-blue-500",
      webinar: "bg-purple-500/10 text-purple-500",
      conference: "bg-gold/10 text-gold",
      regular: "bg-green-500/10 text-green-500",
      symposium: "bg-red-500/10 text-red-500",
    };
    return colors[type] || "bg-muted text-muted-foreground";
  };

  return (
    <ScholarLayout title="Events">
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-heading font-bold">Scholar Events</h2>
            <p className="text-muted-foreground">Workshops, webinars, and conferences for scholars</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Bell className="h-4 w-4 mr-2" />
              Set Reminders
            </Button>
            <Button variant="outline">
              <CalendarPlus className="h-4 w-4 mr-2" />
              Sync Calendar
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="registered">My Events</TabsTrigger>
            <TabsTrigger value="past">Past Events</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {events.map((event) => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-40 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={getTypeBadge(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                      {event.isOnline && (
                        <Badge variant="outline" className="text-xs">
                          <Video className="h-3 w-3 mr-1" />
                          Online
                        </Badge>
                      )}
                      {event.registered && (
                        <Badge className="bg-green-500/10 text-green-500 text-xs">
                          Registered
                        </Badge>
                      )}
                    </div>

                    <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        {event.location}
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Users className="h-4 w-4" />
                        {event.attendees}/{event.maxAttendees} registered
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {event.registered ? (
                        <>
                          <Button variant="outline" className="flex-1">
                            View Details
                          </Button>
                          <Button variant="ghost" className="text-red-500 hover:text-red-600">
                            Cancel
                          </Button>
                        </>
                      ) : (
                        <Button className="w-full bg-primary hover:bg-primary/90">
                          Register Now
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="registered" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              {events.filter(e => e.registered).map((event) => (
                <Card key={event.id} className="overflow-hidden">
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={event.image} 
                      alt={event.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4">
                    <Badge className={`${getTypeBadge(event.type)} mb-2`}>
                      {event.type}
                    </Badge>
                    <h3 className="font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      {event.date}
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Add to Calendar
                      </Button>
                      <Button size="sm" className="flex-1">
                        Join
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {events.filter(e => e.registered).length === 0 && (
              <div className="text-center py-12">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-lg mb-2">No registered events</h3>
                <p className="text-muted-foreground mb-4">Browse upcoming events and register</p>
                <Button onClick={() => setSelectedTab("upcoming")}>
                  Browse Events
                </Button>
              </div>
            )}
          </TabsContent>

          <TabsContent value="past" className="mt-6">
            <div className="space-y-4">
              {pastEvents.map((event) => (
                <Card key={event.id}>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{event.title}</h3>
                        <p className="text-sm text-muted-foreground">{event.date}</p>
                      </div>
                    </div>
                    {event.recording && (
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-2" />
                        Watch Recording
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ScholarLayout>
  );
}
