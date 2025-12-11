import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { 
  LayoutDashboard, 
  Users, 
  MessageSquare, 
  Calendar, 
  Sparkles, 
  Newspaper,
  BookOpen,
  Settings,
  LogOut,
  GraduationCap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/scholar/dashboard" },
  { icon: Users, label: "Scholar Directory", href: "/scholar/directory" },
  { icon: MessageSquare, label: "Collaborate", href: "/scholar/chat" },
  { icon: Newspaper, label: "Community Feed", href: "/scholar/feed" },
  { icon: Calendar, label: "Events", href: "/scholar/events" },
  { icon: Sparkles, label: "AI Tools", href: "/scholar/ai-tools" },
  { icon: BookOpen, label: "Research Tools", href: "/research" },
  { icon: Settings, label: "Settings", href: "/scholar/settings" },
];

export function ScholarSidebar() {
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <aside className="w-64 min-h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Logo/Brand */}
      <div className="p-6 border-b border-primary-foreground/10">
        <Link to="/scholar/dashboard" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gold/20 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-gold" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-white">Scholar Portal</h1>
            <p className="text-xs text-white/60">Jambushrusti</p>
          </div>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-gold/30">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-gold/20 text-gold font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name}</p>
            <p className="text-xs text-white/60 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/scholar/dashboard" && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-gold text-primary font-medium shadow-lg" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-primary-foreground/10">
        <Button
          variant="ghost"
          className="w-full justify-start text-white/70 hover:text-white hover:bg-white/10"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
