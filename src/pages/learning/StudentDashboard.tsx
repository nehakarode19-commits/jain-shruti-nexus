import { Link } from "react-router-dom";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { SEO } from "@/components/shared/SEO";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useEnrollments, useCourses } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  BookOpen,
  Calendar,
  GraduationCap,
  PlayCircle,
  Clock,
  ArrowRight,
  Sparkles,
  Trophy,
  Target,
  Video,
  CheckCircle2,
  TrendingUp,
  Users,
  FileText,
  Star,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { format, isAfter, isBefore, addDays } from "date-fns";

// Mock upcoming lectures data
const upcomingLectures = [
  {
    id: "1",
    title: "Introduction to Jain Agam Literature",
    course: "Jain Philosophy Basics",
    date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    type: "Online",
    instructor: "Acharya Gurudev",
    duration: "60 mins",
  },
  {
    id: "2",
    title: "Understanding Anekantavada",
    course: "Advanced Jain Philosophy",
    date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    type: "Offline",
    venue: "MJRC Hall, Ahmedabad",
    duration: "90 mins",
  },
  {
    id: "3",
    title: "Manuscript Preservation Techniques",
    course: "Manuscript Studies",
    date: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    type: "Online",
    instructor: "Dr. Sharma",
    duration: "45 mins",
  },
];

// Mock achievements
const achievements = [
  { label: "Courses Completed", value: 3, icon: Trophy, color: "text-amber-500" },
  { label: "Lectures Watched", value: 24, icon: PlayCircle, color: "text-emerald-500" },
  { label: "Hours Learned", value: 18, icon: Clock, color: "text-blue-500" },
  { label: "Assignments Done", value: 8, icon: CheckCircle2, color: "text-violet-500" },
];

