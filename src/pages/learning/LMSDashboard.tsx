import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Users,
  Video,
  Calendar,
  TrendingUp,
  Clock,
  PlayCircle,
  FileText,
  Plus,
  ArrowRight,
  GraduationCap,
  ClipboardList,
  Sparkles,
  Target,
  Award,
} from "lucide-react";
import { useAdminCourses } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

const LMSDashboard = () => {
  const { data: courses = [] } = useAdminCourses();
  const { user } = useAdminAuth();

  // Calculate stats
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.is_published).length;
  const onlineCourses = courses.filter(c => c.course_mode === "Online").length;
  const offlineCourses = courses.filter(c => c.course_mode === "Offline").length;

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: BookOpen, color: "bg-primary/10 text-primary" },
    { label: "Published", value: publishedCourses, icon: TrendingUp, color: "bg-emerald-500/10 text-emerald-600" },
    { label: "Online Courses", value: onlineCourses, icon: Video, color: "bg-blue-500/10 text-blue-600" },
    { label: "Offline Courses", value: offlineCourses, icon: Users, color: "bg-amber-500/10 text-amber-600" },
  ];

  const quickActions = [
    { label: "Add New Course", href: "/learning/manage-courses", icon: Plus, description: "Create a new course" },
    { label: "Schedule Lecture", href: "/learning/manage-lectures", icon: Calendar, description: "Add online or offline lecture" },
    { label: "Upload Materials", href: "/learning/materials", icon: FileText, description: "Add study resources" },
    { label: "View Attendance", href: "/learning/attendance", icon: ClipboardList, description: "Track student attendance" },
  ];

  return (
    <LearningLayout title="LMS Dashboard">
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 overflow-hidden border border-primary/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-56 h-56 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                    <Sparkles className="h-3 w-3 mr-1" />
                    Learning Management
                  </Badge>
                </div>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
                  Welcome back, {user?.name?.split(" ")[0] || "Admin"}!
                </h1>
                <p className="text-muted-foreground text-lg max-w-xl">
                  Manage courses, lectures, students, and learning materials from your dashboard.
                </p>
              </div>
              <div className="flex gap-3">
                <Button asChild size="lg" className="gap-2 rounded-xl shadow-lg shadow-primary/20">
                  <Link to="/learning/manage-courses">
                    <Plus className="h-5 w-5" />
                    Add Course
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="gap-2 rounded-xl">
                  <Link to="/learning/courses">
                    <BookOpen className="h-5 w-5" />
                    View All
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border rounded-2xl hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3.5 rounded-xl ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <stat.icon className="h-6 w-6" />
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

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.label} to={action.href}>
              <Card className="h-full border-border rounded-2xl hover:border-primary/40 hover:shadow-xl transition-all duration-300 cursor-pointer group overflow-hidden">
                <CardContent className="p-6 flex flex-col items-center text-center relative">
                  {/* Background decoration */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  <div className="relative z-10">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                      <action.icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-semibold text-foreground text-lg">{action.label}</h3>
                    <p className="text-sm text-muted-foreground mt-2">{action.description}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Courses */}
        <Card className="border-border rounded-2xl">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-xl font-heading flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Recent Courses
              </CardTitle>
              <CardDescription>Your latest courses</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild className="rounded-xl">
              <Link to="/learning/manage-courses">
                View All
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-12 bg-muted/30 rounded-2xl border border-dashed border-border">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <GraduationCap className="h-8 w-8 text-primary/60" />
                </div>
                <h4 className="font-heading font-semibold text-lg text-foreground mb-2">No courses yet</h4>
                <p className="text-muted-foreground mb-4">Create your first course to get started!</p>
                <Button className="rounded-xl" asChild>
                  <Link to="/learning/manage-courses">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {courses.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 hover:bg-muted/50 transition-all duration-300 border border-transparent hover:border-primary/20 group">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                        {course.thumbnail_url ? (
                          <img src={course.thumbnail_url} alt={course.title} className="w-full h-full object-cover" />
                        ) : (
                          <BookOpen className="h-6 w-6 text-primary" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.subject} • {course.level} • {course.course_mode}
                        </p>
                      </div>
                    </div>
                    <Badge variant={course.is_published ? "default" : "outline"} className="rounded-lg">
                      {course.is_published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-emerald-500/10">
                  <Video className="h-5 w-5 text-emerald-600" />
                </div>
                Online Learning
              </CardTitle>
              <CardDescription>
                Schedule live sessions and upload recorded lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <PlayCircle className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Live Zoom/YouTube integration</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <Video className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Upload recorded lectures</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <Clock className="h-5 w-5 text-primary" />
                <span className="font-medium">Track student progress</span>
              </div>
              <Button variant="outline" className="w-full mt-2 rounded-xl h-11" asChild>
                <Link to="/learning/manage-lectures">
                  Manage Lectures
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <CardHeader className="relative">
              <CardTitle className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-blue-500/10">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                Offline Learning
              </CardTitle>
              <CardDescription>
                Manage in-person classes and track attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 relative">
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <Calendar className="h-5 w-5 text-emerald-600" />
                <span className="font-medium">Schedule classroom sessions</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <ClipboardList className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Manual attendance tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm p-3 rounded-xl bg-muted/50">
                <FileText className="h-5 w-5 text-primary" />
                <span className="font-medium">Upload session recordings</span>
              </div>
              <Button variant="outline" className="w-full mt-2 rounded-xl h-11" asChild>
                <Link to="/learning/attendance">
                  View Attendance
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </LearningLayout>
  );
};

export default LMSDashboard;
