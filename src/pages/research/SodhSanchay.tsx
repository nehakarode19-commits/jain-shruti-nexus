import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import {
  Database,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Tag,
  ArrowLeft,
  FileText,
  Calendar,
  User,
  BookOpen,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// Sample data
const sampleEntries = [
  {
    id: 1,
    title: "Ācārāṅga Sūtra - Historical Analysis",
    description: "A comprehensive analysis of the oldest surviving Jain scripture, exploring its linguistic patterns and philosophical depth.",
    author: "Dr. Padmanabh Jaini",
    publishedIn: "Journal of Jain Studies",
    year: "2018",
    source: "Academic Journal",
    relatedTo: "Jain Agamas",
    tags: ["Ācārāṅga", "Agamas", "Jain Philosophy", "Historical"],
  },
  {
    id: 2,
    title: "Tattvartha Sutra Commentary",
    description: "Modern interpretation of Umāsvāti's foundational text on Jain metaphysics and ethics.",
    author: "Dr. John Cort",
    publishedIn: "Harvard Oriental Series",
    year: "2020",
    source: "Book",
    relatedTo: "Jain Metaphysics",
    tags: ["Tattvartha", "Philosophy", "Metaphysics"],
  },
  {
    id: 3,
    title: "Mahāvīra's Teachings on Ahimsa",
    description: "An exploration of non-violence principles in Jain tradition as taught by Lord Mahāvīra.",
    author: "Prof. Sagarmal Jain",
    publishedIn: "Parshwanath Vidyapith",
    year: "2015",
    source: "Research Paper",
    relatedTo: "Jain Ethics",
    tags: ["Ahimsa", "Mahāvīra", "Ethics", "Non-violence"],
  },
  {
    id: 4,
    title: "Prakrit Language Evolution in Jain Texts",
    description: "Linguistic study of Prakrit variations found in early Jain canonical literature.",
    author: "Dr. Nalini Balbir",
    publishedIn: "Indo-Iranian Journal",
    year: "2019",
    source: "Academic Journal",
    relatedTo: "Jain Literature",
    tags: ["Prakrit", "Linguistics", "Canonical Literature"],
  },
];

const suggestedTags = [
  "Jain Philosophy",
  "Agamas",
  "Mahāvīra",
  "Ahimsa",
  "Karma",
  "Moksha",
  "Tattvartha",
  "Ācārāṅga",
  "Manuscripts",
  "Sanskrit",
  "Prakrit",
  "Digambara",
  "Śvetāmbara",
  "Ethics",
  "Meditation",
];

const SodhSanchay = () => {
  const { toast } = useToast();
  const [entries, setEntries] = useState(sampleEntries);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<typeof sampleEntries[0] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 5;

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    author: "",
    publishedIn: "",
    year: "",
    source: "",
    relatedTo: "",
    tags: [] as string[],
  });
  const [tagInput, setTagInput] = useState("");

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      author: "",
      publishedIn: "",
      year: "",
      source: "",
      relatedTo: "",
      tags: [],
    });
    setTagInput("");
    setEditingEntry(null);
  };

  const handleSave = () => {
    if (!formData.title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for the entry.",
        variant: "destructive",
      });
      return;
    }

    if (editingEntry) {
      setEntries(entries.map(e => 
        e.id === editingEntry.id ? { ...formData, id: e.id } : e
      ));
      toast({
        title: "Entry Updated",
        description: "Research entry has been updated successfully.",
      });
    } else {
      const newEntry = {
        ...formData,
        id: Date.now(),
      };
      setEntries([newEntry, ...entries]);
      toast({
        title: "Entry Saved",
        description: "New research entry has been added.",
      });
    }

    resetForm();
    setIsDialogOpen(false);
  };

  const handleEdit = (entry: typeof sampleEntries[0]) => {
    setEditingEntry(entry);
    setFormData({
      title: entry.title,
      description: entry.description,
      author: entry.author,
      publishedIn: entry.publishedIn,
      year: entry.year,
      source: entry.source,
      relatedTo: entry.relatedTo,
      tags: entry.tags,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter(e => e.id !== id));
    toast({
      title: "Entry Deleted",
      description: "Research entry has been removed.",
    });
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      setFormData({ ...formData, tags: [...formData.tags, tag.trim()] });
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setFormData({ ...formData, tags: formData.tags.filter(t => t !== tag) });
  };

  const filteredEntries = entries.filter(entry =>
    entry.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    entry.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredEntries.length / entriesPerPage);
  const paginatedEntries = filteredEntries.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  return (
    <Layout>
      {/* Header */}
      <section className="py-12 bg-gradient-hero lotus-pattern">
        <div className="container mx-auto px-4">
          <Link 
            to="/research" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Research Hub
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Database className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="font-poppins text-3xl font-bold text-foreground">SodhSanchay</h1>
              <p className="text-muted-foreground font-poppins">Research Metadata Entry</p>
            </div>
          </div>
          <p className="text-muted-foreground max-w-2xl font-poppins">
            Store and organize your research notes, metadata, and scholarly references in one centralized database.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="entries" className="space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <TabsList className="bg-secondary/50">
                <TabsTrigger value="entries" className="font-poppins">View All Entries</TabsTrigger>
                <TabsTrigger value="add" className="font-poppins">Add Entry</TabsTrigger>
              </TabsList>

              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search entries..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64 font-poppins"
                  />
                </div>
                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                  setIsDialogOpen(open);
                  if (!open) resetForm();
                }}>
                  <DialogTrigger asChild>
                    <Button variant="hero" className="font-poppins">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Entry
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="font-poppins">
                        {editingEntry ? "Edit Entry" : "Add New Entry"}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-6 py-4">
                      <div className="space-y-2">
                        <Label className="font-poppins">Title *</Label>
                        <Input
                          placeholder="Enter research title"
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          className="font-poppins"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="font-poppins">Description / Info</Label>
                        <Textarea
                          placeholder="Describe the research content..."
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          rows={4}
                          className="font-poppins"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-poppins">Author</Label>
                          <Input
                            placeholder="Author name"
                            value={formData.author}
                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                            className="font-poppins"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-poppins">Year</Label>
                          <Input
                            placeholder="Publication year"
                            value={formData.year}
                            onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                            className="font-poppins"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="font-poppins">Published In</Label>
                          <Input
                            placeholder="Journal, book, etc."
                            value={formData.publishedIn}
                            onChange={(e) => setFormData({ ...formData, publishedIn: e.target.value })}
                            className="font-poppins"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="font-poppins">Source</Label>
                          <Input
                            placeholder="Source type"
                            value={formData.source}
                            onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                            className="font-poppins"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label className="font-poppins">Related To</Label>
                        <Input
                          placeholder="Related topics or entries"
                          value={formData.relatedTo}
                          onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                          className="font-poppins"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="font-poppins">Tags</Label>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add a tag..."
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addTag(tagInput);
                              }
                            }}
                            className="font-poppins"
                          />
                          <Button
                            type="button"
                            variant="secondary"
                            onClick={() => addTag(tagInput)}
                          >
                            <Tag className="h-4 w-4" />
                          </Button>
                        </div>
                        {formData.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag) => (
                              <Badge
                                key={tag}
                                variant="secondary"
                                className="font-poppins cursor-pointer hover:bg-destructive/20"
                                onClick={() => removeTag(tag)}
                              >
                                {tag}
                                <X className="h-3 w-3 ml-1" />
                              </Badge>
                            ))}
                          </div>
                        )}
                        <div className="pt-2">
                          <p className="text-xs text-muted-foreground mb-2 font-poppins">Suggested tags:</p>
                          <div className="flex flex-wrap gap-1">
                            {suggestedTags.filter(t => !formData.tags.includes(t)).slice(0, 8).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="font-poppins cursor-pointer hover:bg-primary/10 text-xs"
                                onClick={() => addTag(tag)}
                              >
                                + {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end gap-3 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => {
                            resetForm();
                            setIsDialogOpen(false);
                          }}
                          className="font-poppins"
                        >
                          Cancel
                        </Button>
                        <Button variant="hero" onClick={handleSave} className="font-poppins">
                          <Save className="h-4 w-4 mr-2" />
                          {editingEntry ? "Update Entry" : "Save Entry"}
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <TabsContent value="entries" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Total Entries", value: entries.length, icon: FileText },
                  { label: "This Year", value: entries.filter(e => e.year === "2024" || e.year === "2023").length, icon: Calendar },
                  { label: "Authors", value: new Set(entries.map(e => e.author)).size, icon: User },
                  { label: "Categories", value: new Set(entries.map(e => e.source)).size, icon: BookOpen },
                ].map((stat) => (
                  <Card key={stat.label} className="bg-card/50 border-border/50">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <stat.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-foreground font-poppins">{stat.value}</p>
                        <p className="text-xs text-muted-foreground font-poppins">{stat.label}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Entries Table */}
              <Card className="shadow-soft">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-secondary/30">
                        <TableHead className="font-poppins font-semibold">Title</TableHead>
                        <TableHead className="font-poppins font-semibold">Author</TableHead>
                        <TableHead className="font-poppins font-semibold hidden md:table-cell">Year</TableHead>
                        <TableHead className="font-poppins font-semibold hidden lg:table-cell">Tags</TableHead>
                        <TableHead className="font-poppins font-semibold text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedEntries.map((entry) => (
                        <TableRow key={entry.id} className="hover:bg-secondary/20 transition-colors">
                          <TableCell>
                            <div>
                              <p className="font-medium text-foreground font-poppins line-clamp-1">{entry.title}</p>
                              <p className="text-xs text-muted-foreground font-poppins line-clamp-1">{entry.description}</p>
                            </div>
                          </TableCell>
                          <TableCell className="font-poppins text-muted-foreground">{entry.author}</TableCell>
                          <TableCell className="font-poppins text-muted-foreground hidden md:table-cell">{entry.year}</TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {entry.tags.slice(0, 2).map((tag) => (
                                <Badge key={tag} variant="secondary" className="font-poppins text-xs">
                                  {tag}
                                </Badge>
                              ))}
                              {entry.tags.length > 2 && (
                                <Badge variant="outline" className="font-poppins text-xs">
                                  +{entry.tags.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleEdit(entry)}
                                className="h-8 w-8"
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(entry.id)}
                                className="h-8 w-8 text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex items-center justify-between px-6 py-4 border-t">
                      <p className="text-sm text-muted-foreground font-poppins">
                        Showing {(currentPage - 1) * entriesPerPage + 1} to {Math.min(currentPage * entriesPerPage, filteredEntries.length)} of {filteredEntries.length} entries
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                          disabled={currentPage === 1}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <Button
                            key={page}
                            variant={currentPage === page ? "default" : "outline"}
                            size="icon"
                            onClick={() => setCurrentPage(page)}
                            className="font-poppins"
                          >
                            {page}
                          </Button>
                        ))}
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                          disabled={currentPage === totalPages}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="add">
              <Card className="shadow-soft max-w-2xl mx-auto">
                <CardHeader>
                  <CardTitle className="font-poppins flex items-center gap-2">
                    <Plus className="h-5 w-5 text-primary" />
                    Add New Research Entry
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label className="font-poppins">Title *</Label>
                    <Input
                      placeholder="Enter research title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins">Description / Info</Label>
                    <Textarea
                      placeholder="Describe the research content..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows={4}
                      className="font-poppins"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-poppins">Author</Label>
                      <Input
                        placeholder="Author name"
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Year</Label>
                      <Input
                        placeholder="Publication year"
                        value={formData.year}
                        onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-poppins">Published In</Label>
                      <Input
                        placeholder="Journal, book, etc."
                        value={formData.publishedIn}
                        onChange={(e) => setFormData({ ...formData, publishedIn: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-poppins">Source</Label>
                      <Input
                        placeholder="Source type"
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="font-poppins"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-poppins">Related To</Label>
                    <Input
                      placeholder="Related topics or entries"
                      value={formData.relatedTo}
                      onChange={(e) => setFormData({ ...formData, relatedTo: e.target.value })}
                      className="font-poppins"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="font-poppins">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Add a tag..."
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag(tagInput);
                          }
                        }}
                        className="font-poppins"
                      />
                      <Button type="button" variant="secondary" onClick={() => addTag(tagInput)}>
                        <Tag className="h-4 w-4" />
                      </Button>
                    </div>
                    {formData.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {formData.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="font-poppins cursor-pointer hover:bg-destructive/20"
                            onClick={() => removeTag(tag)}
                          >
                            {tag}
                            <X className="h-3 w-3 ml-1" />
                          </Badge>
                        ))}
                      </div>
                    )}
                    <div className="pt-2">
                      <p className="text-xs text-muted-foreground mb-2 font-poppins">Suggested tags:</p>
                      <div className="flex flex-wrap gap-1">
                        {suggestedTags.filter(t => !formData.tags.includes(t)).slice(0, 10).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="font-poppins cursor-pointer hover:bg-primary/10 text-xs"
                            onClick={() => addTag(tag)}
                          >
                            + {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 pt-4 border-t">
                    <Button variant="outline" onClick={resetForm} className="font-poppins">
                      Reset Form
                    </Button>
                    <Button variant="hero" onClick={handleSave} className="font-poppins">
                      <Save className="h-4 w-4 mr-2" />
                      Save Entry
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default SodhSanchay;
