import { LMSLayout } from "@/components/lms/LMSLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BookOpen,
  ScrollText,
  Users,
  AlertTriangle,
  Plus,
  BookMarked,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const summaryCards = [
  {
    title: "Total Books",
    value: "12,458",
    change: "+124 this month",
    icon: BookOpen,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Total Manuscripts",
    value: "3,842",
    change: "+28 this month",
    icon: ScrollText,
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Total Members",
    value: "1,256",
    change: "+42 this month",
    icon: Users,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    title: "Overdue Items",
    value: "23",
    change: "5 critical",
    icon: AlertTriangle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
];

const barChartData = [
  { name: "Jan", issued: 65, received: 58, overdue: 7 },
  { name: "Feb", issued: 78, received: 72, overdue: 12 },
  { name: "Mar", issued: 92, received: 85, overdue: 8 },
  { name: "Apr", issued: 84, received: 79, overdue: 5 },
  { name: "May", issued: 110, received: 102, overdue: 9 },
  { name: "Jun", issued: 95, received: 88, overdue: 11 },
];

const pieChartData = [
  { name: "Books", value: 12458, color: "hsl(var(--primary))" },
  { name: "Manuscripts", value: 3842, color: "hsl(var(--accent))" },
  { name: "Members", value: 1256, color: "hsl(var(--secondary))" },
  { name: "Overdue", value: 23, color: "hsl(var(--destructive))" },
];

export default function LMSDashboard() {
  return (
    <LMSLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome, Librarian 🙏
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's what's happening in the library today
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/lms/book-entry">
                <Plus className="h-4 w-4" />
                Add Book
              </Link>
            </Button>
            <Button variant="outline" className="gap-2" asChild>
              <Link to="/lms/manuscripts">
                <ScrollText className="h-4 w-4" />
                Add Manuscript
              </Link>
            </Button>
            <Button variant="hero" className="gap-2" asChild>
              <Link to="/lms/book-issue">
                <BookMarked className="h-4 w-4" />
                Issue Book
              </Link>
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Card
              key={card.title}
              className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground font-medium">
                      {card.title}
                    </p>
                    <p className="text-3xl font-bold mt-2 text-foreground">
                      {card.value}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                      <TrendingUp className="h-3 w-3" />
                      {card.change}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${card.bgColor}`}>
                    <card.icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-border">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="p-0 h-auto text-primary hover:text-primary/80"
                  >
                    View details
                    <ArrowUpRight className="h-3 w-3 ml-1" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bar Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">
                Issue & Receive Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Bar
                      dataKey="issued"
                      fill="hsl(var(--primary))"
                      radius={[4, 4, 0, 0]}
                      name="Issued"
                    />
                    <Bar
                      dataKey="received"
                      fill="hsl(var(--accent))"
                      radius={[4, 4, 0, 0]}
                      name="Received"
                    />
                    <Bar
                      dataKey="overdue"
                      fill="hsl(var(--destructive))"
                      radius={[4, 4, 0, 0]}
                      name="Overdue"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Pie Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Library Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "8px",
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  action: "Book Issued",
                  item: "Āgama Encyclopedia Vol. 3",
                  user: "Ramesh Patel",
                  time: "2 minutes ago",
                  type: "issue",
                },
                {
                  action: "Book Received",
                  item: "Jain Dharma Ka Itihas",
                  user: "Suresh Shah",
                  time: "15 minutes ago",
                  type: "receive",
                },
                {
                  action: "New Member",
                  item: "Dr. Meena Jain",
                  user: "Registration",
                  time: "1 hour ago",
                  type: "member",
                },
                {
                  action: "Manuscript Added",
                  item: "Kalpa Sutra (Hastrap #1247)",
                  user: "Admin",
                  time: "3 hours ago",
                  type: "manuscript",
                },
              ].map((activity, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-3 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                >
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      activity.type === "issue"
                        ? "bg-primary/20 text-primary"
                        : activity.type === "receive"
                        ? "bg-green-500/20 text-green-500"
                        : activity.type === "member"
                        ? "bg-blue-500/20 text-blue-500"
                        : "bg-amber-500/20 text-amber-500"
                    }`}
                  >
                    {activity.type === "issue" ? (
                      <BookMarked className="h-5 w-5" />
                    ) : activity.type === "receive" ? (
                      <BookOpen className="h-5 w-5" />
                    ) : activity.type === "member" ? (
                      <Users className="h-5 w-5" />
                    ) : (
                      <ScrollText className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">
                      {activity.action}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.item}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">
                      {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </LMSLayout>
  );
}
