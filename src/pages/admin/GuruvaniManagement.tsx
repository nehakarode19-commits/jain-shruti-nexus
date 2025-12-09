import { useState } from "react";
import { 
  BookOpen, 
  Plus, 
  Search, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  Eye,
  Tag,
  Lock,
  Unlock,
  Filter,
  Loader2
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
import { Switch } from "@/components/ui/switch";
import { useGuruvaniList, useCreateGuruvani, useUpdateGuruvani, useDeleteGuruvani, GuruvaniInput } from "@/hooks/useGuruvani";

export default function GuruvaniManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newGuruvani, setNewGuruvani] = useState<GuruvaniInput>({
    title: "",
    content: "",
    category: "",
    source: "",
    is_published: false,
    is_restricted: false,
  });

  const { data: guruvaniList, isLoading, error } = useGuruvaniList(true);
  const createGuruvani = useCreateGuruvani();
  const updateGuruvani = useUpdateGuruvani();
  const deleteGuruvani = useDeleteGuruvani();

  const filteredGuruvani = guruvaniList?.filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCreate = async () => {
    if (!newGuruvani.title) return;
    
    await createGuruvani.mutateAsync(newGuruvani);
    setIsAddDialogOpen(false);
    setNewGuruvani({
      title: "",
      content: "",
      category: "",
      source: "",
      is_published: false,
      is_restricted: false,
    });
  };

  const handleTogglePublish = async (id: string, currentStatus: boolean) => {
    await updateGuruvani.mutateAsync({ id, is_published: !currentStatus });
  };

  const handleToggleRestricted = async (id: string, currentStatus: boolean) => {
    await updateGuruvani.mutateAsync({ id, is_restricted: !currentStatus });
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this Guruvani?")) {
      await deleteGuruvani.mutateAsync(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Guruvani Management</h1>
            <p className="text-muted-foreground mt-1">Manage sacred teachings and content</p>
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
                    <Label>Title *</Label>
                    <Input 
                      placeholder="Enter title" 
                      className="rounded-xl"
                      value={newGuruvani.title}
                      onChange={(e) => setNewGuruvani({ ...newGuruvani, title: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={newGuruvani.category || ""}
                      onValueChange={(v) => setNewGuruvani({ ...newGuruvani, category: v })}
                    >
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select category" />
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
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Input 
                    placeholder="Source reference" 
                    className="rounded-xl"
                    value={newGuruvani.source || ""}
                    onChange={(e) => setNewGuruvani({ ...newGuruvani, source: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea 
                    placeholder="Full teaching content..." 
                    className="rounded-xl" 
                    rows={4}
                    value={newGuruvani.content || ""}
                    onChange={(e) => setNewGuruvani({ ...newGuruvani, content: e.target.value })}
                  />
                </div>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={newGuruvani.is_published}
                      onCheckedChange={(checked) => setNewGuruvani({ ...newGuruvani, is_published: checked })}
                    />
                    <Label>Publish immediately</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch 
                      checked={newGuruvani.is_restricted}
                      onCheckedChange={(checked) => setNewGuruvani({ ...newGuruvani, is_restricted: checked })}
                    />
                    <Label>Restricted access</Label>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} className="rounded-xl">
                  Cancel
                </Button>
                <Button 
                  className="rounded-xl bg-primary"
                  onClick={handleCreate}
                  disabled={createGuruvani.isPending || !newGuruvani.title}
                >
                  {createGuruvani.isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding...
                    </>
                  ) : (
                    "Add Guruvani"
                  )}
                </Button>
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
                {isLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : error ? (
                  <div className="text-center py-12 text-destructive">
                    Error loading data. Please try again.
                  </div>
                ) : filteredGuruvani.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    No Guruvani content found. Add your first one!
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow className="hover:bg-transparent">
                        <TableHead>Title</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Access</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredGuruvani.map((item) => (
                        <TableRow key={item.id} className="hover:bg-muted/30">
                          <TableCell className="font-medium">{item.title}</TableCell>
                          <TableCell>
                            <Badge variant="outline" className="bg-primary/10 text-primary">
                              {item.category || "Uncategorized"}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.source || "-"}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={
                                item.is_published 
                                  ? "bg-sage/10 text-sage cursor-pointer" 
                                  : "bg-muted text-muted-foreground cursor-pointer"
                              }
                              onClick={() => handleTogglePublish(item.id, item.is_published)}
                            >
                              {item.is_published ? "Published" : "Draft"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <button onClick={() => handleToggleRestricted(item.id, item.is_restricted)}>
                              {item.is_restricted ? (
                                <Lock className="h-4 w-4 text-destructive" />
                              ) : (
                                <Unlock className="h-4 w-4 text-sage" />
                              )}
                            </button>
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
                                <DropdownMenuItem 
                                  className="text-destructive"
                                  onClick={() => handleDelete(item.id)}
                                >
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
                )}
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
