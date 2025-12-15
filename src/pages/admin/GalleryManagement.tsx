import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Search, Eye, EyeOff, Image } from "lucide-react";

interface GalleryItem {
  id: string;
  title: string;
  description: string | null;
  image_url: string;
  category: string | null;
  category_division: string | null;
  is_published: boolean | null;
  created_at: string;
}

const GALLERY_DIVISIONS = [
  { value: 'gurudev', label: 'Gurudev Muni Jambuvijayaji' },
  { value: 'legacy', label: 'Legacy' },
  { value: 'mjrc', label: 'MJRC' },
  { value: 'temple', label: 'Adani Shantigram Jain Temple' },
];

export default function GalleryManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDivision, setFilterDivision] = useState<string>("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItem | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image_url: "",
    category: "",
    category_division: "gurudev",
    is_published: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as GalleryItem[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("gallery").insert({
        title: data.title,
        description: data.description || null,
        image_url: data.image_url,
        category: data.category || null,
        category_division: data.category_division || 'gurudev',
        is_published: data.is_published,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-public"] });
      toast({ title: "Image added successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error adding image", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("gallery")
        .update({
          title: data.title,
          description: data.description || null,
          image_url: data.image_url,
          category: data.category || null,
          category_division: data.category_division || 'gurudev',
          is_published: data.is_published,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-public"] });
      toast({ title: "Image updated successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error updating image", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("gallery").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-gallery"] });
      queryClient.invalidateQueries({ queryKey: ["gallery-public"] });
      toast({ title: "Image deleted successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting image", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image_url: "",
      category: "",
      category_division: "gurudev",
      is_published: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: GalleryItem) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      image_url: item.image_url,
      category: item.category || "",
      category_division: item.category_division || "gurudev",
      is_published: item.is_published ?? true,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast({ title: "Title is required", variant: "destructive" });
      return;
    }
    if (!formData.image_url.trim()) {
      toast({ title: "Image URL is required", variant: "destructive" });
      return;
    }
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDivision = filterDivision === "all" || item.category_division === filterDivision;
    return matchesSearch && matchesDivision;
  });

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Gallery Management</h1>
            <p className="text-muted-foreground mt-1">Add and manage images in the gallery</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Image
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Image" : "Add New Image"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Image title"
                  />
                </div>
                <div>
                  <Label>Image URL *</Label>
                  <Input
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Use a direct image URL ending in .jpg, .png, .webp, etc. Social media post links won't work.
                  </p>
                  {formData.image_url && (
                    <div className="mt-2 rounded-md border overflow-hidden h-24 w-24">
                      <img 
                        src={formData.image_url} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    </div>
                  )}
                </div>
                <div>
                  <Label>Gallery Division *</Label>
                  <select
                    value={formData.category_division}
                    onChange={(e) => setFormData({ ...formData, category_division: e.target.value })}
                    className="w-full px-3 py-2 border rounded-md bg-background"
                  >
                    {GALLERY_DIVISIONS.map(div => (
                      <option key={div.value} value={div.value}>{div.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label>Additional Category/Tag</Label>
                  <Input
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g., Events, Lectures, Archives"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Image description..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label>Published (visible on website)</Label>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {editingItem ? "Update Image" : "Add Image"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex flex-wrap gap-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search gallery..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={filterDivision}
            onChange={(e) => setFilterDivision(e.target.value)}
            className="px-4 py-2 border rounded-md bg-background text-sm"
          >
            <option value="all">All Divisions</option>
            {GALLERY_DIVISIONS.map(div => (
              <option key={div.value} value={div.value}>{div.label}</option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-12 text-center">
                  <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No images found. Add your first image!</p>
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={item.image_url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.svg';
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this image?")) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant={item.is_published ? "default" : "secondary"} className="text-xs">
                        {item.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium text-sm line-clamp-1">{item.title}</h3>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {item.category_division && (
                        <Badge variant="default" className="text-xs">
                          {GALLERY_DIVISIONS.find(d => d.value === item.category_division)?.label || item.category_division}
                        </Badge>
                      )}
                      {item.category && (
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      )}
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