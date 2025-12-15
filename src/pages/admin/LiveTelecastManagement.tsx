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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Loader2, Search, Eye, EyeOff, Radio, Video, Calendar, Building2, Globe } from "lucide-react";

interface LiveTelecast {
  id: string;
  title: string;
  description: string | null;
  stream_url: string | null;
  thumbnail_url: string | null;
  source_type: 'mjrc' | 'outside';
  event_date: string | null;
  is_live: boolean | null;
  is_published: boolean | null;
  created_at: string;
}

export default function LiveTelecastManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<LiveTelecast | null>(null);
  const [activeTab, setActiveTab] = useState<"mjrc" | "outside">("mjrc");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    stream_url: "",
    thumbnail_url: "",
    source_type: "mjrc" as 'mjrc' | 'outside',
    event_date: "",
    is_live: false,
    is_published: true,
  });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: items = [], isLoading } = useQuery({
    queryKey: ["admin-live-telecasts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("live_telecasts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as LiveTelecast[];
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const { error } = await supabase.from("live_telecasts").insert({
        title: data.title,
        description: data.description || null,
        stream_url: data.stream_url || null,
        thumbnail_url: data.thumbnail_url || null,
        source_type: data.source_type,
        event_date: data.event_date || null,
        is_live: data.is_live,
        is_published: data.is_published,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-live-telecasts"] });
      queryClient.invalidateQueries({ queryKey: ["live-telecasts-public"] });
      toast({ title: "Telecast added successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error adding telecast", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: typeof formData }) => {
      const { error } = await supabase
        .from("live_telecasts")
        .update({
          title: data.title,
          description: data.description || null,
          stream_url: data.stream_url || null,
          thumbnail_url: data.thumbnail_url || null,
          source_type: data.source_type,
          event_date: data.event_date || null,
          is_live: data.is_live,
          is_published: data.is_published,
        })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-live-telecasts"] });
      queryClient.invalidateQueries({ queryKey: ["live-telecasts-public"] });
      toast({ title: "Telecast updated successfully!" });
      resetForm();
      setIsDialogOpen(false);
    },
    onError: (error: Error) => {
      toast({ title: "Error updating telecast", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("live_telecasts").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-live-telecasts"] });
      queryClient.invalidateQueries({ queryKey: ["live-telecasts-public"] });
      toast({ title: "Telecast deleted successfully!" });
    },
    onError: (error: Error) => {
      toast({ title: "Error deleting telecast", description: error.message, variant: "destructive" });
    },
  });

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      stream_url: "",
      thumbnail_url: "",
      source_type: "mjrc",
      event_date: "",
      is_live: false,
      is_published: true,
    });
    setEditingItem(null);
  };

  const handleEdit = (item: LiveTelecast) => {
    setEditingItem(item);
    setFormData({
      title: item.title,
      description: item.description || "",
      stream_url: item.stream_url || "",
      thumbnail_url: item.thumbnail_url || "",
      source_type: item.source_type,
      event_date: item.event_date ? item.event_date.split('T')[0] : "",
      is_live: item.is_live ?? false,
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
    if (editingItem) {
      updateMutation.mutate({ id: editingItem.id, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const filteredItems = items.filter(item => 
    item.source_type === activeTab &&
    (item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.description || "").toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const mjrcCount = items.filter(i => i.source_type === 'mjrc').length;
  const outsideCount = items.filter(i => i.source_type === 'outside').length;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Live Telecast Management</h1>
            <p className="text-muted-foreground mt-1">Manage live events and broadcasts</p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); if (!open) resetForm(); }}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Telecast
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editingItem ? "Edit Telecast" : "Add New Telecast"}</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label>Title *</Label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Live event title"
                  />
                </div>
                <div>
                  <Label>Source Type *</Label>
                  <Select 
                    value={formData.source_type} 
                    onValueChange={(value: 'mjrc' | 'outside') => setFormData({ ...formData, source_type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mjrc">
                        <div className="flex items-center gap-2">
                          <Building2 className="h-4 w-4" />
                          From MJRC
                        </div>
                      </SelectItem>
                      <SelectItem value="outside">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4" />
                          From Outside of MJRC
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Stream URL</Label>
                  <Input
                    value={formData.stream_url}
                    onChange={(e) => setFormData({ ...formData, stream_url: e.target.value })}
                    placeholder="https://youtube.com/live/..."
                  />
                </div>
                <div>
                  <Label>Thumbnail URL</Label>
                  <Input
                    value={formData.thumbnail_url}
                    onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                    placeholder="https://example.com/thumbnail.jpg"
                  />
                  {formData.thumbnail_url && (
                    <div className="mt-2 rounded-md border overflow-hidden h-24 w-40">
                      <img 
                        src={formData.thumbnail_url} 
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
                  <Label>Event Date</Label>
                  <Input
                    type="datetime-local"
                    value={formData.event_date}
                    onChange={(e) => setFormData({ ...formData, event_date: e.target.value })}
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Event description..."
                    rows={3}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_live}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_live: checked })}
                    />
                    <Label className="text-sm">Currently Live</Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={formData.is_published}
                      onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
                    />
                    <Label className="text-sm">Published</Label>
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending}>
                    {(createMutation.isPending || updateMutation.isPending) && (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    )}
                    {editingItem ? "Update Telecast" : "Add Telecast"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as 'mjrc' | 'outside')}>
          <TabsList>
            <TabsTrigger value="mjrc" className="gap-2">
              <Building2 className="h-4 w-4" />
              From MJRC ({mjrcCount})
            </TabsTrigger>
            <TabsTrigger value="outside" className="gap-2">
              <Globe className="h-4 w-4" />
              From Outside ({outsideCount})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search telecasts..."
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredItems.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="py-12 text-center">
                  <Video className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">No telecasts found. Add your first telecast!</p>
                </CardContent>
              </Card>
            ) : (
              filteredItems.map((item) => (
                <Card key={item.id} className="overflow-hidden group">
                  <div className="aspect-video relative bg-muted">
                    {item.thumbnail_url ? (
                      <img
                        src={item.thumbnail_url}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = '/placeholder.svg';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" onClick={() => handleEdit(item)}>
                        <Pencil className="h-3 w-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this telecast?")) {
                            deleteMutation.mutate(item.id);
                          }
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="absolute top-2 left-2 flex gap-2">
                      {item.is_live && (
                        <Badge variant="destructive" className="text-xs animate-pulse">
                          <Radio className="h-3 w-3 mr-1" />
                          LIVE
                        </Badge>
                      )}
                    </div>
                    <div className="absolute top-2 right-2">
                      <Badge variant={item.is_published ? "default" : "secondary"} className="text-xs">
                        {item.is_published ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>
                    {item.event_date && (
                      <p className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(item.event_date).toLocaleDateString()}
                      </p>
                    )}
                    {item.description && (
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{item.description}</p>
                    )}
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