import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Users, BookOpen, Play } from "lucide-react";
import { LMSCourse } from "@/hooks/useLMS";

interface CourseCardProps {
  course: LMSCourse;
  showEnrollButton?: boolean;
}

export function CourseCard({ course, showEnrollButton = true }: CourseCardProps) {
  const getModeColor = (mode: string) => {
    switch (mode.toLowerCase()) {
      case "online":
        return "bg-green-100 text-green-800 border-green-200";
      case "offline":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "hybrid":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "beginner":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "intermediate":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "advanced":
        return "bg-rose-100 text-rose-800 border-rose-200";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="group overflow-hidden border border-border hover:shadow-lg transition-all duration-300 bg-card">
      {/* Thumbnail */}
      <div className="relative aspect-video overflow-hidden bg-muted">
        {course.thumbnail_url ? (
          <img
            src={course.thumbnail_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-primary/10">
            <BookOpen className="h-12 w-12 text-primary/40" />
          </div>
        )}
        
        {/* Mode Badge */}
        <Badge className={`absolute top-3 left-3 ${getModeColor(course.course_mode)}`}>
          {course.course_mode}
        </Badge>

        {/* Play overlay on hover */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center">
            <Play className="h-6 w-6 text-primary ml-1" />
          </div>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Subject & Level */}
        <div className="flex items-center gap-2 flex-wrap">
          <Badge variant="outline" className="text-xs">
            {course.subject}
          </Badge>
          <Badge className={`text-xs ${getLevelColor(course.level)}`}>
            {course.level}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="font-heading font-semibold text-lg text-foreground line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>

        {/* Description */}
        {course.description && (
          <p className="text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        )}

        {/* Meta info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {course.instructor_name && (
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="truncate max-w-[120px]">{course.instructor_name}</span>
            </div>
          )}
          {course.duration && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
          )}
        </div>

        {/* Language */}
        {course.language && (
          <p className="text-xs text-muted-foreground">
            Language: {course.language}
          </p>
        )}

        {/* Action Button */}
        {showEnrollButton && (
          <Button asChild className="w-full mt-2 bg-primary hover:bg-primary/90">
            <Link to={`/learning/courses/${course.id}`}>
              View Course
            </Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
