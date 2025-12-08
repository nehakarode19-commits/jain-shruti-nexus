import { useState } from "react";
import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  CheckCircle,
  XCircle,
  Eye,
  Clock,
  BookOpen,
  ScrollText,
  Users,
  AlertTriangle,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

const pendingApprovals = [
  {
    id: 1,
    type: "Book",
    title: "प्राकृत व्याकरण",
    createdBy: "Library Staff",
    dateSubmitted: "2024-01-20",
    status: "Pending",
    details: {
      author: "आचार्य हेमचंद्र",
      publisher: "Jain Sahitya",
      year: 2023,
    },
  },
  {
    id: 2,
    type: "Manuscript",
    title: "नयचक्र टीका",
    createdBy: "Senior Librarian",
    dateSubmitted: "2024-01-19",
    status: "Pending",
    details: {
      hastrapNo: "H-089",
      mulkarta: "देवसूरि",
      language: "Sanskrit",
    },
  },
  {
    id: 3,
    type: "Member",
    title: "Dr. Meena Jain",
    createdBy: "Self Registration",
    dateSubmitted: "2024-01-18",
    status: "Pending",
    details: {
      phone: "+91 76543 21098",
      city: "Delhi",
      reference: "M-001",
    },
  },
];

const approvalHistory = [
  {
    id: 1,
    type: "Book",
    title: "जैन साहित्य का इतिहास",
    approvedBy: "Admin",
    date: "2024-01-15",
    status: "Approved",
  },
  {
    id: 2,
    type: "Manuscript",
    title: "कल्प सूत्र",
    approvedBy: "Admin",
    date: "2024-01-14",
    status: "Approved",
  },
  {
    id: 3,
    type: "Member",
    title: "Suresh Shah",
    approvedBy: "Admin",
    date: "2024-01-12",
    status: "Rejected",
  },
];

export default function Approvals() {
  const [previewDialog, setPreviewDialog] = useState(false);
  const [actionDialog, setActionDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [actionType, setActionType] = useState<"approve" | "reject">("approve");
  const [remarks, setRemarks] = useState("");

  const handlePreview = (item: any) => {
    setSelectedItem(item);
    setPreviewDialog(true);
  };

  const handleAction = (item: any, type: "approve" | "reject") => {
    setSelectedItem(item);
    setActionType(type);
    setActionDialog(true);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "Book":
        return <BookOpen className="h-4 w-4" />;
      case "Manuscript":
        return <ScrollText className="h-4 w-4" />;
      case "Member":
        return <Users className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Approvals</h1>
          <p className="text-muted-foreground">
            Review and approve pending entries
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <Clock className="h-8 w-8 text-amber-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">245</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-destructive">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
                <XCircle className="h-8 w-8 text-destructive" />
              </div>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-primary">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">265</p>
                  <p className="text-sm text-muted-foreground">Total</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="pending" className="gap-2">
              <Clock className="h-4 w-4" />
              Pending (12)
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <CheckCircle className="h-4 w-4" />
              History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Created By</TableHead>
                        <TableHead>Date Submitted</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pendingApprovals.map((item) => (
                        <TableRow key={item.id} className="hover:bg-secondary/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>{item.createdBy}</TableCell>
                          <TableCell>{item.dateSubmitted}</TableCell>
                          <TableCell>
                            <Badge
                              variant="secondary"
                              className="bg-amber-500/20 text-amber-700 dark:text-amber-400"
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePreview(item)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-green-500 hover:text-green-600 hover:bg-green-500/10"
                                onClick={() => handleAction(item, "approve")}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                onClick={() => handleAction(item, "reject")}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Type</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Approved By</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {approvalHistory.map((item) => (
                        <TableRow key={item.id} className="hover:bg-secondary/30">
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(item.type)}
                              <Badge variant="outline">{item.type}</Badge>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            {item.title}
                          </TableCell>
                          <TableCell>{item.approvedBy}</TableCell>
                          <TableCell>{item.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                item.status === "Approved"
                                  ? "default"
                                  : "destructive"
                              }
                            >
                              {item.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Preview Dialog */}
        <Dialog open={previewDialog} onOpenChange={setPreviewDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {selectedItem && getTypeIcon(selectedItem.type)}
                {selectedItem?.title}
              </DialogTitle>
            </DialogHeader>
            {selectedItem && (
              <div className="space-y-4 py-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedItem.type}</Badge>
                  <Badge
                    variant="secondary"
                    className="bg-amber-500/20 text-amber-700"
                  >
                    {selectedItem.status}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {Object.entries(selectedItem.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Created By:</span>
                    <span>{selectedItem.createdBy}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span className="text-muted-foreground">Date Submitted:</span>
                    <span>{selectedItem.dateSubmitted}</span>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setPreviewDialog(false)}>
                Close
              </Button>
              <Button
                variant="default"
                className="bg-green-500 hover:bg-green-600"
                onClick={() => {
                  setPreviewDialog(false);
                  handleAction(selectedItem, "approve");
                }}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Action Dialog */}
        <Dialog open={actionDialog} onOpenChange={setActionDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                {actionType === "approve" ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-destructive" />
                )}
                {actionType === "approve" ? "Approve" : "Reject"} Entry
              </DialogTitle>
              <DialogDescription>
                {actionType === "approve"
                  ? "This will make the entry active and visible in the system."
                  : "This will reject the entry. Please provide a reason."}
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="text-sm text-muted-foreground mb-2">
                Item: <span className="font-medium text-foreground">{selectedItem?.title}</span>
              </p>
              <Textarea
                placeholder={
                  actionType === "approve"
                    ? "Optional remarks..."
                    : "Reason for rejection (required)..."
                }
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                rows={3}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setActionDialog(false)}>
                Cancel
              </Button>
              <Button
                variant={actionType === "approve" ? "default" : "destructive"}
                className={actionType === "approve" ? "bg-green-500 hover:bg-green-600" : ""}
                onClick={() => setActionDialog(false)}
              >
                {actionType === "approve" ? "Approve" : "Reject"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </LMSLayout>
  );
}
