import { Link } from "react-router-dom";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { SEO } from "@/components/shared/SEO";
import { useEnrollments } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BookOpen,
  Calendar,
  Clock,
  Play,
  GraduationCap,
  Video,
  FileText,
  ChevronRight,
  TrendingUp,
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

export default function StudentDashboard() {
  const { user } = useAdminAuth();
  const { data: enrollments, isLoading } = useEnrollments();

  const stats = {
    enrolledCourses: enrollments?.length || 0,
    completedLectures: 0,
    hoursLearned: 0,
    certificates: 0,
  };

  return (
    <LearningLayout title="Student Dashboard">
      <SEO
        title="Student Dashboard | Jambushrusti Learning Portal"
        description="Access your enrolled courses, track progress, and view upcoming lectures."
      />

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-primary/5 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Welcome back, {user?.name?.split(" ")[0] || "Student"}!
              </h1>
              <p className="text-muted-foreground mt-1">
                Continue your learning journey with Jain knowledge and wisdom.
              </p>
            </div>
            <Button asChild>
              <Link to="/learning/courses">
                <BookOpen className="h-4 w-4 mr-2" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.enrolledCourses}</p>
                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <Video className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.completedLectures}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.hoursLearned}</p>
                <p className="text-sm text-muted-foreground">Hours Learned</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{stats.certificates}</p>
                <p className="text-sm text-muted-foreground">Certificates</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* My Courses */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  My Courses
                </CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link to="/learning/my-courses">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex gap-4">
                        <Skeleton className="w-24 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : enrollments && enrollments.length > 0 ? (
                  <div className="space-y-4">
                    {enrollments.slice(0, 3).map((enrollment: any) => (
                      <div
                        key={enrollment.id}
                        className="flex items-center gap-4 p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-20 h-14 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <BookOpen className="h-6 w-6 text-primary/60" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {enrollment.course?.title || "Course"}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress value={30} className="h-1.5 flex-1 max-w-[100px]" />
                            <span className="text-xs text-muted-foreground">30%</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link to={`/learning/courses/${enrollment.course_id}`}>
                            <Play className="h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <GraduationCap className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">
                      You haven't enrolled in any courses yet.
                    </p>
                    <Button asChild>
                      <Link to="/learning/courses">Explore Courses</Link>
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/recordings">
                  <Video className="h-6 w-6" />
                  <span className="text-sm">Watch Recordings</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/materials">
                  <FileText className="h-6 w-6" />
                  <span className="text-sm">Study Materials</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/progress">
                  <TrendingUp className="h-6 w-6" />
                  <span className="text-sm">View Progress</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/learning/courses">
                  <BookOpen className="h-6 w-6" />
                  <span className="text-sm">Browse Courses</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </LearningLayout>
  );
}
