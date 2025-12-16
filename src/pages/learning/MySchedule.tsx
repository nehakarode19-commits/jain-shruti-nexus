import { StudentLayout } from "@/components/learning/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Video, Users, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { format, addDays, startOfWeek, isSameDay, isToday } from "date-fns";
import { useState } from "react";
import { cn } from "@/lib/utils";

// Mock schedule data
const mockSchedule = [
  {
    id: "1",
    title: "Introduction to Jain Agam Literature",
    course: "Jain Philosophy Foundation",
    date: new Date(),
    time: "10:00 AM",
    duration: "60 mins",
    type: "Online",
    instructor: "Acharya Gurudev",
    meetingLink: "https://zoom.us/j/123456789",
  },
  {
    id: "2",
    title: "Understanding Anekantavada",
    course: "Advanced Jain Philosophy",
    date: addDays(new Date(), 1),
    time: "2:00 PM",
    duration: "90 mins",
    type: "Offline",
    venue: "MJRC Hall, Ahmedabad",
    instructor: "Dr. Patel",
  },
  {
    id: "3",
    title: "Manuscript Preservation Techniques",
    course: "Manuscript Studies",
    date: addDays(new Date(), 2),
    time: "11:00 AM",
    duration: "45 mins",
    type: "Online",
    instructor: "Dr. Sharma",
    meetingLink: "https://zoom.us/j/987654321",
  },
  {
    id: "4",
    title: "Sanskrit Grammar Basics",
    course: "Sanskrit for Jain Texts",
    date: addDays(new Date(), 3),
    time: "4:00 PM",
    duration: "60 mins",
    type: "Online",
    instructor: "Prof. Mehta",
    meetingLink: "https://zoom.us/j/111222333",
  },
  {
    id: "5",
    title: "Prakrit Language Introduction",
    course: "Jain Philosophy Foundation",
    date: addDays(new Date(), 5),
    time: "10:00 AM",
    duration: "90 mins",
    type: "Offline",
    venue: "Library Room 2, MJRC",
    instructor: "Acharya Gurudev",
  },
];

export default function MySchedule() {
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));

  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(currentWeekStart, i));

  const getScheduleForDay = (date: Date) => {
    return mockSchedule.filter((item) => isSameDay(item.date, date));
  };

  const goToPreviousWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, -7));
  };

  const goToNextWeek = () => {
    setCurrentWeekStart(addDays(currentWeekStart, 7));
  };

  const goToCurrentWeek = () => {
    setCurrentWeekStart(startOfWeek(new Date(), { weekStartsOn: 1 }));
  };

  return (
    <StudentLayout title="My Schedule">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold text-foreground">My Schedule</h1>
            <p className="text-muted-foreground">View your upcoming lectures and classes</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToCurrentWeek}>
              Today
            </Button>
            <Button variant="outline" size="icon" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Week View */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              {format(currentWeekStart, "MMMM d")} - {format(addDays(currentWeekStart, 6), "MMMM d, yyyy")}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
              {weekDays.map((day) => {
                const daySchedule = getScheduleForDay(day);
                const isDayToday = isToday(day);

                return (
                  <div
                    key={day.toISOString()}
                    className={cn(
                      "p-3 rounded-xl border min-h-[150px]",
                      isDayToday ? "border-primary bg-primary/5" : "border-border"
                    )}
                  >
                    <div className="text-center mb-3">
                      <p className={cn(
                        "text-xs font-medium uppercase",
                        isDayToday ? "text-primary" : "text-muted-foreground"
                      )}>
                        {format(day, "EEE")}
                      </p>
                      <p className={cn(
                        "text-lg font-bold",
                        isDayToday ? "text-primary" : "text-foreground"
                      )}>
                        {format(day, "d")}
                      </p>
                    </div>

                    <div className="space-y-2">
                      {daySchedule.map((item) => (
                        <div
                          key={item.id}
                          className={cn(
                            "p-2 rounded-lg text-xs",
                            item.type === "Online"
                              ? "bg-emerald-500/10 border border-emerald-500/20"
                              : "bg-blue-500/10 border border-blue-500/20"
                          )}
                        >
                          <p className="font-medium text-foreground line-clamp-2">{item.title}</p>
                          <p className="text-muted-foreground mt-1">{item.time}</p>
                        </div>
                      ))}
                      {daySchedule.length === 0 && (
                        <p className="text-xs text-muted-foreground text-center py-4">No classes</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Sessions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Upcoming Sessions
            </CardTitle>
            <CardDescription>Your scheduled lectures for the next 7 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {mockSchedule.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="flex items-start gap-4 p-4 rounded-xl border bg-card hover:shadow-md transition-shadow"
              >
                <div className="w-16 text-center">
                  <p className="text-xs text-muted-foreground uppercase">{format(session.date, "EEE")}</p>
                  <p className="text-2xl font-bold text-primary">{format(session.date, "d")}</p>
                  <p className="text-xs text-muted-foreground">{format(session.date, "MMM")}</p>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-foreground">{session.title}</h4>
                      <p className="text-sm text-muted-foreground">{session.course}</p>
                    </div>
                    <Badge
                      className={cn(
                        session.type === "Online"
                          ? "bg-emerald-500/10 text-emerald-700 border-emerald-200"
                          : "bg-blue-500/10 text-blue-700 border-blue-200"
                      )}
                    >
                      {session.type === "Online" ? (
                        <Video className="h-3 w-3 mr-1" />
                      ) : (
                        <MapPin className="h-3 w-3 mr-1" />
                      )}
                      {session.type}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {session.time} ({session.duration})
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {session.instructor}
                    </span>
                    {session.venue && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {session.venue}
                      </span>
                    )}
                  </div>

                  {session.type === "Online" && session.meetingLink && (
                    <Button size="sm" className="mt-3" asChild>
                      <a href={session.meetingLink} target="_blank" rel="noopener noreferrer">
                        <Play className="h-4 w-4 mr-1" />
                        Join Session
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
