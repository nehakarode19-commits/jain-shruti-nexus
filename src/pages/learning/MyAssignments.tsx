import { StudentLayout } from "@/components/learning/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ClipboardList, 
  Clock, 
  Calendar, 
  CheckCircle, 
  AlertCircle, 
  FileText,
  Upload,
  Eye,
  BookOpen
} from "lucide-react";
import { format, isPast, isFuture, differenceInDays } from "date-fns";

// Mock assignments data
const mockAssignments = [
  {
    id: "1",
    title: "Essay on Jain Philosophy Principles",
    course: "Jain Philosophy Foundation",
    description: "Write a 2000-word essay discussing the core principles of Jain philosophy and their relevance in modern times.",
    dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    maxScore: 100,
    status: "pending",
    submittedAt: null,
    score: null,
  },
  {
    id: "2",
    title: "Manuscript Analysis Report",
    course: "Manuscript Studies",
    description: "Analyze the provided manuscript excerpt and identify key paleographic features.",
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    maxScore: 50,
    status: "pending",
    submittedAt: null,
    score: null,
  },
  {
    id: "3",
    title: "Sanskrit Translation Exercise",
    course: "Sanskrit for Jain Texts",
    description: "Translate the given Sanskrit verses from the Tattvartha Sutra.",
    dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    maxScore: 30,
    status: "submitted",
    submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    score: null,
  },
  {
    id: "4",
    title: "Comparative Study of Agam Texts",
    course: "Advanced Agam Studies",
    description: "Compare and contrast two selected Agam texts in terms of their philosophical content.",
    dueDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    maxScore: 100,
    status: "graded",
    submittedAt: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    score: 85,
    feedback: "Excellent analysis! Good comparison of philosophical concepts.",
  },
  {
    id: "5",
    title: "Jain Ethics Case Study",
    course: "Jain Philosophy Foundation",
    description: "Analyze a real-world ethical dilemma using Jain ethical principles.",
    dueDate: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    maxScore: 50,
    status: "graded",
    submittedAt: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    score: 42,
    feedback: "Good application of principles. Consider exploring Anekantavada more deeply.",
  },
];

export default function MyAssignments() {
  const pendingAssignments = mockAssignments.filter((a) => a.status === "pending");
  const submittedAssignments = mockAssignments.filter((a) => a.status === "submitted");
  const gradedAssignments = mockAssignments.filter((a) => a.status === "graded");

  const getStatusBadge = (assignment: typeof mockAssignments[0]) => {
    if (assignment.status === "graded") {
      return (
        <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
          <CheckCircle className="h-3 w-3 mr-1" />
          Graded
        </Badge>
      );
    }
    if (assignment.status === "submitted") {
      return (
        <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
          <Clock className="h-3 w-3 mr-1" />
          Under Review
        </Badge>
      );
    }
    if (isPast(assignment.dueDate)) {
      return (
        <Badge className="bg-red-500/10 text-red-700 border-red-200">
          <AlertCircle className="h-3 w-3 mr-1" />
          Overdue
        </Badge>
      );
    }
    const daysLeft = differenceInDays(assignment.dueDate, new Date());
    if (daysLeft <= 2) {
      return (
        <Badge className="bg-amber-500/10 text-amber-700 border-amber-200">
          <Clock className="h-3 w-3 mr-1" />
          Due Soon
        </Badge>
      );
    }
    return (
      <Badge className="bg-gray-500/10 text-gray-700 border-gray-200">
        <Calendar className="h-3 w-3 mr-1" />
        Pending
      </Badge>
    );
  };

  const AssignmentCard = ({ assignment }: { assignment: typeof mockAssignments[0] }) => (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4 mb-4">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {getStatusBadge(assignment)}
            </div>
            <h3 className="font-semibold text-foreground text-lg">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
              <BookOpen className="h-4 w-4" />
              {assignment.course}
            </p>
          </div>
          {assignment.status === "graded" && (
            <div className="text-right">
              <p className="text-2xl font-bold text-primary">{assignment.score}</p>
              <p className="text-xs text-muted-foreground">/ {assignment.maxScore}</p>
            </div>
          )}
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{assignment.description}</p>

        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            Due: {format(assignment.dueDate, "MMM d, yyyy")}
          </span>
          <span className="flex items-center gap-1">
            <FileText className="h-4 w-4" />
            Max Score: {assignment.maxScore}
          </span>
          {assignment.submittedAt && (
            <span className="flex items-center gap-1">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              Submitted: {format(assignment.submittedAt, "MMM d")}
            </span>
          )}
        </div>

        {assignment.feedback && (
          <div className="p-3 rounded-lg bg-muted/50 mb-4">
            <p className="text-sm font-medium text-foreground mb-1">Instructor Feedback:</p>
            <p className="text-sm text-muted-foreground">{assignment.feedback}</p>
          </div>
        )}

        <div className="flex gap-2">
          {assignment.status === "pending" && (
            <Button className="flex-1">
              <Upload className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
          )}
          {assignment.status === "submitted" && (
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Submission
            </Button>
          )}
          {assignment.status === "graded" && (
            <Button variant="outline" className="flex-1">
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  // Calculate stats
  const totalScore = gradedAssignments.reduce((acc, a) => acc + (a.score || 0), 0);
  const maxPossibleScore = gradedAssignments.reduce((acc, a) => acc + a.maxScore, 0);
  const averageScore = maxPossibleScore > 0 ? Math.round((totalScore / maxPossibleScore) * 100) : 0;

  return (
    <StudentLayout title="My Assignments">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{submittedAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Under Review</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{gradedAssignments.length}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <ClipboardList className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Assignments Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="pending">
              Pending ({pendingAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="submitted">
              Submitted ({submittedAssignments.length})
            </TabsTrigger>
            <TabsTrigger value="graded">
              Graded ({gradedAssignments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {pendingAssignments.length > 0 ? (
              pendingAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">All Caught Up!</h3>
                  <p className="text-muted-foreground">You have no pending assignments.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="submitted" className="space-y-4">
            {submittedAssignments.length > 0 ? (
              submittedAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Submissions</h3>
                  <p className="text-muted-foreground">You haven't submitted any assignments yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="graded" className="space-y-4">
            {gradedAssignments.length > 0 ? (
              gradedAssignments.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <ClipboardList className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Graded Work</h3>
                  <p className="text-muted-foreground">No assignments have been graded yet.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
