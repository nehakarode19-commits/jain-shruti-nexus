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
  GraduationCap,
  X,
  FileText,
  Search,
  Handshake
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/scholar/dashboard" },
  { icon: Users, label: "Scholar Directory", href: "/scholar/directory" },
  { icon: FileText, label: "Publications", href: "/scholar/publications" },
  { icon: Handshake, label: "Collaborate", href: "/scholar/collaborate" },
  { icon: Newspaper, label: "Community Feed", href: "/scholar/feed" },
  { icon: Calendar, label: "Events", href: "/scholar/events" },
  { icon: Sparkles, label: "AI Tools", href: "/scholar/ai-tools" },
  { icon: BookOpen, label: "Research Tools", href: "/research" },
  { icon: Settings, label: "Settings", href: "/scholar/settings" },
];

interface ScholarSidebarProps {
  onClose?: () => void;
}

export function ScholarSidebar({ onClose }: ScholarSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/";
  };

  return (
    <aside className="w-72 lg:w-64 min-h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 sm:p-6 border-b border-primary-foreground/10 flex items-center justify-between">
        <Link to="/scholar/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-orange" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-white">Scholar Portal</h1>
            <p className="text-xs text-white/60">Jambushrusti</p>
          </div>
        </Link>
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white/70 hover:text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-primary-foreground/10">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-orange/30">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-orange/20 text-orange font-semibold">
              {user?.name?.charAt(0).toUpperCase() || "S"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || "Demo Scholar"}</p>
            <p className="text-xs text-white/60 truncate">{user?.email || "scholar@demo.com"}</p>
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className="p-4 lg:hidden border-b border-primary-foreground/10">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/50" />
          <input 
            type="text"
            placeholder="Search..."
            className="w-full pl-9 pr-4 py-2 rounded-lg bg-white/10 text-white placeholder:text-white/50 text-sm border-0 focus:outline-none focus:ring-2 focus:ring-orange/50"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/scholar/dashboard" && location.pathname.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200",
                isActive 
                  ? "bg-orange text-white font-medium shadow-lg" 
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
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
