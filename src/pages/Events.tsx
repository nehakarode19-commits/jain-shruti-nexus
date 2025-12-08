import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const upcomingEvents = [
  {
    id: 1,
    title: "Annual Memorial Lecture",
    date: "2024-03-15",
    time: "10:00 AM - 1:00 PM",
    location: "Shantigram, Gujarat",
    description: "Join us for the annual memorial lecture commemorating the teachings and legacy of Gurudev. Distinguished scholars will present on Jain philosophy and manuscript preservation.",
    registrationOpen: true,
  },
  {
    id: 2,
    title: "Manuscript Exhibition",
    date: "2024-04-20",
    time: "9:00 AM - 6:00 PM",
    location: "National Museum, New Delhi",
    description: "A special exhibition showcasing rare manuscripts preserved by Gurudev, including original Agam texts and historical documents.",
    registrationOpen: true,
  },
  {
    id: 3,
    title: "Prakrit Language Workshop",
    date: "2024-05-10",
    time: "2:00 PM - 5:00 PM",
    location: "Online (Zoom)",
    description: "An introductory workshop on Prakrit language, following the teaching methodologies established by Gurudev.",
    registrationOpen: true,
  },
];

const pastEvents = [
  {
    id: 4,
    title: "Centenary Celebration",
    date: "2021-03-15",
    location: "Shantigram, Gujarat",
    description: "A grand celebration marking 100 years since the birth of Gurudev, attended by scholars from around the world.",
  },
  {
    id: 5,
    title: "Jain Scripture Conference",
    date: "2023-11-20",
    location: "University of Mumbai",
    description: "Academic conference on the critical editions of Jain scriptures edited by Gurudev.",
  },
  {
    id: 6,
    title: "Book Release: Complete Works Vol. 12",
    date: "2023-08-05",
    location: "Ahmedabad Book Fair",
    description: "Release of the twelfth volume of Gurudev's complete scholarly works.",
  },
];

function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default function Events() {
  return (
    <Layout>
      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground">
              Events
            </h1>
            <div className="section-divider" />
            <p className="text-lg md:text-xl text-muted-foreground">
              Programs, lectures, and workshops honoring Gurudev's legacy
            </p>
          </div>
        </div>
      </section>

      {/* Events Content */}
      <section className="py-16 md:py-20 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <div className="flex justify-center mb-10">
              <TabsList className="bg-secondary">
                <TabsTrigger value="upcoming" className="px-8">Upcoming</TabsTrigger>
                <TabsTrigger value="past" className="px-8">Past Events</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="upcoming">
              <div className="space-y-6 max-w-4xl mx-auto">
                {upcomingEvents.map((event) => (
                  <Card key={event.id} className="overflow-hidden hover:shadow-elevated transition-shadow">
                    <CardHeader className="bg-secondary/30 border-b border-border p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <h3 className="font-display text-2xl font-semibold text-foreground">
                            {event.title}
                          </h3>
                          <div className="flex flex-wrap gap-4 mt-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {formatDate(event.date)}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                        {event.registrationOpen && (
                          <Button>Register Now</Button>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <p className="text-muted-foreground">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastEvents.map((event) => (
                  <Card key={event.id} className="hover:shadow-elevated transition-shadow">
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center gap-2 text-sm text-primary font-medium">
                        <Calendar className="w-4 h-4" />
                        {formatDate(event.date)}
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground">
                        {event.title}
                      </h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </p>
                      <p className="text-muted-foreground text-sm">{event.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}