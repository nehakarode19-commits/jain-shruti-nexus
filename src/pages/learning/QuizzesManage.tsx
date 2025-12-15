import { LearningLayout } from "@/components/learning/LearningLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { Plus, Pencil, Trash2, HelpCircle, Search, CheckCircle, Clock, ListChecks } from "lucide-react";
import { useState } from "react";
import { useQuizzes, useSaveQuiz, useDeleteQuiz, useQuizQuestions, useSaveQuizQuestion, useDeleteQuizQuestion } from "@/hooks/useLMSQuizzes";
import { useAdminCourses } from "@/hooks/useLMS";

const QuizzesManage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCourseId, setSelectedCourseId] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isQuestionsDialogOpen, setIsQuestionsDialogOpen] = useState(false);
  const [editingQuiz, setEditingQuiz] = useState<any>(null);
  const [selectedQuizId, setSelectedQuizId] = useState<string>("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    course_id: "",
    time_limit_minutes: 30,
    passing_score: 60,
    max_attempts: 3,
    is_published: false,
  });
  const [questionForm, setQuestionForm] = useState({
    question_text: "",
    question_type: "multiple_choice",
    options: ["", "", "", ""],
    correct_answer: "",
    points: 1,
  });

  const { data: quizzes = [], isLoading } = useQuizzes(selectedCourseId !== "all" ? selectedCourseId : undefined);
  const { data: courses = [] } = useAdminCourses();
  const { data: questions = [] } = useQuizQuestions(selectedQuizId);
  const saveQuiz = useSaveQuiz();
  const deleteQuiz = useDeleteQuiz();
  const saveQuestion = useSaveQuizQuestion();
  const deleteQuestion = useDeleteQuizQuestion();

  const filteredQuizzes = quizzes.filter(q =>
    q.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      course_id: "",
      time_limit_minutes: 30,
      passing_score: 60,
      max_attempts: 3,
      is_published: false,
    });
    setEditingQuiz(null);
  };

  const resetQuestionForm = () => {
    setQuestionForm({
      question_text: "",
      question_type: "multiple_choice",
      options: ["", "", "", ""],
      correct_answer: "",
      points: 1,
    });
  };

  const handleEdit = (quiz: any) => {
    setEditingQuiz(quiz);
    setFormData({
      title: quiz.title,
      description: quiz.description || "",
      course_id: quiz.course_id || "",
      time_limit_minutes: quiz.time_limit_minutes || 30,
      passing_score: quiz.passing_score || 60,
      max_attempts: quiz.max_attempts || 3,
      is_published: quiz.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    await saveQuiz.mutateAsync({
      ...(editingQuiz ? { id: editingQuiz.id } : {}),
      ...formData,
      course_id: formData.course_id || null,
    });
    setIsDialogOpen(false);
    resetForm();
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this quiz?")) {
      await deleteQuiz.mutateAsync(id);
    }
  };

  const openQuestions = (quizId: string) => {
    setSelectedQuizId(quizId);
    setIsQuestionsDialogOpen(true);
  };

  const handleSaveQuestion = async () => {
    await saveQuestion.mutateAsync({
      quiz_id: selectedQuizId,
      question_text: questionForm.question_text,
      question_type: questionForm.question_type,
      options: questionForm.options.filter(o => o.trim()),
      correct_answer: questionForm.correct_answer,
      points: questionForm.points,
      order_index: questions.length,
    });
    resetQuestionForm();
  };

  const handleDeleteQuestion = async (id: string) => {
    await deleteQuestion.mutateAsync({ id, quizId: selectedQuizId });
  };

  const getCourseName = (courseId: string | null) => {
    if (!courseId) return "-";
    const course = courses.find(c => c.id === courseId);
    return course?.title || "-";
  };

  return (
    <LearningLayout title="Quizzes">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-heading font-bold">Manage Quizzes</h1>
            <p className="text-muted-foreground">Create assessments to test learner knowledge</p>
          </div>
          <Button onClick={() => { resetForm(); setIsDialogOpen(true); }} className="gap-2">
            <Plus className="h-4 w-4" />
            Add Quiz
          </Button>
        </div>

        {/* Stats */}
        <div className="grid sm:grid-cols-4 gap-4">
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <HelpCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizzes.length}</p>
                <p className="text-xs text-muted-foreground">Total Quizzes</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-green-500/10 text-green-600">
                <CheckCircle className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizzes.filter(q => q.is_published).length}</p>
                <p className="text-xs text-muted-foreground">Published</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-600">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{quizzes.filter(q => !q.is_published).length}</p>
                <p className="text-xs text-muted-foreground">Draft</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="p-2 rounded-lg bg-orange/10 text-orange">
                <ListChecks className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{courses.length}</p>
                <p className="text-xs text-muted-foreground">Courses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex gap-4 flex-wrap">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search quizzes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCourseId} onValueChange={setSelectedCourseId}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card className="border-border">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Quiz</TableHead>
                  <TableHead>Course</TableHead>
                  <TableHead>Time Limit</TableHead>
                  <TableHead>Pass %</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      Loading quizzes...
                    </TableCell>
                  </TableRow>
                ) : filteredQuizzes.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                      No quizzes found. Create your first quiz!
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredQuizzes.map((quiz) => (
                    <TableRow key={quiz.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{quiz.title}</p>
                          <p className="text-sm text-muted-foreground line-clamp-1">{quiz.description}</p>
                        </div>
                      </TableCell>
                      <TableCell>{getCourseName(quiz.course_id)}</TableCell>
                      <TableCell>{quiz.time_limit_minutes ? `${quiz.time_limit_minutes} min` : "No limit"}</TableCell>
                      <TableCell>{quiz.passing_score}%</TableCell>
                      <TableCell>
                        <Badge variant={quiz.is_published ? "default" : "secondary"}>
                          {quiz.is_published ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="sm" onClick={() => openQuestions(quiz.id)}>
                            <ListChecks className="h-4 w-4 mr-1" />
                            Questions
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(quiz)}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDelete(quiz.id)}>
                            <Trash2 className="h-4 w-4" />
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

        {/* Quiz Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editingQuiz ? "Edit Quiz" : "Add New Quiz"}</DialogTitle>
              <DialogDescription>Create an assessment with multiple choice questions.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Title *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter quiz title"
                />
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Quiz description"
                  rows={2}
                />
              </div>
              <div>
                <Label>Course</Label>
                <Select value={formData.course_id} onValueChange={(value) => setFormData({ ...formData, course_id: value })}>
                  <SelectTrigger><SelectValue placeholder="Select course" /></SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>{course.title}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>Time (min)</Label>
                  <Input
                    type="number"
                    value={formData.time_limit_minutes}
                    onChange={(e) => setFormData({ ...formData, time_limit_minutes: parseInt(e.target.value) || 30 })}
                  />
                </div>
                <div>
                  <Label>Pass %</Label>
                  <Input
                    type="number"
                    value={formData.passing_score}
                    onChange={(e) => setFormData({ ...formData, passing_score: parseInt(e.target.value) || 60 })}
                  />
                </div>
                <div>
                  <Label>Attempts</Label>
                  <Input
                    type="number"
                    value={formData.max_attempts}
                    onChange={(e) => setFormData({ ...formData, max_attempts: parseInt(e.target.value) || 3 })}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Label>Publish Quiz</Label>
                <Switch checked={formData.is_published} onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })} />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleSave} disabled={!formData.title || saveQuiz.isPending}>
                {saveQuiz.isPending ? "Saving..." : editingQuiz ? "Update" : "Create"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Questions Dialog */}
        <Dialog open={isQuestionsDialogOpen} onOpenChange={setIsQuestionsDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Manage Questions</DialogTitle>
              <DialogDescription>Add questions to this quiz.</DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Existing Questions */}
              {questions.length > 0 && (
                <div className="space-y-2">
                  <h4 className="font-medium">Questions ({questions.length})</h4>
                  {questions.map((q, i) => (
                    <div key={q.id} className="p-3 rounded-lg bg-muted flex justify-between items-start">
                      <div>
                        <p className="font-medium">{i + 1}. {q.question_text}</p>
                        <p className="text-sm text-muted-foreground">Answer: {q.correct_answer} | Points: {q.points}</p>
                      </div>
                      <Button variant="ghost" size="icon" className="text-destructive" onClick={() => handleDeleteQuestion(q.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add Question Form */}
              <div className="border-t pt-4 space-y-4">
                <h4 className="font-medium">Add New Question</h4>
                <div>
                  <Label>Question *</Label>
                  <Textarea
                    value={questionForm.question_text}
                    onChange={(e) => setQuestionForm({ ...questionForm, question_text: e.target.value })}
                    placeholder="Enter your question"
                    rows={2}
                  />
                </div>
                <div>
                  <Label>Options</Label>
                  {questionForm.options.map((opt, i) => (
                    <Input
                      key={i}
                      value={opt}
                      onChange={(e) => {
                        const newOpts = [...questionForm.options];
                        newOpts[i] = e.target.value;
                        setQuestionForm({ ...questionForm, options: newOpts });
                      }}
                      placeholder={`Option ${i + 1}`}
                      className="mt-2"
                    />
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Correct Answer *</Label>
                    <Select
                      value={questionForm.correct_answer}
                      onValueChange={(value) => setQuestionForm({ ...questionForm, correct_answer: value })}
                    >
                      <SelectTrigger><SelectValue placeholder="Select correct answer" /></SelectTrigger>
                      <SelectContent>
                        {questionForm.options.filter(o => o.trim()).map((opt, i) => (
                          <SelectItem key={i} value={opt}>{opt}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Points</Label>
                    <Input
                      type="number"
                      value={questionForm.points}
                      onChange={(e) => setQuestionForm({ ...questionForm, points: parseInt(e.target.value) || 1 })}
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSaveQuestion}
                  disabled={!questionForm.question_text || !questionForm.correct_answer || saveQuestion.isPending}
                  className="w-full"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Question
                </Button>
              </div>
            </div>

            <DialogFooter>
              <Button onClick={() => setIsQuestionsDialogOpen(false)}>Done</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LearningLayout>
  );
};

export default QuizzesManage;
