import { StudentLayout } from "@/components/learning/StudentLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  HelpCircle, 
  Clock, 
  Calendar, 
  CheckCircle, 
  Play,
  Trophy,
  Target,
  BookOpen,
  AlertCircle,
  BarChart3
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "react-router-dom";

// Mock quizzes data
const mockQuizzes = [
  {
    id: "1",
    title: "Jain Philosophy Fundamentals",
    course: "Jain Philosophy Foundation",
    description: "Test your understanding of basic Jain philosophical concepts.",
    totalQuestions: 20,
    passingScore: 70,
    timeLimit: 30,
    status: "available",
    attempts: 0,
    maxAttempts: 3,
    bestScore: null,
  },
  {
    id: "2",
    title: "Agam Literature Quiz",
    course: "Advanced Agam Studies",
    description: "Questions on the structure and content of Jain Agam texts.",
    totalQuestions: 15,
    passingScore: 60,
    timeLimit: 25,
    status: "available",
    attempts: 1,
    maxAttempts: 3,
    bestScore: 55,
  },
  {
    id: "3",
    title: "Sanskrit Vocabulary Test",
    course: "Sanskrit for Jain Texts",
    description: "Test your knowledge of key Sanskrit terms used in Jain literature.",
    totalQuestions: 30,
    passingScore: 75,
    timeLimit: 45,
    status: "completed",
    attempts: 2,
    maxAttempts: 3,
    bestScore: 82,
    completedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
  },
  {
    id: "4",
    title: "Manuscript Studies Midterm",
    course: "Manuscript Studies",
    description: "Comprehensive quiz covering manuscript dating, preservation, and analysis.",
    totalQuestions: 25,
    passingScore: 65,
    timeLimit: 40,
    status: "completed",
    attempts: 1,
    maxAttempts: 2,
    bestScore: 88,
    completedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
  },
  {
    id: "5",
    title: "Jain Ethics Assessment",
    course: "Jain Philosophy Foundation",
    description: "Evaluate your understanding of Jain ethical principles and their applications.",
    totalQuestions: 20,
    passingScore: 70,
    timeLimit: 35,
    status: "locked",
    unlockDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    attempts: 0,
    maxAttempts: 2,
    bestScore: null,
  },
];

