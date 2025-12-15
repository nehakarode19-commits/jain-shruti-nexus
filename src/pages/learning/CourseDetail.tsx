import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { useCourse, useIsEnrolled, useEnrollCourse } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Clock,
  Users,
  BookOpen,
  Play,
  FileText,
  Calendar,
  MapPin,
  CheckCircle,
  Lock,
  Video,
  Download,
  GraduationCap,
  Globe,
  Award,
  Star,
  ArrowLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";

export default function CourseDetail() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data, isLoading } = useCourse(courseId || "");
  const { data: isEnrolled, isLoading: checkingEnrollment } = useIsEnrolled(courseId || "");
  const { isAuthenticated } = useAdminAuth();
  const enrollMutation = useEnrollCourse();

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error("Please login to enroll in this course");
      return;
    }

    try {
      await enrollMutation.mutateAsync(courseId || "");
      toast.success("Successfully enrolled in the course!");
    } catch (error) {
      toast.error("Failed to enroll. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background">
          <div className="container max-w-7xl mx-auto px-4 py-8">
            <Skeleton className="h-6 w-32 mb-6" />
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-24 w-full" />
                <div className="flex gap-4">
                  <Skeleton className="h-12 w-32" />
                  <Skeleton className="h-12 w-32" />
                </div>
              </div>
              <Skeleton className="h-96 rounded-2xl" />
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (!data?.course) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-b from-secondary/30 to-background flex items-center justify-center">
          <div className="text-center px-4">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="h-10 w-10 text-primary/50" />
            </div>
            <h2 className="font-heading text-2xl font-bold mb-3">Course Not Found</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              The course you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild size="lg">
              <Link to="/learning/courses">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Browse Courses
              </Link>
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const { course, lectures, materials } = data;
  const onlineLectures = lectures.filter((l) => l.lecture_type === "Online");
  const offlineLectures = lectures.filter((l) => l.lecture_type === "Offline");
  const totalDuration = lectures.reduce((acc, l) => acc + (l.duration_minutes || 0), 0);

  const courseFeatures = [
    { icon: Video, label: `${lectures.length} Lectures`, color: "text-blue-600" },
    { icon: FileText, label: `${materials.length} Materials`, color: "text-green-600" },
    { icon: Clock, label: `${totalDuration} min`, color: "text-orange-600" },
    { icon: Award, label: "Certificate", color: "text-purple-600" },
  ];

  return (
    <Layout>
      <SEO
        title={`${course.title} | Jambushrusti Learning Portal`}
        description={course.description || `Learn ${course.subject} with this ${course.level} level course.`}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/10 via-secondary/50 to-background overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-20 w-96 h-96 bg-gold rounded-full blur-3xl" />
        </div>

        <div className="container max-w-7xl mx-auto px-4 py-8 relative">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/learning/courses" className="hover:text-primary transition-colors">
              Courses
            </Link>
            <ChevronRight className="h-4 w-4" />
            <span className="text-foreground truncate max-w-[200px]">{course.title}</span>
          </nav>

          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Course Info */}
            <div className="lg:col-span-2 space-y-6">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-primary/10 text-primary border-primary/20 px-3 py-1">
                  <GraduationCap className="h-3 w-3 mr-1" />
                  {course.subject}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  <Star className="h-3 w-3 mr-1 fill-gold text-gold" />
                  {course.level}
                </Badge>
                <Badge className={`px-3 py-1 ${course.course_mode === 'Online' ? 'bg-green-100 text-green-700 border-green-200' : 'bg-orange-100 text-orange-700 border-orange-200'}`}>
                  <Globe className="h-3 w-3 mr-1" />
                  {course.course_mode}
                </Badge>
              </div>

              {/* Title */}
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                {course.title}
              </h1>

              {/* Description */}
              {course.description && (
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              )}

              {/* Instructor & Meta */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                {course.instructor_name && (
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-primary-foreground font-bold text-lg">
                      {course.instructor_name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Instructor</p>
                      <p className="font-medium">{course.instructor_name}</p>
                    </div>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.language && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Globe className="h-5 w-5" />
                    <span>{course.language}</span>
                  </div>
                )}
              </div>

              {/* Course Features */}
              <div className="flex flex-wrap gap-4 pt-4">
                {courseFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-background/80 backdrop-blur-sm px-4 py-2 rounded-full border shadow-sm">
                    <feature.icon className={`h-4 w-4 ${feature.color}`} />
                    <span className="text-sm font-medium">{feature.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Enrollment Card */}
            <div className="lg:row-span-2">
              <Card className="sticky top-24 overflow-hidden border-2 shadow-xl">
                {/* Thumbnail */}
                {course.thumbnail_url ? (
                  <div className="relative">
                    <img
                      src={course.thumbnail_url}
                      alt={course.title}
                      className="w-full aspect-video object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <Badge className="bg-white/90 text-foreground">
                        <Sparkles className="h-3 w-3 mr-1 text-gold" />
                        Featured Course
                      </Badge>
                    </div>
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-gradient-to-br from-primary/20 to-gold/20 flex items-center justify-center">
                    <BookOpen className="h-16 w-16 text-primary/40" />
                  </div>
                )}

                <CardContent className="p-6 space-y-5">
                  {/* Price/Free Badge */}
                  <div className="flex items-center justify-between">
                    <div>
                      {course.is_paid ? (
                        <p className="text-3xl font-bold text-primary">₹{course.price}</p>
                      ) : (
                        <Badge className="bg-green-100 text-green-700 border-green-200 text-lg px-4 py-1">
                          Free Course
                        </Badge>
                      )}
                    </div>
                    {isEnrolled && (
                      <Badge className="bg-primary text-primary-foreground">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Enrolled
                      </Badge>
                    )}
                  </div>

                  {/* Enrollment Button */}
                  {isAuthenticated ? (
                    isEnrolled ? (
                      <Button asChild className="w-full" size="lg">
                        <Link to="/learning/student-dashboard">
                          <Play className="h-5 w-5 mr-2" />
                          Continue Learning
                        </Link>
                      </Button>
                    ) : (
                      <Button
                        className="w-full"
                        size="lg"
                        onClick={handleEnroll}
                        disabled={enrollMutation.isPending || checkingEnrollment}
                      >
                        {enrollMutation.isPending ? (
                          "Enrolling..."
                        ) : (
                          <>
                            <GraduationCap className="h-5 w-5 mr-2" />
                            Enroll Now
                          </>
                        )}
                      </Button>
                    )
                  ) : (
                    <Button asChild className="w-full" size="lg">
                      <Link to="/learning/login">
                        <Lock className="h-5 w-5 mr-2" />
                        Login to Enroll
                      </Link>
                    </Button>
                  )}

                  {/* Course Includes */}
                  <div className="pt-4 border-t space-y-3">
                    <p className="font-medium text-sm text-muted-foreground uppercase tracking-wide">
                      This course includes:
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-sm">
                        <Video className="h-4 w-4 text-primary" />
                        <span>{lectures.length} video lectures</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <FileText className="h-4 w-4 text-primary" />
                        <span>{materials.length} downloadable resources</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Clock className="h-4 w-4 text-primary" />
                        <span>Lifetime access</span>
                      </div>
                      <div className="flex items-center gap-3 text-sm">
                        <Award className="h-4 w-4 text-primary" />
                        <span>Certificate of completion</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Course Content Tabs */}
      <section className="py-12 bg-background">
        <div className="container max-w-7xl mx-auto px-4">
          <Tabs defaultValue="curriculum" className="space-y-8">
            <TabsList className="bg-secondary/50 p-1 rounded-xl inline-flex">
              <TabsTrigger value="curriculum" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6">
                <Video className="h-4 w-4 mr-2" />
                Curriculum
              </TabsTrigger>
              <TabsTrigger value="materials" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6">
                <FileText className="h-4 w-4 mr-2" />
                Materials
              </TabsTrigger>
              <TabsTrigger value="about" className="rounded-lg data-[state=active]:bg-background data-[state=active]:shadow-sm px-6">
                <BookOpen className="h-4 w-4 mr-2" />
                About
              </TabsTrigger>
            </TabsList>

            {/* Curriculum Tab */}
            <TabsContent value="curriculum" className="space-y-8">
              {/* Progress Bar (if enrolled) */}
              {isEnrolled && (
                <Card className="bg-gradient-to-r from-primary/5 to-gold/5 border-primary/20">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-medium">Your Progress</span>
                      <span className="text-sm text-muted-foreground">0/{lectures.length} completed</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </CardContent>
                </Card>
              )}

              {/* Online Lectures */}
              {onlineLectures.length > 0 && (
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                        <Video className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <span>Online Lectures</span>
                        <p className="text-sm font-normal text-muted-foreground mt-0.5">
                          {onlineLectures.length} video lectures available
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 divide-y">
                    {onlineLectures.map((lecture, index) => (
                      <div
                        key={lecture.id}
                        className="flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors group"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {lecture.title}
                          </h4>
                          {lecture.speaker && (
                            <p className="text-sm text-muted-foreground mt-0.5">
                              By {lecture.speaker}
                            </p>
                          )}
                        </div>
                        {lecture.duration_minutes && (
                          <Badge variant="outline" className="text-xs">
                            <Clock className="h-3 w-3 mr-1" />
                            {lecture.duration_minutes} min
                          </Badge>
                        )}
                        {isEnrolled ? (
                          <Button size="sm" variant="ghost" className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <Play className="h-4 w-4 mr-1" />
                            Play
                          </Button>
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {/* Offline Lectures */}
              {offlineLectures.length > 0 && (
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/20 dark:to-amber-950/20">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/50 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <span>Offline Sessions</span>
                        <p className="text-sm font-normal text-muted-foreground mt-0.5">
                          {offlineLectures.length} in-person sessions scheduled
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 divide-y">
                    {offlineLectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="flex items-start gap-4 p-5 hover:bg-secondary/30 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-100 to-amber-100 dark:from-orange-900/30 dark:to-amber-900/30 flex items-center justify-center shrink-0">
                          <MapPin className="h-5 w-5 text-orange-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground mb-1">
                            {lecture.title}
                          </h4>
                          {lecture.venue && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {lecture.venue}
                            </p>
                          )}
                          {lecture.scheduled_date && (
                            <p className="text-sm text-primary font-medium mt-2 flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {new Date(lecture.scheduled_date).toLocaleDateString("en-IN", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}

              {lectures.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <Video className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Lectures Yet</h3>
                  <p className="text-muted-foreground">Lectures will be added soon. Check back later!</p>
                </div>
              )}
            </TabsContent>

            {/* Materials Tab */}
            <TabsContent value="materials">
              {materials.length > 0 ? (
                <Card className="overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
                    <CardTitle className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/50 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <span>Study Materials</span>
                        <p className="text-sm font-normal text-muted-foreground mt-0.5">
                          {materials.length} resources available for download
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 divide-y">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center gap-4 p-5 hover:bg-secondary/30 transition-colors group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {material.title}
                          </h4>
                          {material.file_type && (
                            <p className="text-xs text-muted-foreground uppercase mt-0.5">
                              {material.file_type} file
                            </p>
                          )}
                        </div>
                        {isEnrolled ? (
                          <Button size="sm" variant="outline" asChild>
                            <a href={material.file_url || '#'} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Lock className="h-4 w-4" />
                            <span className="text-sm">Enroll to access</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mx-auto mb-6">
                    <FileText className="h-10 w-10 text-muted-foreground/50" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">No Materials Yet</h3>
                  <p className="text-muted-foreground">Study materials will be added soon.</p>
                </div>
              )}
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <div className="grid md:grid-cols-2 gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Course</CardTitle>
                  </CardHeader>
                  <CardContent className="prose prose-gray max-w-none">
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description || "No detailed description available for this course. Please contact the instructor for more information."}
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-secondary/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Subject</p>
                        <p className="font-semibold">{course.subject}</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Level</p>
                        <p className="font-semibold">{course.level}</p>
                      </div>
                      <div className="p-4 bg-secondary/50 rounded-xl">
                        <p className="text-sm text-muted-foreground mb-1">Mode</p>
                        <p className="font-semibold">{course.course_mode}</p>
                      </div>
                      {course.language && (
                        <div className="p-4 bg-secondary/50 rounded-xl">
                          <p className="text-sm text-muted-foreground mb-1">Language</p>
                          <p className="font-semibold">{course.language}</p>
                        </div>
                      )}
                      {course.duration && (
                        <div className="p-4 bg-secondary/50 rounded-xl col-span-2">
                          <p className="text-sm text-muted-foreground mb-1">Duration</p>
                          <p className="font-semibold">{course.duration}</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {course.instructor_name && (
                  <Card className="md:col-span-2">
                    <CardHeader>
                      <CardTitle>Meet Your Instructor</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-gold flex items-center justify-center text-primary-foreground font-bold text-2xl">
                          {course.instructor_name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-lg">{course.instructor_name}</h4>
                          <p className="text-muted-foreground">Course Instructor</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      {!isEnrolled && (
        <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary to-gold/10">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <h2 className="font-heading text-3xl font-bold mb-4">
              Ready to Start Learning?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of learners exploring Jain philosophy and heritage.
            </p>
            {isAuthenticated ? (
              <Button size="lg" onClick={handleEnroll} disabled={enrollMutation.isPending}>
                <GraduationCap className="h-5 w-5 mr-2" />
                {enrollMutation.isPending ? "Enrolling..." : "Enroll in This Course"}
              </Button>
            ) : (
              <Button size="lg" asChild>
                <Link to="/learning/login">
                  <Lock className="h-5 w-5 mr-2" />
                  Login to Get Started
                </Link>
              </Button>
            )}
          </div>
        </section>
      )}
    </Layout>
  );
}
