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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const studentNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/learning/dashboard" },
  { icon: BookOpen, label: "My Courses", href: "/learning/my-courses" },
  { icon: Calendar, label: "Schedule", href: "/learning/schedule" },
  { icon: Video, label: "Recordings", href: "/learning/recordings" },
  { icon: FileText, label: "Materials", href: "/learning/materials" },
  { icon: BarChart3, label: "Progress", href: "/learning/progress" },
  { icon: Settings, label: "Settings", href: "/learning/settings" },
];

const instructorNavItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/learning/instructor" },
  { icon: BookOpen, label: "My Courses", href: "/learning/instructor/courses" },
  { icon: Users, label: "Students", href: "/learning/instructor/students" },
  { icon: Calendar, label: "Schedule", href: "/learning/instructor/schedule" },
  { icon: FileText, label: "Materials", href: "/learning/instructor/materials" },
  { icon: BarChart3, label: "Reports", href: "/learning/instructor/reports" },
  { icon: Settings, label: "Settings", href: "/learning/settings" },
];

interface LearningSidebarProps {
  onClose?: () => void;
  isInstructor?: boolean;
}

export function LearningSidebar({ onClose, isInstructor = false }: LearningSidebarProps) {
  const location = useLocation();
  const { user, logout } = useAdminAuth();

  const navItems = isInstructor ? instructorNavItems : studentNavItems;

  const handleLogout = async () => {
    await logout();
    window.location.href = "/learning";
  };

  return (
    <aside className="w-72 lg:w-64 min-h-screen bg-primary text-primary-foreground flex flex-col">
      {/* Logo/Brand */}
      <div className="p-4 sm:p-6 border-b border-primary-foreground/10 flex items-center justify-between">
        <Link to="/learning" className="flex items-center gap-3" onClick={onClose}>
          <div className="w-10 h-10 rounded-xl bg-orange/20 flex items-center justify-center">
            <GraduationCap className="h-6 w-6 text-orange" />
          </div>
          <div>
            <h1 className="font-heading text-lg font-bold text-white">Learning Portal</h1>
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
            <p className="text-sm font-medium text-white truncate">{user?.name || "Student"}</p>
            <p className="text-xs text-white/60 truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href || 
            (item.href !== "/learning/dashboard" && location.pathname.startsWith(item.href));
          
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

      {/* Browse Courses Link */}
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
