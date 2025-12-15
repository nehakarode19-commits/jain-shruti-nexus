import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Pencil,
  Trash2,
  Video,
  Calendar,
  FileText,
  Upload,
  ExternalLink,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { useAdminCourses, LMSLecture, LMSMaterial } from "@/hooks/useLMS";
import { useAdminLectures, useSaveLecture, useDeleteLecture, useAdminMaterials, useSaveMaterial, useDeleteMaterial } from "@/hooks/useLMSAdmin";

const LecturesManagement = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [isLectureDialogOpen, setIsLectureDialogOpen] = useState(false);
  const [isMaterialDialogOpen, setIsMaterialDialogOpen] = useState(false);
  const [editingLecture, setEditingLecture] = useState<LMSLecture | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<LMSMaterial | null>(null);

  const { data: courses = [] } = useAdminCourses();
  const { data: lectures = [], isLoading: lecturesLoading } = useAdminLectures(selectedCourseId);
  const { data: materials = [], isLoading: materialsLoading } = useAdminMaterials(selectedCourseId);

  const saveLecture = useSaveLecture();
  const deleteLecture = useDeleteLecture();
  const saveMaterial = useSaveMaterial();
  const deleteMaterial = useDeleteMaterial();

  const [lectureForm, setLectureForm] = useState({
    title: "",
    description: "",
    lecture_type: "Online",
    video_url: "",
    stream_url: "",
    scheduled_date: "",
    venue: "",
    speaker: "",
    notes: "",
    references_text: "",
    duration_minutes: 0,
    order_index: 0,
    is_published: false,
  });

  const [materialForm, setMaterialForm] = useState({
    title: "",
    file_url: "",
    file_type: "pdf",
    lecture_id: "",
  });

  const resetLectureForm = () => {
    setLectureForm({
      title: "",
      description: "",
      lecture_type: "Online",
      video_url: "",
      stream_url: "",
      scheduled_date: "",
      venue: "",
      speaker: "",
      notes: "",
      references_text: "",
      duration_minutes: 0,
      order_index: 0,
      is_published: false,
    });
    setEditingLecture(null);
  };

  const resetMaterialForm = () => {
    setMaterialForm({
      title: "",
      file_url: "",
      file_type: "pdf",
      lecture_id: "",
    });
    setEditingMaterial(null);
  };

  const handleEditLecture = (lecture: LMSLecture) => {
    setEditingLecture(lecture);
    setLectureForm({
      title: lecture.title,
      description: lecture.description || "",
      lecture_type: lecture.lecture_type,
      video_url: lecture.video_url || "",
      stream_url: lecture.stream_url || "",
      scheduled_date: lecture.scheduled_date ? lecture.scheduled_date.slice(0, 16) : "",
      venue: lecture.venue || "",
      speaker: lecture.speaker || "",
      notes: lecture.notes || "",
      references_text: lecture.references_text || "",
      duration_minutes: lecture.duration_minutes || 0,
      order_index: lecture.order_index || 0,
      is_published: lecture.is_published,
    });
    setIsLectureDialogOpen(true);
  };

  const handleEditMaterial = (material: LMSMaterial) => {
    setEditingMaterial(material);
    setMaterialForm({
      title: material.title,
      file_url: material.file_url,
      file_type: material.file_type || "pdf",
      lecture_id: material.lecture_id || "",
    });
    setIsMaterialDialogOpen(true);
  };

  const handleSaveLecture = async () => {
    if (!lectureForm.title || !selectedCourseId) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      await saveLecture.mutateAsync({
        ...(editingLecture?.id && { id: editingLecture.id }),
        course_id: selectedCourseId,
        title: lectureForm.title,
        description: lectureForm.description || null,
        lecture_type: lectureForm.lecture_type,
        video_url: lectureForm.video_url || null,
        stream_url: lectureForm.stream_url || null,
        scheduled_date: lectureForm.scheduled_date || null,
        venue: lectureForm.venue || null,
        speaker: lectureForm.speaker || null,
        notes: lectureForm.notes || null,
        references_text: lectureForm.references_text || null,
        duration_minutes: lectureForm.duration_minutes || null,
        order_index: lectureForm.order_index,
        is_published: lectureForm.is_published,
      });

      toast.success(editingLecture ? "Lecture updated" : "Lecture created");
      setIsLectureDialogOpen(false);
      resetLectureForm();
    } catch (error) {
      toast.error("Failed to save lecture");
    }
  };

  const handleSaveMaterial = async () => {
    if (!materialForm.title || !materialForm.file_url || !selectedCourseId) {
      toast.error("Please fill in required fields");
      return;
    }

    try {
      await saveMaterial.mutateAsync({
        ...(editingMaterial?.id && { id: editingMaterial.id }),
        course_id: selectedCourseId,
        lecture_id: materialForm.lecture_id || null,
        title: materialForm.title,
        file_url: materialForm.file_url,
        file_type: materialForm.file_type,
      });

      toast.success(editingMaterial ? "Material updated" : "Material added");
      setIsMaterialDialogOpen(false);
      resetMaterialForm();
    } catch (error) {
      toast.error("Failed to save material");
    }
  };

  const handleDeleteLecture = async (id: string) => {
    if (!confirm("Are you sure you want to delete this lecture?")) return;
    try {
      await deleteLecture.mutateAsync(id);
      toast.success("Lecture deleted");
    } catch (error) {
      toast.error("Failed to delete lecture");
    }
  };

  const handleDeleteMaterial = async (id: string) => {
    if (!confirm("Are you sure you want to delete this material?")) return;
    try {
      await deleteMaterial.mutateAsync(id);
      toast.success("Material deleted");
    } catch (error) {
      toast.error("Failed to delete material");
    }
  };

  const selectedCourse = courses.find(c => c.id === selectedCourseId);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">
              Lecture Management
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage lectures, recordings, and study materials
            </p>
          </div>
        </div>

        {/* Course Selector */}
        <div className="bg-card border border-border rounded-xl p-4">
          <Label className="mb-2 block">Select Course</Label>
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger className="w-full max-w-md">
              <SelectValue placeholder="Choose a course to manage lectures" />
            </SelectTrigger>
            <SelectContent>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title} ({course.course_mode})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {selectedCourseId && (
          <>
            {/* Course Info */}
            <div className="bg-card border border-border rounded-xl p-4 flex items-center gap-4">
              <BookOpen className="h-8 w-8 text-primary" />
              <div>
                <h2 className="font-heading font-semibold">{selectedCourse?.title}</h2>
                <p className="text-sm text-muted-foreground">
                  {selectedCourse?.subject} • {selectedCourse?.level} • {selectedCourse?.course_mode}
                </p>
              </div>
            </div>

            <Tabs defaultValue="lectures" className="space-y-6">
              <TabsList>
                <TabsTrigger value="lectures" className="gap-2">
                  <Video className="h-4 w-4" />
                  Lectures
                </TabsTrigger>
                <TabsTrigger value="materials" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Study Materials
                </TabsTrigger>
              </TabsList>

              {/* Lectures Tab */}
              <TabsContent value="lectures" className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      resetLectureForm();
                      setIsLectureDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Add Lecture
                  </Button>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Order</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Schedule</TableHead>
                        <TableHead>Duration</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {lecturesLoading ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : lectures.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No lectures found. Add your first lecture.
                          </TableCell>
                        </TableRow>
                      ) : (
                        lectures.map((lecture) => (
                          <TableRow key={lecture.id}>
                            <TableCell>{lecture.order_index}</TableCell>
                            <TableCell className="font-medium">{lecture.title}</TableCell>
                            <TableCell>
                              <Badge variant={lecture.lecture_type === "Online" ? "default" : "secondary"}>
                                {lecture.lecture_type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {lecture.scheduled_date
                                ? new Date(lecture.scheduled_date).toLocaleDateString()
                                : "-"}
                            </TableCell>
                            <TableCell>
                              {lecture.duration_minutes ? `${lecture.duration_minutes} min` : "-"}
                            </TableCell>
                            <TableCell>
                              <Badge variant={lecture.is_published ? "default" : "outline"}>
                                {lecture.is_published ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                {lecture.video_url && (
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    asChild
                                  >
                                    <a href={lecture.video_url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink className="h-4 w-4" />
                                    </a>
                                  </Button>
                                )}
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditLecture(lecture)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteLecture(lecture.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>

              {/* Materials Tab */}
              <TabsContent value="materials" className="space-y-4">
                <div className="flex justify-end">
                  <Button
                    onClick={() => {
                      resetMaterialForm();
                      setIsMaterialDialogOpen(true);
                    }}
                    className="gap-2"
                  >
                    <Upload className="h-4 w-4" />
                    Add Material
                  </Button>
                </div>

                <div className="bg-card border border-border rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Linked Lecture</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {materialsLoading ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8">
                            Loading...
                          </TableCell>
                        </TableRow>
                      ) : materials.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                            No materials found. Add study materials.
                          </TableCell>
                        </TableRow>
                      ) : (
                        materials.map((material) => (
                          <TableRow key={material.id}>
                            <TableCell className="font-medium">{material.title}</TableCell>
                            <TableCell>
                              <Badge variant="outline">{material.file_type?.toUpperCase()}</Badge>
                            </TableCell>
                            <TableCell>
                              {lectures.find(l => l.id === material.lecture_id)?.title || "Course-level"}
                            </TableCell>
                            <TableCell>
                              {new Date(material.created_at).toLocaleDateString()}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  asChild
                                >
                                  <a href={material.file_url} target="_blank" rel="noopener noreferrer">
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleEditMaterial(material)}
                                >
                                  <Pencil className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => handleDeleteMaterial(material.id)}
                                >
                                  <Trash2 className="h-4 w-4 text-destructive" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </TabsContent>
            </Tabs>
          </>
        )}

        {/* Lecture Dialog */}
        <Dialog open={isLectureDialogOpen} onOpenChange={setIsLectureDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingLecture ? "Edit Lecture" : "Add New Lecture"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label>Title *</Label>
                  <Input
                    value={lectureForm.title}
                    onChange={(e) => setLectureForm({ ...lectureForm, title: e.target.value })}
                    placeholder="Lecture title"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={lectureForm.description}
                    onChange={(e) => setLectureForm({ ...lectureForm, description: e.target.value })}
                    placeholder="Lecture description"
                    rows={3}
                  />
                </div>

                <div>
                  <Label>Lecture Type</Label>
                  <Select
                    value={lectureForm.lecture_type}
                    onValueChange={(value) => setLectureForm({ ...lectureForm, lecture_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Online">Online (Live)</SelectItem>
                      <SelectItem value="Recorded">Recorded</SelectItem>
                      <SelectItem value="Offline">Offline (In-person)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Order Index</Label>
                  <Input
                    type="number"
                    value={lectureForm.order_index}
                    onChange={(e) => setLectureForm({ ...lectureForm, order_index: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label>Schedule Date & Time</Label>
                  <Input
                    type="datetime-local"
                    value={lectureForm.scheduled_date}
                    onChange={(e) => setLectureForm({ ...lectureForm, scheduled_date: e.target.value })}
                  />
                </div>

                <div>
                  <Label>Duration (minutes)</Label>
                  <Input
                    type="number"
                    value={lectureForm.duration_minutes}
                    onChange={(e) => setLectureForm({ ...lectureForm, duration_minutes: parseInt(e.target.value) || 0 })}
                  />
                </div>

                <div>
                  <Label>Speaker / Instructor</Label>
                  <Input
                    value={lectureForm.speaker}
                    onChange={(e) => setLectureForm({ ...lectureForm, speaker: e.target.value })}
                    placeholder="Speaker name"
                  />
                </div>

                <div>
                  <Label>Venue (for offline)</Label>
                  <Input
                    value={lectureForm.venue}
                    onChange={(e) => setLectureForm({ ...lectureForm, venue: e.target.value })}
                    placeholder="Classroom / Hall"
                  />
                </div>

                <div className="col-span-2">
                  <Label>Video URL (YouTube, Zoom recording, etc.)</Label>
                  <Input
                    value={lectureForm.video_url}
                    onChange={(e) => setLectureForm({ ...lectureForm, video_url: e.target.value })}
                    placeholder="https://youtube.com/watch?v=..."
                  />
                </div>

                <div className="col-span-2">
                  <Label>Live Stream URL (for live sessions)</Label>
                  <Input
                    value={lectureForm.stream_url}
                    onChange={(e) => setLectureForm({ ...lectureForm, stream_url: e.target.value })}
                    placeholder="https://zoom.us/j/..."
                  />
                </div>

                <div className="col-span-2">
                  <Label>Notes</Label>
                  <Textarea
                    value={lectureForm.notes}
                    onChange={(e) => setLectureForm({ ...lectureForm, notes: e.target.value })}
                    placeholder="Lecture notes or summary"
                    rows={3}
                  />
                </div>

                <div className="col-span-2">
                  <Label>References</Label>
                  <Textarea
                    value={lectureForm.references_text}
                    onChange={(e) => setLectureForm({ ...lectureForm, references_text: e.target.value })}
                    placeholder="Books, scriptures, or other references"
                    rows={2}
                  />
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <Switch
                    checked={lectureForm.is_published}
                    onCheckedChange={(checked) => setLectureForm({ ...lectureForm, is_published: checked })}
                  />
                  <Label>Publish lecture</Label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsLectureDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveLecture} disabled={saveLecture.isPending}>
                  {saveLecture.isPending ? "Saving..." : "Save Lecture"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* Material Dialog */}
        <Dialog open={isMaterialDialogOpen} onOpenChange={setIsMaterialDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>
                {editingMaterial ? "Edit Material" : "Add Study Material"}
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={materialForm.title}
                  onChange={(e) => setMaterialForm({ ...materialForm, title: e.target.value })}
                  placeholder="Material title"
                />
              </div>

              <div>
                <Label>File URL *</Label>
                <Input
                  value={materialForm.file_url}
                  onChange={(e) => setMaterialForm({ ...materialForm, file_url: e.target.value })}
                  placeholder="https://drive.google.com/... or direct link"
                />
              </div>

              <div>
                <Label>File Type</Label>
                <Select
                  value={materialForm.file_type}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, file_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
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
                <Select
                  value={materialForm.lecture_id}
                  onValueChange={(value) => setMaterialForm({ ...materialForm, lecture_id: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Course-level material" />
                  </SelectTrigger>
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
                <Button variant="outline" onClick={() => setIsMaterialDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSaveMaterial} disabled={saveMaterial.isPending}>
                  {saveMaterial.isPending ? "Saving..." : "Save Material"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </AdminLayout>
  );
};

export default LecturesManagement;