export default function StudentDashboard() {
  const { user } = useAdminAuth();
  const { data: enrollments = [], isLoading: enrollmentsLoading } = useEnrollments();
  const { data: allCourses = [], isLoading: coursesLoading } = useCourses();

  // Calculate stats
  const enrolledCount = enrollments.length;
  const completedCount = enrollments.filter((e: any) => e.status === "completed").length;
  const inProgressCount = enrollments.filter((e: any) => e.status === "active").length;

  // Get recommended courses (not enrolled)
  const enrolledCourseIds = enrollments.map((e: any) => e.course_id);
  const recommendedCourses = allCourses
    .filter(course => !enrolledCourseIds.includes(course.id))
    .slice(0, 3);

  return (
    <LearningLayout title="My Learning">
      <SEO
        title="Student Dashboard | Jambushrusti Learning Portal"
        description="Track your learning progress, enrolled courses, and upcoming lectures."
      />

      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 overflow-hidden border border-primary/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Student Portal
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(" ")[0] || "Student"}!
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Continue your learning journey. You have {inProgressCount} course{inProgressCount !== 1 ? 's' : ''} in progress.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/20">
                  <Link to="/learning/courses">
                    <BookOpen className="h-5 w-5" />
                    Browse Courses
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Achievement Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((stat) => (
            <Card key={stat.label} className="border-border rounded-2xl hover:shadow-lg transition-all duration-300 group overflow-hidden">
              <CardContent className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-xl bg-muted group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Enrolled Courses */}
          <div className="lg:col-span-2">
            <Card className="border-border rounded-2xl h-full">
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-xl font-heading flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    My Enrolled Courses
                  </CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </div>
                <Button variant="outline" size="sm" asChild className="rounded-xl">
                  <Link to="/learning/courses">
                    View All
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                {enrollmentsLoading ? (
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-4 p-4 bg-muted/30 rounded-xl">
                        <Skeleton className="w-24 h-16 rounded-lg" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-5 w-3/4" />
                          <Skeleton className="h-3 w-1/2" />
                          <Skeleton className="h-2 w-full" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : enrollments.length > 0 ? (
                  <div className="space-y-4">
                    {enrollments.slice(0, 4).map((enrollment: any) => {
                      const course = enrollment.course;
                      const progress = Math.floor(Math.random() * 80) + 10; // Mock progress
                      
                      return (
                        <div
                          key={enrollment.id}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-primary/20 group"
                        >
                          <div className="w-24 h-16 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                            {course?.thumbnail_url ? (
                              <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                            ) : (
                              <BookOpen className="h-8 w-8 text-primary/60" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                              {course?.title || "Course"}
                            </h4>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Video className="h-3.5 w-3.5" />
                                {course?.course_mode}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3.5 w-3.5" />
                                {course?.duration || "Self-paced"}
                              </span>
                            </div>
                            <div className="mt-3 flex items-center gap-3">
                              <Progress value={progress} className="h-2 flex-1" />
                              <span className="text-sm font-medium text-primary">{progress}%</span>
                            </div>
                          </div>
                          <Button size="sm" asChild className="rounded-lg">
                            <Link to={`/learning/courses/${course?.id}`}>
                              <PlayCircle className="h-4 w-4 mr-1" />
                              Continue
                            </Link>
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
                    <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <GraduationCap className="h-8 w-8 text-primary/60" />
                    </div>
                    <h4 className="font-heading font-semibold text-lg text-foreground mb-2">No enrolled courses yet</h4>
                    <p className="text-muted-foreground mb-4">Start your learning journey today!</p>
                    <Button className="rounded-xl" asChild>
                      <Link to="/learning/courses">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Explore Courses
                      </Link>
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Lectures */}
          <div>
            <Card className="border-border rounded-2xl h-full">
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-primary" />
                  Upcoming Lectures
                </CardTitle>
                <CardDescription>Don't miss your scheduled sessions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {upcomingLectures.map((lecture, index) => (
                  <div
                    key={lecture.id}
                    className="p-4 bg-muted/30 rounded-xl border-l-4 border-primary hover:bg-muted/50 transition-colors"
                  >
                    <h4 className="font-medium text-foreground text-sm leading-snug line-clamp-2">
                      {lecture.title}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">{lecture.course}</p>
                    <div className="flex items-center gap-2 mt-3 flex-wrap">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${
                          lecture.type === "Online" 
                            ? "bg-emerald-500/10 text-emerald-700 border-emerald-200" 
                            : "bg-blue-500/10 text-blue-700 border-blue-200"
                        }`}
                      >
                        {lecture.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {lecture.duration}
                      </span>
                    </div>
                    <p className="text-xs text-primary font-medium mt-2">
                      {format(lecture.date, "EEE, MMM d 'at' h:mm a")}
                    </p>
                  </div>
                ))}

                <Button variant="outline" className="w-full rounded-xl" asChild>
                  <Link to="/learning/schedule">
                    View Full Schedule
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recommended Courses */}
        {recommendedCourses.length > 0 && (
          <Card className="border-border rounded-2xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Star className="h-5 w-5 text-amber-500" />
                  Recommended For You
                </CardTitle>
                <CardDescription>Expand your knowledge with these courses</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild className="rounded-xl">
                <Link to="/learning/courses">
                  Browse All
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recommendedCourses.map((course) => (
                  <Link key={course.id} to={`/learning/courses/${course.id}`}>
                    <div className="group p-4 bg-muted/30 rounded-xl hover:bg-muted/50 hover:shadow-lg transition-all duration-300 border border-transparent hover:border-primary/20">
                      <div className="aspect-video rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden mb-4">
                        {course.thumbnail_url ? (
                          <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <BookOpen className="h-10 w-10 text-primary/40" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{course.subject}</Badge>
                        <Badge className="text-xs bg-primary/10 text-primary border-primary/20">{course.level}</Badge>
                      </div>
                      <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                        {course.title}
                      </h4>
                      {course.instructor_name && (
                        <p className="text-sm text-muted-foreground mt-2 flex items-center gap-1">
                          <Users className="h-3.5 w-3.5" />
                          {course.instructor_name}
                        </p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Quick Links */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "My Assignments", href: "/learning/assignments", icon: FileText, description: "View pending tasks" },
            { label: "Study Materials", href: "/learning/materials", icon: BookOpen, description: "Access resources" },
            { label: "My Progress", href: "/learning/reports", icon: TrendingUp, description: "Track achievements" },
            { label: "Settings", href: "/learning/settings", icon: Target, description: "Manage preferences" },
          ].map((item) => (
            <Link key={item.label} to={item.href}>
              <Card className="h-full border-border rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                      <item.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-foreground">{item.label}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </LearningLayout>
  );
}