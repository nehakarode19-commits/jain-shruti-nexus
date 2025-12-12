import { 
  Users, 
  BookOpen, 
  Library, 
  FileText, 
  Clock, 
  Calendar, 
  TrendingUp,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Activity
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";

const statsCards = [
  {
    title: "Total Users",
    value: "1,284",
    change: "+12%",
    trend: "up",
    icon: Users,
    color: "bg-primary/10 text-primary",
  },
  {
    title: "Active Scholars",
    value: "156",
    change: "+8%",
    trend: "up",
    icon: BookOpen,
    color: "bg-gold/10 text-gold",
  },
  {
    title: "LMS Books",
    value: "3,842",
    change: "+24",
    trend: "up",
    icon: Library,
    color: "bg-sage/10 text-sage",
  },
  {
    title: "Manuscripts",
    value: "428",
    change: "+5",
    trend: "up",
    icon: FileText,
    color: "bg-burgundy/10 text-burgundy",
  },
  {
    title: "Pending Approvals",
    value: "23",
    change: "-4",
    trend: "down",
    icon: Clock,
    color: "bg-terracotta/10 text-terracotta",
  },
  {
    title: "Upcoming Events",
    value: "8",
    change: "+2",
    trend: "up",
    icon: Calendar,
    color: "bg-accent/10 text-accent",
  },
];

const recentActivities = [
  { action: "New scholar registration", user: "Dr. Mehta", time: "5 mins ago", type: "user" },
  { action: "Book returned", user: "Member #245", time: "12 mins ago", type: "lms" },
  { action: "Guruvani access request", user: "Scholar Jain", time: "28 mins ago", type: "access" },
  { action: "New research entry", user: "Admin", time: "1 hour ago", type: "research" },
  { action: "Event published", user: "Admin", time: "2 hours ago", type: "event" },
];

const quickActions = [
  { label: "Add Book", icon: Plus, href: "/admin/books", color: "bg-primary" },
  { label: "Add Manuscript", icon: Plus, href: "/lms/manuscripts", color: "bg-gold" },
  { label: "Upload PDF", icon: Plus, href: "/research/shabdasangraha", color: "bg-sage" },
  { label: "Create Event", icon: Plus, href: "/admin/events", color: "bg-burgundy" },
  { label: "Add Research", icon: Plus, href: "/research/sodhsanchay", color: "bg-terracotta" },
];

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        {/* Page Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">Welcome back! Here's your overview.</p>
          </div>
          <Button className="rounded-xl bg-gradient-to-r from-primary to-gold hover:opacity-90">
            <Plus className="mr-2 h-4 w-4" />
            Quick Action
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="rounded-2xl border-0 shadow-soft hover:shadow-elevated transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${stat.trend === "up" ? "bg-sage/10 text-sage" : "bg-destructive/10 text-destructive"}`}
                    >
                      {stat.trend === "up" ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                      {stat.change}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{stat.title}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="rounded-2xl border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-display">Quick Actions</CardTitle>
              <CardDescription>Frequently used actions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Link key={action.label} to={action.href}>
                    <Button
                      variant="outline"
                      className="w-full justify-start rounded-xl border-border/50 hover:bg-muted h-12"
                    >
                      <div className={`h-8 w-8 rounded-lg flex items-center justify-center mr-3 ${action.color}/10`}>
                        <Icon className={`h-4 w-4 ${action.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </CardContent>
          </Card>

          {/* Charts Section */}
          <Card className="lg:col-span-2 rounded-2xl border-0 shadow-soft">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-lg font-display">LMS Activity</CardTitle>
                <CardDescription>Book issues & returns this month</CardDescription>
              </div>
              <BarChart3 className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="h-[200px] flex items-center justify-center bg-muted/30 rounded-xl">
                <div className="text-center">
                  <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Chart visualization</p>
                  <p className="text-xs text-muted-foreground">Connect to Lovable Cloud for real data</p>
                </div>
              </div>
              
              {/* Mini Stats */}
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <p className="text-lg font-bold text-foreground">248</p>
                  <p className="text-xs text-muted-foreground">Issued</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <p className="text-lg font-bold text-foreground">192</p>
                  <p className="text-xs text-muted-foreground">Returned</p>
                </div>
                <div className="text-center p-3 bg-muted/30 rounded-xl">
                  <p className="text-lg font-bold text-foreground">56</p>
                  <p className="text-xs text-muted-foreground">Overdue</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <Card className="rounded-2xl border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-display">Recent Activities</CardTitle>
              <CardDescription>Latest actions across the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-center gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Activity className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.user}</p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="rounded-2xl border-0 shadow-soft">
            <CardHeader>
              <CardTitle className="text-lg font-display">System Status</CardTitle>
              <CardDescription>Index and storage status</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">PDF Search Index</span>
                  <span className="text-sm font-medium text-foreground">78%</span>
                </div>
                <Progress value={78} className="h-2 rounded-full" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Storage Used</span>
                  <span className="text-sm font-medium text-foreground">45%</span>
                </div>
                <Progress value={45} className="h-2 rounded-full" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Research Entries</span>
                  <span className="text-sm font-medium text-foreground">92%</span>
                </div>
                <Progress value={92} className="h-2 rounded-full" />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">AI Processing</span>
                  <span className="text-sm font-medium text-foreground">Active</span>
                </div>
                <Badge className="bg-sage/10 text-sage border-sage/20">Online</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  );
}
