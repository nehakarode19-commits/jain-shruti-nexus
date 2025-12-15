import { useState } from "react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MessageSquare, 
  Star, 
  Trash2, 
  Mail, 
  Phone, 
  User,
  Calendar,
  CheckCircle2,
  Circle,
  Search,
  QrCode,
  ExternalLink,
  Filter
} from "lucide-react";
import { useVisitorFeedback, useMarkFeedbackRead, useDeleteFeedback } from "@/hooks/useFeedback";
import { format } from "date-fns";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const feedbackTypeColors: Record<string, string> = {
  general: "bg-blue-100 text-blue-700",
  suggestion: "bg-green-100 text-green-700",
  complaint: "bg-red-100 text-red-700",
  appreciation: "bg-yellow-100 text-yellow-700",
};

export default function FeedbackManagement() {
  const { data: feedback, isLoading } = useVisitorFeedback();
  const markReadMutation = useMarkFeedbackRead();
  const deleteMutation = useDeleteFeedback();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredFeedback = feedback?.filter((item) => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === "all" || item.feedback_type === filterType;
    const matchesStatus = 
      filterStatus === "all" ||
      (filterStatus === "read" && item.is_read) ||
      (filterStatus === "unread" && !item.is_read);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const unreadCount = feedback?.filter((f) => !f.is_read).length || 0;

  // QR code URL for the feedback form
  const feedbackUrl = `${window.location.origin}/feedback`;
  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(feedbackUrl)}&bgcolor=FAF7F2&color=2D2A26`;

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-gold flex items-center justify-center">
              <MessageSquare className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-heading text-2xl font-bold text-foreground">Visitor Feedback</h1>
              <p className="text-muted-foreground">
                {unreadCount > 0 ? `${unreadCount} unread feedback` : "Manage visitor feedback and suggestions"}
              </p>
            </div>
          </div>

          {/* QR Code Preview */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="p-4 flex items-center gap-4">
              <img src={qrCodeUrl} alt="Feedback QR Code" className="w-16 h-16 rounded-lg" />
              <div>
                <p className="font-heading font-semibold text-foreground text-sm">Feedback QR Code</p>
                <p className="text-xs text-muted-foreground mb-2">Print and display at library entrance</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(feedbackUrl, "_blank")}
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  Preview Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search feedback..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="suggestion">Suggestion</SelectItem>
                  <SelectItem value="complaint">Complaint</SelectItem>
                  <SelectItem value="appreciation">Appreciation</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="unread">Unread</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Feedback List */}
        <div className="space-y-4">
          {isLoading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="border-border/50">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : filteredFeedback?.length === 0 ? (
            <Card className="border-border/50">
              <CardContent className="py-12 text-center">
                <MessageSquare className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="font-heading font-semibold text-foreground mb-1">No Feedback Found</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || filterType !== "all" || filterStatus !== "all"
                    ? "Try adjusting your filters"
                    : "Visitor feedback will appear here"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredFeedback?.map((item) => (
              <Card 
                key={item.id} 
                className={`border-border/50 transition-all ${!item.is_read ? "border-l-4 border-l-primary" : ""}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Avatar/Status */}
                    <div className="shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        {item.name ? (
                          <span className="font-semibold text-primary">
                            {item.name.charAt(0).toUpperCase()}
                          </span>
                        ) : (
                          <User className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="font-heading font-semibold text-foreground">
                          {item.name || "Anonymous"}
                        </span>
                        <Badge className={feedbackTypeColors[item.feedback_type] || feedbackTypeColors.general}>
                          {item.feedback_type}
                        </Badge>
                        {!item.is_read && (
                          <Badge variant="outline" className="text-primary border-primary">
                            New
                          </Badge>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-3">
                        {item.email && (
                          <div className="flex items-center gap-1">
                            <Mail className="h-3 w-3" />
                            <a href={`mailto:${item.email}`} className="hover:text-primary">
                              {item.email}
                            </a>
                          </div>
                        )}
                        {item.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <a href={`tel:${item.phone}`} className="hover:text-primary">
                              {item.phone}
                            </a>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>{format(new Date(item.created_at), "MMM d, yyyy 'at' h:mm a")}</span>
                        </div>
                      </div>

                      {/* Rating */}
                      {item.rating && (
                        <div className="flex items-center gap-1 mb-3">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= item.rating!
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-muted-foreground/30"
                              }`}
                            />
                          ))}
                        </div>
                      )}

                      {/* Message */}
                      <p className="text-foreground whitespace-pre-wrap">{item.message}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => markReadMutation.mutate({ id: item.id, is_read: !item.is_read })}
                        title={item.is_read ? "Mark as unread" : "Mark as read"}
                      >
                        {item.is_read ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <Circle className="h-4 w-4" />
                        )}
                      </Button>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Feedback</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete this feedback? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteMutation.mutate(item.id)}
                              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
