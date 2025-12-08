import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BookOpen,
  BookMarked,
  BookDown,
  ScrollText,
  Users,
  CheckCircle,
  BarChart3,
  Ticket,
  Settings,
  ChevronLeft,
  ChevronRight,
  Library,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/lms" },
  { icon: BookOpen, label: "Book Entry", path: "/lms/book-entry" },
  { icon: BookMarked, label: "Book Issue", path: "/lms/book-issue" },
  { icon: BookDown, label: "Book Receive", path: "/lms/book-receive" },
  { icon: ScrollText, label: "Manuscripts", path: "/lms/manuscripts" },
  { icon: Users, label: "Members", path: "/lms/members" },
  { icon: CheckCircle, label: "Approvals", path: "/lms/approvals" },
  { icon: BarChart3, label: "Reports", path: "/lms/reports" },
  { icon: Ticket, label: "Ticket Management", path: "/lms/tickets" },
  { icon: Settings, label: "Settings", path: "/lms/settings" },
];

export function LMSSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 ease-in-out shadow-lg",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 border-b border-border bg-primary/5">
        <div className={cn("flex items-center gap-3", collapsed && "justify-center w-full")}>
          <Library className="h-8 w-8 text-primary shrink-0" />
          {!collapsed && (
            <div className="overflow-hidden">
              <h1 className="font-bold text-foreground text-lg leading-tight">Jambu-Shruti</h1>
              <p className="text-xs text-muted-foreground">Library Management</p>
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 h-6 w-6 rounded-full border border-border bg-card shadow-md hover:bg-secondary"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="p-3 space-y-1 overflow-y-auto h-[calc(100vh-4rem)]">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path || 
            (item.path !== "/lms" && location.pathname.startsWith(item.path));
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-2"
              )}
            >
              <item.icon className={cn("h-5 w-5 shrink-0", isActive && "animate-pulse")} />
              {!collapsed && (
                <span className="font-medium text-sm">{item.label}</span>
              )}
              {collapsed && (
                <div className="absolute left-full ml-2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
                  {item.label}
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
