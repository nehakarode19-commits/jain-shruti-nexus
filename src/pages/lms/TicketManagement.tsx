import { useState } from "react";
import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Ticket,
  Plus,
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  Timer,
  Tag,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

const tickets = [
  {
    id: "TKT-001",
    title: "Book damaged during return",
    date: "2024-01-20",
    category: "Book Damage",
    subcategory: "Minor Damage",
    sla: "4 hours",
    slaStatus: "green",
    tags: ["Urgent", "Quality"],
    assignedTo: "Ramesh",
    status: "Open",
    description: "Book B-002 was returned with torn pages 45-48.",
  },
  {
    id: "TKT-002",
    title: "Missing manuscript pages",
    date: "2024-01-19",
    category: "Manuscript",
    subcategory: "Missing Pages",
    sla: "2 hours",
    slaStatus: "red",
    tags: ["Critical", "Investigation"],
    assignedTo: "Admin",
    status: "In Progress",
    description: "Manuscript H-001 reported missing pages 120-125.",
  },
  {
    id: "TKT-003",
    title: "Member complaint - overdue notice",
    date: "2024-01-18",
    category: "Member",
    subcategory: "Complaint",
    sla: "8 hours",
    slaStatus: "yellow",
    tags: ["Member Service"],
    assignedTo: "Suresh",
    status: "Open",
    description: "Member M-015 received incorrect overdue notice.",
  },
];

const categories = [
  { name: "Book Damage", subcategories: ["Minor Damage", "Major Damage", "Lost"] },
  { name: "Manuscript", subcategories: ["Missing Pages", "Preservation", "Access Request"] },
  { name: "Member", subcategories: ["Complaint", "Registration Issue", "Dispute"] },
  { name: "System", subcategories: ["Bug", "Enhancement", "Access"] },
];

