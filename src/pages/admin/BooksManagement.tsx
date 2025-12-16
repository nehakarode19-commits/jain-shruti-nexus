import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Search, Eye, EyeOff, Upload, FileText, Volume2, Music } from "lucide-react";
import { format } from "date-fns";

interface Book {
  id: string;
  title: string;
  author: string | null;
  description: string | null;
  cover_image: string | null;
  category: string | null;
  language: string | null;
  year: number | null;
  is_published: boolean | null;
  pdf_url: string | null;
  audio_hindi: string | null;
  audio_english: string | null;
  audio_sanskrit: string | null;
  audio_prakrit: string | null;
  audio_gujarati: string | null;
  created_at: string;
}

const AUDIO_LANGUAGES = [
  { key: 'audio_hindi', label: 'Hindi' },
  { key: 'audio_english', label: 'English' },
  { key: 'audio_sanskrit', label: 'Sanskrit' },
  { key: 'audio_prakrit', label: 'Prakrit' },
  { key: 'audio_gujarati', label: 'Gujarati' },
] as const;

export default function BooksManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [uploadingPdf, setUploadingPdf] = useState(false);
  const [uploadingAudio, setUploadingAudio] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    cover_image: "",
    category: "",
    language: "",
    year: "",
    pdf_url: "",
    audio_hindi: "",
    audio_english: "",
    audio_sanskrit: "",
    audio_prakrit: "",
    audio_gujarati: "",
    is_published: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: books = [], isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as Book[];
    },
  });

  const handlePdfUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      toast({ title: "Please select a PDF file", variant: "destructive" });
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast({ title: "File size must be less than 50MB", variant: "destructive" });
      return;
    }

    setUploadingPdf(true);
    try {
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('book-pdfs')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('book-pdfs')
        .getPublicUrl(fileName);

      setFormData({ ...formData, pdf_url: publicUrl });
      toast({ title: "PDF uploaded successfully!" });
    } catch (error: any) {
      toast({ title: "Error uploading PDF", description: error.message, variant: "destructive" });
    } finally {
      setUploadingPdf(false);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>, languageKey: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('audio/')) {
      toast({ title: "Please select an audio file", variant: "destructive" });
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      toast({ title: "File size must be less than 100MB", variant: "destructive" });
      return;
    }

    setUploadingAudio(languageKey);
    try {
      const fileName = `${Date.now()}-${languageKey}-${file.name}`;
      const { data, error } = await supabase.storage
        .from('book-audio')
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabase.storage
        .from('book-audio')
        .getPublicUrl(fileName);

      setFormData({ ...formData, [languageKey]: publicUrl });
      toast({ title: "Audio uploaded successfully!" });
    } catch (error: any) {
      toast({ title: "Error uploading audio", description: error.message, variant: "destructive" });
    } finally {
      setUploadingAudio(null);
    }
  };

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("books").insert({
        title: data.title,
        author: data.author || null,
        description: data.description || null,
        cover_image: data.cover_image || null,
        category: data.category || null,
        language: data.language || null,
        year: data.year ? parseInt(data.year) : null,
        pdf_url: data.pdf_url || null,
        audio_hindi: data.audio_hindi || null,
        audio_english: data.audio_english || null,
        audio_sanskrit: data.audio_sanskrit || null,
        audio_prakrit: data.audio_prakrit || null,
        audio_gujarati: data.audio_gujarati || null,
        is_published: data.is_published,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      queryClient.invalidateQueries({ queryKey: ["books-public"] });
      toast({ title: "Book added successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error adding book", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("books")
        .update({
          title: data.title,
          author: data.author || null,
          description: data.description || null,
          cover_image: data.cover_image || null,
          category: data.category || null,
          language: data.language || null,
          year: data.year ? parseInt(data.year) : null,
          pdf_url: data.pdf_url || null,
          audio_hindi: data.audio_hindi || null,
          audio_english: data.audio_english || null,
          audio_sanskrit: data.audio_sanskrit || null,
          audio_prakrit: data.audio_prakrit || null,
          audio_gujarati: data.audio_gujarati || null,
          is_published: data.is_published,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      queryClient.invalidateQueries({ queryKey: ["books-public"] });
      toast({ title: "Book updated successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error updating book", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-books"] });
      queryClient.invalidateQueries({ queryKey: ["books-public"] });
      toast({ title: "Book deleted successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting book", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      author: "",
      description: "",
      cover_image: "",
      category: "",
      language: "",
      year: "",
      pdf_url: "",
      audio_hindi: "",
      audio_english: "",
      audio_sanskrit: "",
      audio_prakrit: "",
      audio_gujarati: "",
      is_published: true,
    });
    setEditingBook(null);
  };

  const handleEdit = (book: Book) => {
    setEditingBook(book);
    setFormData({
      title: book.title,
      author: book.author || "",
      description: book.description || "",
      cover_image: book.cover_image || "",
      category: book.category || "",
      language: book.language || "",
      year: book.year?.toString() || "",
      pdf_url: book.pdf_url || "",
      audio_hindi: book.audio_hindi || "",
      audio_english: book.audio_english || "",
      audio_sanskrit: book.audio_sanskrit || "",
      audio_prakrit: book.audio_prakrit || "",
      audio_gujarati: book.audio_gujarati || "",
      is_published: book.is_published ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (editingBook) {
      updateMutation.mutate({ id: editingBook.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (book.author || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const hasAudio = (book: Book) => {
    return book.audio_hindi || book.audio_english || book.audio_sanskrit || book.audio_prakrit || book.audio_gujarati;
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Books Management</h1>
            <p className="text-muted-foreground mt-1">Add and manage books with PDF and multilingual audio</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Book
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingBook ? "Edit Book" : "Add New Book"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <Tabs defaultValue="basic" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="pdf">PDF</TabsTrigger>
                    <TabsTrigger value="audio">Audio</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4 mt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="col-span-2">
                        <Label>Title *</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                          placeholder="Book title"
                        />
                      </div>
                      <div>
                        <Label>Author</Label>
                        <Input
                          value={formData.author}
                          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                          placeholder="Author name"
                        />
                      </div>
                      <div>
                        <Label>Category</Label>
                        <Input
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          placeholder="e.g., Agama, Sutra, Commentary"
                        />
                      </div>
                      <div>
                        <Label>Language</Label>
                        <Input
                          value={formData.language}
                          onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                          placeholder="e.g., Sanskrit, Prakrit, Hindi"
                        />
                      </div>
                      <div>
                        <Label>Year</Label>
                        <Input
                          type="number"
                          value={formData.year}
                          onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                          placeholder="Publication year"
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Cover Image URL</Label>
                        <Input
                          value={formData.cover_image}
                          onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                          placeholder="https://..."
                        />
                      </div>
                      <div className="col-span-2">
                        <Label>Description</Label>
                        <Textarea
                          value={formData.description}
                          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                          placeholder="Book description..."
                          rows={3}
                        />
                      </div>
                      <div className="col-span-2 flex items-center gap-2">
                        <Switch
                          checked={formData.is_published}
                          onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                        />
                        <Label>Published (visible on website)</Label>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="pdf" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="p-4 border border-dashed border-border rounded-lg bg-secondary/30">
                        <div className="flex items-center gap-3 mb-3">
                          <FileText className="h-6 w-6 text-primary" />
                          <div>
                            <h4 className="font-medium">PDF File</h4>
                            <p className="text-sm text-muted-foreground">Upload PDF or paste URL (max 50MB)</p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept=".pdf"
                              onChange={handlePdfUpload}
                              disabled={uploadingPdf}
                              className="flex-1"
                            />
                            {uploadingPdf && <Loader2 className="h-5 w-5 animate-spin" />}
                          </div>
                          
                          <div className="text-center text-sm text-muted-foreground">or</div>
                          
                          <div>
                            <Label>PDF URL</Label>
                            <Input
                              value={formData.pdf_url}
                              onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                              placeholder="https://example.com/book.pdf"
                            />
                          </div>
                          
                          {formData.pdf_url && (
                            <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded text-green-700 dark:text-green-400 text-sm">
                              <FileText className="h-4 w-4" />
                              PDF ready
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="audio" className="space-y-4 mt-4">
                    <div className="p-4 border border-dashed border-border rounded-lg bg-secondary/30 mb-4">
                      <div className="flex items-center gap-3 mb-2">
                        <Volume2 className="h-6 w-6 text-primary" />
                        <div>
                          <h4 className="font-medium">Multilingual Audio</h4>
                          <p className="text-sm text-muted-foreground">Upload audio files in different languages (max 100MB each)</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      {AUDIO_LANGUAGES.map(({ key, label }) => (
                        <div key={key} className="p-3 border rounded-lg space-y-2">
                          <div className="flex items-center justify-between">
                            <Label className="flex items-center gap-2">
                              <Music className="h-4 w-4" />
                              {label} Audio
                            </Label>
                            {formData[key as keyof typeof formData] && (
                              <Badge variant="secondary" className="text-xs">
                                <Volume2 className="h-3 w-3 mr-1" />
                                Ready
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex gap-2">
                            <Input
                              type="file"
                              accept="audio/*"
                              onChange={(e) => handleAudioUpload(e, key)}
                              disabled={uploadingAudio === key}
                              className="flex-1"
                            />
                            {uploadingAudio === key && <Loader2 className="h-5 w-5 animate-spin" />}
                          </div>
                          
                          <Input
                            value={(formData[key as keyof typeof formData] as string) || ""}
                            onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                            placeholder={`Or paste ${label} audio URL`}
                            className="text-sm"
                          />
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="flex justify-end gap-3 pt-4 border-t">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {editingBook ? "Update Book" : "Add Book"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredBooks.length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <p className="text-muted-foreground">No books found. Add your first book!</p>
                </CardContent>
              </Card>
            ) : (
              filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden">
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      {book.cover_image && (
                        <img
                          src={book.cover_image}
                          alt={book.title}
                          className="w-20 h-28 object-cover rounded-lg shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-foreground line-clamp-1">{book.title}</h3>
                            <p className="text-sm text-muted-foreground">{book.author || "Unknown author"}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant={book.is_published ? "default" : "secondary"}>
                              {book.is_published ? <Eye className="h-3 w-3 mr-1" /> : <EyeOff className="h-3 w-3 mr-1" />}
                              {book.is_published ? "Published" : "Draft"}
                            </Badge>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {book.category && <Badge variant="outline">{book.category}</Badge>}
                          {book.language && <Badge variant="outline">{book.language}</Badge>}
                          {book.year && <Badge variant="outline">{book.year}</Badge>}
                          {book.pdf_url && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                              <FileText className="h-3 w-3 mr-1" />
                              PDF
                            </Badge>
                          )}
                          {hasAudio(book) && (
                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400">
                              <Volume2 className="h-3 w-3 mr-1" />
                              Audio
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{book.description}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <Button size="sm" variant="outline" onClick={() => handleEdit(book)}>
                            <Pencil className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              if (confirm("Are you sure you want to delete this book?")) {
                                deleteMutation.mutate(book.id);
                              }
                            }}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
