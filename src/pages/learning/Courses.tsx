import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { SEO } from "@/components/shared/SEO";
import { CourseCard } from "@/components/learning/CourseCard";
import { useCourses } from "@/hooks/useLMS";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, GraduationCap, Filter, BookOpen } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

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
  const { data: courses, isLoading } = useCourses();
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All Subjects");
  const [level, setLevel] = useState("All Levels");
  const [mode, setMode] = useState("All Modes");

  const filteredCourses = courses?.filter((course) => {
    const matchesSearch =
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.description?.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subject === "All Subjects" || course.subject === subject;
    const matchesLevel = level === "All Levels" || course.level === level;
    const matchesMode = mode === "All Modes" || course.course_mode === mode;
    return matchesSearch && matchesSubject && matchesLevel && matchesMode;
  });

  return (
    <Layout>
      <SEO
        title="Courses | Jambushrusti Learning Portal"
        description="Explore courses on Jain philosophy, Agam studies, manuscripts, and more at Jambushrusti Learning Portal."
      />

      {/* Hero Section */}
      <section className="bg-primary/5 py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
              <GraduationCap className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
                Learning Portal
              </h1>
              <p className="text-muted-foreground">
                Explore traditional Jain knowledge through modern education
              </p>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-2xl p-4 md:p-6 shadow-sm border border-border space-y-4">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-12 h-12 text-base"
              />
            </div>

            <div className="flex flex-wrap gap-3">
              <Select value={subject} onValueChange={setSubject}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  {SUBJECTS.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {LEVELS.map((l) => (
                    <SelectItem key={l} value={l}>
                      {l}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger className="w-full sm:w-[150px]">
                  <SelectValue placeholder="Mode" />
                </SelectTrigger>
                <SelectContent>
                  {MODES.map((m) => (
                    <SelectItem key={m} value={m}>
                      {m}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
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
        </div>
      </section>

      {/* Courses Grid */}
      <section className="py-12 md:py-16">
        <div className="container max-w-7xl mx-auto px-4">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video rounded-xl" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          ) : filteredCourses && filteredCourses.length > 0 ? (
            <>
              <p className="text-muted-foreground mb-6">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredCourses.map((course) => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <BookOpen className="h-16 w-16 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="font-heading text-xl font-semibold text-foreground mb-2">
                No courses found
              </h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or check back later for new courses.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
