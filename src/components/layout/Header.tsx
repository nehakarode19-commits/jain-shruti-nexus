import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, Search, Mail, Scroll, LogOut, User, Settings, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAdminAuth, ROLE_LABELS, UserRole } from "@/contexts/AdminAuthContext";
import { useToast } from "@/hooks/use-toast";

const navigationItems = [
  {
    title: "About",
    href: "/about",
    items: [
      { title: "About Jambu-Shruti", href: "/about", description: "Vision & mission of our platform" },
      { title: "Gurudev Muni Jambuvijayji", href: "/about/gurudev", description: "Life journey & spiritual contributions" },
      { title: "Gurudev Parivar", href: "/about/parivar", description: "Lineage & disciples" },
      { title: "Jambuji Gyan Kendra", href: "/about/gyan-kendra", description: "Digital museum of teachings" },
    ],
  },
  {
    title: "Guruvani",
    href: "/guruvani",
    description: "Sacred teachings & discourses",
  },
  {
    title: "Research",
    href: "/research",
    description: "Jain Knowledge & Research Ecosystem",
  },
  {
    title: "Library",
    href: "/library",
    description: "Browse our book & manuscript collection",
  },
  {
    title: "Scholars",
    href: "/scholars",
    description: "Scholar portal & directory",
  },
  {
    title: "Community",
    href: "/community",
    items: [
      { title: "Events", href: "/community/events", description: "Workshops & lectures" },
      { title: "Blog", href: "/community/blog", description: "Insights & articles" },
      { title: "News", href: "/community/news", description: "Latest announcements" },
    ],
  },
];

const ROLE_ICONS: Record<UserRole, string> = {
  superadmin: "👑",
  admin: "🛡️",
  scholar: "📚",
  librarian: "📖",
  user: "👤",
  public: "🌐",
};

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAdminAuth();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate("/");
  };

  const getDashboardPath = (role: UserRole): string => {
    switch (role) {
      case "superadmin":
      case "admin":
        return "/admin/dashboard";
      case "librarian":
        return "/lms/dashboard";
      case "scholar":
        return "/research";
      default:
        return "/";
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-primary to-gold shadow-soft group-hover:shadow-glow transition-all duration-300">
            <Scroll className="h-5 w-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="font-display text-lg font-bold text-foreground leading-tight">
              Jambu-Shruti
            </span>
            <span className="text-[10px] text-muted-foreground tracking-wide">
              Jain Knowledge Ecosystem
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="gap-1">
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <NavigationMenuTrigger className="bg-transparent hover:bg-secondary/50 data-[state=open]:bg-secondary/50">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-2 p-4 md:w-[500px] md:grid-cols-2">
                        {item.items.map((subItem) => (
                          <li key={subItem.title}>
                            <NavigationMenuLink asChild>
                              <Link
                                to={subItem.href}
                                className={cn(
                                  "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground",
                                  location.pathname === subItem.href && "bg-secondary"
                                )}
                              >
                                <div className="text-sm font-medium leading-none">{subItem.title}</div>
                                <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
                                  {subItem.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <Link
                      to={item.href}
                      className={cn(
                        "group inline-flex h-9 w-max items-center justify-center rounded-lg bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-secondary/50 hover:text-secondary-foreground focus:bg-secondary focus:text-secondary-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",
                        location.pathname === item.href && "bg-secondary/50"
                      )}
                    >
                      {item.title}
                    </Link>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="hidden md:flex" asChild>
            <Link to="/search">
              <Search className="h-4 w-4" />
            </Link>
          </Button>
          <Button variant="subtle" size="sm" className="hidden md:flex" asChild>
            <Link to="/contact">
              <Mail className="h-4 w-4 mr-2" />
              Contact
            </Link>
          </Button>
          
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden md:flex gap-2">
                  <span>{ROLE_ICONS[user.role]}</span>
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{ROLE_LABELS[user.role]}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={getDashboardPath(user.role)} className="cursor-pointer">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/profile" className="cursor-pointer">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link to="/settings" className="cursor-pointer">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-destructive focus:text-destructive">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="hero" size="sm" className="hidden md:flex" asChild>
              <Link to="/auth">
                Sign In
              </Link>
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navigationItems.map((item) => (
                  <div key={item.title} className="space-y-2">
                    <Link
                      to={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-display text-lg font-medium hover:text-primary transition-colors"
                    >
                      {item.title}
                    </Link>
                    {item.items && (
                      <div className="pl-4 space-y-2 border-l-2 border-border">
                        {item.items.map((subItem) => (
                          <Link
                            key={subItem.title}
                            to={subItem.href}
                            onClick={() => setMobileOpen(false)}
                            className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {subItem.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <div className="flex flex-col gap-2 pt-4 border-t border-border">
                  <Button variant="subtle" asChild onClick={() => setMobileOpen(false)}>
                    <Link to="/contact">Contact</Link>
                  </Button>
                  {isAuthenticated && user ? (
                    <>
                      <div className="flex items-center gap-2 p-2 bg-muted rounded-lg">
                        <span>{ROLE_ICONS[user.role]}</span>
                        <div className="flex-1">
                          <p className="text-sm font-medium">{user.name}</p>
                          <p className="text-xs text-muted-foreground">{ROLE_LABELS[user.role]}</p>
                        </div>
                      </div>
                      <Button variant="outline" asChild onClick={() => setMobileOpen(false)}>
                        <Link to={getDashboardPath(user.role)}>
                          <LayoutDashboard className="mr-2 h-4 w-4" />
                          Dashboard
                        </Link>
                      </Button>
                      <Button 
                        variant="destructive" 
                        onClick={() => {
                          handleLogout();
                          setMobileOpen(false);
                        }}
                      >
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button variant="hero" asChild onClick={() => setMobileOpen(false)}>
                      <Link to="/auth">Sign In</Link>
                    </Button>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
