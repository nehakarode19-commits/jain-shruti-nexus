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
} from "lucide-react";
import { useAdminCourses } from "@/hooks/useLMS";
import { useAdminLectures } from "@/hooks/useLMSAdmin";

const LMSDashboard = () => {
  const { data: courses = [] } = useAdminCourses();

  // Calculate stats
  const totalCourses = courses.length;
  const publishedCourses = courses.filter(c => c.is_published).length;
  const onlineCourses = courses.filter(c => c.course_mode === "Online").length;
  const offlineCourses = courses.filter(c => c.course_mode === "Offline").length;

  const stats = [
    { label: "Total Courses", value: totalCourses, icon: BookOpen, color: "text-primary" },
    { label: "Published", value: publishedCourses, icon: TrendingUp, color: "text-green-600" },
    { label: "Online Courses", value: onlineCourses, icon: Video, color: "text-blue-600" },
    { label: "Offline Courses", value: offlineCourses, icon: Users, color: "text-orange" },
  ];

  const quickActions = [
    { label: "Add New Course", href: "/learning/manage-courses", icon: Plus, description: "Create a new course" },
    { label: "Schedule Lecture", href: "/learning/manage-lectures", icon: Calendar, description: "Add online or offline lecture" },
    { label: "Upload Materials", href: "/learning/materials", icon: FileText, description: "Add study resources" },
    { label: "View Attendance", href: "/learning/attendance", icon: ClipboardList, description: "Track student attendance" },
  ];

  return (
    <LearningLayout title="LMS Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary/10 to-orange/10 rounded-2xl p-6 border border-border">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                Learning Management System
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage courses, lectures, students, and learning materials
              </p>
            </div>
            <Button asChild className="gap-2">
              <Link to="/learning/manage-courses">
                <Plus className="h-4 w-4" />
                Add Course
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl bg-muted ${stat.color}`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
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
              <Card className="h-full border-border hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group">
                <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                    <action.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-foreground">{action.label}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {/* Recent Courses */}
        <Card className="border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Courses</CardTitle>
              <CardDescription>Your latest courses</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link to="/learning/manage-courses">
                View All
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {courses.length === 0 ? (
              <div className="text-center py-8">
                <GraduationCap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No courses yet. Create your first course!</p>
                <Button className="mt-4" asChild>
                  <Link to="/learning/manage-courses">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Course
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {courses.slice(0, 5).map((course) => (
                  <div key={course.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {course.subject} • {course.level} • {course.course_mode}
                        </p>
                      </div>
                    </div>
                    <Badge variant={course.is_published ? "default" : "outline"}>
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
          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5 text-primary" />
                Online Learning
              </CardTitle>
              <CardDescription>
                Schedule live sessions and upload recorded lectures
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <PlayCircle className="h-4 w-4 text-green-600" />
                <span>Live Zoom/YouTube integration</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Video className="h-4 w-4 text-blue-600" />
                <span>Upload recorded lectures</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="h-4 w-4 text-orange" />
                <span>Track student progress</span>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/learning/manage-lectures">Manage Lectures</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Offline Learning
              </CardTitle>
              <CardDescription>
                Manage in-person classes and track attendance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-green-600" />
                <span>Schedule classroom sessions</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <ClipboardList className="h-4 w-4 text-blue-600" />
                <span>Manual attendance tracking</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <FileText className="h-4 w-4 text-orange" />
                <span>Upload session recordings</span>
              </div>
              <Button variant="outline" className="w-full mt-4" asChild>
                <Link to="/learning/attendance">View Attendance</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </LearningLayout>
  );
};

export default LMSDashboard;
