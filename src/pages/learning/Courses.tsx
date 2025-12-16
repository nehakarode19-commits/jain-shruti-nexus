import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { CourseCard } from "@/components/learning/CourseCard";
import { EnrollmentDialog } from "@/components/learning/EnrollmentDialog";
import { useCourses, useEnrollments, LMSCourse } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, BookOpen, GraduationCap, Video, Users, Sparkles, LogIn, Home } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { isDemoMode } from "@/components/learning/ProtectedStudentRoute";

const SUBJECTS = [
  "All Subjects",
  "Agam",
  "Jain Philosophy",
  "Manuscripts",
  "Guruvani",
  "Jain History",
  "Languages",
];

const LEVELS = ["All Levels", "Beginner", "Intermediate", "Advanced"];
const MODES = ["All Modes", "Online", "Offline", "Hybrid"];

export default function Courses() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAdminAuth();
  const isDemo = isDemoMode();
  const { data: courses, isLoading } = useCourses();
  const { data: enrollments } = useEnrollments();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [level, setLevel] = useState("All Levels");
  const [mode, setMode] = useState("All Modes");
  
  // Enrollment dialog state
  const [selectedCourse, setSelectedCourse] = useState<LMSCourse | null>(null);
  const [enrollDialogOpen, setEnrollDialogOpen] = useState(false);

  // Get enrolled course IDs
  const enrolledCourseIds = new Set(enrollments?.map(e => e.course_id) || []);

  const handleEnrollClick = (course: LMSCourse) => {
    if (!isAuthenticated) {
      // Redirect to login with return URL
      navigate("/learning/login", { state: { from: `/learning/courses/${course.id}` } });
      return;
    }
    setSelectedCourse(course);
    setEnrollDialogOpen(true);
  };

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subject === "All Subjects" || course.subject === subject;
    const matchesLevel = level === "All Levels" || course.level === level;
    const matchesMode = mode === "All Modes" || course.course_mode === mode;
    return matchesSearch && matchesSubject && matchesLevel && matchesMode;
  });

  // Calculate stats
  const totalCourses = courses?.length || 0;
  const onlineCourses = courses?.filter(c => c.course_mode === "Online").length || 0;
  const offlineCourses = courses?.filter(c => c.course_mode === "Offline").length || 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Simple Header */}
      <div className="bg-card border-b border-border py-4 px-4 md:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-lg font-semibold text-foreground">Learning Portal</h1>
              <p className="text-xs text-muted-foreground">Browse Courses</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Link>
            </Button>
            {(isAuthenticated || isDemo) ? (
              <Button size="sm" asChild>
                <Link to="/learning/student-dashboard">
                  My Dashboard
                </Link>
              </Button>
            ) : (
              <Button size="sm" asChild>
                <Link to="/learning/login">
                  <LogIn className="h-4 w-4 mr-2" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 space-y-8">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-background rounded-3xl p-8 md:p-10 overflow-hidden border border-primary/10">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <Badge className="bg-primary/10 text-primary border-primary/20 font-medium">
                <Sparkles className="h-3 w-3 mr-1" />
                Learning Portal
              </Badge>
            </div>
            
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-3">
              Explore Our Courses
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mb-6">
              Discover a wide range of courses on Jain philosophy, scriptures, manuscripts, and more. 
              Learn at your own pace with expert guidance.
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{totalCourses}</p>
                  <p className="text-xs text-muted-foreground">Total Courses</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Video className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{onlineCourses}</p>
                  <p className="text-xs text-muted-foreground">Online</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-card/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{offlineCourses}</p>
                  <p className="text-xs text-muted-foreground">Offline</p>
                </div>
              </div>
            </div>

            {/* Login CTA for non-authenticated users */}
            {!isAuthenticated && (
              <div className="mt-6 flex items-center gap-4">
                <Button asChild className="rounded-xl">
                  <Link to="/learning/login">
                    <LogIn className="h-4 w-4 mr-2" />
                    Login to Enroll
                  </Link>
                </Button>
                <span className="text-sm text-muted-foreground">
                  Sign in to enroll in courses and track your progress
                </span>
              </div>
            )}
            {isAuthenticated && (
              <div className="mt-6">
                <Button asChild variant="outline" className="rounded-xl">
                  <Link to="/learning/student-dashboard">
                    <GraduationCap className="h-4 w-4 mr-2" />
                    Go to My Dashboard
                  </Link>
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Search & Filters */}
        <div className="bg-card rounded-2xl p-6 shadow-sm border border-border space-y-5">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              placeholder="Search courses by title, description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-12 text-base rounded-xl bg-muted/50 border-border focus:bg-background"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <Select value={subject} onValueChange={setSubject}>
              <SelectTrigger className="w-full sm:w-[180px] h-11 rounded-xl">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {SUBJECTS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={level} onValueChange={setLevel}>
              <SelectTrigger className="w-full sm:w-[150px] h-11 rounded-xl">
                <SelectValue placeholder="Level" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {LEVELS.map((l) => (
                  <SelectItem key={l} value={l}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger className="w-full sm:w-[150px] h-11 rounded-xl">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                {MODES.map((m) => (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              className="h-11 rounded-xl border-border hover:bg-muted"
              onClick={() => {
                setSearch("");
                setSubject("All Subjects");
                setLevel("All Levels");
                setMode("All Modes");
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4 bg-card rounded-2xl p-4 border border-border">
                <Skeleton className="aspect-[16/10] rounded-xl" />
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-11 w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : filteredCourses && filteredCourses.length > 0 ? (
          <>
            <div className="flex items-center justify-between">
              <p className="text-muted-foreground font-medium">
                Showing <span className="text-foreground font-semibold">{filteredCourses.length}</span> course{filteredCourses.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <CourseCard 
                  key={course.id} 
                  course={course} 
                  onEnroll={handleEnrollClick}
                  isEnrolled={enrolledCourseIds.has(course.id)}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-20 bg-card rounded-2xl border border-border">
            <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-muted-foreground/40" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">
              No courses found
            </h3>
            <p className="text-muted-foreground max-w-md mx-auto">
              Try adjusting your filters or check back later for new courses.
            </p>
            <Button 
              variant="outline" 
              className="mt-6 rounded-xl"
              onClick={() => {
                setSearch("");
                setSubject("All Subjects");
                setLevel("All Levels");
                setMode("All Modes");
              }}
            >
              <Filter className="h-4 w-4 mr-2" />
              Clear All Filters
            </Button>
          </div>
        )}
      </div>

      {/* Enrollment Dialog */}
      <EnrollmentDialog 
        course={selectedCourse}
        open={enrollDialogOpen}
        onOpenChange={setEnrollDialogOpen}
      />
    </div>
  );
}
