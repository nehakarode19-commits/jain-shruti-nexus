import { StudentLayout } from "@/components/learning/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Calendar, BookOpen, Trophy, Star } from "lucide-react";
import { useCertificates } from "@/hooks/useLMSCertificates";
import { useCourses } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { CertificateCard } from "@/components/learning/CertificateCard";
import { generateCertificatePDF } from "@/lib/certificateGenerator";
import { Skeleton } from "@/components/ui/skeleton";
import type { LMSCertificate } from "@/hooks/useLMSCertificates";

export default function MyCertificates() {
  const { user } = useAdminAuth();
  const { data: certificates, isLoading: loadingCerts } = useCertificates(user?.id);
  const { data: courses } = useCourses();

  const getCourseName = (courseId: string | null) => {
    if (!courseId || !courses) return "Course Completion";
    const course = courses.find(c => c.id === courseId);
    return course?.title || "Course Completion";
  };

  const handleDownload = (certificate: LMSCertificate) => {
    generateCertificatePDF({
      certificate,
      studentName: user?.email || "Student",
      courseName: getCourseName(certificate.course_id),
    });
  };

  // Mock certificates for demo
  const mockCertificates: LMSCertificate[] = [
    {
      id: "1",
      user_id: user?.id || "",
      course_id: null,
      program_id: null,
      certificate_number: "CERT-2024-JF001",
      certificate_url: null,
      issued_at: "2024-11-15T10:00:00Z",
      valid_until: "2027-11-15T10:00:00Z",
    },
    {
      id: "2",
      user_id: user?.id || "",
      course_id: null,
      program_id: null,
      certificate_number: "CERT-2024-AA002",
      certificate_url: null,
      issued_at: "2024-10-20T10:00:00Z",
      valid_until: null,
    },
  ];

  const displayCertificates = certificates?.length ? certificates : mockCertificates;
  const mockCourseNames = ["Jain Philosophy Foundation", "Advanced Agam Studies"];

  return (
    <StudentLayout title="My Certificates">
      <div className="space-y-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background p-8">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-xl">
                <Trophy className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h1 className="text-3xl font-display font-bold text-foreground">
                  My Certificates
                </h1>
                <p className="text-muted-foreground">
                  Your achievements and course completions
                </p>
              </div>
            </div>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{displayCertificates.length}</p>
                <p className="text-sm text-muted-foreground">Total Certificates</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{displayCertificates.length}</p>
                <p className="text-sm text-muted-foreground">Courses Completed</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/10">
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-yellow-500/10 rounded-xl">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">Excellence</p>
                <p className="text-sm text-muted-foreground">Achievement Level</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Certificates Grid */}
        <div>
          <h2 className="text-xl font-display font-semibold text-foreground mb-6">
            Your Certificates
          </h2>
          
          {loadingCerts ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="border-primary/10">
                  <CardContent className="p-6 space-y-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-10 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : displayCertificates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayCertificates.map((cert, index) => (
                <CertificateCard
                  key={cert.id}
                  certificate={cert}
                  courseName={certificates?.length ? getCourseName(cert.course_id) : mockCourseNames[index]}
                  onDownload={handleDownload}
                />
              ))}
            </div>
          ) : (
            <Card className="border-primary/10">
              <CardContent className="p-12 text-center">
                <div className="p-4 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                  <Award className="h-12 w-12 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  No Certificates Yet
                </h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Complete courses to earn certificates. Your achievements will be displayed here.
                </p>
                <Button className="mt-6" asChild>
                  <a href="/learning/courses">Browse Courses</a>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </StudentLayout>
  );
}
