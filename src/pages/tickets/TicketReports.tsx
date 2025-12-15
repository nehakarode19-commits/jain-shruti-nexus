import { TicketLayout } from "@/components/tickets/TicketLayout";
import { SEO } from "@/components/shared/SEO";
import { useTickets, useTicketCategories } from "@/hooks/useTickets";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Download, FileText, PieChart, TrendingUp } from "lucide-react";

export default function TicketReports() {
  const { data: tickets = [] } = useTickets();
  const { data: categories = [] } = useTicketCategories();

  // Calculate stats
  const totalTickets = tickets.length;
  const resolvedTickets = tickets.filter((t) => ["resolved", "closed"].includes(t.status)).length;
  const avgResolutionTime = "24h"; // Mock

  const slaBreached = tickets.filter((t) => t.sla_breached).length;
  const slaCompliance = totalTickets > 0 ? Math.round(((totalTickets - slaBreached) / totalTickets) * 100) : 100;

  const categoryStats = categories.map((cat) => ({
    name: cat.name,
    count: tickets.filter((t) => t.category_id === cat.id).length,
  })).sort((a, b) => b.count - a.count);

  const priorityStats = {
    critical: tickets.filter((t) => t.priority === "critical").length,
    high: tickets.filter((t) => t.priority === "high").length,
    medium: tickets.filter((t) => t.priority === "medium").length,
    low: tickets.filter((t) => t.priority === "low").length,
  };

  const handleExport = (type: string) => {
    // Mock export functionality
    alert(`Exporting ${type} report... (Mock functionality)`);
  };

  return (
    <TicketLayout title="Reports">
      <SEO
        title="Ticket Reports | Jambushrusti"
        description="View analytics and reports for ticket management."
      />

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">Reports & Analytics</h1>
            <p className="text-muted-foreground">
              View performance metrics and generate reports.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleExport("excel")}>
              <Download className="h-4 w-4 mr-2" />
              Export Excel
            </Button>
            <Button variant="outline" onClick={() => handleExport("pdf")}>
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{totalTickets}</p>
                  <p className="text-sm text-muted-foreground">Total Tickets</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{resolvedTickets}</p>
                  <p className="text-sm text-muted-foreground">Resolved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                  <PieChart className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{slaCompliance}%</p>
                  <p className="text-sm text-muted-foreground">SLA Compliance</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-orange/10 flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-orange" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{avgResolutionTime}</p>
                  <p className="text-sm text-muted-foreground">Avg Resolution</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* By Category */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tickets by Category</CardTitle>
            </CardHeader>
            <CardContent>
              {categoryStats.length > 0 ? (
                <div className="space-y-3">
                  {categoryStats.map((cat) => (
                    <div key={cat.name} className="flex items-center justify-between">
                      <span className="text-sm">{cat.name}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary"
                            style={{
                              width: `${totalTickets > 0 ? (cat.count / totalTickets) * 100 : 0}%`,
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8">{cat.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  No data available.
                </p>
              )}
            </CardContent>
          </Card>

          {/* By Priority */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Tickets by Priority</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-red-100 text-red-700">Critical</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-red-500"
                        style={{
                          width: `${totalTickets > 0 ? (priorityStats.critical / totalTickets) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{priorityStats.critical}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-orange-100 text-orange-700">High</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-orange-500"
                        style={{
                          width: `${totalTickets > 0 ? (priorityStats.high / totalTickets) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{priorityStats.high}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-blue-100 text-blue-700">Medium</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-500"
                        style={{
                          width: `${totalTickets > 0 ? (priorityStats.medium / totalTickets) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{priorityStats.medium}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-gray-100 text-gray-700">Low</Badge>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gray-400"
                        style={{
                          width: `${totalTickets > 0 ? (priorityStats.low / totalTickets) * 100 : 0}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm font-medium w-8">{priorityStats.low}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* SLA Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SLA Performance Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-green-50 rounded-xl">
                <p className="text-3xl font-bold text-green-600">{totalTickets - slaBreached}</p>
                <p className="text-sm text-muted-foreground mt-1">Within SLA</p>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-xl">
                <p className="text-3xl font-bold text-red-600">{slaBreached}</p>
                <p className="text-sm text-muted-foreground mt-1">SLA Breached</p>
              </div>
              <div className="text-center p-4 bg-primary/5 rounded-xl">
                <p className="text-3xl font-bold text-primary">{slaCompliance}%</p>
                <p className="text-sm text-muted-foreground mt-1">Compliance Rate</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TicketLayout>
  );
}
