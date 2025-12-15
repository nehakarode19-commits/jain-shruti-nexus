import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { useCourse, useIsEnrolled, useEnrollCourse } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <div className="container max-w-6xl mx-auto px-4 py-12">
          <Skeleton className="h-8 w-1/3 mb-4" />
          <Skeleton className="h-64 w-full rounded-2xl mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
            <Skeleton className="h-48" />
          </div>
        </div>
      </Layout>
    );
  }

  if (!data?.course) {
    return (
      <Layout>
        <div className="container max-w-6xl mx-auto px-4 py-24 text-center">
          <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
          <h2 className="font-heading text-2xl font-bold mb-2">Course Not Found</h2>
          <p className="text-muted-foreground mb-6">
            The course you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/learning/courses">Browse Courses</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const { course, lectures, materials } = data;
  const onlineLectures = lectures.filter((l) => l.lecture_type === "Online");
  const offlineLectures = lectures.filter((l) => l.lecture_type === "Offline");

  return (
    <Layout>
      <SEO
        title={`${course.title} | Jambushrusti Learning Portal`}
        description={course.description || `Learn ${course.subject} with this ${course.level} level course.`}
      />

      {/* Hero */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="md:col-span-2">
              <div className="flex flex-wrap gap-2 mb-4">
                <Badge variant="outline">{course.subject}</Badge>
                <Badge className="bg-primary/10 text-primary">{course.level}</Badge>
                <Badge className="bg-orange/10 text-orange border-orange/20">
                  {course.course_mode}
                </Badge>
              </div>

              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                {course.title}
              </h1>

              {course.description && (
                <p className="text-lg text-muted-foreground mb-6">{course.description}</p>
              )}

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                {course.instructor_name && (
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    <span>{course.instructor_name}</span>
                  </div>
                )}
                {course.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    <span>{course.duration}</span>
                  </div>
                )}
                {course.language && (
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    <span>{course.language}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Enrollment Card */}
            <Card className="self-start">
              <CardContent className="p-6 space-y-4">
                {course.thumbnail_url ? (
                  <img
                    src={course.thumbnail_url}
                    alt={course.title}
                    className="w-full aspect-video object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full aspect-video bg-primary/10 rounded-lg flex items-center justify-center">
                    <BookOpen className="h-12 w-12 text-primary/40" />
                  </div>
                )}

                {isAuthenticated ? (
                  isEnrolled ? (
                    <Button asChild className="w-full" size="lg">
                      <Link to="/learning/dashboard">
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Go to Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleEnroll}
                      disabled={enrollMutation.isPending || checkingEnrollment}
                    >
                      {enrollMutation.isPending ? "Enrolling..." : "Enroll Now"}
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

                <div className="text-sm text-muted-foreground space-y-2">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4" />
                    <span>{lectures.length} lectures</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    <span>{materials.length} study materials</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Course Content */}
      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <Tabs defaultValue="curriculum" className="space-y-6">
            <TabsList className="bg-muted/50">
              <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
              <TabsTrigger value="materials">Study Materials</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="curriculum" className="space-y-6">
              {/* Online Lectures */}
              {onlineLectures.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Video className="h-5 w-5 text-primary" />
                      Online Lectures ({onlineLectures.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {onlineLectures.map((lecture, index) => (
                      <div
                        key={lecture.id}
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
                          {index + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {lecture.title}
                          </h4>
                          {lecture.speaker && (
                            <p className="text-sm text-muted-foreground">
                              By {lecture.speaker}
                            </p>
                          )}
                        </div>
                        {lecture.duration_minutes && (
                          <span className="text-sm text-muted-foreground">
                            {lecture.duration_minutes} min
                          </span>
                        )}
                        {isEnrolled ? (
                          <Button size="sm" variant="ghost">
                            <Play className="h-4 w-4" />
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
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-orange" />
                      Offline Sessions ({offlineLectures.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {offlineLectures.map((lecture) => (
                      <div
                        key={lecture.id}
                        className="flex items-start gap-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                          <MapPin className="h-5 w-5 text-orange" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground">
                            {lecture.title}
                          </h4>
                          {lecture.venue && (
                            <p className="text-sm text-muted-foreground">
                              Venue: {lecture.venue}
                            </p>
                          )}
                          {lecture.scheduled_date && (
                            <p className="text-sm text-muted-foreground">
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
                <div className="text-center py-12 text-muted-foreground">
                  <Video className="h-12 w-12 mx-auto mb-4 opacity-40" />
                  <p>No lectures available yet. Check back soon!</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="materials">
              {materials.length > 0 ? (
                <Card>
                  <CardContent className="p-6 space-y-3">
                    {materials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center gap-4 p-4 bg-muted/30 rounded-lg"
                      >
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-foreground truncate">
                            {material.title}
                          </h4>
                          {material.file_type && (
                            <p className="text-sm text-muted-foreground uppercase">
                              {material.file_type}
                            </p>
                          )}
                        </div>
                        {isEnrolled ? (
                          <Button size="sm" variant="outline" asChild>
                            <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </a>
                          </Button>
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                    ))}
                  </CardContent>
                </Card>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-4 opacity-40" />
                  <p>No study materials available yet.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="about">
              <Card>
                <CardContent className="p-6 prose prose-gray max-w-none">
                  <h3>About This Course</h3>
                  <p>{course.description || "No detailed description available."}</p>

                  {course.instructor_name && (
                    <>
                      <h4>Instructor</h4>
                      <p>{course.instructor_name}</p>
                    </>
                  )}

                  <h4>Course Details</h4>
                  <ul>
                    <li><strong>Subject:</strong> {course.subject}</li>
                    <li><strong>Level:</strong> {course.level}</li>
                    <li><strong>Mode:</strong> {course.course_mode}</li>
                    {course.language && <li><strong>Language:</strong> {course.language}</li>}
                    {course.duration && <li><strong>Duration:</strong> {course.duration}</li>}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
}
