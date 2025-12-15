import { Link } from "react-router-dom";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { SEO } from "@/components/shared/SEO";
import { useAdminCourses } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  Video,
  ChevronRight,
  TrendingUp,
  Plus,
  Users,
  Settings,
  Layers,
  ClipboardCheck,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Mock data for upcoming sessions
const upcomingSessions = [
  {
    id: "1",
    title: "Introduction to Agam Literature",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: "Online",
    instructor: "Acharya Gurudev",
  },
  {
    id: "2",
    title: "Understanding Jain Philosophy",
    date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
    type: "Offline",
    venue: "MJRC Hall, Ahmedabad",
  },
];

export default function LMSAdminDashboard() {
  const { user } = useAdminAuth();
  const { data: courses = [], isLoading } = useAdminCourses();

  // Admin stats
  const adminStats = {
    totalCourses: courses.length,
    publishedCourses: courses.filter(c => c.is_published).length,
    onlineCourses: courses.filter(c => c.course_mode === "Online").length,
    offlineCourses: courses.filter(c => c.course_mode === "Offline").length,
  };

  return (
    <LearningLayout title="Admin Dashboard">
      <SEO
        title="Admin Dashboard | Jambushrusti Learning Portal"
        description="Manage courses, lectures, and student learning progress in the Learning Management System."
      />

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-primary/5 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage courses, lectures, and learning content from this dashboard.
              </p>
            </div>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/learning/manage-courses">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/learning/courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  View Courses
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.totalCourses}</p>
                <p className="text-sm text-muted-foreground">Total Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.publishedCourses}</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Video className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.onlineCourses}</p>
                <p className="text-sm text-muted-foreground">Online</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{adminStats.offlineCourses}</p>
                <p className="text-sm text-muted-foreground">Offline</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recent Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  Recent Courses
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/learning/manage-courses">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="w-24 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : courses.length > 0 ? (
                  <div className="space-y-4">
                    {courses.slice(0, 5).map((course) => (
                      <div
                        key={course.id}
                        className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-20 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 overflow-hidden">
                          {course.thumbnail_url ? (
                            <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                          ) : (
                            <BookOpen className="h-6 w-6 text-primary/60" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {course.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {course.course_mode}
                            </Badge>
                            <Badge variant={course.is_published ? "default" : "secondary"} className="text-xs">
                              {course.is_published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/learning/courses/${course.id}`}>
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <BookOpen className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      No courses created yet.
                    </p>
                    <Button asChild>
                      <Link to="/learning/manage-courses">Create First Course</Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Sessions */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange" />
                  Upcoming Sessions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingSessions.map((session) => (
                  <div
                    key={session.id}
                    className="p-3 bg-muted/30 rounded-lg border-l-4 border-primary"
                  >
                    <h4 className="font-medium text-foreground text-sm">
                      {session.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {session.date.toLocaleDateString("en-IN", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                    <Badge
                      variant="outline"
                      className={`mt-2 text-xs ${
                        session.type === "Online"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {session.type}
                    </Badge>
                  </div>
                ))}

                <Button variant="outline" className="w-full" asChild>
                  <Link to="/learning/schedule">View Full Schedule</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/manage-courses">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Course</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/manage-lectures">
                  <Video className="h-6 w-6" />
                  <span className="text-sm">Add Lecture</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/programs">
                  <Layers className="h-6 w-6" />
                  <span className="text-sm">Programs</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/students">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Students</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/assignments">
                  <ClipboardCheck className="h-6 w-6" />
                  <span className="text-sm">Assignments</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/settings">
                  <Settings className="h-6 w-6" />
                  <span className="text-sm">Settings</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LearningLayout>
  );
}
