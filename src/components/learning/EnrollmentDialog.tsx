import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, BookOpen, GraduationCap, CheckCircle2 } from "lucide-react";
import { LMSCourse, useEnrollCourse } from "@/hooks/useLMS";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface EnrollmentDialogProps {
  course: LMSCourse | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnrollmentDialog({ course, open, onOpenChange }: EnrollmentDialogProps) {
  const { isAuthenticated } = useAdminAuth();
  const { mutate: enroll, isPending } = useEnrollCourse();
  const navigate = useNavigate();

  const handleEnroll = () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to enroll in courses");
      navigate("/auth");
      onOpenChange(false);
      return;
    }

    if (!course) return;

    enroll(course.id, {
      onSuccess: () => {
        toast.success("Successfully enrolled!", {
          description: `You are now enrolled in "${course.title}"`,
        });
        onOpenChange(false);
        navigate("/learning/my-courses");
      },
      onError: (error) => {
        if (error.message.includes("duplicate")) {
          toast.error("Already enrolled", {
            description: "You are already enrolled in this course",
          });
        } else {
          toast.error("Enrollment failed", {
            description: error.message,
          });
        }
        onOpenChange(false);
      },
    });
  };

  if (!course) return null;

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <AlertDialogTitle className="text-xl">Enroll in Course</AlertDialogTitle>
          </div>
          <AlertDialogDescription asChild>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                You're about to enroll in this course. Once enrolled, you'll have access to all course materials and lectures.
              </p>
              
              {/* Course Preview */}
              <div className="p-4 bg-secondary/50 rounded-lg space-y-3">
                <h4 className="font-semibold text-foreground line-clamp-2">{course.title}</h4>
                
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="text-xs">
                    {course.subject}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {course.level}
                  </Badge>
                  <Badge variant="secondary" className="text-xs">
                    {course.course_mode}
                  </Badge>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  {course.instructor_name && (
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{course.instructor_name}</span>
                    </div>
                  )}
                  {course.duration && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{course.duration}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Benefits */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-foreground">What you'll get:</p>
                <ul className="space-y-1.5 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Full access to all lectures
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Downloadable study materials
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                    Progress tracking & certificates
                  </li>
                </ul>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 sm:gap-0">
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleEnroll} 
            disabled={isPending}
            className="bg-primary hover:bg-primary/90"
          >
            {isPending ? "Enrolling..." : "Confirm Enrollment"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
