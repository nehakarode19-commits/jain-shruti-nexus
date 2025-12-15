import { TicketLayout } from "@/components/tickets/TicketLayout";
import { SEO } from "@/components/shared/SEO";
import { useTickets } from "@/hooks/useTickets";
import { TicketCard } from "@/components/tickets/TicketCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Ticket } from "lucide-react";

export default function MyTickets() {
  // In a real app, we'd filter by the current user's ID
  const { data: tickets, isLoading } = useTickets();

  return (
    <TicketLayout title="My Tickets">
      <SEO
        title="My Tickets | Jambushrusti"
        description="View tickets you created or assigned to you."
      />

      <div className="space-y-6">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">My Tickets</h1>
          <p className="text-muted-foreground">
            Tickets you created or that are assigned to you.
          </p>
        </div>

        {/* Ticket List */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-28 w-full" />
              ))}
            </div>
          ) : tickets && tickets.length > 0 ? (
            tickets.map((ticket) => <TicketCard key={ticket.id} ticket={ticket} />)
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Ticket className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground">No tickets found.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </TicketLayout>
  );
}
