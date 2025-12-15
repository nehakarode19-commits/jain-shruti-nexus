import { Link } from "react-router-dom";
import { TicketLayout } from "@/components/tickets/TicketLayout";
import { SEO } from "@/components/shared/SEO";
import { useTicketStats, useTickets } from "@/hooks/useTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TicketCard } from "@/components/tickets/TicketCard";
import {
  Ticket,
  Plus,
  AlertTriangle,
  Clock,
  CheckCircle,
  PauseCircle,
  ChevronRight,
  TrendingUp,
  BarChart3,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TicketDashboard() {
  const { data: stats, isLoading: statsLoading } = useTicketStats();
  const { data: recentTickets, isLoading: ticketsLoading } = useTickets();

  return (
    <TicketLayout title="Ticket Dashboard">
      <SEO
        title="Ticket Dashboard | Jambushrusti"
        description="Manage and track support tickets across the Jambushrusti platform."
      />

      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-primary/5 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                Ticket Management Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Track, manage, and resolve support tickets efficiently.
              </p>
            </div>
            <Button asChild>
              <Link to="/tickets/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Ticket
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Ticket className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.total || 0}
                </p>
                <p className="text-sm text-muted-foreground">Total</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.open || 0}
                </p>
                <p className="text-sm text-muted-foreground">Open</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-yellow-100 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.inProgress || 0}
                </p>
                <p className="text-sm text-muted-foreground">In Progress</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                <PauseCircle className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.onHold || 0}
                </p>
                <p className="text-sm text-muted-foreground">On Hold</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.resolved || 0}
                </p>
                <p className="text-sm text-muted-foreground">Resolved</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-red-200 bg-red-50/50">
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-red-600">
                  {statsLoading ? <Skeleton className="h-7 w-12" /> : stats?.overdue || 0}
                </p>
                <p className="text-sm text-muted-foreground">Overdue</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Priority Distribution */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-gray-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Low Priority</p>
                  <p className="text-2xl font-bold">{stats?.byPriority?.low || 0}</p>
                </div>
                <Badge variant="outline" className="bg-gray-100">Low</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-blue-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Medium Priority</p>
                  <p className="text-2xl font-bold">{stats?.byPriority?.medium || 0}</p>
                </div>
                <Badge variant="outline" className="bg-blue-100 text-blue-700">Medium</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-orange-400">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">High Priority</p>
                  <p className="text-2xl font-bold">{stats?.byPriority?.high || 0}</p>
                </div>
                <Badge variant="outline" className="bg-orange-100 text-orange-700">High</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-l-4 border-l-red-500">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Critical Priority</p>
                  <p className="text-2xl font-bold">{stats?.byPriority?.critical || 0}</p>
                </div>
                <Badge variant="outline" className="bg-red-100 text-red-700">Critical</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Tickets */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Ticket className="h-5 w-5 text-primary" />
              Recent Tickets
            </CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tickets/list">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {ticketsLoading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-24 w-full" />
                ))}
              </div>
            ) : recentTickets && recentTickets.length > 0 ? (
              recentTickets.slice(0, 5).map((ticket) => (
                <TicketCard key={ticket.id} ticket={ticket} />
              ))
            ) : (
              <div className="text-center py-8">
                <Ticket className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
                <p className="text-muted-foreground mb-4">No tickets yet.</p>
                <Button asChild>
                  <Link to="/tickets/create">Create First Ticket</Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/tickets/create">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">New Ticket</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/tickets/list?status=open">
                  <Clock className="h-6 w-6" />
                  <span className="text-sm">Open Tickets</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/tickets/reports">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">View Reports</span>
                </Link>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex-col gap-2" asChild>
                <Link to="/tickets/categories">
                  <Ticket className="h-6 w-6" />
                  <span className="text-sm">Categories</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </TicketLayout>
  );
}
