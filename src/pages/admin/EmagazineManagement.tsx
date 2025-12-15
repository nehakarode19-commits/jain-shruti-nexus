import { useState, useRef } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Pencil, Trash2, ExternalLink, FileText, Loader2, Upload, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAllEmagazines, Emagazine } from "@/hooks/useEmagazines";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { format } from "date-fns";

export default function EmagazineManagement() {
  const { data: emagazines, isLoading } = useAllEmagazines();
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Emagazine | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    title: "",
    volume: "",
    issue_date: "",
    year: new Date().getFullYear(),
    cover_image: "",
    pdf_url: "",
    description: "",
    is_published: true,
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    setIsUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
      const filePath = `covers/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('emagazine-covers')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('emagazine-covers')
        .getPublicUrl(filePath);

      setFormData({ ...formData, cover_image: publicUrl });
      toast.success('Cover image uploaded successfully');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(error.message || 'Failed to upload image');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData({ ...formData, cover_image: '' });
  };

  const resetForm = () => {
    setFormData({
      title: "",
      volume: "",
      issue_date: "",
      year: new Date().getFullYear(),
      cover_image: "",
      pdf_url: "",
      description: "",
      is_published: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: Emagazine) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      volume: item.volume || "",
      issue_date: item.issue_date || "",
      year: item.year,
      cover_image: item.cover_image || "",
      pdf_url: item.pdf_url,
      description: item.description || "",
      is_published: item.is_published,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title,
        volume: formData.volume || null,
        issue_date: formData.issue_date || null,
        year: formData.year,
        cover_image: formData.cover_image || null,
        pdf_url: formData.pdf_url,
        description: formData.description || null,
        is_published: formData.is_published,
      };

      if (editingItem) {
        const { error } = await supabase
          .from("emagazines")
          .update(payload)
          .eq("id", editingItem.id);

        if (error) throw error;
        toast.success("eMagazine updated successfully");
      } else {
        const { error } = await supabase.from("emagazines").insert(payload);

        if (error) throw error;
        toast.success("eMagazine added successfully");
      }

      queryClient.invalidateQueries({ queryKey: ["emagazines"] });
      queryClient.invalidateQueries({ queryKey: ["emagazines-all"] });
      queryClient.invalidateQueries({ queryKey: ["emagazines-by-year"] });
      setIsDialogOpen(false);
      resetForm();
    } catch (error: any) {
      toast.error(error.message || "Failed to save eMagazine");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this eMagazine?")) return;

    try {
      const { error } = await supabase.from("emagazines").delete().eq("id", id);

      if (error) throw error;
      toast.success("eMagazine deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["emagazines"] });
      queryClient.invalidateQueries({ queryKey: ["emagazines-all"] });
      queryClient.invalidateQueries({ queryKey: ["emagazines-by-year"] });
    } catch (error: any) {
      toast.error(error.message || "Failed to delete eMagazine");
    }
  };

  return (
    <AdminLayout title="eMagazine Management">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Jambu Jyoti eMagazine</h2>
            <p className="text-muted-foreground">Manage eMagazine issues and archives</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Issue
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit eMagazine" : "Add New eMagazine Issue"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Title *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Jambu Jyoti Vol. 6"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="volume">Volume</Label>
                    <Input
                      id="volume"
                      value={formData.volume}
                      onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                      placeholder="e.g., Vol. 6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Year *</Label>
                    <Input
                      id="year"
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issue_date">Issue Date</Label>
                    <Input
                      id="issue_date"
                      type="date"
                      value={formData.issue_date}
                      onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pdf_url">PDF URL *</Label>
                  <Input
                    id="pdf_url"
                    value={formData.pdf_url}
                    onChange={(e) => setFormData({ ...formData, pdf_url: e.target.value })}
                    placeholder="https://example.com/magazine.pdf"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label>Cover Image</Label>
                  <div className="flex flex-col gap-3">
                    {/* Upload Button */}
                    <div className="flex items-center gap-2">
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="cover-upload"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="gap-2"
                      >
                        {isUploading ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <Upload className="h-4 w-4" />
                        )}
                        {isUploading ? 'Uploading...' : 'Upload Image'}
                      </Button>
                      <span className="text-xs text-muted-foreground">or enter URL below</span>
                    </div>
                    
                    {/* URL Input */}
                    <Input
                      id="cover_image"
                      value={formData.cover_image}
                      onChange={(e) => setFormData({ ...formData, cover_image: e.target.value })}
                      placeholder="https://example.com/cover.jpg"
                    />
                    
                    {/* Preview */}
                    {formData.cover_image && (
                      <div className="relative inline-block">
                        <img 
                          src={formData.cover_image} 
                          alt="Cover preview" 
                          className="w-32 h-auto rounded-md border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder.svg';
                          }}
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute -top-2 -right-2 h-6 w-6"
                          onClick={handleRemoveImage}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Brief description of this issue..."
                    rows={3}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Switch
                    id="is_published"
                    checked={formData.is_published}
                    onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                  />
                  <Label htmlFor="is_published">Published</Label>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    {editingItem ? "Update" : "Add"} Issue
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              All Issues
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : emagazines && emagazines.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Volume</TableHead>
                    <TableHead>Year</TableHead>
                    <TableHead>Issue Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>PDF</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emagazines.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.title}</TableCell>
                      <TableCell>{item.volume || "-"}</TableCell>
                      <TableCell>{item.year}</TableCell>
                      <TableCell>
                        {item.issue_date ? format(new Date(item.issue_date), "MMM yyyy") : "-"}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.is_published 
                            ? "bg-green-100 text-green-700" 
                            : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {item.is_published ? "Published" : "Draft"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <a
                          href={item.pdf_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View
                        </a>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleEdit(item)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDelete(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                <p>No eMagazine issues yet</p>
                <p className="text-sm">Click "Add Issue" to create your first eMagazine</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
