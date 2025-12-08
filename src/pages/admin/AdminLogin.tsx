import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Scroll, Shield, Loader2, ChevronDown, UserCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useAdminAuth, UserRole, ROLE_LABELS, ROLE_DESCRIPTIONS, AVAILABLE_ROLES } from "@/contexts/AdminAuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const ROLE_ICONS: Record<UserRole, string> = {
  superadmin: "👑",
  admin: "🛡️",
  scholar: "📚",
  librarian: "📖",
  user: "👤",
  public: "🌐",
};

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState<UserRole | "">("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginMode, setLoginMode] = useState<"role" | "credentials">("role");
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, isAuthenticated } = useAdminAuth();

  // If already authenticated, redirect to dashboard
  if (isAuthenticated) {
    navigate("/admin/dashboard", { replace: true });
    return null;
  }

  const handleRoleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedRole) {
      toast({
        title: "Select a role",
        description: "Please select a role to continue",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login("", "", selectedRole);
      
      if (result.success) {
        toast({
          title: "Welcome!",
          description: `Logged in as ${ROLE_LABELS[selectedRole]}`,
        });
        navigate(result.redirectTo || "/", { replace: true });
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Something went wrong",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        title: "Missing credentials",
        description: "Please enter your email and password",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        toast({
          title: "Welcome back!",
          description: "You have successfully logged in",
        });
        navigate(result.redirectTo || "/admin/dashboard", { replace: true });
      } else {
        toast({
          title: "Login failed",
          description: result.error || "Invalid credentials. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-spiritual p-4">
      <div className="absolute inset-0 lotus-pattern opacity-30" />
      
      <Card className="w-full max-w-md relative z-10 shadow-elevated border-0 rounded-2xl overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-gold to-primary" />
        
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-gold shadow-glow">
              <Shield className="h-8 w-8 text-primary-foreground" />
            </div>
          </div>
          <div>
            <CardTitle className="text-2xl font-display font-bold text-foreground">
              Jambu-Shruti Portal
            </CardTitle>
            <CardDescription className="text-muted-foreground mt-2">
              Role-Based Access System
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-8">
          <Tabs value={loginMode} onValueChange={(v) => setLoginMode(v as "role" | "credentials")} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="role" className="flex items-center gap-2">
                <UserCircle className="h-4 w-4" />
                Select Role
              </TabsTrigger>
              <TabsTrigger value="credentials" className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                Credentials
              </TabsTrigger>
            </TabsList>

            <TabsContent value="role" className="mt-0">
              <form onSubmit={handleRoleLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Select Your Role
                  </Label>
                  <Select value={selectedRole} onValueChange={(v) => setSelectedRole(v as UserRole)}>
                    <SelectTrigger className="h-12 rounded-xl border-border/50 focus:border-primary bg-background">
                      <SelectValue placeholder="Choose a role to login..." />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border shadow-lg z-50">
                      {AVAILABLE_ROLES.map((role) => (
                        <SelectItem key={role} value={role} className="py-3 cursor-pointer focus:bg-muted">
                          <div className="flex items-center gap-3">
                            <span className="text-lg">{ROLE_ICONS[role]}</span>
                            <div className="text-left">
                              <div className="font-medium text-foreground">{ROLE_LABELS[role]}</div>
                              <div className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[role]}</div>
                            </div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedRole && (
                  <div className="p-4 bg-muted/50 rounded-xl border border-border/50 animate-in fade-in-50 duration-200">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{ROLE_ICONS[selectedRole]}</span>
                      <div>
                        <h4 className="font-semibold text-foreground">{ROLE_LABELS[selectedRole]}</h4>
                        <p className="text-xs text-muted-foreground">{ROLE_DESCRIPTIONS[selectedRole]}</p>
                      </div>
                    </div>
                    <div className="mt-3 pt-3 border-t border-border/50">
                      <p className="text-xs text-muted-foreground">
                        <strong>Access includes:</strong>{" "}
                        {selectedRole === "superadmin" && "All admin modules, user management, system settings"}
                        {selectedRole === "admin" && "CMS, content management, approvals, user management"}
                        {selectedRole === "scholar" && "Research portal, manuscript access requests, submissions"}
                        {selectedRole === "librarian" && "LMS dashboard, book management, member management"}
                        {selectedRole === "user" && "Public site, personal bookmarks, profile settings"}
                        {selectedRole === "public" && "Public website, research tools (read-only)"}
                      </p>
                    </div>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-gold hover:opacity-90 transition-all font-medium text-primary-foreground shadow-soft"
                  disabled={isLoading || !selectedRole}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>Continue as {selectedRole ? ROLE_LABELS[selectedRole] : "..."}</>
                  )}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="credentials" className="mt-0">
              <form onSubmit={handleCredentialsLogin} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@jambushruti.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-11 rounded-xl border-border/50 focus:border-primary"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Link
                      to="/admin/forgot-password"
                      className="text-xs text-primary hover:text-primary/80 transition-colors"
                    >
                      Forgot Password?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10 h-11 rounded-xl border-border/50 focus:border-primary"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-muted-foreground cursor-pointer"
                  >
                    Remember me for 30 days
                  </Label>
                </div>

                <Button
                  type="submit"
                  className="w-full h-11 rounded-xl bg-gradient-to-r from-primary to-gold hover:opacity-90 transition-all font-medium text-primary-foreground shadow-soft"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>

              {/* Demo Credentials Notice */}
              <div className="mt-6 p-4 bg-muted/50 rounded-xl border border-border/50">
                <p className="text-xs text-muted-foreground text-center mb-3 font-medium">
                  Demo Credentials:
                </p>
                <div className="grid gap-1.5 text-xs max-h-32 overflow-y-auto">
                  <div className="flex justify-between items-center p-1.5 bg-background rounded-lg">
                    <span className="text-muted-foreground">👑 Super Admin:</span>
                    <code className="text-foreground font-mono text-[10px]">superadmin@jambushruti.com / super123</code>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-background rounded-lg">
                    <span className="text-muted-foreground">🛡️ Admin:</span>
                    <code className="text-foreground font-mono text-[10px]">admin@jambushruti.com / admin123</code>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-background rounded-lg">
                    <span className="text-muted-foreground">📚 Scholar:</span>
                    <code className="text-foreground font-mono text-[10px]">scholar@jambushruti.com / scholar123</code>
                  </div>
                  <div className="flex justify-between items-center p-1.5 bg-background rounded-lg">
                    <span className="text-muted-foreground">📖 Librarian:</span>
                    <code className="text-foreground font-mono text-[10px]">librarian@jambushruti.com / lib123</code>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 text-center">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              <Scroll className="h-4 w-4" />
              Return to Main Website
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
