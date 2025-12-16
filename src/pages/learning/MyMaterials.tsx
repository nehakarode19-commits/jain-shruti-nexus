import { StudentLayout } from "@/components/learning/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Download, 
  Search,
  BookOpen,
  Video,
  FileImage,
  File,
  FolderOpen,
  Calendar,
  Eye
} from "lucide-react";
import { useState } from "react";

// Mock materials data
const mockMaterials = [
  {
    id: "1",
    title: "Introduction to Jain Philosophy - Lecture Notes",
    course: "Jain Philosophy Foundation",
    type: "pdf",
    size: "2.4 MB",
    uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    downloads: 45,
  },
  {
    id: "2",
    title: "Anekantavada Presentation Slides",
    course: "Jain Philosophy Foundation",
    type: "pptx",
    size: "5.1 MB",
    uploadedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    downloads: 32,
  },
  {
    id: "3",
    title: "Manuscript Dating Techniques Video",
    course: "Manuscript Studies",
    type: "video",
    size: "156 MB",
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    downloads: 28,
  },
  {
    id: "4",
    title: "Sanskrit Grammar Reference Guide",
    course: "Sanskrit for Jain Texts",
    type: "pdf",
    size: "1.8 MB",
    uploadedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    downloads: 67,
  },
  {
    id: "5",
    title: "Agam Text Analysis Worksheet",
    course: "Advanced Agam Studies",
    type: "docx",
    size: "450 KB",
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    downloads: 19,
  },
  {
    id: "6",
    title: "Jain Iconography Image Collection",
    course: "Jain Philosophy Foundation",
    type: "zip",
    size: "45 MB",
    uploadedAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
    downloads: 54,
  },
  {
    id: "7",
    title: "Prakrit Language Audio Lessons",
    course: "Sanskrit for Jain Texts",
    type: "audio",
    size: "89 MB",
    uploadedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    downloads: 23,
  },
  {
    id: "8",
    title: "Jain Ethics Case Studies Compilation",
    course: "Jain Philosophy Foundation",
    type: "pdf",
    size: "3.2 MB",
    uploadedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    downloads: 41,
  },
];

const getFileIcon = (type: string) => {
  switch (type) {
    case "pdf":
      return <FileText className="h-6 w-6 text-red-500" />;
    case "video":
      return <Video className="h-6 w-6 text-blue-500" />;
    case "pptx":
      return <FileImage className="h-6 w-6 text-orange-500" />;
    case "docx":
      return <File className="h-6 w-6 text-blue-600" />;
    case "zip":
      return <FolderOpen className="h-6 w-6 text-amber-500" />;
    case "audio":
      return <Video className="h-6 w-6 text-purple-500" />;
    default:
      return <File className="h-6 w-6 text-gray-500" />;
  }
};

const getTypeBadge = (type: string) => {
  const typeColors: Record<string, string> = {
    pdf: "bg-red-500/10 text-red-700 border-red-200",
    video: "bg-blue-500/10 text-blue-700 border-blue-200",
    pptx: "bg-orange-500/10 text-orange-700 border-orange-200",
    docx: "bg-blue-500/10 text-blue-700 border-blue-200",
    zip: "bg-amber-500/10 text-amber-700 border-amber-200",
    audio: "bg-purple-500/10 text-purple-700 border-purple-200",
  };

  return (
    <Badge className={typeColors[type] || "bg-gray-500/10 text-gray-700 border-gray-200"}>
      {type.toUpperCase()}
    </Badge>
  );
};

export default function MyMaterials() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [...new Set(mockMaterials.map((m) => m.course))];

  const filteredMaterials = mockMaterials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      material.course.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCourse = !selectedCourse || material.course === selectedCourse;
    return matchesSearch && matchesCourse;
  });

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  return (
    <StudentLayout title="Study Materials">
      <div className="space-y-6">
        {/* Header & Search */}
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
          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedCourse === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCourse(null)}
            >
              All Courses
            </Button>
            {courses.map((course) => (
              <Button
                key={course}
                variant={selectedCourse === course ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCourse(course)}
              >
                {course.split(" ").slice(0, 2).join(" ")}...
              </Button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockMaterials.length}</p>
                <p className="text-sm text-muted-foreground">Total Materials</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <BookOpen className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{courses.length}</p>
                <p className="text-sm text-muted-foreground">Courses</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <Download className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {mockMaterials.reduce((acc, m) => acc + m.downloads, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Downloads</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Materials List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FolderOpen className="h-5 w-5 text-primary" />
              Available Materials
            </CardTitle>
            <CardDescription>
              {filteredMaterials.length} materials found
              {selectedCourse && ` in ${selectedCourse}`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {filteredMaterials.length > 0 ? (
              <div className="space-y-3">
                {filteredMaterials.map((material) => (
                  <div
                    key={material.id}
                    className="flex items-center gap-4 p-4 rounded-xl border bg-card hover:bg-muted/30 transition-colors group"
                  >
                    <div className="p-3 rounded-lg bg-muted/50">
                      {getFileIcon(material.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-foreground group-hover:text-primary transition-colors truncate">
                        {material.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <BookOpen className="h-3.5 w-3.5" />
                          {material.course}
                        </span>
                        <span>{material.size}</span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {formatDate(material.uploadedAt)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {getTypeBadge(material.type)}
                      <Button variant="outline" size="sm" className="gap-1">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">Preview</span>
                      </Button>
                      <Button size="sm" className="gap-1">
                        <Download className="h-4 w-4" />
                        <span className="hidden sm:inline">Download</span>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Materials Found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || selectedCourse
                    ? "Try adjusting your search or filter criteria."
                    : "No study materials are available yet."}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </StudentLayout>
  );
}
