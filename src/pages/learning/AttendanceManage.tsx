import { useState } from "react";
import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ClipboardList, Calendar, Users, CheckCircle, Plus, Search } from "lucide-react";
import { useAdminCourses } from "@/hooks/useLMS";
import { useAdminLectures } from "@/hooks/useLMSAdmin";
import { toast } from "sonner";

// Mock attendance data
const mockAttendance = [
  { id: "1", studentName: "Amit Sharma", date: "2024-01-15", lecture: "Introduction to Agam", status: "present" },
  { id: "2", studentName: "Priya Patel", date: "2024-01-15", lecture: "Introduction to Agam", status: "present" },
  { id: "3", studentName: "Raj Kumar", date: "2024-01-15", lecture: "Introduction to Agam", status: "absent" },
  { id: "4", studentName: "Meera Joshi", date: "2024-01-14", lecture: "Basics of Jain Philosophy", status: "present" },
  { id: "5", studentName: "Vikram Singh", date: "2024-01-14", lecture: "Basics of Jain Philosophy", status: "present" },
];

const mockStudents = [
  { id: "1", name: "Amit Sharma", email: "amit@example.com" },
  { id: "2", name: "Priya Patel", email: "priya@example.com" },
  { id: "3", name: "Raj Kumar", email: "raj@example.com" },
  { id: "4", name: "Meera Joshi", email: "meera@example.com" },
  { id: "5", name: "Vikram Singh", email: "vikram@example.com" },
];

const AttendanceManage = () => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>("");
  const [selectedLectureId, setSelectedLectureId] = useState<string>("");
  const [isMarkDialogOpen, setIsMarkDialogOpen] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const { data: courses = [] } = useAdminCourses();
  const { data: lectures = [] } = useAdminLectures(selectedCourseId);

  const offlineLectures = lectures.filter(l => l.lecture_type === "Offline");

  const handleMarkAttendance = () => {
    if (selectedStudents.length === 0) {
      toast.error("Please select at least one student");
      return;
    }
    toast.success(`Marked attendance for ${selectedStudents.length} students`);
    setIsMarkDialogOpen(false);
    setSelectedStudents([]);
  };

  const toggleStudent = (studentId: string) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const selectAll = () => {
    if (selectedStudents.length === mockStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(mockStudents.map(s => s.id));
    }
  };

  const presentCount = mockAttendance.filter(a => a.status === "present").length;
  const absentCount = mockAttendance.filter(a => a.status === "absent").length;

  return (
    <LearningLayout title="Attendance Tracking">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <ClipboardList className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockAttendance.length}</p>
                <p className="text-xs text-muted-foreground">Total Records</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{presentCount}</p>
                <p className="text-xs text-muted-foreground">Present</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-500/10 text-red-600">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{absentCount}</p>
                <p className="text-xs text-muted-foreground">Absent</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <Calendar className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{Math.round((presentCount / mockAttendance.length) * 100)}%</p>
                <p className="text-xs text-muted-foreground">Attendance Rate</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <Label className="mb-2 block">Select Course</Label>
                <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.filter(c => c.course_mode !== "Online").map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label className="mb-2 block">Select Lecture</Label>
                <Select value={selectedLectureId} onValueChange={setSelectedLectureId} disabled={!selectedCourseId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a lecture" />
                  </SelectTrigger>
                  <SelectContent>
                    {offlineLectures.map((lecture) => (
                      <SelectItem key={lecture.id} value={lecture.id}>
                        {lecture.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-end">
                <Button 
                  onClick={() => setIsMarkDialogOpen(true)} 
                  className="gap-2"
                  disabled={!selectedLectureId}
                >
                  <Plus className="h-4 w-4" />
                  Mark Attendance
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Attendance Records */}
        <Card className="border-border">
          <CardHeader>
            <CardTitle>Attendance Records</CardTitle>
            <CardDescription>View and manage offline lecture attendance</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Lecture</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockAttendance.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No attendance records found
                    </TableCell>
                  </TableRow>
                ) : (
                  mockAttendance.map((record) => (
                    <TableRow key={record.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-primary/10 text-primary text-sm">
                              {record.studentName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{record.studentName}</span>
                        </div>
                      </TableCell>
                      <TableCell>{record.lecture}</TableCell>
                      <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={record.status === "present" ? "default" : "destructive"}>
                          {record.status === "present" ? "Present" : "Absent"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Mark Attendance Dialog */}
        <Dialog open={isMarkDialogOpen} onOpenChange={setIsMarkDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Mark Attendance</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="flex items-center justify-between py-2 border-b">
                <Label className="font-medium">Select Students</Label>
                <Button variant="ghost" size="sm" onClick={selectAll}>
                  {selectedStudents.length === mockStudents.length ? "Deselect All" : "Select All"}
                </Button>
              </div>

              <div className="max-h-[300px] overflow-y-auto space-y-2">
                {mockStudents
                  .filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted cursor-pointer"
                      onClick={() => toggleStudent(student.id)}
                    >
                      <Checkbox checked={selectedStudents.includes(student.id)} />
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm">
                          {student.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm">{student.name}</p>
                        <p className="text-xs text-muted-foreground">{student.email}</p>
                      </div>
                    </div>
                  ))}
              </div>

              <div className="flex justify-between items-center pt-4 border-t">
                <p className="text-sm text-muted-foreground">
                  {selectedStudents.length} students selected
                </p>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setIsMarkDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleMarkAttendance}>
                    Mark Present
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LearningLayout>
  );
};

export default AttendanceManage;
