import { ScholarLayout } from "@/components/scholar/ScholarLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  Users, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  BookOpen, 
  FileText,
  TrendingUp,
  Bell,
  ArrowRight
} from "lucide-react";

const quickActions = [
  { icon: Users, label: "Browse Scholars", href: "/scholar/directory", color: "bg-blue-500/10 text-blue-500" },
  { icon: MessageSquare, label: "Start Discussion", href: "/scholar/chat", color: "bg-green-500/10 text-green-500" },
  { icon: Sparkles, label: "AI Assistant", href: "/scholar/ai-tools", color: "bg-purple-500/10 text-purple-500" },
  { icon: Calendar, label: "Upcoming Events", href: "/scholar/events", color: "bg-gold/10 text-gold" },
];

const recentActivities = [
  { type: "discussion", title: "New discussion on Jain Philosophy", time: "2 hours ago", user: "Dr. Sharma" },
  { type: "event", title: "Webinar: Ancient Texts Digitization", time: "5 hours ago", user: "System" },
  { type: "collaboration", title: "Research collaboration request", time: "1 day ago", user: "Prof. Mehta" },
  { type: "paper", title: "New paper submission received", time: "2 days ago", user: "Dr. Patel" },
];

export default function ScholarDashboard() {
  const { user } = useAdminAuth();

  return (
    <ScholarLayout title="Dashboard">
      <div className="space-y-6">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-6 text-white">
          <h2 className="text-2xl font-heading font-bold mb-2">
            Welcome back, {user?.name?.split(" ")[0] || "Scholar"}!
          </h2>
          <p className="text-white/80 mb-4">
            Continue your research journey and collaborate with fellow scholars.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary" className="bg-white text-primary hover:bg-white/90">
              <Link to="/scholar/feed">
                View Community Feed
              </Link>
            </Button>
            <Button asChild variant="ghost" className="text-white border-white/30 hover:bg-white/10">
              <Link to="/research">
                Research Tools
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">156</p>
                <p className="text-sm text-muted-foreground">Active Scholars</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">24</p>
                <p className="text-sm text-muted-foreground">Discussions</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gold" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">8</p>
                <p className="text-sm text-muted-foreground">Upcoming Events</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <FileText className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">42</p>
                <p className="text-sm text-muted-foreground">Research Papers</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action) => (
                <Link
                  key={action.href}
                  to={action.href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-muted transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${action.color}`}>
                    <action.icon className="h-5 w-5" />
                  </div>
                  <span className="flex-1 font-medium">{action.label}</span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Activity</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/scholar/feed">View All</Link>
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      {activity.type === "discussion" && <MessageSquare className="h-5 w-5 text-primary" />}
                      {activity.type === "event" && <Calendar className="h-5 w-5 text-gold" />}
                      {activity.type === "collaboration" && <Users className="h-5 w-5 text-green-500" />}
                      {activity.type === "paper" && <FileText className="h-5 w-5 text-purple-500" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{activity.title}</p>
                      <p className="text-sm text-muted-foreground">{activity.user} · {activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Events Preview */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Upcoming Events</CardTitle>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/scholar/events">View All</Link>
            </Button>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl border border-border hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  Dec 15, 2025
                </div>
                <h3 className="font-semibold mb-1">Jain Manuscript Workshop</h3>
                <p className="text-sm text-muted-foreground">Learn preservation techniques</p>
              </div>
              <div className="p-4 rounded-xl border border-border hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  Dec 20, 2025
                </div>
                <h3 className="font-semibold mb-1">Research Methodology Webinar</h3>
                <p className="text-sm text-muted-foreground">Advanced research techniques</p>
              </div>
              <div className="p-4 rounded-xl border border-border hover:border-gold/50 transition-colors">
                <div className="flex items-center gap-2 text-gold text-sm mb-2">
                  <Calendar className="h-4 w-4" />
                  Jan 5, 2026
                </div>
                <h3 className="font-semibold mb-1">Annual Scholars Meet</h3>
                <p className="text-sm text-muted-foreground">Network with fellow researchers</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScholarLayout>
  );
}
