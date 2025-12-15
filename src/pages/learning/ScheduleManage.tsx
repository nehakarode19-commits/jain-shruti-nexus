import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Video, Users, Plus, ArrowRight } from "lucide-react";
import { useAdminCourses } from "@/hooks/useLMS";
import { useAdminLectures } from "@/hooks/useLMSAdmin";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ScheduleManage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const { data: courses = [] } = useAdminCourses();

  // Get all lectures from all courses or selected course
  const allLectures: any[] = [];
  courses.forEach(course => {
    // We'll simulate lectures here since we need to fetch from each course
  });

  // Mock scheduled lectures
  const mockSchedule = [
    {
      id: "1",
      title: "Introduction to Agam Sutras",
      course: "Jain Scriptures Fundamentals",
      type: "Online",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: "90 min",
      instructor: "Acharya Vidyanand",
      venue: null,
      streamUrl: "https://zoom.us/j/123456789",
    },
    {
      id: "2",
      title: "Prakrit Language Basics",
      course: "Ancient Languages",
      type: "Offline",
      date: "2024-01-21",
      time: "2:00 PM",
      duration: "120 min",
      instructor: "Prof. Sharma",
      venue: "Room 101, MJRC",
      streamUrl: null,
    },
    {
      id: "3",
      title: "Understanding Tattvartha Sutra",
      course: "Jain Philosophy",
      type: "Hybrid",
      date: "2024-01-22",
      time: "11:00 AM",
      duration: "60 min",
      instructor: "Dr. Mehta",
      venue: "Main Hall + Online",
      streamUrl: "https://youtube.com/live/abc",
    },
    {
      id: "4",
      title: "Manuscript Conservation",
      course: "Manuscript Studies",
      type: "Offline",
      date: "2024-01-23",
      time: "3:00 PM",
      duration: "90 min",
      instructor: "Dr. Patel",
      venue: "Library Archive Room",
      streamUrl: null,
    },
  ];

  const upcomingLectures = mockSchedule.filter(l => new Date(l.date) >= new Date());
  const pastLectures = mockSchedule.filter(l => new Date(l.date) < new Date());

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Online": return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "Offline": return "bg-green-500/10 text-green-600 border-green-500/20";
      case "Hybrid": return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      default: return "";
    }
  };

  return (
    <LearningLayout title="Schedule">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Lecture Schedule</h1>
            <p className="text-muted-foreground">Manage upcoming and past lectures</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Courses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Courses</SelectItem>
                {courses.map(course => (
                  <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button asChild className="gap-2">
              <Link to="/learning/lectures">
                <Plus className="h-4 w-4" />
                Schedule Lecture
              </Link>
            </Button>
          </div>
        </div>

        {/* Upcoming Lectures */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              Upcoming Lectures
            </CardTitle>
            <CardDescription>Scheduled online and offline sessions</CardDescription>
          </CardHeader>
          <CardContent>
            {upcomingLectures.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No upcoming lectures scheduled</p>
                <Button className="mt-4" variant="outline" asChild>
                  <Link to="/learning/lectures">Schedule a Lecture</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {upcomingLectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        {lecture.type === "Online" ? (
                          <Video className="h-6 w-6 text-primary" />
                        ) : (
                          <Users className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium">{lecture.title}</h4>
                        <p className="text-sm text-muted-foreground">{lecture.course}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(lecture.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3.5 w-3.5" />
                            {lecture.time} ({lecture.duration})
                          </span>
                          {lecture.venue && (
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3.5 w-3.5" />
                              {lecture.venue}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <Badge variant="outline" className={getTypeColor(lecture.type)}>
                        {lecture.type}
                      </Badge>
                      <span className="text-sm text-muted-foreground">{lecture.instructor}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid sm:grid-cols-3 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <Video className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockSchedule.filter(l => l.type === "Online").length}
                </p>
                <p className="text-xs text-muted-foreground">Online Lectures</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockSchedule.filter(l => l.type === "Offline").length}
                </p>
                <p className="text-xs text-muted-foreground">Offline Lectures</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {mockSchedule.filter(l => l.type === "Hybrid").length}
                </p>
                <p className="text-xs text-muted-foreground">Hybrid Sessions</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </LearningLayout>
  );
};

export default ScheduleManage;
