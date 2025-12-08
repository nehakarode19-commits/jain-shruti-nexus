import { useState } from "react";
import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
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
  DialogDescription,
  DialogFooter,
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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  BookMarked,
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  BookOpen,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, addDays } from "date-fns";

const recentIssues = [
  {
    id: 1,
    memberId: "M-001",
    memberName: "Ramesh Patel",
    bookNo: "B-001",
    bookTitle: "आगम एनसाइक्लोपीडिया खंड १",
    issueDate: "2024-01-15",
    dueDate: "2024-01-29",
    status: "Active",
  },
  {
    id: 2,
    memberId: "M-002",
    memberName: "Suresh Shah",
    bookNo: "B-002",
    bookTitle: "जैन धर्म का इतिहास",
    issueDate: "2024-01-10",
    dueDate: "2024-01-24",
    status: "Overdue",
  },
];

export default function BookIssue() {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [isOldBook, setIsOldBook] = useState(false);

  const handleBookSearch = (bookNo: string) => {
    // Simulate finding an old book (>50 years)
    if (bookNo === "B-003") {
      setIsOldBook(true);
      setSelectedBook({
        bookNo: "B-003",
        title: "कल्प सूत्र",
        year: 1952,
        condition: "Fragile",
      });
    } else {
      setIsOldBook(false);
      setSelectedBook({
        bookNo: bookNo,
        title: "Sample Book",
        year: 2020,
        condition: "Good",
      });
    }
  };

  const issueDate = new Date();
  const dueDate = addDays(issueDate, 14);

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Issue</h1>
          <p className="text-muted-foreground">
            Issue books to library members
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Issue Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookMarked className="h-5 w-5 text-primary" />
                New Issue
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Member Search */}
              <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4" />
                  Member Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="memberId">Member ID *</Label>
                    <div className="relative">
                      <Input id="memberId" placeholder="e.g., M-001" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="memberName">Member Name</Label>
                    <Input
                      id="memberName"
                      placeholder="Auto-filled"
                      disabled
                      className="bg-secondary/50"
                    />
                  </div>
                </div>
              </div>

              {/* Book Search */}
              <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <BookOpen className="h-4 w-4" />
                  Book Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bookNo">Book No *</Label>
                    <div className="relative">
                      <Input
                        id="bookNo"
                        placeholder="e.g., B-001"
                        onChange={(e) => handleBookSearch(e.target.value)}
                      />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bookTitle">Book Title</Label>
                    <Input
                      id="bookTitle"
                      value={selectedBook?.title || ""}
                      placeholder="Auto-filled"
                      disabled
                      className="bg-secondary/50"
                    />
                  </div>
                </div>

                {/* Old Book Warning */}
                {isOldBook && (
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <div>
                      <p className="font-medium text-destructive">
                        Reference Only
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This book is older than 50 years and cannot be issued.
                        It can only be read inside the library.
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Date Fields */}
              <div className="p-4 rounded-lg bg-secondary/30 space-y-4">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Calendar className="h-4 w-4" />
                  Issue Details
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Issue Date</Label>
                    <Input
                      value={format(issueDate, "dd/MM/yyyy")}
                      disabled
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Due Date (14 days)</Label>
                    <Input
                      value={format(dueDate, "dd/MM/yyyy")}
                      disabled
                      className="bg-secondary/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="condition">Current Condition</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <Button
                        className="w-full gap-2"
                        variant="hero"
                        size="lg"
                        disabled={isOldBook}
                        onClick={() => setConfirmDialog(true)}
                      >
                        <BookMarked className="h-5 w-5" />
                        Issue Book
                      </Button>
                    </div>
                  </TooltipTrigger>
                  {isOldBook && (
                    <TooltipContent>
                      <p>This book cannot be issued (Reference Only)</p>
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">42</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Books Issued Today
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-destructive">8</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Overdue Returns
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-500">156</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Active Issues
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Issues Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary/50">
                    <TableHead>Member</TableHead>
                    <TableHead>Book</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentIssues.map((issue) => (
                    <TableRow key={issue.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{issue.memberName}</p>
                          <p className="text-xs text-muted-foreground">
                            {issue.memberId}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{issue.bookTitle}</p>
                          <p className="text-xs text-muted-foreground">
                            {issue.bookNo}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>{issue.issueDate}</TableCell>
                      <TableCell>{issue.dueDate}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            issue.status === "Active" ? "default" : "destructive"
                          }
                        >
                          {issue.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Confirmation Dialog */}
        <Dialog open={confirmDialog} onOpenChange={setConfirmDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                Confirm Book Issue
              </DialogTitle>
              <DialogDescription>
                Please confirm the following issue details:
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-3 py-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Member:</span>
                <span className="font-medium">Ramesh Patel (M-001)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Book:</span>
                <span className="font-medium">Sample Book (B-001)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date:</span>
                <span className="font-medium">
                  {format(issueDate, "dd/MM/yyyy")}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Due Date:</span>
                <span className="font-medium">
                  {format(dueDate, "dd/MM/yyyy")}
                </span>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialog(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={() => setConfirmDialog(false)}>
                Confirm Issue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LMSLayout>
  );
}
