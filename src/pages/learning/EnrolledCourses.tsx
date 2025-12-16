import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  BookOpen, 
  Clock, 
  Play, 
  CheckCircle2, 
  Calendar,
  GraduationCap,
  ArrowRight,
  Trophy
} from "lucide-react";
import { Link } from "react-router-dom";
import { useEnrollments, useCourses } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

// Mock enrolled courses for demo
const mockEnrolledCourses = [
  {
    id: "1",
    title: "Jain Philosophy Foundation",
    instructor: "Dr. Mahesh Joshi",
    thumbnail: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
    progress: 65,
    totalLectures: 12,
    completedLectures: 8,
    lastAccessed: "2024-12-14",
    enrolledAt: "2024-10-01",
    status: "in_progress",
    nextLecture: "Understanding Karma Theory",
  },
  {
    id: "2",
    title: "Advanced Agam Studies",
    instructor: "Prof. Priya Mehta",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400",
    progress: 30,
    totalLectures: 20,
    completedLectures: 6,
    lastAccessed: "2024-12-12",
    enrolledAt: "2024-11-15",
    status: "in_progress",
    nextLecture: "Agam Structure Analysis",
  },
  {
    id: "3",
    title: "Sanskrit for Jain Texts",
    instructor: "Dr. Ramesh Sharma",
    thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400",
    progress: 100,
    totalLectures: 8,
    completedLectures: 8,
    lastAccessed: "2024-12-10",
    enrolledAt: "2024-09-01",
    status: "completed",
    nextLecture: null,
  },
  {
    id: "4",
    title: "Jain History & Heritage",
    instructor: "Dr. Anita Patel",
    thumbnail: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
    progress: 0,
    totalLectures: 15,
    completedLectures: 0,
    lastAccessed: null,
    enrolledAt: "2024-12-10",
    status: "not_started",
    nextLecture: "Introduction to Jain History",
  },
];

export default function EnrolledCourses() {
  const { user } = useAdminAuth();
  const { data: enrollments, isLoading: loadingEnrollments } = useEnrollments();
  const { data: courses, isLoading: loadingCourses } = useCourses();

  const isLoading = loadingEnrollments || loadingCourses;

  // Use mock data for demo
  const displayCourses = mockEnrolledCourses;

  const inProgressCourses = displayCourses.filter(c => c.status === "in_progress");
  const completedCourses = displayCourses.filter(c => c.status === "completed");
  const notStartedCourses = displayCourses.filter(c => c.status === "not_started");

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20">Completed</Badge>;
      case "in_progress":
        return <Badge className="bg-primary/10 text-primary border-primary/20">In Progress</Badge>;
      default:
        return <Badge variant="secondary">Not Started</Badge>;
    }
  };

  const CourseCard = ({ course }: { course: typeof mockEnrolledCourses[0] }) => (
    <Card className="group hover:shadow-lg transition-all duration-300 border-primary/10 overflow-hidden">
      <div className="relative h-40 overflow-hidden">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          {getStatusBadge(course.status)}
          {course.status === "completed" && (
            <div className="p-1.5 bg-green-500 rounded-full">
              <CheckCircle2 className="h-4 w-4 text-white" />
            </div>
          )}
        </div>
      </div>
      
      <CardContent className="p-4 space-y-4">
        <div>
          <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {course.title}
          </h3>
          <p className="text-sm text-muted-foreground">{course.instructor}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium text-foreground">{course.progress}%</span>
          </div>
          <Progress value={course.progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {course.completedLectures} of {course.totalLectures} lectures completed
          </p>
        </div>

        {/* Next Lecture or Completion */}
        {course.nextLecture && (
          <div className="p-3 bg-secondary/50 rounded-lg">
            <p className="text-xs text-muted-foreground mb-1">Next up:</p>
            <p className="text-sm font-medium text-foreground line-clamp-1">{course.nextLecture}</p>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Enrolled {format(new Date(course.enrolledAt), "MMM dd, yyyy")}</span>
          </div>
        </div>

        {/* Action Button */}
        <Button asChild className="w-full gap-2" variant={course.status === "completed" ? "outline" : "default"}>
          <Link to={`/learning/courses/${course.id}`}>
            {course.status === "completed" ? (
              <>
                <Trophy className="h-4 w-4" />
                View Certificate
              </>
            ) : course.status === "not_started" ? (
              <>
                <Play className="h-4 w-4" />
                Start Course
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Continue Learning
              </>
            )}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <LearningLayout>
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <GraduationCap className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  My Enrolled Courses
                </h1>
                <p className="text-muted-foreground">
                  Track your learning journey and continue where you left off
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-primary/10">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{displayCourses.length}</p>
                <p className="text-xs text-muted-foreground">Total Enrolled</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{inProgressCourses.length}</p>
                <p className="text-xs text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{completedCourses.length}</p>
                <p className="text-xs text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Play className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{notStartedCourses.length}</p>
                <p className="text-xs text-muted-foreground">Not Started</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* In Progress Courses */}
        {inProgressCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-primary" />
              <h2 className="text-xl font-display font-semibold text-foreground">
                Continue Learning
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inProgressCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Not Started Courses */}
        {notStartedCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Play className="h-5 w-5 text-yellow-600" />
              <h2 className="text-xl font-display font-semibold text-foreground">
                Ready to Start
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {notStartedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Completed Courses */}
        {completedCourses.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <h2 className="text-xl font-display font-semibold text-foreground">
                Completed
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {completedCourses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {displayCourses.length === 0 && (
          <Card className="border-primary/10">
            <CardContent className="p-12 text-center">
              <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="h-12 w-12 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Enrolled Courses Yet
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-6">
                Start your learning journey by enrolling in courses that interest you.
              </p>
              <Button asChild>
                <Link to="/learning/courses" className="gap-2">
                  Browse Courses
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </LearningLayout>
  );
}