export default function MyQuizzes() {
  const availableQuizzes = mockQuizzes.filter((q) => q.status === "available");
  const completedQuizzes = mockQuizzes.filter((q) => q.status === "completed");
  const lockedQuizzes = mockQuizzes.filter((q) => q.status === "locked");

  const totalCompleted = completedQuizzes.length;
  const totalPassed = completedQuizzes.filter((q) => (q.bestScore || 0) >= q.passingScore).length;
  const averageScore = completedQuizzes.length > 0 
    ? Math.round(completedQuizzes.reduce((acc, q) => acc + (q.bestScore || 0), 0) / completedQuizzes.length)
    : 0;

  const QuizCard = ({ quiz }: { quiz: typeof mockQuizzes[0] }) => {
    const isPassed = quiz.bestScore !== null && quiz.bestScore >= quiz.passingScore;
    const attemptsLeft = quiz.maxAttempts - quiz.attempts;

    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                {quiz.status === "completed" && isPassed && (
                  <Badge className="bg-emerald-500/10 text-emerald-700 border-emerald-200">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Passed
                  </Badge>
                )}
                {quiz.status === "completed" && !isPassed && (
                  <Badge className="bg-amber-500/10 text-amber-700 border-amber-200">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    Needs Improvement
                  </Badge>
                )}
                {quiz.status === "available" && quiz.attempts > 0 && (
                  <Badge className="bg-blue-500/10 text-blue-700 border-blue-200">
                    <Target className="h-3 w-3 mr-1" />
                    In Progress
                  </Badge>
                )}
                {quiz.status === "available" && quiz.attempts === 0 && (
                  <Badge className="bg-gray-500/10 text-gray-700 border-gray-200">
                    <HelpCircle className="h-3 w-3 mr-1" />
                    Not Started
                  </Badge>
                )}
                {quiz.status === "locked" && (
                  <Badge className="bg-gray-500/10 text-gray-500 border-gray-200">
                    <Clock className="h-3 w-3 mr-1" />
                    Locked
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-foreground text-lg">{quiz.title}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <BookOpen className="h-4 w-4" />
                {quiz.course}
              </p>
            </div>
            {quiz.bestScore !== null && (
              <div className="text-right">
                <p className={`text-2xl font-bold ${isPassed ? "text-emerald-600" : "text-amber-600"}`}>
                  {quiz.bestScore}%
                </p>
                <p className="text-xs text-muted-foreground">Best Score</p>
              </div>
            )}
          </div>

          <p className="text-sm text-muted-foreground mb-4">{quiz.description}</p>

          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
            <span className="flex items-center gap-1">
              <HelpCircle className="h-4 w-4" />
              {quiz.totalQuestions} Questions
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {quiz.timeLimit} mins
            </span>
            <span className="flex items-center gap-1">
              <Target className="h-4 w-4" />
              Pass: {quiz.passingScore}%
            </span>
            <span className="flex items-center gap-1">
              <Trophy className="h-4 w-4" />
              {attemptsLeft} attempts left
            </span>
          </div>

          {quiz.status === "locked" && quiz.unlockDate && (
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <p className="text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 inline mr-1" />
                Unlocks on {format(quiz.unlockDate, "MMM d, yyyy")}
              </p>
            </div>
          )}

          {quiz.status === "completed" && quiz.completedAt && (
            <div className="p-3 rounded-lg bg-muted/50 mb-4">
              <p className="text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 inline mr-1" />
                Completed on {format(quiz.completedAt, "MMM d, yyyy")}
              </p>
            </div>
          )}

          <div className="flex gap-2">
            {quiz.status === "available" && attemptsLeft > 0 && (
              <Button className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                {quiz.attempts > 0 ? "Retry Quiz" : "Start Quiz"}
              </Button>
            )}
            {quiz.status === "completed" && attemptsLeft > 0 && (
              <>
                <Button variant="outline" className="flex-1">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  View Results
                </Button>
                <Button className="flex-1">
                  <Play className="h-4 w-4 mr-2" />
                  Retry Quiz
                </Button>
              </>
            )}
            {quiz.status === "completed" && attemptsLeft === 0 && (
              <Button variant="outline" className="flex-1">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Results
              </Button>
            )}
            {quiz.status === "locked" && (
              <Button variant="outline" className="flex-1" disabled>
                <Clock className="h-4 w-4 mr-2" />
                Coming Soon
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <StudentLayout title="My Quizzes">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-xl">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{mockQuizzes.length}</p>
                <p className="text-sm text-muted-foreground">Total Quizzes</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalCompleted}</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-amber-500/10 rounded-xl">
                <Trophy className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalPassed}</p>
                <p className="text-sm text-muted-foreground">Passed</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="p-3 bg-blue-500/10 rounded-xl">
                <BarChart3 className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{averageScore}%</p>
                <p className="text-sm text-muted-foreground">Average Score</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quizzes Tabs */}
        <Tabs defaultValue="available" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="available">
              Available ({availableQuizzes.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedQuizzes.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming">
              Upcoming ({lockedQuizzes.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="available" className="space-y-4">
            {availableQuizzes.length > 0 ? (
              availableQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <HelpCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Available Quizzes</h3>
                  <p className="text-muted-foreground">Check back later for new quizzes.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedQuizzes.length > 0 ? (
              completedQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Completed Quizzes</h3>
                  <p className="text-muted-foreground">Complete quizzes to see your results here.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {lockedQuizzes.length > 0 ? (
              lockedQuizzes.map((quiz) => (
                <QuizCard key={quiz.id} quiz={quiz} />
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">No Upcoming Quizzes</h3>
                  <p className="text-muted-foreground">All quizzes are currently available.</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </StudentLayout>
  );
}
