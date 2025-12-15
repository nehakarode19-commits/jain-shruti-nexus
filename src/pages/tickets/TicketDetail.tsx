import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TicketLayout } from "@/components/tickets/TicketLayout";
import { SEO } from "@/components/shared/SEO";
import {
  useTicket,
  useTicketComments,
  useTicketActivity,
  useUpdateTicketStatus,
  useAddComment,
  useDeleteTicket,
} from "@/hooks/useTickets";
import { SLAIndicator } from "@/components/tickets/SLAIndicator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";
import {
  ArrowLeft,
  Clock,
  User,
  MessageSquare,
  Activity,
  Trash2,
  Send,
  Tag,
  Paperclip,
} from "lucide-react";
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

const priorityColors = {
  low: "bg-gray-100 text-gray-700 border-gray-200",
  medium: "bg-blue-100 text-blue-700 border-blue-200",
  high: "bg-orange-100 text-orange-700 border-orange-200",
  critical: "bg-red-100 text-red-700 border-red-200",
};

const statusColors = {
  open: "bg-blue-100 text-blue-700",
  in_progress: "bg-yellow-100 text-yellow-700",
  on_hold: "bg-gray-100 text-gray-700",
  resolved: "bg-green-100 text-green-700",
  closed: "bg-purple-100 text-purple-700",
};

const statusLabels = {
  open: "Open",
  in_progress: "In Progress",
  on_hold: "On Hold",
  resolved: "Resolved",
  closed: "Closed",
};

export default function TicketDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { data: ticket, isLoading } = useTicket(id || "");
  const { data: comments = [] } = useTicketComments(id || "");
  const { data: activities = [] } = useTicketActivity(id || "");

  const updateStatus = useUpdateTicketStatus();
  const addComment = useAddComment();
  const deleteTicket = useDeleteTicket();

  const [newComment, setNewComment] = useState("");
  const [isInternal, setIsInternal] = useState(false);

  const handleStatusChange = async (status: string) => {
    if (id) {
      await updateStatus.mutateAsync({ id, status });
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim() || !id) return;
    await addComment.mutateAsync({
      ticket_id: id,
      comment: newComment,
      is_internal: isInternal,
    });
    setNewComment("");
    setIsInternal(false);
  };

  const handleDelete = async () => {
    if (id) {
      await deleteTicket.mutateAsync(id);
      navigate("/tickets/list");
    }
  };

  if (isLoading) {
    return (
      <TicketLayout title="Loading...">
        <div className="space-y-6">
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-64 w-full" />
        </div>
      </TicketLayout>
    );
  }

  if (!ticket) {
    return (
      <TicketLayout title="Ticket Not Found">
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Ticket not found.</p>
            <Button className="mt-4" onClick={() => navigate("/tickets/list")}>
              Back to Tickets
            </Button>
          </CardContent>
        </Card>
      </TicketLayout>
    );
  }

  return (
    <TicketLayout title={ticket.ticket_number}>
      <SEO
        title={`${ticket.ticket_number} | Jambushrusti`}
        description={ticket.title}
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm text-muted-foreground">
                  {ticket.ticket_number}
                </span>
                <Badge variant="outline" className={priorityColors[ticket.priority]}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Badge>
                <Badge className={statusColors[ticket.status]}>
                  {statusLabels[ticket.status]}
                </Badge>
              </div>
              <h1 className="font-heading text-xl font-bold text-foreground mt-1">
                {ticket.title}
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Select
              value={ticket.status}
              onValueChange={handleStatusChange}
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="open">Open</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="on_hold">On Hold</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Ticket?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete the ticket
                    and all associated comments and activity logs.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground whitespace-pre-wrap">
                  {ticket.description || "No description provided."}
                </p>

                {ticket.attachment_url && (
                  <div className="mt-4 flex items-center gap-2 text-sm">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <a
                      href={ticket.attachment_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Attachment
                    </a>
                  </div>
                )}

                {ticket.tags && ticket.tags.length > 0 && (
                  <div className="mt-4 flex items-center gap-2 flex-wrap">
                    <Tag className="h-4 w-4 text-muted-foreground" />
                    {ticket.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Comments and Activity */}
            <Tabs defaultValue="comments">
              <TabsList>
                <TabsTrigger value="comments" className="gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Comments ({comments.length})
                </TabsTrigger>
                <TabsTrigger value="activity" className="gap-2">
                  <Activity className="h-4 w-4" />
                  Activity ({activities.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="comments" className="mt-4">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    {/* Add Comment */}
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Add a comment..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={3}
                      />
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="internal"
                            checked={isInternal}
                            onCheckedChange={(checked) => setIsInternal(!!checked)}
                          />
                          <Label htmlFor="internal" className="text-sm text-muted-foreground">
                            Internal note (not visible to requester)
                          </Label>
                        </div>
                        <Button
                          size="sm"
                          onClick={handleAddComment}
                          disabled={!newComment.trim() || addComment.isPending}
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Add
                        </Button>
                      </div>
                    </div>

                    {/* Comments List */}
                    {comments.length > 0 ? (
                      <div className="space-y-4 pt-4 border-t">
                        {comments.map((comment) => (
                          <div
                            key={comment.id}
                            className={`p-3 rounded-lg ${
                              comment.is_internal ? "bg-yellow-50 border border-yellow-200" : "bg-muted/50"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                <User className="h-3 w-3 text-primary" />
                              </div>
                              <span className="text-sm font-medium">User</span>
                              {comment.is_internal && (
                                <Badge variant="outline" className="text-xs bg-yellow-100">
                                  Internal
                                </Badge>
                              )}
                              <span className="text-xs text-muted-foreground ml-auto">
                                {format(new Date(comment.created_at), "MMM dd, yyyy HH:mm")}
                              </span>
                            </div>
                            <p className="text-sm text-foreground">{comment.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No comments yet.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardContent className="pt-6">
                    {activities.length > 0 ? (
                      <div className="space-y-3">
                        {activities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-3 text-sm">
                            <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                            <div className="flex-1">
                              <p className="text-foreground">{activity.action}</p>
                              <p className="text-xs text-muted-foreground">
                                {format(new Date(activity.created_at), "MMM dd, yyyy HH:mm")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground text-center py-4">
                        No activity recorded.
                      </p>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* SLA Info */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  SLA Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <SLAIndicator deadline={ticket.sla_deadline} status={ticket.status} />
                {ticket.sla_deadline && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Deadline: {format(new Date(ticket.sla_deadline), "MMM dd, yyyy HH:mm")}
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Details */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category</span>
                  <span className="font-medium">{ticket.category?.name || "—"}</span>
                </div>
                {ticket.sub_category && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sub-category</span>
                    <span className="font-medium">{ticket.sub_category}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Created</span>
                  <span className="font-medium">
                    {format(new Date(ticket.created_at), "MMM dd, yyyy")}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Updated</span>
                  <span className="font-medium">
                    {format(new Date(ticket.updated_at), "MMM dd, yyyy")}
                  </span>
                </div>
                {ticket.resolved_at && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resolved</span>
                    <span className="font-medium">
                      {format(new Date(ticket.resolved_at), "MMM dd, yyyy")}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </TicketLayout>
  );
}
