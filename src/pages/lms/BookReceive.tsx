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
  BookDown,
  Search,
  AlertTriangle,
  CheckCircle,
  Calendar,
  User,
  BookOpen,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format, differenceInDays } from "date-fns";

const issuedBooks = [
  {
    id: 1,
    memberId: "M-001",
    memberName: "Ramesh Patel",
    bookNo: "B-001",
    bookTitle: "आगम एनसाइक्लोपीडिया खंड १",
    issueDate: "2024-01-15",
    dueDate: "2024-01-29",
    overdueDays: 0,
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
    overdueDays: 5,
    status: "Overdue",
  },
  {
    id: 3,
    memberId: "M-003",
    memberName: "Meena Jain",
    bookNo: "B-004",
    bookTitle: "Prakrit Grammar",
    issueDate: "2024-01-18",
    dueDate: "2024-02-01",
    overdueDays: 0,
    status: "Active",
  },
];

export default function BookReceive() {
  const [confirmDialog, setConfirmDialog] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<any>(null);

  const handleReceive = (issue: any) => {
    setSelectedIssue(issue);
    setConfirmDialog(true);
  };

  const returnDate = new Date();

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Book Receive</h1>
          <p className="text-muted-foreground">
            Process book returns from members
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Receive Form */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookDown className="h-5 w-5 text-primary" />
                Quick Return
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="memberId">Member ID *</Label>
                  <div className="relative">
                    <Input id="memberId" placeholder="e.g., M-001" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bookNo">Book No *</Label>
                  <div className="relative">
                    <Input id="bookNo" placeholder="e.g., B-001" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Return Date</Label>
                  <Input
                    value={format(returnDate, "dd/MM/yyyy")}
                    disabled
                    className="bg-secondary/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnCondition">Return Condition *</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="excellent">Excellent</SelectItem>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="fair">Fair</SelectItem>
                      <SelectItem value="damaged">Damaged</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button className="w-full gap-2" variant="hero" size="lg">
                <BookDown className="h-5 w-5" />
                Process Return
              </Button>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-green-500">38</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Returns Today
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-amber-500">12</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Due This Week
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <p className="text-4xl font-bold text-destructive">8</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Overdue Items
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Issued Books Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Currently Issued Books
            </CardTitle>
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
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {issuedBooks.map((issue) => (
                    <TableRow key={issue.id} className="hover:bg-secondary/30">
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
                        <div className="flex items-center gap-2">
                          <Badge
                            variant={
                              issue.status === "Active"
                                ? "default"
                                : "destructive"
                            }
                          >
                            {issue.status}
                          </Badge>
                          {issue.overdueDays > 0 && (
                            <span className="text-xs text-destructive flex items-center gap-1">
                              <AlertTriangle className="h-3 w-3" />
                              {issue.overdueDays} days
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleReceive(issue)}
                        >
                          Receive
                        </Button>
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
                Confirm Book Return
              </DialogTitle>
              <DialogDescription>
                Please verify the return details:
              </DialogDescription>
            </DialogHeader>
            {selectedIssue && (
              <div className="space-y-3 py-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Member:</span>
                  <span className="font-medium">
                    {selectedIssue.memberName} ({selectedIssue.memberId})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Book:</span>
                  <span className="font-medium">
                    {selectedIssue.bookTitle} ({selectedIssue.bookNo})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Issue Date:</span>
                  <span className="font-medium">{selectedIssue.issueDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Return Date:</span>
                  <span className="font-medium">
                    {format(returnDate, "dd/MM/yyyy")}
                  </span>
                </div>
                {selectedIssue.overdueDays > 0 && (
                  <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive" />
                      <span className="text-destructive font-medium">
                        Overdue by {selectedIssue.overdueDays} days
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setConfirmDialog(false)}>
                Cancel
              </Button>
              <Button variant="hero" onClick={() => setConfirmDialog(false)}>
                Confirm Return
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LMSLayout>
  );
}
