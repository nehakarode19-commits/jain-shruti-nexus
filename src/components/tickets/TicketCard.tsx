import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SLAIndicator } from "./SLAIndicator";
import { Ticket } from "@/hooks/useTickets";
import { format } from "date-fns";
import { ChevronRight, User } from "lucide-react";

interface TicketCardProps {
  ticket: Ticket;
  assigneeName?: string;
}

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

export function TicketCard({ ticket, assigneeName }: TicketCardProps) {
  return (
    <Link to={`/tickets/${ticket.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer group">
        <CardContent className="p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-mono text-muted-foreground">
                  {ticket.ticket_number}
                </span>
                <Badge variant="outline" className={priorityColors[ticket.priority]}>
                  {ticket.priority.charAt(0).toUpperCase() + ticket.priority.slice(1)}
                </Badge>
                <Badge className={statusColors[ticket.status]}>
                  {statusLabels[ticket.status]}
                </Badge>
              </div>

              <h3 className="font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {ticket.title}
              </h3>

              {ticket.description && (
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {ticket.description}
                </p>
              )}

              <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                {ticket.category && (
                  <span className="bg-muted px-2 py-0.5 rounded">{ticket.category.name}</span>
                )}
                <span>{format(new Date(ticket.created_at), "MMM dd, yyyy HH:mm")}</span>
                {ticket.assigned_to && (
                  <span className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded">
                    <User className="h-3 w-3" />
                    {assigneeName || "Assigned"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex flex-col items-end gap-2">
              <SLAIndicator deadline={ticket.sla_deadline} status={ticket.status} />
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
