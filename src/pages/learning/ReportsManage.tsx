import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Users,
  BookOpen,
  TrendingUp,
  Download,
  Calendar,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useAdminCourses } from "@/hooks/useLMS";

const ReportsManage = () => {
  const { data: courses = [] } = useAdminCourses();

  // Mock analytics data
  const analytics = {
    totalStudents: 156,
    activeStudents: 89,
    totalEnrollments: 423,
    completionRate: 72,
    avgProgress: 65,
    totalLectures: 78,
    onlineLectures: 45,
    offlineLectures: 33,
  };

  const topCourses = [
    { name: "Jain Philosophy Fundamentals", enrollments: 45, completion: 78 },
    { name: "Introduction to Agam Sutras", enrollments: 38, completion: 65 },
    { name: "Prakrit Language Basics", enrollments: 32, completion: 82 },
    { name: "Manuscript Studies", enrollments: 28, completion: 55 },
    { name: "Jain History & Culture", enrollments: 25, completion: 70 },
  ];

  const recentActivity = [
    { type: "enrollment", message: "15 new enrollments this week", time: "2 hours ago" },
    { type: "completion", message: "8 students completed Agam course", time: "5 hours ago" },
    { type: "lecture", message: "New lecture added to Prakrit course", time: "1 day ago" },
    { type: "material", message: "Study materials updated for Philosophy course", time: "2 days ago" },
  ];

  return (
    <LearningLayout title="Reports & Analytics">
      <div className="space-y-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.totalStudents}</p>
                  <p className="text-xs text-muted-foreground">Total Students</p>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                +12 this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.totalEnrollments}</p>
                  <p className="text-xs text-muted-foreground">Enrollments</p>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                +28 this month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                  <CheckCircle className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.completionRate}%</p>
                  <p className="text-xs text-muted-foreground">Completion Rate</p>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                +5% from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-border">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-orange/10 text-orange">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{analytics.avgProgress}%</p>
                  <p className="text-xs text-muted-foreground">Avg Progress</p>
                </div>
              </div>
              <p className="text-xs text-green-600 mt-2">
                +3% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Courses */}
          <Card className="border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Top Courses</CardTitle>
                <CardDescription>By enrollment count</CardDescription>
              </div>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCourses.map((course, index) => (
                  <div key={course.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{course.name}</p>
                        <p className="text-xs text-muted-foreground">{course.enrollments} enrollments</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: `${course.completion}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{course.completion}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border-border">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates and changes</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">{activity.message}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Course Stats Summary */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Course Summary</CardTitle>
            <CardDescription>Overview of all courses and lectures</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Total Courses</span>
                </div>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">Total Lectures</span>
                </div>
                <p className="text-2xl font-bold">{analytics.totalLectures}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">Online Lectures</span>
                </div>
                <p className="text-2xl font-bold">{analytics.onlineLectures}</p>
              </div>
              <div className="p-4 rounded-xl bg-muted/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-orange" />
                  <span className="text-sm font-medium">Offline Lectures</span>
                </div>
                <p className="text-2xl font-bold">{analytics.offlineLectures}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </LearningLayout>
  );
};

export default ReportsManage;
