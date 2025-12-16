import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, Play, ArrowRight, Globe, GraduationCap } from "lucide-react";
import { LMSCourse } from "@/hooks/useLMS";

interface CourseCardProps {
  course: LMSCourse;
  showEnrollButton?: boolean;
  onEnroll?: (course: LMSCourse) => void;
  isEnrolled?: boolean;
}

export function CourseCard({ course, showEnrollButton = true, onEnroll, isEnrolled = false }: CourseCardProps) {
  const getModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "online":
        return "bg-emerald-500/10 text-emerald-700 border-emerald-200";
      case "offline":
        return "bg-blue-500/10 text-blue-700 border-blue-200";
      case "hybrid":
        return "bg-violet-500/10 text-violet-700 border-violet-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-primary/10 text-primary border-primary/20";
      case "intermediate":
        return "bg-amber-500/10 text-amber-700 border-amber-200";
      case "advanced":
        return "bg-rose-500/10 text-rose-700 border-rose-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 bg-card rounded-2xl">
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-10 w-10 text-primary/50" />
            </div>
          </div>
        )}
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Mode Badge */}
        <Badge className={`absolute top-4 left-4 ${getModeColor(course.course_mode)} font-medium shadow-sm`}>
          {course.course_mode}
        </Badge>

        {/* Enrolled Badge */}
        {isEnrolled && (
          <Badge className="absolute top-4 right-4 bg-green-500 text-white font-medium shadow-sm">
            Enrolled
          </Badge>
        )}

        {/* Play overlay on hover */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="w-16 h-16 rounded-full bg-card/95 shadow-xl flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform duration-500">
            <Play className="h-7 w-7 text-primary ml-1" />
          </div>
        </div>
      </div>

      <CardContent className="p-5 space-y-4">
        {/* Subject & Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs font-medium border-border">
            {course.subject}
          </Badge>
          <Badge className={`text-xs font-medium ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight">
          {course.title}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {course.description}
          </p>
        )}

        {/* Divider */}
        <div className="h-px bg-border/50" />

        {/* Meta info */}
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-4">
            {course.instructor_name && (
              <div className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-primary/70" />
                <span className="truncate max-w-[100px] font-medium">{course.instructor_name}</span>
              </div>
            )}
            {course.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-primary/70" />
                <span>{course.duration}</span>
              </div>
            )}
          </div>
          {course.language && (
            <div className="flex items-center gap-1">
              <Globe className="h-3.5 w-3.5" />
              <span className="text-xs">{course.language}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {showEnrollButton && (
          <div className="flex gap-2 mt-2">
            <Button asChild variant="outline" className="flex-1 rounded-xl h-11">
              <Link to={`/learning/courses/${course.id}`} className="flex items-center justify-center gap-2">
                View Details
              </Link>
            </Button>
            {isEnrolled ? (
              <Button asChild className="flex-1 bg-green-600 hover:bg-green-700 rounded-xl h-11">
                <Link to="/learning/my-courses" className="flex items-center justify-center gap-2">
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            ) : (
              <Button 
                onClick={() => onEnroll?.(course)}
                className="flex-1 bg-primary hover:bg-primary/90 rounded-xl h-11"
              >
                <GraduationCap className="h-4 w-4 mr-2" />
                Enroll
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
