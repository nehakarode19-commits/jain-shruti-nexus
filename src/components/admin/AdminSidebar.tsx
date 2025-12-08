import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  Globe,
  Image,
  FileText,
  PenTool,
  Calendar,
  GraduationCap,
  Search,
  Library,
  Building,
  Brain,
  Key,
  ClipboardList,
  Settings,
  ChevronLeft,
  ChevronRight,
  Scroll,
  Shield,
  Newspaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin/dashboard" },
  { icon: Users, label: "Users & Roles", path: "/admin/users" },
  { icon: BookOpen, label: "Guruvani", path: "/admin/guruvani" },
  { icon: Globe, label: "Website CMS", path: "/admin/cms" },
  { icon: Image, label: "Gallery", path: "/admin/gallery" },
  { icon: FileText, label: "Books (PDFs)", path: "/admin/books" },
  { icon: Newspaper, label: "Articles/Tributes", path: "/admin/articles" },
  { icon: PenTool, label: "Blog", path: "/admin/blog" },
  { icon: Calendar, label: "Events", path: "/admin/events" },
  { icon: GraduationCap, label: "Scholars", path: "/admin/scholars" },
  { icon: Search, label: "Research Tools", path: "/admin/research" },
  { icon: Library, label: "LMS", path: "/admin/lms" },
  { icon: Building, label: "Digital Museum", path: "/admin/museum" },
  { icon: Brain, label: "AI & Indexing", path: "/admin/ai" },
  { icon: Key, label: "Access Requests", path: "/admin/access-requests" },
  { icon: ClipboardList, label: "Logs", path: "/admin/logs" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

export function AdminSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-[72px]" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {!collapsed && (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-gold shadow-soft">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-poppins text-sm font-semibold text-foreground">
                Admin Panel
              </span>
              <span className="text-[10px] text-muted-foreground">
                Jambu-Shruti
              </span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-gold shadow-soft mx-auto">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 z-50 h-6 w-6 rounded-full border border-border bg-card shadow-sm hover:bg-muted"
      >
        {collapsed ? (
          <ChevronRight className="h-3 w-3" />
        ) : (
          <ChevronLeft className="h-3 w-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + "/");
            const Icon = item.icon;

            const linkContent = (
              <NavLink
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary shadow-sm"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  collapsed && "justify-center px-2"
                )}
              >
                <Icon className={cn("h-5 w-5 shrink-0", isActive && "text-primary")} />
                {!collapsed && <span className="font-poppins">{item.label}</span>}
              </NavLink>
            );

            return (
              <li key={item.path}>
                {collapsed ? (
                  <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
                    <TooltipContent side="right" className="font-poppins">
                      {item.label}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  linkContent
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Scroll className="h-3 w-3" />
            <span className="font-poppins">Version 1.0.0</span>
          </div>
        </div>
      )}
    </aside>
  );
}
