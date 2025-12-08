import { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  FileText,
  Tag,
  Lock,
  Unlock,
  Filter,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockGuruvani = [
  { id: 1, title: "अहिंसा परमो धर्मः", type: "Sutra", language: "Sanskrit", date: "2024-01-15", tags: ["Ahimsa", "Core"], status: "published", restricted: true },
  { id: 2, title: "Teachings on Aparigraha", type: "Discourse", language: "Hindi", date: "2024-02-10", tags: ["Aparigraha"], status: "published", restricted: false },
  { id: 3, title: "Meditation Guidance", type: "Audio", language: "Gujarati", date: "2024-03-05", tags: ["Meditation"], status: "draft", restricted: true },
  { id: 4, title: "Jain Philosophy", type: "Document", language: "English", date: "2024-03-20", tags: ["Philosophy"], status: "pending", restricted: false },
];

const accessRequests = [
  { id: 1, user: "Dr. Sharma", email: "sharma@example.com", item: "अहिंसा परमो धर्मः", requestedOn: "2024-03-15", status: "pending" },
  { id: 2, user: "Priya Jain", email: "priya@example.com", item: "Meditation Guidance", requestedOn: "2024-03-14", status: "pending" },
  { id: 3, user: "Anil Kumar", email: "anil@example.com", item: "Jain Philosophy", requestedOn: "2024-03-10", status: "approved" },
];

export default function GuruvaniManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Guruvani Management</h1>
            <p className="text-muted-foreground mt-1">Manage sacred teachings and access requests</p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="rounded-xl bg-gradient-to-r from-primary to-gold hover:opacity-90">
                <Plus className="mr-2 h-4 w-4" />
                Add Guruvani
              </Button>
            </DialogTrigger>
            <DialogContent className="rounded-2xl max-w-2xl">
              <DialogHeader>
                <DialogTitle>Add New Guruvani</DialogTitle>
                <DialogDescription>Add sacred teaching content</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Title</Label>
                    <Input placeholder="Enter title" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label>Type</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sutra">Sutra</SelectItem>
                        <SelectItem value="discourse">Discourse</SelectItem>
                        <SelectItem value="audio">Audio</SelectItem>
                        <SelectItem value="document">Document</SelectItem>
                        <SelectItem value="video">Video</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sanskrit">Sanskrit</SelectItem>
                        <SelectItem value="hindi">Hindi</SelectItem>
                        <SelectItem value="gujarati">Gujarati</SelectItem>
                        <SelectItem value="english">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Tags</Label>
                    <Input placeholder="Enter tags (comma separated)" className="rounded-xl" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Summary</Label>
                  <Textarea placeholder="Brief summary..." className="rounded-xl" rows={2} />
                </div>
                <div className="space-y-2">
                  <Label>Full Content</Label>
                  <Textarea placeholder="Full teaching content..." className="rounded-xl" rows={4} />
                </div>
                <div className="space-y-2">
                  <Label>Attach File (PDF/Audio/Video)</Label>
                  <Input type="file" className="rounded-xl" />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button className="rounded-xl bg-primary">Add Guruvani</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="content" className="space-y-6">
          <TabsList className="bg-muted/50 rounded-xl p-1">
            <TabsTrigger value="content" className="rounded-lg data-[state=active]:bg-background">
              <BookOpen className="h-4 w-4 mr-2" />
              Content
            </TabsTrigger>
            <TabsTrigger value="requests" className="rounded-lg data-[state=active]:bg-background">
              <Lock className="h-4 w-4 mr-2" />
              Access Requests
              <Badge className="ml-2 bg-destructive/10 text-destructive">2</Badge>
            </TabsTrigger>
            <TabsTrigger value="tags" className="rounded-lg data-[state=active]:bg-background">
              <Tag className="h-4 w-4 mr-2" />
              Tags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="space-y-4">
            {/* Search & Filter */}
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search Guruvani..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl"
                    />
                  </div>
                  <Select>
                    <SelectTrigger className="w-[180px] rounded-xl">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="sutra">Sutra</SelectItem>
                      <SelectItem value="discourse">Discourse</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Content Table */}
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead>Title</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Language</TableHead>
                      <TableHead>Tags</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Access</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockGuruvani.map((item) => (
                      <TableRow key={item.id} className="hover:bg-muted/30">
                        <TableCell className="font-medium">{item.title}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="bg-primary/10 text-primary">
                            {item.type}
                          </Badge>
                        </TableCell>
                        <TableCell>{item.language}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {item.tags.map((tag) => (
                              <Badge key={tag} variant="secondary" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              item.status === "published" 
                                ? "bg-sage/10 text-sage" 
                                : item.status === "pending"
                                ? "bg-gold/10 text-gold"
                                : "bg-muted text-muted-foreground"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {item.restricted ? (
                            <Lock className="h-4 w-4 text-destructive" />
                          ) : (
                            <Unlock className="h-4 w-4 text-sage" />
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="rounded-lg">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="rounded-xl">
                              <DropdownMenuItem>
                                <Eye className="h-4 w-4 mr-2" />
                                View
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="h-4 w-4 mr-2" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="requests" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Pending Access Requests</CardTitle>
                <CardDescription>Approve or reject Guruvani access requests</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Requested Item</TableHead>
                      <TableHead>Requested On</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {accessRequests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell>
                          <div>
                            <p className="font-medium">{request.user}</p>
                            <p className="text-sm text-muted-foreground">{request.email}</p>
                          </div>
                        </TableCell>
                        <TableCell>{request.item}</TableCell>
                        <TableCell>{request.requestedOn}</TableCell>
                        <TableCell>
                          <Badge 
                            variant="outline" 
                            className={
                              request.status === "approved" 
                                ? "bg-sage/10 text-sage" 
                                : request.status === "pending"
                                ? "bg-gold/10 text-gold"
                                : "bg-destructive/10 text-destructive"
                            }
                          >
                            {request.status === "pending" ? <Clock className="h-3 w-3 mr-1" /> : null}
                            {request.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          {request.status === "pending" && (
                            <div className="flex justify-end gap-2">
                              <Button size="sm" className="rounded-lg bg-sage text-sage-foreground hover:bg-sage/90">
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button size="sm" variant="outline" className="rounded-lg text-destructive hover:bg-destructive/10">
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tags" className="space-y-4">
            <Card className="rounded-2xl border-0 shadow-soft">
              <CardHeader>
                <CardTitle className="text-lg">Manage Tags</CardTitle>
                <CardDescription>Organize Guruvani content with tags</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {["Ahimsa", "Aparigraha", "Meditation", "Philosophy", "Sutras", "Discourses", "Core Teachings", "Advanced"].map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-sm py-2 px-4">
                      {tag}
                      <button className="ml-2 text-muted-foreground hover:text-destructive">×</button>
                    </Badge>
                  ))}
                  <Button variant="outline" size="sm" className="rounded-full">
                    <Plus className="h-4 w-4 mr-1" />
                    Add Tag
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
}
