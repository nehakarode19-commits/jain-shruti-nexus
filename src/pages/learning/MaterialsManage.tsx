import { useState } from "react";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  FileText,
  Upload,
  Search,
  Pencil,
  Trash2,
  ExternalLink,
  Plus,
  File,
  Video,
  Image,
  Music,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminCourses, LMSMaterial } from "@/hooks/useLMS";
import { useAdminMaterials, useSaveMaterial, useDeleteMaterial, useAdminLectures } from "@/hooks/useLMSAdmin";

const getFileIcon = (type: string | null) => {
  switch (type) {
    case "pdf":
    case "doc":
      return <FileText className="h-5 w-5" />;
    case "video":
      return <Video className="h-5 w-5" />;
    case "image":
      return <Image className="h-5 w-5" />;
    case "audio":
      return <Music className="h-5 w-5" />;
    default:
      return <File className="h-5 w-5" />;
  }
};

const MaterialsManage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState<LMSMaterial | null>(null);

  const { data: courses = [] } = useAdminCourses();
  const { data: materials = [], isLoading } = useAdminMaterials(selectedCourseId);
  const { data: lectures = [] } = useAdminLectures(selectedCourseId);
  const saveMaterial = useSaveMaterial();
  const deleteMaterial = useDeleteMaterial();

  const [form, setForm] = useState({
    title: "",
    file_url: "",
    file_type: "pdf",
    lecture_id: "",
  });

  const resetForm = () => {
    setForm({
      title: "",
      file_url: "",
      file_type: "pdf",
      lecture_id: "",
    });
    setEditingMaterial(null);
  };

  const handleEdit = (material: LMSMaterial) => {
    setEditingMaterial(material);
    setForm({
      title: material.title,
      file_url: material.file_url,
      file_type: material.file_type || "pdf",
      lecture_id: material.lecture_id || "",
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.file_url || !selectedCourseId) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      await saveMaterial.mutateAsync({
        ...(editingMaterial?.id && { id: editingMaterial.id }),
        course_id: selectedCourseId,
        lecture_id: form.lecture_id || null,
        title: form.title,
        file_url: form.file_url,
        file_type: form.file_type,
      });

      toast.success(editingMaterial ? "Material updated" : "Material added");
      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      toast.error("Failed to save material");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this material?")) return;
    try {
      await deleteMaterial.mutateAsync(id);
      toast.success("Material deleted");
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  const filteredMaterials = materials.filter(m =>
    m.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: "Total Materials", value: materials.length, icon: FileText },
    { label: "PDFs", value: materials.filter(m => m.file_type === "pdf").length, icon: FileText },
    { label: "Videos", value: materials.filter(m => m.file_type === "video").length, icon: Video },
    { label: "Other", value: materials.filter(m => !["pdf", "video"].includes(m.file_type || "")).length, icon: File },
  ];

  return (
    <LearningLayout title="Study Materials">
      <div className="space-y-6">
        {/* Course Selector */}
        <Card className="border-border">
          <CardContent className="p-4">
            <Label className="mb-2 block">Select Course</Label>
            <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
              <SelectTrigger className="w-full max-w-md">
                <SelectValue placeholder="Choose a course to manage materials" />
              </SelectTrigger>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {selectedCourseId && (
          <>
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
                      placeholder="Search materials..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gap-2">
                    <Upload className="h-4 w-4" />
                    Add Material
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Materials Table */}
            <Card className="border-border">
              <CardHeader>
                <CardTitle>Course Materials</CardTitle>
                <CardDescription>PDFs, documents, videos, and other study resources</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Material</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Linked Lecture</TableHead>
                      <TableHead>Added</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {isLoading ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8">Loading...</TableCell>
                      </TableRow>
                    ) : filteredMaterials.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                          No materials found. Add study materials for this course.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredMaterials.map((material) => (
                        <TableRow key={material.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                                {getFileIcon(material.file_type)}
                              </div>
                              <span className="font-medium">{material.title}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{material.file_type?.toUpperCase()}</Badge>
                          </TableCell>
                          <TableCell>
                            {lectures.find(l => l.id === material.lecture_id)?.title || "Course-level"}
                          </TableCell>
                          <TableCell>{new Date(material.created_at).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button variant="ghost" size="icon" asChild>
                                <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleEdit(material)}>
                                <Pencil className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" onClick={() => handleDelete(material.id)}>
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
          </>
        )}

        {/* Add/Edit Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingMaterial ? "Edit Material" : "Add Study Material"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Material title"
                />
              </div>

              <div>
                <Label>File URL *</Label>
                <Input
                  value={form.file_url}
                  onChange={(e) => setForm({ ...form, file_url: e.target.value })}
                  placeholder="https://drive.google.com/..."
                />
              </div>

              <div>
                <Label>File Type</Label>
                <Select value={form.file_type} onValueChange={(v) => setForm({ ...form, file_type: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF</SelectItem>
                    <SelectItem value="doc">Document</SelectItem>
                    <SelectItem value="ppt">Presentation</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="audio">Audio</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Link to Lecture (optional)</Label>
                <Select value={form.lecture_id} onValueChange={(v) => setForm({ ...form, lecture_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Course-level material" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Course-level (not linked)</SelectItem>
                    {lectures.map((lecture) => (
                      <SelectItem key={lecture.id} value={lecture.id}>
                        {lecture.order_index}. {lecture.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleSave} disabled={saveMaterial.isPending}>
                  {saveMaterial.isPending ? "Saving..." : "Save Material"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LearningLayout>
  );
};

export default MaterialsManage;
