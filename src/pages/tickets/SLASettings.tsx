import { useState } from "react";
import { TicketLayout } from "@/components/tickets/TicketLayout";
import { SEO } from "@/components/shared/SEO";
import { useSLAConfigs, useSaveSLAConfig, useTicketCategories } from "@/hooks/useTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Plus, Edit, Settings } from "lucide-react";
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

const priorityLabels = {
  critical: "Critical",
  high: "High",
  medium: "Medium",
  low: "Low",
};

const priorityColors = {
  critical: "bg-red-100 text-red-700",
  high: "bg-orange-100 text-orange-700",
  medium: "bg-blue-100 text-blue-700",
  low: "bg-gray-100 text-gray-700",
};

export default function SLASettings() {
  const { data: configs = [], isLoading } = useSLAConfigs();
  const { data: categories = [] } = useTicketCategories();
  const saveSLAConfig = useSaveSLAConfig();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingConfig, setEditingConfig] = useState<any>(null);
  const [formData, setFormData] = useState({
    priority: "medium",
    category_id: "",
    response_hours: 8,
    resolution_hours: 48,
  });

  const openCreateDialog = () => {
    setEditingConfig(null);
    setFormData({
      priority: "medium",
      category_id: "",
      response_hours: 8,
      resolution_hours: 48,
    });
    setIsDialogOpen(true);
  };

  const openEditDialog = (config: any) => {
    setEditingConfig(config);
    setFormData({
      priority: config.priority,
      category_id: config.category_id || "",
      response_hours: config.response_hours,
      resolution_hours: config.resolution_hours,
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await saveSLAConfig.mutateAsync({
      id: editingConfig?.id,
      priority: formData.priority,
      category_id: formData.category_id || null,
      response_hours: formData.response_hours,
      resolution_hours: formData.resolution_hours,
    });

    setIsDialogOpen(false);
  };

  const getCategoryName = (categoryId: string | null) => {
    if (!categoryId) return "All Categories";
    const cat = categories.find((c) => c.id === categoryId);
    return cat?.name || "Unknown";
  };

  return (
    <TicketLayout title="SLA Settings">
      <SEO
        title="SLA Settings | Jambushrusti"
        description="Configure SLA policies for ticket management."
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">SLA Configuration</h1>
            <p className="text-muted-foreground">
              Define response and resolution time targets based on priority.
            </p>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openCreateDialog}>
                <Plus className="h-4 w-4 mr-2" />
                Add SLA Rule
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingConfig ? "Edit SLA Rule" : "Add SLA Rule"}
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label>Priority *</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="critical">Critical</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Category (optional)</Label>
                  <Select
                    value={formData.category_id}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, category_id: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Categories</SelectItem>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Response Time (hours)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.response_hours}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          response_hours: parseInt(e.target.value) || 1,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Resolution Time (hours)</Label>
                    <Input
                      type="number"
                      min={1}
                      value={formData.resolution_hours}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          resolution_hours: parseInt(e.target.value) || 1,
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saveSLAConfig.isPending}>
                    {saveSLAConfig.isPending ? "Saving..." : "Save"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* SLA Overview */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-medium">Critical</p>
                  <p className="text-xs text-muted-foreground">Response: 1h, Resolution: 4h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">High</p>
                  <p className="text-xs text-muted-foreground">Response: 4h, Resolution: 24h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-500">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">Medium</p>
                  <p className="text-xs text-muted-foreground">Response: 8h, Resolution: 48h</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-gray-400">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Clock className="h-5 w-5 text-gray-600" />
                <div>
                  <p className="text-sm font-medium">Low</p>
                  <p className="text-xs text-muted-foreground">Response: 24h, Resolution: 72h</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Rules Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Settings className="h-5 w-5" />
              SLA Rules
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-12 w-full" />
                ))}
              </div>
            ) : configs.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Priority</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Response Time</TableHead>
                    <TableHead>Resolution Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {configs.map((config) => (
                    <TableRow key={config.id}>
                      <TableCell>
                        <Badge className={priorityColors[config.priority as keyof typeof priorityColors]}>
                          {priorityLabels[config.priority as keyof typeof priorityLabels]}
                        </Badge>
                      </TableCell>
                      <TableCell>{getCategoryName(config.category_id)}</TableCell>
                      <TableCell>{config.response_hours}h</TableCell>
                      <TableCell>{config.resolution_hours}h</TableCell>
                      <TableCell>
                        <Badge variant={config.is_active ? "default" : "secondary"}>
                          {config.is_active ? "Active" : "Inactive"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" onClick={() => openEditDialog(config)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <p className="text-sm text-muted-foreground text-center py-8">
                No SLA rules configured. Using default values.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </TicketLayout>
  );
}