export default function TicketManagement() {
  const [newTicketDialog, setNewTicketDialog] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState("");

  const getSlaColor = (status: string) => {
    switch (status) {
      case "green":
        return "bg-green-500";
      case "yellow":
        return "bg-amber-500";
      case "red":
        return "bg-destructive animate-pulse";
      default:
        return "bg-muted";
    }
  };

  const handleView = (ticket: any) => {
    setSelectedTicket(ticket);
    setViewDialog(true);
  };

  return (
    <LMSLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              Ticket Management
            </h1>
            <p className="text-muted-foreground">
              Track and resolve library issues
            </p>
          </div>
          <Button className="gap-2" onClick={() => setNewTicketDialog(true)}>
            <Plus className="h-4 w-4" />
            New Ticket
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Ticket className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">24</p>
                  <p className="text-xs text-muted-foreground">Total Open</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-destructive/10">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                </div>
                <div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-xs text-muted-foreground">SLA Breached</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-amber-500/10">
                  <Clock className="h-5 w-5 text-amber-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">8</p>
                  <p className="text-xs text-muted-foreground">In Progress</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold">156</p>
                  <p className="text-xs text-muted-foreground">Resolved (This Month)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="list" className="space-y-4">
          <TabsList className="bg-secondary/50">
            <TabsTrigger value="list">List View</TabsTrigger>
            <TabsTrigger value="kanban">Kanban View</TabsTrigger>
          </TabsList>

          <TabsContent value="list" className="space-y-4">
            {/* Filters */}
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-wrap gap-4">
                  <div className="relative flex-1 min-w-[200px]">
                    <Input placeholder="Search tickets..." className="pl-10" />
                    <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="SLA Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="green">On Track</SelectItem>
                      <SelectItem value="yellow">At Risk</SelectItem>
                      <SelectItem value="red">Breached</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name.toLowerCase()}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="open">Open</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="resolved">Resolved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Ticket Table */}
            <Card>
              <CardContent className="pt-6">
                <div className="rounded-lg border border-border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/50">
                        <TableHead>Ticket</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>SLA</TableHead>
                        <TableHead>Tags</TableHead>
                        <TableHead>Assigned To</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tickets.map((ticket) => (
                        <TableRow key={ticket.id} className="hover:bg-secondary/30">
                          <TableCell>
                            <div>
                              <p className="font-medium">{ticket.title}</p>
                              <p className="text-xs text-muted-foreground">
                                {ticket.id} • {ticket.date}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p className="text-sm">{ticket.category}</p>
                              <p className="text-xs text-muted-foreground">
                                {ticket.subcategory}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <div
                                className={`h-2 w-2 rounded-full ${getSlaColor(
                                  ticket.slaStatus
                                )}`}
                              />
                              <span className="text-sm">{ticket.sla}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {ticket.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="text-xs"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <User className="h-3 w-3 text-muted-foreground" />
                              {ticket.assignedTo}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                ticket.status === "Open"
                                  ? "outline"
                                  : ticket.status === "In Progress"
                                  ? "secondary"
                                  : "default"
                              }
                            >
                              {ticket.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleView(ticket)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="kanban" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Open Column */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-blue-500" />
                    Open
                    <Badge variant="secondary" className="ml-auto">
                      2
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tickets
                    .filter((t) => t.status === "Open")
                    .map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleView(ticket)}
                      >
                        <CardContent className="p-3 space-y-2">
                          <p className="font-medium text-sm">{ticket.title}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div
                                className={`h-2 w-2 rounded-full ${getSlaColor(
                                  ticket.slaStatus
                                )}`}
                              />
                              <span className="text-xs text-muted-foreground">
                                {ticket.sla}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {ticket.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
              </Card>

              {/* In Progress Column */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-amber-500" />
                    In Progress
                    <Badge variant="secondary" className="ml-auto">
                      1
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {tickets
                    .filter((t) => t.status === "In Progress")
                    .map((ticket) => (
                      <Card
                        key={ticket.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => handleView(ticket)}
                      >
                        <CardContent className="p-3 space-y-2">
                          <p className="font-medium text-sm">{ticket.title}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <div
                                className={`h-2 w-2 rounded-full ${getSlaColor(
                                  ticket.slaStatus
                                )}`}
                              />
                              <span className="text-xs text-muted-foreground">
                                {ticket.sla}
                              </span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {ticket.category}
                            </Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </CardContent>
              </Card>

              {/* Resolved Column */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-green-500" />
                    Resolved
                    <Badge variant="secondary" className="ml-auto">
                      0
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No resolved tickets to show
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* New Ticket Dialog */}
        <Dialog open={newTicketDialog} onOpenChange={setNewTicketDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-primary" />
                Create New Ticket
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title *</Label>
                <Input placeholder="Brief description of the issue" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category *</Label>
                  <Select onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.name} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Subcategory</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories
                        .find((c) => c.name === selectedCategory)
                        ?.subcategories.map((sub) => (
                          <SelectItem key={sub} value={sub}>
                            {sub}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>SLA</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select SLA" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="2">2 Hours</SelectItem>
                      <SelectItem value="4">4 Hours</SelectItem>
                      <SelectItem value="8">8 Hours</SelectItem>
                      <SelectItem value="24">24 Hours</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Assign To</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="admin">Admin</SelectItem>
                      <SelectItem value="ramesh">Ramesh</SelectItem>
                      <SelectItem value="suresh">Suresh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Tags</Label>
                <Input placeholder="Add tags separated by comma" />
              </div>
              <div className="space-y-2">
                <Label>Description *</Label>
                <Textarea placeholder="Detailed description..." rows={3} />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setNewTicketDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setNewTicketDialog(false)}>
                Create Ticket
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* View Ticket Dialog */}
        <Dialog open={viewDialog} onOpenChange={setViewDialog}>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{selectedTicket?.id}</DialogTitle>
            </DialogHeader>
            {selectedTicket && (
              <div className="space-y-4 py-4">
                <h3 className="font-semibold text-lg">{selectedTicket.title}</h3>
                <p className="text-muted-foreground">{selectedTicket.description}</p>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">
                      {selectedTicket.category} / {selectedTicket.subcategory}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline">{selectedTicket.status}</Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">SLA</p>
                    <div className="flex items-center gap-2">
                      <div
                        className={`h-2 w-2 rounded-full ${getSlaColor(
                          selectedTicket.slaStatus
                        )}`}
                      />
                      {selectedTicket.sla}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Assigned To</p>
                    <p className="font-medium">{selectedTicket.assignedTo}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedTicket.tags.map((tag: string) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setViewDialog(false)}>
                Close
              </Button>
              <Button>Update Status</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </LMSLayout>
  );
}
