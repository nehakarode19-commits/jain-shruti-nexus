import { useState } from "react";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Plus,
  Pencil,
  Trash2,
  BookOpen,
  Search,
  Video,
  Users,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminCourses, useSaveCourse, useDeleteCourse, LMSCourse } from "@/hooks/useLMS";

const SUBJECTS = [
  "Agam",
  "Jain Philosophy",
  "Manuscripts",
  "Guruvani",
  "Jain History",
  "Languages",
  "Prakrit",
  "Sanskrit",
  "Ardhamagadhi",
];

const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const LANGUAGES = ["Hindi", "Gujarati", "English", "Sanskrit", "Prakrit"];
const COURSE_MODES = ["Online", "Offline", "Hybrid"];

const CoursesManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [modeFilter, setModeFilter] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<LMSCourse | null>(null);

  const { data: courses = [], isLoading } = useAdminCourses();
  const saveCourse = useSaveCourse();
  const deleteCourse = useDeleteCourse();

  const [form, setForm] = useState({
    title: "",
    description: "",
    subject: "Jain Philosophy",
    level: "Beginner",
    language: "Hindi",
    instructor_name: "",
    duration: "",
    course_mode: "Online",
    thumbnail_url: "",
    is_published: false,
    is_restricted: false,
  });

  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      subject: "Jain Philosophy",
      level: "Beginner",
      language: "Hindi",
      instructor_name: "",
      duration: "",
      course_mode: "Online",
      thumbnail_url: "",
      is_published: false,
      is_restricted: false,
    });
    setEditingCourse(null);
  };

  const handleEdit = (course: LMSCourse) => {
    setEditingCourse(course);
    setForm({
      title: course.title,
      description: course.description || "",
      subject: course.subject,
      level: course.level,
      language: course.language || "Hindi",
      instructor_name: course.instructor_name || "",
      duration: course.duration || "",
      course_mode: course.course_mode,
      thumbnail_url: course.thumbnail_url || "",
      is_published: course.is_published,
      is_restricted: course.is_restricted,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) {
      toast.error("Please enter a course title");
      return;
    }

    try {
      await saveCourse.mutateAsync({
        ...(editingCourse?.id && { id: editingCourse.id }),
        title: form.title,
        description: form.description || null,
        subject: form.subject,
        level: form.level,
        language: form.language,
        instructor_name: form.instructor_name || null,
        duration: form.duration || null,
        course_mode: form.course_mode,
        thumbnail_url: form.thumbnail_url || null,
        is_published: form.is_published,
        is_restricted: form.is_restricted,
      });

      toast.success(editingCourse ? "Course updated" : "Course created");
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save course");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteCourse.mutateAsync(id);
      toast.success("Course deleted");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMode = modeFilter === "all" || course.course_mode === modeFilter;
    return matchesSearch && matchesMode;
  });

  const stats = [
    { label: "Total Courses", value: courses.length, icon: BookOpen },
    { label: "Published", value: courses.filter(c => c.is_published).length, icon: Globe },
    { label: "Online", value: courses.filter(c => c.course_mode === "Online").length, icon: Video },
    { label: "Offline", value: courses.filter(c => c.course_mode === "Offline").length, icon: Users },
  ];

  return (
    <LearningLayout title="Course Management">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <Card key={stat.label} className="border-border">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters & Actions */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search courses..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={modeFilter} onValueChange={setModeFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Filter by mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modes</SelectItem>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gap-2">
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Courses Table */}
        <Card className="border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Course</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8">
                      Loading...
                    </TableCell>
                  </TableRow>
                ) : filteredCourses.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No courses found. Create your first course!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredCourses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">{course.instructor_name || "No instructor"}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{course.subject}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{course.level}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.course_mode === "Online" ? "default" : "secondary"}>
                          {course.course_mode}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={course.is_published ? "default" : "outline"}>
                          {course.is_published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(course)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDelete(course.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Course Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingCourse ? "Edit Course" : "Create New Course"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <Label>Course Title *</Label>
                  <Input
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    placeholder="Enter course title"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Course description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Subject</Label>
                  <Select value={form.subject} onValueChange={(v) => setForm({ ...form, subject: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SUBJECTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Level</Label>
                  <Select value={form.level} onValueChange={(v) => setForm({ ...form, level: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LEVELS.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Language</Label>
                  <Select value={form.language} onValueChange={(v) => setForm({ ...form, language: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {LANGUAGES.map((l) => (
                        <SelectItem key={l} value={l}>{l}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Course Mode</Label>
                  <Select value={form.course_mode} onValueChange={(v) => setForm({ ...form, course_mode: v })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {COURSE_MODES.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Instructor Name</Label>
                  <Input
                    value={form.instructor_name}
                    onChange={(e) => setForm({ ...form, instructor_name: e.target.value })}
                    placeholder="Instructor or Scholar name"
                  />
                </div>

                <div>
                  <Label>Duration</Label>
                  <Input
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    placeholder="e.g., 3 months, 20 hours"
                  />
                </div>

                <div className="sm:col-span-2">
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={form.thumbnail_url}
                    onChange={(e) => setForm({ ...form, thumbnail_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.is_published}
                    onCheckedChange={(checked) => setForm({ ...form, is_published: checked })}
                  />
                  <Label>Publish Course</Label>
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    checked={form.is_restricted}
                    onCheckedChange={(checked) => setForm({ ...form, is_restricted: checked })}
                  />
                  <Label>Restricted Access</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} disabled={saveCourse.isPending}>
                  {saveCourse.isPending ? "Saving..." : "Save Course"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LearningLayout>
  );
};

export default CoursesManage;
