import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { useAdminCourses, useSaveCourse, useDeleteCourse, LMSCourse } from "@/hooks/useLMS";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Plus,
  Pencil,
  Trash2,
  GraduationCap,
  Search,
  BookOpen,
  Video,
  Loader2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const SUBJECTS = ["Agam", "Jain Philosophy", "Manuscripts", "Guruvani", "Jain History", "Languages"];
const LEVELS = ["Beginner", "Intermediate", "Advanced"];
const MODES = ["Online", "Offline", "Hybrid"];

const initialCourse: Partial<LMSCourse> = {
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
};

export default function LMSCoursesManagement() {
  const { data: courses, isLoading } = useAdminCourses();
  const saveMutation = useSaveCourse();
  const deleteMutation = useDeleteCourse();

  const [search, setSearch] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Partial<LMSCourse>>(initialCourse);
  const [isEditing, setIsEditing] = useState(false);

  const filteredCourses = courses?.filter(
    (course) =>
      course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingCourse(initialCourse);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (course: LMSCourse) => {
    setEditingCourse(course);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = async (courseId: string) => {
    if (!confirm("Are you sure you want to delete this course?")) return;
    try {
      await deleteMutation.mutateAsync(courseId);
      toast.success("Course deleted successfully");
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  const handleSave = async () => {
    if (!editingCourse.title) {
      toast.error("Please enter a course title");
      return;
    }

    try {
      await saveMutation.mutateAsync(editingCourse);
      toast.success(isEditing ? "Course updated successfully" : "Course created successfully");
      setIsDialogOpen(false);
      setEditingCourse(initialCourse);
    } catch (error) {
      toast.error("Failed to save course");
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground flex items-center gap-2">
              <GraduationCap className="h-7 w-7 text-primary" />
              Learning Courses Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Create and manage courses for the Learning Portal
            </p>
          </div>
          <Button onClick={handleAdd}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses?.length || 0}</p>
                <p className="text-xs text-muted-foreground">Total Courses</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                <Video className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses?.filter((c) => c.is_published).length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-orange/10 flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-orange" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses?.filter((c) => c.course_mode === "Online").length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Online</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {courses?.filter((c) => c.course_mode === "Offline").length || 0}
                </p>
                <p className="text-xs text-muted-foreground">Offline</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Courses Table */}
        <Card>
          <CardContent className="p-0">
            {isLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-16 w-full" />
                ))}
              </div>
            ) : (
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
                  {filteredCourses && filteredCourses.length > 0 ? (
                    filteredCourses.map((course) => (
                      <TableRow key={course.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-4 w-4 text-primary/60" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{course.title}</p>
                              {course.instructor_name && (
                                <p className="text-xs text-muted-foreground">
                                  {course.instructor_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{course.subject}</Badge>
                        </TableCell>
                        <TableCell>{course.level}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              course.course_mode === "Online"
                                ? "bg-green-100 text-green-800"
                                : course.course_mode === "Offline"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-purple-100 text-purple-800"
                            }
                          >
                            {course.course_mode}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={course.is_published ? "default" : "secondary"}
                          >
                            {course.is_published ? "Published" : "Draft"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleEdit(course)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDelete(course.id)}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12">
                        <GraduationCap className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                        <p className="text-muted-foreground">No courses found</p>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Edit Course" : "Add New Course"}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Course Title *</Label>
              <Input
                id="title"
                value={editingCourse.title}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, title: e.target.value })
                }
                placeholder="Enter course title"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={editingCourse.description || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, description: e.target.value })
                }
                placeholder="Enter course description"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Subject</Label>
                <Select
                  value={editingCourse.subject}
                  onValueChange={(value) =>
                    setEditingCourse({ ...editingCourse, subject: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {SUBJECTS.map((s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Level</Label>
                <Select
                  value={editingCourse.level}
                  onValueChange={(value) =>
                    setEditingCourse({ ...editingCourse, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LEVELS.map((l) => (
                      <SelectItem key={l} value={l}>
                        {l}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Course Mode</Label>
                <Select
                  value={editingCourse.course_mode}
                  onValueChange={(value) =>
                    setEditingCourse({ ...editingCourse, course_mode: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {MODES.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="language">Language</Label>
                <Input
                  id="language"
                  value={editingCourse.language || ""}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, language: e.target.value })
                  }
                  placeholder="e.g., Hindi, Gujarati, English"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="instructor">Instructor Name</Label>
                <Input
                  id="instructor"
                  value={editingCourse.instructor_name || ""}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, instructor_name: e.target.value })
                  }
                  placeholder="Instructor name"
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={editingCourse.duration || ""}
                  onChange={(e) =>
                    setEditingCourse({ ...editingCourse, duration: e.target.value })
                  }
                  placeholder="e.g., 10 hours, 4 weeks"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="thumbnail">Thumbnail URL</Label>
              <Input
                id="thumbnail"
                value={editingCourse.thumbnail_url || ""}
                onChange={(e) =>
                  setEditingCourse({ ...editingCourse, thumbnail_url: e.target.value })
                }
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-2">
                <Switch
                  id="published"
                  checked={editingCourse.is_published}
                  onCheckedChange={(checked) =>
                    setEditingCourse({ ...editingCourse, is_published: checked })
                  }
                />
                <Label htmlFor="published">Published</Label>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="restricted"
                  checked={editingCourse.is_restricted}
                  onCheckedChange={(checked) =>
                    setEditingCourse({ ...editingCourse, is_restricted: checked })
                  }
                />
                <Label htmlFor="restricted">Restricted Access</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saveMutation.isPending}>
              {saveMutation.isPending && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
              {isEditing ? "Update Course" : "Create Course"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
}
