import { ReactNode, useState } from "react";
import { LearningSidebar } from "./LearningSidebar";
import { Button } from "@/components/ui/button";
import { Menu, Bell, Home, Search, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LearningLayoutProps {
  children: ReactNode;
  title?: string;
}

export function LearningLayout({ children, title }: LearningLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAdminAuth();

  const handleLogout = async () => {
    await logout();
    window.location.href = "/auth";
  };

  return (
    <div className="min-h-screen flex bg-background w-full">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <LearningSidebar />
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" 
            onClick={() => setSidebarOpen(false)} 
          />
          <div className="absolute left-0 top-0 h-full w-72 animate-fade-in">
            <LearningSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen w-full">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b bg-card/95 backdrop-blur-sm border-border shadow-sm">
          <div className="flex items-center justify-between h-16 px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-10 w-10 hover:bg-primary/10"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5 text-foreground" />
              </Button>
              {title && (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:block w-1 h-6 bg-primary rounded-full" />
                  <h1 className="font-heading text-lg sm:text-xl font-bold text-foreground">
                    {title}
                  </h1>
                </div>
              )}
            </div>

            {/* Search Bar - Desktop */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search courses, lectures..." 
                  className="pl-10 bg-muted/50 border-border focus:bg-background transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              {/* Home Link */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-10 w-10 hover:bg-primary/10" 
                asChild
              >
                <Link to="/">
                  <Home className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                </Link>
              </Button>

              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className="relative h-10 w-10 hover:bg-primary/10"
              >
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground transition-colors" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full animate-pulse" />
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-10 gap-2 px-2 hover:bg-primary/10">
                    <Avatar className="h-8 w-8 border-2 border-primary/20">
                      <AvatarImage src={user?.avatar} />
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden sm:block text-sm font-medium text-foreground">
                      {user?.name?.split(" ")[0] || "User"}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-card border-border">
                  <div className="px-3 py-2">
                    <p className="text-sm font-medium text-foreground">{user?.name || "User"}</p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/learning/settings" className="cursor-pointer">
                      <User className="h-4 w-4 mr-2" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto bg-muted/30">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
