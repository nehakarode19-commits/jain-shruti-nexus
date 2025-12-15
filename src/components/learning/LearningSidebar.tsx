import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import {
  LayoutDashboard,
  BookOpen,
  Calendar,
  Video,
  FileText,
  BarChart3,
  Settings,
  LogOut,
  GraduationCap,
  X,
  Users,
  ClipboardList,
  PlayCircle,
  Upload,
  UserCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Admin/Faculty navigation items
const adminNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/learning/dashboard" },
  { icon: BookOpen, label: "Courses", href: "/learning/courses-manage" },
  { icon: Video, label: "Lectures", href: "/learning/lectures" },
  { icon: FileText, label: "Study Materials", href: "/learning/materials" },
  { icon: Users, label: "Students", href: "/learning/students" },
  { icon: ClipboardList, label: "Attendance", href: "/learning/attendance" },
  { icon: Calendar, label: "Schedule", href: "/learning/schedule" },
  { icon: BarChart3, label: "Reports", href: "/learning/reports" },
  { icon: Settings, label: "Settings", href: "/learning/settings" },
];

// Student navigation items
const studentNavItems = [
  { icon: LayoutDashboard, label: "My Dashboard", href: "/learning/student" },
  { icon: BookOpen, label: "My Courses", href: "/learning/my-courses" },
  { icon: Calendar, label: "Schedule", href: "/learning/my-schedule" },
  { icon: PlayCircle, label: "Recordings", href: "/learning/recordings" },
  { icon: FileText, label: "Materials", href: "/learning/my-materials" },
  { icon: BarChart3, label: "My Progress", href: "/learning/progress" },
];

interface LearningSidebarProps {
  onClose?: () => void;
}

export function LearningSidebar({ onClose }: LearningSidebarProps) {
  const location = useLocation();
  const { user, logout, hasRole } = useAdminAuth();

  // LMS role users and admins get admin view, others get student view
  const isAdmin = hasRole(["lms", "admin", "superadmin"]);
  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth";
  };

  return (
    <aside className="w-72 lg:w-64 min-h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 sm:p-6 border-b border-primary-foreground/10 flex items-center justify-between">
        <Link to="/learning/dashboard" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-orange" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-white">Learning Portal</h1>
            <p className="text-xs text-white/60">Jambushrusti LMS</p>
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
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">{user?.name || "User"}</p>
            <p className="text-xs text-white/60 truncate capitalize">{user?.role || "Student"}</p>
          </div>
        </div>
      </div>

      {/* Role Badge */}
      <div className="px-4 py-2">
        <div className="px-3 py-1.5 rounded-lg bg-orange/20 text-orange text-xs font-medium text-center">
          {isAdmin ? "Admin / Faculty" : "Student"}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/learning/dashboard" && item.href !== "/learning/student" && location.pathname.startsWith(item.href));
          
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

      {/* Browse All Courses */}
      <div className="p-4 border-t border-primary-foreground/10">
        <Link
          to="/learning/courses"
          onClick={onClose}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white transition-all duration-200"
        >
          <BookOpen className="h-5 w-5 flex-shrink-0" />
          <span className="text-sm">Browse All Courses</span>
        </Link>
      </div>

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
